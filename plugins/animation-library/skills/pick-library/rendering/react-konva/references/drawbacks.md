# react-konva — Drawbacks

## Canvas 2D performance ceiling

Konva renders to `HTMLCanvasElement` using the 2D context API — everything is CPU-bound rasterization. At a few hundred shapes with per-frame updates the renderer starts to lag visibly. Contrast with pixi-react (WebGL GPU batching), which handles tens of thousands of sprites at 60 fps without effort. The ceiling is real and architectural: switching from Canvas 2D to WebGL requires replacing the entire library, not tuning config.

Mitigation strategies exist (layer separation, `listening={false}` on static layers, caching shapes with `node.cache()`, using Konva.Animation instead of React re-renders) but they are workarounds, not a solution to the fundamental constraint.

## Double abstraction overhead

Every React render → reconciler diff → Konva node update → canvas redraw. For highly dynamic scenes (many rapid property changes per frame) this two-layer overhead is measurable. The correct pattern — drive animation imperatively via `Konva.Animation` / refs, keep React state for structural changes only — is non-obvious and conflicts with React's "everything in state" mental model.

## No SSR / React Native

canvas APIs don't exist server-side. In Next.js app router you must wrap the component in `dynamic()` with `ssr: false`. React Native is unsupported entirely — there is no roadmap mention of RN support in the GitHub repo.

## No native `React.createPortal`

The custom reconciler does not support `React.createPortal`. Moving DOM content into or out of the canvas boundary requires `<Html>` from `react-konva-utils`, which is a separate install and adds abstraction.

## No built-in serialization

Konva has basic JSON export (`stage.toJSON()`) but no SVG export, no undo/redo history, no clipboard model. Building a production design editor requires implementing all of these from scratch. fabric-js provides them out of the box.

## Versioning fragility

react-konva's major version number mirrors the React major it targets (v18.x for React 18, v19.x for React 19). The React reconciler internals are not a stable public API — react-konva has broken on React minor releases before (React 18 concurrent mode required significant internal changes). Adopters on React 19 should pin `react-konva@^19` and watch for breakage on React minor bumps.

## Ecosystem smaller than R3F

react-three-fiber has a sprawling ecosystem: `@react-three/drei` (150+ helpers), `@react-three/rapier` (physics), `@react-three/postprocessing` (shaders), Leva (controls), R3F Perf (devtools). react-konva's ecosystem is Konva's own plugins plus `react-konva-utils`. For complex applications, expect to write more from scratch.

## Summary risk table

| Risk | Severity | Mitigation |
|---|---|---|
| Canvas 2D throughput limit | High for sprite-heavy apps | Switch to pixi-react |
| Double-layer animation overhead | Medium | Use Konva.Animation + refs |
| No SSR | Low-medium | `dynamic()` with `ssr: false` |
| React reconciler API instability | Low (stable releases) | Pin major version |
| No serialization | Medium for design tools | Use fabric-js instead |
