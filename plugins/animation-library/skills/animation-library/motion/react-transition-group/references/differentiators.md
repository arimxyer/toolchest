# react-transition-group — Differentiators vs Sibling Libraries

References the full dossier list: motion · gsap · anime · auto-animate · react-spring · theatre · popmotion · tailwindcss-animate · tw-animate-css · tailwindcss-motion · view-transitions-api · waapi · lenis · use-gesture · react-transition-group · animate-css · lottie · rive · react-three-fiber · remotion · three-js · babylon-js · pixi-js · pixi-react · konva · react-konva · fabric-js · p5-js · phaser · react-three-rapier

---

## vs motion (AnimatePresence) — the modern replacement

**Motion's `<AnimatePresence>` is the direct replacement for react-transition-group's mount/unmount pattern.**

- `<AnimatePresence>` wraps conditionally rendered children and automatically animates their exit before unmounting — the same fundamental job as `<CSSTransition unmountOnExit>`.
- Motion adds spring physics, GPU-accelerated properties via WAAPI, gesture integration, and layout animations. react-transition-group does none of this.
- Motion is **actively maintained** (v12+ as of 2026). react-transition-group is abandoned (last release 2022).
- API ergonomics: Motion is declarative via `initial`/`animate`/`exit` props on `<motion.div>`. react-transition-group requires wiring CSS classes or inline styles manually.
- For list transitions: Motion's `<AnimatePresence>` with mapped `<motion.li>` components, or layout animations with `layout` prop. react-transition-group uses `<TransitionGroup>` + `<CSSTransition>` with manual CSS.

**If you are choosing for new code: pick Motion.**

## vs react-spring (useTransition) — the physics alternative

- `useTransition` in react-spring is the hooks-equivalent for mount/unmount animations with spring physics.
- react-spring gives per-value spring control (tension, friction, mass); react-transition-group provides only timing-based states.
- Both handle keyed lists, but react-spring's `useSprings` / `useTrail` offer stagger and orchestration that react-transition-group lacks entirely.
- react-spring is actively maintained. react-transition-group is not.

**If you want physics on mount/unmount for new code: pick react-spring's `useTransition`.**

## vs animate-css — the CSS class-based partner

Animate.css is the natural complement to react-transition-group's `<CSSTransition>`. The library's `classNames` prop can directly reference Animate.css class names (e.g., `classNames={{ enterActive: 'animate__animated animate__fadeIn', exitActive: 'animate__animated animate__fadeOut' }}`). This pairing (react-transition-group + animate.css) is the classic "no-JS animation logic" stack in legacy React codebases. Neither library is actively maintained for new feature development, but animate.css is at least versioned and documented.

## vs tailwindcss-animate / tw-animate-css / tailwindcss-motion

- Tailwind-based animation utilities are CSS-only and zero-JS — they apply keyframe presets via utility classes.
- react-transition-group adds mount/unmount lifecycle state management that CSS alone cannot track. But the Tailwind `data-[state=...]` pattern (used by Radix UI, shadcn/ui) achieves the same result without a JS library.
- For new projects using Tailwind + Radix/shadcn, you likely do not need react-transition-group even for mount/unmount animations.

## vs gsap

- GSAP is an imperative timeline library with no mount/unmount lifecycle concept. Integrating GSAP for mount/unmount requires a `useGSAP` hook + manual unmount control (e.g., with `context.revert()`).
- react-transition-group's `onExit` / `onExiting` callbacks can drive a GSAP animation — this is a documented pattern in legacy codebases.
- GSAP is actively maintained and adds value; react-transition-group does not.

## vs auto-animate (@formkit)

- auto-animate is a single-function drop-in for list add/remove/reorder animations — `autoAnimate(parentRef.current)`.
- For simple list transitions, auto-animate replaces the `<TransitionGroup>` + `<CSSTransition>` pattern with one line and is actively maintained.

## vs waapi (Web Animations API)

- The bare WAAPI can drive enter/exit animations via `element.animate()` called inside `onEntering` / `onExiting` callbacks. react-transition-group's lifecycle callbacks are a thin wrapper around this use case.
- For new code, Motion's hybrid engine uses WAAPI internally with better DX and broader support.

## vs view-transitions-api

- View Transitions API handles route-level page transitions natively in the browser. It does not replace react-transition-group's component-level mount/unmount pattern.
- No overlap in use case; both can coexist, though for new projects Motion's `layoutId` handles both.

## vs lenis / use-gesture

- Lenis is a smooth-scroll runtime; use-gesture is a gesture binding library. Neither handles mount/unmount transitions. No meaningful comparison.

## vs rendering libraries (lottie, rive, react-three-fiber, remotion, etc.)

These operate in canvas/WebGL or video-rendering contexts. react-transition-group is DOM/CSS only. No overlap.
