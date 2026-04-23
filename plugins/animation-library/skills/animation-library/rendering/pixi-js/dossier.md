---
name: pixi-js
description: 2D WebGL/WebGPU renderer for high-performance sprites, particles, and per-frame canvas work — not for DOM animation or 3D.
---
# PixiJS

## When to use

- You need high-throughput 2D rendering: thousands of sprites, particle systems, or per-frame custom draw calls at 60 fps.
- The deliverable is a game, interactive data-viz, or generative canvas experience — not a document UI.
- You want first-class WebGPU (v8+) with automatic WebGL fallback and a stable, well-supported API.
- You're building a scene graph where transforms, culling, blend modes, and filters need to compose correctly across a hierarchy.
- You want to pair PixiJS with GSAP or Motion for tweening while keeping PixiJS in charge of the render loop.

## When NOT to use

- DOM/CSS animation — use GSAP, Motion, or WAAPI; PixiJS owns a canvas and is invisible to the DOM.
- 3D scenes — use Three.js, Babylon.js, or react-three-fiber; PixiJS is strictly 2D.
- Accessible, interactive UI widgets (forms, lists, tooltips) — Konva or the DOM are better fits; hit-testing in PixiJS requires manual work.
- Static design-editor experiences (infinite canvas, object selection, snap-to-grid) — fabric-js or Konva are purpose-built for that niche.
- React-component tree integration without @pixi/react — the imperative API fights React's render model.

## Quick facts

| Field | Value |
|---|---|
| Current version | 8.18.1 (released 2026-04-14) |
| License | MIT |
| Framework support | Vanilla JS/TS; React via [@pixi/react](../pixi-react/dossier.md) (React 19+) |
| Bundle size | ~244 KB gzipped / ~857 KB minified (v8.18.1, bundlephobia) |
| Runtime | WebGPU (first-class, v8+) → WebGL fallback → experimental Canvas fallback |
| Weekly npm downloads | ~578 K |

## See also

- [../pixi-react/dossier.md](../pixi-react/dossier.md) — React bindings for PixiJS
- [../konva/dossier.md](../konva/dossier.md) — Canvas 2D API focused on interactive UIs; stronger React story via react-konva
- [../three-js/dossier.md](../three-js/dossier.md) — 3D rendering; can share a WebGL context with PixiJS
- [../../motion/gsap/dossier.md](../../motion/gsap/dossier.md) — The standard animation-engine pair for PixiJS scenes
