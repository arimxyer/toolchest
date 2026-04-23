---
name: three-js
description: Vanilla JS 3D library over WebGL/WebGPU — pick it for framework-agnostic 3D scenes; pick react-three-fiber instead if you are in React.
---
# three.js

## When to use
- Building framework-agnostic 3D scenes, visualizations, or interactive WebGL experiences without React
- Rendering GLTF models, skeletal animations (`AnimationMixer`), and PBR materials in the browser
- Projects where React is not the host framework (Vue, Svelte, plain HTML, worker-driven canvases)
- Targeting WebGPU — the `WebGPURenderer` is production-ready since r171 (September 2025)
- Embedding a 3D scene in a page where the rest of the UI is plain DOM/CSS and a React dependency is unwanted
- Games, simulations, or data visualizations that require direct low-level control of the render loop

## When NOT to use
- Working inside a React app — use **react-three-fiber** (r3f) instead; it wraps three.js declaratively and composes with React state/lifecycle
- Pure 2D animations (DOM, SVG, CSS) — **motion**, **GSAP**, or **WAAPI** are 10–50× lighter with no WebGL overhead
- Marketing/landing pages where SSR and SEO matter — three.js has no SSR story; bundle weight (~178 KB gz) is hard to justify
- General-purpose UI tweening/sequencing — `AnimationMixer` is for baked skeletal/morph-target clips, not a timeline engine; use GSAP or Motion for that
- Teams with no 3D graphics background — cameras, coordinate systems, PBR materials, and draw-call budgets are required knowledge regardless of framework wrapper

## Quick facts
| Field | Value |
|---|---|
| Current version | 0.184.0 / r184 (released 2026-04-16) |
| License | MIT |
| Framework support | Vanilla JS (no framework); React via **react-three-fiber** (cross-link below) |
| Bundle size | ~178 KB gzip / ~724 KB min (three.js core, v0.184.0) |
| Runtime | WebGL2 (primary); WebGPU production-ready since r171 (Sep 2025) |
| npm downloads | ~8.7 M/week (55× ahead of @babylonjs/core at ~157 K/week) |
| Animation system | `AnimationMixer` / `AnimationClip` / `AnimationAction` — skeletal & morph-target only |

## See also
- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.js)
- [react-three-fiber](../react-three-fiber/dossier.md)
