# tailwindcss-motion — Overview

Author: Rombo (romboHQ). MIT license. OSS plugin; commercial tiers only apply to Rombo's visual tooling.

## What it is

A Tailwind CSS plugin that generates CSS `@keyframes` and associated utility classes covering entrance (`in`), exit (`out`), and loop (`loop`) animations for opacity, scale, translate-x/y, rotate, blur, grayscale, bg-color, and text-color. No JavaScript ships to the browser.

## Core class pattern

```
motion-[property]-[in|out|loop]-[value]
```

Stack multiple classes for compound effects:
```html
<div class="motion-opacity-in-0 motion-translate-y-in-100 motion-duration-500">
  Slides in from below while fading
</div>
```

## Presets

Named presets (`motion-preset-*`) combine multiple properties into a single class. Categories:

- **Entrance:** fade, slide-{right,left,up,down}, slide-up-{right,left}, slide-down-{left,right}, focus, blur-{right,left,up,down}, rebound-{right,left,up,down}, bounce, expand, shrink, pop, compress, shake, wiggle, confetti
- **Loop:** pulse, wobble, seesaw, oscillate, stretch, float, spin, blink, typewriter-[N], flomoji-[emoji]

Most presets accept `-sm`, `-md`, `-lg` size variants.

## Modifiers

- **Duration/delay:** `motion-duration-[ms]`, `motion-delay-[ms]`
- **Per-property (slash syntax):** `motion-delay-500/rotate` — delay only the rotate sub-animation
- **Easing:** `motion-ease-spring-smooth`, `-snappy`, `-bouncy`, `-bounciest`, `motion-ease-bounce`, `motion-ease-in-quart`
- **Loop count:** `motion-loop-once`, `motion-loop-twice`, `motion-loop-infinite` (default)
- **Loop behavior:** `/mirror` (reverse on each cycle, default), `/reset` (jump to start)
- **Play state:** `motion-paused`, `motion-running`

## Accessibility

Automatically strips transform/scale animations for users with `prefers-reduced-motion: reduce`; opacity/blur/color animations still fire (considered non-vestibular).

## Theme customization

Extend `motionScale`, `motionTimingFunction`, `motionDuration`, etc. in `tailwind.config.ts` via the standard `theme.extend` API.

## Tooling (Rombo)

- **Visual Animator:** https://rombo.co/tailwind/#animator — drag-and-drop builder, exports as Tailwind classes, raw CSS, or Framer Motion code.
- **Chrome Extension:** Animate elements on any live or localhost site. Custom animation creation and saving require the Pro tier ($19/mo).
