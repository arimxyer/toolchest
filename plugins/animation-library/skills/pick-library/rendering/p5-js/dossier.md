---
name: p5-js
description: Creative-coding sketch library for generative art, educational prototypes, and interactive canvas work — not a production UI or game engine.
---
# p5.js

## When to use

- You are building **generative art, creative experiments, or interactive sketches** where the drawing API is the primary interface.
- The project is **educational or prototypal** — p5's immediate-mode API (global `setup()` / `draw()` loop) gets you pixels on screen in 10 lines.
- You want **2D Canvas or WebGL** with a high-level, beginner-friendly API and no boilerplate; the underlying renderer detail is not the priority.
- You're working in **instance mode** on a page with multiple isolated sketches, or wrapping a p5 sketch inside a larger app without polluting `window`.
- You need **v2.x shaders authored in JS** (`p5.strands`) with no GLSL, or **OKLCH / HDR color modes**, or **variable font** support for typographic generative pieces.

## When NOT to use

- **Production app UI** — p5 is a canvas sketch library, not a UI framework; DOM layout, accessibility, and React reconciliation are all outside its scope.
- **React component trees** — there is no maintained first-class React binding; wiring p5 into React requires a ref + effect wrapper and fights React's lifecycle. Choose react-three-fiber (3D) or react-konva (2D UI) instead.
- **Sprite-heavy or performance-critical 2D rendering** — p5's immediate-mode draw calls have no retained scene graph or GPU batching; for particle systems or 60 fps sprite work, PixiJS is the right tool.
- **Full 2D game development** — Phaser provides scenes, cameras, physics, and input management that p5 does not.
- **LGPL-sensitive commercial products** — see drawbacks.

## Quick facts

| Field | Value |
|---|---|
| Current version | 2.2.3 (2026-03-23) |
| License | LGPL-2.1 |
| Framework | Vanilla JS — global mode (sketch globals on `window`) or instance mode (`new p5(sketch)`) |
| Bundle size | ~275 KB gzipped / ~960 KB minified (bundlephobia, p5@2.2.3) |
| Runtime | 2D Canvas (`P2D`, default) · WebGL (`WEBGL`) · WebGPU (`WEBGPU`, experimental, separate file) |
| Weekly npm downloads | ~120 K (week of 2026-04-15) |

## See also

- [references/overview.md](references/overview.md) — architecture, v2.0 changes, ecosystem context
- [references/api.md](references/api.md) — core API: `createCanvas`, lifecycle, instance mode, key globals
- [references/differentiators.md](references/differentiators.md) — how p5.js sits in the 30-library dossier
- [references/drawbacks.md](references/drawbacks.md) — honest caveats: globals, bundle weight, LGPL, v1→v2 migration
- [references/sources.md](references/sources.md) — all primary sources with retrieval date
- [../pixi-js/dossier.md](../pixi-js/dossier.md) — production 2D sprite/particle rendering with scene graph
- [../phaser/dossier.md](../phaser/dossier.md) — full 2D game framework (uses PixiJS as renderer)
- [../three-js/dossier.md](../three-js/dossier.md) — 3D WebGL/WebGPU rendering
