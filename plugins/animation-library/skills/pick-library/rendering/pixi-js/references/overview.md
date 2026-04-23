# PixiJS — Overview

PixiJS is a 2D WebGL/WebGPU rendering engine optimised for high-throughput sprite and particle work. It is not a game engine (no physics, no audio, no ECS), but it is the renderer of choice for 2D games, interactive data-visualisations, and generative canvas art.

## Version history snapshot

| Version | Date | Headline change |
|---|---|---|
| v8.18.1 | 2026-04-14 | Fix `Application.domContainerRoot` in Node.js environments |
| v8.18.0 | 2026-04-14 | SVG export for Graphics; mask channel selection; renderer preference arrays |
| v8.17.1 | 2026-03-16 | Compressed texture resolution fix; text center-align word-wrap fix |
| v8.0 | 2024-02 | WebGPU as first-class renderer; async `Application.init()`; single `pixi.js` package; Graphics API overhaul |

## Architecture

PixiJS is built entirely on a modular extension system. Core subsystems:

- **Renderer** — auto-selects WebGPU → WebGL → Canvas based on capability.
- **Scene graph** — `Container` tree. Transforms, alpha, and visibility compose down the hierarchy.
- **Assets** — async loader with bundle manifests, background loading, and compressed-texture detection.
- **Ticker** — `requestAnimationFrame`-driven loop. Calls user listeners, then renders the stage.
- **Events** — pointer/mouse/touch with hit-area support and accessibility overlays.

## Rendering pipeline (per frame)

1. Ticker fires user callbacks (`app.ticker.add(fn)`).
2. Scene graph traversal: world transforms recalculated, culling applied (opt-in).
3. GPU draw: objects batched, geometry/textures uploaded, draw calls issued.

## Key scene objects

| Class | Use |
|---|---|
| `Sprite` | Textured quad — fastest drawable |
| `ParticleContainer` | Batch of sprites sharing one texture; minimal CPU overhead |
| `Graphics` | Immediate-style shape API; shapes defined first, then filled/stroked |
| `Container` | Grouping node; can be promoted to a `RenderGroup` for GPU-side transform offload |
| `TilingSprite` | Repeating texture; efficient for backgrounds |
| `NineSliceSprite` | Scalable UI sprites with fixed corners |
| `Mesh` | Custom geometry + shader |
| `Text` / `BitmapText` | Dynamic vs. pre-rasterised text |

## RenderGroups and RenderLayers (v8)

- **RenderGroup** — marks a `Container` as a self-contained sub-scene graph. GPU handles transforms for the group, reducing CPU work for static subtrees.
- **RenderLayer** — decouples visual draw order from logical parent-child position. Useful for HUDs or overlays that must render on top regardless of hierarchy depth.

## Ecosystem

| Package | Purpose |
|---|---|
| `@pixi/react` | React 19+ declarative bindings |
| `@pixi/layout` | Yoga-based flexbox layout for display objects |
| `pixi-filters` | Blur, glow, displacement, colour-matrix, and 30+ more effects |
| `pixi-spine` | Skeletal animation via Esoteric Spine |
| `pixi-sound` | WebAudio playback |
| `@pixi/ui` | Pre-built button, slider, list, scrollbox components |
| `@pixi/assetpack` | Build-time asset pipeline (compression, atlas packing) |

## gl2D scene format (2025/2026)

PixiJS is introducing a glTF-inspired `gl2D` scene format that allows structured scene description and interop. This is experimental as of early 2026.

## npm

```
npm install pixi.js
```

Weekly downloads: ~578 K (week of 2026-04-15).
