# @pixi/react — Differentiators

Compared against the full dossier set (motion/* and rendering/*). Retrieved 2026-04-22.

---

## vs. pixi-js (the underlying engine)

`pixi-js` is the imperative rendering engine; `@pixi/react` is the declarative React binding on top of it.

- **pixi-js** requires manual scene-graph management: `container.addChild(sprite)`, lifecycle in `useEffect`, etc.
- **@pixi/react** integrates into the React component tree — PixiJS scene objects are created/destroyed by the reconciler, props flow as usual, and `useTick` replaces manual ticker setup.
- Use bare `pixi-js` when React is not in the stack, or when you need full imperative control over scene order and batching.

## vs. react-three-fiber (`@react-three/fiber`)

The closest architectural parallel — both are custom React reconcilers wrapping a WebGL engine.

| | @pixi/react | @react-three/fiber |
|---|---|---|
| Dimension | 2D | 3D |
| Engine | PixiJS v8 | Three.js r170+ |
| Renderer | WebGPU / WebGL / Canvas | WebGL / WebGPU |
| Ecosystem | Smaller; fewer helper libs | Large (pmndrs: drei, rapier, postprocessing) |
| Use case | Sprites, particles, 2D games | 3D scenes, PBR materials, physics |
| React version | >=19 | >=18 |

Choose R3F for anything with depth, cameras, or 3D physics. Choose @pixi/react for 2D sprite-based scenes where PixiJS's batched 2D renderer outperforms a general 3D pipeline.

## vs. react-konva

Both are 2D React canvas bindings, but targeting different niches.

| | @pixi/react | react-konva |
|---|---|---|
| Renderer | WebGPU/WebGL (GPU accelerated) | Canvas 2D API (CPU) |
| Primary target | Games, particle effects, high-entity-count scenes | Interactive diagrams, drag-and-drop, shape editors |
| Hit testing | PixiJS event system (GPU-side bounds) | Konva built-in hit detection on Canvas 2D |
| Performance ceiling | Very high (GPU batching) | Moderate (CPU 2D rasterisation) |
| Ecosystem | PixiJS plugins (spine, layout, viewport) | Konva plugins (transformers, drag) |

If you're building a diagram editor or form with draggable shapes, react-konva's developer UX is friendlier. If you need a particle system or sprite animation at 60 fps with hundreds of objects, @pixi/react wins.

## vs. @react-three/drei (pmndrs helpers)

Drei is a utility layer for R3F, not a direct competitor. Mentioned because it represents the "batteries-included" side of the R3F ecosystem that @pixi/react currently lacks — there is no `@pixi/react-drei` equivalent with pre-built PixiJS abstractions.

## vs. motion / GSAP / anime (motion/* bucket)

Motion libraries animate DOM/CSS properties. @pixi/react animates GPU-rendered WebGL/WebGPU objects. They operate at different layers and are often composed: a UI built in React + Motion can embed a `<Application>` canvas for high-performance 2D graphics without conflict.

## vs. remotion

Remotion sequences frame-accurate video exports from React. @pixi/react renders real-time interactive scenes. They can be composed (a Remotion sequence can host a PixiJS canvas) but serve different primary purposes.

## vs. lottie / rive (rendering/* bucket)

Lottie and Rive play pre-authored vector/rig animations. @pixi/react is a general-purpose 2D scene graph — you write the animation logic in code. Use Lottie/Rive for designer-authored motion; use @pixi/react for programmatic rendering.

## Unique strengths

1. **First-party PixiJS bindings** — now maintained by the PixiJS core team; API parity is guaranteed.
2. **`extend()` tree-shaking** — unlike v7's monolithic import, v8 only bundles the PixiJS classes you register.
3. **React 19 concurrent mode** — built on `react-reconciler@0.31`, the same reconciler version React 19 uses internally.
4. **PixiJS v8 WebGPU** — inherits PixiJS's WebGPU renderer, the first major 2D React binding with WebGPU support.
