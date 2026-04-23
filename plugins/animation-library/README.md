# Animation Library Plugin

Decision-support dossier for picking a JS/TS animation or rendering library. 30 libraries researched across two buckets — **motion** (16) and **rendering** (14) — with a cross-library comparison matrix and per-library dossiers.

## What it does

When you're choosing, comparing, or scaffolding an animation / rendering layer for a web project, this skill gives your AI agent:

- **Cross-library comparison matrix** — bundle sizes, licenses, framework support, scroll / timeline / physics / SVG / canvas / designer-asset capabilities side by side.
- **Per-library dossiers** — when to use, when NOT to use, quick facts, and "see also" cross-references.
- **Deeper references** — `overview.md`, `api.md`, `differentiators.md`, `drawbacks.md`, and verified `sources.md` for each library.
- **Minimal runnable examples** under each library's `assets/`.
- **Narrative synthesis** — overlap clusters, curated stack recommendations, and cluster trade-off analysis.

## Covered libraries

**Motion (16):** animate.css, Anime.js, AutoAnimate, GSAP, Lenis, Motion (Framer), Popmotion, react-spring, react-transition-group, tailwindcss-animate, tailwindcss-motion, Theatre.js, tw-animate-css, use-gesture, View Transitions API, WAAPI.

**Rendering (14):** Babylon.js, Fabric.js, Konva, Lottie, p5.js, Phaser, PixiJS, @pixi/react, react-konva, react-three-fiber, react-three-rapier, Remotion, Rive, three.js.

## Skills

This plugin ships three skills. All three trigger automatically from natural-language prompts; you can also invoke them directly.

| Skill | Invocation | What it does |
|---|---|---|
| `pick-library` | `/animation-library:pick-library [question]` | Selector. Picks the right dossier(s) for the user's question, consults COMPARISON.md for multi-library comparisons, and runs a freshness check before returning guidance (dispatches `refresh-library` if a dossier's recorded version differs from npm's latest). |
| `scaffold-library` | `/animation-library:scaffold-library <slug> [npm-name] [motion\|rendering]` | Generates a new library dossier from the bundled `template/`, fetches current docs, and wires the entry into `pick-library`'s Library index and COMPARISON.md matrix. |
| `refresh-library` | `/animation-library:refresh-library <slug>` | Re-verifies a dossier against the library's current npm version and release notes. Also invoked automatically by `pick-library` when it detects staleness. |

Typical direct-invocation examples:

```
/animation-library:pick-library what should I use for scroll-driven animations with React?
/animation-library:scaffold-library motion-canvas motion-canvas motion
/animation-library:refresh-library gsap
```

## Freshness

Dossiers were researched in April 2026. The `pick-library` skill checks each dossier's `Version researched` against npm before every consumption and auto-invokes `refresh-library` on mismatch, so the corpus stays current without manual maintenance cycles. Each `references/sources.md` links to primary sources for any claim you want to re-verify by hand.
