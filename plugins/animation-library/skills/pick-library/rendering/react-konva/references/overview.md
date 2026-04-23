# react-konva — Overview

## What it is

react-konva is a React reconciler for the [Konva](https://konvajs.org) 2D canvas framework. It maps JSX component trees onto Konva's internal node graph, exactly as React maps JSX onto the DOM. The relationship is explicit in the official docs: "Konva is to react-konva what the DOM is to React."

Install both packages — Konva is a required peer dependency:

```bash
npm install react-konva konva
```

## Architecture

```
React component tree
      │
react-reconciler (custom host)
      │
Konva scene graph (Stage → Layer → Shape)
      │
HTML5 Canvas 2D context
```

- `react-reconciler` drives create/update/delete of Konva nodes in response to React renders.
- `its-fine` (bundled since v18.2.2) bridges React context across the reconciler boundary, solving the long-standing "context not available inside Stage" problem.
- Event handling is delegated to Konva's synthetic hit-testing (pixel-perfect for complex shapes), then surfaced with React-style `onEventName` props.

## Use-case sweet spots

- Diagram and flowchart editors (nodes + edges, drag-to-connect)
- Image annotation tools (bounding boxes, polygons, labels)
- Dashboards with draggable / resizable widgets
- Simple 2D games where update rate is under a few hundred objects
- Data visualizations that require interaction (hover, click, drag) beyond what SVG handles cleanly

## Not supported

- React Native (no canvas API)
- Server-side rendering — wrap with `dynamic(() => import('./MyCanvas'), { ssr: false })` in Next.js
- `React.createPortal` natively; use `<Portal>` from `react-konva-utils` instead

## Ecosystem

- `react-konva-utils` — adds `<Html>` (DOM overlay inside Stage) and `<Portal>` (move nodes between Layers)
- Konva's own plugin system (Konva.Transformer, Konva.Animation, filters) is fully accessible via `ref`
- ~950K weekly npm downloads (2026-04-22); significantly larger install base than `@pixi/react` (~50K) or `react-babylonjs` (~3K)

## Source

- Homepage: https://konvajs.org/docs/react/ (retrieved 2026-04-22)
- GitHub: https://github.com/konvajs/react-konva (retrieved 2026-04-22)
- npm: https://www.npmjs.com/package/react-konva (retrieved 2026-04-22)
