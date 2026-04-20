**Language:** [Русский](BOOTSTRAP-PROMPT.md) · English

# Bootstrap Prompt — Let AI Customize This Template for You

## How to use this

1. Fork or clone this repository to your machine.
2. Install the Claude Code CLI — instructions at https://docs.claude.com/claude-code.
3. Open a terminal in the cloned folder and run `claude` there.
4. Copy the prompt block below (everything inside the fenced ` ```markdown ` block) and paste it into the Claude Code session.

That's it. The AI takes it from there.

## What will happen

- Claude will ask you about 10 short questions about you and your offer, one at a time.
- Claude will rewrite `content.en.md` and `content.ru.md` with your answers, keeping the section structure intact.
- Claude will sync the copy into `landing/data.js` so the live site reflects your answers.
- Claude will tell you what to still replace manually — logo SVG, photos, brand colors.
- Claude will NOT deploy. Deploying is a separate step you run yourself after reviewing changes.
- You stay in control. Review every change before you commit, and ask Claude to redo anything you don't like.

## The prompt

Copy everything in the block below and paste it into your Claude Code session:

```markdown
You are helping me customize the AI Agents Incubator Consulting Template for my own consulting practice.

Read these files first, in order:
1. README.md
2. METHODOLOGY.md
3. content.en.md
4. content.ru.md
5. landing/data.js (structure only, don't edit yet)

Then interview me by asking these questions, ONE AT A TIME, waiting for my answer before the next:

1. Your name (how it should appear in "About the author")
2. Your LinkedIn URL
3. Your personal website URL (or skip)
4. Email or contact form URL
5. One-sentence positioning: what do you help whom achieve?
6. Top 3 industries you serve (or "generalist")
7. Your 3–4 strongest credentials (founder, author, years of experience, notable clients — whatever is true)
8. Your target client (owners, C-level, department heads, communities — pick one primary)
9. Your three pricing tiers — name, price range, and what's included. If you don't have three, propose them based on industry norms.
10. Which languages the landing should support (EN only, RU only, EN+RU, or add another)

After the interview:

1. Rewrite content.en.md — replace every [Your Name], [X]+, [Your credential N], industry list, and pricing with my answers. Keep section structure and headings identical. If I chose EN only, delete content.ru.md and the `ru` key in landing/data.js.

2. Rewrite content.ru.md analogously if I chose to keep Russian. Translate my answers to natural Russian — don't word-for-word it.

3. Sync content into landing/data.js — update both `ru` and `en` branches (or just one, per my choice). Keep the JSON structure and keys identical; change only string values.

4. Update index.html — replace [Your Name] in the footer and the LinkedIn URL in the CTA button with my real values.

5. Show me a summary:
   - Files changed
   - What I still need to replace manually (logo SVG in index.html + preview/index.html; any photo assets; Tailwind theme colors if I want to brand-customize)
   - How to preview locally
   - How to deploy (point me to DEPLOY.en.md)

6. Do NOT commit anything. Do NOT deploy. I will review and commit myself.

Constraints:
- Do not invent statistics or client names I didn't give you
- Do not add industries I didn't mention
- Keep FAQ wording — it's methodology, not personal
- Keep "What this isn't" and "Not a fit" wording — same reason
- If I say "skip" for a question, leave the original placeholder in place

Start with question 1.
```

## Troubleshooting and tips

- **If Claude asks to install Node, npm, a bundler, or any build toolchain** — stop it. This template has no build step on purpose. Everything runs in the browser via Babel Standalone. If the AI tries to "modernize" the stack, tell it "no, keep the zero-build architecture."
- **If Claude suggests rewriting the whole landing from scratch** — stop it. The 14-section structure is the product. The AI's job is to fill in placeholders, not redesign.
- **If Claude wants to deploy for you** — defer. Review the changes first, commit when you're satisfied, then handle deploy yourself following `DEPLOY.en.md`.
- **If the AI goes off-track** — re-paste the prompt. It's designed to be the single source of truth for this task; pasting it again resets the agent's scope.
- **You can re-run the prompt with different answers.** If you want to A/B your positioning — e.g. "what if I targeted C-level instead of owners?" — just run the prompt again from a clean git state and compare outputs.
- **Review every change before committing.** The AI is good at this task, but it will sometimes interpret a question liberally or paraphrase something you said more strongly than you meant. Read the diff.

Once customized, continue with `DEPLOY.en.md` to ship your landing.
