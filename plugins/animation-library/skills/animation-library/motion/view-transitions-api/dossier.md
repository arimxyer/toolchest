---
name: view-transitions-api
description: Use when you need cross-fade or shared-element transitions between views natively, with no JS library — SPA or MPA, CSS-first.
---
# View Transitions API

## When to use
- Building SPA route transitions (React, Vue, etc.) and want zero-bundle animated page changes.
- MPA / full-page navigations where you want shared-element "hero" continuity between pages (Chrome/Safari only as of 2026).
- Replacing JS-driven layout animations (e.g. swapping list items, filtering grids) with browser-native morphs via `view-transition-name`.
- Enhancing progressive-enhancement projects: VTA degrades gracefully when unsupported — no flash, just instant swap.
- When you want CSS `@keyframes` to drive transition animations without any animation library dependency.

## When NOT to use
- Firefox users are a significant audience for cross-document (MPA) transitions — Firefox has no Level 2 support as of April 2026.
- Complex timeline-sequenced animations (stagger, scroll-scrubbing, physics): reach for GSAP, motion, or WAAPI instead.
- Spring-physics or gesture-driven drag interactions — VTA has no spring model or input-tracking.
- React "layout" animations where element position shifts continuously in the same frame tree — Framer Motion's `layoutId` is more ergonomic.
- Animations targeting SVG internals or canvas — VTA only snapshots DOM elements as bitmaps.

## Quick facts
- **Spec status:** Level 1 (same-document) — W3C Working Draft. Level 2 (cross-document + scoped) — CSSWG Editor's Draft (not yet formal WD/CR). Spec: https://drafts.csswg.org/css-view-transitions-1/ and https://drafts.csswg.org/css-view-transitions-2/
- **License:** Web standard — not applicable (no SPDX identifier; browser implementation licenses vary)
- **Browser support (same-document / Level 1):** Chrome 111+, Edge 111+, Opera 97+, Safari 18.0+, Firefox 144+, Firefox Android 150+, Samsung Internet 22+. ~91% global coverage. Baseline (widely available).
- **Browser support (cross-document / Level 2):** Chrome 126+, Edge 126+, Opera 112+, Safari 18.2+. Firefox: NOT supported (tracking bug #1860854, open as of April 2026). ~87% global coverage. NOT Baseline — "Limited availability."
- **Bundle size:** n/a — browser-native API
- **Runtime:** Browser-native. Engine takes two DOM snapshots (old/new), composites them as `::view-transition-old` / `::view-transition-new` pseudo-elements, and drives the cross-fade (or custom `@keyframes`) on the GPU.

## See also
- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators vs. sibling libraries](references/differentiators.md)
- [Drawbacks & gotchas](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.html)
