---
name: init
description: Scaffold the brand voice guide for content-studio — writes a starter brand-voice.md at the configured path so the user has something to edit.
when_to_use: When the user runs /content-studio:init, or asks to "set up content-studio", "add a brand voice file", "initialize the blog writing plugin", or wants the starter brand voice template written into their project.
argument-hint: "[voice-guide-path-override]"
allowed-tools: Read Write Bash
---

# init

Write the brand voice starter template into the project so the user has something concrete to edit. All other content-studio configuration (output directory, default format, slug prefix, author) is set via the plugin's `userConfig` at enable time and isn't this skill's concern.

## Where does the voice guide go?

By default, at `${user_config.voice_guide_path}` (configured at plugin enable time, default `./brand-voice.md`).

If `$ARGUMENTS` is non-empty, use it as a one-off override for the path — write the template there for this run. Do not change the configured `voice_guide_path` (the user can do that via plugin settings if they want the override to persist).

## Step 1 — check whether the file already exists

If a file already exists at the target path, do **not** overwrite it. Tell the user:

```
✓ Voice guide already exists: <path>

This skill won't overwrite existing files. If you want a fresh template:
  1. Move or delete <path>
  2. Re-run /content-studio:init
```

Stop here. The voice guide is the user's authored content — preserving it matters more than re-running cleanly.

## Step 2 — write the starter template

If the target path is clear, copy the starter template at [`assets/brand-voice-template.md`](assets/brand-voice-template.md) (sibling of this SKILL.md) to the target path verbatim. The template is intentionally placeholder-heavy — every section teaches the user what to write.

Create any missing parent directories first (`mkdir -p` the dirname).

## Step 3 — confirm and point at next steps

After writing, print:

```
✓ Brand voice guide written: <path>

Plugin settings (configured at install time via userConfig):
  voice_guide_path: ${user_config.voice_guide_path}
  output_dir:       ${user_config.output_dir}
  default_format:   ${user_config.default_format}

Next:
  1. Edit <path> — every section is placeholder content. The voice guide is the most important input to the other skills.
  2. Add 2–4 on-voice / off-voice example pairs. These do more for output quality than any other section.
  3. When ready, try: /content-studio:outline <topic>

To change voice_guide_path, output_dir, default_format, slug_prefix, or author:
  Run /plugin to reconfigure, or edit the values directly in your settings.json under pluginConfigs.
```

## What this skill does not do

- It does not write a settings file. All settings now come from the plugin's `userConfig` block (set at enable time, stored under `pluginConfigs` in your settings.json).
- It does not infer the brand voice from existing site content. That's a separate, much larger task — the user authors the voice guide themselves.
- It does not commit the new file. Leave that to the user.
- It does not edit `.gitignore`. The voice guide is content meant to be committed and shared with the team; leave it tracked.
