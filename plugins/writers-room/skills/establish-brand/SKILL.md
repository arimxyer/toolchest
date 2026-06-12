---
name: establish-brand
description: Create or update a BRAND.md — the brand brief the writer's room writes to (voice, audience, content pillars, do's and don'ts, examples). Interviews the user when there's no BRAND.md, or reviews and refreshes an existing one. Invoked on its own or by /writers-room:convene when BRAND.md is missing.
argument-hint: "[path to BRAND.md, defaults to ./BRAND.md]"
---

# establish-brand

Produce or refresh the `BRAND.md` that every writer's-room agent reads to stay on voice. This skill runs in the main thread because it interviews the user. It ships a fill-in template at `references/BRAND.template.md` (alongside this skill) — use it as both the interview checklist and the structure of the file you write.

## Step 0 — Locate

Default target is `./BRAND.md` (honor an explicit path argument). Check whether it already exists.

## If BRAND.md exists — review and refresh

Read it, summarize it back to the user, and ask what's changed or what feels off. Update only what they want changed; preserve the rest. Confirm the diff before writing.

## If BRAND.md is missing — interview, then write

Don't dump a blank template on the user. Interview them — one focused question at a time, building on their answers — to fill in:

- **Brand** — name, what it does, what it stands for in one line.
- **Audience** — who the content is for; what they care about; their sophistication level.
- **Voice & tone** — 3–5 adjectives, then make them concrete: rhythm, formality, humor, person (I / we / you).
- **Content pillars** — the 3–5 recurring topics the brand publishes on.
- **Do's and don'ts** — preferred words/framings; banned words, clichés, and off-brand moves.
- **Examples** — paste 1–2 short passages that sound *right* (and, if useful, one that sounds *wrong*). These anchor the voice better than adjectives.
- **Mechanics** — spelling/style conventions, formatting norms, SEO or channel rules, links/CTAs.

Where the user is unsure, offer concrete options drawn from what they've already said rather than leaving blanks.

## Write

Write `BRAND.md` using `references/BRAND.template.md` (alongside this skill) as the section structure. Lead with a short voice summary the agents can absorb fast. Keep it tight — it's a working reference the agents read on every run, not a brand bible. Show the user the result and confirm it's right.
