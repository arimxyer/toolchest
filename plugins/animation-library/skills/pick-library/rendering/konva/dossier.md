---
name: konva
description: Canvas 2D framework for interactive 2D apps — diagrams, whiteboards, editors — with built-in drag, events, and Transformer handles.
---
# Konva

## When to use

- Building interactive 2D canvas apps: diagram editors, whiteboards, seat maps, floor plans, annotation tools.
- Need rich per-shape event handling (click, hover, drag) without managing hit detection manually — Konva uses a hidden hit-graph canvas.
- Building design dashboards or canvas-based tools where users move, scale, and rotate objects (Transformer built-in).
- Want object-oriented scene graph (Stage → Layer → Shape) over raw `<canvas>` calls.
- Using React? Pair with `react-konva` (React bindings, ~950K downloads/wk) for a declarative component model.
- Need serialization: Konva supports JSON export/import of the full scene graph out of the box.

## When NOT to use

- Rendering thousands of sprites or particle effects — Canvas 2D performance ceiling is real; switch to PixiJS (WebGL) for >1K simultaneous animated objects.
- Heavy shader/post-processing effects (blur, glow, bloom) — Canvas 2D Filters are expensive; PixiJS or Three.js are better fits.
- Primary need is inline SVG text editing, custom fonts, or rich SVG import/export — Fabric.js is purpose-built for that workflow.
- 3D scenes — use Three.js, Babylon.js, or react-three-fiber.
- Static image generation at high throughput (server-side Node without DOM) — consider `canvas` (node-canvas) directly.

## Quick facts

| Field | Value |
|---|---|
| Current version | 10.2.5 (2026-04-11) |
| License | MIT |
| Framework support | Vanilla JS; React via `react-konva`; Vue via `vue-konva` |
| Bundle size | ~181 KB min / **~54 KB gzip** |
| Runtime | Canvas 2D API (NOT WebGL) |
| Weekly downloads | ~1.26M (konva) + ~950K (react-konva) |

## See also

- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators vs siblings](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.js)
- [react-konva](../react-konva/dossier.md) — React binding
