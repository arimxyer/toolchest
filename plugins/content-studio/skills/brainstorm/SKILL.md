---
name: brainstorm
description: Brainstorm article angles, hooks, and framings for the project's brand voice — divergent ideation, not outlining.
when_to_use: When the user runs /content-studio:brainstorm, or asks to "help me figure out what to write", "give me angles for X", "find a hook for this idea", "what could we write about Y", "turn this customer call into post ideas", or has raw material (a product update, interview notes, a theme) and no fixed angle yet.
argument-hint: <theme, raw material, or nothing>
allowed-tools: Read AskUserQuestion
context: fork
agent: story-editor
---

# brainstorm

Produce 5–8 article angle candidates from vague input. This skill is **divergent** — it widens the option space before the writer commits. Once an angle is chosen, the next step is `/content-studio:outline`, which is the convergent one.

`$ARGUMENTS` may be:

- A theme or area ("contract automation", "Q4 product updates")
- Raw material pasted in (customer interview snippets, support tickets, a product brief)
- A path to a file with raw material (a transcript, a notes file)
- Nothing at all — ask the user what raw material or theme they have

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

Read the brand voice file at `${user_config.voice_guide_path}` (configured at plugin enable time). If the file does not exist there, tell the user to run `/content-studio:init` to write the starter template, then come back. Do not proceed without a voice guide — every angle this skill produces has to be grounded in the brand.

The high-value sections for brainstorming:

- **About the brand** — angles have to be relevant to what the brand actually does.
- **Audience** — every candidate should target a primary or secondary audience from this section. Reject angles that target nobody.
- **Tone shifts by context** — each candidate proposes a format (announcement, deep-dive, customer story, support, opinion); the format determines tone.
- **Examples** — the on-voice / off-voice pairs are the highest-signal indicator of what kind of *ideas* this brand has, not just how they're written.
- **Things we don't write about** — filter every candidate against this. If an angle lands here, don't include it.

## Step 2 — figure out what we have to work with

If `$ARGUMENTS` is empty, ask via `AskUserQuestion`:

> What do you want to brainstorm from?
> - A theme or topic area (e.g. "we want to write more about X")
> - Raw material (paste it, or give a file path: interview notes, a product update, support tickets)
> - Just exploring — I have no specific input

If "Just exploring", surface the audience and the brand's mission from the voice guide and ask "for which audience?" / "tied to which product area or release?". Don't generate generic angles divorced from the brand.

If the user pastes raw material, skim it for: recurring objections, surprises, specific numbers, contrarian takes, quotable moments. Those are the seeds of good angles.

If the user gives a file path, read it.

## Step 3 — generate 5–8 angle candidates

Each candidate should be distinct — different *angles*, not paraphrases of the same angle. Push for variety across these axes:

- **Different audiences** — the brand likely has 2–3 audiences in the voice guide. Spread candidates across them.
- **Different formats** — mix how-to, opinion/POV, customer story, technical deep-dive, announcement, primer/explainer.
- **Different stances** — some descriptive ("here's what changed"), some prescriptive ("here's what you should do"), some contrarian ("here's what most people get wrong").
- **Different specificities** — some grounded in a specific moment (a release, a customer outcome), some broader (a pattern across many customers).

If the raw material won't support 8 distinct angles, generate fewer — quality over count. Five strong > eight diluted.

## Step 4 — output format

Each candidate is a small block:

```markdown
## Angles

### 1. <Working title or angle statement>

- **Angle:** <one-sentence specific take — not the topic, the *take* on the topic>
- **Audience:** <which audience from the voice guide; narrowed>
- **Format:** <how-to | opinion | customer-story | technical | announcement | primer>
- **Hook sentence:** <what the first sentence of the article would literally be — in voice>
- **Why this one:** <one sentence on what makes this specific to this brand, this moment, or this audience>

### 2. <Working title>
…
```

After the candidates, close with a short critic's note — call out which 1–2 you'd push for and why, and which 1–2 are weakest and why. Don't be diplomatic; the point is to help the writer cut.

```markdown
---

**Strongest:** #N and #M — <one-line reason each>
**Weakest:** #N — <one-line reason; usually "no specific reader or moment behind it">
```

## Step 5 — handoff

End with:

> Pick an angle and run `/content-studio:outline` with its working title and hook sentence (plus any of the bullets above) as the brief. Or tell me to expand any of these candidates into a fuller brief first.

If the user wants to expand a candidate, riff with them — but at that point it's a conversation, not a structured skill output. Stay loose, ask what's missing, propose a sharper version.

## Voice rules to apply

- Hook sentences must hit the voice guide's voice adjectives. They are the most concentrated expression of voice in the candidate.
- Strip banned vocabulary from candidate titles and hooks.
- Reject candidates where the only thing specific is the topic. "Contract automation tips" is a topic; "Why batching legal review hurts ops velocity" is an angle.
- Reject candidates that would require unverifiable superlatives ("the best", "the most powerful", "the only") to land.

## What this skill does not do

- It does not commit to one angle — that's the writer's call.
- It does not produce an outline. That's `/content-studio:outline`'s job. If the user pushes for an outline here, point them at `/outline` and offer to hand off the chosen angle.
- It does not do market research or SEO keyword exploration. Bring keywords or competitor analysis to the brief separately.
