# GSAP — API Reference

Source: https://gsap.com/docs/v3/ (retrieved 2026-04-22)

---

## Core tween methods

```js
gsap.to(targets, vars)         // current → vars
gsap.from(targets, vars)       // vars → current (immediateRender: true by default)
gsap.fromTo(targets, fromVars, toVars)
gsap.set(targets, vars)        // zero-duration instant set
```

`targets` accepts: CSS selector string, Element, NodeList, Array, React ref, or any object.

### Common `vars` properties

| Property | Type | Notes |
|---|---|---|
| `duration` | number | seconds; default 0.5 |
| `delay` | number | seconds |
| `ease` | string \| function | default `"power1.out"` |
| `repeat` | number | `-1` = infinite |
| `repeatDelay` | number | seconds between repeats |
| `yoyo` | boolean | alternate direction on repeat |
| `stagger` | number \| object | delay between each target |
| `overwrite` | `"auto"` \| boolean | kill conflicting tweens |
| `paused` | boolean | start paused |
| `easeReverse` | string \| boolean | ease for reverse playback (v3.15+); replaces `yoyoEase` |
| `onStart/Update/Complete/Repeat/ReverseComplete` | function | callbacks |
| `lazy` | boolean | batch DOM writes to end of tick (default `true`) |
| `id` | string | for `gsap.getById()` |

### Special animatable properties

- `x`, `y`, `rotation`, `scale`, `scaleX`, `scaleY`, `skewX`, `skewY` — transform shorthand
- `xPercent`, `yPercent` — percentage-based translate
- `autoAlpha` — `opacity` + `visibility` toggled at 0
- `attr: { cx, r, ... }` — raw SVG/HTML attributes
- `endArray: [...]` — interpolate array of numbers

---

## Timeline

```js
const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power2.out" },
  repeat: -1,
  yoyo: true,
  paused: true,
  onComplete: fn,
});

tl.to(".a", { x: 100 })
  .from(".b", { opacity: 0 }, "<")        // same start as previous
  .to(".c", { y: 50 }, "+=0.5");          // 0.5s after previous ends
```

### Position parameter syntax

| Syntax | Meaning |
|---|---|
| `3` | absolute 3s from start |
| `"label"` | at named label |
| `"<"` | start of previous |
| `">"` | end of previous |
| `"+=1"` / `"-=1"` | offset from timeline end |
| `"<+=0.5"` | 0.5s after start of previous |
| `">-0.5"` | 0.5s before end of previous |
| `"-=25%"` | relative % of inserting animation's duration |

### Control methods

```js
tl.play()  tl.pause()  tl.resume()  tl.reverse()
tl.seek(1.5)  tl.seek("label")
tl.restart()  tl.revert()
tl.timeScale(2)
tl.then(() => { ... })   // Promise
tl.addLabel("step2", 3)
tl.addPause("step2")
```

---

## ScrollTrigger

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",   // [trigger edge] [viewport edge]
    end: "+=300",
    scrub: 1,           // lag in seconds; true = immediate
    pin: true,
    markers: true,      // dev only
    snap: { snapTo: "labels", duration: { min: 0.2, max: 3 } },
    onEnter: (self) => {},
    onUpdate: (self) => console.log(self.progress),
  },
});

// Standalone (no animation):
ScrollTrigger.create({ trigger: "#id", onToggle: (self) => {} });

// Batch (stagger on-enter):
ScrollTrigger.batch(".cards", { onEnter: (els) => gsap.from(els, { y: 50, stagger: 0.1 }) });

ScrollTrigger.refresh();       // recalculate all positions
```

---

## SplitText

```js
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

// Static API (v3.13+)
const split = SplitText.create(".headline", { type: "chars,words,lines" });
gsap.from(split.chars, { y: 60, opacity: 0, stagger: 0.04, duration: 0.8 });

// Auto re-split on resize:
SplitText.create(".headline", {
  type: "lines",
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.lines, { yPercent: 100, stagger: 0.1, duration: 1 });
  },
});
```

---

## Flip

```js
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

const state = Flip.getState(".items");       // capture positions
container.classList.toggle("grid");          // change layout
Flip.from(state, { duration: 0.6, ease: "power1.inOut", stagger: 0.05 });
```

---

## Global utilities

```js
gsap.defaults({ duration: 0.5, ease: "power1.out" });
gsap.killTweensOf(target, { x: true });   // kill specific props
gsap.getProperty(el, "x");                // read computed value
gsap.getById("myTween");
gsap.ticker.add((time, delta) => { ... });
gsap.ticker.fps(60);

// Responsive animations:
const mm = gsap.matchMedia();
mm.add("(max-width: 768px)", () => { gsap.to(".box", { x: 50 }); });

// Context (component cleanup):
const ctx = gsap.context(() => { gsap.to(".box", { x: 100 }); }, scopeEl);
// on unmount:
ctx.revert();
```

---

## Eases

Built-in families: `power1`–`power4`, `back`, `bounce`, `circ`, `elastic`, `expo`, `sine`.
Each supports `.in`, `.out`, `.inOut` (e.g. `"elastic.out(1, 0.3)"`).
Special: `"steps(12)"`, `"none"` (linear).
CustomEase: `CustomEase.create("myEase", "M0,0 C0.14,0 0.242,0.438 0.272,0.561 ...")`.
