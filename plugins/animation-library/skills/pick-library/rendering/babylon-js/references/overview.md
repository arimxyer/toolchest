# Babylon.js — Overview

## What it is

Babylon.js is a full-featured, open-source 3D engine for the web, maintained by Microsoft. It targets WebGL and WebGPU, ships with a physics engine (Havok), built-in WebXR, a visual Node Material Editor, and an in-browser Inspector — making it the closest thing to a batteries-included 3D game engine available in a browser runtime.

## Key capabilities

**Rendering**
- WebGL 2.0 renderer (default) with WebGPU renderer as a stable alternative engine path
- WGSL shader support (available since ~2021, matured through 8.x)
- Physically based rendering (PBR), HDR, clustered lighting, volumetric effects, Gaussian Splat rendering
- Large-world rendering and geospatial camera support (added in 9.0)

**Physics**
- Havok physics plugin is bundled as `@babylonjs/havok` — rigid body dynamics, collision detection, constraints, and joints without any extra configuration
- Legacy Cannon.js / Ammo.js / Oimo.js plugins also supported via the physics plugin interface

**WebXR**
- First-class WebXR Session Manager with controllers, hand tracking, and AR anchors
- Teleportation, locomotion, and interaction helpers built in

**Visual tooling**
- **Node Material Editor (NME):** Visual shader graph editor — drag-and-drop nodes to build custom materials without writing GLSL/WGSL
- **Node Particle Editor:** visual particle system authoring (added in 9.0)
- **Inspector:** in-browser scene tree, property panel, texture previewer, and performance overlays
- **Babylon.js Playground:** live coding environment at playground.babylonjs.com

**Asset pipeline**
- GLTF/GLB, OBJ, STL, 3MF loader support
- Animation groups, skeleton animation, animation retargeting (9.0)
- `.babylon` native scene format

## Architecture

Babylon.js uses a scene/engine/camera/light/mesh object model rather than an ECS architecture. The `Engine` wraps a canvas; the `Scene` owns all objects; cameras, lights, and meshes are first-class objects. This is more game-engine-like than three.js's more minimal SceneGraph + Object3D approach.

## Packages

| Package | Purpose |
|---|---|
| `@babylonjs/core` | Engine, renderer, scene, cameras, lights, meshes |
| `@babylonjs/materials` | Extended materials (gradient, triplanar, etc.) |
| `@babylonjs/loaders` | GLTF/GLB, OBJ, STL loaders |
| `@babylonjs/havok` | Havok physics WASM plugin |
| `@babylonjs/gui` | Fullscreen and in-scene 2D GUI |
| `@babylonjs/inspector` | In-browser debugger (dev-only) |
| `babylonjs` | Legacy UMD meta-package (CDN usage) |

## Versioning cadence

As of 2026, Babylon.js releases frequently (multiple patch versions per week during active development). v9.3.4 shipped 2026-04-21; v9.0.0 was the previous major milestone introducing clustered lighting, Node Particle Editor, and Inspector v2.
