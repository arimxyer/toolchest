# tw-animate-css — Differentiators

## vs. tailwindcss-animate (predecessor)

`tailwindcss-animate` is the direct predecessor — a Tailwind v3 JavaScript plugin. `tw-animate-css` exposes the same utility vocabulary as a CSS file, making it idiomatic for Tailwind v4's CSS-first architecture. The `@plugin` call is replaced by `@import`. shadcn/ui officially deprecated `tailwindcss-animate` in favor of `tw-animate-css` on 2025-03-19.

Key behavioral differences:
- Default fill-mode changed from `forwards` to `none` (v1.3.4)
- Prefix support moved to a separate entry point (`tw-animate-css/prefix`)
- Not a 100% drop-in; maintainer explicitly notes partial compatibility

## vs. tailwindcss-motion (alternative Tailwind-v4 approach)

`tailwindcss-motion` is a v4-compatible alternative that offers a richer set of composable motion utilities with more granular control over individual CSS properties (translate, rotate, scale, blur, opacity each separately, with independent timing). It goes further than tw-animate-css's enter/exit model and supports looping animations more expressively.

`tw-animate-css` wins when you only need standard enter/exit patterns and want the closest behavior match to the existing `tailwindcss-animate` API — especially for shadcn/ui compatibility. `tailwindcss-motion` wins when you need more expressive per-property animation control.

## vs. Motion (Framer Motion)

Motion provides a React component API with gesture support, layout animations, physics springs, shared layout transitions, and exit animations coordinated by `AnimatePresence`. tw-animate-css has no JS layer — no callbacks, no orchestration, no springs. Use Motion when animation logic needs to be conditional, sequenced, or gesture-driven. Use tw-animate-css for purely declarative, class-driven enter/exit without runtime overhead.

## vs. GSAP

GSAP is a full-featured timeline animation engine with scroll triggers, morphing, and sequencing. tw-animate-css is CSS utility classes. They target entirely different use-cases. Not competitive.

## vs. Auto-Animate (@formkit)

Auto-Animate automatically applies animations when DOM children are added/removed/moved with a single attribute. tw-animate-css requires explicit class application. Auto-Animate is better for list reorders; tw-animate-css is better for controlled, composable enter/exit states.

## vs. View Transitions API

View Transitions API is browser-native and handles cross-page or cross-state visual transitions at the document level. tw-animate-css operates at the element class level within a page. They are complementary rather than competitive.

## Unique position

tw-animate-css is the only library in this dossier that is:
- CSS-only (zero JS runtime)
- Tailwind v4 native (CSS import, not plugin)
- Officially adopted by shadcn/ui as the animation baseline for all v4 component styles
