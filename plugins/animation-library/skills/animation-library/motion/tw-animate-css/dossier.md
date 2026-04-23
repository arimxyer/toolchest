---
name: tw-animate-css
description: CSS-only Tailwind v4 drop-in for tailwindcss-animate; compose enter/exit animations via utility classes, no JS plugin.
---
# tw-animate-css

## When to use
- You are on Tailwind CSS v4 and need animate-in/animate-out utilities without a JS plugin.
- Migrating a shadcn/ui project from Tailwind v3 to v4 — this is the official replacement for `tailwindcss-animate`.
- You want pure-CSS entrance/exit animations that compose freely (fade + slide + zoom) using standard Tailwind duration/delay/ease classes.
- Building with Radix UI, BitsUI, Reka, or Kobalte where accordion/collapsible heights are provided as CSS custom properties.
- You need zero JavaScript runtime overhead; the library ships only CSS.

## When NOT to use
- You are still on Tailwind CSS v3 — use `tailwindcss-animate` instead.
- You need physics-based, spring, or keyframe-timeline animations — reach for Motion, React Spring, or GSAP.
- You need scroll-linked, gesture-driven, or orchestrated multi-step sequences — the library has no JS layer.
- You want a full animation system with staggers, callbacks, or timeline scrubbing — this is CSS-class composition only.

## Quick facts
| Field | Value |
|---|---|
| Version researched | 1.4.0 (released 2025-09-24) |
| License | MIT — no commercial restrictions |
| Framework support | Tailwind CSS v4+ (CSS-first, framework-agnostic — React, Vue, Svelte, plain HTML all work) |
| Bundle size | CSS-only; tree-shaken by Tailwind v4 — unused utilities excluded from final CSS. Raw source: ~92.8% CSS, total repo size small. Exact gzipped size: unknown (bundlephobia does not apply to CSS-only packages meaningfully) |
| Runtime | None — pure CSS; zero JS at runtime |

## See also
- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.html)
