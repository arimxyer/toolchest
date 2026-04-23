# React Three Fiber — Overview

React Three Fiber (r3f) is a React renderer for three.js. It maps three.js constructors to JSX elements — `<mesh>`, `<boxGeometry>`, `<meshStandardMaterial>` — and reconciles the three.js scene graph the same way React reconciles the DOM.

## Core model

Every lowercase JSX tag in an r3f canvas is a three.js class instantiated with `new THREE[CapitalizedTag]()`. Props map to constructor arguments (`args={[...]}`) or to property setters. The renderer drives a `requestAnimationFrame` loop independently of React's render cycle.

```tsx
<Canvas>
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="hotpink" />
  </mesh>
</Canvas>
```

## @react-three/drei

Drei ("three" in German) is the official helper library. It provides ~150 pre-built abstractions:

- **Controls**: `OrbitControls`, `FlyControls`, `PointerLockControls`
- **Loaders**: `useGLTF`, `useTexture`, `useFBX`
- **Shaders / postprocessing**: `MeshReflectorMaterial`, `MeshDistortMaterial`
- **Environment**: `Environment`, `Sky`, `Stars`
- **Text**: `Text` (troika-three-text), `Text3D` (typeface fonts)
- **Performance**: `Instances`, `Merged`, `BVH` (BVH raycasting)
- **UI helpers**: `Html` (DOM-in-3D overlay), `Billboard`

Drei is tree-shakeable; only import what you use. Its heavy optional deps (troika, hls.js, mediapipe) are not loaded unless you import the relevant component.

## Animation

- `useFrame(callback, priority?)` — runs inside the render loop, receives `state` (`clock`, `camera`, `scene`, `gl`) and `delta`
- Pair with react-spring's `@react-spring/three` for spring-physics on 3D objects
- Pair with Theatre.js for timeline/keyframe animation on r3f meshes

## React Native / Expo

`@react-three/fiber` ships a React Native entry point. Peer dep `react-native >=0.78` + `expo >=43`. The `expo-gl` package provides the WebGL context on device.

## WebXR

r3f exposes `gl.xr` from three.js directly. Drei provides `<XR>`, `<Controllers>`, `<Hands>`, and related helpers via the companion `@react-three/xr` package.
