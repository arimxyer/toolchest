# Writer's Room

Hand off a topic and get back a finished, on-brand piece — drafted, edited, fact-checked, and packaged by a room of editorial subagents. You don't write or supervise each step; the room does the work.

## What It Does

- **Takes a topic and produces a piece.** The `showrunner` agent runs the pipeline; each specialist writes its own artifact — you hand off, the room hands back a finished draft.
- **Grounds every piece in your brand** via a `BRAND.md` brief; helps you create one if it doesn't exist yet.
- **Runs a six-agent room**: `editorial-strategist` → `researcher` → `staff-writer` → `line-editor` + `skeptical-reader` (parallel) → revision → `distribution-editor`.
- **Collects every artifact in its own workspace** — `content/<slug>/` holds the memo, research, draft, critiques, final piece, and distribution package.
- **Asks first when you want it to** — `convene` runs a short upfront interview before handing off; or call the `showrunner` directly for a zero-touch hand-off.

## Usage

Interactive — a few clarifying questions, then the room takes over:

```text
/writers-room:convene a blog post on why we switched to local-first sync
```

Zero-touch hand-off — no questions, the room just writes it:

```text
@agent-writers-room:showrunner a blog post on why we switched to local-first sync
```

Set up or refresh your brand brief on its own:

```text
/writers-room:establish-brand
```

## The Room

| Agent | Role |
|-------|------|
| `showrunner` | Supervisor — opens the workspace, keeps the memo current, spawns and verifies the room |
| `editorial-strategist` | Frames the piece — audience, angle, goal, outline |
| `researcher` | Gathers cited facts, sources, and examples before drafting |
| `staff-writer` | Drafts the full piece in your brand voice |
| `line-editor` | Tightens prose, grammar, flow; enforces style |
| `skeptical-reader` | Pressure-tests claims and clarity as a tough reader |
| `distribution-editor` | Headlines, SEO meta, and social pull-quotes |

Each agent owns one file in the workspace and writes it directly — the writer writes the drafts, the editors file their critiques, the showrunner maintains the memo and verifies everything lands. The two parallel critics own separate files, so there's nothing to race. `convene` just runs the upfront interview and hands off; it doesn't write the piece.

## Workspace

Each run becomes a `MEMO.md` — the living focus doc every agent reads, updated as the piece develops — inside a per-piece directory:

```
content/<slug>/
  MEMO.md               showrunner + strategist — living focus doc
  research/notes.md     researcher — cited research
  draft.md              staff writer — first draft
  critiques/
    line-edits.md       line editor
    skeptical.md        skeptical reader
  <slug>.md             staff writer — final piece (revision pass)
  distribution.md       distribution editor — headlines / SEO / social
```

## Brand brief

Every agent reads a `BRAND.md` on each run to stay on voice. Its preferred home is `content/BRAND.md` — next to the workspaces it governs — with the project root as fallback.

`establish-brand` produces it three ways, depending on what the project already has:

- **Discover** — when the plugin lands in an existing project, it scans for brand signals first (voice guides, style docs, published content, site copy) and, if the obvious scan misses, explores the repo where audience-facing prose actually hides (page components, meta descriptions, onboarding strings, README register) before deriving the brief from what it finds.
- **Import** — point it at a brand/voice doc you already maintain; it maps the doc against the template, reports gaps, and either symlinks it (your doc stays the source of truth) or writes an adapted copy.
- **Interview** — no existing identity: it interviews you section by section.

The template at [`skills/establish-brand/references/BRAND.template.md`](skills/establish-brand/references/BRAND.template.md) covers voice, audience, tone-by-context, vocabulary, no-go topics, on/off-voice example pairs, article structure, mechanics, and SEO/channels.
