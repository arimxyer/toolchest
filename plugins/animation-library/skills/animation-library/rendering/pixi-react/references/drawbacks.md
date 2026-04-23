# @pixi/react — Drawbacks

Honest assessment as of v8.0.5 (Dec 2025). Retrieved 2026-04-22.

---

## React 19 hard requirement

The peer dependency is `react >= 19.0.0`. Projects still on React 18 (the majority of the ecosystem as of early 2026) cannot adopt v8 without a React upgrade. The v7 branch supports React 18 but does not get the v8 `extend()` API or WebGPU renderer benefits.

## Young rewrite — limited community examples

v8 launched in mid-2025. The bulk of StackOverflow answers, YouTube tutorials, blog posts, and community extensions reference the v7 API (which used direct JSX components like `<Sprite>` rather than `<pixiSprite />`). Finding v8-specific examples beyond the official docs requires reading source code or asking in the PixiJS Discord.

## Smaller ecosystem than React Three Fiber

R3F's pmndrs umbrella (drei, rapier, postprocessing, xr, uikit) provides hundreds of ready-made abstractions. @pixi/react has no equivalent helper library. Custom PixiJS plugins (pixi-viewport, pixi-spine) can be integrated via `extend()`, but each requires manual wiring and TypeScript augmentation.

## `extend()` boilerplate

Every class used in JSX must be pre-registered via `extend()`. Forgetting to register results in a runtime error (not a compile error, unless you have strict TypeScript augmentation). This is a deliberate trade-off for bundle size, but adds friction compared to v7's auto-included components.

## Bundle: thin wrapper, fat peer dep

`@pixi/react` itself is ~40 KB gzipped, but it requires `pixi.js ^8.2.6` as a peer dependency. PixiJS v8 (tree-shaken, just core + WebGL renderer) adds roughly 200-400 KB gzipped depending on which modules you import. Total page weight is dominated by PixiJS, not the binding layer.

## No SSR

PixiJS requires a browser canvas/WebGL context. @pixi/react components cannot be server-rendered. Next.js / Remix setups must use `dynamic(() => import('./PixiScene'), { ssr: false })` or equivalent.

## Accessibility

Everything renders to a `<canvas>` element. Screen readers and keyboard navigation don't get DOM-level semantics. For interactive applications requiring WCAG compliance, supplemental ARIA overlays or a DOM-based accessibility tree are needed — there is no built-in solution.

## Not suitable for 3D or video output

2D only. If the project scope expands to include 3D or frame-accurate video export, a different library (R3F, Remotion) is needed — there is no upgrade path within the PixiJS ecosystem.
