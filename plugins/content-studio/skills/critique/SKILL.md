---
name: critique
description: Critique an existing article draft against the project's brand voice guide. Reports issues with line refs and suggested rewrites, then offers to apply the edits.
when_to_use: When the user runs /content-studio:critique, or asks to "review this post for voice", "check this draft against the brand guide", "audit this article", or "what's off-voice in this draft".
argument-hint: <path-to-draft>
allowed-tools: Read Edit Bash AskUserQuestion
---

# critique

Review a draft against the brand voice guide. Output a report first, then offer to apply the suggested edits.

`$ARGUMENTS` is the path to the draft file. If empty, ask for it. Do not critique a draft pasted into chat without a file path — `/critique` is meant to operate on files so edits can be applied.

## Step 1 — load voice + draft

Read the brand voice file at `${user_config.voice_guide_path}` (configured at plugin enable time). If the file doesn't exist there, tell the user to run `/content-studio:init` to write the starter template, then come back.

The sections that drive critique:

- **Voice** adjectives + nuance.
- **Tone shifts by context** — figure out which row applies to this draft (announcement, deep-dive, support, customer story). If it's ambiguous, ask the user.
- **Style rules** — sentence length, person/POV, headings convention, numbers, Oxford comma, lists policy.
- **Vocabulary** — preferred terms and banned list.
- **Examples** — the on-voice / off-voice pairs are the highest-signal comparator.
- **Article structure defaults** — does the draft have the expected sections in roughly the right order?

Read the draft file. Confirm extension (`.md`, `.mdx`, `.html`) — the critique still applies, but pre-existing formatting (frontmatter, JSX components) should be left alone unless it directly violates the voice guide.

## Step 2 — generate the critique report

Categorize findings into five buckets. Skip any bucket with no findings — empty buckets are noise.

1. **Vocabulary violations** — every banned word/phrase that appears, with the line number and a suggested replacement.
2. **Style rule violations** — sentence length out of range, wrong person/POV, headings not in the prescribed case, list-vs-prose violations, number formatting.
3. **Voice tone drift** — paragraphs or sentences that read like the off-voice examples (filler superlatives, marketing jargon, vague abstractions). Quote the offending text + a rewrite.
4. **Structural issues** — missing hook, weak CTA, multiple CTAs, no concrete example, sections out of expected order.
5. **Subject-matter concerns** — anything that lands in "Things we don't write about", competitor mentions if disallowed, unverifiable claims.

Report format:

```markdown
# Critique: <draft path>

**Overall:** <one-line verdict — e.g. "On-voice with three vocabulary swaps; structure is solid."> 

## Vocabulary (N)
- L<line>: "<offending phrase>" → "<suggested replacement>"
- L<line>: …

## Style (N)
- L<line>: <issue> — <suggested fix>

## Tone drift (N)
- L<line> ("<short quote>"): <why it's off-voice; reference the voice guide if the rule is named there>
  - Rewrite: "<replacement sentence>"

## Structure (N)
- <issue and where>

## Subject matter (N)
- <issue and where>

---
**Verdict:** ship-ready / one more pass / substantial rewrite needed
```

If there are zero findings, say so explicitly:

```markdown
# Critique: <draft path>

No voice-guide violations found. The draft is on-voice.
```

Print the report to chat. Do not write it to a file unless the user asks.

## Step 3 — offer to apply edits

If there are findings with concrete rewrites (vocabulary swaps and tone-drift rewrites are the high-confidence cases), ask via `AskUserQuestion`:

> Apply these edits to `<draft path>`?
>
> - Yes — apply all rewrites
> - Selected only — pick which edits to apply
> - No — leave the file unchanged

Style/structure/subject-matter findings are usually too contextual to auto-apply — note that in the question wording. For "Selected only", ask the user to name the line numbers or categories to apply.

If the user picks **No**, stop. Done.

## Step 4 — git safety check (before any edit)

If the user said yes (full or selected apply), run a git status check on the draft path **before** calling `Edit`:

```bash
git ls-files --error-unmatch <draft-path> 2>&1
git status --porcelain <draft-path>
```

Three cases:

- **Tracked + clean** (`ls-files` exits 0 AND porcelain output is empty): proceed to apply.
- **Tracked + dirty** (porcelain shows `M` / `A` / etc.): warn the user that the file has uncommitted changes that could be lost if a rewrite goes wrong, and ask:
  > The file has uncommitted changes. Apply rewrites anyway, or commit / stash first?
  > - Apply anyway
  > - Stop so I can commit first
- **Untracked** (`ls-files` errors with `error: pathspec`): warn that the file isn't in git and there's no easy rollback, and ask the same question.
- **No git repo** (`git status` errors): tell the user there's no git safety net here, ask:
  > This project isn't a git repo, so I can't offer rollback. Apply rewrites anyway?

If the user picks "Stop", do nothing. The report is still in chat.

## Step 5 — apply edits

For each rewrite the user approved, use `Edit` with the original phrase as `old_string` and the suggested rewrite as `new_string`. Use enough surrounding context to make `old_string` unique.

If `Edit` fails because the snippet isn't unique, fall back to reading the file, finding the right occurrence, and providing a larger context window. Don't `replace_all` rewrites — line context matters.

After applying:

```
✓ Applied N edits to <draft path>
  - L<line>: "<before>" → "<after>"
  - …

Skipped (require human judgment):
  - <style/structure/subject-matter items that weren't auto-applied>

Run /content-studio:critique <draft path> again to verify, or git diff to review.
```

## What this skill does not do

- It does not fact-check claims in the draft. Voice fidelity ≠ factual accuracy.
- It does not rewrite the whole article — it makes targeted edits. If the draft needs a substantial rewrite, the report's "Verdict" line should say so, and the user should run `/content-studio:draft` again with a tighter brief.
- It does not commit. The user owns the commit.
