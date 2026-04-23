# Lottie — Overview

## What it is

Lottie is a JSON-based animation format (originally from Airbnb / bodymovin After Effects plugin) plus runtime libraries that render those animations on web, mobile, and desktop. The ecosystem has effectively forked into two active paths:

1. **lottie-web** (Airbnb) — the original, battle-tested JS renderer. Renders via SVG DOM, Canvas 2D, or HTML. Mature, widely adopted (~5.3M weekly npm downloads), but in maintenance-only mode since ~2023.
2. **@lottiefiles/dotlottie-web** (LottieFiles) — the next-generation runtime. Renders via WebAssembly (ThorVG engine) to Canvas 2D. Actively developed (weekly releases). Adds: `.lottie` binary format, state machines, theming/slots, first-party framework wrappers, Web Worker support.

## Ecosystem split

The `.lottie` format is a ZIP archive containing one or more Lottie JSON animations plus assets (images, fonts). It replaces the raw `.json` format with smaller file sizes and multi-animation support. `dotlottie-web` plays both `.lottie` and `.json`; `lottie-web` plays `.json` only.

LottieFiles operates the largest Lottie asset marketplace and tooling platform. Their runtime (`dotlottie-web`) is the strategic direction for new features.

## Primary use-case fit

- Designer-to-runtime workflow: Animator exports from After Effects via LottieFiles plugin → `.lottie` file → ship to web with zero re-implementation.
- Decorative / illustrative animations: loaders, empty states, onboarding flows, success screens.
- Stateful / interactive animations (dotlottie only): hover states, click transitions defined by state machine JSON.

## Not a fit for

- Physics-driven gesture response (pre-baked timeline only).
- 3D / WebGL rendering.
- Programmatic animation of arbitrary DOM properties.

## Version snapshot (2026-04-22)

- `lottie-web`: **5.13.0** — released 2025-05-21
- `@lottiefiles/dotlottie-web`: **0.71.0** — released 2026-04-14
