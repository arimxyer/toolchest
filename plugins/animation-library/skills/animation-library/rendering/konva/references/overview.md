# Konva — Overview

## What it is

Konva is an HTML5 Canvas 2D JavaScript framework that adds an object-oriented scene graph, built-in event handling, drag-and-drop, and animation on top of the native `<canvas>` API. It targets desktop and mobile browsers.

## Architecture

The scene graph hierarchy is: **Stage** → **Layer** → **Group / Shape**.

Each `Layer` maintains two canvas elements internally:
- **Scene canvas** — the visible render surface.
- **Hit canvas** — an invisible, off-screen canvas used for pixel-accurate event detection (each shape is filled with a unique color; pointer events read the pixel to identify which shape was hit).

This dual-canvas hit graph means event handling works correctly even for irregular shapes (stars, paths, custom polygons) without any extra math.

## Selective rendering

Only layers that have changed are redrawn. Individual shapes can be cached to an off-screen buffer (`shape.cache()`) so they paint as a single bitmap, avoiding repeated path recalculation.

## Core feature set

- **Shapes**: Rect, Circle, Ellipse, Line, Arrow, Path (SVG path data), Text, TextPath, Image, Sprite, Ring, Arc, Wedge, RegularPolygon, Star, Label/Tag, custom `Shape` with `sceneFunc`.
- **Interactivity**: All nodes fire pointer, touch, wheel, and drag events. Draggable is a single prop (`draggable: true`). Drag boundaries can be constrained via `dragBoundFunc`.
- **Transformer**: A built-in resizing/rotation handle widget — attach it to any node and users get resize handles immediately.
- **Animation**: `Konva.Animation` for per-frame callbacks; `Konva.Tween` for property-based transitions with easing.
- **Filters**: Blur, Brighten, Contrast, Emboss, Enhance, Grayscale, HSL, Invert, Kaleidoscope, Mask, Noise, Pixelate, Posterize, RGBA, Sepia, Solarize, Threshold — applied to cached shapes.
- **Serialization**: `stage.toJSON()` / `Konva.Node.create(json)` for full scene persistence.
- **DOM-like selectors**: `stage.find('.myClass')`, `stage.findOne('#myId')`.

## Use-case sweet spot

Interactive 2D applications where individual objects must respond to user input: diagram editors, whiteboard apps, seat/venue selection UIs, floor plan tools, annotation overlays, image-editing canvases.

## Download profile (week of 2026-04-15)

| Package | Downloads/wk |
|---|---|
| konva | 1,263,108 |
| react-konva | 950,340 |
| pixi.js | 578,303 |

Konva's download count substantially exceeds PixiJS's — a common surprise given PixiJS's higher profile in game-dev circles.
