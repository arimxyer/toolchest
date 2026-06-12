# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Claude Code plugin marketplace published as `arimxyer/toolchest`. Content/docs repo — markdown, JSON, and one Python helper. No build, no tests, no lint, no CI. Don't add a toolchain (package.json, CI workflow, test runner) without asking first.

## Repo layout

- `.claude-plugin/marketplace.json` — marketplace manifest, the source of truth for which plugins are published
- `README.md` — public-facing plugin table
- `plugins/<name>/` — one directory per plugin: `.claude-plugin/plugin.json`, `README.md`, and usually `skills/<skill-name>/SKILL.md`. Not every plugin ships skills — `ty-lsp` ships an `.lsp.json` (LSP server config) instead, has no slash commands, and its root-README Skill column is `—`. `writers-room` additionally ships subagents in `agents/<agent>.md` (auto-discovered, registered as `writers-room:<agent>`).
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

## writers-room is an agent-bundling micro-system

`plugins/writers-room/` couples seven agents and two skills around a per-piece workspace (`content/<slug>/` with `MEMO.md`, `research/notes.md`, `draft.md`, `critiques/`, final piece, `distribution.md`).

Load-bearing details:

- The `showrunner` agent's `Agent(...)` allowlist names every worker in namespaced form (`writers-room:<agent>`). Adding, renaming, or removing an agent requires updating that allowlist — bare names break delegation silently.
- Each agent's body documents the one workspace file it owns; file ownership is a behavioral contract, not a tool restriction (all specialists carry Read/Write/Edit).
- Skill-consumed templates live inside the skills: `skills/convene/references/MEMO.template.md`, `skills/establish-brand/references/BRAND.template.md`. `convene` passes the memo template's path to the showrunner.
- `convene` and `establish-brand` must stay main-thread (no `context: fork`) — they interview the user, and subagents have no `AskUserQuestion`.
- Smoke-test pattern (verified 2026-06-12 on haiku): `claude -p "..." --plugin-dir plugins/writers-room --model claude-haiku-4-5 --allowedTools "Agent,Read,Write,Edit,Glob,Grep"` from a throwaway directory, then inspect the produced `content/<slug>/` tree.

## design-md ships executable code

`plugins/design-md/skills/design-md/scripts/design-to-theme.py` is the only executable in the tree. If you touch it, keep it stdlib-only — there's no Python toolchain wired up.

## Hooks installed

`.claude/settings.local.json` runs `prettier --write` on any edited `.json` file via PostToolUse. The hook is gitignored (machine-local — assumes prettier is on PATH). It validates JSON as a side effect, so a broken edit to `marketplace.json` or `plugin.json` will fail loudly.
