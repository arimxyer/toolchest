---
name: phaser
description: 2D game engine for portfolio interactive experiences — not a general renderer.
---
# Phaser

## When to use

- Building a portfolio piece that IS a mini-game (platformer, puzzle, shooter) and needs a full game-engine scaffold: scenes, physics, input, camera, audio in one package.
- Creating an interactive parallax-scroll world or generative interactive environment where entities need physics bodies and collision response.
- You want arcade-style sprite animation (frame sequences, tweens, state machines) with minimal glue code.
- The experience genuinely benefits from Phaser's Scene pipeline — distinct loading, game, and game-over screens with built-in lifecycle hooks.
- Prototyping or shipping a game-flavored interactive experience where the game-engine abstractions (groups, bodies, cameras) pay for the bundle cost.

## When NOT to use

- General 2D rendering (sprites, particles, canvas animation) without game-engine scaffolding — use pixi-js; same WebGL throughput, 30% of the bundle.
- Simple page animation (transitions, scroll effects, micro-interactions) — use motion or gsap; Phaser is 349 KB gzipped for that.
- 3D scenes — use three-js, babylon-js, or react-three-fiber; Phaser is strictly 2D.
- React-component-tree-driven UIs where you need declarative rendering — pixi-react or react-konva integrate cleanly; Phaser's imperative Scene model fights React.
- Accessible, interactive 2D drawing/diagramming (infinite canvas, object selection, snap-to-grid) — konva or fabric-js are purpose-built.

## Quick facts

| Field | Value |
|---|---|
| Current version | 4.0.0 "Caladan" (released 2026-04-10) |
| License | MIT |
| Framework | Vanilla JS/TS — game-loop pattern; `Scene` subclassing; no React bindings |
| Bundle size | ~349 KB gzipped / ~1,346 KB minified (bundlephobia, v4.0.0) |
| Runtime | WebGL (primary, RenderNode architecture) + Canvas 2D fallback (deprecated, no new WebGL features) |
| Weekly npm downloads | ~140 K |

## See also

- [../pixi-js/dossier.md](../pixi-js/dossier.md) — 2D WebGL renderer without game-engine overhead; prefer this for non-game interactive canvas
- [../konva/dossier.md](../konva/dossier.md) — interactive 2D canvas focused on UI/design-editor patterns
- [../three-js/dossier.md](../three-js/dossier.md) — 3D counterpart
- [../../motion/gsap/dossier.md](../../motion/gsap/dossier.md) — animation engine for DOM/CSS; often paired with pixi-js instead of Phaser for non-game work
