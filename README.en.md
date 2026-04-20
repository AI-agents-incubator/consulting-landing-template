**Language:** [Русский](README.md) · English

# AI Agents Incubator — Consulting Template

> **See it live:** <https://alexkrol.com/preview/> — a real landing built from this template by the methodology's author. Open it on desktop and on mobile, toggle RU/EN, flip the theme — this is what you get after forking and customizing.

A production-ready, zero-build React landing template for consultants, advisors, and boutique firms.
Ships with a proven **methodology** (how to position an advisory offer) and an AI-driven
**bootstrap prompt** that customizes the whole landing for you through a short interview.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/AI-agents-incubator/consulting-landing-template)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AI-agents-incubator/consulting-landing-template)

---

## What this is

Three things in one package:

1. **A template** — a bilingual (RU/EN), dark/light, single-page landing that runs in the
   browser with zero build step. Drop it on any static host and it works.
2. **A methodology** — the 14-section structure, the copy logic, the three-tier pricing
   principle, and the disqualification mechanics that make an advisory landing actually
   convert. See [METHODOLOGY.en.md](METHODOLOGY.en.md).
3. **An AI customization flow** — a copy-pasteable prompt for Claude Code that interviews
   you for ten minutes and rewrites every placeholder into your own positioning. See
   [BOOTSTRAP-PROMPT.en.md](BOOTSTRAP-PROMPT.en.md).

This makes the template a method + tool + starter kit. Fork it, run the bootstrap prompt,
review the diff, deploy.

---

## Who this is for

- **Independent consultants and advisors** ready to productize their offer
- **Boutique consulting firms** (2–10 people) who want a premium landing without the agency bill
- **Domain experts** transitioning from salaried specialist to advisory practice
- **Educators teaching consulting** — students get a working artifact plus the reasoning behind it

Not a fit for SaaS founders, marketing agencies, or people with no delivery experience yet —
the positioning logic baked into this template assumes you actually sell advisory work.

---

## The problem it solves

Most consulting landings fail in one of three ways: they read like corporate mush, they
hide prices and feel like a black box, or they smell like an info-product funnel. This
template is structured around the opposite: clear positioning, explicit pricing tiers,
honest disqualification. See [METHODOLOGY.en.md](METHODOLOGY.en.md) for the full reasoning
behind each section.

---

## Why zero-build React

- **React without a build step.** JSX compiles in the browser via Babel Standalone.
- **No Node.js anywhere.** Not locally, not on the server. No `npm install`, no bundler.
- **Works on $3/month shared hosting.** Hostinger, SiteGround, GoDaddy, cPanel.
- **Also works on modern static hosts** — Netlify, Vercel, Cloudflare Pages, GitHub Pages.
- **Survives next to WordPress or PHP** on the same domain. You don't have to pick.

The full trade-off analysis is in [ARCHITECTURE.en.md](ARCHITECTURE.en.md) — why this architecture
made sense in the post-AI era, when it's the right call, and when it isn't.

---

## Quickstart (5 minutes, no AI)

```bash
git clone https://github.com/AI-agents-incubator/consulting-landing-template.git
cd consulting-landing-template
python3 -m http.server 4000
```

Open <http://localhost:4000> and you'll see the full landing with placeholder copy.

Edit `content.en.md` / `content.ru.md`, sync into `landing/data.js`, refresh the browser,
see the result. No build step, no watcher, no tooling.

---

## Recommended path (10 minutes, AI-assisted)

If you have the [Claude Code CLI](https://docs.claude.com/claude-code) installed:

```bash
git clone https://github.com/AI-agents-incubator/consulting-landing-template.git
cd consulting-landing-template
claude
```

Then paste the prompt from [BOOTSTRAP-PROMPT.en.md](BOOTSTRAP-PROMPT.en.md). Claude will
interview you with ~10 questions, rewrite every placeholder with your own positioning,
and tell you exactly what you still need to replace manually (logo, colors, photos).

Review the diff. Keep what you like. Deploy.

---

## Customize manually

1. **Copy** — edit `content.en.md` and/or `content.ru.md`.
2. **Data** — sync into `landing/data.js` (both `ru` and `en` branches stay in parity).
3. **Components** — React is in `landing/components.jsx`. Edit freely.
4. **Theme** — CSS variables are at the top of `index.html` (colors for light and dark).
5. **Logo** — the sparkle icon is inline SVG in `index.html`.

For a deeper walkthrough of what each landing section is doing and why, read
[METHODOLOGY.en.md](METHODOLOGY.en.md).

---

## Deploy

Five hosting paths covered in detail: shared hosting, Netlify, Vercel, Cloudflare Pages,
GitHub Pages. See [DEPLOY.en.md](DEPLOY.en.md).

---

## Project structure

```
.
├── index.html                       # Full landing — site home page
├── landing/
│   ├── data.js                      # window.DATA — all copy, bilingual
│   └── components.jsx               # React components, single file
├── content.en.md                    # Source-of-truth English copy
├── content.ru.md                    # Source-of-truth Russian copy
├── README.en.md                     # You are here
├── METHODOLOGY.en.md                # Positioning rationale — the "why" behind the structure
├── BOOTSTRAP-PROMPT.en.md           # Copy-paste prompt for AI-driven customization
├── DEPLOY.en.md                     # Five hosting options, step by step
├── ARCHITECTURE.en.md               # Zero-build React + PHP trade-offs
├── LICENSE                          # MIT
├── netlify.toml                     # Netlify config with security headers
└── .production-credentials.example  # Template for SSH deploy secrets (gitignored copy)
```

---

## Stack

- React 18 + ReactDOM via unpkg CDN
- Babel Standalone for in-browser JSX transpilation
- Tailwind CSS via CDN
- Inter via Google Fonts

No `package.json`, no `node_modules`, no build step, no CI required.

---

## When NOT to use this template

- You need strong SEO from day one — the landing is client-rendered; try Astro or
  Next.js static export instead.
- You're building real-time features (chat, collaboration) — this has no backend.
- You need TypeScript — Babel Standalone doesn't type-check. Upgrade to Vite + React
  locally and lose the zero-build benefit.
- Your app has more than ~50 components — Babel-in-browser compilation becomes slow.
  Move to a real build tool at that point.

---

## About the methodology author

This template and the positioning methodology it embodies come from the practical
consulting work of **Alexey Krol** — technology entrepreneur and advisor who runs
this methodology on his own advisory offer before sharing it openly here.

- LinkedIn: <https://www.linkedin.com/in/alexkrol/>
- Personal site: <https://alexeykrol.com/>
- Organization: **AI Agents Incubator**

The methodology has been battle-tested and is now open for anyone building a
consulting practice. Credit is appreciated; a link back in your footer is a
nice touch but not required.

---

## License

[MIT](LICENSE). Use it, fork it, ship it, sell the result. Attribution welcomed but
not required.
