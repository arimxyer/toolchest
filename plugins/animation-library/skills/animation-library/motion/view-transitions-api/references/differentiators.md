# View Transitions API — Differentiators

Compared to sibling libraries in this dossier.

## vs. motion (fka Framer Motion)
- **Shared-element / layout animations:** Framer Motion's `layoutId` prop handles shared-element morphing inside a React tree with spring physics and continuous updates. VTA handles shared-element via `view-transition-name`, but only across two discrete DOM states — not during live dragging or continuous layout changes.
- **Bundle cost:** motion ships ~18 kB gzipped for its core. VTA is zero bytes.
- **Framework coupling:** Framer Motion is React-first. VTA is framework-agnostic.
- **Physics:** motion supports spring and decay; VTA supports only CSS easing curves.

## vs. auto-animate (@formkit)
- auto-animate monitors DOM mutations and applies enter/exit/move animations automatically. VTA requires explicit `startViewTransition()` calls (same-document) or CSS opt-in (cross-document) — no automatic mutation watching.
- auto-animate works today in Firefox; same-document VTA also works in Firefox 144+. Cross-document VTA does not work in Firefox.
- auto-animate adds ~2.5 kB; VTA adds zero.

## vs. WAAPI (Web Animations API)
- WAAPI (`element.animate(keyframes, options)`) gives fine-grained, timeline-controlled, per-element animations. VTA is a higher-level abstraction over WAAPI — the browser uses WAAPI under the hood to drive the pseudo-element transitions.
- VTA is easier for full-page transitions; WAAPI is better for micro-interactions, scroll-linked effects, and timeline sequencing.
- Both are zero-dependency browser APIs.

## vs. GSAP
- GSAP offers a mature timeline API, scroll triggers, morphSVG, and broad cross-browser history. VTA has no timeline control or scroll integration.
- GSAP is a JavaScript library (~30 kB minified core); VTA is browser-native.
- GSAP has its own licensing (free for most uses, commercial for Club plugins). VTA has no license.

## vs. anime (v4)
- anime provides a JS animation engine with sequencing, staggering, spring, and SVG path animation. VTA has none of these.
- VTA wins on page-transition ergonomics for MPAs; anime requires hand-rolling with `onbeforeunload` and CSS class swaps.

## vs. Lottie / Rive
- Lottie and Rive animate self-contained graphic assets (After Effects / Rive Studio exports). VTA animates the DOM itself. Not competing use cases.

## vs. tailwindcss-animate / tw-animate-css / tailwindcss-motion
- These Tailwind plugins apply CSS `animation` classes to elements statically. VTA is dynamic, coordinating two DOM states. They can coexist: use Tailwind animate for enter/exit of individual components; use VTA for page-level transitions.

## vs. react-spring / react-three-fiber / remotion / Theatre.js
- react-spring: spring physics for React state changes; no page-transition concept.
- react-three-fiber: 3D canvas animations; entirely different domain.
- remotion: programmatic video rendering, not browser UI transitions.
- Theatre.js: timeline-based sequencing for complex productions; no page-transition concept.

## Unique position
VTA is the **only** option in this list that enables MPA cross-document animations without any JavaScript on the page. For server-rendered sites (Astro, Next.js static, plain HTML) where minimizing JS is a goal, VTA is the sole path to animated page transitions.
