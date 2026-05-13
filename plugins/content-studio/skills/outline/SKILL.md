---
name: outline
description: Generate a structured article outline (hook, sections with key points, CTA) from a brief, in the project's brand voice.
when_to_use: When the user runs /content-studio:outline, or asks for "an outline for a post about X", "structure a blog post on Y", "plan an article about Z", or wants headings and key points before drafting.
argument-hint: <topic or brief>
allowed-tools: Read AskUserQuestion
context: fork
agent: story-editor
---

# outline

Produce a content outline that the user can either edit and hand to `/content-studio:draft`, or take elsewhere.

`$ARGUMENTS` is the brief — a topic, a sentence, a paragraph, or a rough idea. If empty, ask for it via `AskUserQuestion`. Do not invent a topic.

## Step 0 — Voice-guide readiness

This gate runs identically at the top of every content-studio consuming skill. A missing or placeholder-shaped voice guide stops work before any output is produced — the dependency is real on every entry path.

### Existence check

Verify a file exists at `${user_config.voice_guide_path}` (configured at plugin enable time, default `./brand-voice.md`). If it doesn't, stop with:

```
✗ Voice guide not found at <path>.

Run `/content-studio:init` to author one. Init will discover existing voice-guide-shaped files in your project, or offer to author with you, infer from existing repo content, or scaffold a blank template.
```

### Placeholder-content check

Read the file and check for the canonical sentinel set. If **any** of these substrings appears in the file, stop:

- `Starter template — replace every section` (top-of-template banner)
- `Lexcheck` (demo product in the scaffold's example pair)
- `_Add 1–2 more` / `_Add 2–4` / `_Add your rules` (italic hint text in unfilled template sections)
- `[inferred — verify]` (audit tags written by `/content-studio:init --infer` — present until the user resolves each)

Stop with:

```
✗ Voice guide at <path> still contains placeholder markers:
- <list the specific sentinels that matched, each on its own line>

The guide hasn't been authored yet — every consuming skill in content-studio refuses to run against placeholder content because output won't reflect the actual brand. Run `/content-studio:init` to author or infer, or edit <path> directly to remove the markers.
```

### Non-blocking flag

If the two checks above pass but the file still contains `_e.g. ` (italic-formatted `e.g.` placeholder hints from the scaffold's section examples), proceed to Step 1 but include this line in your first message back to the user:

> Heads up: still saw `_e.g. ..._` placeholder hints in the voice guide. The gate is passing — these don't block — but you may want to clean them up.

If all checks pass, proceed to Step 1.

## Step 1 — load voice

Read the brand voice file at `${user_config.voice_guide_path}` (configured at plugin enable time). If the file does not exist there, tell the user to run `/content-studio:init` to write the starter template, then come back.

Pay particular attention to:

- The **Audience** section — drives reading level, jargon tolerance, what to take for granted.
- The **Article structure defaults** section — use it as the outline's skeleton unless the brief overrides.
- The **Examples** section — these define what on-voice headings sound like. Mimic their cadence.
- The **Things we don't write about** section — if the brief lands here, stop and tell the user, don't outline it.

## Step 2 — interrogate the brief if it's thin

A one-word topic doesn't produce a good outline. If `$ARGUMENTS` is fewer than ~10 words, ask up to **three** clarifying questions via a single `AskUserQuestion` call:

- **Angle** — what's the specific take, not the topic. ("Contract review" is a topic; "why a 12-minute first pass beats a 3-hour read" is an angle.)
- **Reader takeaway** — what does the reader walk away able to do or believe?
- **Format** — how-to, opinion, customer story, technical deep-dive, announcement.

Skip clarifying questions if the brief already answers them.

## Step 3 — generate the outline

Default skeleton (from the voice guide's "Article structure defaults"):

1. **Hook (1–2 sentences)** — state the reader's problem in their language.
2. **Why this matters now** — the context shift.
3. **Body sections (3–5)** — headings + 2–4 key-point bullets each.
4. **What this looks like in practice** — concrete example, code, customer quote slot.
5. **Call to action** — one ask.

Output format:

```markdown
# <Working title>

**Audience:** <primary audience from voice guide, narrowed to this piece>
**Goal:** <what the reader can do/believe after reading>
**Format:** <how-to | opinion | customer-story | technical | announcement>
**Estimated length:** <e.g. 900–1,100 words>

## Hook
- <1–2 bullet sentences for the opening>

## Why this matters now
- <bullet>
- <bullet>

## <Section heading in voice>
- <key point>
- <key point>
- <key point>

## <Section heading in voice>
- <key point>
- <key point>

## In practice
- <concrete example, code snippet slot, customer quote slot — name what should fill it>

## Call to action
- <single ask: link to docs, signup, demo>

## Headline candidates
1. <headline 1>
2. <headline 2>
3. <headline 3>
```

## Step 4 — output and offer next step

Print the outline to chat. End with:

> Hand this to `/content-studio:draft "<working title>"` (with the outline pasted in) to generate a full draft, or edit the outline first.

Do not write the outline to a file. The user keeps it in chat or pastes it forward. This is an in-the-moment artifact.

## Voice rules to apply

- Section headings must be sentence case (unless the voice guide says otherwise).
- Drop any heading that reads as clickbait — restate it as a description of the section's content.
- Strip banned vocabulary (see the voice guide's "Vocabulary > Banned / avoid" section) from both headings and key points.
- If the audience is technical, key points can include code-snippet placeholders. If non-technical, prefer plain-language bullets.
