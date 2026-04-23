# Lenis — Differentiators

Compared against the full 30-library dossier (motion/, rendering/ buckets). Focus is on libraries where the comparison is non-obvious.

---

## vs. GSAP ScrollTrigger

ScrollTrigger is a **scroll animation** plugin — it drives property tweens as a function of scroll progress. Lenis is a **scroll behavior** library — it changes how the scroll position itself moves (lerp interpolation). They are complementary, not competitive:

- The standard production pattern: Lenis owns scroll position → `lenis.on('scroll', ScrollTrigger.update)` → ScrollTrigger reads Lenis's interpolated scroll value for all tween scrubbing.
- ScrollTrigger's `ScrollSmoother` plugin is an alternative to Lenis but requires GSAP Business license history context and is GSAP-ecosystem-only. Lenis is license-agnostic and framework-agnostic.
- If you use GSAP + Lenis, you get precise animation timing AND smooth scroll. If you use ScrollTrigger alone with native scroll, you lose the smooth feel on wheel input.

## vs. motion (`useScroll`)

Motion's `useScroll()` hook reads native browser scroll position and drives `MotionValue` updates declaratively. It is React-only and state-model-driven.

- Lenis + `useLenis()` hook integrates directly: listen to `scroll` event and update any state or MotionValue.
- `useScroll()` alone gives you native scroll speed — no lerp, no momentum. Combine with Lenis via `frame.update` for smooth MotionValues.
- Motion's `<AnimatePresence>` / `<motion.div>` declarative model is at a different abstraction level than Lenis's imperative scroll engine.
- Motion is React-only; Lenis is framework-agnostic.

## vs. WAAPI ScrollTimeline

`animation-timeline: scroll()` / `ScrollTimeline` is a browser-native API to link CSS animation progress to scroll position — zero JS, zero KB.

- WAAPI ScrollTimeline does **not** smooth the scroll position itself; it only links animation progress to native scroll. You get no lerp/momentum.
- Lenis + GSAP ScrollTrigger replaces what WAAPI ScrollTimeline does for scroll-driven animations, but adds the smooth feel.
- WAAPI ScrollTimeline is the zero-dependency choice for simple scroll-linked CSS animations. Lenis is the choice when you need interpolated scroll or WebGL sync.
- Browser support for ScrollTimeline: Chrome 115+, Firefox 110+, Safari 18+. WAAPI is progressive-enhancement-friendly; Lenis is all-or-nothing.

## vs. use-gesture

`use-gesture` captures pointer/touch/wheel **gesture deltas** — it does not manage scroll position. Lenis manages scroll position using wheel/touch input.

- These libraries operate at different levels: use-gesture gives you raw `deltaY` to do anything with; Lenis uses `deltaY` internally to drive lerped scroll.
- Use-gesture is the right choice for drag, pinch, or swipe gestures that don't map to page scroll (carousels, sliders, canvas interactions).
- Combining them is valid: use-gesture for non-scroll interactions, Lenis for scroll behavior.

## vs. react-transition-group / animate.css / tailwindcss-animate / tw-animate-css / tailwindcss-motion

These libraries animate **element state** (enter/exit, class toggles, keyframe sequences). They have zero overlap with Lenis's domain of **scroll position behavior**. Lenis pairs with them; they don't replace each other.

## vs. auto-animate

`@formkit/auto-animate` uses ResizeObserver + WAAPI to animate list/DOM mutations. No overlap with scroll behavior. Complementary.

## vs. Theatre.js / Popmotion / react-spring / anime

All are **animation value** libraries — they interpolate numbers for CSS properties, canvas draws, or React state. None touch scroll position behavior. All integrate with Lenis via the `scroll` event.

## vs. Locomotive Scroll (v5)

Not a competitor. Locomotive Scroll v5 (2024) is a thin wrapper over Lenis. Its scroll engine *is* Lenis (`lenisInstance` is exposed directly). Locomotive adds IntersectionObserver-driven class triggers and `data-scroll-speed` parallax on top of Lenis. If you don't need those extras, use Lenis directly — it's lighter and has no extra abstraction layer.

## vs. rendering/ libraries (lottie, rive, r3f, three.js, babylon, pixi, konva, fabric, p5, phaser)

No category overlap. All rendering libraries benefit from Lenis's scroll event because it provides a stable, interpolated scroll value for WebGL/canvas scene sync. Lenis is infrastructure; these are rendering targets.

## Unique Lenis strengths

1. **Category standard** — ~420 K weekly npm downloads; embedded in Locomotive Scroll v5; used in production by major agencies globally.
2. **True zero dependencies** — no tree-shaking needed; the core module has 0 runtime npm deps.
3. **Sub-4 kB gz core** — smallest footprint of any full-featured smooth-scroll library.
4. **First-party framework packages** — React, Vue, Nuxt, and Framer integrations ship from the same npm package (no third-party maintenance risk).
5. **WebGL sync origin** — designed from day one for syncing DOM scroll to WebGL RAF loops; this is more reliable than hacking `window.scrollY` in a `requestAnimationFrame`.
6. **Programmatic scroll control** — `lenis.stop()`, `lenis.start()`, `lenis.scrollTo()` with per-call easing/duration/lock options; no equivalent in CSS-based or WAAPI approaches.
