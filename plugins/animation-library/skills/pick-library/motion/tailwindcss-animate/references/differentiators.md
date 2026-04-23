# tailwindcss-animate — Differentiators

## vs. tw-animate-css (direct successor)

`tw-animate-css` is the Tailwind v4 replacement with an **identical class API** (`animate-in`, `fade-in`, `zoom-in`, etc.). The difference is architectural: `tailwindcss-animate` is a JavaScript plugin registered in `tailwind.config.js`; `tw-animate-css` is a plain CSS file imported via `@import "tw-animate-css"` matching Tailwind v4's CSS-first model. For Tailwind v3, `tailwindcss-animate` works; for v4, use `tw-animate-css`. Migration is class-name-compatible — no template changes needed.

## vs. tailwindcss-motion

`tailwindcss-motion` (by Rombo) is a more capable modern Tailwind plugin targeting v3/v4. It offers spring physics, looping, and a richer set of named presets via class names. It's actively maintained. Choose it over `tailwindcss-animate` for new v3 projects that need more than basic enter/exit or plan to move to v4 soon. `tailwindcss-animate` has a simpler, more auditable surface — if you only need fade/zoom/slide on mount and want zero surprises, it remains appropriate for v3.

## vs. WAAPI (Web Animations API)

WAAPI is the browser-native JS animation API. It operates imperatively (`element.animate([...], options)`) rather than declaratively with classes. WAAPI is the right tool when animation must be triggered programmatically (on scroll, on gesture, on data change) or when timing must be synchronized across elements. `tailwindcss-animate` is purely declarative — class present means animation plays; no JS control, no programmatic sequencing.

## vs. Motion (fka Framer Motion)

Motion is a full JS animation library (React-specific in its component form). It provides spring physics, layout animation, shared element transitions, exit animations via `AnimatePresence`, and a timeline API. `tailwindcss-animate` has no JS API and no exit orchestration — it can play an exit class but cannot delay DOM removal. Use Motion when you need `AnimatePresence`, physics, or drag.

## vs. GSAP

GSAP is a professional-grade JS timeline engine. The comparison is almost out of scope — GSAP handles sequences, stagger, scroll triggers, SVG morphing, and complex choreography. `tailwindcss-animate` is appropriate for simple per-element transitions; GSAP is appropriate for anything with sequencing or orchestration requirements.

## vs. AutoAnimate (@formkit)

AutoAnimate detects DOM mutations and automatically animates additions, removals, and moves with a single `useAutoAnimate()` hook or `data-auto-animate` attribute. `tailwindcss-animate` requires explicit class management — you add `animate-in` or `animate-out` classes yourself and handle timing manually. AutoAnimate is lower-friction for list/tree animations; `tailwindcss-animate` gives you more explicit control over individual element transitions.

## Unique positioning

- Zero JS runtime, zero framework dependency — works in plain HTML, Vue, React, Svelte, or server-rendered templates.
- shadcn/ui-originated class vocabulary (`animate-in`, `fade-in`, `slide-in-from-*`) — if you consume shadcn/ui components, you already know this API.
- Composition model (stack multiple effects with multiple classes) is distinctive vs. single-class animation libraries.
- Obsolescence is the core trade-off: the ecosystem has moved to `tw-animate-css` for v4.
