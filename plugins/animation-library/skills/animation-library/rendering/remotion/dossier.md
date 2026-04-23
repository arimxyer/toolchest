---
name: remotion
description: React-based programmatic video renderer — write compositions as components, export MP4/WebM/GIF via Node.js + headless Chromium.
---
# Remotion

## When to use

- You need to generate video files (MP4, WebM, GIF) programmatically from data or templates.
- You want to build a "video-as-a-service" pipeline: user submits data, server renders and returns a download link.
- You need data-driven video: charts, subtitles, dynamic text overlays, per-user personalized clips.
- You're already in a React codebase and want to reuse components for both web UI and rendered video output.
- You need frame-accurate control over timing, easing, and asset composition (audio, video, images, SVG).

## When NOT to use

- You need interactive, in-browser animations triggered by user events (use WAAPI, Motion, or GSAP instead).
- Your target is a CSS transition or scroll-linked effect — Remotion never ships to the browser as an animation runtime.
- You need a lightweight dependency with no build infrastructure — Remotion requires Node.js, Webpack, and a Chromium binary.
- You want open-source / permissive licensing for a team of 4+ (requires a paid Company License).
- Low-latency or real-time output — rendering a single frame is CPU/memory heavy; unsuitable for on-demand < 1 s SLAs without pre-caching.

## Quick facts

| Field | Value |
|---|---|
| Version researched | 4.0.451 (npm, retrieved 2026-04-22) |
| License | Custom "Remotion License" (NOT OSS). Free: individuals + companies ≤ 3 employees. Paid: companies with 4+ employees must buy a Company License. See drawbacks.md for tier prices. |
| Framework support | React only (React 18+ recommended; compositions are React components) |
| Bundle size | Not a browser animation runtime. `@remotion/player` ships a React component for in-browser preview; bundle size not confirmed from primary source (bundlephobia.com was non-responsive). The core `remotion` + `@remotion/renderer` packages are Node.js-only and have no browser bundle. |
| Runtime | Server-side: Node.js + headless Chromium (via `@remotion/renderer`). Browser preview: `@remotion/player` React component renders frames via React + DOM/canvas. Cloud rendering: AWS Lambda (`@remotion/lambda`), Vercel (`@remotion/vercel`). |

## See also

- [Overview](references/overview.md)
- [API Reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.tsx)
