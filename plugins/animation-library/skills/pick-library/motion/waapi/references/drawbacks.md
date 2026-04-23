# WAAPI — Drawbacks

## Imperative-only, no declarative React integration

WAAPI has no component model. In React, you must use refs and call `.animate()` inside `useEffect` or event handlers. There is no `<motion.div>` equivalent — no automatic mount/unmount animation, no `AnimatePresence`-style exit coordination. Every interaction point requires manual imperative code.

## No spring / physics easing

WAAPI easing is curve-based (cubic-bezier, step functions). There is no spring, mass, or damping parameter. You cannot express "follow pointer with spring physics" or "interrupt and blend from current velocity." For that, you need react-spring, popmotion, or GSAP's elastic easing (which is approximated, not true physics).

## Scroll-driven animations: Firefox parity gap

`ScrollTimeline` and `ViewTimeline` are Chrome/Edge 115+ and incoming Safari 26+ only. Firefox ships them only behind a flag as of April 2026. The spec is still an Editor's Draft. For production cross-browser scroll-driven animation you need GSAP ScrollTrigger, the `animation-timeline` CSS property with an Intersection Observer fallback, or the official scroll-timeline polyfill.

## Verbose for sequenced multi-step timelines

Expressing "A finishes, then B plays, then C and D play in parallel" requires chaining `.finished` Promises or managing delays manually. There is no built-in Timeline object (unlike GSAP's `gsap.timeline()`). This code becomes unwieldy at scale.

## No FLIP layout animation support

WAAPI does not capture element positions before/after DOM mutations. Implementing layout animations (e.g. grid reflow) requires manual getBoundingClientRect → DOM change → invert → play — the FLIP pattern — which is non-trivial. Libraries like motion's `layout` prop or AutoAnimate handle this for you.

## `fill: 'forwards'` memory leak risk

Animations with `fill: 'forwards'` are not garbage-collected until `.cancel()` is called or `.commitStyles()` + `.cancel()` is used. Creating many filled animations without cleanup causes memory leaks and keeps elements "locked" to animated values unexpectedly.

## Limited debugging tooling

Browser DevTools animation panels (Chrome's Animations panel) show CSS animations well but offer limited insight into WAAPI animations — no scrubbing for scroll-driven timelines, no visual track editor. Compare this to GSAP's GSDevTools or Theatre.js's studio.

## No SVG-specific helpers

WAAPI animates SVG elements via CSS animatable properties (transform, opacity, fill where supported). It does not expose SVG-native concepts like path morphing, stroke-dashoffset helpers, or Motion Path tooling beyond what CSS already provides. Anime.js's SVG helpers or GSAP's MorphSVG fill this gap.
