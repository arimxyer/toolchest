# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Claude Code plugin marketplace published as `arimxyer/toolchest`. Content/docs repo — markdown, JSON, and one Python helper. No build, no tests, no lint, no CI. Don't add a toolchain (package.json, CI workflow, test runner) without asking first.

## Repo layout

- `.claude-plugin/marketplace.json` — marketplace manifest, the source of truth for which plugins are published
- `README.md` — public-facing plugin table
- `plugins/<name>/` — one directory per plugin: `.claude-plugin/plugin.json`, `README.md`, `skills/<skill-name>/SKILL.md`
- `.claude/skills/` — repo-maintenance skills (`/scaffold-plugin`, `/check-marketplace-sync`). These are NOT published; they only run inside this repo.

**Published skills live at `plugins/<plugin>/skills/<skill>/SKILL.md` — not `.claude/skills/`.**

## Adding a new plugin: three-place sync

Three files must stay in sync; nothing enforces it automatically:

1. `.claude-plugin/marketplace.json` — add the plugin entry
2. `plugins/<name>/.claude-plugin/plugin.json` — the plugin's own manifest
3. `README.md` — append a row to the "Available Plugins" table

Use `/scaffold-plugin <name>` instead of hand-editing. For adding a skill *inside* an existing plugin, also update that plugin's own `README.md` skill table.

## Plugin metadata conventions

- **Owner**: `arimxyer` everywhere (`marketplace.json`, `plugin.json` `author.name`, `repository` URL). The local git user is `arimayer` — do not use it as the owner string. Copy from an existing `plugin.json`.
- **License**: `Apache-2.0` (SPDX identifier). Matches the repo's `LICENSE` file.
- **Commit style**: imperative sentence-case ("Add design-md plugin"). Not Conventional Commits.

## Skill frontmatter is not standardized

Existing SKILL.md files differ in which optional fields they use (`argument-hint`, `allowed-tools`, `metadata`, `license`, `compatibility`) and even in `allowed-tools` separator (space vs comma). Don't unify across plugins without asking — each plugin's frontmatter is its own.

## animation-library is a coupled micro-system

Three skills cooperate inside `plugins/animation-library/`:

- `pick-library` selects and freshness-checks; dispatches `refresh-library` on version drift
- `scaffold-library` generates new dossiers from `skills/scaffold-library/template/`
- `refresh-library` re-verifies a dossier against npm

Load-bearing details:

- The `Version researched` row in each dossier's Quick-facts table is parsed by `pick-library`. Don't drop or rename it.
- Use `/animation-library:scaffold-library <slug>` to add a library — don't hand-copy the template.
- Adding a library also requires updating `pick-library/SKILL.md`'s description trigger list, its Library-index table, and `COMPARISON.md`.

## content-studio: `slug_prefix` is frontmatter-only

`userConfig.slug_prefix` (in `plugins/content-studio/.claude-plugin/plugin.json`) prepends to the `slug:` field inside YAML frontmatter only. It does **not** affect the working-tree file path — piece folders stay flat under `output_dir` (e.g. `slug_prefix: blog/` produces `./drafts/<slug>/draft.md` on disk and `slug: blog/<slug>` in frontmatter).

Don't "fix" this to apply the prefix to the file path too. The split is intentional: `output_dir` answers "where do I author?" and `slug_prefix` answers "what URL prefix does the publishing system want?" — collapsing them into one knob is what caused the original leak that v3.2.1 fixed. If a user wants nested workspace folders, they stack it into `output_dir` instead. The behavior is documented in three places (`plugin.json`, the plugin's `README.md`, and `skills/draft/SKILL.md`); keep them aligned if you change any one.

## design-md ships executable code

`plugins/design-md/skills/design-md/scripts/design-to-theme.py` is the only executable in the tree. If you touch it, keep it stdlib-only — there's no Python toolchain wired up.

## Hooks installed

`.claude/settings.local.json` runs `prettier --write` on any edited `.json` file via PostToolUse. The hook is gitignored (machine-local — assumes prettier is on PATH). It validates JSON as a side effect, so a broken edit to `marketplace.json` or `plugin.json` will fail loudly.
