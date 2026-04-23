---
name: animate-css
description: Drop-in CSS animation library via class names; zero JS, zero build step. Best for quick decorative effects on static or server-rendered HTML.
---
# animate.css

## When to use

- You need decorative enter/exit animations without any JavaScript or build tooling.
- The target is plain HTML, a CMS template, or a server-rendered page where adding JS runtime cost is not justified.
- You want a battle-tested, stable set of ~80 named keyframe animations with no upstream churn risk — the library is intentionally feature-complete.
- You are pairing with React Transition Group or a similar class-injection approach and want a ready-made keyframe vocabulary.
- Rapid prototyping where reaching for a CDN `<link>` is faster than any alternative.

## When NOT to use

- You need scroll-driven, physics-based, or sequenced/orchestrated animations — animate.css has none of these.
- You need to control timing programmatically (stagger, interrupt, reverse mid-play) — CSS class toggling is too coarse.
- Bundle size matters at the class level: you ship only the subset of keyframes you use — animate.css gives you all ~80 in one file.
- You are already using Tailwind CSS — tailwindcss-animate, tw-animate-css, or tailwindcss-motion provide first-class Tailwind integration with purgeable utilities.
- You need new animations or easings added: the project is feature-complete and has not released a new version since September 2020.

## Quick facts

| Field | Value |
|---|---|
| Current version | 4.1.1 (released 2020-09-07; feature-complete, no new releases expected) |
| License | Hippocratic License 2.1 (`Hippocratic-2.1`) — **not MIT**; the npm registry metadata shows MIT from an older publish but the repo package.json and LICENSE file are Hippocratic-2.1. Verify compliance if your organization has OSS policy constraints on non-permissive licenses. |
| Framework support | Framework-agnostic — pure CSS class names; works in any HTML context |
| Bundle size | ~72 KB minified / ~5 KB gzipped (animate.min.css via jsdelivr, measured 2026-04-22) |
| Runtime | CSS-only — keyframe declarations + utility custom-property overrides; zero JavaScript |

## See also

- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.html)
