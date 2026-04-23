---
name: babylon-js
description: Batteries-included 3D engine with Havok physics, WebXR, and visual tooling — pick it over three.js when you need those built-in.
---
# Babylon.js

## When to use
- You need built-in physics simulation — Havok is bundled and production-ready without a separate plugin
- Your project requires WebXR (VR/AR) with minimal boilerplate — Babylon has first-class XR support
- You want a visual Node Material Editor and Inspector tool for non-code asset authoring and debugging
- Building a game or interactive simulation where Babylon's scene manager, animation groups, and collision layers are genuinely useful
- Deploying on WebGPU: Babylon has had a stable WebGPU engine path since the 7.x era; WGSL shader support has been available since ~2021

## When NOT to use
- React app: `react-babylonjs` is community-maintained with ~2.7K weekly downloads and last pushed Sep 2025 — `@react-three/fiber` + three.js is far more mature for React
- Bundle budget is tight: `@babylonjs/core` is ~158 kB gzip (full bundle); even with tree-shaking the engine is heavyweight for simple scenes
- Team already knows three.js well — migrating for features you don't actually need adds churn
- 2D canvas or SVG work — pixi-js, konva, or fabric-js are the right tools
- Server-side rendering pipelines where a headless WebGL context is unavailable

## Quick facts
| Field | Value |
|---|---|
| Version | 9.3.4 (released 2026-04-21) |
| License | Apache-2.0 |
| Framework support | Vanilla JS / TS; `react-babylonjs` exists (community, last push Sep 2025, ~2.7K/wk) |
| Bundle size | ~158 kB gz (full `@babylonjs/core` bundle; tree-shakeable) |
| Runtime | WebGL (default) + WebGPU (stable engine path; WGSL shaders supported) |
| GitHub stars | 25,404 |
| npm downloads | ~157K/wk (`@babylonjs/core`); vs. three.js ~8.7M/wk |
| Microsoft backing | Yes — maintained by the Microsoft Babylon.js team |

## See also
- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.js)
