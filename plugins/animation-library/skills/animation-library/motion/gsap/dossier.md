---
name: gsap
description: Imperative JS animation engine for precise, sequenced, scroll-driven, or SVG/canvas animations where timing control matters.
---
# GSAP

## When to use

- You need a multi-step, sequenced animation timeline where individual clips must overlap, pause, or reverse on demand.
- Scroll-driven animations with ScrollTrigger: pin, scrub, snap, progress-tied motion.
- SVG animations — stroke drawing (DrawSVG), shape morphing (MorphSVG), motion-path following.
- Text reveal / per-character or per-line animations via SplitText.
- Animating non-DOM targets: canvas state objects, Three.js uniforms, arbitrary JS objects with `onUpdate`.
- FLIP layout transitions (`Flip` plugin) where DOM structure changes between states.

## When NOT to use

- Simple enter/exit transitions inside a React component tree — motion (Framer Motion) or `@formkit/auto-animate` carry far less setup overhead.
- Pure CSS-class-toggle animations — tailwindcss-animate or tailwindcss-motion handle those without a JS runtime.
- You need a design-tool / keyframe GUI — use Theatre.js, which ships an editor UI; GSAP is code-only.
- Your bundle budget is very tight and the animation is a single fade — WAAPI (`element.animate()`) is native and zero-KB.
- Declarative component-state-driven physics springs — react-spring models spring physics natively; GSAP eases are curve-based, not physics-based.

## Quick facts

| Field | Value |
|---|---|
| Version researched | 3.15.0 (released 2026-04-13) |
| License SPDX + cost | Custom Webflow license (non-SPDX). Free for all websites, web apps, and commercial projects. Restricted only for tools that compete directly with Webflow's visual animation builder. All formerly paid plugins (SplitText, MorphSVG, ScrollSmoother, etc.) are now free. |
| Framework support | Vanilla JS, React (`@gsap/react` + `useGSAP()` hook), Vue, Angular, Next.js, Nuxt 3, Svelte — officially documented. |
| Bundle size (gzipped) | Core: ~26.6 kB gz / ~71.2 kB min. ScrollTrigger adds ~18.3 kB gz. Full npm package: 6.0 MB unpacked (all plugins, ESM + UMD + types). |
| Runtime | DOM, SVG, Canvas (via JS object animation + `onUpdate`), WebGL uniforms, any numeric JS object property. Browser-only (no SSR rendering target). |

## See also

- [Overview](references/overview.md)
- [API Reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.js)
