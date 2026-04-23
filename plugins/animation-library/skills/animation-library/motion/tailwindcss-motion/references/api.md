# tailwindcss-motion — API Reference

## Installation

```bash
npm i -D tailwindcss-motion
```

```js
// tailwind.config.js / tailwind.config.ts
import tailwindcssMotion from "tailwindcss-motion";
export default {
  plugins: [tailwindcssMotion],
};
```

Peer dependency: `tailwindcss >=3.0.0`. TypeScript definitions included.

---

## Animatable property axes

| Class prefix | Controls |
|---|---|
| `motion-opacity-{dir}-{val}` | opacity (0–100) |
| `motion-scale-{dir}-{val}` | uniform scale |
| `motion-scale-x-{dir}-{val}` | horizontal scale |
| `motion-scale-y-{dir}-{val}` | vertical scale |
| `motion-translate-x-{dir}-{val}` | horizontal translate |
| `motion-translate-y-{dir}-{val}` | vertical translate |
| `motion-rotate-{dir}-{val}` | rotation (degrees) |
| `motion-blur-{dir}-{val}` | blur (px) |
| `motion-grayscale-{dir}-{val}` | grayscale (0–100) |
| `motion-bg-color-{dir}-{val}` | background color |
| `motion-text-color-{dir}-{val}` | text color |

`{dir}` = `in` | `out` | `loop`

---

## Preset classes (entrance)

```
motion-preset-fade[-sm|-md|-lg]
motion-preset-slide-right[-sm|-md|-lg]
motion-preset-slide-left[-sm|-md|-lg]
motion-preset-slide-up[-sm|-md|-lg]
motion-preset-slide-down[-sm|-md|-lg]
motion-preset-slide-up-right / -up-left / -down-left / -down-right
motion-preset-focus[-sm|-md|-lg]
motion-preset-blur-right[-sm|-md|-lg]  (and -left, -up, -down)
motion-preset-rebound-right[-sm|-md|-lg]  (and -left, -up, -down)
motion-preset-bounce[-sm|-md|-lg]
motion-preset-expand[-sm|-md|-lg]
motion-preset-shrink[-sm|-md|-lg]
motion-preset-pop[-sm|-md|-lg]
motion-preset-compress[-sm|-md|-lg]
motion-preset-shake[-sm|-md|-lg]
motion-preset-wiggle[-sm|-md|-lg]
motion-preset-confetti
```

## Preset classes (loop/continuous)

```
motion-preset-pulse[-sm|-md|-lg]
motion-preset-wobble[-sm|-md|-lg]
motion-preset-seesaw[-sm|-md|-lg]
motion-preset-oscillate[-sm|-md|-lg]
motion-preset-stretch[-sm|-md|-lg]
motion-preset-float[-sm|-md|-lg]
motion-preset-spin
motion-preset-blink
motion-preset-typewriter-[N]      (N = character count, e.g. motion-preset-typewriter-[24])
motion-preset-flomoji-[emoji]     (e.g. motion-preset-flomoji-[🚀])
```

---

## Modifier classes

### Timing

```
motion-duration-[ms]               e.g. motion-duration-500
motion-duration-[ms]/[property]    e.g. motion-duration-300/opacity
motion-delay-[ms]                  e.g. motion-delay-200
motion-delay-[ms]/[property]       e.g. motion-delay-500/rotate
```

### Easing

```
motion-ease-spring-smooth
motion-ease-spring-snappy
motion-ease-spring-bouncy
motion-ease-spring-bounciest
motion-ease-bounce
motion-ease-in-quart
```

### Loop control

```
motion-loop-once
motion-loop-twice
motion-loop-infinite          (default)
motion-translate-y-loop-[v]/mirror    (default — reverses direction)
motion-translate-y-loop-[v]/reset     (jumps back to start)
```

### Play state

```
motion-paused
motion-running
```

---

## Theme extension

```ts
// tailwind.config.ts
theme: {
  extend: {
    motionScale: { "200": "200%" },
    motionTranslate: { "half": "50%" },
    motionTimingFunction: {
      custom: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    motionDuration: { "2000": "2000ms" },
    motionDelay: { "1000": "1000ms" },
  },
}
```

---

## Reduced-motion behavior

Under `prefers-reduced-motion: reduce`, transform-based axes (translate, scale, rotate) are suppressed automatically. Opacity, blur, and color animations continue to fire.
