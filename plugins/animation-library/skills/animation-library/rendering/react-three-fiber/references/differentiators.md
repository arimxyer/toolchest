# React Three Fiber — Differentiators

r3f is the only 3D entry in this dossier. All other siblings operate on 2D: DOM, SVG, canvas 2D, or CSS. The relevant comparisons are r3f vs. vanilla three.js and r3f vs. the 2D animation libraries when a 2D solution would suffice.

## vs. vanilla three.js

| Concern | Vanilla three.js | React Three Fiber |
|---|---|---|
| Scene authoring | Imperative (`scene.add(mesh)`) | Declarative JSX (`<mesh>`) |
| State binding | Manual event listeners + re-renders | React state/props drive the scene graph automatically |
| Code reuse | Functions and classes | React components, hooks, context |
| Lifecycle | Manual `dispose()` everywhere | r3f auto-disposes objects when components unmount |
| Ecosystem | three.js examples (`jsm/`) | three.js examples + drei's 150+ helpers + @react-three/* packages |
| Performance at scale | Optimal when hand-tuned | Matches or beats vanilla due to batching; no overhead per official docs |
| Learning curve | Three.js only | Three.js + React renderer concepts |

r3f does not hide three.js — you still need to understand cameras, materials, and coordinate systems. It trades imperative boilerplate for declarative composability.

## vs. 2D siblings in this dossier

**motion (Framer Motion)** — CSS/SVG/DOM spring animations. No 3D. When you need a spinning card flip or a page transition, motion is 10–50× lighter than pulling in three.js.

**gsap** — Timeline/tween engine. Has a `gsap-three` community plugin, but r3f is the idiomatic choice for sustained 3D scenes. GSAP excels at sequenced multi-element DOM animations.

**anime (v4)** — Lightweight tween for DOM/SVG. No 3D support.

**react-spring** — Spring physics for DOM/SVG/native. Has `@react-spring/three` for r3f interop — the combination is the standard way to add spring-physics to 3D objects inside r3f. Not a replacement.

**Theatre.js** — Keyframe/timeline animation studio. Has first-class r3f integration via `@theatre/r3f` — used as an authoring layer on top of r3f, not a replacement.

**rive / lottie** — Vector animation runtimes for 2D assets. No 3D.

**tailwindcss-animate / tw-animate-css / tailwindcss-motion** — CSS utility animations. No relevance to 3D.

**view-transitions-api / waapi** — Browser-native animation APIs for DOM elements. No 3D.

**remotion** — React-based video rendering. Can render r3f scenes to video, making the two complementary for 3D video production.

**popmotion** — Low-level animation primitives, 2D only.

## Summary positioning

r3f is the correct pick when the output is a WebGL 3D scene inside React. For anything purely 2D or CSS-driven, every other library in this dossier has lower bundle cost, simpler mental model, and better SSR compatibility.
