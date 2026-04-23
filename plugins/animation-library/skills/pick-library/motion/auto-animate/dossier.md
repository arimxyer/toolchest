---
name: auto-animate
description: Add animate-on-add/remove/reorder to any list or conditional UI with one line — no keyframe authoring required.
---
# AutoAnimate

## When to use

- Animating a list where items are added, removed, or reordered (todos, search results, filtered grids) and you want smooth transitions without hand-rolling keyframes.
- Conditional rendering — toggling a detail panel, error message, or loading skeleton where a simple fade/slide-in is all you need.
- Prototype-speed UI polish: attach `useAutoAnimate` to any parent container and get working animations immediately, deferring custom refinement.
- Vue or Angular codebases that want a directive-based zero-boilerplate approach (`v-auto-animate`, `AutoAnimateDirective`).
- Teams that need `prefers-reduced-motion` compliance by default without writing media-query guards manually.

## When NOT to use

- Coordinated, multi-element sequences or timeline-driven animations — use gsap or theatre.js instead.
- SVG morphing, canvas, or WebGL — AutoAnimate is DOM-only.
- Custom enter/exit curves beyond what a single `KeyframeEffect` can express without the plugin API adding significant complexity.
- Deeply nested child animations: only immediate children of the attached parent are animated; nesting requires multiple `autoAnimate` calls.
- Page/route transition animations — view-transitions-api or motion's layout animations are better fits.

## Quick facts

| Field | Value |
|---|---|
| Version researched | 0.9.0 (npm publish ~March 6 2025; active commits as of April 2026) |
| License | MIT — no commercial restrictions |
| Framework support | Vanilla JS, React, Vue, Nuxt, Solid, Preact, Angular, Svelte (via action) |
| Bundle size (gzipped) | ~3.2 KB gzipped / ~8.1 KB minified (source: bundlephobia, retrieved 2026-04-22) |
| Runtime | DOM (Web Animations API internally) |

## See also

- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.tsx)
