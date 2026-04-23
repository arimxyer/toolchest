# Popmotion — Overview

## What it is

Popmotion is a low-level, framework-agnostic JavaScript animation library focused on animating numbers, colors, and complex strings. It provides callback-driven animation generators (keyframes, spring, decay/inertia) and a library of math utilities for interpolation, mixing, and easing.

Version 11 is the final published release. The library has not received a new npm publish since 2022-08-15.

## History and absorption status

- **~2019**: Framer BV acquired Popmotion (and its author Matt Perry) to power a simple React animation API. The result was Framer Motion, which took popmotion as an explicit npm dependency.
- **Through framer-motion v7.6.17** (published 2022-12-01): `popmotion@^11.0.5` appeared in framer-motion's `dependencies`.
- **framer-motion v7.6.18** (published 2022-12-02): popmotion removed from dependencies. Its animation generators were inlined/vendored into the framer-motion package itself.
- **November 2024**: Framer Motion became independent of Framer BV, rebranded as `motion`. The inlined animation core now lives in the `motion-dom` and `motion-utils` packages. popmotion plays no role.
- **Today (2026-04-22)**: The standalone `popmotion` npm package still exists at v11.0.5. It is **not npm-deprecated**, **not GitHub-archived**, but completely frozen — no commits since 2024-03-12 (administrative/CI only), no npm publishes since Aug 2022.

## Current standing

| Signal | Status |
|---|---|
| npm `deprecated` flag | Not set |
| GitHub `archived` | False |
| Last npm publish | 2022-08-15 (v11.0.5) |
| Last repo push | 2024-03-12 (non-feature) |
| Weekly downloads | ~1.98 M (transitive; old framer-motion pins drive the count) |
| Open issues | 51 |

## What it provides (v11)

- `animate()`: unified entry point for keyframe, spring, or decay animations on a single numeric or color value. Callback-driven, no DOM side effects.
- `inertia()`: momentum deceleration with optional boundary springs.
- Generators (`spring`, `keyframes`, `decay`): lower-level iterators consumed by `animate()` or driven manually.
- Easing functions and factories.
- Math utilities: `interpolate`, `mix`, `mixColor`, `mixComplex`, `clamp`, `snap`, `wrap`, `progress`, `pipe`, and geometry helpers.

## What it does NOT provide (removed in v9+)

- DOM, CSS, or SVG bindings.
- React, Vue, or Svelte integration.
- Timeline, sequencing, or stagger primitives.
- Scroll, pointer, or gesture input handlers.
- Multi-value composite animations.
