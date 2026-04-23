# Web Animations API — API Reference

Source: MDN Web Docs (retrieved 2026-04-22). Spec: https://www.w3.org/TR/web-animations-1/ and https://drafts.csswg.org/scroll-animations-1/

---

## `Element.animate(keyframes, options)` — Level 1

Shorthand factory. Returns an `Animation` that starts playing immediately.

```js
const anim = el.animate(
  [{ opacity: 0, transform: 'translateY(-20px)' }, { opacity: 1, transform: 'translateY(0)' }],
  { duration: 400, easing: 'ease-out', fill: 'forwards' }
);
```

**`keyframes`**: array of keyframe objects (each may include `offset: 0..1`, `easing`, `composite`) or an object with property arrays (`{ opacity: [0, 1] }`).

**`options`**: integer (duration in ms) or `EffectTiming` object:

| Field | Type | Notes |
|---|---|---|
| `duration` | number | ms |
| `delay` | number | ms, default 0 |
| `endDelay` | number | ms |
| `iterations` | number | `Infinity` for loops |
| `direction` | string | `'normal'`, `'reverse'`, `'alternate'`, `'alternate-reverse'` |
| `easing` | string | CSS easing value |
| `fill` | string | `'none'`, `'forwards'`, `'backwards'`, `'both'`, `'auto'` |
| `composite` | string | `'replace'`, `'add'`, `'accumulate'` |
| `id` | string | labels the Animation |
| `timeline` | AnimationTimeline | override document timeline |
| `rangeStart` / `rangeEnd` | string / CSSNumericValue | scroll-driven range (Level 2) |

**Browser support:** Chrome 84+, Edge 84+, Firefox 75+, Safari 13.1+ — Baseline widely available (March 2020, ~95.5% global).

---

## `KeyframeEffect` — Level 1

Lower-level effect object; separates effect definition from playback control.

```js
const effect = new KeyframeEffect(
  el,
  [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
  { duration: 1000, iterations: Infinity }
);
const anim = new Animation(effect, document.timeline);
anim.play();
```

Key members: `.target`, `.pseudoElement`, `.composite`, `.iterationComposite`.  
Methods: `getKeyframes()`, `setKeyframes()`, `getTiming()`, `updateTiming()`.

**Browser support:** Same matrix as `Element.animate()` — Baseline widely available March 2020.

---

## `Animation` — Level 1

Controller object. Returned by `Element.animate()` or constructed with `new Animation(effect, timeline)`.

| Member | Description |
|---|---|
| `.currentTime` | Current time in ms (or null if timeline inactive) |
| `.playState` | `'idle'`, `'running'`, `'paused'`, `'finished'` |
| `.playbackRate` | Multiplier; negative = reverse |
| `.effect` | The associated `AnimationEffect` |
| `.timeline` | The associated `AnimationTimeline` |
| `.finished` | Promise that resolves when animation finishes |
| `.ready` | Promise that resolves when animation is ready to play |
| `.play()` / `.pause()` / `.reverse()` / `.cancel()` / `.finish()` | Playback controls |
| `.commitStyles()` | Writes computed animated styles to `style` attribute |
| `.persist()` | Prevents animation removal after filling |
| `document.getAnimations()` | Returns all active animations on document |
| `el.getAnimations()` | Returns animations targeting the element |

---

## `AnimationTimeline` — Level 1 (base)

Abstract base. Exposes `.currentTime` (read-only). Subclasses: `DocumentTimeline`, `ScrollTimeline`, `ViewTimeline`.

`document.timeline` is the default `DocumentTimeline` (time since page load, in ms).

---

## `ScrollTimeline` — Level 2 (Scroll-driven, ED)

Maps scroll progress of a container to animation progress.

```js
const tl = new ScrollTimeline({ source: scroller, axis: 'block' });
el.animate(keyframes, { duration: 1, timeline: tl });
```

`source`: scrollable element (defaults to document scrolling area).  
`axis`: `'block'` (default) | `'inline'` | `'x'` | `'y'`.

**Browser support:** Chrome 115+, Edge 115+, Safari 26+ (upcoming). Firefox: behind flag only (as of April 2026). NOT Baseline.

---

## `ViewTimeline` — Level 2 (Scroll-driven, ED)

Maps intersection of a subject element within a scroller to animation progress.

```js
const tl = new ViewTimeline({ subject: card, axis: 'block' });
card.animate(
  [{ opacity: 0 }, { opacity: 1 }],
  { duration: 1, timeline: tl, rangeStart: 'entry 0%', rangeEnd: 'entry 100%' }
);
```

`subject`: element whose visibility drives the timeline.  
`inset`: optional `CSSNumericValue` or string to shrink/expand the view box.  
Additional read-only properties: `.startOffset`, `.endOffset` (as `CSSNumericValue`).

**Browser support:** Same as `ScrollTimeline` — Chrome 115+, Edge 115+, Safari 26+; Firefox behind flag.
