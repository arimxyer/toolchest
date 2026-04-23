# Phaser — Differentiators

## Versus the full dossier

### vs. pixi-js

The closest sibling and the most important comparison. Both render 2D scenes with WebGL at 60 fps. The difference is scope:

- **PixiJS** is a rendering engine: a scene graph, a GPU renderer, an asset loader, and an event system. You bring your own game loop, physics, input handling, camera, and audio.
- **Phaser** is a game engine: Scene lifecycle, Arcade Physics + Matter.js, input (keyboard/pointer/gamepad), cameras, audio, tilemap system, tween engine, timer — all integrated and ready.

PixiJS v8 has its own ground-up WebGL renderer (WebGPU first-class); Phaser v4 has its own ground-up WebGL RenderNode renderer. These are independent implementations — Phaser v4 does not use PixiJS internally.

**Choose PixiJS** when you want 2D WebGL throughput without game-engine overhead: interactive data-viz, particle effects, generative art, canvas work that pairs with GSAP. Bundle is ~244 KB gzipped vs. Phaser's ~349 KB.

**Choose Phaser** when the deliverable is genuinely a game: physics-driven entities, collision response, multiple rooms/levels managed as Scenes, sprite animation with state machines.

### vs. konva / react-konva

Konva targets interactive-UI Canvas work: object selection, drag-and-drop, hit-testing by shape boundary, snap-to-grid, canvas-state serialisation. Its React story (`react-konva`) is mature. It has no physics, no game loop, no audio. Phaser has no concept of "selected object" or canvas-state persistence. They solve different problems entirely — Konva for design-editor patterns, Phaser for game patterns.

### vs. three-js

Three.js is the 3D counterpart. Phaser is strictly 2D. If your portfolio experience requires 3D — use Three.js or babylon-js. Phaser and Three.js can coexist (separate canvases), but there is no depth dimension inside Phaser's renderer.

### vs. babylon-js

Babylon.js is a full-featured 3D engine with PBR materials, physics, and a GUI system. No 2D rendering overlap with Phaser.

### vs. react-three-fiber / react-three-rapier

3D rendering + physics in a React tree. No overlap with Phaser's 2D-game niche.

### vs. lottie / rive

Lottie and Rive play pre-authored vector animations (a designer's output). Phaser renders a live, programmable scene graph. Complementary, not competing: a Rive animation can play as a texture inside a Phaser scene.

### vs. remotion

Remotion renders React components to video server-side. Phaser renders in-browser in real time. Completely different output targets.

### vs. p5-js

p5.js is an immediate-mode creative-coding sketch library (no scene graph, Canvas 2D). Phaser is retained-mode with a full scene graph and WebGL. p5 has a lower entry floor for generative art; Phaser has a dramatically higher ceiling for game-complete experiences.

### vs. fabric-js

fabric-js is purpose-built for design-editor experiences: free-form object selection, transform handles, JSON canvas serialisation. No game-engine primitives.

### vs. gsap / motion / anime / popmotion / react-spring / theatre

Animation-timeline and spring engines operating on CSS properties, DOM transforms, or plain JS values. They do not render a canvas. GSAP is the standard pairing for driving tweens on pixi-js; Phaser has its own built-in tween system (`this.tweens`) so the external pairing is less common.

### vs. WAAPI / tailwindcss-animate / tailwindcss-motion / tw-animate-css

CSS and Web Animation API tooling. DOM-level concerns. No overlap with Phaser.

### vs. lenis / use-gesture / react-transition-group / auto-animate / view-transitions-api

Scroll inertia, gesture recognition, component transition helpers. DOM-level concerns. No overlap.

---

## Phaser's actual differentiating strengths

1. **Complete game-engine scaffold** — physics, input, cameras, audio, tilemaps, animations, and a scene manager in one cohesive package with well-tested integration between subsystems.
2. **Scene pipeline** — `preload/create/update` lifecycle removes the boilerplate of asset loading, state machines between game states, and multi-screen orchestration.
3. **v4 RenderNode renderer** — ground-up WebGL rebuild: index-buffer quads (33% less vertex data), native Y-up textures, `SpriteGPULayer` for 1M+ sprites in one draw call, unified Filter system.
4. **Arcade Physics** — fast AABB-based physics designed for game use cases; zero configuration for standard platformer/shooter collision needs.
5. **Longevity and community** — 39.5 K GitHub stars, 140 K weekly npm downloads, active daily commits, 13+ years of browser-game history.
