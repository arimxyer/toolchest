# Anime.js v4 — Drawbacks

## Browser-only

No SSR rendering output. Cannot animate on the server or generate video frames (use Remotion for that). React Server Components cannot use Anime.js — all usage must be in client components.

## V3-to-V4 migration is breaking

The v4 API is completely incompatible with v3: no default export, no global `anime()` call, module-level architecture. Any existing v3 codebase requires a full rewrite of animation code. Many third-party tutorials and Stack Overflow answers still document the v3 API, causing confusion.

## No scroll-linked animation primitive

No built-in equivalent to GSAP ScrollTrigger or CSS scroll-driven animations. Scroll-linked sequencing requires manual scroll event wiring or combining with Intersection Observer.

## No layout animation

Anime.js does not track or animate DOM layout changes (element resize, reflow, grid rearrangement). For entering/exiting elements or layout transitions, use motion, auto-animate, or View Transitions API.

## No gesture-physics integration

The Draggable module provides drag behavior, but there is no physics-based fling/momentum or spring-linked gesture system comparable to motion's drag with inertia.

## JS engine is main-thread only

The default `animate()` runs on the main thread via `requestAnimationFrame`. Only `waapi.animate()` gets hardware compositing. For heavy JS-object or Canvas animations, there is no worker thread option.

## Ecosystem smaller than GSAP

GSAP has ScrollTrigger, Flip, DrawSVG, MorphSVG, MotionPath, and more battle-tested plugins. Anime.js ships SVG morphing and motion path natively, but the ecosystem depth is narrower.
