# Lenis — Overview

## What it is

Lenis is a lightweight smooth-scroll engine built by [@darkroom.engineering](https://github.com/darkroomengineering). It intercepts browser scroll events and re-renders scroll position via linear interpolation (lerp) on every animation frame, producing a momentum-like scroll feel. First published April 2023; current version 1.3.23 (released 2026-04-15). ~420 K weekly npm downloads as of April 2026.

The name is Latin for "smooth."

## Origin and motivation

Lenis was built to solve a WebGL/DOM synchronization problem: native browser scroll updates asynchronously, creating a timing mismatch between scroll position and WebGL renders that causes visual tearing in scroll-synced 3D scenes. The lerp-based approach gave Lenis deterministic scroll values at every RAF tick. Smooth scrolling itself was, per the authors' own MANIFESTO, "the happy mistake" — a side effect that became the marquee feature.

## Locomotive Scroll relationship (important)

Locomotive Scroll v5 (released late 2024 / stabilized 2025) is a **thin wrapper over Lenis**. It exposes Lenis directly as `lenisInstance` and passes configuration through a `lenisOptions` object. Locomotive Scroll is no longer a competing scroll engine — it is an IntersectionObserver-based parallax/class-trigger layer that delegates all scrolling to Lenis internally. Choosing Locomotive Scroll v5 means choosing Lenis plus ~9.4 kB gz of parallax infrastructure.

If you only need smooth scroll, use Lenis directly. If you need scroll-triggered CSS classes and parallax attributes (`data-scroll-speed`), consider Locomotive Scroll v5 as a pre-configured Lenis setup with extras.

## Architecture

- **No dependencies** — zero runtime npm deps; ships as pure ES module + UMD.
- **Event interception** — listens to `wheel` and (optionally) `touch` events on `eventsTarget` (default: `window`).
- **Lerp loop** — each RAF tick computes `animatedScroll += (targetScroll - animatedScroll) * lerp`; result is applied via `transform: translateY()` on `content` element, keeping the native scrollbar in sync via `window.scrollTo()` or equivalent.
- **Optional `autoRaf`** — set `autoRaf: true` to let Lenis own the RAF loop; otherwise call `lenis.raf(time)` manually (required for GSAP ticker integration).
- **Sub-packages** — `lenis/react`, `lenis/vue`, `lenis/nuxt`, `lenis/snap`, `lenis/framer` all ship from the same npm package.

## Community stack

The de facto standard combination for creative / agency / portfolio sites:

```
Lenis (smooth scroll) + GSAP ScrollTrigger (scroll animations) + React Three Fiber (WebGL)
```

GSAP and the Lenis team both document this integration officially. For Motion (Framer Motion) users, `useScroll` integrates via `frame.update` callbacks.

## Packages

| Sub-path | What it ships |
|---|---|
| `lenis` | Core vanilla class |
| `lenis/react` | `<ReactLenis>`, `useLenis()` hook |
| `lenis/vue` | `<VueLenis>`, `useLenis()` composable, global plugin |
| `lenis/nuxt` | Nuxt module (`modules: ['lenis/nuxt']`) |
| `lenis/snap` | CSS snap-equivalent snapping for Lenis |
| `lenis/framer` | No-code Framer plugin (lenis.framer.website) |
