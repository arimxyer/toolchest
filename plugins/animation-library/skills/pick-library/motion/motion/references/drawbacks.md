# Motion — Drawbacks

## Bundle weight

The `motion.div` component cannot be tree-shaken below ~34 kB gzipped. Reaching the ~4.6 kB floor requires opting into `m.*` + `LazyMotion` — an extra abstraction layer that breaks the simple `motion.div` mental model and complicates dynamic imports in SSR setups (Next.js, Remix). Most teams accept the 34 kB default and never pay off the LazyMotion setup cost.

## No imperative timeline

There is no `Timeline` abstraction for sequenced, multi-target, scrub-able animation. `useAnimate` allows sequential imperative calls (`.then()` chaining), but it is not a timeline with seek, repeat, or visual tooling. Teams that need authored cinematic sequences must reach for GSAP or Theatre.js.

## Layout animation gotchas

`layout` prop works by measuring element geometry before and after a React render and interpolating the diff via transform. This breaks with:

- Elements whose parents have `overflow: hidden` without a `layoutScroll` ancestor.
- `border-radius` on scaled elements (requires `layoutDependency` tuning or `<LayoutGroup>`).
- SSR: server-rendered layout measurements don't exist, causing flicker on hydration.

## Gesture system is React-only

The declarative gesture props (`whileDrag`, `whileHover`, etc.) are React-specific. The vanilla `motion/dom` API does not expose gesture recognition — you must use the JS `animate()` function and wire events manually, which negates much of the DX advantage.

## React version coupling

Peer dependency requires React 18 or 19. Projects on React 17 or below must remain on `framer-motion` v6/v7 (no longer actively maintained under that name).

## SSR / hydration mismatch

Animations that depend on viewport size or element position can produce hydration mismatches in SSR frameworks. `initial={false}` on `<AnimatePresence>` and careful `useIsomorphicLayoutEffect` usage are required but not well-documented.

## Motion+ paywall for examples

The official documentation's most useful examples (330+) and premium components are behind the $399 Motion+ paywall. The free tier provides 80+ examples, which is sufficient for common patterns but leaves advanced use cases underdocumented in the open source.

## Rebranding turbulence

The Framer Motion → Motion rename (Nov 2024) and the Motion One merger (v11.11.12) introduced import path changes (`"framer-motion"` → `"motion/react"`) and some API removals for former Motion One users. Existing Framer Motion codebases migrating to v12+ must update imports. Third-party ecosystem tooling (Storybook addons, test utilities) may still reference the old package name.
