---
name: popmotion
description: Frozen low-level JS physics engine — absorbed into Motion; pick only when maintaining legacy framer-motion v7 code.
---
# Popmotion

## When to use

- Maintaining code that depends on framer-motion ≤ v7.6.17, which required popmotion as a peer engine.
- You need a headless numeric/color/string animation primitive with no DOM coupling and no framework dependency.
- You want a tiny (~6.8 kB gzipped) self-contained spring or keyframe engine to drive a Canvas, WebGL, or custom renderer completely yourself.
- Porting or studying how motion-dom's animation generators work; popmotion v11 is the frozen ancestor of that code.
- Historical projects or embedded contexts where upgrading to motion is not feasible.

## When NOT to use

- New projects: use `motion` (fka framer-motion) — same author, complete API superset, actively maintained.
- You need DOM/CSS/SVG bindings: motion provides `animate(element, keyframes, options)`; popmotion has no DOM layer.
- You need React integration, layout animations, or gesture handling: none of those exist in popmotion.
- You need active bug fixes or security patches: last npm publish was 2022-08-15 — no active maintenance.
- You expect timeline, sequencing, or stagger primitives: removed from popmotion in v9+; use motion or anime v4.

## Quick facts

| Field | Value |
|---|---|
| Version researched | 11.0.5 |
| Last publish date | 2022-08-15 |
| License | MIT (SPDX: MIT) — free, no commercial terms |
| Framework support | Framework-agnostic (no React, Vue, or DOM bindings) |
| Bundle size (gzipped) | 6.8 kB (bundlephobia, whole package) |
| Bundle size (unminified) | ~304 kB unpacked source |
| Runtime | Pure JS numeric/color/string values; no DOM, SVG, Canvas, or CSS coupling |
| Maintenance status | Dormant / superseded by Motion (motion-dom) — not deprecated in npm, not archived on GitHub, but frozen since Aug 2022 |
| Weekly npm downloads | ~1.98 M (2026-04-22; nearly all transitive via pinned framer-motion ≤ v7) |

## See also

- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators vs. siblings](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.js)
