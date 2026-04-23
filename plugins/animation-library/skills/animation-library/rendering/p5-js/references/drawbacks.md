# p5.js — Drawbacks & Honest Caveats

## Sketch-mode globals pollute `window`

Global mode injects every p5 function and constant onto `window` — `background`, `fill`, `stroke`, `noise`, `map`, `random`, and ~200 more. In a plain HTML page this is tolerable; in a module-bundled app it is a namespace collision hazard and violates ESM conventions. **Instance mode** (`new p5(sketchFn)`) solves this but requires prefixing every call with `p.`, which is verbose and surprises developers coming from the docs/tutorials (which all show global mode).

There is no React reconciler binding. Wiring p5 into a React component requires `useRef` + `useEffect` + manual cleanup of the p5 instance — fiddly, non-idiomatic, and easy to leak. No maintained first-party solution exists for React integration.

---

## Bundle weight

~275 KB gzipped / ~960 KB minified (bundlephobia, p5@2.2.3) is substantial. For context, PixiJS v8 is ~244 KB gzipped for a full retained-mode 2D engine with scene graph and asset pipeline. p5's weight includes a monolithic API surface (geometry, math, color, typography, image manipulation, WebGL, sound via addon) in a single non-tree-shakeable file.

There is no supported sub-package or tree-shaking story — you ship the whole library or nothing. For pages that use only basic 2D drawing, the bundle is significantly oversized.

---

## v1 → v2 migration gotchas

v2.0.0 (2025-04-17) introduced several breaking changes:

- **`preload()` removed** — replace with `async setup()` + `await loadImage(...)`, `await loadFont(...)`, etc. Any v1 sketch using `preload()` breaks silently (it just doesn't load assets before drawing).
- **`quadraticVertex()` removed** — replaced by `bezierVertex()` with `bezierOrder(2)`. Callers must change code.
- **`curveVertex()` → `splineVertex()`** — renamed and behavior changed (no need to double the first/last point). Existing curve sketches will draw incorrectly without edits.
- **Pointer event unification** — `mousePressed()`, `touchStarted()`, etc. still exist but the unified `pointerPressed()` / `pointerMoved()` are the new canonical form. Mixing old and new handlers can produce double-firing.

The **p5.js Editor** (editor.p5js.org) defaults to v1.x until at least August 2026. Sketches written and tested there are on v1; deploying the same sketch with `npm install p5` (which resolves to v2) will break without migration. This is the single most common source of "it worked in the editor but broke in production" reports.

The `p5.js-compatibility` addon (https://github.com/processing/p5.js-compatibility) polyfills some removed APIs but is not a complete bridge.

---

## LGPL-2.1 licensing implications

p5.js is licensed under **LGPL-2.1**, not MIT. The practical implication:

- **Dynamic linking (CDN `<script>` tag or separate file)** — generally compliant; LGPL permits use without disclosure obligations when the library is kept separable.
- **Static linking (npm bundled into your app)** — standard bundlers (Webpack, Vite, esbuild, Rollup) inline p5 into your output bundle. This constitutes static linking under most interpretations of LGPL. LGPL-2.1 requires that a user be able to relink the combined work with a modified version of the library, which is practically impossible once inlined.

For **open-source projects**: not a concern.
For **commercial closed-source apps bundling p5 via npm**: get a legal review before shipping. Some teams work around this by loading p5 from a CDN and accessing it via `window.p5` rather than importing it, preserving separability.

This is a real and under-documented gotcha. Most library comparisons omit it because the community leans toward open-source creative work.

---

## WebGPU is experimental and separate

The WebGPU renderer ships as a separate file (`p5.webgpu.js` / `p5.webgpu.min.js`) and is not bundled in the default `p5.js` or `p5.min.js`. Using it requires:

1. A separate import/script tag.
2. `async setup()` with `await createCanvas(w, h, WEBGPU)`.
3. WebGPU browser support (unavailable on Firefox stable as of early 2026; partial on older Safari).
4. Awareness that `loadPixels()` and `get()` are async in WebGPU mode.

Do not treat WebGPU as a drop-in upgrade from the default P2D renderer.

---

## Immediate-mode has a performance ceiling

Every frame you call `background()`, then draw every shape from scratch. There is no scene graph, no dirty-tracking, no GPU batching of static geometry. For sketches with hundreds of shapes this is fine; for thousands of animated objects it will hit frame-rate limits that PixiJS's retained-mode renderer would not.

If you find yourself implementing your own object pool and trying to minimize per-frame draw calls inside p5, you have likely grown out of p5 and should evaluate PixiJS or a canvas 2D API directly.

---

## No official TypeScript types in v1.x

Type definitions for v1.x were community-maintained and incomplete. v2.x improves this significantly (global-mode TypeScript support is explicitly fixed in the v2.0 changelog), but if you are on v1.x, expect gaps in the type coverage.
