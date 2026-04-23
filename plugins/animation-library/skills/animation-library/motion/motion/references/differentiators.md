# Motion — Differentiators vs Sibling Libraries

References the full dossier list: motion · gsap · anime (v4) · auto-animate · react-spring · theatre · rive · lottie · tailwindcss-animate · tw-animate-css · tailwindcss-motion · view-transitions-api · waapi · react-three-fiber · remotion · popmotion

---

## vs react-spring

Both are physics-first React animation libraries. Key differences:

- **Layout animations**: Motion has first-class `layout` / `layoutId` props that auto-detect DOM geometry changes. react-spring has no layout-animation equivalent.
- **Gesture system**: Motion's `whileHover`, `whileDrag`, `drag` props are built-in; react-spring requires pairing with `@use-gesture/react`.
- **Exit animations**: Motion's `<AnimatePresence>` handles unmount animations declaratively. react-spring uses `useTransition`, which requires more manual key management.
- **Engine**: Motion uses a WAAPI hybrid (GPU path available). react-spring is purely JS-driven.
- **API surface**: Motion is prop-driven; react-spring is hook-centric (`useSpring`, `useSprings`, `useTrail`), which gives finer per-value control but is more verbose.

## vs gsap

- **React integration**: Motion is React-native (declarative JSX). GSAP is imperative and requires `useGSAP` / ref wiring in React — more boilerplate but more control.
- **Timeline sequencing**: GSAP's `Timeline` API is purpose-built for precise, multi-step sequenced animation. Motion has no equivalent; `useAnimate` is limited to sequential calls, not a scrub-able timeline.
- **Plugin ecosystem**: GSAP's ScrollTrigger, SplitText, DrawSVG, MorphSVG are mature and production-proven. Motion has no plugin layer.
- **Performance ceiling**: GSAP can be faster for thousands of independently animated DOM nodes; Motion's per-component overhead accumulates.
- **License**: GSAP's premium plugins require a paid license for non-Codepen use. Motion is MIT.
- **Bundle**: GSAP core is ~27 kB gzipped vs Motion's ~34 kB for the full `motion.div` path (smaller with LazyMotion).

## vs waapi (Web Animations API)

- Motion's hybrid engine **uses WAAPI internally** for hardware-accelerated properties. Using bare WAAPI saves the Motion overhead (~34 kB), but you lose the declarative React API, spring physics, layout animations, and gesture handling.
- WAAPI has no spring easing built in; Motion adds that on top.
- WAAPI scroll animation (ScrollTimeline) has limited browser support; Motion polyfills the JS fallback transparently.

## vs popmotion

Popmotion is the ancestor — it was absorbed into Motion's internals and is no longer independently maintained. There is no reason to reach for popmotion directly; its spring and tween primitives are available inside Motion.

## vs anime (v4)

- Anime v4 is a lightweight (~14 kB gzipped) JS timeline library. It is not React-native; integration requires refs.
- Motion has richer layout/gesture/exit animation support. Anime has a more expressive timeline DSL (`.add()` chaining, seeking) closer to GSAP.
- Anime v4 rewrote to WAAPI-first in 2024; the runtime philosophies have converged but the API surface and React story differ.

## vs auto-animate (@formkit)

- auto-animate is a single-function drop-in (`autoAnimate(parentEl)`) for list/item add-remove transitions. Zero configuration.
- Motion's layout animations are more powerful (spring control, `layoutId` hero animations) but require explicit `layout` prop and more setup.
- For simple list reorder/add/remove, auto-animate has a much lower integration cost.

## vs tailwindcss-animate / tw-animate-css / tailwindcss-motion

- CSS-class animation utilities: zero JS runtime cost, no React dependency. They cover enter/exit keyframe presets.
- No interactivity (drag, scroll-linked), no spring physics, no layout animation, no shared-element transitions.
- Right for simple page-load entrance effects; Motion is required once animation reacts to user input or DOM geometry.

## vs view-transitions-api

- View Transitions API is browser-native (zero JS library cost) for page/component transitions. It is the right tool for MPA route changes.
- No spring physics, no gesture control, limited programmatic control, poor browser support outside Chrome as of 2026.
- Motion's `layoutId` offers similar shared-element transitions with broader support and React state integration.

## vs theatre (Theatre.js)

- Theatre.js provides a visual timeline editor for sequenced, authored animation — comparable to After Effects in the browser.
- Motion has no scrub-able timeline; Theatre.js has no declarative React gesture/layout system.
- They are complementary: Theatre for authored cinematic sequences, Motion for interactive UI animation.

## vs rive / lottie

- Rive and Lottie play pre-authored animation assets (state machines / JSON from After Effects). Runtime behavior is authored in a design tool.
- Motion is for code-driven animation logic that reacts to app state, user gestures, and DOM changes.
- Rive has its own high-performance runtime (WebAssembly + Canvas/WebGL); Lottie renders SVG/Canvas from JSON.

## vs remotion

- Remotion is for rendering React components to MP4/video. Frame-accurate, non-interactive.
- Motion targets live interactive UI. They do not overlap.

## vs react-three-fiber (+ drei)

- r3f animates in a WebGL canvas via a Three.js render loop. Motion targets the DOM/SVG layer.
- They can coexist: r3f for 3D scenes, Motion for UI chrome around the canvas.
