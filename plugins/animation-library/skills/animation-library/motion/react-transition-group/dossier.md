---
name: react-transition-group
description: Unmaintained mount/unmount transition primitive you'll already have in node_modules via MUI — don't pick for new code.
---
# react-transition-group

> **WARNING — LEGACY LIBRARY.** react-transition-group is in this dossier for one reason: it is the highest-download React animation package at ~51M weekly npm downloads, driven almost entirely by transitive dependencies (MUI, Chakra UI, Ant Design). The last real release was v4.4.5 in August 2022. The last substantive commit was December 2022. There is no active maintainer. Open issues (258+) go unanswered. **Do not choose this library for new code.** For new projects: use **Motion** (`<AnimatePresence>`) for declarative exit/enter animations, or **react-spring** (`useTransition`) for physics-based mount/unmount sequences.

## When to use

- You are **maintaining a legacy React codebase** that already imports react-transition-group — refactoring is out of scope and the animations work fine.
- You are working inside a **MUI, Chakra UI, or Ant Design** project and need to hook into the same transition lifecycle those libraries already use internally (e.g., custom `Dialog` or `Collapse` with matching timing).
- You need a **pure CSS class-based transition** (`CSSTransition`) and the team has banned JS-driven animation libraries — react-transition-group imposes zero animation logic, only lifecycle state.
- You are **debugging or extending** an existing `TransitionGroup` / `CSSTransition` integration (list animations, route transitions) that is already shipping in production.
- You need the **lowest-overhead mount/unmount hook** possible and are already paying the bundle cost through a transitive dep — no additional kB, no new behavior.

## When NOT to use

- **New projects — pick Motion or react-spring instead.** Motion's `<AnimatePresence>` covers declarative exit animations with spring physics and layout transitions. react-spring's `useTransition` handles mount/unmount with full spring control. Both are actively maintained.
- **You need spring or physics-based easing** — react-transition-group provides zero easing logic; you wire CSS or keyframes yourself.
- **You need orchestrated list animations with stagger** — react-spring's `useSprings` / `useTrail` or Motion's `staggerChildren` do this declaratively. `TransitionGroup` requires hand-rolling timing.
- **You want interruptible or gesture-driven transitions** — the library has no concept of mid-animation reversal; state is binary (entering/exiting).
- **You care about active maintenance** — no releases since August 2022, no maintainer responses to open issues, 258 open issues as of 2026-04-22.

## Quick facts

| Field | Value |
|---|---|
| Version | 4.4.5 (released 2022-08-01) |
| License (SPDX) | BSD-3-Clause |
| Framework | React >=16.6.0 (peer dep; works with React 18/19 but untested by maintainers) |
| Bundle size gzipped | ~4 kB gzipped / ~14 kB minified (source: bundlephobia, 2026-04-22) |
| Maintenance | **Unmaintained.** Last commit: 2022-12-03 (Dependabot bump). Last release: 2022-08-01. 258 open issues, no maintainer responses. Pushed date on GitHub (2026-03-05) reflects another Dependabot PR, not maintainer activity. |
| Weekly downloads | ~51M (2026-04-15–21, npm registry) — almost entirely transitive via MUI / Chakra / Ant Design |

## See also

- [Overview](references/overview.md)
- [API reference](references/api.md)
- [Differentiators vs siblings](references/differentiators.md)
- [Drawbacks](references/drawbacks.md)
- [Sources](references/sources.md)
- [Minimal example](assets/examples/minimal.tsx)
