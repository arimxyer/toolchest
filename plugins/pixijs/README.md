# PixiJS Plugin

A comprehensive PixiJS v8 development guide with bundled API references, code patterns, and best practices from official documentation.

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

## Usage

The skill triggers automatically when you work with PixiJS code, or invoke it directly:

```
/pixijs:pixijs how do I use ParticleContainer for a particle system?
```

## Updating the docs

The bundled references are a snapshot of PixiJS v8 documentation from [pixijs.com/llms-medium.txt](https://pixijs.com/llms-medium.txt). To refresh:

```bash
curl -sL https://pixijs.com/llms-medium.txt -o /tmp/pixijs-medium.txt
# Then split by topic into the references/ directory
```

The skill also falls back to fetching live docs when bundled content isn't sufficient.
