# Babylon.js — API Reference

## Engine and scene setup

```js
import { Engine, Scene } from "@babylonjs/core";

const canvas = document.getElementById("canvas");
const engine = new Engine(canvas, true); // antialias: true
const scene = new Scene(engine);

engine.runRenderLoop(() => scene.render());
window.addEventListener("resize", () => engine.resize());
```

**WebGPU engine** (alternative to WebGL):
```js
import { WebGPUEngine } from "@babylonjs/core";

const engine = new WebGPUEngine(canvas);
await engine.initAsync();
const scene = new Scene(engine);
```

## Cameras

```js
import { ArcRotateCamera, Vector3 } from "@babylonjs/core";

// Orbit camera — most common for 3D scenes
const camera = new ArcRotateCamera("cam", -Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Free camera (FPS-style)
import { FreeCamera } from "@babylonjs/core";
const free = new FreeCamera("free", new Vector3(0, 5, -10), scene);
free.setTarget(Vector3.Zero());
```

## Lights

```js
import { HemisphericLight, PointLight, DirectionalLight, Color3 } from "@babylonjs/core";

const hemi = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
hemi.intensity = 0.7;

const point = new PointLight("point", new Vector3(0, 5, 0), scene);
point.diffuse = new Color3(1, 0.8, 0.5);
```

## Meshes and geometry

```js
import { MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";

const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
sphere.position.y = 1;

const ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

const mat = new StandardMaterial("mat", scene);
mat.diffuseColor = new Color3(0, 1, 0);
sphere.material = mat;
```

## PBR materials

```js
import { PBRMaterial, Texture } from "@babylonjs/core";

const pbr = new PBRMaterial("pbr", scene);
pbr.albedoColor = new Color3(1, 0.766, 0.336);
pbr.metallic = 1.0;
pbr.roughness = 0.15;
sphere.material = pbr;
```

## Physics (Havok)

```js
import { HavokPlugin, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";

const havok = await HavokPhysics();
const physicsPlugin = new HavokPlugin(true, havok);
scene.enablePhysics(new Vector3(0, -9.81, 0), physicsPlugin);

// Rigid body sphere
const sphereAggregate = new PhysicsAggregate(sphere, PhysicsShapeType.SPHERE, { mass: 1, restitution: 0.75 }, scene);

// Static ground
const groundAggregate = new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, scene);
```

## Animation

```js
import { Animation } from "@babylonjs/core";

const anim = new Animation("rotY", "rotation.y", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
anim.setKeys([
  { frame: 0, value: 0 },
  { frame: 30, value: Math.PI * 2 },
]);
sphere.animations = [anim];
scene.beginAnimation(sphere, 0, 30, true);
```

## WebXR

```js
const xrHelper = await scene.createDefaultXRExperienceAsync({
  floorMeshes: [ground],
});
```

## GLTF loading

```js
import "@babylonjs/loaders/glTF";
import { SceneLoader } from "@babylonjs/core";

const { meshes } = await SceneLoader.ImportMeshAsync("", "/assets/", "model.glb", scene);
```

## Inspector (dev only)

```js
import "@babylonjs/inspector";
scene.debugLayer.show();
```

## Node Material Editor

The NME is a visual drag-and-drop shader graph. To load a saved NME JSON:
```js
import { NodeMaterial } from "@babylonjs/core";

const nodeMat = await NodeMaterial.ParseFromFileAsync("nme", "/assets/material.json", scene);
sphere.material = nodeMat;
```
