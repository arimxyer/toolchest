---
name: lottie
description: Ship After Effects animations as JSON/binary on web; pick lottie-web for SVG DOM control or dotlottie-web for WASM perf + state machines.
---
# Lottie

## When to use

- You have designers exporting motion from After Effects (or Figma/LottieFiles editor) and need pixel-accurate playback in browser — no re-implementation.
- You need SVG DOM output (accessible, CSS-styleable, inspectable in DevTools) — use `lottie-web` SVG renderer.
- You need interactive/stateful animations (hover→play segment, click→transition) without hand-coding spring physics — use `dotlottie-web` state machines.
- You need multi-framework first-party support (React, Vue, Svelte, Solid) with minimal wiring — `@lottiefiles/dotlottie-react` etc. are officially maintained.
- You need Web Worker off-main-thread rendering via OffscreenCanvas for animation-heavy pages — `DotLottieWorkerReact`.
- Onboarding / success / empty-state illustrations that need to loop or play once on mount, with no custom code beyond a JSON asset drop.

## When NOT to use

- The animation is purely CSS/transform-based (opacity, translate, scale) — use `tailwindcss-motion`, `tailwindcss-animate`, or WAAPI; Lottie's overhead is unjustified.
- You need true interactive physics or spring-driven gesture response — use `react-spring` or `motion`; Lottie animations are pre-baked timelines.
- You need 3D or WebGL rendering — use `react-three-fiber`; Lottie has no WebGL renderer.
- You're building a video/sequence composition pipeline — use `remotion`.
- Bundle budget is extremely tight (< 20 kB gzip total): `lottie-web` is ~75 kB gzip; consider a CSS-only alternative or a hand-rolled SVG animation.

## Quick facts

| Field | lottie-web | @lottiefiles/dotlottie-web |
|---|---|---|
| **Version** | 5.13.0 (2025-05-21) | 0.71.0 (2026-04-14) |
| **License** | MIT (free, commercial OK) | MIT (free, commercial OK) |
| **Framework support** | Vanilla JS core; community wrappers: lottie-react, react-lottie, vue-lottie | Official: React, Vue, Svelte, Solid, Web Components |
| **Bundle size (gzip)** | ~75 kB (305 kB min) — full build; lighter "light" build available | ~33 kB JS gzip (322 kB min) + WASM fetched at runtime |
| **Runtime** | SVG (default) / Canvas 2D / HTML (DOM) | WASM (ThorVG) → Canvas 2D only |
| **File formats** | `.json` only | `.lottie` (compressed binary) + `.json` |
| **State machines** | None | Built-in |
| **Maintenance** | Slow (last push 2025-09-01, ~5.3M weekly downloads) | Active (weekly releases, ~1M weekly downloads) |

## See also

- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.tsx)
