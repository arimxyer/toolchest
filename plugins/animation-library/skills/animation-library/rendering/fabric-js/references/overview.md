# Fabric.js — Overview

Fabric.js is a Canvas 2D object model and SVG parser for the browser (and Node.js via `node-canvas`). Its core proposition is a **persistent, interactive scene graph** on top of the raw Canvas 2D API — every shape, image, or text block is a first-class object with built-in selection handles, transform controls, and event hooks.

## Design philosophy

Where libraries like PixiJS optimise for render throughput, Fabric optimises for **editor-grade interactivity**: object picking, multi-select, per-object controls, clipboard, undo/redo via JSON serialisation, and SVG round-trips. The Canvas 2D renderer is intentional — it keeps the library cross-platform and avoids WebGL complexity for a niche where frame rate is less critical than object-model fidelity.

## Version history snapshot

| Version | Date | Headline change |
|---|---|---|
| 7.3.1 | 2026-04-19 | Publishing fix over 7.3.0 |
| 7.3.0 | 2026-04-18 | Rollup → Rolldown build; gradient controls; cropping enhancements |
| 7.1.0 | 2025-12-31 | Cropping controls extension; text positioning fixes |
| 7.0.0 | 2025-12-22 | Stable release from RC1 |
| 6.x | 2023–2024 | Security fixes (prototype pollution, regex); incremental improvements |
| 5.x | 2022–2023 | ESM refactor; TypeScript types shipped; `fabric.Canvas` → named `Canvas` export |

> **API churn note:** v5 removed the `fabric.*` global namespace in favour of named ESM exports (`import { Canvas, Rect } from 'fabric'`). Code written for v4 and earlier requires migration. v7 continues on this ESM baseline.

## Architecture

- **Canvas** (`import { Canvas }`) — the interactive canvas; tracks active objects, handles mouse/touch events, fires selection events.
- **StaticCanvas** — render-only variant; no interactivity overhead. Use for server-side rendering or export pipelines.
- **FabricObject** hierarchy — `Rect`, `Circle`, `Ellipse`, `Line`, `Polyline`, `Polygon`, `Path`, `Image`, `Group`, `Text`, `IText`, `Textbox`.
- **Controls system** — each object has a `controls` map (corner handles, rotation handle, mid-edge handles). Controls are fully customisable or replaceable.
- **Filter pipeline** — `Image` objects support a `filters` array (brightness, contrast, blur, saturation, noise, colour-matrix, etc.) executed via WebGL where available, Canvas 2D as fallback.
- **Serialisation** — `canvas.toJSON()` / `canvas.loadFromJSON()` for full scene round-trips; `canvas.toSVG()` / `loadSVGFromURL()` for SVG interop.

## Key object types

| Class | Use |
|---|---|
| `Rect`, `Circle`, `Ellipse`, `Polygon` | Basic shapes with fill, stroke, shadow |
| `Path` | Arbitrary SVG path data |
| `Image` | Bitmap with filter pipeline |
| `Group` | Composite object; transforms apply to all children |
| `Text` | Static styled text |
| `IText` | Click-to-edit text (single style per object) |
| `Textbox` | Auto-wrapping editable text with per-character styling |

## Event system

```javascript
canvas.on('selection:created', ({ selected }) => { /* ... */ });
canvas.on('object:modified', ({ target }) => { /* ... */ });
canvas.on('mouse:down', (e) => { /* ... */ });
```

Events fire on both the canvas and individual objects. The `object:modified` event is the primary hook for undo/redo stacks.

## npm

```
npm install fabric
```

Weekly downloads: ~780 K (week of 2026-04-15, npm registry API).
