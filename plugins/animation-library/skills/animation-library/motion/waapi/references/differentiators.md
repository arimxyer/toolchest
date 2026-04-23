# WAAPI — Differentiators vs. Sibling Libraries

## vs. motion (fka Framer Motion)

motion wraps WAAPI internally for its `animate()` utility (not the React `<motion.*>` component, which uses its own hybrid). WAAPI gives you the raw primitive; motion adds springs, layout animations (FLIP), gesture bindings, and React lifecycle integration. Choose WAAPI when you have no React dependency or when you want zero runtime overhead; choose motion when you need spring physics, `<AnimatePresence>`, or layout animations.

## vs. anime (v4)

anime.js is a thin, ergonomic wrapper over WAAPI and requestAnimationFrame. It adds sequencing (`.then()` chains), SVG path morphing, and a more concise API. If you find WAAPI's verbosity annoying for multi-step timelines but don't want the weight of GSAP, anime is the middle ground. Pure WAAPI is faster to load; anime is faster to write.

## vs. gsap

GSAP does not use WAAPI internally by default (it uses its own RAF-based engine for broader control). GSAP's killer features are its Timeline (sequencing, callbacks, labels), ScrollTrigger plugin (with Firefox support WAAPI's ScrollTimeline currently lacks), and a massive plugin ecosystem. WAAPI is the right choice only for simple cases or when GSAP's license terms are a concern. For complex scroll-driven animation with cross-browser requirements, GSAP ScrollTrigger is materially stronger today.

## vs. react-spring

react-spring is physics-first (springs, damping, mass). WAAPI uses easing curves, not physics. They are solving different problems — WAAPI for CSS-keyframe-style control, react-spring for organic, interruptible motion that feels physical. No overlap in use-case; both can coexist.

## vs. popmotion

popmotion is the animation engine under motion. It provides spring, decay, and keyframes as reactive streams. WAAPI has no spring; popmotion has no scroll timeline. Complementary rather than competitive.

## vs. tailwindcss-animate / tw-animate-css / tailwindcss-motion

These are CSS-class-based wrappers around CSS Animations (not WAAPI). No JS playback control. Use them for fire-and-forget entrance/exit classes driven by Tailwind. Use WAAPI when you need programmatic control (pause, seek, rate).

## vs. view-transitions-api

The View Transitions API (browser-native, no npm) handles page/component transitions via DOM snapshot diffing — fundamentally different use case. It uses CSS animations under the hood but isn't a general-purpose animation API. WAAPI can be used alongside it to extend transition animations via `document.startViewTransition()` callbacks.

## vs. theatre (Theatre.js)

Theatre.js has a visual studio for authoring multi-object, multi-track animations with designer collaboration in mind. WAAPI is code-only with no visual tooling. Theatre.js internally can drive CSS properties but is a much higher-level tool aimed at production-quality web experiences and interactive 3D scenes (r3f).

## vs. rive / lottie

Both are vector animation runtimes with their own binary formats (Rive's `.riv`, Lottie's JSON). WAAPI animates DOM/CSS properties; it cannot reproduce the kind of artboard-level vector animation these tools provide. Completely different problem spaces.

## vs. react-three-fiber + drei

r3f animates Three.js scene objects (meshes, lights, cameras) via a React reconciler. WAAPI animates DOM/CSS properties. No overlap; they could coexist in the same page.

## vs. remotion

Remotion renders React components to video frames. WAAPI is for live browser animation. Different runtime target entirely.

## Key takeaway

WAAPI is the primitive others (motion, anime) build on or polyfill around. Use it directly for simplicity and zero cost; use a library when you need its specific additions (springs, sequencing, visual tooling, cross-browser scroll support).
