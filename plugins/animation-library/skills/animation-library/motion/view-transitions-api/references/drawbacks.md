# View Transitions API — Drawbacks & Gotchas

## Browser support gaps

**Same-document (Level 1):** Firefox shipped in v144 (2025). All major engines now support it (~91% global). Safe to use with a synchronous fallback.

**Cross-document (Level 2):** Firefox has no support as of April 2026 (bug #1860854 open). This means ~13% of desktop browsing sessions get no cross-document transition — they see an instant page swap. For audiences with significant Firefox share, cross-document VTA must be treated as progressive enhancement only.

## Cross-document complexity — opt-in symmetry
Both the outgoing page *and* the incoming page must include `@view-transition { navigation: auto; }`. In CMS or third-party environments where you do not control all pages, cross-document transitions simply will not activate.

## SPA routing integration
Integrating `startViewTransition()` into React Router, Next.js App Router, or Vue Router requires wrapping the router's navigation callbacks. This is non-trivial: async transitions, concurrent renders (React 18+), and Suspense boundaries all interact with VTA in ways that require careful sequencing. Frameworks are adding native support (React Router 6.x, Astro 3+ built-in), but integration quality varies.

## Duplicate `view-transition-name` crashes the animation
If two elements share the same `view-transition-name` at snapshot time, the browser silently skips that element's transition (no error thrown). In dynamic lists this is a common source of silent failures; names must be injected and cleaned up with precision around each `startViewTransition()` call.

## No spring physics or gesture tracking
VTA only supports CSS easing functions. There is no way to connect a pointer event or scroll position to a mid-transition animation state. For gesture-driven transitions (swipe-to-go-back), native browser back/forward navigation may animate (on iOS Safari), but you cannot drive a VTA mid-gesture.

## Capture cost on complex pages
For very large pages with many layers, taking a GPU-composited screenshot of the old state has a measurable frame cost. The snapshot is synchronous with the rendering pipeline — a page with hundreds of `will-change: transform` layers may hitch on transition start. Mitigate by limiting `view-transition-name` to the elements that actually need to morph.

## `prefers-reduced-motion` not automatically respected
The API does not disable animations when `prefers-reduced-motion: reduce` is set. Authors must add explicit media query overrides or the animation runs regardless of OS accessibility settings. This is a WCAG risk if overlooked.

## `::view-transition` sits in the top layer
The transition pseudo-elements are rendered above `z-index` stacking contexts, including fixed headers and modals. During the transition frame, fixed-position UI may visually "double" (once in the live page, once in the snapshot). Requires careful `view-transition-name` assignment on headers to suppress their default root snapshot inclusion.

## Level 2 spec still in editor's draft
Scoped element-level transitions (`element.startViewTransition()`), nested transition groups, and `view-transition-class` are Level 2 features. The spec is an editor's draft (not yet a formal W3C WD), and implementation completeness in Chromium/Safari varies. Treat Level 2 features as experimental beyond the `@view-transition { navigation: auto; }` opt-in.
