# Deployment Guide

Five ways to ship this template. Pick the one that matches your hosting.
All options serve the same static files — the landing runs entirely in the browser.

## Local preview (before you deploy)

Before you upload anything, run the site on your own machine so you know the
pages render correctly with your edits.

From the project root:

    python3 -m http.server 4000

Then open http://localhost:4000 in your browser. Python 3 is preinstalled on
macOS and most Linux distributions. On Windows, either run:

    python -m http.server 4000

or install Python 3 from python.org first. If you have Node.js available, this
one-liner works too:

    npx serve .

Do not try to open `index.html` directly by double-clicking it. The browser
will load the file under a `file://` URL, and the React and Tailwind scripts
fetched from unpkg.com won't execute in that context. You need a real HTTP
origin — even a local one on port 4000 is fine.

## Option 1 — Shared hosting (cPanel / Hostinger / SiteGround / GoDaddy / Bluehost)

The cheapest path. Plans typically run about $3/month. You upload the files
once via SCP, FTP, or the cPanel File Manager, and the hosting provider takes
care of everything else.

Folder structure to upload into `public_html/`:

- `index.html` — the coming-soon placeholder. If you want the full landing at
  the root of your domain, replace this with the contents of `preview/index.html`
  instead.
- `preview/` — the full landing page (kept separate so you can stage work).
- `landing/` — `data.js` (all copy) and `components.jsx` (all React components).

Example SCP command from your project root:

    scp -r index.html preview/ landing/ user@your-host.com:~/public_html/

If you prefer the cPanel File Manager, zip the three items locally, upload the
zip through the web interface, and extract it inside `public_html/`.

If you already run WordPress on the same domain and want the static landing to
take priority, add this line to `.htaccess` inside `public_html/`:

    DirectoryIndex index.html index.php

That tells Apache to serve the static HTML first and fall back to WordPress
only if no matching HTML file is found. Do not commit `.htaccess` to the
repository — it's specific to your hosting environment and often contains
host-generated rewrite rules you don't want to track.

Good for: people who already have shared hosting and want to keep monthly
costs around $3.

Bad for: people starting from scratch with no hosting in place. Use Netlify
(Option 2) instead — you'll be live in under a minute for free.

## Option 2 — Netlify

The easiest option for a zero-config static site. The free tier includes
100 GB of monthly bandwidth, which is plenty for most landings.

There are three ways to deploy.

Path A — drag-and-drop (fastest if you just want a live URL):

1. Open netlify.com/drop.
2. Drag the project folder from Finder or Explorer onto the page.
3. Netlify gives you a live URL in about 30 seconds.
4. Optional: click "Claim this site" to attach it to your Netlify account and
   hook up a custom domain.

Path B — GitHub integration (recommended if you plan ongoing edits):

1. Push your fork to GitHub.
2. In the Netlify dashboard, click "Add new site" and then "Import an existing
   project."
3. Pick your repository and confirm the branch (usually `main`).
4. Build command: leave EMPTY. There is no build step.
5. Publish directory: `.` (a single dot — the repo root).
6. Click deploy. Every subsequent push to `main` triggers an automatic
   redeploy.

Path C — Netlify CLI (for people who prefer the terminal):

    npm install -g netlify-cli
    netlify deploy --prod

The `netlify.toml` file shipped in this repo sets sensible security headers
(Content-Security-Policy, X-Frame-Options, etc.). You don't need to touch it.

Custom domain: in the Netlify dashboard go to Domain settings, then "Add
custom domain," then follow the DNS instructions it shows. You'll typically
add a CNAME record at your domain registrar pointing to the Netlify-provided
hostname.

## Option 3 — Vercel

Very similar to Netlify. Free tier with generous limits and the same
git-push-to-deploy workflow.

Recommended path — GitHub integration:

1. Push your code to GitHub.
2. Go to vercel.com, click "New Project," and import your repository.
3. When Vercel asks for a framework preset, pick "Other."
4. Leave the build command and output directory at their defaults — there is
   no build.
5. Click Deploy.

Vercel auto-detects static sites, so no `vercel.json` config file is required
for this template.

Custom domain: open the project settings, go to Domains, add your domain, and
follow the DNS instructions. Vercel walks you through the required records.

## Option 4 — Cloudflare Pages

The best fit for high-traffic sites. The free tier includes unlimited
bandwidth and 500 builds per month, served from Cloudflare's global CDN.

Deployment path:

1. Push your code to GitHub.
2. In the Cloudflare dashboard, open Pages, click "Create a project," then
   "Connect to Git."
3. Pick your repository.
4. Build command: leave EMPTY.
5. Build output directory: `/` (the root).
6. Click Deploy.

The first deploy takes about 30 seconds. Subsequent ones are faster because
Cloudflare caches unchanged files across builds.

Good for: landings that expect serious traffic. Cloudflare's CDN footprint
beats Netlify and Vercel in several regions, especially outside North America
and Western Europe.

## Option 5 — GitHub Pages

Free, but with slower deploys than the managed hosts above and a 1 GB limit
on the repository itself. Fine for a landing page like this one.

Deployment path:

1. Push the code to a public GitHub repository.
2. In the repository, open Settings and then Pages.
3. Under Source, pick "Deploy from a branch."
4. Branch: `main`. Folder: `/` (root).
5. Save. Your URL appears after roughly one minute and looks like
   `https://<username>.github.io/<repo-name>/`.

Custom domain:

- Create a `CNAME` file at the repository root whose single line is your
  domain (for example, `example.com`).
- At your DNS provider, add a CNAME record pointing your domain to
  `<username>.github.io`.
- Once DNS has propagated (usually minutes to an hour), return to the Pages
  settings and enable "Enforce HTTPS."

## Which should I pick?

| Your situation | Pick |
|---|---|
| Already paying for shared hosting | Option 1 |
| No hosting, want the fastest setup | Option 2 (Netlify drag-and-drop) |
| Want CI/CD from a GitHub push | Options 2, 3, or 4 |
| Expecting serious traffic | Option 4 (Cloudflare) |
| Minimal fuss, public GitHub repo already | Option 5 |

## Custom domain and HTTPS

All four modern hosts — Netlify, Vercel, Cloudflare Pages, and GitHub Pages —
issue and renew Let's Encrypt certificates for you automatically once DNS is
pointed correctly. You don't install anything; HTTPS just works.

For shared hosting, you'll typically get Let's Encrypt through the "SSL/TLS"
section of cPanel, often branded as AutoSSL. Run it once after your domain
resolves to the host and it renews on its own.

DNS basics worth knowing:

- Use a CNAME record for subdomains like `www.example.com` or
  `app.example.com`.
- Use an A record (or ALIAS / ANAME, depending on your registrar) for the
  apex domain `example.com`. Each host publishes the exact values to point to.

## What about SEO and performance?

Everything in this template is rendered client-side. That means the browser
first downloads the HTML shell, then pulls React, ReactDOM, Babel Standalone,
and Tailwind from a CDN, then executes the JSX. There is a short first-paint
delay while that boot process runs — usually under a second on a decent
connection.

For marketing landings this is perfectly acceptable. Visitors click a link,
see the page, and scroll. If SEO is mission-critical — for example, an
e-commerce site banking on organic search rankings across hundreds of
category pages — consider a static-site generator like Astro, or a Next.js
static export. Both produce prerendered HTML that ships with content already
baked in.

See `ARCHITECTURE.md` for the full discussion of the trade-offs behind this
zero-build approach, including when to migrate and what to migrate to.

## Troubleshooting

Common issues you may hit and how to resolve them:

- "My changes don't show up after deploying." This is almost always the
  browser cache. Hard-reload with Cmd+Shift+R on macOS or Ctrl+Shift+R on
  Windows and Linux. If you're on shared hosting behind LiteSpeed, also purge
  the server cache — `wp litespeed-purge all` via WP-CLI, or via the LiteSpeed
  plugin admin UI.
- "CDN scripts fail to load." Some corporate networks block unpkg.com or
  cdnjs. The fix is to serve React, ReactDOM, Babel, and Tailwind from your
  own host instead: pin the exact versions, download them once, drop the
  files under a `vendor/` directory, and update the `<script src>` attributes
  in your HTML to point there.
- "JSX parsing errors." Babel Standalone prints these to the browser console
  — open DevTools and read the message. The cause is nearly always a syntax
  typo inside `components.jsx`, such as an unclosed tag or a missing comma.
  Fix the file and reload.
- "Tailwind classes don't apply." Make sure the Tailwind CDN `<script>` tag
  is present in your HTML and loads before `components.jsx`. If you swapped
  CDNs or versions, test in an incognito window to rule out cached 404s.
- "`.htaccess` not working on shared host." Two requirements: Apache must
  have `mod_rewrite` enabled (most cPanel hosts do by default), and
  `AllowOverride` must be permitted for your directory in the server config.
  If neither you nor support can toggle those, contact your provider.

## Next steps

- Customize content following the instructions in `BOOTSTRAP-PROMPT.md`.
- Read `METHODOLOGY.md` to understand the positioning logic behind the copy.
- Deploy using whichever option above fits your situation.
- Ship.
