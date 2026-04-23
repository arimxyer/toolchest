---
name: react-three-rapier
description: Rigid-body physics (collisions, joints, forces) inside @react-three/fiber scenes — the pmndrs-canonical physics layer for R3F.
---
# @react-three/rapier

## When to use
- Adding rigid-body physics to an existing `@react-three/fiber` scene (falling objects, stacking, collisions)
- Implementing gameplay mechanics — joints, sensors, impulses, contact-force callbacks — inside a React/3D app
- Replacing cannon-es in an R3F project; rapier.rs is faster and actively maintained vs. cannon-es (last release 2021)
- Scenes needing CCD (continuous collision detection) for fast-moving objects, or voxel-based terrain
- Any R3F v9 / React 19 project that wants pmndrs-ecosystem physics with minimal glue code

## When NOT to use
- No `@react-three/fiber` in the stack — use rapier.js directly, or Babylon.js (Havok built-in) for a batteries-included alternative
- 2D physics only — use matter.js or planck.js; rapier3d ships the full WASM binary for no 2D benefit
- Bundle-size-sensitive pages — the `@dimforge/rapier3d-compat` WASM binary is ~2.2 MB min / ~824 KB gzip on its own
- React 18 projects — v2.x locks to React 19 and R3F v9; stay on @react-three/rapier v1 + R3F v8
- Server-side or headless rendering without a WebGL context — physics simulation is client-only

## Quick facts
| Field | Value |
|---|---|
| Version | 2.2.0 (2025-11-03) |
| License | MIT |
| Framework | `@react-three/fiber` ≥9.0.4 (peer dep); React ≥19, three ≥0.159 |
| Bundle — wrapper only | ~47 KB min / ~12 KB gzip (the JS wrapper alone) |
| Bundle — full (incl. WASM binary) | ~2.26 MB min / ~824 KB gzip (dominated by `@dimforge/rapier3d-compat`) |
| Runtime | WASM — rapier.rs Rust physics engine compiled to WebAssembly; loaded asynchronously via `<Suspense>` |

## See also
- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.tsx)
