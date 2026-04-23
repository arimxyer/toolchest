---
name: motion
description: Declarative React/Vue/vanilla-JS animation library with spring physics, layout animations, gesture support, and WAAPI hybrid engine.
---
# Motion

## When to use

- You need **layout animations** that auto-animate DOM reflows — list reordering, accordion open/close, card expansion — without measuring elements manually.
- You want **gesture-driven animations** (drag, hover, tap, focus) with a declarative props API and no imperative bookkeeping.
- Your project requires **scroll-linked effects** (parallax, progress bars) that can offload to GPU via ScrollTimeline when the browser supports it.
- You're building **shared-element transitions** (hero animations between routes or states) using `layoutId` without a separate routing abstraction.
- You need **exit animations** for conditionally rendered React components (modals, toasts) via `<AnimatePresence>`.
- You want a **hybrid WAAPI + JS engine**: hardware-accelerated paths for supported properties, JS fallback for everything else, with no configuration.

## When NOT to use

- **CSS-only hover/color effects**: a simple Tailwind class or CSS transition is zero-JS and faster; Motion is overbuilt for it.
- **Timeline-sequenced video-grade animation**: Theatre.js or Remotion own that space — they provide a scrub-able timeline editor and frame-accurate sequencing Motion lacks.
- **High-frequency canvas or WebGL animation**: react-three-fiber / drei operate in the GPU render loop; Motion targets the DOM/SVG layer.
- **No-framework or legacy jQuery sites**: GSAP or the bare WAAPI are better fits; Motion's DX is built around a component model.
- **Bundle-sensitive pages where animation is minimal**: even with LazyMotion + `m.*` the floor is ~4.6 kB gzipped; WAAPI or css-only approaches cost nothing.

## Quick facts

| Field | Value |
|---|---|
| Version researched | 12.38.0 (released 2026-03-17) |
| License (SPDX) | MIT — core library is free. Motion+ add-on ($399 one-time) unlocks premium examples, components, and IDE tooling; not required for production use. |
| Framework support | React 18/19, Vue (including Nuxt auto-import), vanilla JS (`motion/dom`, `motion/mini`) |
| Bundle size gzipped | `motion.div` path: ~34 kB gzipped (no tree-shaking). With `m.*` + `LazyMotion` + `domAnimation`: ~4.6 kB initial + ~15 kB deferred. Full package uncompressed: ~615 kB. (Source: motion.dev/docs/react-reduce-bundle-size) |
| Runtime | DOM + SVG. Hybrid engine: WAAPI (hardware-accelerated) where supported, JS fallback otherwise. ScrollTimeline API used for scroll-linked animations. No Canvas or WebGL. |

## See also

- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators vs siblings](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.tsx)
