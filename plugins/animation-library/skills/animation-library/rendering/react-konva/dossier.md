---
name: react-konva
description: React reconciler for Konva — JSX/Canvas 2D shapes with drag, events, and hit-testing; best for interactive diagram and annotation UIs.
---
# react-konva

## When to use

- Building interactive 2D canvas UIs in React: diagram editors, annotation layers, dashboards with draggable widgets.
- You want full React component model (hooks, state, context) but need canvas-level event handling and hit-testing out of the box.
- The app targets browsers only and you need a battle-tested ~950K downloads/week ecosystem with Konva's rich shape and plugin library.
- You need layer-based compositing (static background + animated foreground) without managing raw canvas contexts.
- Replacing a DOM-heavy interaction that has hit layout/repaint performance limits, but the geometry is 2D and complexity is moderate.

## When NOT to use

- **3D scenes** — use `react-three-fiber` (WebGL, Three.js, full 3D scene graph).
- **High-volume sprite rendering / particle systems / WebGL shaders** — use `pixi-react` (WebGL 2D, GPU-accelerated, orders-of-magnitude more draw calls).
- **Freehand vector design editor with SVG export** — use `fabric-js` (SVG-based, built-in serialization and object model for design tools).
- **Video / frame-accurate animation sequences** — use `remotion` (React renderer for video, timeline-first).
- **Server-side rendering or React Native** — react-konva is browser-only; canvas APIs are unavailable in SSR and unsupported in RN.

## Quick facts

| Field | Value |
|---|---|
| Current version | 19.2.3 (versioned after React major target) |
| License | MIT |
| Framework | React 19 (v19.x); use 18.x branch for React 18 |
| Bundle size (gzipped) | ~39 kB (react-konva) + ~53 kB (konva peer dep) = ~92 kB total; tree-shakeable via `react-konva/lib/ReactKonvaCore` |
| Runtime | Wraps Konva (HTML5 Canvas 2D); custom React reconciler via `react-reconciler` |

## See also

- [`../konva/dossier.md`](../konva/dossier.md) — underlying engine; use directly if you don't need the React layer
- [`../pixi-react/dossier.md`](../pixi-react/dossier.md) — React bindings for PixiJS (WebGL 2D, higher throughput)
- [`../react-three-fiber/dossier.md`](../react-three-fiber/dossier.md) — React reconciler for Three.js (3D)
- [`../fabric-js/dossier.md`](../fabric-js/dossier.md) — SVG-based canvas with built-in object serialization
