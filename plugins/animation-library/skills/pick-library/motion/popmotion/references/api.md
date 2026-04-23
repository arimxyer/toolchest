# Popmotion v11 — API Reference

Source: actual TypeScript exports from `https://unpkg.com/popmotion@11.0.5/lib/index.d.ts` and `https://popmotion.io` (retrieved 2026-04-22).

---

## animate(options)

Unified animation entry point. Returns `{ stop() }`.

```ts
animate({
  from?: number | string,          // initial value (default: 0)
  to: number | string | number[],  // target value(s)
  type?: "keyframes" | "spring" | "decay",  // default: "keyframes"
  duration?: number,               // ms (keyframes mode)
  ease?: EasingFunction | EasingFunction[],
  offset?: number[],               // keyframe timing points 0–1
  elapsed?: number,                // initial elapsed ms (negative = delay)
  repeat?: number,                 // Infinity for loop
  repeatDelay?: number,            // ms between repeats
  repeatType?: "loop" | "mirror" | "reverse",
  driver?: DriverFactory,          // custom animation driver
  // spring-specific (when type: "spring")
  stiffness?: number,              // default 100
  damping?: number,                // default 10
  mass?: number,                   // default 1
  velocity?: number,               // units/second
  bounce?: number,                 // 0–1
  restDelta?: number,
  restSpeed?: number,              // default 10
  // inertia/decay-specific (when type: "decay")
  power?: number,                  // default 0.8
  timeConstant?: number,           // ms, default 350
  modifyTarget?: (v: number) => number,
  min?: number,
  max?: number,
  bounceStiffness?: number,        // default 500
  bounceDamping?: number,          // default 10
  // callbacks
  onUpdate?: (latest: number | string) => void,
  onPlay?: () => void,
  onComplete?: () => void,
  onRepeat?: () => void,
  onStop?: () => void,
})
```

---

## inertia(options)

Momentum-deceleration animation with optional boundary springs. Returns `{ stop() }`.

Key options: `velocity`, `power`, `timeConstant`, `modifyTarget`, `min`, `max`, `bounceStiffness`, `bounceDamping`, `restDelta`, `onUpdate`, `onComplete`.

---

## Generators (lower-level, consumed by animate or driven manually)

- `spring(options)` — produces spring values given stiffness/damping/mass/velocity
- `keyframes(options)` — produces values along a linear keyframe sequence
- `decay(options)` — exponential deceleration generator

---

## Easing functions

Built-in (import by name):

`linear`, `easeIn`, `easeInOut`, `easeOut`, `circIn`, `circInOut`, `circOut`, `backIn`, `backInOut`, `backOut`, `anticipate`, `bounceIn`, `bounceInOut`, `bounceOut`

Factories:

```ts
cubicBezier(x1, y1, x2, y2)     // custom cubic bezier
steps(count, alignment?)          // discrete stepping
mirrorEasing(fn)                  // mirror the curve
reverseEasing(fn)                 // reverse the curve
createExpoIn(power)               // exponential in
createBackIn(power)               // overshoot in
createAnticipate(power)           // pull-back + overshoot
```

---

## Interpolation & mixing utilities

```ts
mix(from: number, to: number, progress: number): number
mixColor(from: string, to: string): (p: number) => string
mixComplex(from: string, to: string): (p: number) => string
interpolate(
  input: number[],
  output: (number | string)[],
  options?: { clamp?, mixer?, ease? }
): (v: number) => number | string
pipe(...fns): (v) => any
```

---

## Math utilities (v11 exports)

`angle`, `applyOffset`, `attract`, `attractExpo`, `createAttractor`, `clamp`, `degreesToRadians`, `distance`, `isPoint`, `isPoint3D`, `pointFromVector`, `progress`, `radiansToDegrees`, `smooth`, `smoothFrame`, `snap`, `toDecimal`, `velocityPerFrame`, `velocityPerSecond`, `wrap`

---

## What is NOT in v11

The following existed in older versions (v8 and earlier) but were removed by v11:
`Action`, `Chain`, `Composite`, `Crossfade`, `Delay`, `Merge`, `Parallel`, `Schedule`, `Stagger`, `Timeline`, `Listen`, `Multitouch`, `Pointer`, `Value`, `Multicast`, CSS/DOM/SVG bindings.
