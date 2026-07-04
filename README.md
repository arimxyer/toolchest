# Toolchest

A plugin marketplace for [Claude Code](https://claude.ai/code) and other [Agent Skills](https://agentskills.io)-compatible tools.

## Installation

### Claude Code

```bash
# Add the marketplace (one-time)
/plugin marketplace add arimxyer/toolchest

# Browse and install plugins
/plugin install <plugin-name>@toolchest
```

### Skills CLI

```bash
npx skills add arimxyer/toolchest
```

## Available Plugins

| Plugin | Skill | Description |
|--------|-------|-------------|
| `pixijs` | `/pixijs:pixijs` | PixiJS v8 development guide with bundled API references, code patterns, and best practices |
| `animation-library` | `/animation-library:pick-library` | Selector over 30 JS/TS motion + rendering library dossiers with a cross-library comparison matrix; runs a freshness check against npm before returning guidance |
| ↳ | `/animation-library:scaffold-library` | Generate a new library dossier from the bundled template — fetches current docs, wires the entry into the comparison matrix and index |
| ↳ | `/animation-library:refresh-library` | Re-verify a dossier against npm's latest; dispatched automatically by `pick-library` on version drift |
| `sudo-askpass` | `/sudo-askpass:sudo-askpass` | Help agents run sudo commands from non-interactive Linux sessions by detecting, configuring, and safely using askpass helpers |
| `design-md` | `/design-md:design-md` | Author and convert DESIGN.md design systems — 8 section references, Tailwind v4/v3 conversion guide, worked examples, and a Python `theme.css` generator |
| `ty-lsp` | — | Astral's ty language server for Python — real-time type-checking diagnostics via LSP (no slash command; starts automatically for `.py` files) |
| `writers-room` | `/writers-room:convene` | Hand off a topic and get back a finished, on-brand piece, produced by a showrunner-led room of six editorial subagents (strategist, researcher, staff writer, line editor, skeptical reader, distribution editor); checks for a `BRAND.md` and helps create one |
| ↳ | `/writers-room:establish-brand` | Create or refresh the `BRAND.md` brief the room writes to — interviews you for voice, audience, pillars, and examples |
| `dioxus` | `/dioxus:dioxus` | Documentation router for Dioxus (Rust cross-platform GUI framework) — maps every 0.7 guide page to its fetchable source (llms.txt, raw markdown, docs.rs), version-aware, with an inline 0.7 gotchas cheat-sheet |

## License

Apache 2.0 — see [LICENSE](LICENSE).
