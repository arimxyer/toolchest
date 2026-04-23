# Konva — Differentiators vs Siblings

## Within the rendering bucket

### vs pixi-js (WebGL performance tier)

| | Konva | PixiJS |
|---|---|---|
| Renderer | Canvas 2D API | WebGL (Canvas 2D fallback) |
| Performance ceiling | ~hundreds of interactive objects | Thousands to tens of thousands of sprites |
| Event handling | Built-in hit graph per shape | Manual or via `@pixi/events` |
| Drag / Transformer | Built-in | Manual or third-party |
| Filters/shaders | Canvas 2D filters (CPU) | GLSL shaders (GPU) |
| Weekly downloads | ~1.26M | ~578K |
| Pick when | Each object responds to user input | Raw throughput matters (particles, games) |

**HN consensus (item 43410988, March 2025):** pick Konva for React + interactive 2D UI; pick PixiJS when the scene exceeds ~1K simultaneously animated objects.

### vs fabric-js (design editor tier)

Fabric.js is optimized for design editors: inline text editing on canvas, SVG import/export, object grouping with clip paths, and free-draw. Konva has none of that built in. If the product requirement is "Figma-like text editing" or "import an SVG and let users move its parts," Fabric.js is the correct choice.

### vs react-konva (React binding)

`react-konva` is the official React wrapper around `konva` — it re-exports Konva shapes as JSX components and syncs React state with the Konva scene graph. Use `konva` directly for vanilla JS or non-React frameworks; use `react-konva` for React apps. The two share the same runtime (installing `react-konva` also requires `konva` as a peer dep). Downloads: ~950K/wk (react-konva) vs ~1.26M/wk (konva) — suggesting significant vanilla/Vue usage of konva directly.

### vs lottie / rive

Lottie and Rive play back pre-authored animations (After Effects exports, Rive editor files). Konva is a programmable scene graph — you build and manipulate the scene in code. Different jobs: playback vs. construction.

### vs react-three-fiber / three-js / babylon-js

All three are 3D engines. Konva is 2D only.

### vs remotion

Remotion composes video from React components rendered server-side. Konva is a runtime interactive canvas; it does not produce video output natively.

## Within the motion bucket (for completeness)

Konva includes its own Tween/Animation system. It should not be combined with GSAP or anime.js targeting the same properties — pick one animation driver per node. GSAP can drive Konva node properties via getter/setter calls if needed, but this is an advanced pattern.

## Summary pick guide

| Need | Pick |
|---|---|
| Interactive shapes, drag, Transformer | **konva** |
| React + interactive canvas | **react-konva** |
| >1K animated sprites, games, WebGL | **pixi-js** |
| Inline text editing, SVG import | **fabric-js** |
| 3D | **react-three-fiber** / **three-js** |
| Pre-authored animation playback | **lottie** / **rive** |
