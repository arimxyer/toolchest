# @use-gesture/react — Overview

## What it is

`@use-gesture/react` is a gesture-recognition layer for React. It normalizes browser pointer, touch, mouse, scroll, and wheel events into a unified state object enriched with kinematic data: velocity, delta, distance, direction, offset, swipe classification, and tap detection. It does not animate anything — it feeds gesture state to whatever animation layer you choose.

## Ecosystem position

use-gesture is a first-class member of the **pmndrs** (Poimandres) ecosystem alongside `react-spring` and `react-three-fiber`. The canonical pmndrs animation stack is:

```
@use-gesture/react  →  gesture state
react-spring        →  physics-based spring animation
react-three-fiber   →  3D rendering (optional)
```

All three are designed to work together: gesture handlers run outside React's render cycle and push state directly into spring APIs, achieving 60 fps updates with zero React re-renders.

## Adoption

- **~4.19 M weekly npm downloads** as of 2026-04-22 (verified via npm downloads API)
- Deep penetration in the pmndrs community; widely cited in react-spring and r3f tutorials

## Maintenance status

Last release: **v10.3.1** (2024-03-22). The release cadence has slowed substantially since the v10 rewrite. The library is best characterized as **stable / complete** — the API surface is mature, breaking changes are not anticipated, and the underlying pointer-events model it wraps is itself stable. It is not abandoned. However, open issues and PRs accumulate slowly; do not expect rapid response to edge-case bugs.

## Packages

| Package | Use case |
|---|---|
| `@use-gesture/react` | React hooks |
| `@use-gesture/vanilla` | Framework-agnostic class-based API sharing the same `@use-gesture/core` engine |
