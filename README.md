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

## License

Apache 2.0 — see [LICENSE](LICENSE).
