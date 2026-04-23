# tailwindcss-motion — Differentiators

Positioned against its closest siblings in the dossier.

---

## vs. tailwindcss-animate

`tailwindcss-animate` (Joe Bell / shadcn ecosystem) provides a fixed set of named keyframe animations (`animate-in`, `animate-out`, `fade-in`, `spin`, etc.) — a relatively thin utility layer. `tailwindcss-motion` is substantially larger in scope: composable per-property axes, per-property duration/delay modifiers via slash syntax, spring easing presets, loop control, and a growing preset library. Choose `tailwindcss-animate` when you only need the basic enter/exit kit that ships with shadcn/ui components; choose `tailwindcss-motion` when you need richer composition or loop animations without leaving Tailwind.

## vs. tw-animate-css

`tw-animate-css` is a community CSS-variable-driven reimplementation of Animate.css as Tailwind utilities — primarily a porting exercise. Its value is the broad Animate.css catalog (shake, bounce, flip, etc.) with no JS. `tailwindcss-motion` shares the zero-JS approach but offers more composable axes, per-property timing control, and an official authoring toolchain (Rombo animator/extension). If you specifically want the Animate.css vocabulary, `tw-animate-css` is narrower and predictable; `tailwindcss-motion` trades breadth of named effects for composability depth.

## vs. motion (Framer Motion / Motion One)

These are categorically different tools. `motion` ships a JS runtime (~18 KB gzip for the React API), runs animations imperatively or via the `animate()` API, and supports gesture-driven state, scroll-linked timelines, layout animations, and shared-element transitions. `tailwindcss-motion` has zero JS runtime and zero imperative control — everything is declarative HTML classes. Pick `motion` any time you need programmatic control, sequencing, or scroll-driven behavior; `tailwindcss-motion` when classes in markup are sufficient.

## vs. gsap / anime (v4)

GSAP and anime are full timeline engines with keyframe sequencing, scrubbing, plugins (DrawSVG, ScrollTrigger, etc.), and JS runtime control. `tailwindcss-motion` cannot sequence or scrub. It is appropriate only for self-contained trigger-on-load or loop animations expressible as a single CSS `@keyframes` curve.

## vs. auto-animate (@formkit)

`auto-animate` adds a single attribute (`data-auto-animate`) to a parent and automatically animates child list insertions/removals/moves. Its scope is purely layout-change animation. `tailwindcss-motion` covers entrance/exit/loop effects on individual elements but has no awareness of DOM diffing or list reordering. They can coexist — use `auto-animate` for list transitions, `tailwindcss-motion` for element-level polish.

## vs. react-spring / popmotion

Physics-based JS runtimes with spring interpolation at runtime. `tailwindcss-motion` offers spring-named easing presets (CSS `cubic-bezier` approximations) but these are baked curves, not live physics. If exact spring mass/damping control or interruptible animations matter, use the JS runtimes.

## Key positioning

`tailwindcss-motion` occupies the sweet spot between `tailwindcss-animate` (too thin) and `motion` (JS runtime required). Its unique add is the composable per-property axis model with slash-syntax per-property timing, inside a pure-CSS Tailwind plugin with tooling support.
