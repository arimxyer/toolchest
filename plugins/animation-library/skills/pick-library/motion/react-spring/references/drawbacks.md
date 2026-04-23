# React Spring — Drawbacks

## No layout/shared-element animation

react-spring cannot animate elements between DOM positions automatically. Motion's `layout` prop handles this with a single attribute. Replicating it with react-spring requires manual `getBoundingClientRect` math or a separate library.

## No built-in gesture system

Drag, pinch, and scroll gestures must be wired via `@use-gesture/react` (separate dependency). Motion bundles gesture support. The integration with use-gesture is well-documented but adds setup friction.

## Physics mental model for simple cases

For a simple 200 ms fade-in, configuring `tension`/`friction`/`mass` is more cognitive overhead than `{ duration: 0.2, ease: 'linear' }`. Duration-based config is supported but is a secondary path, not the happy path.

## `useTransition` API complexity

`useTransition` is powerful but its render-function pattern (`transitions((style, item) => ...)`) is non-obvious, and managing keys for dynamic lists requires care. Motion's `AnimatePresence` + `motion.div` is simpler for most enter/leave cases.

## Slower release cadence vs. Motion

Motion releases frequently (feature additions, ecosystem integrations, React 19 updates). react-spring's v10 landed in May 2024 primarily as a React 19 compatibility release. New features are infrequent — the library is stable but not fast-moving. Teams that want bleeding-edge animation primitives (e.g., view timeline integration, scroll-driven) will find more activity in the Motion ecosystem.

## No SVG path morphing or keyframe sequences

anime.js and GSAP support complex SVG path animations and multi-step keyframe sequences natively. react-spring has no equivalent — it interpolates numeric values and strings, but not SVG `d` attribute morphing.

## SSR interpolation caveats

`useSpring` with `from`/`to` can cause hydration mismatches if the initial value differs server-side. The `immediate` flag or careful initial-state management is required for SSR correctness.

## Bundle is not negligible

~19 kB gzipped for `@react-spring/web` is reasonable but not trivial. For landing-page micro-animations where Tailwind CSS classes would suffice, this is overhead.
