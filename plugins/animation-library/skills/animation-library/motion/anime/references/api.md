# Anime.js v4 — API Reference

All imports are named exports from `'animejs'` or subpath modules.

## Core: `animate(targets, parameters)`

```js
import { animate } from 'animejs';
const anim = animate(targets, parameters); // returns JSAnimation
```

**targets**: CSS selector string, DOM element(s), NodeList, array, or plain JS object.

**parameters object**:

| Category | Key examples |
|---|---|
| Animatable properties | Any CSS property (camelCase or kebab), SVG attribute, or JS object key with numeric value |
| Tween parameters | `duration`, `delay`, `ease`, `from`, `to`, `modifier` |
| Per-property override | `x: { from: 0, to: 100, duration: 500, ease: 'outQuad' }` |
| Keyframes | `y: [{ to: '-2rem', duration: 300 }, { to: 0, duration: 500 }]` |
| Playback | `loop` (bool/number), `alternate`, `autoplay`, `loopDelay` |
| Callbacks | `onBegin`, `onUpdate`, `onLoop`, `onComplete`, `onRender` |

**Returns** `JSAnimation` with methods: `.play()`, `.pause()`, `.reverse()`, `.seek(time)`, `.cancel()`, `.revert()`, `.then()` (thenable/Promise).

## WAAPI backend: `waapi.animate(targets, parameters)`

```js
import { waapi } from 'animejs';
const anim = waapi.animate(targets, parameters); // returns WAAPIAnimation
```

Uses browser's native `Element.animate()` under the hood. Same parameter shape as `animate()` but subset of features (~3 KB vs ~10 KB). Hardware-composited by default. Not suitable for JS object targets.

## `stagger(value, options?)`

```js
import { stagger } from 'animejs';
// delay: stagger(65)            → 0ms, 65ms, 130ms ...
// delay: stagger(65, { from: 'center' })
// delay: stagger([0, 500])      → evenly distributed range
```

## `timeline(parameters?)`

```js
import { timeline } from 'animejs';
const tl = timeline({ loop: true });
tl.add(targets, params, timeOffset?);
tl.add(targets2, params2, '+=200'); // relative offset
```

Returns `JSTimeline` with same playback methods as `JSAnimation`.

## `splitText(targets, options?)`

```js
import { splitText } from 'animejs';
const { chars, words, lines } = splitText('h1', { chars: true, words: false });
// returns arrays of wrapped <span> elements
```

## `Draggable`

```js
import { createDraggable } from 'animejs';
const drag = createDraggable('.el', { container: '.parent', snap: { x: 50 } });
```

## `Scope`

Groups animations under a root element with shared defaults; useful for components:

```js
import { createScope } from 'animejs';
const scope = createScope({ root: '.my-component', defaults: { ease: 'outExpo' } });
scope.add(() => animate('.inner', { x: 100 }));
scope.revert(); // tears down all animations in scope
```

## Engine

```js
import { engine } from 'animejs';
engine.timeUnit = 'ms'; // or 's'
engine.fps = 30;         // cap frame rate
```

## Easing

Built-in named easings: `'linear'`, `'inQuad'`, `'outExpo'`, `'inOutCirc'`, `'outBounce'`, `'outElastic'`, `'spring(mass, stiffness, damping, velocity)'`, `'steps(n)'`, `'cubicBezier(x1,y1,x2,y2)'`, `'in(power)'`, `'out(power)'`, `'inOut(power)'`.

## SVG helpers

```js
import { svg } from 'animejs';
svg.morphTo('.shape', '#target-path');
svg.createMotionPath('.path-el');
```
