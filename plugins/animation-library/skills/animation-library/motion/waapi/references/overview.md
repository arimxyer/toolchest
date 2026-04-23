# Web Animations API — Overview

WAAPI is a browser-native JavaScript API for creating, controlling, and inspecting animations on DOM elements. It unifies CSS Animations and CSS Transitions under a single programmatic model while exposing capabilities unavailable in pure CSS (seek, reverse, playback rate, dynamic keyframes).

## Spec levels

| Spec | Level | Status | URL |
|---|---|---|---|
| Web Animations | Level 1 | W3C Working Draft (Jun 5 2023) | https://www.w3.org/TR/web-animations-1/ |
| Scroll-driven Animations | (extends L1) | Editor's Draft (Dec 17 2025) | https://drafts.csswg.org/scroll-animations-1/ |

Level 1 covers `Element.animate()`, `KeyframeEffect`, `AnimationTimeline`, and `DocumentTimeline`. Scroll-driven animations (ScrollTimeline, ViewTimeline) are specified separately and are still an Editor's Draft — the API surface can still shift.

## Core model

- **`Animation`** — the controller object returned by `Element.animate()` or `new Animation(effect, timeline)`. Has `.play()`, `.pause()`, `.reverse()`, `.cancel()`, `.finish()`, `.currentTime` (ms or null), `.playbackRate`.
- **`AnimationEffect`** — base for effects. Only concrete subclass exposed today is `KeyframeEffect`.
- **`KeyframeEffect`** — holds target element, keyframes array, and timing options. Can be mutated after construction via `setKeyframes()` / `updateTiming()`.
- **`AnimationTimeline`** — base class. Default is `document.timeline` (a `DocumentTimeline`). Scroll-driven extensions add `ScrollTimeline` and `ViewTimeline`.

## Scroll-driven animations (Level 2 additions)

`ScrollTimeline` maps scroll position of a scrolling container to animation progress. `ViewTimeline` maps the intersection of a subject element within a scroller (entry / exit) to animation progress. Both are passed as the `timeline` option to `Element.animate()` or the second argument to `new Animation()`.

These APIs mirror the CSS `animation-timeline`, `scroll()`, and `view()` functions, giving JavaScript parity with the declarative CSS approach.

## Relationship to CSS Animations

`document.getAnimations()` returns all running animations on the document, including those started by CSS. WAAPI thus provides a unified introspection and control surface for animations regardless of origin.
