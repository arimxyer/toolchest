# p5.js — Differentiators

## p5.js's unique position

p5.js owns the **creative-coding sketch** niche. Its defining API contract is a `setup()` / `draw()` loop with immediate-mode drawing functions available as bare globals — no scene graph, no retained objects, no framework ceremony. The entire surface area is designed so a beginner can see results in under 10 lines and an expert can layer complexity on top without fighting the library.

No other library in the 30-entry dossier targets this niche. The closest competitors are Processing (Java), openFrameworks (C++), and nannou (Rust) — none of which are JavaScript.

---

## Versus the rendering/ siblings

### vs. three-js

Three.js is a **3D WebGL/WebGPU engine** with a retained scene graph, PBR materials, cameras, and lights. p5.js is a **2D (and optional 3D-via-WebGL) immediate-mode sketch library**. The categories do not overlap: Three.js is for 3D scenes, data-vis with depth, or 3D art; p5.js is for 2D generative sketches and interactive canvas experiments. Neither substitutes for the other.

### vs. pixi-js

PixiJS is a **retained-mode 2D rendering engine** optimised for high-throughput sprite and particle work. It has a scene graph, GPU batching, and a production-grade asset pipeline. p5.js is **immediate-mode with no scene graph** — you redraw every object every frame. p5 has a far lower entry floor (generative art in 10 lines); PixiJS has a far higher performance ceiling (100 K sprites at 60 fps). Pick p5 for expressive creative coding; pick PixiJS for performance-critical 2D rendering.

### vs. react-three-fiber

react-three-fiber is a React reconciler for Three.js — 3D scene description as JSX. p5.js has no React binding and no 3D-first design. Different category, different ecosystem.

### vs. react-three-rapier

Physics engine layered on react-three-fiber. Unrelated to p5.js's niche.

### vs. babylon-js

Full 3D engine with PBR, physics, and GUI. 3D-only; no overlap with p5.js's 2D creative-coding domain.

### vs. phaser

Phaser is a **full 2D game framework**: scenes, cameras, arcade physics, input manager, audio, asset pipeline. p5.js is a **drawing library with no game infrastructure**. For a game, use Phaser. For a generative art piece or interactive sketch, use p5. Phaser uses PixiJS as its renderer internally — it does not use p5.

### vs. konva / react-konva

Konva targets **interactive UI canvas**: object selection, drag-and-drop, snap, hit-testing by shape. Its React binding is a first-class concern. p5.js has no object selection model and fights React. Pick Konva for design-editor-style UX; pick p5 for generative / procedural drawing.

### vs. fabric-js

fabric-js is a **design-editor canvas library** — free-form object selection, transform handles, JSON serialisation of canvas state. Same distinct audience as Konva. No overlap with p5's sketch-loop model.

### vs. lottie

Lottie **plays pre-authored vector animations** exported from After Effects. p5.js generates visuals programmatically. They are complementary (you could render a Lottie animation over a p5 canvas) but serve different authors: motion designers vs. creative coders.

### vs. rive

Rive is a **state-machine animation player** for designer-authored rigs. Same distinction as Lottie — authoring tool, not a coding library. No overlap.

### vs. remotion

Remotion renders **React component trees to video** server-side. p5.js renders in-browser in real time. Different output targets entirely; p5 sketches are sometimes recorded via `p5.prototype.saveFrames()` as a manual workaround, not an integration.

---

## Versus the motion/ siblings

### vs. gsap / anime / popmotion / motion / theatre

These are **animation-timeline and spring engines** that operate on CSS properties, DOM transforms, or plain JS values. They do not render a canvas. p5.js controls the canvas; you could pair GSAP to drive values that p5 reads each frame, but there is no native integration and it is uncommon. The audiences are different: GSAP users animate DOM/SVG elements; p5 users write drawing loops.

### vs. react-spring

Spring-physics engine for React component props — entirely DOM-level. No overlap.

### vs. auto-animate / react-transition-group

Component transition helpers for React. No overlap.

### vs. lenis

Scroll inertia library. No overlap.

### vs. use-gesture

Gesture recognition for DOM/React. p5 has its own pointer event callbacks and does not integrate with use-gesture.

### vs. tailwindcss-animate / tw-animate-css / tailwindcss-motion

CSS animation utilities. No overlap with canvas-based p5.

### vs. view-transitions-api / waapi

Browser-native page-transition and Web Animations APIs. DOM-level; no overlap.

---

## p5.js's actual differentiating strengths

1. **Sketch-mode API** — `setup()` + `draw()` as bare global functions is the lowest-friction entry point in the entire dossier. No imports, no constructors, no reconcilers.
2. **Perlin noise, math, and vector primitives built in** — `noise()`, `map()`, `lerp()`, `p5.Vector` — the vocabulary of generative art is part of the core API, not an add-on.
3. **Creative-coding community dominance** — tutorials, communities (The Coding Train, OpenProcessing), and educational curricula are built around p5. Hiring/sharing/forking all assume p5 as the medium.
4. **v2.x JS shaders (`p5.strands`)** — authoring GPU shaders without GLSL is unique in this dossier. It lowers the shader barrier to the same level as the rest of the API.
5. **OKLCH / HDR color modes (v2.x)** — first-class perceptual color space support for generative color work; not available in PixiJS or Three.js natively.
6. **No build toolchain required** — a `<script src="p5.min.js">` tag and a bare JS file is a complete development environment. The p5.js Editor makes this even simpler.
