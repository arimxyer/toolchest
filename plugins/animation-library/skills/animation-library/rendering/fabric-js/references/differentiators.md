# Fabric.js — Differentiators

## Position in the dossier

Fabric.js occupies the **design-editor niche** within the rendering bucket. pkgpulse.com (March 2026) puts it plainly: *"fabric.js for design editors, konva for interactive UIs."* That single sentence captures the library's identity.

## vs. Konva / react-konva (closest sibling)

Both are Canvas 2D object models with selection handles and event systems. The split:

| Dimension | Fabric.js | Konva |
|---|---|---|
| Target use case | Design editors (Canva-like, whiteboard, image editor) | Interactive UIs (draggable dashboards, diagram builders, games-adjacent) |
| React binding | None first-party; community wrappers lag | `react-konva` is official and actively maintained |
| SVG round-trip | First-class: `loadSVGFromURL`, `toSVG()` | Not a priority |
| Inline text editing | `IText` / `Textbox` with cursor, IME, per-char styling | Basic text; no inline editing |
| Image filter pipeline | Built-in WebGL-accelerated filter chain | None built-in |
| API ergonomics | Imperative, vanilla-JS-first | Imperative but `react-konva` wraps it in JSX naturally |

**Decision rule:** if the product is a design editor where users compose, style, and export artwork — Fabric. If it is an interactive application UI where shapes respond to application state managed in React — Konva via react-konva.

## vs. PixiJS / pixi-react (different use case)

PixiJS is a WebGL/WebGPU renderer optimised for **throughput** — thousands of sprites, particle systems, per-frame custom draw calls. Fabric is optimised for **editability** — fewer objects, rich per-object metadata, editor-grade controls.

| Dimension | Fabric.js | PixiJS |
|---|---|---|
| Renderer | Canvas 2D (WebGL only for image filters) | WebGPU / WebGL |
| Object count | Tens to low hundreds at interactive frame rates | Thousands to millions |
| Selection handles | Built-in on every object | Manual implementation |
| React binding | None first-party | `@pixi/react` (official) |
| Primary niche | Design editors, photo editors, whiteboards | Games, data-viz, generative art |

**Decision rule:** choose PixiJS when frame rate and object count matter; choose Fabric when the deliverable is an editing surface.

## vs. Lottie / Rive (different domain)

Lottie and Rive play back pre-authored animations. Fabric is an **authoring tool runtime** — it is for building the tool that creates content, not for playing back the exported result.

## vs. Remotion / Three.js / Babylon.js / react-three-fiber

All are out-of-niche: Remotion is a video-composition framework; the Three/Babylon/r3f group is 3D. None compete with Fabric's design-editor value proposition.

## vs. p5.js / Phaser

p5.js is an immediate-mode creative-coding sketch environment. Phaser is a full game engine. Neither has Fabric's object model, selection system, or SVG interop. Not substitutes.

## Fabric's hard differentiators

1. **Selection + transform controls** — eight resize handles, rotation handle, and skew controls are on every object by default. No other Canvas library ships this at the same level of polish.
2. **`IText` / `Textbox`** — browser-quality text cursor, multi-line wrap, per-character style ranges, IME. Unique in the Canvas 2D space.
3. **SVG import + export fidelity** — the SVG parser handles complex paths, gradients, clip-paths, and pattern fills; `toSVG()` emits clean, round-trippable markup.
4. **JSON serialisation** — `toJSON()` / `loadFromJSON()` captures the entire scene including custom properties; straightforward undo/redo and persistence.
5. **Image filter pipeline** — non-destructive WebGL-accelerated filters (brightness, contrast, saturation, blur, noise, colour-matrix) per image object.
