# three.js — API Reference

Full docs: https://threejs.org/docs/

## Renderer setup

```js
import * as THREE from 'three';

// WebGL (default)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// WebGPU (opt-in, production-ready since r171)
import WebGPURenderer from 'three/addons/renderers/WebGPURenderer.js';
const renderer = new WebGPURenderer({ antialias: true });
```

## Scene & camera

```js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);
scene.fog = new THREE.Fog(0x1a1a2e, 10, 100);

const camera = new THREE.PerspectiveCamera(
  75,                                   // fov degrees
  window.innerWidth / window.innerHeight, // aspect
  0.1,                                  // near clip
  1000                                  // far clip
);
camera.position.set(0, 2, 5);
```

## Geometry & materials

```js
// Built-in geometry primitives
const box      = new THREE.BoxGeometry(1, 1, 1);
const sphere   = new THREE.SphereGeometry(0.5, 32, 32);
const plane    = new THREE.PlaneGeometry(10, 10);
const torus    = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);

// PBR material (recommended for realistic rendering)
const material = new THREE.MeshStandardMaterial({
  color:     0xff6600,
  metalness: 0.3,
  roughness: 0.4,
});

// Unlit material (flat color, no lighting)
const basic = new THREE.MeshBasicMaterial({ color: 0xffffff });

// Mesh = geometry + material
const mesh = new THREE.Mesh(box, material);
mesh.castShadow = true;
scene.add(mesh);
```

## Lights

```js
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const dir = new THREE.DirectionalLight(0xffffff, 1.0);
dir.position.set(5, 10, 5);
dir.castShadow = true;
scene.add(dir);

const point = new THREE.PointLight(0xff8800, 2, 50);
point.position.set(-3, 3, 0);
scene.add(point);
```

## Loading GLTF models

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('/models/character.glb', (gltf) => {
  scene.add(gltf.scene);

  // Play baked animation (AnimationMixer)
  const mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();

  // Advance mixer in render loop:
  // mixer.update(delta);
});
```

## AnimationMixer (skeletal / morph-target only)

`AnimationMixer` plays `AnimationClip` data baked into GLTF/FBX models. It is **not** a general tween engine.

```js
const mixer  = new THREE.AnimationMixer(model);
const clip   = THREE.AnimationClip.findByName(gltf.animations, 'Walk');
const action = mixer.clipAction(clip);
action.setLoop(THREE.LoopRepeat, Infinity);
action.play();

// In render loop:
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  mixer.update(delta);       // advance skeletal animation
  renderer.render(scene, camera);
}
```

For UI property tweening / sequenced timelines, pair three.js with **GSAP** or **Motion** instead.

## Controls (OrbitControls)

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor  = 0.05;

// Must call in render loop:
// controls.update();
```

## Textures

```js
const loader  = new THREE.TextureLoader();
const texture = loader.load('/textures/diffuse.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

const mat = new THREE.MeshStandardMaterial({ map: texture });
```

## Raycasting (pointer picking)

```js
const raycaster = new THREE.Raycaster();
const pointer   = new THREE.Vector2();

window.addEventListener('pointermove', (e) => {
  pointer.x =  (e.clientX / window.innerWidth)  * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(scene.children, true);
  if (hits.length > 0) { /* hits[0].object */ }
});
```

## Postprocessing (EffectComposer)

```js
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 0.85));

// Replace renderer.render(scene, camera) with:
// composer.render();
```

## Disposal (memory management)

```js
// Always dispose geometry, materials, and textures when done
mesh.geometry.dispose();
mesh.material.dispose();
texture.dispose();
renderer.dispose();
```

## Key classes at a glance

| Class | Purpose |
|---|---|
| `WebGLRenderer` / `WebGPURenderer` | Draws the scene to canvas |
| `Scene` | Root container for all objects |
| `PerspectiveCamera` / `OrthographicCamera` | View frustum |
| `Mesh` | Geometry + material combo |
| `BufferGeometry` | Raw vertex data (base of all built-in geometries) |
| `MeshStandardMaterial` | PBR material (recommended) |
| `DirectionalLight` / `PointLight` / `SpotLight` | Dynamic lights |
| `AnimationMixer` | Skeletal/morph-target animation player |
| `GLTFLoader` | Load `.glb` / `.gltf` models |
| `TextureLoader` | Load image textures |
| `Raycaster` | Pointer/ray intersection tests |
| `EffectComposer` | Postprocessing pipeline |
| `Clock` | Delta-time utility for render loops |
