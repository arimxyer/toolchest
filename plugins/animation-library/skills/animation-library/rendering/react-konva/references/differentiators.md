# react-konva — Differentiators

How react-konva sits relative to its siblings in the dossier.

## vs. konva (underlying engine)

`konva` is what react-konva wraps. Use bare Konva when you have no React context, need direct imperative control, or want to avoid the reconciler overhead. react-konva is the right choice when the rest of your app is already React and you want state-driven canvas updates with hooks.

## vs. pixi-react (parallel React binding for WebGL 2D)

Both are React reconcilers for 2D canvas rendering, but the performance envelope is fundamentally different:

| | react-konva | pixi-react |
|---|---|---|
| Renderer | Canvas 2D (CPU) | WebGL (GPU) |
| Sweet spot | Hundreds of interactive shapes | Tens of thousands of sprites |
| Hit-testing | Built-in, pixel-perfect | Manual or PIXI.EventSystem |
| API style | Konva config props | PixiJS DisplayObject props |
| Install base | ~950K/week npm | ~50K/week npm |

Choose pixi-react when draw call count or particle density overwhelms Canvas 2D. Choose react-konva when interactivity complexity (drag, selection boxes, transformers) matters more than raw throughput.

## vs. react-three-fiber (3D parallel)

react-three-fiber is a React reconciler for Three.js — the 3D scene graph on WebGL. It shares the "JSX maps to engine nodes" pattern, but the domains don't overlap: react-konva is strictly 2D/Canvas; R3F is 3D/WebGL. R3F also has a much richer ecosystem (drei, rapier physics, postprocessing). If you need 3D at all, R3F is the answer.

## vs. fabric-js

Fabric.js is also Canvas 2D and also targets interactive editors — but it is SVG-model-first: objects serialize to/from JSON/SVG natively, and the built-in object model includes selection, grouping, and free-draw. react-konva has no built-in serialization format and no SVG export. Fabric wins when the deliverable is a saved graphic; react-konva wins when the canvas is a UI surface within a larger React application.

## vs. remotion

Remotion renders React component trees to video frames (MP4/WebM). react-konva renders interactive canvas in the browser. No overlap in use case — Remotion is for programmatic video production, not interactive UI.

## vs. rive / lottie

Rive and Lottie are animation-playback libraries — they play back authored animation assets (state machines / After Effects exports). react-konva is a general-purpose canvas renderer with no built-in animation format. Pick Rive/Lottie when you have designer-authored animations; pick react-konva when the canvas content is programmatically driven.

## vs. motion / react-spring / gsap (motion tier)

Motion-tier libraries animate DOM/SVG CSS properties. react-konva animates Konva nodes (canvas pixels). They do not compete. You can use react-spring or GSAP to drive values that update Konva node props via React state, though for high-frequency animation Konva's own `Animation` / `node.to()` tween is more efficient (bypasses the React render cycle).

## Unique strengths of react-konva

1. **Largest install base** in this bucket — 950K/week vs. ~50K for pixi-react — meaning more community examples, Stack Overflow answers, and maintained third-party integrations.
2. **Built-in hit-testing and transformer widget** — `<Transformer>` provides resize/rotate handles with no extra work, unlike raw canvas or PixiJS.
3. **React-reconciler pattern** is well-understood — patterns from R3F (ref-based imperative escape hatches, context bridging) transfer directly.
4. **its-fine integration** (since v18.2.2) — React context propagates across the reconciler boundary automatically, solving a long-standing pain point.
