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
| `content-studio` | `/content-studio:init` | Scaffold the brand voice guide. Plugin prompts for voice-guide path, output directory, and default format at enable time via `userConfig`; also ships a six-agent writer's room (`managing-editor`, `editor-in-chief`, `story-editor`, `staff-writer`, `copy-editor`, `headline-editor`) that wraps the skills with role-specific philosophy |
| ↳ | `/content-studio:brainstorm` | Divergent ideation — produce 5–8 distinct article angle candidates (with hook sentences) from a theme, raw material, or interview notes |
| ↳ | `/content-studio:outline` | Generate a structured outline (headings, key points, CTA) from a brief, tuned to the brand voice |
| ↳ | `/content-studio:draft` | Draft a full article from a brief or outline; writes to the configured output directory in markdown, MDX, frontmatter+body, or HTML |
| ↳ | `/content-studio:critique` | Critique an existing draft against the voice guide; reports issues with line refs, then offers to apply edits (with git-safety check) |
| ↳ | `/content-studio:headlines` | Generate headline variations plus SEO metadata (meta description, slug, og:title) in the brand voice |

## License

Apache 2.0 — see [LICENSE](LICENSE).
