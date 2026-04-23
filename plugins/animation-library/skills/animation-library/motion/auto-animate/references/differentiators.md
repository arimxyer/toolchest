# AutoAnimate — Differentiators

## vs. motion (fka Framer Motion) layout animations

Motion's `layout` prop and `AnimatePresence` give you full control: custom variants, stagger, orchestration, springs, and exit animations on arbitrary elements. AutoAnimate wins on setup cost — one `useAutoAnimate()` call vs. wrapping every animated child in `<motion.div>` and defining variants. Motion is the right call once you need per-element control, entrance delays, or anything beyond the default FLIP transition.

## vs. view-transitions-api

View Transitions is browser-native, zero-JS for the transition itself, and handles full-page/route-level transitions that AutoAnimate cannot touch. AutoAnimate works inside a single component tree; View Transitions works across navigations. AutoAnimate has broader cross-browser support today (polyfills WAAPI where needed) and works without a router.

## vs. react-spring

React Spring models animations as physics simulations (spring, friction, tension) and gives you imperative control over every interpolated value. AutoAnimate does not expose interpolation — you get enter/exit/move with configurable easing but no spring physics.

## vs. gsap / anime

GSAP and anime.js are full animation toolkits — timelines, morphing, scroll triggers, per-property easing. AutoAnimate has none of that. It exists in a different problem space: automatic structural transitions, not authored sequences.

## vs. tailwindcss-animate / tw-animate-css / tailwindcss-motion

Tailwind animation utilities are CSS-class-based and authoring-time — you declare which animation a static element plays. AutoAnimate is runtime-reactive: it detects DOM mutations and plays FLIP transitions automatically. They are complementary; a list item can carry Tailwind entrance classes while its parent uses AutoAnimate for reorder transitions.

## vs. lottie / rive

Lottie and Rive play pre-authored animation assets (JSON/`.riv` files). AutoAnimate generates transitions procedurally from layout state. No overlap in use case.

## Unique strengths

- Zero animation authoring for standard add/remove/reorder transitions.
- Framework-agnostic with idiomatic adapters for every major framework.
- `prefers-reduced-motion` respected by default — compliance without extra code.
- 3.2 KB gzipped; no dependencies.
