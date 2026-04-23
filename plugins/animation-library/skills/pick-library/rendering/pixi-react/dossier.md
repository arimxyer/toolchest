---
name: pixi-react
description: React 19 reconciler for PixiJS v8 — declarative 2D WebGPU/WebGL sprites, particles, and animations at 60 fps.
---
# @pixi/react

## When to use
- You want PixiJS 2D rendering (sprites, particles, tilemaps, masks) wired into a React component tree with props and hooks.
- Your scene is performance-critical — games, data-vis, generative art — and needs WebGPU/WebGL throughput rather than DOM/CSS.
- You're already on React 19 and want first-party, officially maintained bindings (now under the pixijs GitHub org).
- You need a game-loop tick hook (`useTick`) integrated with PixiJS's own Ticker without manual imperative wiring.
- You want tree-shakeable PixiJS: the `extend()` API lets you import only the PixiJS classes you use, keeping bundles lean.

## When NOT to use
- **Vanilla PixiJS** — no React in the stack; use PixiJS directly to avoid reconciler overhead.
- **3D scenes** — use React Three Fiber (`@react-three/fiber`); @pixi/react is strictly 2D.
- **Accessible, form-heavy UI** — use react-konva or plain DOM; @pixi/react renders to a WebGL canvas, not accessible HTML.
- **React 18 or below** — peer dependency is `react >= 19.0.0`; upgrading React is a hard prerequisite.
- **Animated SVG/Lottie playback** — reach for `lottie-react` or `@rive-app/react-canvas` instead.

## Quick facts
| Field | Value |
|---|---|
| Current version | 8.0.5 (Dec 1, 2025) |
| License | MIT |
| Framework | React >=19.0.0 (peer dep) |
| Bundle (gzip) | ~40 KB gzipped / ~128 KB minified |
| Runtime | Wraps PixiJS v8 (WebGPU → WebGL → Canvas fallback) |
| Peer dep | `pixi.js ^8.2.6` |
| Repo | github.com/pixijs/pixi-react (first-party, pixijs org) |
| Weekly downloads | ~49,900 |

## See also
- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.tsx)
