# React Spring — API Reference

## Installation

```bash
npm i @react-spring/web        # React >= 19
npm i @react-spring/web@9      # React < 19
```

## useSpring

Two call signatures:

```tsx
// Declarative — re-evaluates on every render
const springs = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } })

// Imperative — returns [values, api]; stable across renders
const [springs, api] = useSpring(() => ({ x: 0, opacity: 1 }), [])
api.start({ x: 100 })   // animate
api.stop()               // halt
api.set({ x: 0 })       // snap without spring
```

## useSprings

```tsx
const [springs, api] = useSprings(count, index => ({ scale: 1 }), [])
api.start(index => ({ scale: index === active ? 1.2 : 1 }))
```

## useTrail

```tsx
const trail = useTrail(items.length, {
  config: { mass: 5, tension: 2000, friction: 200 },
  opacity: open ? 1 : 0,
  x: open ? 0 : 20,
  from: { opacity: 0, x: 20 },
})
// render: trail.map((style, i) => <animated.div style={style}>{items[i]}</animated.div>)
```

## useTransition

```tsx
const transitions = useTransition(items, {
  from:   { opacity: 0, scale: 0.8 },
  enter:  { opacity: 1, scale: 1 },
  leave:  { opacity: 0, scale: 0.8 },
  trail:  400 / items.length,
  keys:   item => item.id,
})
// render: transitions((style, item) => <animated.div style={style}>{item.label}</animated.div>)
```

## useChain

```tsx
const springRef = useSpringRef()
const transRef  = useSpringRef()
useSpring({ ref: springRef, ... })
useTransition(items, { ref: transRef, ... })
useChain([springRef, transRef], [0, 0.4]) // transRef starts at 40% of default duration
```

## Spring physics config

```tsx
config: {
  mass:      1,      // inertia — higher = heavier, slower settling
  tension:   170,    // stiffness — higher = snappier
  friction:  26,     // damping — higher = less bounce
  clamp:     false,  // stop at target (no overshoot) if true
  precision: 0.01,   // settlement threshold
  velocity:  0,      // initial velocity
}
```

### Built-in presets (import `config` from `@react-spring/web`)

| Preset | tension | friction |
|---|---|---|
| `config.default` | 170 | 26 |
| `config.gentle` | 120 | 14 |
| `config.wobbly` | 180 | 12 |
| `config.stiff` | 210 | 20 |
| `config.slow` | 280 | 60 |
| `config.molasses` | 280 | 120 |

### Duration-based (opt out of physics)

```tsx
config: { duration: 800, easing: easings.easeInOutQuad }
```

Per-key config: `config: key => key === 'scale' ? config.wobbly : { duration: 300 }`.

## `animated` component

```tsx
import { animated, useSpring } from '@react-spring/web'

// Built-in elements
<animated.div style={springs} />

// Third-party components
const AnimatedBox = animated(Box)
<AnimatedBox style={springs} />
```

## Interpolation

```tsx
const rotation = springs.x.to(x => `rotate(${x}deg)`)
const multi = to([springs.x, springs.y], (x, y) => `translate(${x}px, ${y}px)`)
```
