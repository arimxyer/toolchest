---
name: draft
description: Draft a full article in the project's brand voice from a brief, outline, or topic. Writes the draft to the configured output directory in markdown, MDX, frontmatter+body, or HTML.
when_to_use: When the user runs /content-studio:draft, or asks to "write a blog post about X", "draft an article on Y", "write up Z in the brand voice", or hands over an outline and wants prose.
argument-hint: <brief or outline>
allowed-tools: Read Write Bash AskUserQuestion
context: fork
agent: staff-writer
---

# draft

Generate a full article in the brand voice and save it to the project's output directory.

`$ARGUMENTS` may be:

- A topic or brief (one sentence to a paragraph).
- An outline (the structured output of `/content-studio:outline`, pasted in).
- A combination ("here's an outline plus extra constraints").

If `$ARGUMENTS` is empty, ask for the brief via `AskUserQuestion`. Do not draft a generic post.

## Step 1 — load voice and resolve format

Settings come from `userConfig` (configured at plugin enable time). The values available:

- `${user_config.voice_guide_path}` — required, path to the brand voice markdown.
- `${user_config.output_dir}` — directory where this skill writes the draft. Default `./drafts`.
- `${user_config.default_format}` — format to emit when the user doesn't specify. Default `markdown`.
- `${user_config.slug_prefix}` — optional, prepended to generated slugs.
- `${user_config.author}` — optional, written into frontmatter for `frontmatter`/`mdx` formats.

Read the brand voice file at `${user_config.voice_guide_path}`. If the file doesn't exist there, tell the user to run `/content-studio:init` to write the starter template, then come back.

If the voice guide still contains starter-template markers — the "Starter template — replace every section" banner at the top, italicized placeholder hints (`_e.g. ..._`, `_Add 1–2 more …_`, `_Add your rules …_`), or the demo "Lexcheck" example pair the scaffold ships with — warn the user that the guide hasn't been customized and the draft will only be as on-voice as the template allows. Continue if the user wants you to, but be honest in the output about which sections you couldn't ground in real brand specifics.

The high-value sections for drafting are:

- **Voice** and its adjective nuance — every paragraph has to defensibly hit these.
- **Tone shifts by context** — pick the row that matches this piece (announcement, deep-dive, support, customer story).
- **Style rules** — sentence length mix, person/POV, headings convention, numbers, Oxford comma.
- **Vocabulary** — preferred terms and the banned list. Run the banned list as a final pass before writing the file (step 5).
- **Examples** — match the cadence of the "on-voice" examples; actively avoid the patterns in the "off-voice" examples.
- **Article structure defaults** — use as the skeleton unless the brief overrides.

Resolve the output format in this order:

1. Explicit instruction in `$ARGUMENTS` ("draft this as MDX", "give me HTML").
2. `${user_config.default_format}`.
3. `markdown` (final fallback if the userConfig value is somehow empty).

Then read [`references/output-formats.md`](references/output-formats.md) (sibling of this SKILL.md) for the per-format spec — frontmatter fields, file extension, body conventions, edge cases.

## Step 2 — refuse the brief if it lands in "Things we don't write about"

Check the brief against the voice guide's "Things we don't write about" section. If it lands there, refuse with a one-line explanation pointing to the specific bullet — don't draft it anyway with a hedge. The user can override by asking you to ignore the voice guide for this run, but they have to ask.

## Step 3 — clarifying questions, only if needed

If the brief is thin (one or two words) AND no outline is attached, ask up to **three** questions in a single `AskUserQuestion`:

- **Angle** — the specific take, not the topic.
- **Reader takeaway** — what they walk away able to do or believe.
- **Length target** — short (500–700), standard (900–1,100), long (1,500+).

Skip clarifying questions if the brief is rich enough. Don't ask just to ask.

## Step 4 — draft the article

Use the voice guide's "Article structure defaults" as the skeleton unless the attached outline overrides.

Voice fidelity checklist while drafting:

- Sentence length mix matches the style rules (e.g. mostly 12–20 words, short for emphasis).
- Person/POV consistent with the voice guide (e.g. first-person plural for brand, second-person for reader).
- No banned vocabulary. **Cross-check against the banned list before writing the file.**
- No filler superlatives ("powerful," "robust," "seamless," "unprecedented") unless the voice guide explicitly approves them.
- Concrete numbers and verbs over abstractions.
- One CTA, not three.

If the format requires frontmatter, generate it per `references/output-formats.md`:

- `title` — sentence case unless voice guide overrides.
- `description` — 140–160 character meta description in voice.
- `date` — today's date.
- `slug` — slugify title (lowercase, hyphenate, strip punctuation, max ~60 chars). Prepend `${user_config.slug_prefix}` if non-empty.
- `author` — `${user_config.author}` if non-empty, else omit the field entirely.
- `tags` — only if the brief gives concrete signals; don't fabricate.
- `draft: true` — always.

## Step 5 — pre-write sanity pass

Before calling `Write`, scan the draft once more:

1. Banned vocabulary — grep the draft text against the voice guide's banned list. If anything hits, rewrite it inline rather than shipping a violation.
2. Voice guide examples — does any paragraph read like the "off-voice" examples? If yes, rewrite.
3. Format spec — frontmatter (if applicable) has all required fields; body uses only constructs the format permits (e.g. no JSX in plain markdown, no `<html>` wrapper in HTML format).

## Step 6 — write the piece

Each piece lives in its own folder under `${user_config.output_dir}`. The draft is one of several artifacts that can accumulate alongside it (outline, critique, headlines).

- The piece directory: `${user_config.output_dir}/<slug>/`
- The draft file inside it: `draft<ext>` where `<ext>` matches the format (`.md`, `.mdx`, `.html`).
- Final draft path: `${user_config.output_dir}/<slug>/draft<ext>`

**Important:** `<slug>` here is the **bare** slug (e.g. `the-song-you-played-most-wasnt-on-any-playlist`). Do **not** prepend `${user_config.slug_prefix}` to the file path. The slug prefix is a frontmatter-only concern — it goes into the `slug:` field inside the YAML block so URLs match the publishing destination, but the working-tree path under `${user_config.output_dir}` stays flat. Example: with `slug_prefix: blog/`, the file goes to `./drafts/the-song-.../draft.md` (flat) while the frontmatter slug reads `blog/the-song-...`.

Steps:

1. `mkdir -p ${user_config.output_dir}/<slug>` — create the piece directory. `<slug>` is bare; no prefix.
2. If the piece directory already contained a `draft<ext>`, **increment the slug, not the file**. Create `<slug>-2/draft<ext>` instead. Each piece stays in its own folder; we don't collapse multiple drafts into one dir.
3. Write the draft via the `Write` tool to the final path.
4. **If the brief contained an inline outline** (the user pasted one in, e.g. from `/content-studio:outline`), also save the outline alongside the draft as `${user_config.output_dir}/<slug>/outline.md`. This makes the piece self-documenting — `/critique` and `/headlines` can reference the outline later. If the user only gave a topic or brief (no outline), skip this; don't fabricate an outline file.

After writing, print to chat:

```
✓ Piece created: <output_dir>/<slug>/
  ├── draft<ext>        (just written)
  ├── outline.md        (saved from the brief, if applicable)

Voice notes:
- <one-line note on any voice-guide tradeoff you made, if any>
- <one-line note on anything you couldn't fully resolve from the brief — e.g. "left a TODO for the customer-quote slot since the brief didn't supply one">

Next: open <output_dir>/<slug>/draft<ext>, edit, then run /content-studio:critique <output_dir>/<slug>/draft<ext> for a voice-guide check.
```

Omit the `outline.md` line from the tree if you didn't save one. If you made zero tradeoffs and left no TODOs, drop the "Voice notes" section entirely. Don't fabricate one to fill space.

## What this skill does not do

- It does not look up SEO keyword volume, do competitor research, or fetch reference URLs. Bring those in the brief.
- It does not publish, schedule, or commit the draft. It writes one file to the output directory and stops.
- It does not generate images or alt-text — leave image slots as `<!-- TODO: image -->`.
- It does not create pieces outside `${user_config.output_dir}` unless the user gives an absolute path AND confirms.
- It does not collapse multiple drafts into one piece directory. Re-running `/draft` with the same title produces a new `<slug>-2/` folder, not a `draft-2<ext>` file. If the user wants iterations of the same piece, they can edit `<slug>/draft<ext>` in place or copy it to a sibling for comparison.
