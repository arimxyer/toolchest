---
name: headlines
description: Generate headline variations and SEO metadata (meta description, slug, og:title) for an article in the project's brand voice.
when_to_use: When the user runs /content-studio:headlines, or asks for "headline options for this post", "title variations", "an og:title", a "meta description", "SEO metadata", or "a better title for this article".
argument-hint: <topic, brief, or draft path>
allowed-tools: Read Edit Write Bash AskUserQuestion
context: fork
agent: headline-editor
---

# headlines

Produce 5–8 headline candidates plus the SEO/social metadata that goes with the chosen one.

`$ARGUMENTS` may be:

- A short brief or topic.
- A file path to an existing draft (skill reads the draft to ground the headlines in actual content).
- Nothing — ask the user what the article is about.

## Step 1 — load voice

Read the brand voice file at `${user_config.voice_guide_path}` (configured at plugin enable time). If the file doesn't exist there, tell the user to run `/content-studio:init` to write the starter template, then come back.

The high-value sections for headlines:

- **Voice** adjectives — headlines are the most concentrated expression of voice.
- **Style rules** — heading case convention (sentence case vs title case), number formatting, banned punctuation like em-dashes / parentheses if specified.
- **Vocabulary** — banned list applies double for headlines.
- **Examples** — match the cadence of any titles in the on-voice examples. Avoid the patterns in off-voice examples.
- **Audience** — drives reading level and what's allowed to be unexplained.

If `$ARGUMENTS` is a file path, read the draft. Headlines should be specific to its actual claim, not a guess from the topic alone.

## Step 2 — generate 5–8 candidates across angles

Variety is the point — produce candidates from different angles so the user can pick the one that matches their goal:

- **Plain descriptive** — what the article actually is. ("How a 12-minute first pass changes contract review")
- **Outcome-led** — what the reader gets. ("Cut contract review from three hours to twelve minutes")
- **Question** — only if the voice guide allows. ("What does a 12-minute contract review actually catch?")
- **Counterintuitive / point-of-view** — only if the article actually has a take. ("Why the slow contract review was never the bottleneck")
- **Plain-spoken / conversational** — if voice allows.

Skip any angle that would force a banned vocabulary word or violate style rules. Don't produce eight headlines if five are obviously stronger — quality over count.

Output as a numbered list with a one-line note on each:

```markdown
## Headlines

1. **<headline>** — _<angle>; <length: N chars>_
2. **<headline>** — _<angle>; <length: N chars>_
…
```

Note the character count after each — useful because most SEO tools cap titles around 55–60 characters before truncation.

## Step 3 — produce SEO + social metadata for one chosen headline

After listing candidates, pick the strongest one yourself (or use the first candidate the user names) and produce the full metadata bundle:

```markdown
## Metadata for: "<chosen headline>"

- **title:** <chosen headline — full version>
- **meta description:** <140–160 chars; on-voice; specific; describes what the article is, not a tease>
- **slug:** <kebab-case-of-title>  <!-- with ${user_config.slug_prefix} prepended if non-empty -->
- **og:title:** <may differ from title if title is >60 chars — shorter, more punchy>
- **og:description:** <can match meta description, or be slightly more conversational if voice allows>
- **twitter:title:** <if different from og:title — usually it's not>
- **tags:** [<2–5 lowercase hyphenated topic tags — only if you have concrete signals from the draft>]
```

Rules for metadata:

- **Meta description** is a sentence or two, in voice, that completes the headline's promise. It is **not** a teaser ("Read on to find out…") — it should stand alone and tell the reader what the article delivers.
- **Slug** uses `${user_config.slug_prefix}` if non-empty; otherwise just the slugified title.
- Honor `${user_config.default_format}`: if it's `frontmatter` or `mdx`, the metadata bundle maps directly into the frontmatter fields the `/draft` skill would emit. Call that out at the end so the user can paste it straight in.

### Persist the headlines bundle to the piece directory (when applicable)

If the target draft lives inside a piece directory (path matches `${user_config.output_dir}/<slug>/draft.<ext>`), also write the chat output — the candidates list + chosen metadata bundle — to `${user_config.output_dir}/<slug>/headlines.md`.

**Overwrite behavior on subsequent runs:**

- If `headlines.md` exists in the piece dir, **overwrite** it. Headlines are a one-shot per piece; the most recent set is canonical. No value in stacked history (unlike `critique.md`, which appends).

If the target draft is **not** inside a piece directory (a flat-structure draft or a one-off file), skip the file write. Chat output only.

To detect: parent directory of the target draft is itself under `${user_config.output_dir}` and the draft file is named `draft.<ext>`. If both are true, it's a piece dir.

## Step 4 — offer to update the draft's frontmatter

This step only runs if `$ARGUMENTS` was a path to an existing draft file AND the file's format supports frontmatter (markdown with frontmatter, MDX). Otherwise skip to Step 5.

Ask the user via `AskUserQuestion`:

> Update `<path>`'s frontmatter with these fields?
>
> - Yes — apply the metadata bundle to the draft's frontmatter
> - No — leave the file unchanged

If the user picks **No**, skip to Step 5.

If the user picks **Yes**, run a git status check on the draft path *before* calling `Edit`:

```bash
git ls-files --error-unmatch <draft-path> 2>&1
git status --porcelain <draft-path>
```

Four cases:

- **Tracked + clean** (`ls-files` exits 0 AND porcelain output is empty): proceed to apply.
- **Tracked + dirty** (porcelain shows `M` / `A` / etc.): warn the user that the file has uncommitted changes that could be lost, and ask:
  > The file has uncommitted changes. Apply frontmatter update anyway, or commit / stash first?
  > - Apply anyway
  > - Stop so I can commit first
- **Untracked** (`ls-files` errors with `error: pathspec`): warn that the file isn't in git and there's no easy rollback, and ask the same question.
- **No git repo** (`git status` errors): warn there's no git safety net, and ask:
  > This project isn't a git repo, so I can't offer rollback. Apply frontmatter update anyway?

If the user picks "Stop", skip to Step 5. The headlines bundle is still in chat and (if applicable) saved to the piece dir.

If approved, use `Edit` to modify the frontmatter block in place — only the frontmatter, never the body. Map the metadata bundle fields directly to frontmatter keys (`title`, `description`, `slug`, `og:title`/`ogTitle`, etc., matching the existing frontmatter's casing convention).

## Step 5 — close

End with:

> Pick a candidate above and reply with the number to lock metadata for a different headline.

If the draft frontmatter wasn't updated (no draft path, or user said no, or stopped at git-safety), also offer:

> Or paste the metadata bundle above into the article's frontmatter yourself.

## What this skill does not do

- It does not check SEO keyword volume, search competition, or rank potential. Bring keyword research yourself if you need it.
- It does not generate the article body — that's `/draft`.
- It does not A/B test headlines or score them — it offers options the writer chooses from.
