# AutoAnimate — Overview

## What it does

AutoAnimate observes a parent DOM element via `MutationObserver` and plays a `KeyframeEffect` when an immediate child is added, removed, or repositioned. It requires zero style declarations from the author; the library reads current and previous FLIP coordinates internally and drives the Web Animations API.

## Scope

Animations trigger **only on immediate children** of the attached element. Deeper descendants are not animated unless their own parent element is also passed to `autoAnimate`.

## Automatic behaviors

- Sets `position: relative` on the parent if it is statically positioned (required for FLIP math).
- Automatically disables animations when `prefers-reduced-motion: reduce` is detected, unless overridden with `disrespectUserMotionPreference: true`.
- Handles React/Vue key-based reconciliation correctly when elements have unique `key` props.

## Flexbox caveat

Flex containers do not resize children immediately during layout recalc. The docs recommend setting explicit widths on children in flex parents to avoid jank on removal animations.

## Maintenance status

Active. Most recent npm publish: 0.9.0 (~March 2025). Most recent GitHub commit: April 2, 2026 (active FormKit monorepo). GitHub: 13.8k stars, 251 forks as of April 2026.
