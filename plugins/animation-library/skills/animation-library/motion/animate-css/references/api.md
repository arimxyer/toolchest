# animate.css — API Reference

## Class pattern

```
animate__animated  [required] — triggers the animation
animate__<name>    [required] — selects the keyframe effect
animate__infinite  [optional] — loops indefinitely
animate__delay-Xs  [optional] — delays: 1s, 2s, 3s, 4s, 5s (utility classes)
animate__slow      [optional] — 2s duration
animate__slower    [optional] — 3s duration
animate__fast      [optional] — 800ms duration
animate__faster    [optional] — 500ms duration
```

## Custom properties

Override per-element timing without touching the stylesheet:

```css
.my-element {
  --animate-duration: 400ms;
  --animate-delay: 0.5s;
  --animate-repeat: 2;
}
```

| Property | Default | Effect |
|---|---|---|
| `--animate-duration` | `1s` | Animation duration |
| `--animate-delay` | `0s` | Animation delay |
| `--animate-repeat` | `1` | `animation-iteration-count` |

## Utility classes (speed)

| Class | Duration |
|---|---|
| `animate__slow` | 2s |
| `animate__slower` | 3s |
| `animate__fast` | 800ms |
| `animate__faster` | 500ms |

## Utility classes (delay)

`animate__delay-1s` through `animate__delay-5s` in 1-second steps.

## Reduced motion

animate.css respects `prefers-reduced-motion`: all animations are disabled (replaced with a simple fade) for users who opt in to reduced motion via their OS.

```css
@media (prefers-reduced-motion: reduce) {
  .animate__animated {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

## JavaScript integration pattern

```js
function animateCSS(element, animation, prefix = 'animate__') {
  return new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
}

// Usage
animateCSS('.my-element', 'bounce');
```

## File variants shipped in the npm package

| File | Description |
|---|---|
| `animate.css` | Full unminified source |
| `animate.min.css` | Minified (~72 KB raw / ~5 KB gzip) |
| `animate.compat.css` | v3-compatible unprefixed class names (e.g. `.bounce` instead of `.animate__bounce`) |
| Individual files | `source/animate.css` split by animation for custom builds |

## Custom builds (Sass / PostCSS)

The source is organized as individual Sass partials. You can import only the animations you need:

```scss
@import "animate.css/source/_base.scss";
@import "animate.css/source/bouncing_entrances/_bounceIn.scss";
@import "animate.css/source/fading_exits/_fadeOut.scss";
```

This is the recommended approach for production — importing the full file loads ~80 keyframes you may never use.
