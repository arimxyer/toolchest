# Fabric.js — Drawbacks

## 1. No first-party React binding

Fabric has no officially maintained React wrapper. Community packages (`react-fabric`, `fabricjs-react`, etc.) exist but consistently lag behind Fabric's core release cycle — v7 API changes (ESM refactor, renamed exports, new control system) broke most wrappers and they took months to catch up, if they did at all.

**Practical impact:** using Fabric in a React app means managing the canvas imperatively inside `useEffect`, wiring `canvas.dispose()` in cleanup, and syncing Fabric's internal object state to React state manually. This is workable but non-trivial and runs against React's rendering model. If React integration is a priority, evaluate Konva via `react-konva` first.

## 2. Canvas 2D only — no WebGL rendering path

The main render path is the browser's Canvas 2D API. WebGL is used only for the image filter pipeline. This has two consequences:

- **Throughput ceiling.** Interactive frame rates degrade with hundreds of complex objects on screen. Design editors rarely need thousands of objects, so this is rarely a blocker — but it rules out Fabric for games, particle systems, or high-frequency animation.
- **No GPU-accelerated transforms.** Every `renderAll()` traverses the full object list on the CPU.

## 3. v5–v7 API churn — migration burden

Fabric made breaking changes across three major versions:

| Version | Breaking change |
|---|---|
| v5 | Removed `fabric.*` global namespace; switched to named ESM exports (`import { Canvas } from 'fabric'`). All v4 code needs import rewriting. |
| v6 | `loadFromJSON` became async; filter import paths changed |
| v7 | Build tooling moved to Rolldown; gradient and cropping control APIs revised |

Community tutorials, Stack Overflow answers, and third-party code snippets are dominated by v4/v5 `new fabric.Canvas(...)` syntax. Copy-pasting from search results into a v7 project will silently use an undefined global and fail at runtime.

## 4. Bundle size is non-trivial for light use

~89 KB gzipped / ~291 KB minified for the full library. There is no official tree-shakeable sub-package approach that lets you ship only `Rect` without the rest of the object model. If you only need one or two shapes with basic drag interaction, Konva (~53 KB gzipped) or a hand-rolled Canvas approach is leaner.

## 5. Performance of `renderAll()`

Fabric re-draws the entire canvas on every `renderAll()` call. There is per-object caching (`objectCaching: true`, the default) that offloads unchanged objects to off-screen canvases, but cache invalidation has edge cases (transparent backgrounds, clip-paths, gradients) that occasionally produce stale renders. Complex scenes with many frequently-updated objects require careful caching configuration.

## 6. Node.js support requires native dependencies

Server-side use (e.g. for canvas export) requires `node-canvas`, which is a native Node.js module wrapping Cairo. This adds build complexity (native compilation, platform-specific binaries) and complicates containerised deployments.

## 7. No built-in undo/redo

Fabric provides the serialisation primitives (`toJSON` / `loadFromJSON`) but ships no undo/redo manager. Implementing a robust command stack — including handling grouped operations and ephemeral move events — is left to the application.
