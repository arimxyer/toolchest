# Lenis — API Reference

Source: github.com/darkroomengineering/lenis README (verified 2026-04-22, v1.3.23)

---

## Constructor

```ts
new Lenis(options?: LenisOptions)
```

### Key options

| Option | Type | Default | Notes |
|---|---|---|---|
| `wrapper` | `HTMLElement \| Window` | `window` | Scroll container |
| `content` | `HTMLElement` | `document.documentElement` | Scrolled element (direct child of wrapper) |
| `eventsTarget` | `HTMLElement \| Window` | `wrapper` | Listens for wheel / touch events |
| `autoRaf` | `boolean` | `false` | Run own RAF loop; set `false` when integrating with GSAP ticker |
| `lerp` | `number` | `0.1` | Interpolation intensity (0–1). Overrides `duration` when set. |
| `duration` | `number` | `1.2` | Scroll animation duration in seconds. Ignored if `lerp` is defined. |
| `easing` | `function` | exponential decay | Custom easing function `(t: number) => number`. Ignored if `lerp` is defined. |
| `smoothWheel` | `boolean` | `true` | Apply lerp to mouse wheel events |
| `syncTouch` | `boolean` | `false` | Mirror touch inertia through lerp. Unstable on iOS < 16. |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Scroll axis |
| `gestureOrientation` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Gesture axis |
| `infinite` | `boolean` | `false` | Infinite scroll loop. Requires `syncTouch: true` on touch. |
| `autoResize` | `boolean` | `true` | Auto resize via ResizeObserver |
| `prevent` | `(node: Element) => boolean` | `undefined` | Return `true` to skip smoothing for elements traversed by the event |
| `allowNestedScroll` | `boolean` | `false` | Let nested scrollable elements scroll natively. Performance impact — use `data-lenis-prevent` instead for prod. |
| `anchors` | `boolean \| ScrollToOptions` | `false` | Handle `<a href="#...">` anchor links |
| `overscroll` | `boolean` | `true` | Mimic CSS `overscroll-behavior` |
| `wheelMultiplier` | `number` | `1` | Mouse wheel speed multiplier |
| `touchMultiplier` | `number` | `1` | Touch speed multiplier |

---

## Instance properties (getters)

| Property | Type | Description |
|---|---|---|
| `scroll` | `number` | Current interpolated scroll value |
| `targetScroll` | `number` | Destination scroll value |
| `animatedScroll` | `number` | Same as `scroll` (alias) |
| `actualScroll` | `number` | Raw browser scroll value |
| `velocity` | `number` | Current scroll velocity |
| `progress` | `number` | Scroll progress 0–1 |
| `limit` | `number` | Maximum scrollable distance |
| `direction` | `number` | `1` = down, `-1` = up |
| `isScrolling` | `boolean \| 'smooth' \| 'native'` | Scroll state |
| `isStopped` | `boolean` | Whether scroll is paused |
| `isHorizontal` | `boolean` | Horizontal orientation active |

---

## Methods

| Method | Signature | Description |
|---|---|---|
| `raf` | `(time: number) => void` | Call every frame (time in ms). Required when `autoRaf: false`. |
| `scrollTo` | `(target, options?) => void` | Scroll to number (px), CSS selector, keyword (`'top'`, `'bottom'`), or `HTMLElement` |
| `start` | `() => void` | Resume scroll |
| `stop` | `() => void` | Pause scroll |
| `destroy` | `() => void` | Remove all event listeners, stop RAF |
| `resize` | `() => void` | Recompute dimensions (needed when `autoResize: false`) |
| `on` | `(event: string, fn: Function) => void` | Subscribe to events |

### `scrollTo` options

| Option | Type | Description |
|---|---|---|
| `offset` | `number` | Equivalent to `scroll-padding-top` |
| `lerp` | `number` | Per-scroll lerp override |
| `duration` | `number` | Per-scroll duration override |
| `easing` | `function` | Per-scroll easing override |
| `immediate` | `boolean` | Jump with no animation |
| `lock` | `boolean` | Block user scroll until target reached |
| `force` | `boolean` | Scroll even if instance is stopped |
| `onComplete` | `function` | Callback when target reached |

---

## Events

| Event | Callback argument |
|---|---|
| `scroll` | Lenis instance |
| `virtual-scroll` | `{ deltaX, deltaY, event }` |

---

## HTML data attributes (nested scroll)

| Attribute | Effect |
|---|---|
| `data-lenis-prevent` | Prevent smooth scroll on this element |
| `data-lenis-prevent-wheel` | Wheel events only |
| `data-lenis-prevent-touch` | Touch events only |
| `data-lenis-prevent-vertical` | Vertical scroll events only |
| `data-lenis-prevent-horizontal` | Horizontal scroll events only |

---

## React API (`lenis/react`)

```tsx
import { ReactLenis, useLenis } from 'lenis/react'

// Wrap entire app
<ReactLenis root>
  {children}
</ReactLenis>

// Access instance anywhere in the tree
const lenis = useLenis((instance) => {
  // called on each scroll event
})
```

---

## Vue API (`lenis/vue`)

```ts
import { VueLenis, useLenis } from 'lenis/vue'

// As component
<VueLenis root>...</VueLenis>

// As global plugin (nuxt.config.ts)
modules: ['lenis/nuxt']
```

---

## GSAP ScrollTrigger integration (official pattern)

```js
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
```

Key: `autoRaf` must remain `false`; Lenis's RAF is driven by GSAP's ticker.
