---
name: outline
description: Generate a structured article outline (hook, sections with key points, CTA) from a brief, in the project's brand voice.
when_to_use: When the user runs /content-studio:outline, or asks for "an outline for a post about X", "structure a blog post on Y", "plan an article about Z", or wants headings and key points before drafting.
argument-hint: <topic or brief>
allowed-tools: Read AskUserQuestion
---

# outline

Produce a content outline that the user can either edit and hand to `/content-studio:draft`, or take elsewhere.

`$ARGUMENTS` is the brief — a topic, a sentence, a paragraph, or a rough idea. If empty, ask for it via `AskUserQuestion`. Do not invent a topic.

## Step 1 — load voice

Read the brand voice file at `${user_config.voice_guide_path}` (configured at plugin enable time). If the file does not exist there, tell the user to run `/content-studio:init` to write the starter template, then come back.

Pay particular attention to:

- The **Audience** section — drives reading level, jargon tolerance, what to take for granted.
- The **Article structure defaults** section — use it as the outline's skeleton unless the brief overrides.
- The **Examples** section — these define what on-voice headings sound like. Mimic their cadence.
- The **Things we don't write about** section — if the brief lands here, stop and tell the user, don't outline it.

If any of these sections are still placeholder content (contains "Add 2–4 more …" or similar), warn the user that output quality will suffer until the voice guide is filled in. Continue anyway.

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
