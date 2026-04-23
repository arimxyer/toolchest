# @use-gesture/react — Differentiators

## Position in the 30-library matrix

use-gesture is a **gesture input layer**, not an animation library. It belongs in the motion bucket because gesture-driven animation is its primary use case, but it has no rendering or animation capabilities of its own. Every other library in the motion and rendering buckets produces visual output; use-gesture only reads input.

## vs. motion (Motion for React)

**motion** has built-in `drag`, `whileHover`, `whileTap`, and `whileFocus` props that handle the most common interaction patterns without any additional library. For those cases, use-gesture adds complexity with no benefit.

use-gesture wins when you need:
- Velocity or direction data to drive a spring physics model, not a fixed animation.
- Pinch-to-zoom, which Motion has no built-in prop for.
- Rubber-band elastic bounds.
- Pointer-lock drag (FPS-style) or keyboard-driven drag.
- The gesture state piped directly into a react-spring or raw CSS transform without triggering React re-renders.

**Canonical choice:** reach for Motion's `drag` for simple drag-and-drop; reach for use-gesture when you need the kinematic data or the Motion abstraction is too coarse.

## vs. react-spring (pairs with — canonical companion)

react-spring and use-gesture are **complementary, not competing**. The standard pattern:

```ts
const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))
const bind = useDrag(({ offset: [ox, oy] }) => api.start({ x: ox, y: oy }))
```

react-spring owns the spring physics and DOM updates; use-gesture owns event normalization and kinematic computation. Neither library does the other's job, and they are both pmndrs projects designed to compose cleanly.

## vs. react-three-fiber (pairs with — pmndrs sibling)

react-three-fiber renders 3D scenes via Three.js; it has no gesture system. use-gesture's `useDrag` and `useGesture` attach to R3F mesh components via the same spread-bind pattern, enabling gesture-driven 3D interactions (orbit-like controls, object dragging in world space, pinch scale). The two libraries are the canonical pmndrs pair for interactive 3D.

## vs. auto-animate

auto-animate animates DOM changes automatically (list reorders, conditional mounts). It has no gesture-reading capability. Orthogonal.

## vs. lenis

lenis is a smooth-scroll engine. It intercepts scroll events to normalize inertia across browsers but does not expose kinematic state to application code. use-gesture's `useScroll` and `useWheel` can be used alongside lenis but serve different purposes.

## vs. tailwindcss-animate / tailwindcss-motion / tw-animate-css

CSS utility class libraries. No gesture input. Orthogonal.

## vs. theatre / popmotion / waapi / view-transitions-api

All are animation/scheduling primitives with no gesture layer. Orthogonal; use-gesture could feed any of them.

## vs. react-transition-group / animate-css

Transition orchestration libraries tied to React component lifecycle (mount/unmount). No gesture layer. Orthogonal.

## vs. rendering/ bucket (lottie, rive, r3f, remotion, three-js, babylon-js, pixi-js, pixi-react, konva, react-konva, fabric-js, p5-js, phaser, react-three-rapier)

All rendering libraries. None provide gesture normalization. use-gesture can augment gesture input for any canvas/WebGL renderer, but is most commonly paired with react-three-fiber within the pmndrs ecosystem.

## Core differentiator summary

use-gesture does one thing no animation library does: it turns raw browser input events into a rich, frame-accurate kinematic state object with no extra logic on the caller's side. Its value is entirely in what it hands to an animation layer, not in what it renders.
