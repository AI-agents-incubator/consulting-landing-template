**Language:** [Русский](ARCHITECTURE.md) · English

# Architectural Principle: Zero-Build React + PHP

**Short version:** the entire frontend is React running directly in the browser with no build step and no Node.js on the server. The backend is WordPress/PHP on ordinary shared hosting. Everything lives on a single domain. No separate infrastructure, no VPS, no multi-domain architecture.

This document explains **why** we ended up with exactly this architecture, what problems it solves, and where its limits are. This isn't just a technical trick — it's a shift in how to think about the stack in the age of AI assistants.

---

## 1. The Problem

The typical situation for a modern small business:

- You need a beautiful, modern, functional website — a landing page, a product page, a client-facing admin panel, a lead form.
- The UI has to meet 2020s standards: animations, reactivity, interactive components, state, dark mode — in short, what visitors **expect** in 2026.
- You already have **shared hosting** (typically Hostinger, SiteGround, GoDaddy, Bluehost — dozens of equivalents) at ~$3–10/month with WordPress installed.
- Your budget and scope **don't justify** running a VPS, a dedicated Node server, or a platform like Vercel/Netlify.
- You want **one domain**, one TLS certificate, one deploy, one control panel — not a zoo of services.

On the face of it, this looks like a contradiction. "Modern UI" → requires React → requires Node → requires a VPS → contradicts "one simple shared hosting for $5". Hence the widespread misconception: "we're a small business, a beautiful website isn't in our budget."

## 2. How This Is Typically Solved

Industry practice over the last 5–7 years offers a few boilerplate paths. Each has well-known downsides:

### 2.1. Stay on plain WordPress + PHP

Theme templates, page builders (Elementor, WPBakery, Divi), classic server-side rendering. This is the easiest route, but the UI ends up **limited** — it feels like a "site from 2015." Complex interactivity, smooth transitions, custom components — either impossible or requiring painful manual work in the jQuery idiom.

This is the path most small businesses take. Hence the visual "fatigue" of tens of millions of WP sites — they all look equally flat.

### 2.2. SPA on React + a Node.js backend

The "proper modern approach" described in 90% of tutorials from 2019–2024. React app on the frontend + Express/Fastify/NestJS on the backend + MongoDB/PostgreSQL + all of it in Docker containers.

**The conflict:** shared hosting isn't built for this. You need a VPS (~$10–50/month minimum, plus maintenance), a process manager (PM2), a reverse proxy (nginx), monitoring, backups, SSL via Let's Encrypt, OS updates. For **one landing page** — this is killing a fly with a sledgehammer.

### 2.3. Next.js + Vercel/Netlify

Server-rendered React on a managed platform. Clean, modern, good SEO. Free at small scale, but:

- You no longer **control** the backend — Vercel gives you serverless functions with constraints.
- If you **already have WordPress** and don't plan to throw it away — you end up with two servers (WP on Hostinger + React on Vercel), two domains or gnarly proxying, CORS conflicts, and two deploys instead of one.
- You have to learn a separate platform, its conventions, its limits (cold starts, function limits, billing).

### 2.4. Multi-domain architecture — VPS for Node + shared hosting for WP

The classic "suffer-ware" configuration that, incidentally, the owner of this project was thinking about up until today:

- `yoursite.com` → WordPress (shared hosting)
- `app.yoursite.com` or a separate domain → React SPA on a VPS with Node
- Between them: CORS, a shared JWT, user sync, two admin panels, two deploys, two monitoring setups.

Every component drags in its own infrastructure. Every integration seam is a point of failure. **A headache that drains the energy that should be going into the product.**

### 2.5. Headless WordPress + Gatsby/Next.js

WP as a data API + a static React generator → deploy to a CDN. Technically elegant, but:

- The workflow gets more complicated: edit in WP → rebuild the static site → deploy. Immediacy is gone.
- You need Node again (locally for the build, or on the host).
- Justified for large content projects; overkill for a landing page.

## 3. The Conflict: Node.js vs. Shared Hosting

The root of all the problems above is the **fundamental incompatibility** of Node.js with shared hosting architecture:

| Shared hosting (Apache/LiteSpeed + PHP) | Node.js |
|---|---|
| Every request spawns a short-lived process | A long-lived server process |
| PHP files = static scripts, Apache reads them | Needs a process manager (PM2, systemd) |
| No open port, everything goes through Apache on 80/443 | Needs to listen on a port + reverse proxy |
| MySQL + cPanel + email + cron out of the box | All of it has to be stood up by hand |
| $3–10/month | VPS starts at $5 for the bare minimum, realistically $15–50+ |
| Automatic SSL, auto-updates | Your responsibility |

On shared hosting it is **physically impossible** to run Node — it requires process management you don't control. Hosts that do support Node (Hostinger Cloud, A2 Hosting) are 3–5x more expensive and still aren't truly shared.

Hence the **dilemma** that thousands of WordPress site owners have been sitting in for a decade:

> "Either I stay with an ugly PHP frontend, or I migrate to a dedicated VPS for the sake of one React component."

## 4. Our Approach: React WITHOUT a Build + PHP

A solution that **removes the conflict entirely**.

### The Gist

- **Frontend:** React, but without a build pipeline. React, ReactDOM, and Babel Standalone are loaded from a CDN (unpkg.com) straight into the browser. JSX files are compiled **on the client** when the page loads. The result — the same React components, the same hooks (`useState`, `useEffect`), the same ecosystem power, but **the final product is just HTML files with a link to a .jsx**. Static assets that sit unchanged on any web server.

- **Backend:** WordPress + PHP. WordPress is, in essence, a ready-made backend framework with a database, a role system, a REST API (`/wp-json/`), email delivery, and plugins for every conceivable need. It's **already there** on shared hosting. You don't have to install, configure, or maintain any of it — Hostinger does all that.

- **The wiring:** the React frontend calls `fetch('/wp-json/...')` or custom PHP endpoints. WordPress processes them and returns JSON.

- **Hosting:** everything on a **single domain**, in a single `public_html/`. React files at the root and in subfolders, WP in its standard directories. Apache decides who serves first via `DirectoryIndex index.html index.php`.

### What This Looks Like on This Project

```
public_html/                       (one site root)
├── index.html                     ← React landing (static!)
├── preview/index.html             ← another React page
├── landing/
│   ├── data.js                    ← data for React
│   └── components.jsx             ← React components (16 of them)
├── wp-config.php                  ← WordPress backend
├── wp-admin/                      ← WP admin
├── wp-content/
├── wp-json/                       ← automatic REST API
└── .htaccess                      ← one file handles routing
```

**One domain. One deploy. One place.** `scp` files over SSH — that's the entire DevOps story.

### The Developer Workflow

```
Locally:
  python3 -m http.server 4000       ← simple HTTP server for local preview
  [edit .jsx / .html]
  [F5 in the browser]               ← see changes instantly, no build
  git commit && git push            ← version it

Deploy:
  scp file user@host:~/public_html/ ← upload the changed file
  wp litespeed-purge all            ← flush the LiteSpeed cache
  [done]
```

No `npm install`, no `npm run build`, no `node_modules`, no Docker containers, no CI/CD pipelines. One action — one change.

## 5. How This Solves the Problems Listed Above

| Problem | Solution |
|---|---|
| Modern UI requires React | React is here — fully featured, with all hooks and any complexity you want |
| React requires Node and a build | It doesn't — Babel compiles JSX on the client |
| Node doesn't work on shared hosting | Node **isn't needed anywhere** — not locally, not on the server |
| You need multi-domain infra | One domain, one `public_html/` |
| You need a dedicated VPS | You don't — shared hosting covers everything |
| CORS between frontend and backend | There isn't any — one domain |
| Expensive hosting | $3–10/month |
| Complex DevOps | `scp` + `wp-cli` + `.htaccess`. That's it. |
| You have to learn Next.js, Vercel, Docker | You don't. HTML, React, PHP. |

## 6. Upsides

1. **Radical operational simplicity.** No Node, no build pipeline, no CI. File → `scp` → it works.
2. **Instant dev loop.** Edit `.jsx` → reload the page → see the result. No `npm run dev`, no waiting on HMR.
3. **The full power of React.** Hooks, context, custom components, third-party libraries (as long as there's a CDN build). No compromises on UI capability.
4. **WordPress out of the box.** Auth, users, roles, email, forms, SEO, media library — all of it is **already there**, plugins for everything.
5. **One domain, one TLS cert, one hosting control panel.** Minimum cognitive load.
6. **No CORS.** Makes life fundamentally easier.
7. **Cheap.** $3–10/month for hosting. And for that budget you get a full-blown modern web stack.
8. **Compatible with AI assistants.** An AI can write and edit any file in the project without having to understand the build system, the dependency graph, or webpack configs. The project is **flat and readable** in its entirety.
9. **Versioning is simple.** Git stores everything that's on the site. Deploy is literally copying files to the server.
10. **Portability.** This site can be moved to any other host in 10 minutes — just copy the files.

## 7. Downsides and Limits

To be honest: the approach has real limits, and it's important to understand them.

### 7.1. Babel-in-the-browser is a client-side tax

Every time the page loads, Babel Standalone compiles all the `.jsx` files right there in the browser. For our project (16 components, ~800 lines) that's ~100–200 ms on a modern device, 300–500 ms on mobile. Noticeable, but not catastrophic.

**When it becomes a problem:** when you have 50+ components and a codebase over 5,000 lines. Then the delay climbs to seconds — the user stares at a white screen.

**What to do:** move to a **local build**. Install Vite on your machine, bundle React into a regular JS bundle (minified, no Babel), and upload the `dist/` to shared hosting. **Node appears only on your laptop; nothing changes on the server.**

### 7.2. CDN dependency on load

React, Babel, and Tailwind are pulled from unpkg.com / cdnjs on every load. Typically ~500 KB. The browser caches them, but the first visit is real traffic.

**Mitigation:** CDNs are usually fast, Tailwind can be swapped for a prebuilt CSS file, and you can self-host the copies.

**What to do in the worst case:** download React and Babel, drop them into `/vendor/`, and load from there. Now you depend on no external services at all.

### 7.3. The npm ecosystem is limited to CDN-available packages

Not every npm package is published in a CDN-friendly format (UMD or ESM.sh). If you need a specific package without a CDN variant — either wrap it or switch to a build.

**In practice:** every mainstream library (React Router, Framer Motion, date-fns, lodash, chart.js, three.js, etc.) has a CDN build. A rare, narrowly specialized one might not.

### 7.4. TypeScript without a build isn't available

Strict typing requires the `tsc` compiler, which requires Node. If you want TypeScript — you need a build step.

**Mitigation:** for a small project, JS + JSDoc comments covers most of the typing need. AI assistants compensate for the lack of types (they catch logical errors and suggest fixes).

### 7.5. SEO and First Contentful Paint (FCP)

React renders in the browser — before JS runs, the user sees empty HTML. Google's crawlers can generally execute JS, but it's **slower and less reliable** than ready-made HTML.

**When this is critical:** content sites with hundreds of pages, blogs, shops.
**When it isn't:** landing pages, business cards, admin panels (which aren't indexed anyway).

**What to do if it is critical:** either move to **Astro/Next.js with a static export** (they generate ready HTML at build time — Node, again, only locally), use prerender.io or similar services, or keep content pages on regular WordPress rendering (this is actually one of the patterns — mix them: simple pages through WP, complex interactivity through React).

### 7.6. No hot reload with state preservation

Edit a component → F5. The component's state resets. Modern build systems (Vite) have HMR, which updates the component without losing state. Without a build — there isn't one.

**In practice:** for components with small amounts of state, the annoyance is minimal. For debugging complex forms — stash the state in `localStorage` for a while.

### 7.7. Minification / optimization

Without a build, you don't get automatic minification, tree-shaking, or code-splitting. You ship the raw `.jsx` (which is small on its own), plus Babel compiles into JS that's heavier than an optimized bundle.

**In practice:** for a project under 10 KB of source it doesn't matter. Above 100 KB — it starts to.

## 8. What's No Longer Relevant (the Post-AI Era)

AI assistants (Claude, Copilot, Cursor) remove an entire layer of architectural constraints that shaped the industry's "common sense" for the last 10 years. Here's a list of things that have **stopped being arguments**:

### 8.1. "The team has one language — JavaScript"

Before AI: switching from JS to PHP meant retraining, losing velocity, bugs from not knowing the idioms.
After AI: AI writes TS, PHP, Python, and Go equally well. The barrier is gone.

### 8.2. "We don't know PHP / the WordPress API"

Before: you had to read the docs, build experience, pick up Laravel/WP patterns. Weeks or months.
Now: AI knows those ecosystems better than the average developer. You ask — you get working code. Learning happens **in the middle of using it**, not before.

### 8.3. "React = Next.js = Vercel = the modern stack"

This was a **bundle of solutions** pushed by hype. In the pre-AI era the logic was: "everyone uses Next.js → lots of tutorials → easier to hire → therefore it's the standard." After AI: you don't have to pick a stack by popularity, because AI helps you in any of them.

### 8.4. "You need to learn Docker and Kubernetes"

Before: without containers you couldn't stand up a modern app. Now: if shared hosting closes the task, containers simply aren't needed — and AI sees this.

### 8.5. "You need a DevOps engineer"

Before: CI/CD, IaC, monitoring — a separate specialty. After AI + a simple architecture: deploy = `scp`, monitoring = uptime robot. One person handles it.

### 8.6. Taste and hype

"Trendy," "modern," "bleeding edge" — in the age of AI these categories **carry no weight** in stack selection. AI doesn't care about fashion. Decisions are made on objective grounds: **the task + the infrastructure + the limits of the approach**.

## 9. When This Approach Is Genuinely a Good Fit

- **Team size:** 1 person + AI. Small teams (2–5 people) too, but as you scale you'll need a build.
- **Infrastructure:** you already have shared hosting with WordPress (or it's easy to get).
- **Workloads:** landing pages, corporate sites, lead forms, CRUD admin panels, customer portals, simple dashboards, client portals, content sites with moderate interactivity.
- **SEO criticality:** medium or low (for SEO-critical work — Astro SSG / Next.js export on top of the same idea).
- **Budget:** optimized. When every extra service stings.
- **Priority:** ship fast, iterate fast, minimum infra overhead.

## 10. When It Doesn't Fit

- **Real-time** (chats, live collaboration, collaborative editors) — PHP is poor at long-lived connections. You need Node / Go / Elixir + WebSockets.
- **Heavy ML/AI compute on the backend** — Python on a dedicated server with a GPU. Shared hosting is useless here.
- **High-load services** — millions of RPS, millisecond SLAs. Shared hosting will fall over.
- **Strict SSR for SEO-sensitive content** — a store with 50,000 SKUs. You need proper Next.js / native WP with the right theme.
- **The team already lives in the Next.js/Node ecosystem** — no point breaking an established workflow to save $10/month.
- **Corporate requirements** — compliance, SOC2, isolation — usually demand enterprise infrastructure.

## 11. Scaling Strategy

This approach **doesn't force** you to choose between "simple now" and "flexible later." It has a clear growth path:

1. **Start:** zero-build React + WP (the current state).
2. **Growth (> 50 components):** add Vite locally for the build. The output (`dist/`) goes to the same shared hosting. **Nothing changes on the server.** Node is needed only on your laptop.
3. **SEO becomes critical:** move to Astro or Next.js in static-export mode. The output — again, static HTML on shared hosting. WP keeps being the backend.
4. **You need real-time or heavy backend work:** add **one** specialized service (Node/Python on a VPS, Supabase, Cloudflare Workers) without rewriting everything else. The rest of the infra stays as-is.
5. **Only as a last resort:** a full migration to Vercel/AWS/Kubernetes. But by this point your business is big enough that it's warranted.

At every step you **extend** the life of the previous architecture instead of throwing it out.

## 12. Industry Parallels

This approach isn't a personal invention. It sits on top of existing patterns:

- **"Headless WordPress"** — WP as the backend, any frontend on top. A practice since 2015. Well-documented in the WP community.
- **"JAMstack"** — JavaScript + APIs + Markup. A classification for sites where the dynamic side is done through API calls from a static frontend. Term coined around 2016.
- **"Progressive enhancement"** — the page works without JS, with React layered on top. A principle older than React.
- **"Islands architecture"** — Astro's ideology: static HTML + pockets of interactive components. A formalization of what we're doing.
- **"React without a toolchain"** — in 2024, the official React documentation added a section about using React straight from a CDN without a build.
- **The LAMP stack with a React frontend** — Laravel/Symfony/CakePHP + React — a standard combo in the PHP world for the last seven years or so.

What's changed now is that **AI makes this approach accessible to a solo operator without deep background**, whereas before it required engineering maturity across several stacks at once.

## 13. The Practical Takeaway for This Project and Future Ones

When the task is to build **yet another site** (a landing page, an online store, a client admin, a learning platform, a portfolio, a blog, etc.) and the question "where do we host all this" comes up — **by default** the answer is:

1. The same domain or a subdomain on the same shared hosting.
2. A new folder inside `public_html/` with React components.
3. WordPress (or plain PHP) for server-side logic — forms, email, database.
4. If the site is independent of WP — even simpler: just React files + a couple of PHP endpoints.

**There's no need** to pre-architect "multi-domain infrastructure," "a dedicated Node server for such-and-such a service," or "cross-domain API integration." All of that resolves **inside a single shared hosting** and scales when the need actually arrives.

This **frees up** mental space for working on the product instead of the infrastructure.
