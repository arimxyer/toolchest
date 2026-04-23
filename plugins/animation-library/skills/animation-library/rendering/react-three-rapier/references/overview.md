# @react-three/rapier — Overview

`@react-three/rapier` (r3/rapier) is a React wrapper around [rapier.rs](https://rapier.rs/), a Rust physics engine compiled to WASM. It integrates with `@react-three/fiber` via a `<Physics>` context provider and a small set of components and hooks.

Maintained by pmndrs — the same collective behind r3f, drei, zustand, and jotai. It is the canonical physics solution for the R3F ecosystem.

## Core model

```
<Canvas>          ← r3f WebGL context
  <Suspense>      ← required; rapier WASM loads asynchronously
    <Physics>     ← creates and drives the physics world each frame
      <RigidBody> ← wraps one or more meshes; adds them to the simulation
        <mesh />
      </RigidBody>
    </Physics>
  </Suspense>
</Canvas>
```

Every frame, `<Physics>` steps the rapier simulation and syncs the computed positions/rotations back to the corresponding three.js objects via refs — no React state is touched in the hot loop.

## Key components

| Component | Purpose |
|---|---|
| `<Physics>` | Root provider; configures gravity, timestep, debug rendering |
| `<RigidBody>` | Adds a body to the simulation; auto-generates colliders from child meshes |
| `<CuboidCollider>` / `<BallCollider>` / `<MeshCollider>` etc. | Explicit collider primitives for compound shapes |
| `<InstancedRigidBodies>` | Efficient physics for `InstancedMesh` (e.g. particle crowds) |

## Collider auto-generation

Setting `colliders` on `<RigidBody>` controls the shape used:
- `"cuboid"` — bounding-box approximation (cheapest)
- `"ball"` — bounding-sphere approximation
- `"hull"` — convex hull of the mesh (good balance)
- `"trimesh"` — exact mesh geometry (expensive; no interior collision)
- `false` — manual colliders only

## Hooks

| Hook | Purpose |
|---|---|
| `useRapier()` | Access the raw rapier `World` object |
| `useBeforePhysicsStep` / `useAfterPhysicsStep` | Inject logic around the simulation tick |
| `useFilterContactPair` / `useFilterIntersectionPair` | Custom collision filtering per pair (added v2.2.0) |
| `useRevoluteJoint`, `useSphericalJoint`, etc. | Constraint joints between bodies |

## Joints

Fixed, spherical, revolute, prismatic, rope, and spring joints. All are expressed as React hooks returning a joint ref.

## Version history (recent)

| Version | Date | Notable |
|---|---|---|
| 2.2.0 | 2025-11-03 | rapier3d-compat 0.19.2 (perf+voxels), `useFilterContactPair` hook |
| 2.1.0 | 2025-04-06 | rapier3d-compat 0.15.0 |
| 2.0.0 | 2025-03-02 | React 19 + R3F v9 support (breaking) |
| 1.x | — | React 18 + R3F v8 series |
