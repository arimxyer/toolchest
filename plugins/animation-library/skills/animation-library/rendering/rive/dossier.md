---
name: rive
description: Designer-authored interactive animations with state machines, driven at runtime via WASM — not a code-only library.
---
# Rive

## When to use

- You need **interactive animations** (hover, tap, game-loop states) that designers author visually without writing code.
- You want **state machines** to drive UI feedback (loading spinners, progress, character reactions) with tight runtime integration.
- You are building **games, onboarding flows, or branded hero sections** where animation complexity exceeds what CSS keyframes can express.
- You need cross-platform consistency: the same `.riv` file runs on web (Canvas/WebGL2), iOS, Android, Flutter, Unity, and Unreal.
- You want **data binding** to connect animation properties directly to runtime values without imperative input wrangling.

## When NOT to use

- Your animations are **playback-only** (no interactivity, no branching) — Lottie is lighter and avoids the 500KB+ WASM cost.
- Your team has no dedicated designer; `.riv` files require the Rive editor to create — there is no code path to author animations.
- Bundle weight is a hard constraint (mobile web, low-end devices) — `@rive-app/canvas` ships 1.7 MB uncompressed / 567 KB brotli-9.
- You need **server-side rendering** of animation frames or static thumbnails — the runtime is browser/native only.
- Your animations are pure CSS transitions or scroll-driven effects — tailwindcss-animate / WAAPI are far lighter.

## Quick facts

| Field | Value |
|---|---|
| Version researched | `@rive-app/canvas` 2.37.3 (2026-04-20) / `@rive-app/react-canvas` 4.28.1 (2026-04-17) |
| Runtime license (SPDX) | MIT — all official runtimes (rive-wasm, rive-react, iOS, Android, Flutter, Unity) |
| Editor license / cost | Proprietary SaaS — Free tier (3 files, no commercial export); Cadet $9/seat/mo (commercial use); Voyager $32/seat/mo; Enterprise $120/seat/mo |
| Framework support | Vanilla JS, React, React Native (Nitro), Flutter, iOS (Swift), Android (Compose), Unity, Unreal, Webflow, WordPress |
| Bundle size (brotli-9, per Rive docs) | `canvas-lite`: 222 KB / `canvas`: 567 KB / `webgl2`: 648 KB — WASM dominates; gzip figure not separately published by Rive |
| Runtime | Canvas 2D + WASM (`@rive-app/canvas`); Rive Renderer via WebGL2 (`@rive-app/webgl2`); CSS-only: no |

## See also

- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.tsx)
