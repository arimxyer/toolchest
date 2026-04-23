# Phaser — Overview

Phaser is a 2D game engine for the browser. It ships a full game-development scaffold — scenes, physics, input, cameras, audio, asset loading, tilemaps — not just a renderer. For a personal website, its fit is narrow: portfolio mini-games and genuinely game-flavored interactive experiences. For general 2D canvas work, pixi-js delivers the same WebGL throughput at 30% of the bundle weight without the game-engine overhead.

**v4.0.0 "Caladan" (April 10, 2026)** is the largest release in Phaser's history. The WebGL renderer was rebuilt from scratch around a `RenderNode` architecture, replacing the v3 Pipeline system entirely.

## Version history snapshot

| Version | Date | Headline |
|---|---|---|
| v4.0.0 "Caladan" | 2026-04-10 | Ground-up WebGL RenderNode rebuild; Filter system; GPU-driven SpriteGPULayer/TilemapGPULayer; Canvas renderer deprecated |
| v3.88.2 | 2025-Q4 | Last v3 maintenance release |
| v3.0.0 | 2018 | Custom WebGL renderer; Scene system; Matter.js integration |

## Architecture

Phaser is structured around the **game loop pattern** with `Scene` subclassing as the primary composition unit:

- **Game** — top-level container. Owns the renderer, input manager, audio context, physics world, and the scene manager.
- **Scene** — the unit of encapsulation. Each scene has `preload()`, `create()`, and `update(dt)` lifecycle hooks and access to all subsystems via `this.*` namespaces.
- **GameObjects** — `Image`, `Sprite`, `Text`, `TilemapLayer`, etc. Added to a scene via factory methods (`this.add.image(...)`, `this.add.sprite(...)`).
- **Physics** — Arcade Physics (AABB, fast) or Matter.js (polygon, constraints). Bodies are attached to GameObjects.
- **Input** — pointer, keyboard, gamepad. Event-driven and polling APIs.
- **Cameras** — scenes can have multiple cameras with independent viewports, zoom, and follow targets.
- **Loader** — scene-lifecycle `preload()` drives asset loading; assets queue automatically and the scene waits.

## WebGL renderer (v4)

v4's renderer replaces the v3 Pipeline system with `RenderNode` objects. Each node handles a single rendering task and exposes `run()` / `batch()`. Key improvements:

- Index buffers: 4 vertices per quad (vs. 6 in v3) — 33% less vertex data per frame.
- Texture coordinates use GL-native Y-up orientation — eliminates the internal framebuffer flip from v3.
- Direct `gl.*` calls are no longer safe; use the `Extern` GameObject for raw WebGL access.
- Custom v3 pipelines must be rewritten as render nodes and registered via `RenderConfig#renderNodes` at boot.

## New GameObjects in v4

| Class | Description |
|---|---|
| `SpriteGPULayer` | GPU-driven layer: 1M+ sprites in a single draw call; GPU-animated per-sprite transform/alpha/tint/frame |
| `TilemapGPULayer` | Entire tilemap layer as one quad; fixed per-pixel cost; up to 4096×4096 tiles |
| `Gradient` | Procedural gradients (LINEAR, BILINEAR, RADIAL, CONIC) with dithering |
| `Noise` / `NoiseSimplex*` / `NoiseCell*` | Noise-field GameObjects for generative effects |
| `CaptureFrame` | Copies the current framebuffer to texture for post-processing |

**Removed in v4:** `Mesh`, `Plane` (OBJ loading dropped); `Geom.Point` (replaced by `Vector2` throughout).

## Filter system (v4)

Replaces v3 FX + Masks. Filters attach to any GameObject or Camera. Built-in: Blur, Glow, Shadow, Pixelate, Blocky, ColorMatrix, Bloom, Vignette, Wipe, ImageLight, GradientMap, Quantize, Blend, Mask, Key, Threshold, PanoramaBlur, ParallelFilters, Sampler.

## Physics

Arcade Physics and Matter.js both remain unchanged from v3. v4 adds only bug fixes to both.

## Installation

```
npm install phaser
```

Weekly downloads: ~140 K (week of 2026-04-15). GitHub stars: ~39.5 K.
