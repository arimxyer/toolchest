---
name: lenis
description: Lightweight smooth-scroll engine (≤4 kB gz) for WebGL sync, parallax, and GSAP ScrollTrigger integration; the category standard in 2026.
---
# Lenis

## When to use

- You need silky smooth scrolling to synchronize DOM scroll position with WebGL / Three.js / R3F scenes — Lenis's `scroll` event fires after interpolation, giving you a lag-free sync point.
- Building a creative/portfolio site with GSAP ScrollTrigger scrub animations — Lenis + ScrollTrigger is the community-standard stack; the integration is officially documented and battle-tested.
- You want smooth scroll with zero dependencies and minimal footprint (≤4 kB gz core, 0 npm deps).
- Implementing horizontal scroll, infinite scroll, or programmatic `scrollTo()` with custom easing on any viewport.
- You're in Vue/Nuxt or React and need the ecosystem's best-supported smooth-scroll primitive (`lenis/react`, `lenis/vue`, `lenis/nuxt` — all first-party).
- Replacing Locomotive Scroll v4: Locomotive Scroll v5 is itself a thin wrapper over Lenis, so migrating directly gives you the same scroll engine with less overhead.

## When NOT to use

- Your project requires CSS `scroll-snap` — Lenis does not support native scroll-snap; use `lenis/snap` (separate package, first-party) or remove Lenis and use CSS natively.
- Accessibility is a hard constraint with reduced-motion users as a primary audience — scroll hijacking overrides native browser scroll behavior; Lenis provides no automatic `prefers-reduced-motion` guard, requiring manual opt-out code.
- SSR/static-only output with no client hydration — Lenis is a DOM runtime; it cannot run on the server and must be guarded or lazy-loaded in SSR frameworks.
- Simple page with one or two fade-in entrance animations — the scroll interpolation overhead is not justified; use `IntersectionObserver` + CSS or WAAPI instead.
- You need scroll-snap with physics or snapping to dynamic content — stick to native CSS scroll-snap or `lenis/snap`.

## Quick facts

| Field | Value |
|---|---|
| Version researched | 1.3.23 (released 2026-04-15) |
| License SPDX + cost | MIT — free for all uses, commercial included |
| Framework support | Vanilla JS (primary), React (`lenis/react` — `<ReactLenis>` + `useLenis()`), Vue 3 (`lenis/vue` — `<VueLenis>` + `useLenis()` + global plugin), Nuxt 3 (`lenis/nuxt` — module in `nuxt.config.js`), Framer (no-code plugin at lenis.framer.website) |
| Bundle size (gzipped) | Core: ~4 kB gz (homepage claim; Bundlephobia did not render metric — estimate). `lenis.min.js` is 17.3 kB uncompressed on disk (all formats + types = 428 kB unpacked). 0 runtime dependencies. |
| Runtime | DOM scroll hijack — intercepts `wheel` and `touch` events, interpolates scroll position via `lerp` on each RAF tick, and applies the result via `transform: translateY()` on the content element. Browser-only; no SSR output. |

## See also

- [Overview](references/overview.md)
- [API Reference](references/api.md)
- [Differentiators](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.ts)
