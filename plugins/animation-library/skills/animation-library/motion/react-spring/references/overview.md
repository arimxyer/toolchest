# React Spring — Overview

**Version:** 10.0.3 (2024-09-18)  
**Repo:** https://github.com/pmndrs/react-spring  
**Homepage:** https://react-spring.dev  
**Part of:** Poimandres (pmndrs) ecosystem — alongside zustand, react-three-fiber, valtio, etc.

## Core model

react-spring treats animation as a physics simulation, not a time-based tween. Springs have no fixed duration; instead they carry `mass`, `tension`, and `friction` properties that determine how values settle. This makes interrupted animations feel natural — the spring picks up from its current velocity rather than restarting.

Both declarative (config-object) and imperative (function + `[values, api]`) call signatures are supported. The imperative API avoids triggering React re-renders on every animation frame by piping values directly to the DOM.

## Render targets

| Package | Target |
|---|---|
| `@react-spring/web` | HTML / SVG |
| `@react-spring/native` | React Native |
| `@react-spring/three` | react-three-fiber / Three.js |
| `@react-spring/konva` | Konva canvas |
| `@react-spring/zdog` | Zdog pseudo-3D |

## Primary hooks

- `useSpring` — single spring, one element
- `useSprings` — multiple independent springs, list items with individual configs
- `useTrail` — staggered chain: each item trails the previous
- `useTransition` — enter/leave/update states for conditional/list rendering
- `useChain` — sequence multiple spring refs with time offsets

## `animated` primitive

Wrap HTML/SVG elements with `animated.div`, `animated.span`, etc. Third-party components are wrapped with `animated(MyComponent)`. Values are passed directly to the DOM, bypassing React's reconciler for performance.

## Maintenance state

Active. The v10 major (supporting React 19) shipped May 2024; a patch release followed September 2024. Prior to v10, the v9 line received regular patches. The project has multiple contributors and is backed by the broader Poimandres collective. Release cadence has slowed from weekly patches (2021–2022 era) to periodic, stability-focused releases — appropriate for a mature library.
