# three.js — Overview

three.js is a vanilla JavaScript 3D library that abstracts WebGL (and now WebGPU) into a scene-graph API. It is the dominant web 3D library by download volume (~8.7 M npm downloads/week), roughly 55× ahead of the next tier (@babylonjs/core at ~157 K/week).

## Core model

three.js organizes a scene as a graph of `Object3D` nodes — meshes, lights, cameras, groups — rendered by a `WebGLRenderer` (or `WebGPURenderer`) each frame. The host page drives the loop via `requestAnimationFrame`; three.js does not own the loop.

```js
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

## Renderers

| Renderer | Status |
|---|---|
| `WebGLRenderer` | Stable, long-standing default |
| `WebGPURenderer` | Production-ready since r171 (September 2025); opt-in |

Both renderers share the same scene graph. Switching is a one-line constructor swap in most projects.

## Built-in animation system

three.js ships `AnimationMixer`, `AnimationClip`, and `AnimationAction`. This system is specifically designed for **skeletal and morph-target animations baked into GLTF/FBX models** — walking characters, facial rigs, blended poses. It is not a general-purpose tween or timeline engine. For sequencing DOM or object property animations, reach for GSAP or Motion alongside three.js.

## Versioning

three.js uses numbered revisions (r171, r181, r184), not semver. The npm package maps these as `0.171.0`, `0.184.0`, etc. Breaking changes are documented in the migration guide between each revision.

## Ecosystem

- **jsm/ (three/examples/jsm)**: Official add-ons — loaders (GLTFLoader, EXRLoader, FBXLoader), controls (OrbitControls), postprocessing (EffectComposer), and WebXR helpers
- **drei** (`@react-three/drei`): Rich helper library for the react-three-fiber ecosystem; not usable in vanilla three.js directly
- **@react-three/fiber**: React renderer for three.js (see [react-three-fiber](../../react-three-fiber/dossier.md))
- **@react-three/rapier**: Physics layer (Rapier WASM) for use in the r3f ecosystem
- **Theatre.js**: Keyframe/timeline authoring with first-class three.js and r3f integration
- **GSAP**: Tween/timeline engine commonly paired with three.js for UI animation and object property interpolation

## GLTF as the primary asset format

three.js's `GLTFLoader` is the recommended import path for 3D models. GLTF 2.0 carries geometry, PBR materials, textures, skeletal rigs, and `AnimationClip` data in a single file. FBX, OBJ, and other formats are supported via additional loaders in `jsm/loaders/`.

## WebXR

three.js exposes `renderer.xr` for WebXR (VR/AR). The `jsm/webxr/` helpers provide controller models, button handling, and session management with minimal boilerplate.
