---
name: tailwindcss-motion
description: Tailwind CSS plugin for declarative CSS-only animations via utility classes; zero JS runtime, preset + composable modifiers.
---
# tailwindcss-motion

## When to use

- You already use Tailwind CSS and want animations without adding a JS animation runtime.
- You need simple entrance/exit/loop animations (fade, slide, bounce, blur, etc.) applied directly in markup.
- You want `prefers-reduced-motion` handled automatically with no extra code.
- You need a visual in-browser animator (rombo.co) to prototype motion and export Tailwind classes.
- You're prototyping or shipping a marketing/landing page where preset polish matters more than timeline control.

## When NOT to use

- You need sequenced, timeline-driven, or scroll-linked animations (use GSAP or motion).
- You need physics-based spring animations with runtime control (use react-spring or motion).
- You need SVG path animation, canvas, or WebGL (use GSAP, anime, or react-three-fiber).
- You are not using Tailwind CSS — the library is entirely Tailwind-plugin-scoped.
- You need fine-grained JS control (pause/reverse/seek programmatically at runtime without adding custom state).

## Quick facts

| Field | Value |
|---|---|
| Version researched | 1.1.1 (released 2024-06-10) |
| License (SPDX) | MIT |
| Commercial terms | Plugin OSS/free. Rombo visual toolbox: Free tier (presets only), Pro $19/mo (custom animation creation + saving), Team (custom pricing). |
| Framework support | Tailwind CSS >=3.0.0; framework-agnostic (works with any HTML/React/Vue/Svelte etc.) |
| Bundle size | npm unpacked: ~457 KB (source + types); runtime cost = 0 JS bytes; CSS output size depends on which utilities Tailwind purges |
| Runtime | Pure CSS (`@keyframes` + CSS custom properties). No JS at runtime. |
| Tailwind v4 | Initial v4 support merged (Dec 2024, issue #8 closed); several bug reports still open as of 2026-04 |

## See also

- [Overview](references/overview.md)
- [API Reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.html)
