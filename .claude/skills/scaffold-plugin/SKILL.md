---
name: scaffold-plugin
description: Scaffold a new plugin in the toolchest marketplace. Creates plugins/<name>/ with .claude-plugin/plugin.json, README.md, and skills/<skill>/SKILL.md, then patches the root marketplace.json and the root README plugin table. Use when the user asks to add, scaffold, or create a new plugin.
argument-hint: <plugin-name> [first-skill-name]
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Bash, AskUserQuestion
---

# scaffold-plugin

Add a new plugin to this marketplace, keeping the three sources of truth in sync.

## Inputs

- `$1` — plugin name (kebab-case, required). Becomes the directory name and the `name` field everywhere.
- `$2` — first skill name (optional, kebab-case). Defaults to the plugin name.

If `$1` is missing, ask the user. Do not invent a name.

## Before doing anything

Gather these from the user in a single `AskUserQuestion` call (don't echo back the plugin name — ask only what you don't have):

1. **One-line description** for the plugin. Will appear in `plugin.json`, `marketplace.json`, and the root README row.
2. **First skill description** (one line). Will appear in the first SKILL.md frontmatter and the README row.

Then propose the full file plan in chat before writing — list every file you'll create and every file you'll modify with a one-line summary. Wait for approval.

## Plugin shape: skills vs LSP

This template scaffolds a **skill-based** plugin. For an **LSP-server** plugin (like `ty-lsp`), deviate: skip `skills/<skill>/SKILL.md` and the first-skill questions entirely, and instead create `.lsp.json` at the plugin root (server-name → `{command, args, extensionToLanguage}`); the root README table's Skill column gets `—`. The three-place sync and metadata conventions below still apply unchanged.

## File plan

Create:

- `plugins/<plugin>/.claude-plugin/plugin.json`
- `plugins/<plugin>/README.md`
- `plugins/<plugin>/skills/<skill>/SKILL.md`

Modify:

- `.claude-plugin/marketplace.json` — append plugin entry to `plugins[]`
- `README.md` — append row to "Available Plugins" table

## Templates

Base every field on existing files. The owner string is `arimxyer` and the license is `Apache-2.0` — do not substitute the local git user.

### `plugins/<plugin>/.claude-plugin/plugin.json`

```json
{
  "name": "<plugin>",
  "description": "<one-line description>",
  "version": "1.0.0",
  "author": {
    "name": "arimxyer"
  },
  "repository": "https://github.com/arimxyer/toolchest",
  "license": "Apache-2.0"
}
```

### `plugins/<plugin>/README.md`

Minimal — mirror the structure of `plugins/sudo-askpass/README.md`:

```markdown
# <Title-Case Plugin Name>

<One-paragraph description of what the plugin does.>

## What It Does

- <bullet>
- <bullet>

## Usage

It can also be invoked directly:

```text
/<plugin>:<skill> <args>
```
```

### `plugins/<plugin>/skills/<skill>/SKILL.md`

```markdown
---
name: <skill>
description: <one-line skill description>
---

# <skill>

<Body of the skill — what it does and when to use it.>
```

Leave optional frontmatter (`argument-hint`, `allowed-tools`, `metadata`) off the starter SKILL.md. Frontmatter style varies across this repo's plugins; the user can add fields when the skill's shape is clear.

### `.claude-plugin/marketplace.json`

Append to the `plugins` array, matching the existing object shape exactly:

```json
{
  "name": "<plugin>",
  "source": "./plugins/<plugin>",
  "description": "<one-line description>",
  "version": "1.0.0",
  "author": {
    "name": "arimxyer"
  },
  "license": "Apache-2.0"
}
```

Use the `Edit` tool with a unique anchor (e.g., the closing `]` of `plugins[]` plus the preceding `}`) to insert. After editing, verify by reading the file back. The prettier hook will reformat it on save — that's expected.

### `README.md`

Append a row to the "Available Plugins" table. Match the existing column order: `| <plugin> | /<plugin>:<skill> | <description> |`.

## Verification

After writing all files, run:

```bash
jq -e . .claude-plugin/marketplace.json > /dev/null
jq -e . plugins/<plugin>/.claude-plugin/plugin.json > /dev/null
```

Both should exit 0. Then list what was created and ask the user to review.

## Out of scope

- Don't commit the changes — leave that to the user.
- Don't run `/check-marketplace-sync` automatically; offer it as a follow-up if useful.
- Don't fabricate a real implementation for the first skill — the skeleton above is intentional. The user will fill in the body.
