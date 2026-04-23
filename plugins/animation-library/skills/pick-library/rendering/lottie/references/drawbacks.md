# Lottie — Drawbacks

## Bundle weight

- `lottie-web` full build: ~75 kB gzip / ~306 kB minified (verified via bundlephobia API, 2026-04-22). For a simple page with one loader animation, this is expensive. The "light" SVG-only build is smaller but still non-trivial.
- `@lottiefiles/dotlottie-web`: ~33 kB JS gzip / ~322 kB minified — plus a WASM binary fetched at runtime (not counted in JS bundle, but still a network cost and execution cost on first load). Total transfer for WASM + JS is larger than lottie-web alone in practice.
- Contrast with a CSS-only animation library (0 kB) or a 2 kB hand-rolled SVG animation.

## After Effects authoring lock-in

- To create or edit a Lottie animation, a motion designer needs After Effects + the Bodymovin plugin (or LottieFiles AE plugin). Not all designers have AE licenses.
- The LottieFiles web editor and third-party tools (Rive, Haiku) can produce Lottie JSON, but they are limited compared to full AE workflows.
- Animations are not editable in code in any meaningful way — they are opaque JSON blobs. Minor tweaks (change a color, adjust timing) require going back to the source tool.

## No programmatic interactivity (lottie-web)

- `lottie-web` has no event-driven state machine. You can scrub the timeline or play segments, but defining "when the user hovers, transition to state B" requires imperative JS glue code.
- `dotlottie-web` state machines partially address this, but they are defined inside the `.lottie` file at design time — not in component code.

## Canvas-only for dotlottie-web

- `@lottiefiles/dotlottie-web` renders exclusively to a `<canvas>` element. This means:
  - No CSS styling of individual animation elements.
  - No DOM accessibility (the canvas is a pixel buffer — screen readers see nothing unless you add explicit ARIA attributes).
  - No DevTools inspection of inner SVG paths.
  - Right-click → "Save image" works, text selection does not.

## AE feature parity gaps (lottie-web)

- Not all After Effects features export correctly via Bodymovin: expressions (partially), 3D layers, some blend modes, certain effects. Complex AE animations may look wrong in the browser or require the animator to avoid certain AE features.
- `dotlottie-web` (ThorVG) has better feature parity than `lottie-web` for certain rendering details, but gaps remain.

## lottie-web maintenance trajectory

- As of 2026-04-22, `lottie-web` last pushed 2025-09-01 (~8 months ago). The gap between 5.12.2 (2023) and 5.13.0 (2025) was nearly 2 years. Bug fixes are merged slowly.
- Airbnb does not appear to be investing in new features. New teams should evaluate `dotlottie-web` as the forward-looking choice.

## dotlottie-web pre-1.0 risk

- `@lottiefiles/dotlottie-web` is at `0.71.0` as of 2026-04-22. API surface may change between minor versions. Not yet production-stable by semver convention, though it is widely used.

## WASM cold-start latency (dotlottie-web)

- The ThorVG WASM module must be fetched, compiled, and instantiated before the first frame renders. On slow connections or in constrained environments (low-end mobile, aggressive CSP policies blocking WASM), this adds visible latency. No fallback renderer is available.
