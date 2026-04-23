---
name: tailwindcss-animate
description: Tailwind v3 plugin adding animate-in/out, fade, zoom, slide, and timing utilities via class composition. Use for Tailwind v3 only.
---
# tailwindcss-animate

## When to use

- You are on **Tailwind CSS v3** and want declarative enter/exit animations without writing keyframe CSS by hand.
- You need **shadcn/ui**-compatible animation classes on a Tailwind v3 project (this is the plugin shadcn/ui used before March 2025).
- You want to compose animation variants purely in HTML via class names (`animate-in fade-in zoom-in-50 duration-300`) without JS state.
- You are building UI components (modals, toasts, dropdowns) that need standardized enter/exit transitions driven only by adding/removing classes.
- You are maintaining an existing Tailwind v3 codebase and adding animation to it with zero dependency footprint.

## When NOT to use

- You are on **Tailwind CSS v4** — the plugin's peer dependency is `tailwindcss >=3.0.0`, v4 support is an open unmerged PR as of 2026-04-22. Use `tw-animate-css` instead.
- You need **physics-based or spring animations** — this is keyframe/CSS-transition-only.
- You need **scroll-triggered, timeline-controlled, or sequenced animations** — use GSAP, Motion, or WAAPI instead.
- You need **SVG path drawing, morphing, or canvas animation** — out of scope entirely.
- You want **active maintenance or a roadmap** — the repo has had no commits or releases since August 2023.

## Quick facts

| Field | Value |
|---|---|
| Version researched | 1.0.7 (released 2023-08-28) |
| License (SPDX) + cost | MIT / free |
| Framework support | Framework-agnostic Tailwind plugin; works wherever Tailwind v3 works |
| Bundle size | Plugin JS: ~4.9 KB unpacked (not shipped to browser); generates CSS at build time via Tailwind |
| Runtime | CSS-only at runtime (zero JS) |

## See also

- [references/overview.md](references/overview.md)
- [references/api.md](references/api.md)
- [references/differentiators.md](references/differentiators.md)
- [references/drawbacks.md](references/drawbacks.md)
- [references/sources.md](references/sources.md)
- [assets/examples/minimal.html](assets/examples/minimal.html)
