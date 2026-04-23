# Phaser — Drawbacks

## Game-engine scope is overkill for 90%+ of personal-website needs

Phaser ships a physics engine, a scene manager, a camera system, an audio manager, a tilemap renderer, a tween engine, a timer system, and a full input stack. A portfolio site that needs a parallax scroll, a hover interaction, or a generative canvas background does not need any of that. pixi-js delivers the same WebGL throughput without the game-engine weight. GSAP or Motion cover animation at a fraction of the bundle cost.

Rule of thumb: if your experience doesn't need collision response or distinct game states (loading screen → gameplay → game over), Phaser is the wrong tool.

## Bundle weight

| Library | Gzipped |
|---|---|
| motion (core) | ~17 KB |
| gsap | ~24 KB |
| pixi.js v8 | ~244 KB |
| **phaser v4** | **~349 KB** |

~349 KB gzipped is non-trivial on a personal website. That's a 43% premium over PixiJS for subsystems you will not use unless you are building a game. No tree-shaking of unused game systems is available — Phaser ships as a monolith.

## v3 → v4 migration cost

v4 is a breaking release. Any existing Phaser v3 project requires non-trivial porting work:

- Custom rendering pipelines must be rewritten as `RenderNode` classes (no shim exists).
- `setTintFill()` removed; tint mode is now explicit via `setTintMode(Phaser.TintModes.FILL)`.
- `BitmapMask` API replaced by the unified Filter system.
- `Geom.Point` removed entirely; code using it must migrate to `Vector2`.
- `DynamicTexture`/`RenderTexture` now require explicit `.render()` calls where v3 rendered automatically.
- Compressed textures must be re-processed with Y-up orientation (Y was flipped in v3).

The migration guide exists and is comprehensive, but the effort is real for complex v3 projects.

## No React integration story

Phaser manages its own canvas and game loop imperatively. There are no official React bindings. Integrating Phaser into a React component tree requires a `useEffect` / `useRef` pattern that is fragile to lifecycle edge cases (StrictMode double-mount, fast refresh re-init). pixi-react and react-konva have solved this problem; Phaser has not.

## Canvas renderer is deprecated in v4

The Canvas 2D fallback renderer still works in v4, but receives no new WebGL features and is not maintained for new capabilities. WebGL (or a browser that supports it) is now a hard requirement for any v4-era feature. As of 2026, browser WebGL support is effectively universal, but it is a dependency to be aware of.

## Steep learning curve for non-game use cases

Phaser's API surface is large because it is designed for game development. The Scene/GameObjects/Physics/Input/Camera model is coherent for games but adds cognitive overhead when you only want to render sprites on a canvas. Phaser's documentation and community examples assume you are building a game.
