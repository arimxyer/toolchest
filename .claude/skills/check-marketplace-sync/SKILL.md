---
name: check-marketplace-sync
description: Verify that plugins/, .claude-plugin/marketplace.json, and the root README plugin table are all in sync. Reports any plugin that appears in one or two of those places but not all three. Use when the user asks to check, audit, or verify the marketplace state.
disable-model-invocation: true
allowed-tools: Read, Bash
---

# check-marketplace-sync

Verify the three sources of truth for the plugin list agree.

## The three sources

1. **Filesystem** — directories under `plugins/` that contain `.claude-plugin/plugin.json`
2. **Marketplace manifest** — entries in `.claude-plugin/marketplace.json`'s `plugins[]` array
3. **Public README table** — rows under "## Available Plugins" in the root `README.md`

A plugin is in sync only if it appears in all three.

## Procedure

1. List plugin directories: every `plugins/<name>/` that contains a `.claude-plugin/plugin.json`.

   ```bash
   for d in plugins/*/; do
     name=$(basename "$d")
     [ -f "$d/.claude-plugin/plugin.json" ] && echo "$name"
   done | sort
   ```

2. List plugin names from the marketplace manifest:

   ```bash
   jq -r '.plugins[].name' .claude-plugin/marketplace.json | sort
   ```

3. List plugin names from the README table — read `README.md` and extract the first column of every row in the "Available Plugins" table whose name is not `↳` (the continuation marker for additional skills of the same plugin). Names appear wrapped in backticks: `` `pixijs` ``, `` `animation-library` ``, etc.

4. Compare the three sets. Report:
   - **Missing from marketplace.json** — directory exists, no manifest entry
   - **Missing from README table** — directory exists, no README row
   - **Orphan in marketplace.json** — manifest entry with no directory
   - **Orphan in README table** — README row with no directory
   - **In sync** — appears in all three

   Use a small table:

   ```
   plugin              dir  manifest  readme
   pixijs              ✓    ✓         ✓
   animation-library   ✓    ✓         ✓
   ```

5. Also verify each `plugins/<name>/.claude-plugin/plugin.json` parses as JSON (`jq -e . <file> > /dev/null`). Report any parse failures.

6. If anything is out of sync, ask the user whether to fix it. Do not silently patch.

## Out of scope

- Don't compare description strings across the three sources for drift — only check presence.
- Don't check per-plugin `README.md` skill tables — that's a separate concern.
- Don't modify any files unless the user explicitly asks for a fix.
