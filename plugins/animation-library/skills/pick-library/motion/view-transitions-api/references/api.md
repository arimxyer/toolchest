# View Transitions API — API Reference

## JavaScript API

### `document.startViewTransition(updateCallback)`
Returns a `ViewTransition` object. `updateCallback` is a function (sync or async) that mutates the DOM.

```js
const transition = document.startViewTransition(() => {
  // perform DOM update here
  updateDOM();
});
```

### `ViewTransition` object
| Property / method | Description |
|---|---|
| `transition.ready` | Promise resolves when pseudo-elements are created and the animation begins |
| `transition.finished` | Promise resolves when the transition completes and pseudo-elements are removed |
| `transition.updateCallbackDone` | Promise resolves when the callback completes |
| `transition.skipTransition()` | Abort the animation immediately, jump to new state |
| `transition.types` | `DOMTokenList` — set transition types to drive `:active-view-transition-type()` selectors (Level 2) |

### Feature detection
```js
if (!document.startViewTransition) {
  updateDOM(); // fallback: instant swap
} else {
  document.startViewTransition(updateDOM);
}
```

## CSS API

### Tagging elements for shared-element animation
```css
.card { view-transition-name: card-hero; }
```
Each `view-transition-name` must be unique per snapshot. Dynamic assignment via inline style or JS before the transition fires.

### Pseudo-element tree
```
::view-transition
  ::view-transition-group(root)
    ::view-transition-image-pair(root)
      ::view-transition-old(root)   /* old screenshot */
      ::view-transition-new(root)   /* new live content */
```

### Customizing animation
```css
/* Slow down the default cross-fade */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 400ms;
}

/* Slide instead of cross-fade */
@keyframes slide-in {
  from { transform: translateX(100%); }
}
@keyframes slide-out {
  to { transform: translateX(-100%); }
}
::view-transition-old(root) { animation: 300ms ease-out slide-out; }
::view-transition-new(root) { animation: 300ms ease-out slide-in; }
```

### Opt in to cross-document transitions (Level 2)
```css
/* Add to BOTH the old page and the new page */
@view-transition {
  navigation: auto;
}
```

### Disabling reduced-motion
```css
@media (prefers-reduced-motion) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

## `view-transition-name` constraints
- Value must be a CSS `<custom-ident>` — cannot be `none` or `auto`.
- Must be unique across all elements captured in the same snapshot; duplicate names cause VTA to skip the transition for those elements.
- For dynamic lists, set the name via JS immediately before `startViewTransition()`, then clear it after.

## `prefers-reduced-motion` behavior
The API itself does not auto-disable animations when `prefers-reduced-motion: reduce` is set. Authors must add a media query override explicitly.
