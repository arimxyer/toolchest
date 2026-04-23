# PixiJS — Differentiators

## Versus the full dossier

### vs. konva / react-konva

Konva targets interactive-UI Canvas work: object selection, drag-and-drop, hit-testing by shape, snap-to-grid. Its React story (`react-konva`) is mature and React-idiomatic. PixiJS targets high-throughput rendering: games, particles, procedural animation at 60 fps. When your priority is frame rate over UI composability, choose PixiJS. When you need a design-editor feel with a React component tree, choose Konva.

### vs. fabric-js

fabric-js is purpose-built for design-editor experiences — free-form object selection, transform handles, JSON serialisation of canvas state. PixiJS has no concept of "selected object" or canvas-state persistence. They solve completely different problems.

### vs. pixi-react

pixi-react (`@pixi/react`) is the React-component binding *on top of* PixiJS. It wraps PixiJS containers and display objects as JSX. Choose bare PixiJS when you want full imperative control and maximum performance; choose pixi-react when you want declarative scene description inside a React tree. The rendering engine underneath is identical.

### vs. three-js

Three.js is a 3D engine. PixiJS is 2D only. They can share a WebGL context — a common pattern is Three.js for the 3D background, PixiJS as a 2D overlay for HUD or UI. Use PixiJS when your entire scene is 2D and you want a smaller, faster surface area than Three.js.

### vs. babylon-js

Babylon.js is a full-featured 3D engine with physics, PBR materials, and a GUI system. PixiJS does not do 3D. Same division as Three.js, with Babylon skewing heavier and more batteries-included.

### vs. react-three-fiber / react-three-rapier

react-three-fiber brings Three.js into React. react-three-rapier adds physics. Both are 3D. No overlap with PixiJS's 2D niche.

### vs. lottie / rive

Lottie and Rive play pre-authored vector animations. PixiJS renders a live, programmable scene. They are complementary: you can render a Rive animation as a texture in a PixiJS scene, but PixiJS itself has no timeline or keyframe concept.

### vs. remotion

Remotion renders React components to video server-side. PixiJS renders in-browser in real time. Completely different output targets.

### vs. p5-js

p5.js is a creative-coding sketch library with an immediate-mode API (no scene graph). PixiJS is retained-mode with a scene graph and GPU acceleration. p5 has a far lower floor for entry-level generative art; PixiJS has a much higher ceiling for performance.

### vs. phaser

Phaser is a full 2D game framework: physics, input, scenes, cameras, arcade sprites. PixiJS is a rendering engine only. Phaser actually uses PixiJS as its renderer internally. If you need a game engine, Phaser (or similar); if you want full control over the stack, PixiJS.

### vs. gsap / motion / popmotion / anime / react-spring

These are animation-timeline or spring engines that operate on CSS properties, DOM transforms, or plain JS values. They do not render a canvas. PixiJS controls the canvas; GSAP is the standard pairing to drive tweens that update PixiJS object properties each frame. PixiJS's own `Ticker` handles the per-frame loop but has no built-in tween/spring system.

### vs. WAAPI / tailwindcss-animate / tailwindcss-motion / tw-animate-css

CSS/Web Animation API tooling. Operates on DOM elements. No overlap with PixiJS.

### vs. theatre-js

Theatre.js is a motion-design tool with a timeline editor and driver API. It can drive PixiJS object properties the same way GSAP can. No overlap in rendering.

### vs. lenis / use-gesture / react-transition-group / auto-animate / view-transitions-api

Scroll inertia, gesture recognition, component transition helpers. DOM-level concerns. No overlap.

---

## PixiJS's actual differentiating strengths

1. **WebGPU first-class (v8, Feb 2024)** — Only major 2D library with production WebGPU support and automatic WebGL fallback. No configuration required.
2. **Throughput** — ParticleContainer can push 100 K sprites at 60 fps where a DOM or Canvas 2D approach would stall.
3. **Ecosystem maturity** — 578 K weekly downloads, Chrome DevTools extension, React bindings, Spine integration, extensive filter pack.
4. **Single-package import (v8)** — All APIs from `pixi.js`; no sub-package dependency juggling.
5. **RenderGroups / RenderLayers** — Fine-grained GPU batching and decoupled draw order are uncommon in 2D libraries.
