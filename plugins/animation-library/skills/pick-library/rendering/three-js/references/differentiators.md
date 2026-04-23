# three.js — Differentiators

three.js is the dominant web 3D library. Its closest siblings in this dossier are the other rendering and 3D entries. Every comparison below is drawn from the full 30-library dossier.

## vs. react-three-fiber (R3F)

R3F is a React renderer **for** three.js — it wraps the same three.js scene graph in JSX. They are not competing libraries; they are the same rendering engine with different authoring models.

| Concern | three.js (vanilla) | react-three-fiber |
|---|---|---|
| Host environment | Any JS runtime, no framework dep | React 19 required |
| Scene authoring | Imperative (`scene.add(mesh)`) | Declarative JSX (`<mesh>`) |
| State binding | Manual event listeners and updates | React state/props drive scene graph |
| Code reuse | Functions and classes | React components, hooks, context |
| Lifecycle / disposal | Manual `dispose()` everywhere | Auto-disposes on unmount |
| Ecosystem extras | `jsm/` official add-ons | `jsm/` + drei's 150+ helpers + `@react-three/*` |
| Bundle size | ~178 KB gz (three.js alone) | ~178 KB gz (three.js) + ~50 KB gz (r3f) |
| SSR | No native support | No native support (same WebGL constraint) |

**Rule of thumb:** use three.js (vanilla) when React is not in the stack. Use R3F when it is.

## vs. babylon-js

Babylon.js is the tier-2 alternative 3D engine (~157 K npm downloads/week vs. three.js's 8.7 M). Both target WebGL and WebGPU.

| Concern | three.js | Babylon.js |
|---|---|---|
| Download volume | ~8.7 M/week | ~157 K/week (55× smaller) |
| Ecosystem / community | Vast; dominant tutorials, assets, examples | Smaller but growing; Microsoft-backed |
| Architecture | Scene graph, no physics/audio built-in | Integrated physics (Havok/Cannon/Ammo), audio, GUI |
| WebGPU | Production-ready since r171 (Sep 2025) | WebGPU support present; earlier adoption |
| Inspector | Three.js DevTools (added r184) | Built-in Inspector panel (long-standing) |
| Learning resources | Enormous; years of community content | Official docs strong; smaller community pool |

Pick Babylon.js if you need an all-in-one engine with physics, audio, and GUI batteries included. Pick three.js if you want the largest ecosystem and intend to compose your own stack.

## vs. pixi-js

PixiJS is a 2D WebGL/WebGPU renderer — it renders sprites, tilemaps, and vector graphics on a flat canvas. three.js is a 3D scene graph library. They do not overlap in use cases.

| Concern | three.js | pixi-js |
|---|---|---|
| Dimensionality | 3D (perspective/ortho) | 2D (flat canvas) |
| Use case | 3D scenes, models, VR | Sprites, games, interactive 2D |
| Bundle size | ~178 KB gz | ~180 KB gz (pixi v8 core) |

Use pixi-js when the output is 2D and you want GPU-accelerated sprite rendering. Use three.js for anything that needs a third dimension.

## vs. pixi-react

pixi-react is to PixiJS what react-three-fiber is to three.js — a React binding for the 2D PixiJS renderer. Not a 3D library.

## vs. react-konva / konva

Konva / react-konva is a 2D Canvas API abstraction for interactive graphics (draggable shapes, event-hit-testing). No WebGL. Not a competitor in 3D.

## vs. fabric-js

fabric.js is a 2D canvas manipulation library focused on interactive design tools (drag, resize, group objects). No WebGL, no 3D.

## vs. p5-js

p5.js wraps the HTML Canvas 2D API for creative/generative art. No WebGL 3D scene graph. Not a competitor; different audience (designers/artists learning to code).

## vs. phaser

Phaser is a 2D game framework (WebGL-accelerated sprites, tilemaps, physics, audio, input). three.js has no 2D game primitives. They occupy different tiers: use Phaser for 2D games, three.js for 3D scenes.

## vs. react-three-rapier

react-three-rapier is a physics layer (Rapier WASM) that runs **inside** the react-three-fiber ecosystem. It depends on both r3f and three.js. Not a standalone renderer — it adds rigid-body simulation on top of three.js geometry.

## vs. motion / gsap / anime / popmotion / Theatre.js

These are 2D DOM/CSS/SVG animation libraries. None of them render 3D geometry. They are frequently **paired** with three.js:

- **GSAP** — The standard companion for tweening `mesh.position`, `mesh.rotation`, `material.opacity` alongside a three.js render loop. Also used for UI animations on the surrounding HTML.
- **Theatre.js** — Keyframe/timeline authoring with explicit three.js and r3f integration; used as an authoring layer on top of three.js scenes.
- **motion** — DOM/CSS spring animations; pair with three.js for surrounding page UI, but not for 3D objects.

## vs. lottie / rive

Vector animation runtimes for 2D animated assets (.json, .riv). No 3D. No overlap.

## vs. remotion

Remotion renders React trees to video. It can host an r3f (three.js) `<Canvas>` inside a Remotion composition to produce 3D video — making them complementary, not competing.

## vs. tailwindcss-animate / tw-animate-css / tailwindcss-motion / view-transitions-api / waapi / lenis / use-gesture / react-transition-group / animate-css / auto-animate

All CSS/DOM animation utilities. No 3D rendering. No meaningful comparison to three.js.

## Summary positioning

three.js is the correct pick for any WebGL/WebGPU 3D scene in vanilla JS. For React, use react-three-fiber. For 3D physics in the r3f stack, add react-three-rapier. For a batteries-included 3D engine, consider babylon-js. For 2D GPU rendering, use pixi-js. For UI animation alongside a three.js scene, pair with GSAP or Motion.
