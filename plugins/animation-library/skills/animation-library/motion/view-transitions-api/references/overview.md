# View Transitions API — Overview

## What it is

A browser-native API that animates the visual transition between two DOM states — or two page navigations — without requiring any JavaScript animation library. The engine takes a bitmap snapshot of the "old" state, renders the "new" state, then cross-fades between them using CSS-controlled pseudo-elements.

## Two distinct modes

### Level 1 — Same-document (SPA)
Triggered programmatically via `document.startViewTransition(callback)`. The callback performs the DOM mutation; the browser handles the snapshot and animation.

Supported in all major engines (Baseline). Chrome 111, Edge 111, Safari 18.0, Firefox 144.

### Level 2 — Cross-document (MPA)
Triggered automatically when navigating between pages that both opt in via:
```css
@view-transition { navigation: auto; }
```
No JavaScript required on either page. The browser coordinates the transition across the old-page unload and new-page load lifecycle.

Supported in Chromium (Chrome 126+, Edge 126+) and Safari 18.2+. **Not supported in Firefox** as of April 2026.

## Core mechanics

1. Browser captures a screenshot of the current page — the "old" snapshot.
2. DOM update runs (callback or page navigation).
3. Browser captures the "new" state.
4. Both snapshots are placed in a top-layer `::view-transition` tree of pseudo-elements.
5. Default: cross-fade. Custom: override with `@keyframes` targeting `::view-transition-old(name)` / `::view-transition-new(name)`.
6. Individual elements can be tagged `view-transition-name: foo` to animate independently as "shared elements" (morph from old position/size to new).

## Level 2 additions (editor's draft, partial browser support)
- Cross-document navigation transitions (opt-in CSS at-rule)
- `:active-view-transition` / `:active-view-transition-type()` pseudo-classes
- `view-transition-class` for shared group styling
- Nested transition groups (`view-transition-group` property)
- Scoped (element-level) view transitions — `element.startViewTransition()`
