# AutoAnimate — Drawbacks

## Scope is immediate children only

Only direct children of the `autoAnimate`-attached parent are watched. Deeply nested subtrees require attaching `autoAnimate` to each intermediate parent separately — there is no recursive mode.

## No custom enter/exit asymmetry without the plugin API

Default transitions use the same easing/duration for add, remove, and move. To differentiate (e.g., fast exit, slow enter), you must write a plugin function returning a `KeyframeEffect` — at which point you are writing keyframes manually and the zero-config value proposition erodes.

## Flexbox layout jank on removal

Flex containers do not release space immediately, so removing an item causes a visual stutter before siblings reflow. The documented workaround is explicit widths on children — a meaningful constraint for responsive layouts.

## No timeline, sequencing, or stagger

There is no way to delay or stagger animations across siblings, chain transitions, or synchronize AutoAnimate with other UI events. If you need "item 2 enters after item 1," use motion or gsap.

## Limited to DOM / WAAPI

Canvas, SVG morphing, WebGL, and CSS custom properties are outside scope. The library drives the Web Animations API internally, so any environment without WAAPI support (rare today, but relevant in some SSR/test environments) requires polyfilling or guard code.

## Release cadence has slowed

Latest npm version 0.9.0 was published ~March 2025. GitHub releases page only reflects up to 0.8.2 (April 2024) — the 0.9.0 publish has no corresponding GitHub release tag, which reduces changelog discoverability. Active commits continue in the monorepo (April 2026) but feature velocity is low.
