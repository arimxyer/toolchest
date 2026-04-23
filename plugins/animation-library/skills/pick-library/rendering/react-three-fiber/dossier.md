---
name: react-three-fiber
description: React renderer for three.js — pick it when you need interactive 3D scenes, WebGL effects, or data viz in a React app.
---
# React Three Fiber

## When to use
- Building interactive 3D scenes, product configurators, or immersive WebGL experiences inside a React app
- Porting an existing three.js scene into a component-driven, state-reactive architecture
- Animating 3D geometry per-frame with `useFrame` while keeping React state in sync
- Composing reusable 3D primitives (geometries, materials, lights) with full React lifecycle and context
- Adding WebXR (VR/AR) experiences to a React app with minimal boilerplate

## When NOT to use
- Simple CSS/SVG/canvas 2D animations — use motion, GSAP, or WAAPI instead; three.js adds ~178 KB gzip for nothing
- Static marketing pages where bundle weight and SSR/SEO matter more than 3D
- Teams unfamiliar with three.js concepts (cameras, materials, coordinate systems) — the React wrapper does not abstract away three.js fundamentals
- React 18 or earlier projects — r3f v9 requires React 19; stay on r3f v8 or accept a constraint
- Server-side rendering without a headless WebGL context — requires extra shims (e.g., `gl` package) and careful `typeof window` guards

## Quick facts
| Field | Value |
|---|---|
| Version (@react-three/fiber) | 9.6.0 (released 2026-04-13) |
| Version (@react-three/drei) | 10.7.7 (released 2025-11-13) |
| License | MIT (r3f, drei, three.js all MIT) |
| Commercial terms | Free; no seat/usage fees |
| Framework support | React 19 (web + React Native via r3f-native; Expo ≥43) |
| Bundle size — @react-three/fiber | ~50 KB gzip / ~156 KB min (excludes three.js) |
| Bundle size — three.js 0.184.0 | ~178 KB gzip / ~707 KB min |
| three.js peer-dep constraint | fiber: `>=0.156`; drei: `>=0.159`; use `>=0.159` to satisfy both |
| Runtime | WebGL via three.js; WebGPU experimental (three.js r163+) |

## See also
- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.tsx)
