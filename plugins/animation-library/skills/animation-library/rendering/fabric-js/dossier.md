---
name: fabric-js
description: Canvas 2D design-editor library — built-in selection handles, inline text editing, SVG import/export. Pick it for Canva-likes and whiteboards.
---
# Fabric.js

## When to use

- You are building a **design editor** (Canva-like, whiteboard, diagram tool) that needs built-in selection, resize, rotate, and skew handles out of the box.
- You need **inline rich-text editing** directly on canvas — Fabric's `Textbox` handles cursor, selection, IME, and per-character styling.
- You need **SVG round-trip**: load an SVG file onto the canvas as editable objects, then export it back to SVG without loss.
- You need **per-object transforms** — position, scale, rotation, skew — managed as an object model rather than imperative draw calls.
- You want **image filtering** (brightness, contrast, blur, saturation) applied non-destructively through a WebGL-backed filter pipeline on top of Canvas 2D.

## When NOT to use

- **Interactive UI widgets** (drag-and-drop lists, custom controls, game entities) — use Konva, which is optimised for the interactive-UI niche; Fabric is designed for design-editor workflows, not reactive component trees.
- **Sprite-heavy or particle-intensive rendering** — use PixiJS (WebGL/WebGPU, thousands of objects at 60 fps); Fabric's Canvas 2D renderer cannot match that throughput.
- **React-first project** — there is no first-party React binding; community wrappers (`react-fabric`, `fabricjs-react`) exist but lag behind Fabric's core releases and carry maintenance risk.
- **3D or WebGL scenes** — Fabric is Canvas 2D only; use Three.js, Babylon.js, or react-three-fiber.

## Quick facts

| Field | Value |
|---|---|
| Current version | 7.3.1 (2026-04-19) |
| License | MIT |
| Framework support | Vanilla JS/TS only. **No first-party React binding.** Community wrappers available but unsupported. |
| Bundle size | ~89 KB gzipped / ~291 KB minified (v7.3.1, bundlephobia, 2026-04-22) |
| Runtime | Canvas 2D API (WebGL used only for image filter pipeline) |
| Weekly npm downloads | ~780 K (week of 2026-04-15) |

## See also

- [../konva/dossier.md](../konva/dossier.md) — Canvas 2D focused on interactive UIs; stronger React story via react-konva
- [../pixi-js/dossier.md](../pixi-js/dossier.md) — WebGL/WebGPU renderer for high-throughput sprites and particles
- [../react-konva/dossier.md](../react-konva/dossier.md) — React bindings for Konva; the React-native canvas option
