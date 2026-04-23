# animate.css — Overview

## What it is

animate.css is a library of ready-to-use, cross-browser CSS animations. It exposes ~80 named keyframe animations as utility classes. You apply `animate__animated` plus an effect class (e.g. `animate__bounce`) to any element and the animation plays once on load, or on class toggle via any mechanism.

## Status

Feature-complete. The last release (v4.1.1) shipped 2020-09-07. The maintainer (Daniel Eden, now at Meta) has stated the project is intentionally stable. No new animations, easings, or features are planned. The repo remains open for bug fixes but has had no releases since v4.1.1.

Despite the freeze, npm records ~574K weekly downloads (measured 2026-04-22), confirming it remains embedded in production pipelines worldwide. GitHub stars: 82.5K — the most-starred pure-CSS animation project in existence.

## Design philosophy

- CSS-only: every animation is a `@keyframes` block; no JavaScript ships.
- Class-based: a two-class pattern (`animate__animated` + `animate__<effect>`) keeps the API discoverable.
- Custom properties: `--animate-duration`, `--animate-delay`, `--animate-repeat` let you override timing without rewriting CSS rules.
- Namespaced: v4 moved from bare class names (`.bounce`) to prefixed ones (`.animate__bounce`) to avoid collisions.

## Animation categories

| Category | Examples |
|---|---|
| Attention seekers | bounce, flash, pulse, rubberBand, shakeX, shakeY, tada, wobble, jello, heartBeat |
| Back entrances/exits | backInDown, backOutUp, etc. |
| Bouncing entrances/exits | bounceIn, bounceOut, bounceInDown, etc. |
| Fading entrances/exits | fadeIn, fadeOut, fadeInDown, fadeInLeft, etc. |
| Flippers | flip, flipInX, flipInY, flipOutX, flipOutY |
| Lightspeed | lightSpeedInRight, lightSpeedOutLeft, etc. |
| Rotating entrances/exits | rotateIn, rotateOut, rotateInDownLeft, etc. |
| Specials | hinge, jackInTheBox, rollIn, rollOut |
| Zooming entrances/exits | zoomIn, zoomOut, zoomInDown, etc. |
| Sliding entrances/exits | slideInDown, slideOutLeft, etc. |

## Installation

```bash
npm install animate.css
```

Or CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css"/>
```

## Basic usage

```html
<div class="animate__animated animate__fadeInDown">Hello</div>
```

Toggle on demand:
```js
el.classList.add('animate__animated', 'animate__bounce');
el.addEventListener('animationend', () => {
  el.classList.remove('animate__animated', 'animate__bounce');
});
```
