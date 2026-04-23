# React Spring — Differentiators vs. Sibling Libraries

## vs. motion (Framer Motion)

- **Spring model:** Both support spring physics, but react-spring's spring is the *only* animation primitive. Motion uses springs as one config option among cubic-bezier curves, keyframes, and tween durations. react-spring's springs also use `mass`/`tension`/`friction`; Motion's use `stiffness`/`damping`/`mass` (different defaults, same physics model).
- **Layout animation:** Motion has built-in `layout` prop for shared-element and auto-layout transitions. react-spring has no layout animation system.
- **Gestures:** Motion bundles gesture (drag, pan, hover) support; react-spring does not — pair it with `@use-gesture/react` (same pmndrs org).
- **Re-renders:** react-spring's imperative API drives the DOM directly without React re-renders per frame. Motion similarly skips React reconciler for transforms but keeps state in React.
- **Bundle:** `@react-spring/web` ~19 kB gz; `motion` ~34 kB gz (estimate / training-data extrapolation — verify at bundlephobia if precision matters).

## vs. popmotion

popmotion is the low-level animation engine that historically powered Framer Motion. react-spring is the *consumer-facing* React library; popmotion is imperative and framework-agnostic. If you need raw spring simulation without React bindings, popmotion is lighter. react-spring wraps its own internal spring engine (not popmotion).

## vs. react-three-fiber (+ drei)

react-three-fiber (R3F) handles 3D scene management; it does not animate values. `@react-spring/three` is the official spring animation layer for R3F — it exports `animated` wrappers for Three.js mesh properties (`position`, `rotation`, `scale`, `material.opacity`, etc.) and runs spring updates inside the R3F render loop. This is react-spring's strongest exclusive advantage over Motion in the R3F ecosystem.

## vs. GSAP

GSAP is timeline-first — sequences, scrubbing, scroll-linking. react-spring is spring-physics-first with no native timeline concept. `useChain` provides basic sequencing but cannot scrub or pause a timeline at an arbitrary progress value. For game-quality, director-controlled animation, GSAP wins. For natural interactive UIs, react-spring wins.

## vs. Theatre.js

Theatre.js is a visual animation editor with a timeline GUI targeting precise, keyframed, director-driven motion (trailers, landing pages). react-spring targets developer-driven, interactive, physics-based UI animation. They rarely compete for the same use case.

## vs. anime (v4)

anime.js is a lightweight tween engine with a rich keyframe/stagger API and SVG path animation support. react-spring has no SVG path morphing, no keyframe sequences. anime.js lacks React-native integration or direct DOM-bypass rendering.

## vs. auto-animate (@formkit)

auto-animate is a zero-config, drop-in library for list/layout transitions. react-spring requires explicit style wiring but gives full control. auto-animate is appropriate when "good enough" transitions with no configuration are the goal; react-spring when control and physics matter.

## vs. Rive / Lottie

Rive and Lottie animate prebuilt, designer-authored assets (Rive's state machines, Lottie's AE exports). react-spring animates arbitrary CSS/JS values defined by the developer. They address different workflow stages and are not direct alternatives.

## vs. tailwindcss-animate / tailwindcss-motion / tw-animate-css

CSS-class animation libraries with zero JS runtime. react-spring requires JS and a runtime. The Tailwind options are appropriate for simple, non-interactive transitions; react-spring for physics-feel, interactive, or dynamically computed animations.

## vs. Web Animations API (WAAPI) / View Transitions API

WAAPI is the browser-native animation API; react-spring targets it conceptually but runs its own spring engine. react-spring is cross-browser consistent and React-integrated. WAAPI is useful when no build tooling is available or bundle size is critical. View Transitions API handles page-level route transitions, not component-level spring values — complementary, not competing.

## vs. Remotion

Remotion renders React components to video. react-spring can supply animated values to Remotion compositions, but they serve different output formats (interactive UI vs. rendered video).
