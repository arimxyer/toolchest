---
name: use-gesture
description: Add rich drag/pinch/scroll/wheel/hover gesture tracking to React; pairs with react-spring or Motion to drive animations without re-renders.
---
# @use-gesture/react

## When to use

- You need gesture-driven animations — drag-to-dismiss, pinch-to-zoom, swipe — and want kinematic data (velocity, delta, direction) your animation library can consume directly.
- You are already using react-spring or Motion and need richer pointer state than those libraries expose natively.
- You are building for react-three-fiber (pmndrs sibling) and need pointer/drag gestures in 3D space.
- You need multi-gesture composition: simultaneous drag + pinch + scroll handled in one `useGesture` call.
- You need pointer-lock drag, keyboard-driven drag (`pointer.keys`), or elastic rubber-band bounds out of the box.

## When NOT to use

- You only need simple CSS hover or click states — plain CSS or Motion's `whileHover`/`whileTap` are sufficient.
- You want the animation library to own the drag interaction end-to-end — Motion's `drag` prop handles constrained dragging without any extra library.
- You are not using React and do not want to switch to `@use-gesture/vanilla`.
- Your gesture needs are limited to scroll-triggered entrance animations — Intersection Observer or lenis is a better fit.
- You need gesture recognition beyond pointer/touch/wheel (e.g. voice or gamepad input).

## Quick facts

| Field | Value |
|---|---|
| Current version | 10.3.1 (released 2024-03-22) |
| License | MIT |
| Framework support | React ≥ 16.8 (`@use-gesture/react`); framework-agnostic (`@use-gesture/vanilla`) |
| Bundle size (gzip / minified) | 8.88 KB gzip / 28.6 KB min (bundlephobia, 2026-04-22) |
| Runtime | React hooks / Pointer Events API |

## See also

- [Overview](./references/overview.md)
- [API reference](./references/api.md)
- [Differentiators](./references/differentiators.md)
- [Drawbacks](./references/drawbacks.md)
- [Sources](./references/sources.md)
- [Minimal example](./assets/examples/minimal.tsx)
