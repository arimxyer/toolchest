# PixiJS Agent Skill

A comprehensive [Agent Skill](https://agentskills.io) for PixiJS v8 development. Provides bundled API references, code patterns, and best practices from official PixiJS documentation.

## What it does

When you're working with PixiJS, this skill gives your AI agent access to:

- **Core API references** — Application, Container, Sprite, Graphics, Text, Ticker, Assets, and more
- **Scene graph & rendering** — Render groups, render layers, render loop, performance optimization
- **Events & interaction** — Pointer, mouse, touch events, hit areas, accessibility
- **Visual effects** — Filters, blend modes, color, math utilities, textures
- **Asset management** — Loading, bundles, manifests, compressed textures, SVGs
- **v7 to v8 migration** — Complete migration guide with side-by-side code comparisons
- **Ecosystem libraries** — React integration, Layout, Spine, Filters, Sound, UI, AssetPack
- **Three.js interop** — Sharing WebGL contexts between PixiJS and Three.js

The skill uses a hybrid approach: bundled reference docs for fast, detailed answers, with fallback to fetching live documentation from [pixijs.com/llms.txt](https://pixijs.com/llms.txt) when deeper detail is needed.

## Installation

### Claude Code (plugin)

```bash
/plugin marketplace add arimayer/pixijs-skill
```

### Claude Code (manual)

```bash
git clone https://github.com/arimayer/pixijs-skill.git ~/.claude/skills/pixijs
```

### Other Agent Skills-compatible tools

Follow your tool's instructions for installing skills from GitHub repositories.

## Usage

The skill triggers automatically when you:

- Work with PixiJS code or `import` from `'pixi.js'`
- Ask about PixiJS APIs (Sprite, Container, Graphics, Ticker, etc.)
- Ask about the PixiJS ecosystem (pixi-react, pixi-filters, pixi-sound, etc.)
- Migrate from PixiJS v7 to v8
- Work with 2D canvas graphics, WebGL/WebGPU 2D rendering

You can also invoke it directly:

```
/pixijs how do I use ParticleContainer for a particle system?
```

## Structure

```
pixijs-skill/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── pixijs/
│       ├── SKILL.md
│       └── references/
│           ├── index.md
│           ├── getting-started.md
│           ├── architecture.md
│           ├── application.md
│           ├── scene-objects.md
│           ├── text.md
│           ├── visual-effects.md
│           ├── interaction.md
│           ├── assets.md
│           └── migration.md
└── LICENSE
```

## Updating the docs

The bundled references are a snapshot of PixiJS v8 documentation from [pixijs.com/llms-medium.txt](https://pixijs.com/llms-medium.txt). To refresh:

```bash
curl -sL https://pixijs.com/llms-medium.txt -o /tmp/pixijs-medium.txt
# Then split by topic into the references/ directory
```

The skill also falls back to fetching live docs when bundled content isn't sufficient.

## License

Apache 2.0 — see [LICENSE](LICENSE).

Documentation content is sourced from the [PixiJS project](https://pixijs.com/) under the MIT license.
