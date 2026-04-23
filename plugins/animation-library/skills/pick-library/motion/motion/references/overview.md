# Motion — Overview

## Name and history

**Motion** (npm: `motion`) is the current name for what was **Framer Motion**. The rebrand occurred on November 12, 2024, when the creator Matt Perry spun the library out of Framer as an independent open-source project.

**Popmotion** is the ancestor. Framer originally acquired Popmotion (Perry's low-level animation utility library) to build Framer Motion's animation engine. Popmotion was effectively absorbed and is no longer maintained as a standalone project — its primitives live inside Motion's internals. As of Motion v11.11.12, Framer Motion and Motion One (a separate vanilla-JS library Perry also maintained) were merged into a single `motion` package, with Framer Motion's API conventions taking precedence.

Migration from `framer-motion` to `motion` is a package swap plus an import path change (`"framer-motion"` → `"motion/react"`). Motion v12 has no breaking changes from the last Framer Motion release.

## Architecture

Motion ships a **hybrid animation engine**:

1. **WAAPI (Web Animations API)** — used for hardware-accelerated properties (transform, opacity, filter, clipPath) when the browser supports it. ScrollTimeline is used for scroll-linked effects on supporting browsers.
2. **JavaScript fallback** — for properties WAAPI cannot animate (SVG attributes, CSS variables, complex motion values), a JS-driven loop takes over transparently.

This means most animations run off the main thread without manual opt-in, unlike pure-JS libraries.

## Package variants

| Import | Contents |
|---|---|
| `motion/react` | Full React API: `motion.*` components, hooks, `AnimatePresence`, layout animations |
| `motion/react-m` | Slimmer `m.*` components for use with `LazyMotion` to reduce initial bundle |
| `motion/dom` | Framework-agnostic DOM animation (vanilla JS, Vue wrapper uses this) |
| `motion/mini` | Minimal subset: `animate()` + basic spring, no gesture or layout features |
| `motion` | Re-exports `motion/react` and `framer-motion` compatibility shim |

## Ecosystem

- **Motion Studio** / **Motion+**: paid add-on ($399 one-time) for a VS Code IDE transition editor, 330+ examples, premium components, and AI tooling. The core library is MIT and free.
- Integrations: Framer (design tool), Figma, Squarespace, WordPress, Webflow, Radix UI, Base UI.
- 30 million+ monthly npm downloads (as of 2026-04-22 per motion.dev docs).
