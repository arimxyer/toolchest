# Anime.js v4 — Differentiators

Compared specifically to sibling libraries: gsap, motion (fka Framer Motion), and waapi (raw Web Animations API).

## vs. GSAP

- **License**: Anime.js is MIT (fully free, including commercial use, no Club membership needed). GSAP requires a paid license for some plugins (ScrollTrigger, MorphSVG, etc.) in commercial products.
- **Size**: Anime.js full bundle ~36 KB gzip vs. GSAP ~27 KB gzip for core (GSAP is slightly smaller core but Anime.js is modular — use only what you need).
- **WAAPI backend**: Anime.js ships `waapi.animate()` as a compositing fast-path (~3 KB). GSAP does not expose a WAAPI backend.
- **API parity**: GSAP has a larger ecosystem (ScrollTrigger, Flip, SplitText plugins). Anime.js ships `splitText` and `Draggable` natively in v4. For scroll-linked animation, GSAP ScrollTrigger has no Anime.js equivalent.
- **Verdict**: GSAP wins on ecosystem depth; Anime.js wins on zero licensing friction and modular tree-shaking.

## vs. motion (fka Framer Motion)

- **React coupling**: motion v11+ is React-first (though Motion One for vanilla exists). Anime.js is framework-agnostic with zero framework coupling.
- **Layout animation**: motion's `layout` prop and `AnimatePresence` handle DOM reflow animations that Anime.js cannot.
- **Gesture integration**: motion provides drag, hover, tap gesture recognizers tightly integrated with animation state. Anime.js has a Draggable module but no gesture-physics integration.
- **Spring physics**: motion has first-class spring physics with stiffness/damping/mass driving real spring interpolation. Anime.js has spring easing as an easing function, not a physics simulation.
- **Verdict**: motion is the right choice inside React component trees with layout or gesture needs. Anime.js is better for complex, sequenced, timeline-driven motion outside or alongside a framework.

## vs. raw WAAPI (Web Animations API)

- **DX gap**: Raw WAAPI requires verbose `element.animate([...keyframes], options)` calls with no stagger, no timeline sequencing, no object/SVG animation, no named easings.
- **Anime.js wraps WAAPI**: The `waapi.animate()` submodule gives you Anime.js's declarative API (stagger, named easings, callbacks, loop controls) while delegating to the browser's WAAPI for hardware-composited execution.
- **Coverage**: Raw WAAPI only works on DOM elements. Anime.js `animate()` also targets plain JS objects, SVG attributes, and Canvas state.
- **Verdict**: Prefer Anime.js `waapi.animate()` over raw WAAPI whenever you need stagger, timeline, or reusable playback controls. Use raw WAAPI only for the absolute minimal footprint (0 KB library) with simple one-shot animations.

## vs. auto-animate (@formkit)

- auto-animate is a one-liner for element add/remove/move transitions with zero configuration. Anime.js does not do enter/exit lifecycle animations automatically.
- Use auto-animate for list reordering; use Anime.js for explicitly scripted motion sequences.

## Unique strengths

- Built-in `splitText()` for char-level text animation — no separate dependency.
- `Scope` API for component-scoped animation teardown (critical for SPA frameworks).
- Dual-backend design: choose JS engine (full features) or WAAPI (composited) per animation.
- Full TypeScript types shipped first-party in v4.
- MIT license with zero commercial restrictions.
