---
name: react-spring
description: Physics-based spring animations for React — best when natural motion, imperative control, or react-three-fiber interop matters.
---
# React Spring

## When to use

- You want spring-physics feel (mass/tension/friction) rather than cubic-bezier curves — interactions that respond organically to interruption.
- You need imperative control: start/stop/set animation values outside of React's render cycle (e.g., drag, scroll, gesture handlers).
- You're animating within a react-three-fiber scene and need a first-class R3F-compatible spring system (`@react-spring/three`).
- You need staggered list animations (`useTrail`) or mount/unmount transitions (`useTransition`) with physics-based easing.
- You're targeting React Native or Konva/Zdog and want a single animation API across platforms.
- You want zero-duration "snap" behavior via `api.set()` without triggering spring interpolation.

## When NOT to use

- You need timeline-based, sequenced, or scrub-controlled animation (GSAP or Theatre.js are better fits).
- Your team is already on Motion (Framer Motion) and doesn't need R3F or the physics API — Motion's `spring` is simpler and has a larger ecosystem of layout/gesture utilities.
- You're doing CSS-only or Tailwind-class animations with no JS logic — tailwindcss-animate or tailwindcss-motion adds zero runtime.
- You need SVG path morphing or complex SVG animations — anime.js handles these more directly.
- You want scroll-linked, progress-based animations keyed to a scroll position (GSAP ScrollTrigger or View Transitions API fit better).

## Quick facts

| Field | Value |
|---|---|
| Version researched | 10.0.3 (released 2024-09-18) |
| License (SPDX) | MIT — free for commercial use |
| Framework support | React (web), React Native, react-three-fiber (`@react-spring/three`), Konva, Zdog |
| Bundle size (`@react-spring/web`) | ~19.2 kB gzipped / ~50.5 kB minified |
| Runtime | DOM (HTML/SVG), Canvas (via Konva/Zdog target), WebGL (via @react-spring/three) |

## See also

- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators vs. siblings](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.tsx)
