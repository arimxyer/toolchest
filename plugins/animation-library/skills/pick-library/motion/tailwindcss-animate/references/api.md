# tailwindcss-animate — API Reference

All classes work by composing onto an element. `animate-in` and `animate-out` are the activators; the remaining classes configure what the animation does.

## Activators

| Class | Effect |
|---|---|
| `animate-in` | Plays the enter animation (fade-in, slide-in, zoom-in variants apply) |
| `animate-out` | Plays the exit animation (fade-out, slide-out, zoom-out variants apply) |
| `running` | Sets `animation-play-state: running` |
| `paused` | Sets `animation-play-state: paused` |

## Opacity

| Class pattern | CSS property |
|---|---|
| `fade-in-{0|5|10|…|100}` | `--tw-enter-opacity: {value}%` |
| `fade-out-{0|5|10|…|100}` | `--tw-exit-opacity: {value}%` |

## Scale

| Class pattern | CSS property |
|---|---|
| `zoom-in-{0|5|…|100}` | `--tw-enter-scale: {value}%` |
| `zoom-out-{0|5|…|100}` | `--tw-exit-scale: {value}%` |

## Rotation

| Class pattern | CSS property |
|---|---|
| `spin-in-{1|2|3|…|180}` | `--tw-enter-rotate: {value}deg` |
| `spin-out-{1|2|3|…|180}` | `--tw-exit-rotate: {value}deg` |

## Translation (slide)

| Class pattern | CSS property |
|---|---|
| `slide-in-from-top-{amount}` | `--tw-enter-translate-y: -{amount}` |
| `slide-in-from-bottom-{amount}` | `--tw-enter-translate-y: {amount}` |
| `slide-in-from-left-{amount}` | `--tw-enter-translate-x: -{amount}` |
| `slide-in-from-right-{amount}` | `--tw-enter-translate-x: {amount}` |
| `slide-out-to-{top|bottom|left|right}-{amount}` | Corresponding `--tw-exit-translate-*` |

## Timing

| Class pattern | CSS |
|---|---|
| `duration-{0|75|100|150|200|300|500|700|1000}` | `animation-duration` |
| `delay-{0|75|100|…|1000}` | `animation-delay` |
| `ease-linear` / `ease-in` / `ease-out` / `ease-in-out` | `animation-timing-function` |
| `repeat-{0|1|2|…|infinite}` | `animation-iteration-count` |

## Direction / fill mode

| Class | CSS |
|---|---|
| `direction-normal` / `direction-reverse` / `direction-alternate` / `direction-alternate-reverse` | `animation-direction` |
| `fill-mode-none` / `fill-mode-forwards` / `fill-mode-backwards` / `fill-mode-both` | `animation-fill-mode` |

## Typical composition pattern

```html
<!-- Dialog appearing: fades in while scaling from 95% -->
<div class="animate-in fade-in zoom-in-95 duration-200 ease-out">
  Dialog content
</div>

<!-- Tooltip exiting: fades out while sliding up 4px -->
<div class="animate-out fade-out slide-out-to-top-1 duration-150">
  Tooltip
</div>
```

## Implementation note

The plugin implements enter/exit through CSS custom properties (`--tw-enter-*`, `--tw-exit-*`) that feed into a single `@keyframes` rule per animation direction. This allows stacking multiple effects (fade + zoom + slide) with a single animation call.
