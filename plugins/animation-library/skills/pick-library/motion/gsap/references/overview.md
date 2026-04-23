# GSAP — Overview

## What it is

GSAP (GreenSock Animation Platform) is an imperative JavaScript animation engine. It interpolates any numeric CSS property, SVG attribute, or plain JS object property across time, with timeline sequencing, easing curves, and playback control (play, pause, reverse, seek, timeScale).

Originally a for-profit library by GreenSock (Jack Doyle), GSAP was acquired by Webflow in 2024. As of v3.13.0 (April 2025), all plugins — including the formerly paid Club GSAP plugins — are free for all use.

## Architecture

- **Tween** — atomic animation unit: a target, property map, duration, ease, and optional callbacks.
- **Timeline** — ordered container of tweens and nested timelines. Position parameter syntax controls overlap and gaps precisely.
- **Ticker** — internal RAF loop (`gsap.ticker`); all tweens subscribe to it. Supports lag smoothing and manual fps cap.
- **Plugin system** — plugins register themselves with GSAP core (`gsap.registerPlugin()`). Tree-shaking works when plugins are not imported.
- **Context** (`gsap.context`) — scoped batch for cleanup; used in framework component lifecycle hooks.

## Plugin ecosystem (all now free)

| Plugin | Purpose |
|---|---|
| ScrollTrigger | Scroll-driven animations, pinning, scrubbing, snapping |
| SplitText | Per-char / per-word / per-line text splitting for reveal animations |
| MorphSVGPlugin | SVG shape-to-shape morphing |
| DrawSVGPlugin | SVG stroke draw-on effect |
| MotionPathPlugin | Animate element along an SVG path |
| Flip | FLIP layout transition technique |
| ScrollSmoother | Smooth-scroll wrapper, works with ScrollTrigger |
| Observer | Unified input event handler (wheel, touch, pointer) |
| Draggable | Drag-and-drop with momentum, snap, bounds |
| CustomEase / CustomBounce / CustomWiggle | Arbitrary SVG-path eases |
| EasePack | Extended ease families (rough, slow, expoScale) |

## Version history highlights

| Version | Date | Change |
|---|---|---|
| 3.13.0 | 2025-04-30 | All plugins free; SplitText rewrite (autoSplit, mask, deepSlice) |
| 3.14.0 | 2025-12-08 | MorphSVG "smooth" morphing feature |
| 3.15.0 | 2026-04-13 | `easeReverse` (directional easing); `yoyoEase` deprecated |

## Runtime targets

DOM, SVG, Canvas (via plain JS object + `onUpdate`), WebGL uniforms, any numeric JS property. No server-side rendering output — browser runtime only.

## Framework integration

- **React** — official `@gsap/react` package provides `useGSAP()` hook (cleanup-safe, strict-mode compatible).
- **Vue / Angular / Nuxt / Next.js** — use `gsap.context()` inside framework lifecycle hooks; official starter templates on StackBlitz.
- **Svelte** — no official package; same `gsap.context()` pattern works in `onMount` / `onDestroy`.
