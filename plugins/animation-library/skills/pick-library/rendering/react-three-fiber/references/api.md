# React Three Fiber — API Reference

## Canvas

```tsx
import { Canvas } from '@react-three/fiber'

<Canvas
  camera={{ position: [0, 0, 5], fov: 75 }}
  gl={{ antialias: true }}
  shadows
  dpr={[1, 2]}          // pixel ratio range
  frameloop="always"    // "always" | "demand" | "never"
  onCreated={({ gl, scene, camera }) => { /* ... */ }}
>
  {/* scene */}
</Canvas>
```

`Canvas` creates a WebGL renderer, a default PerspectiveCamera, and a Scene. All props forward to `THREE.WebGLRenderer` options or the camera.

## Core hooks (from `@react-three/fiber`)

| Hook | Purpose |
|---|---|
| `useFrame(cb, priority?)` | Per-frame callback inside the render loop |
| `useThree()` | Access `{ gl, scene, camera, clock, size, viewport, ... }` |
| `useLoader(Loader, url)` | Suspense-compatible asset loader |
| `useGraph(object)` | Traverse a loaded GLTF object graph |
| `extend({ MyMaterial })` | Register a custom three.js class as JSX |

## JSX → three.js mapping

```tsx
// Equivalent to: const mesh = new THREE.Mesh()
// mesh.position.set(1, 0, 0)
// mesh.rotation.x = Math.PI / 4
<mesh position={[1, 0, 0]} rotation-x={Math.PI / 4}>
  <sphereGeometry args={[1, 32, 32]} />    {/* new THREE.SphereGeometry(1, 32, 32) */}
  <meshPhysicalMaterial color="red" roughness={0.5} />
</mesh>
```

Dash notation (`rotation-x`) drills into nested properties.

## Event system

Three.js objects inside Canvas respond to synthetic pointer events:

```tsx
<mesh
  onClick={(e) => console.log(e.point)}
  onPointerOver={(e) => e.stopPropagation()}
  onPointerMove={(e) => { /* e.uv, e.face, e.distance */ }}
/>
```

Events use raycasting under the hood. `e.stopPropagation()` stops the ray from hitting objects behind.

## Selected drei helpers

```tsx
import {
  OrbitControls,
  useGLTF,
  Environment,
  Text,
  MeshReflectorMaterial,
  Instances, Instance,
} from '@react-three/drei'

// GLTF with auto-dispose
const { scene, nodes, materials } = useGLTF('/model.glb')

// HDR environment lighting
<Environment preset="city" />

// Instanced mesh (GPU-instanced, single draw call)
<Instances limit={1000}>
  <boxGeometry />
  <meshStandardMaterial />
  {positions.map((p, i) => <Instance key={i} position={p} />)}
</Instances>
```

## react-spring interop

```tsx
import { useSpring, animated } from '@react-spring/three'

const { scale } = useSpring({ scale: hovered ? 1.5 : 1 })
<animated.mesh scale={scale}>...</animated.mesh>
```

`@react-three/fiber` peer: `>=6.0`. Works with React 19 (react-spring 10.x).

## extend — custom materials / classes

```tsx
import { extend } from '@react-three/fiber'
import { Water } from 'three/examples/jsm/objects/Water'

extend({ Water })
// Now <water args={[geometry, options]} /> works in JSX
```

## Performance utilities

- `frameloop="demand"` on `<Canvas>` — only renders when `invalidate()` is called; ideal for static scenes
- `<Preload all />` from drei — preloads all assets declared with `useLoader` before first paint
- `<PerformanceMonitor>` from drei — monitors FPS and lets you adapt quality dynamically
- `<BVH>` from drei — wraps scene in a Bounding Volume Hierarchy for fast raycasting on dense meshes
