---
name: init
description: Scaffold the brand voice guide and plugin settings for content-studio — writes a starter brand-voice.md and .claude/content-studio.local.md.
when_to_use: When the user runs /content-studio:init, or asks to "set up content-studio", "add a brand voice file", "initialize the blog writing plugin", or wants the starter brand voice template written into their project.
argument-hint: "[voice-guide-path]"
allowed-tools: Read Write Bash AskUserQuestion
---

# init

Set up the two files content-studio needs in a project:

1. A brand voice guide (markdown) — the source of truth for tone, vocabulary, examples, and audience.
2. A plugin settings file at `.claude/content-studio.local.md` — points the other skills at the voice guide and configures output paths.

If invoked as `/content-studio:init <path>`, use `$ARGUMENTS` as the desired voice-guide path. Otherwise ask.

## Step 1 — decide where the voice guide lives

Default: `./brand-voice.md` at the project root.

Common alternatives the user may prefer:

- `./docs/brand-voice.md`
- `./content/brand-voice.md`
- `./.claude/brand-voice.md`

Ask once via `AskUserQuestion` only if `$ARGUMENTS` is empty and the default would collide with an existing file. Use the existing file's path if one is already present at any of the common locations — don't overwrite.

## Step 2 — write the brand voice file

If the chosen path does **not** exist, copy the starter template at [`assets/brand-voice-template.md`](assets/brand-voice-template.md) (sibling of this SKILL.md) to the chosen path. Write it verbatim — it's intentionally placeholder-heavy so the user knows what to fill in.

If the chosen path **already** exists, do not overwrite. Tell the user the file is already there and move on to step 3.

## Step 3 — write the settings file

Path: `.claude/content-studio.local.md` (project-local, gitignored per Claude Code convention for `.local.md` files).

Create `.claude/` if it doesn't exist. Write this content, substituting `<voice_guide_path>` with the path chosen in step 1:

```markdown
---
voice_guide_path: <voice_guide_path>
output_dir: ./drafts
default_format: markdown
---

# content-studio settings

Edit the frontmatter above to configure the content-studio plugin.

## Fields

- **voice_guide_path** — path to the brand voice guide markdown file. Read by every content-studio skill.
- **output_dir** — directory where `/content-studio:draft` writes generated articles. Created on first draft.
- **default_format** — one of: `markdown`, `mdx`, `frontmatter`, `html`. The format `/content-studio:draft` emits when the user doesn't specify. `frontmatter` means YAML frontmatter + markdown body (for static-site generators).

## Optional fields

- **slug_prefix** — string prepended to generated slugs (e.g. `posts/`, `blog/`).
- **author** — author string written into frontmatter when format is `frontmatter` or `mdx`.
```

If the settings file already exists, leave it alone — show its current contents to the user instead of overwriting.

## Step 4 — confirm and point to next steps

After writing both files, print a short status:

```
✓ Brand voice guide:   <voice_guide_path>
✓ Settings file:       .claude/content-studio.local.md

Next:
  1. Edit <voice_guide_path> — every section is placeholder content. The voice guide is the most important input to the other skills.
  2. Add 2–4 on-voice / off-voice example pairs. These do more for output quality than any other section.
  3. When ready, try: /content-studio:outline <topic>
```

Do not silently fill the voice guide with brand-specific content — the user has to write it. The template's placeholders are doing the work of teaching the user *what* to write.

## What this skill does not do

- It does not infer the brand voice from the project's existing content. That's a separate, much larger task — the user should drive it themselves.
- It does not commit the new files. Leave that to the user.
- It does not edit `.gitignore`. The `.local.md` convention is already gitignored in most Claude Code projects; if the user's project isn't set up that way, point it out but don't modify their gitignore.
