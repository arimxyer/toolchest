# react-transition-group — Drawbacks

## 1. Unmaintained — the primary reason not to use it

The library has had no maintainer activity since December 2022. The last release (v4.4.5) shipped August 1, 2022. As of 2026-04-22:

- **258 open issues**, none receiving maintainer responses.
- GitHub push date of 2026-03-05 reflects a Dependabot automated PR, not maintainer engagement.
- No v5 roadmap, no React 18/19 validation by maintainers, no compatibility guarantees for future React releases.

**Modern replacement: Motion's `<AnimatePresence>`** handles mount/unmount animations declaratively, is MIT-licensed, actively maintained, and provides spring physics, layout animations, and gesture support that react-transition-group never had.

## 2. Zero animation logic — you own all easing

react-transition-group applies state strings and CSS class names. It performs no interpolation, no spring physics, no keyframe generation. Every easing curve, duration, and keyframe must be written in CSS or wired via the `onEntering`/`onExiting` callbacks. This was a deliberate design choice but means the library does not reduce animation work — it only manages timing state.

## 3. `findDOMNode` deprecation

Prior to the `nodeRef` API (added in v4.4.0), the library used `ReactDOM.findDOMNode` internally — deprecated in React 18 StrictMode and removed in React 19. Older code using `CSSTransition` without `nodeRef` will emit warnings in React 18 and break in React 19. Fixing requires adding `nodeRef` refs to every transition site.

## 4. No interruptible transitions

The state machine is sequential: entering → entered → exiting → exited. If `in` toggles mid-transition, the library waits for the current phase timeout before reversing. Motion and react-spring both handle mid-animation reversals smoothly by interpolating from the current animated position.

## 5. No stagger or orchestration

`<TransitionGroup>` adds and removes items with individual timeouts but has no built-in stagger. Achieving staggered list entrance requires hacking `timeout` based on item index — a fragile pattern that breaks with dynamic lists. Motion's `staggerChildren` variant and react-spring's `useTrail` both handle this declaratively.

## 6. Bundle cost is unavoidable once transitive

At ~4 kB gzipped, react-transition-group is not expensive. But because it arrives via MUI/Chakra/Ant Design, adding it as a direct dependency adds zero marginal cost — which makes it tempting to use "for free." That reasoning ignores the maintenance risk and the superior alternatives available at the same cost.

## 7. API verbosity for common patterns

A standard mount/unmount with CSS takes: one `useRef`, one `<CSSTransition>` with `nodeRef`, `timeout`, `classNames`, `unmountOnExit`, and separate CSS with four class suffixes. Motion's equivalent is `<AnimatePresence><motion.div exit={{ opacity: 0 }} /></AnimatePresence>` — no CSS file required.
