# PixiJS — Drawbacks & Honest Caveats

## v7 → v8 migration friction

v8 (Feb 2024) introduced several breaking changes that affect any project upgrading from v7:

- **`Application.init()` is now async.** Code using `new Application({ ... })` as a synchronous constructor breaks. Every entrypoint must be async.
- **Single package.** v7 used `@pixi/sprite`, `@pixi/graphics`, etc. as separate installs. v8 ships a single `pixi.js` package; if you had granular sub-package imports they must all be replaced.
- **Graphics API is inverted.** v7 used `beginFill()` → `drawRect()` → `endFill()`. v8 uses shape-first, style-second: `rect().fill()`. Any graphics code must be rewritten.
- **Texture handling changed.** Several texture creation paths and property names differ. The migration guide is thorough but the diff is non-trivial on large codebases.
- **Filters and shaders.** Custom GLSL shaders written for v7 often need porting to the new filter/shader API.

For projects on v7, budget real migration time — this is not a semver-minor bump in spirit.

---

## No built-in tween or spring engine

PixiJS provides a `Ticker` (per-frame loop) but has no built-in interpolation, easing, or spring physics. For any non-trivial motion you need a companion library:

- **GSAP** — the standard pairing; mature, fast, broad easing library.
- **Motion** (`motion/mini`) — lighter-weight alternative.

This is a deliberate scope choice by the PixiJS team, but it means your project always has a two-library runtime cost for animated content.

---

## WebGPU browser matrix

WebGPU is first-class in PixiJS v8, but browser support is still gating for some users:

- Chrome/Edge 113+ — full support.
- Firefox — behind a flag as of early 2026; shipping in progress.
- Safari — partial support (WebGPU available in Safari 18 on Apple Silicon; coverage improving).
- iOS Safari — limited; PixiJS falls back to WebGL automatically.

PixiJS's fallback chain (WebGPU → WebGL → Canvas) is seamless and requires no user code, but if you're targeting low-end Android or older Safari you are effectively shipping WebGL, not WebGPU. That's still fast, but the performance headroom of WebGPU is unavailable.

---

## Not DOM-accessible

PixiJS owns a `<canvas>` element. Content rendered inside it is invisible to screen readers, browser find-in-page, text selection, and most accessibility tooling. PixiJS has an optional accessibility overlay that projects focusable DOM elements over interactive objects, but it is opt-in and covers only pointer/keyboard events — not semantic HTML structure.

If you need accessible, indexable content, use the DOM (or a hybrid approach).

---

## Bundle size

~244 KB gzipped is substantial for a rendering library. For simpler use cases (one animated sprite, basic shapes), the full bundle is oversized. Tree-shaking via the single-package structure helps but the renderer itself is not amenable to aggressive dead-code elimination.

---

## Imperative API fights React

Vanilla PixiJS is imperative: you create objects, set properties, call `addChild`. This is at odds with React's declarative, reconciler-driven model. Using PixiJS inside a React app without `@pixi/react` requires refs, effects, and careful lifecycle management. `@pixi/react` solves this but adds its own constraints (React 19+ required, breaking changes from pixi-react v6).
