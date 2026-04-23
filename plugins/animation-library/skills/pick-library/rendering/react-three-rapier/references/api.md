# @react-three/rapier — API Reference

Full API docs: https://pmndrs.github.io/react-three-rapier/

---

## `<Physics>`

Root physics context. Wrap in `<Suspense>` — rapier WASM loads asynchronously.

```tsx
<Physics
  gravity={[0, -9.81, 0]}      // default
  interpolation={true}          // smooth positions between physics ticks
  colliders="cuboid"            // default auto-collider for all RigidBodies
  timeStep={1 / 60}             // fixed timestep or "vary" for variable
  paused={false}
  debug={false}                 // renders collider wireframes
  updateLoop="follow"           // "follow" | "independent"
>
```

## `<RigidBody>`

Attaches child meshes to the physics simulation.

```tsx
<RigidBody
  type="dynamic"                // "dynamic" | "fixed" | "kinematicPosition" | "kinematicVelocity"
  colliders="hull"              // overrides Physics default; false = no auto-collider
  position={[0, 5, 0]}
  rotation={[0, 0, 0]}
  mass={1}
  restitution={0.5}             // bounciness 0–1
  friction={0.7}
  linearDamping={0}
  angularDamping={0}
  gravityScale={1}
  ccd={false}                   // continuous collision detection
  onCollisionEnter={({ other, target }) => {}}
  onCollisionExit={...}
  onContactForce={({ totalForceMagnitude }) => {}}
  onSleep={...}
  onWake={...}
  ref={rigidBodyRef}            // RapierRigidBody ref for imperative API
>
  <mesh />
</RigidBody>
```

## `RapierRigidBody` ref (imperative)

```ts
const ref = useRef<RapierRigidBody>(null);

ref.current.applyImpulse({ x: 0, y: 10, z: 0 }, true);
ref.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 }, true);
ref.current.setTranslation({ x: 0, y: 5, z: 0 }, true);
ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
ref.current.setEnabled(false);
ref.current.sleep();
ref.current.wakeUp();
```

## Collider components

```tsx
<BallCollider args={[radius]} />
<CuboidCollider args={[hx, hy, hz]} />
<CapsuleCollider args={[halfHeight, radius]} />
<CylinderCollider args={[halfHeight, radius]} />
<ConvexHullCollider args={[vertices]} />
<TrimeshCollider args={[vertices, indices]} />
<HeightfieldCollider args={[nrows, ncols, heights, scale]} />
```

Each accepts `position`, `rotation`, `restitution`, `friction`, `sensor` props.

## `<MeshCollider>`

Generates a collider from an arbitrary child mesh:

```tsx
<MeshCollider type="trimesh">
  <mesh geometry={complexGeo} />
</MeshCollider>
```

## `<InstancedRigidBodies>`

Physics for `InstancedMesh`:

```tsx
<InstancedRigidBodies instances={instancesData} colliders="ball">
  <instancedMesh args={[geo, mat, count]} />
</InstancedRigidBodies>
```

`instancesData` is an array of `{ key, position, rotation, scale }`.

## Hooks

```ts
// Access the raw World
const { world, rapier } = useRapier();

// Callbacks around the physics tick
useBeforePhysicsStep((world) => { /* apply forces */ });
useAfterPhysicsStep((world) => { /* read results */ });

// Custom contact/intersection filtering (v2.2.0+)
useFilterContactPair(bodyA, bodyB, (manifold) => boolean);
useFilterIntersectionPair(sensorA, bodyB, () => boolean);

// Joints (all return a ref to the joint handle)
const joint = useRevoluteJoint(bodyA, bodyB, params);
const joint = useSphericalJoint(bodyA, bodyB, params);
const joint = useFixedJoint(bodyA, bodyB, params);
const joint = usePrismaticJoint(bodyA, bodyB, params);
const joint = useRopeJoint(bodyA, bodyB, params);
const joint = useSpringJoint(bodyA, bodyB, params);
```

## Sensors

```tsx
<RigidBody type="fixed" sensor onIntersectionEnter={({ other }) => {}}>
  <CuboidCollider args={[2, 2, 2]} />
</RigidBody>
```

## Snapshots

```ts
const { takeSnapshot, restoreSnapshot } = useRapier();
const snap = takeSnapshot();
// ... later ...
restoreSnapshot(snap);
```
