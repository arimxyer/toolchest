# tw-animate-css — API Reference

All classes are applied as HTML attributes. No JS API exists.

## Direction base classes (required)

| Class | Effect |
|---|---|
| `animate-in` | Triggers the enter animation |
| `animate-out` | Triggers the exit animation |

## Effect modifier classes

Combine freely with `animate-in` or `animate-out`.

### Fade
| Class | Description |
|---|---|
| `fade-in` | Fade from transparent to opaque (animate-in) |
| `fade-out` | Fade from opaque to transparent (animate-out) |

### Zoom
| Class | Description |
|---|---|
| `zoom-in` | Scale from 0 to 1 |
| `zoom-in-95` | Scale from 0.95 to 1 |
| `zoom-out` | Scale from 1 to 0 |
| `zoom-out-95` | Scale from 1 to 0.95 |

### Slide
| Class pattern | Description |
|---|---|
| `slide-in-from-top-{n}` | Translate from -n (top) |
| `slide-in-from-bottom-{n}` | Translate from +n (bottom) |
| `slide-in-from-left-{n}` | Translate from -n (left) |
| `slide-in-from-right-{n}` | Translate from +n (right) |
| `slide-out-to-top-{n}` / `bottom` / `left` / `right` | Exit translations |
| `slide-in-from-start-{n}` / `slide-out-to-end-{n}` | Logical (RTL-aware) variants |

Values follow Tailwind spacing scale; ratio (fractional) values are also supported.

### Spin
| Class | Description |
|---|---|
| `spin-in` | Rotate into view |
| `spin-out` | Rotate out of view |

### Blur
| Class | Description |
|---|---|
| `blur-in` | Animate from blurred to sharp |
| `blur-out` | Animate from sharp to blurred |

## Timing and control classes

These compose with standard Tailwind utilities.

| Class | Description |
|---|---|
| `duration-{n}` | Animation duration (e.g. `duration-300`) |
| `delay-{n}` | Animation delay |
| `ease-{fn}` | Timing function (`ease-out`, `ease-in-out`, custom) |
| `repeat-{n}` | Iteration count |
| `direction-{value}` | Animation direction |
| `fill-mode-{value}` | Fill mode (default changed to `none` in v1.3.4) |
| `running` | Play state: running |
| `paused` | Play state: paused |

## Pre-built component animations

| Class | Requires CSS var | Purpose |
|---|---|---|
| `animate-accordion-down` | `--radix-accordion-content-height` (or equivalent) | Accordion open |
| `animate-accordion-up` | same | Accordion close |
| `animate-collapsible-down` | `--radix-collapsible-content-height` | Collapsible open |
| `animate-collapsible-up` | same | Collapsible close |
| `animate-caret-blink` | — | Blinking caret cursor |

Compatible height providers: Radix UI, BitsUI, Reka, Kobalte, ng-primitives.

## Prefixed entry point

```css
@import "tw-animate-css/prefix";
```

Exposes all utilities under your configured Tailwind prefix.

## Composition example

```html
<div class="animate-in fade-in slide-in-from-top-8 duration-500 ease-out">
  Enters from top
</div>
<div class="animate-out fade-out zoom-out-95 duration-300">
  Exits with fade + shrink
</div>
```
