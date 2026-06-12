---
name: establish-brand
description: Create or update the BRAND.md the writer's room writes to — by discovering an existing brand identity in the project (voice docs, published content, site copy), by importing a brand/voice document the user maintains elsewhere, by interviewing the user, or by refreshing the current file. Covers voice, audience, tone-by-context, vocabulary, no-go topics, on/off-voice example pairs, mechanics, and SEO/channels. Invoked on its own or by /writers-room:convene when no BRAND.md is found.
argument-hint: "[path to BRAND.md, or to an existing brand doc to import]"
---

# establish-brand

Produce or refresh the `BRAND.md` that every writer's-room agent reads to stay on voice. This skill runs in the main thread because it interviews the user. It ships a fill-in template at `references/BRAND.template.md` (alongside this skill) — use it as the section structure for everything you write, and as the gap checklist when importing.

## Step 0 — Locate, then discover

The preferred home is **`content/BRAND.md`** — next to the workspaces the room creates, so the content system is self-contained. Fall back to `./BRAND.md` at the project root (honor an explicit path argument over both). Check both locations for an existing file.

**If no BRAND.md exists, don't jump to the interview — scan the project for an existing brand identity first.** This plugin often lands in a project that already has one, written down or implied:

- Glob for brand/voice docs by name: `**/brand*`, `**/voice*`, `**/style-guide*`, `**/tone*` (markdown, in the repo or an adjacent docs/vault directory the user mentions).
- Look for published content: existing `content/`, `posts/`, `blog/`, `articles/` directories — published pieces *are* the voice, even if nobody wrote it down.
- Look at site copy: about pages, landing pages, READMEs with audience-facing prose.

Then pick a lane:

- **BRAND.md exists** → refresh (Lane 1).
- **Scan found brand signals** → show the user what you found and offer to derive the brief from it — a named voice doc routes to import (Lane 2); published-content-only routes to import's adapted-copy path, where you *infer* the voice from the published pieces and the user corrects the draft (correcting beats authoring from nothing).
- **Scan found nothing, but the user has a doc elsewhere** → ask: "Do you have a brand or voice doc outside this project — a vault, a Google Doc, an old guide?" → import (Lane 2).
- **No identity anywhere** → interview (Lane 3).

## Lane 1 — Refresh

Read the existing BRAND.md, summarize it back, and ask what's changed or feels off. Update only what they want changed; preserve the rest. If it predates the current template, offer to fill the sections it's missing (run the gap check from the import lane). Confirm the diff before writing.

## Lane 2 — Import

The source is an existing doc (theirs to point at, or found by the Step 0 scan) — or, in the inferred-voice case, a body of published content you derive the voice *from*.

1. **Read it and map it against the template's sections.** Report coverage honestly: which sections it already covers (often better than an interview would), and which are missing. Common gaps: SEO & channels, example *pairs* (a doc with only on-voice examples is missing the off-voice half), content pillars.
2. **Ask how to bring it in:**
   - **Symlink** — `ln -s <source> content/BRAND.md`. The original stays the single source of truth; edits there flow through. Best when the doc lives in a vault or repo the user actively maintains.
   - **Adapted copy** — write a new BRAND.md from the source, restructured to the template. Best when the source is close-but-not-quite, or the user wants room-specific additions without touching the original.
3. **Gap-fill** the missing sections with a short interview — only what's actually missing. With a symlink, put gap-fill content in the *source* doc (with the user's blessing) or in a thin companion noted at the top; don't let the symlink silently hide that sections are absent.

## Lane 3 — Interview

Don't dump a blank template on the user. Interview them — one focused question at a time, building on their answers — walking the template's sections:

- **Brand** — name, what it does, what it stands for in one line.
- **Audience** — primary and secondary readers; what each cares about; sophistication level.
- **Voice & tone** — 3–5 adjectives, then force the nuance: what does "direct" mean concretely? Rhythm, formality, humor, person (I / we / you).
- **Tone shifts by context** — which formats they publish (articles, launches, social) and how tone flexes per format while voice holds.
- **Content pillars** — the recurring topics, or an explicit decision to skip pillars.
- **Vocabulary** — preferred words/framings, and banned ones *with the why* so agents generalize.
- **Things we don't write about** — off-limits topics, framings, formats.
- **Examples** — the highest-signal ask: 1–2 short passages that sound *right*, and one that sounds *wrong*. If they can say why each works or fails, capture that commentary too — pairs with commentary anchor voice better than any adjective list.
- **Article structure defaults** — the default shape of a piece, and their CTA policy.
- **Mechanics** — spelling/style conventions, formatting norms.
- **SEO & channels** — slug style, meta-description voice, where pieces publish and get seeded.

Where the user is unsure, offer concrete options drawn from what they've already said rather than leaving blanks.

## Write

Write (or link) the file at the chosen location using `references/BRAND.template.md` as the section structure. Lead with a short voice summary the agents can absorb fast. Sections the user deliberately skipped get deleted, not left as placeholders. Show the user the result and confirm it's right.
