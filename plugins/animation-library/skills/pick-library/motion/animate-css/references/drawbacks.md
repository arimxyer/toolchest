# animate.css — Drawbacks

## No JavaScript interactivity

animate.css is pure CSS. There is no API to pause, reverse, cancel, or query animation state. All control goes through class toggling. If you need to interrupt an animation mid-play, respond to scroll position, or drive playback from user input (e.g. pointer velocity), you need WAAPI or a JS engine.

## No scroll-driven animations

animate.css has no integration with CSS `animation-timeline: scroll()` or any scroll-based trigger mechanism. Scroll-driven effects require either a JS intersection observer wrapping the class toggle, or a native CSS `animation-timeline` approach (WAAPI / tailwindcss-motion territory).

## No physics or spring dynamics

Every animation is a hand-authored `@keyframes` block with a fixed cubic-bezier or linear easing. There are no spring simulations, inertia, or mass/damping parameters. react-spring, Framer Motion, and popmotion cover that space.

## No sequencing or orchestration

There is no timeline concept: you cannot chain "animate A, then animate B 200ms later" without writing JavaScript to manage the sequence manually. GSAP, anime.js, and motion handle multi-step orchestration.

## Feature-complete means frozen feature set

No new animations, easings, or utilities will ship. If you need an effect not in the current set (e.g. morph, path-follow, clip-path wipe), animate.css cannot provide it. You would write the keyframe yourself or reach for a different library.

## License risk: Hippocratic License 2.1

The current license (v4.1.1) is **Hippocratic License 2.1**, not MIT. The npm registry metadata historically showed MIT (from earlier versions), creating a common misconception. Hippocratic-2.1 is not OSI-approved and imposes human-rights-compliance conditions. Organizations with strict OSS policy requirements (e.g. only OSI-approved licenses, or only permissive licenses for commercial products) should verify legal approval before adopting v4. Pinning to v3.x (MIT-licensed) is an option but loses v4 improvements and the namespace prefix.

## Bundle size vs. usage ratio

The minified file (~72 KB raw, ~5 KB gzip) contains all ~80 animations. In practice most applications use 3–10 effects. There is no automatic tree-shaking for a CSS file; unused keyframes ship to the client. Mitigation: import individual Sass partials at build time.

## No React/Vue/framework primitives

animate.css does not provide React hooks, Vue directives, or component wrappers. Lifecycle-aware usage (enter/exit on component mount/unmount) requires manual integration with React Transition Group or equivalent.
