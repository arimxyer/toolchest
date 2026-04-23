# p5.js — Overview

p5.js is a JavaScript creative-coding library descended from Processing. It provides an immediate-mode drawing API wrapped in a `setup()` / `draw()` loop, targeting 2D Canvas by default with an optional WebGL renderer. Its design goal is accessibility: getting a creative coder from idea to visible output in the fewest possible lines.

## Version history snapshot

| Version | Date | Headline |
|---|---|---|
| 2.2.3 | 2026-03-23 | Patch — latest stable as of 2026-04-22 |
| 2.0.0 | 2025-04-17 | Major: JS shaders (`p5.strands`), OKLCH/LAB/HDR color, variable fonts, `async setup()`, pointer event unification, WebGPU renderer (experimental) |
| 1.11.13 | 2026-04-08 | Patch — last v1.x release; fixes `point()` origin regression |

**p5.js Editor** (the browser IDE at editor.p5js.org) defaults to v1.x and will continue to do so until at least August 2026 — a deliberate migration control, not a deprecation of v2.

## Architecture

p5.js operates in two modes:

- **Global mode** — all p5 functions and constants are injected on `window`. This is the standard sketch-file pattern: bare `setup()` and `draw()` functions in a script, no imports required. Simple, but pollutes the global namespace and is incompatible with ES module bundlers unless explicitly wrapped.
- **Instance mode** — a single `new p5(sketchFn)` call receives the p5 instance as `p`; all functions become `p.background()`, `p.ellipse()`, etc. Required for multi-sketch pages, module environments, and React/Vue integrations.

The core render loop:

1. `preload()` (v1.x) or `async setup()` with awaited load calls (v2.x) — asset loading before first draw.
2. `setup()` — runs once; `createCanvas()` call belongs here.
3. `draw()` — called at `frameRate()` (default 60 fps) via `requestAnimationFrame`. Clears background by convention, then redraws the scene every frame.

## v2.0 key changes (2025-04-17)

### Breaking

| v1.x | v2.x |
|---|---|
| `preload()` for sync loading | `async setup()` + `await loadImage(...)` |
| `quadraticVertex()` | `bezierVertex()` with `bezierOrder(2)` |
| `curveVertex()` (Catmull-Rom, double endpoints) | `splineVertex()` (passes through all points, no doubling) |
| Separate `mousePressed()`, `touchStarted()` | Unified pointer events |

### Additive

- **`p5.strands`** — author GPU shaders in JavaScript (no GLSL). `strokeShader()` and `imageShader()` allow separate shaders per draw type.
- **New color modes**: `OKLCH`, `OKLAB`, `LCH`, `LAB`, `HWB`, `RGBHDR`
- **HDR canvas**: `createCanvas(w, h, P2DHDR)`
- **Variable fonts**: `textWeight()` and `textToContours()` / `textToModel()` for 3D text extrusion
- **`worldToScreen()`** — 3D-to-2D coordinate mapping in WebGL mode
- **`linesMode(SIMPLE)`** — fast WebGL lines without caps/joins overhead
- **WebGPU renderer** — opt-in, separate file (`p5.webgpu.js`); requires `async setup()` and `await createCanvas(w, h, WEBGPU)`

## Community context

- **Processing Foundation governance** — p5.js is steered by a community organization; not venture-backed.
- **Tezos partnership (2023)** — Processing Foundation entered an NFT/blockchain partnership that caused friction in the creative-coding community. Development velocity was unaffected and the library remains the dominant tool in its niche.
- **120 K weekly npm downloads** — no serious alternative has emerged in the creative-coding space.
- **Companion library**: `p5.js-compatibility` (https://github.com/processing/p5.js-compatibility) eases v1 → v2 migration by polyfilling removed APIs.

## npm

```
npm install p5
```
