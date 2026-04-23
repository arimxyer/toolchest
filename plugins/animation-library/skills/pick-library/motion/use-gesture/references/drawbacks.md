# @use-gesture/react — Drawbacks

## Slow release cadence

The last release is **v10.3.1 (March 2024)** — roughly two years old as of 2026-04-22. The v10 rewrite stabilized the API, so there is little functional regression risk, but:

- Open issues and PRs on GitHub accumulate without timely triage.
- Edge-case bugs (e.g., scroll-lock interactions on iOS, pointer-capture behavior in shadow DOM) may remain unresolved indefinitely.
- Compatibility with future React versions (Server Components, React 19+ changes to event delegation) is untested in the current codebase.

Framing: **stable / feature-complete**, not abandoned — but plan for zero upstream fixes on any bug you hit.

## Overlap with Motion for common cases

Motion's `drag` prop, `whileHover`, and `whileTap` cover the majority of consumer UI gesture interactions without any additional library. Adding use-gesture to a Motion project for simple drag-and-drop is unnecessary complexity. The added value of use-gesture only materializes when:
- You need velocity/direction to feed into a physics spring.
- You need pinch, multi-touch, or pointer-lock.
- You need elastic rubber-banding beyond what Motion's `dragConstraints` offers.

If those needs do not appear in your design, the extra dependency is overhead.

## Not an animation library — requires pairing

use-gesture does not move anything. Every project using it must also maintain an animation layer (react-spring, Motion, GSAP, raw CSS transforms). For teams unfamiliar with the pairing pattern this is a conceptual gap that causes confusion: "I attached `useDrag` but nothing moves."

## Bundle cost is not free

8.88 KB gzip / 28.6 KB min is modest but real. In a project that only needs simple drag-and-drop, Motion's built-in `drag` costs nothing extra; use-gesture does.

## No built-in gesture conflict resolution

When `useDrag` and `useScroll` (or a parent scroll container) compete, the caller must manually configure `preventScroll` and `preventScrollAxis`. Getting this right on iOS is non-trivial and underdocumented; the 250ms hold delay imposed by `preventScroll: true` on touch is a UX trade-off the library cannot hide.

## No multi-pointer beyond two-finger pinch

There is no `useMultiPointer` hook for tracking three or more simultaneous touch points. Applications that need N-finger gestures must build on top of raw pointer events.
