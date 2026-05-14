---
name: init
description: Onboarding flow for content-studio's brand voice guide — discover existing guides in the project, author one with the user, infer one from existing repo content, or scaffold a blank starter template at the configured voice_guide_path.
when_to_use: When the user runs /content-studio:init, or asks to "set up content-studio", "add a brand voice file", "initialize the blog writing plugin", "find my brand voice guide", "help me write a brand voice guide", or wants the voice guide established before any other content-studio skill will run.
argument-hint: "[path-override] [--author | --infer | --blank] [--no-discover]"
allowed-tools: Read Write Bash AskUserQuestion
---

# init

Establish a brand voice guide at `${user_config.voice_guide_path}` so the rest of content-studio can run. The runtime gate in every consuming skill (brainstorm, outline, draft, critique, headlines) refuses to operate against a missing or placeholder-shaped guide, so getting this skill to write a real guide is a hard prerequisite for the plugin's value — it is the only path past the gate.

There are four authoring paths the user can land on, depending on whether a usable guide already exists in the project:

1. A voice-guide-shaped file is **discovered** elsewhere in the working tree → point at it, copy it, or ignore it.
2. The user picks **author** — walk them through a short interview, fill in the template with their answers.
3. The user picks **infer** — sample existing content in the repo, draft a guide tagged `[inferred — verify]` for the user to audit.
4. The user picks **blank** — scaffold the unmodified starter template at the target path (the pre-v3.3.0 behavior).

## Argument parsing

`$ARGUMENTS` may contain:

- A bare path (any token that doesn't start with `--`) → one-off override of the target path for this run. Doesn't update `voice_guide_path` config; for a persistent change, edit `pluginConfigs.content-studio@toolchest.options.voice_guide_path` in this project's `.claude/settings.json` (or re-run `claude plugin install content-studio@toolchest --scope project` to be re-prompted).
- `--author` / `--infer` / `--blank` → skip the interactive prompt at Step 4 and go straight to that branch. At most one of these may be passed.
- `--no-discover` → skip Step 2 (discovery). Useful when the user knows there's nothing existing to find or wants to author/scaffold directly.

Extract any flags from `$ARGUMENTS`. The first remaining non-flag token (if any) is the path override.

## Step 1 — Resolve target path

If a non-flag argument was passed, use it as the target path for this run. Otherwise use `${user_config.voice_guide_path}` (configured at plugin enable time, default `./brand-voice.md`).

Hold this path as `<target>` for the rest of the skill.

## Step 2 — Discover existing voice-guide-shaped files

Skip this step if `--no-discover` was passed.

Search the working tree for files that look like voice guides someone might already have written. Use Bash with `find`:

```bash
find . -maxdepth 3 -type f \
  \( -iname 'brand-voice*.md' \
     -o -iname 'voice-guide*.md' \
     -o -iname 'VOICE*.md' \
     -o -iname 'style-guide*.md' \
     -o -iname 'tone-of-voice*.md' \) \
  -not -path '*/node_modules/*' \
  -not -path '*/.git/*' \
  -not -path '*/dist/*' \
  -not -path '*/build/*' \
  -not -path '*/.next/*' \
  -not -path '*/vendor/*' \
  2>/dev/null
```

Three outcomes:

- **No matches** → continue to Step 3.
- **One or more matches, and `<target>` is among them** → continue to Step 3 (Step 3 handles the file-at-target case).
- **One or more matches, none at `<target>`** → present them to the user. Ask via `AskUserQuestion`:

  > Found voice-guide-shaped file(s) outside the configured path. What do you want to do?
  >
  > - **Point `voice_guide_path` at one of these** — I'll tell you how to update the config (hand-edit `.claude/settings.json` or re-run `claude plugin install`). This skill does not edit `settings.json` directly.
  > - **Copy one to `<target>`** — I'll copy a chosen file to `<target>` and continue.
  > - **Ignore — keep building at `<target>`** — continue to Step 3 as if nothing was found.

  When multiple files are discovered, list them in the question's description so the user can pick by index. Don't try to merge multiple discovered files into one — that's over-clever.

  - If the user picks **point**, instruct them to update `voice_guide_path` to the discovered path — either by editing `pluginConfigs.content-studio@toolchest.options.voice_guide_path` in this project's `.claude/settings.json` directly, or by re-running `claude plugin install content-studio@toolchest --scope project` to be re-prompted. Then stop the init flow. Their next consuming-skill invocation will read from the new path.
  - If the user picks **copy**, copy the chosen file to `<target>` (Read + Write, or `cp`). Then check `<target>` against the sentinel set in Step 3. If it's authored, stop with success; if it still contains sentinels (unusual for a real guide, possible if the discovered file is a partly-filled scaffold), note that and continue to Step 4 with `<target>` marked as "exists but unedited."
  - If the user picks **ignore**, continue to Step 3.

## Step 3 — Check the target path

Look at `<target>`. Three cases:

- **No file at `<target>`** → no overwrite risk. Continue to Step 4.
- **File exists at `<target>` AND it's authored** (no canonical sentinels appear in the file): the guide is already in place and ready. Print:

  ```
  ✓ Voice guide already authored at <target>.

  Nothing to do here — the content-studio skills will pick it up. If you want to re-author from scratch, move or delete <target> and re-run /content-studio:init.
  ```

  Stop. Do not continue to Step 4. Preserving the authored guide matters more than re-running cleanly.
- **File exists at `<target>` AND it's still unedited template** (any canonical sentinel matches): note this fact in working memory. Continue to Step 4. At write time (Step 5), prompt the user to confirm overwriting the existing unedited file before clobbering it.

The canonical sentinel set (same list used by the runtime gate in every consuming skill):

- `Starter template — replace every section`
- `Lexcheck`
- `_Add 1–2 more`
- `_Add 2–4`
- `_Add your rules`
- `[inferred — verify]`

The non-blocking flag `_e.g. ` does **not** count toward "unedited" for this skill — the gate treats it as informational, and so should init.

## Step 4 — Choose an authoring path

If `--author`, `--infer`, or `--blank` was passed in `$ARGUMENTS`, go straight to that branch (skip the prompt).

Otherwise present the choice via `AskUserQuestion`:

> How do you want to author the voice guide?
>
> - **(a) Author with me** — I'll ask a short series of questions (brand, audience, voice adjectives, examples, off-limits topics) and fill in the template with your answers. Best when you know the brand voice but haven't written it down.
> - **(b) Infer from existing repo content** — I'll sample existing markdown in your project (blog posts, README, etc.) and draft a guide tagged `[inferred — verify]` for you to audit. Best when you have a body of work that already exhibits the voice. Not useful in a fresh empty repo.
> - **(c) Blank template** — I'll scaffold the starter template at `<target>`; you fill it in yourself later. Best when you want to author it offline at your own pace.

### Branch (a) — Author with me

Run a short interview in chat (not via `AskUserQuestion` — the answers are too open-ended for multiple-choice). Split the questions into three groups across three turns so the user isn't hit with a wall of questions all at once.

**Group 1 — Brand and audience** (ask first, then wait for the user's reply):

1. **Brand one-liner.** What does the company/site do? Who does it serve? What's the core promise? (One paragraph.)
2. **Primary audience.** Who's the main reader? Their role, what they care about, what they take for granted, what they're skeptical of. (Optional: one secondary audience.)

**Group 2 — Voice and vocabulary** (ask after Group 1 reply):

3. **Three voice adjectives, each with one sentence of nuance.** Adjectives alone are useless — the nuance makes them actionable. Example shape: "Confident, not boastful. State what the product does. Don't claim superlatives we can't prove."
4. **Two vocabulary items to avoid.** Words or phrases the brand should never use. (Common offenders: "AI-powered", "seamless", "unlock", "revolutionize" — but the user names theirs.)

**Group 3 — Examples and off-limits topics** (ask after Group 2 reply):

5. **Two on-voice / off-voice example pairs.** For each pair: a short paragraph (2–4 sentences) that sounds *right* for the brand, a short paragraph that sounds *wrong*, and one sentence per side on why. If the user only has energy for one pair, accept one — note in Step 5's output that the second pair is missing.
6. **One or two things the brand doesn't write about.** Off-limits topics or stances, with a one-sentence reason each.

After all three groups have replies, compose the populated guide:

- Start from the template at `assets/brand-voice-template.md` (sibling of this SKILL.md).
- Replace each section with the user's answers where they answered.
- For sections the user didn't address (Tone shifts by context, Style rules, Article structure defaults), **leave the template's placeholder content in place verbatim**. Critical: do not invent answers. Leaving the placeholder sentinels in those sections means the user knows what's still unfilled and the runtime gate keeps reminding them.
- Show the user the assembled draft in chat for review before writing. The user may want to tweak a phrasing before the file lands.

Proceed to Step 5 to write.

### Branch (b) — Infer from existing repo content

Sample text content from the working tree to draft a guide grounded in what's already there.

**Source selection** (Bash):

- Search `.` with `-maxdepth 4` (deep enough to catch nested doc dirs, shallow enough to skip noise).
- Match `-name '*.md'`.
- Exclude the standard build/vendor paths: `node_modules`, `.git`, `dist`, `build`, `.next`, `vendor`.
- Exclude the configured output directory `${user_config.output_dir}` — drafts written by `/content-studio:draft` are not authoritative voice sources (they're outputs of the system, not inputs to it).
- Exclude `<target>` itself (and the template at `assets/brand-voice-template.md` if it's somehow in scope).
- Suppress errors with `2>/dev/null`.

**Prioritize** files matching these patterns when picking which to read first:

1. `posts/**`, `articles/**`, `blog/**`, `content/**` — highest signal for voice.
2. Root-level `README.md` — useful for brand framing.
3. Other `.md` files — lower priority, still candidates if higher priority is empty.

**Cap** the sample at **10 files total / ~50KB of text**. If many files match, pick the highest-priority ones first; if a single file alone would push past 50KB, truncate to its first ~5KB.

**Empty-repo fallback**: if sampling finds no usable content (empty repo, no markdown outside `output_dir`, or all sampled files are clearly outside the brand's voice — like vendored docs), tell the user:

> Couldn't find enough existing content to infer a voice from. Falling back to the blank template — you can fill it in yourself, or re-run `/content-studio:init --author` to author interactively.

Then fall through to branch (c).

**Inference** (if sampling yielded content):

For each sampled file, look for:

- **Tone descriptors** — formal/casual, technical/approachable, energetic/measured, plain-spoken/literary.
- **Audience hints** — who's being addressed (engineers, marketers, customers, prospects), reading level, vocabulary density.
- **Vocabulary patterns** — repeated brand-specific terms (candidates for the "preferred" column), conspicuously absent generic SaaS terms (candidates for "banned").
- **Sentence-level examples** — pick 1–2 paragraphs that read as strongly representative of the voice. These become the "on-voice example" entries in the guide.
- **Topic boundaries** — what the existing content does and doesn't cover.

Compose a guide from the template, filling in each section with the inferred content. **Tag every claim** with `[inferred — verify]` at the end of the claim. Example:

```
- **Confident, not boastful.** State what the product does without superlatives. [inferred — verify]
```

This tag is load-bearing. The runtime gate in every consuming skill blocks until all `[inferred — verify]` tags are removed from the file. That forces the user to audit each claim — confirm, edit, or strike — before the guide goes into use. Without this, the infer branch would produce a guide that silently passes the gate, defeating the gate's purpose.

Sections where the sample provides no useful signal stay as placeholder template content (which the gate also catches via its other sentinels).

Proceed to Step 5 to write.

### Branch (c) — Blank template

Copy `assets/brand-voice-template.md` (sibling of this SKILL.md) verbatim to `<target>`. Same behavior as the pre-v3.3.0 `/content-studio:init`. No transformation, no interview, no inference.

Proceed to Step 5 to write.

## Step 5 — Write and print next steps

If Step 3 noted that `<target>` already contains an unedited template, ask before overwriting via `AskUserQuestion`:

> Overwrite the unedited template at `<target>`?
>
> - **Yes** — replace with the newly-authored content
> - **No** — keep the existing file as-is, stop without writing

If the user picks **No**, stop without writing. The work done in Step 4 is lost; that's the user's choice. (Branch (a)'s composed guide and branch (b)'s inferred draft were only in chat at this point — no file written yet.)

Otherwise:

1. Create any missing parent directories: `mkdir -p $(dirname <target>)`.
2. Write the composed content to `<target>` via the `Write` tool.
3. Print a tailored next-steps message based on which branch ran.

### After branch (a) — Author with me

```
✓ Voice guide written: <target>

Authored from your answers: <list the sections the user filled in>
Sections still placeholder-shaped: <list any unanswered sections, or "none" if the user covered everything>

The runtime gate in every content-studio skill will continue to block until any remaining placeholder markers are cleared. Open <target> to finish those sections (or to tweak your authored answers), then try:
  /content-studio:outline <topic>
```

### After branch (b) — Infer from existing repo content

```
✓ Voice guide drafted: <target>

⚠ Every claim in this draft is tagged [inferred — verify] because it was extracted from your existing content rather than authored by you. The runtime gate will block /content-studio:draft and the other consuming skills until you audit each tag and remove it.

Workflow:
  1. Open <target>.
  2. Read each [inferred — verify] claim. Confirm it (remove the tag), edit it (update the claim, then remove the tag), or strike it (delete the bullet entirely).
  3. When all tags are gone, the gate will pass and the skills will run.

Files sampled (N): <list paths>
```

### After branch (c) — Blank template

```
✓ Brand voice guide written: <target>

Next:
  1. Edit <target> — every section is placeholder content. The voice guide is the most important input to the other content-studio skills.
  2. Add 2–4 on-voice / off-voice example pairs. These do more for output quality than any other section.
  3. The runtime gate will block /content-studio:draft and the other consuming skills until the placeholder sentinels are gone.

Settings live in this project's `.claude/settings.json` under `pluginConfigs.content-studio@toolchest.options`. Hand-edit the file and run `/reload-plugins` to pick up changes. To re-run the install prompt for values, use `claude plugin install content-studio@toolchest --scope project`.
```

Do not print user_config values in the status report — they may not resolve to literal values in all modes (e.g. `--plugin-dir` testing), and the user already configured them at install time. The pointer to `.claude/settings.json` is enough for the user who needs to inspect or change settings.

## What this skill does not do

- It does not write a settings file. All settings come from the plugin's `userConfig` block (set at install time, stored under `pluginConfigs` in this project's `.claude/settings.json`). If the user picks "point `voice_guide_path` at a discovered file" in Step 2, tell them how to update the config (hand-edit `.claude/settings.json` or re-run `claude plugin install … --scope project`) — the skill itself does not edit settings files.
- It does not commit the new file. Leave that to the user.
- It does not edit `.gitignore`. The voice guide is content meant to be committed and shared with the team; leave it tracked.
- The infer branch does not promise correctness — it produces a draft with audit tags, and the user is responsible for verifying each claim. The runtime gate enforces this by blocking until the tags are gone.
- It does not look in other repos. Discovery and inference run on the current working tree only. If your voice-bearing content lives in a separate repo, copy a representative subset into this repo before running infer, or use author instead.
- It does not merge multiple discovered voice guides. If discovery finds several, the user picks one (or copies one to `<target>`); the rest are ignored.
