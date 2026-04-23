# Animation Library Plugin

Decision-support dossier for picking a JS/TS animation or rendering library. 30 libraries researched across two buckets — **motion** (16) and **rendering** (14) — with a cross-library comparison matrix and per-library dossiers.

## What it does

When you're choosing, comparing, or scaffolding an animation / rendering layer for a web project, this skill gives your AI agent:

- **Cross-library comparison matrix** — bundle sizes, licenses, framework support, scroll / timeline / physics / SVG / canvas / designer-asset capabilities side by side.
- **Per-library dossiers** — when to use, when NOT to use, quick facts, and "see also" cross-references.
- **Deeper references** — `overview.md`, `api.md`, `differentiators.md`, `drawbacks.md`, and verified `sources.md` for each library.
- **Minimal runnable examples** under each library's `assets/`.
- **Narrative synthesis** — overlap clusters, curated stack recommendations, and cluster trade-off analysis.

## Covered libraries

**Motion (16):** animate.css, Anime.js, AutoAnimate, GSAP, Lenis, Motion (Framer), Popmotion, react-spring, react-transition-group, tailwindcss-animate, tailwindcss-motion, Theatre.js, tw-animate-css, use-gesture, View Transitions API, WAAPI.

**Rendering (14):** Babylon.js, Fabric.js, Konva, Lottie, p5.js, Phaser, PixiJS, @pixi/react, react-konva, react-three-fiber, react-three-rapier, Remotion, Rive, three.js.

## Usage

The skill triggers automatically when you're picking an animation or rendering library, or invoke it directly:

```
/animation-library:animation-library what should I use for scroll-driven animations with React?
```

## Freshness

Dossiers are a snapshot researched in April 2026. Each library's `references/sources.md` links to primary sources — re-verify there if a figure needs to be current.
