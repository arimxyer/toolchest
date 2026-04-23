# React Three Fiber — Drawbacks

## Bundle weight

three.js is ~178 KB gzip / ~707 KB min (v0.184.0). It is the mandatory peer dep and dominates total page weight. @react-three/fiber adds another ~50 KB gzip. Drei adds variable weight depending on what you import (troika-three-text alone is ~175 KB min). For projects where JavaScript budget is tight, this cost is hard to justify for anything less than a core 3D feature.

## Learning curve

r3f does not abstract away three.js. You must understand:
- Scene graph, cameras, projections, coordinate systems
- Materials, lights, and physically-based rendering concepts
- Geometry buffers, UVs, normals for non-trivial meshes
- WebGL limitations (draw calls, texture memory, fill rate)

Developers who know React but not three.js face a significant ramp. The JSX layer makes the code look approachable, but bugs surface in three.js concepts, not React ones.

## SSR friction

three.js accesses browser APIs (`WebGLRenderingContext`, `window`, `document`). In Next.js or other SSR frameworks:
- `<Canvas>` must be dynamically imported with `ssr: false`
- Asset loaders (`useGLTF`, `useTexture`) must be guarded
- `useFrame` and `useThree` throw or return empty state during SSR

This is a solved problem but adds boilerplate and makes SSR-first architecture awkward.

## React 19 hard requirement (v9.x)

r3f v9 requires React `>=19 <19.3`. Projects on React 18 must stay on r3f v8 or upgrade React. This pins you to a moving target — the `<19.3` ceiling means you must track r3f releases as React 19 minor versions ship.

## Concurrent React edge cases

r3f uses its own reconciler that runs a separate render loop. Mixing React concurrent features (Suspense boundaries, transitions, deferred state) with the render loop requires care:
- `useFrame` callbacks run outside React's scheduler
- State updates inside `useFrame` should go through refs or zustand/jotai stores, not `setState` in hot loops
- Misuse causes tearing or dropped frames

## Debugging experience

Errors inside the three.js scene graph (bad geometry, shader compilation failures, texture format mismatches) surface as WebGL errors in the console, not React stack traces. No DevTools panel for the scene graph (Leva and r3f-perf help with monitoring but are not full inspectors).

## Not a layout engine

r3f operates in 3D world space. Positioning UI elements relative to the viewport or screen requires `<Html>` from drei (which renders DOM elements into the 3D scene) or careful math. Building traditional UI layouts inside a Canvas is painful — r3f is not a substitute for HTML/CSS.
