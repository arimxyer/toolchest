# Motion — API Reference

All APIs verified against motion.dev/docs on 2026-04-22.

## Core: motion components

```tsx
// Any HTML or SVG element becomes animatable
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}          // requires <AnimatePresence> ancestor
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
/>
```

Key props on every `motion.*` element:

| Prop | Purpose |
|---|---|
| `initial` | Starting state (can be `false` to disable) |
| `animate` | Target state; can be a variant label |
| `exit` | State when element is removed (AnimatePresence required) |
| `transition` | Timing/physics overrides; per-property via `{ opacity: { duration: 0.2 } }` |
| `variants` | Named state map; children inherit the active variant label automatically |
| `layout` | `true` / `"position"` / `"size"` — animates DOM layout changes |
| `layoutId` | Shared layout across DOM positions (hero / tab underline patterns) |
| `whileHover` / `whileTap` / `whileFocus` / `whileDrag` | Gesture-activated states |
| `whileInView` | Activates when element enters the viewport |
| `drag` | `true` / `"x"` / `"y"` |
| `dragConstraints` | Bounding box or ref to a container |

## Transitions

```tsx
// Spring (default for transforms)
{ type: "spring", stiffness: 300, damping: 20, mass: 1 }

// Tween (default for opacity, color)
{ type: "tween", duration: 0.3, ease: "easeOut" }

// Inertia (drag release)
{ type: "inertia", velocity: 200 }
```

## Hooks

| Hook | Returns | Use case |
|---|---|---|
| `useMotionValue(initial)` | `MotionValue<T>` | Mutable value that skips React re-renders |
| `useSpring(value, config)` | `MotionValue<T>` | Spring-smoothed derived value |
| `useTransform(value, input, output)` | `MotionValue<T>` | Map one range to another (parallax, progress) |
| `useScroll({ target?, container?, offset? })` | `{ scrollX, scrollY, scrollXProgress, scrollYProgress }` | Scroll-linked animations |
| `useAnimate()` | `[scope, animate]` | Imperative animation within a scoped subtree |
| `useAnimation()` | `AnimationControls` | Trigger animations from outside a component |
| `useInView(ref, options?)` | `boolean` | Detect element entering viewport |
| `useReducedMotion()` | `boolean` | Respect prefers-reduced-motion |

## AnimatePresence

```tsx
<AnimatePresence mode="wait">  // "sync" | "wait" | "popLayout"
  {isVisible && (
    <motion.div key="unique" exit={{ opacity: 0 }} />
  )}
</AnimatePresence>
```

`mode="popLayout"` uses `position: absolute` on exiting elements so the remaining layout doesn't jump.

## Variants (tree propagation)

```tsx
const list = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const item = { hidden: { x: -20 }, show: { x: 0 } }

<motion.ul variants={list} initial="hidden" animate="show">
  <motion.li variants={item} /> {/* inherits parent variant label */}
</motion.ul>
```

## Vanilla JS / framework-agnostic

```js
import { animate, scroll } from "motion/dom"

animate("#box", { x: 100 }, { duration: 0.5 })

scroll(animate("#progress", { scaleX: [0, 1] }))
```

## Bundle size reduction

```tsx
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

// domAnimation: +15 kB gzipped (no drag/layout)
// domMax: +25 kB gzipped (all features)
<LazyMotion features={domAnimation}>
  <m.div animate={{ opacity: 1 }} />
</LazyMotion>
```
