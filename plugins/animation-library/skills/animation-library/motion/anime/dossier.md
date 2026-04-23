---
name: anime
description: Imperative JS animation engine for CSS/SVG/DOM/objects with timelines, stagger, and optional WAAPI backend; best for complex sequenced UI motion.
---
# Anime.js

## When to use

- Building orchestrated multi-step UI animations (entrance sequences, dashboard transitions) where you need precise timeline control and staggered delays across many elements.
- Animating SVG paths, morphs, and stroke-dashoffset effects that CSS-only tools can't express cleanly.
- Vanilla JS or any framework (no React dependency) — animating DOM elements directly without a component model.
- Splitting text into chars/words/lines and animating each piece individually (built-in `splitText()`).
- Need a lightweight WAAPI-accelerated path (3 KB submodule) for simple animations with hardware compositing, while keeping the full API available for complex cases.
- Animating non-DOM targets: plain JS objects, arrays, Canvas state — anything with numeric properties.

## When NOT to use

- React-native gesture/spring physics animations where layout-reactive physics matter — use react-spring or motion instead.
- Layout animations (element reflow/resize, shared-element transitions) — motion's `layout` prop or View Transitions API handle this; Anime.js does not.
- You need visual timelines, an animation editor, or non-developer authoring workflow — use Theatre.js or Rive.
- The animation is purely decorative and simple (fade-in, slide-up) — Tailwind CSS utilities or `tailwindcss-motion` add zero JS weight.
- Server-rendered animation (Remotion for video, Lottie for pre-rendered sequences from designers).

## Quick facts

| Field | Value |
|---|---|
| Version researched | 4.3.6 (released 2026-02-13) |
| License | MIT (SPDX: MIT) — free, no commercial restrictions |
| Framework support | Framework-agnostic; works in any environment with DOM access (React, Vue, Svelte, vanilla, etc.) |
| Bundle size (gzipped) | ~36 KB (full ESM bundle, minified+gzip); ~3 KB for `waapi` submodule alone; tree-shakeable per subpath |
| Runtime | DOM, SVG, CSS properties, JS objects — browser-only (no SSR rendering target) |

## See also

- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.js)
