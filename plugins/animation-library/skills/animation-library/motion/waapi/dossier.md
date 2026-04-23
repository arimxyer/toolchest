---
name: waapi
description: Browser-native animation API (no bundle cost); reach for it when avoiding JS deps matters or when building scroll-driven effects in Chrome/Edge.
---
# Web Animations API (WAAPI)

## When to use

- Zero-dependency animation on elements where CSS alone is too rigid and a full library is overkill (e.g. a single micro-interaction or entrance effect).
- Performance-critical paths where every KB matters — no bundle cost, runs on the compositor thread.
- Building a custom animation library or polyfill layer on top of a native primitive.
- Scroll-driven animations (scroll progress → playback) in Chromium-first projects where Firefox parity is deferred (ScrollTimeline / ViewTimeline, Chrome/Edge 115+).
- Fine-grained playback control: pause, reverse, seek to a specific time, or change playback rate imperatively without a third-party scheduler.
- Animated SVG properties that are exposed as CSS animatable properties (transform, opacity, etc.).

## When NOT to use

- Cross-browser scroll-driven animations needed today — Firefox supports ScrollTimeline / ViewTimeline only behind a flag (as of April 2026); use GSAP ScrollTrigger or CSS `animation-timeline` with a polyfill instead.
- Physics-based / spring animations — WAAPI has no spring easing; reach for motion (Framer Motion), react-spring, or popmotion.
- Sequence-heavy timelines with many interdependent tracks — GSAP or Theatre.js are far less verbose.
- React / Vue component-lifecycle animations (mount/unmount, layout transitions) — motion or AutoAnimate handle this idiomatically.
- Teams that need a visual timeline editor or designer handoff — Theatre.js or Rive are more appropriate.

## Quick facts

- **Spec status:** Web Animations Level 1 — W3C Working Draft (June 5 2023, https://www.w3.org/TR/web-animations-1/). Scroll-driven Animations (ScrollTimeline / ViewTimeline) — Editor's Draft (Dec 17 2025, https://drafts.csswg.org/scroll-animations-1/).
- **License:** Web standard (no license; implemented in browsers)
- **Browser support:**
  - `Element.animate()` + `KeyframeEffect`: Baseline widely available — Chrome 84+, Edge 84+, Firefox 75+, Safari 13.1+, iOS Safari 13.4+, Samsung Internet 14+ (~95.5% global)
  - `ScrollTimeline` / `ViewTimeline`: Limited — Chrome 115+, Edge 115+, Safari 26+ (upcoming); Firefox behind flag only
- **Bundle size:** n/a (browser-native)
- **Runtime:** Browser-native; operates on DOM/SVG elements via CSS animatable properties; compositor-eligible transforms/opacity run off the main thread

## See also

- [Overview](references/overview.md)
- [API Reference](references/api.md)
- [Differentiators vs. siblings](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.html)
