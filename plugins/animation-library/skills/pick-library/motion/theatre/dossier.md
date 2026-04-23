---
name: theatre
description: Visual keyframe editor + JSON-state runtime; pick when designers need to tune motion live in a 3D/canvas scene and ship the result as code.
---
# Theatre.js

## When to use

- You are building a **3D web experience with React Three Fiber** and need to keyframe camera paths, mesh positions, or material values visually — `@theatre/r3f` provides first-party integration.
- The animation is **long-form and deliberate** (product hero, interactive narrative, scrollytelling) where designers and developers iterate on timing together in the browser.
- You need **audio-synchronized animation** — `sequence.attachAudio()` locks an `AudioBuffer` to the playhead clock with frame accuracy; no other library in this dossier offers this natively.
- You want **version-controlled animation state** — keyframes export to JSON, live next to source, and replay deterministically via `@theatre/core` without the editor present.
- You are building a **vanilla JS / non-React** animation that needs a visual scrubbing workflow; Theatre.js is renderer-agnostic and calls your callbacks with interpolated values.

## When NOT to use

- You need **micro-interactions or state-driven transitions** (hover, focus, route change) — use motion (Framer Motion) or react-spring instead.
- Your project cannot accept a library with **~20 months of public inactivity** (last npm publish May 2024; 1.0 in a private repo with no public timeline as of April 2026).
- Keyframes must be **generated programmatically** (data-driven bars, N entities) — Theatre has no public write API for keyframes; all authoring goes through the Studio GUI.
- You need **video export** — use Remotion; Theatre.js is for live browser playback only.
- You are building a **pure CSS / Tailwind animation** — Theatre.js requires JS and a runtime; tailwindcss-animate or tailwindcss-motion cost nothing at runtime.

## Quick facts

| Field | Value |
|---|---|
| Version researched | `@theatre/core` 0.7.2 / `@theatre/studio` 0.7.2 — both published 2024-05-19 |
| License (SPDX) | `@theatre/core`: Apache-2.0 (free, permissive). `@theatre/studio`: AGPL-3.0 (dev-only; do not ship to users). |
| Framework support | Vanilla JS, React (via `@theatre/r3f` for Three.js/WebGL), any renderer via `onValuesChange` callback |
| Bundle size | ~20 KiB gzipped for `@theatre/core` (self-reported in package readme); studio excluded from production builds |
| Runtime | Framework-agnostic value producer. No DOM/SVG/CSS ownership. `@theatre/r3f` targets WebGL via Three.js. |

## See also

- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators vs. siblings](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.ts)
