# @react-three/rapier — Drawbacks

## WASM load cost

The `@dimforge/rapier3d-compat` dependency is a compiled Rust binary. At ~2.26 MB min / ~824 KB gzip (bundlephobia, v2.2.0 with all deps), it is one of the heavier payloads in the pmndrs ecosystem. The WASM module loads asynchronously — `<Physics>` requires a `<Suspense>` boundary — but until it resolves, physics do not start. On slow connections or cold caches, this produces a noticeable delay before objects start moving. WASM is not tree-shakeable; you pay for the full binary regardless of which features you use.

## React 19 / R3F v9 hard lock (v2.x)

v2.x requires `react >=19` and `@react-three/fiber >=9.0.4`. Projects on React 18 must stay on v1.x or upgrade React. This is a sharp upgrade cliff with no gradual migration path — the peer-dep constraints are enforced, and mixing versions produces runtime errors in the reconciler.

## rapier.rs learning curve for advanced features

The declarative API (`<RigidBody>`, auto-colliders) covers ~80% of use cases with minimal ceremony. The remaining 20% — custom integration parameters, contact filtering, deterministic simulation replay, the raw `World` API via `useRapier()` — requires understanding rapier.rs concepts (e.g., `IntegrationParameters`, contact manifolds, CCD substeps). The rapier.rs Rust docs are the authoritative reference; the JavaScript / TypeScript layer is a thin binding, and its own docs do not always explain the underlying simulation model.

## No 2D physics

`@dimforge/rapier3d-compat` is the 3D variant. There is a 2D rapier (`rapier2d-compat`), but r3/rapier does not wrap it — you would need to use it directly, or use matter.js/planck.js instead. For projects that only need 2D collision (e.g., a top-down game on a plane), importing the full 3D binary wastes ~800 KB gzip.

## Simulation determinism caveats

Rapier.rs is designed to be deterministic, but the JavaScript/WASM layer introduces caveats: WASM memory layout is fixed at initialization, but floating-point behavior can diverge across architectures. The v2.2.0 changelog notes a determinism fix specifically for Apple M1 processors (`@dimforge/rapier3d-compat` 0.19.2). If you are building a deterministic multiplayer simulation, test on all target platforms.

## Debug wireframes are always a build concern

`debug={true}` on `<Physics>` renders collider outlines — useful in development. These are not automatically stripped in production; you must conditionally pass `debug={process.env.NODE_ENV === 'development'}`. Forgetting this leaves invisible-but-rendered geometry in production.

## Stepping is tied to the R3F render loop

By default, `<Physics>` steps the simulation every frame (`updateLoop="follow"`). This couples physics timestep to frame rate. At 120 Hz, physics steps twice as often as at 60 Hz; at 30 Hz, it under-steps. Fixed-timestep mode (`timeStep={1/60}`) avoids this but requires `interpolation={true}` to avoid visible jitter — adding complexity. Neither mode is a free lunch.
