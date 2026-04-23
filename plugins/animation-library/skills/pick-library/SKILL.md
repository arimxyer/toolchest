---
name: pick-library
description: Decision-support dossier for picking a JS/TS animation or rendering library. Use this skill whenever the user is choosing, comparing, evaluating, or scaffolding a motion / animation / rendering / canvas / WebGL / WebGPU / 3D library for a web project. Covers 30 libraries across two buckets — motion (GSAP, Motion, react-spring, Anime.js, Popmotion, WAAPI, View Transitions, Lenis, Theatre.js, AutoAnimate, use-gesture, animate.css, tailwindcss-animate, tailwindcss-motion, tw-animate-css, react-transition-group) and rendering (three.js, react-three-fiber, react-three-rapier, Babylon.js, PixiJS, @pixi/react, Konva, react-konva, Fabric.js, p5.js, Phaser, Lottie, Rive, Remotion). Trigger when the user asks "what should I use for <animation/canvas/3D/scroll/physics/designer-asset/timeline>", when comparing two of these libraries, when evaluating bundle size / license / maintenance posture, when picking a stack for a creative/agency/interactive site, when building a portfolio with motion, when scaffolding scroll-driven / SVG / timeline / physics / gesture / video-export / designer-runtime / video-game work, or when the user mentions any of the 30 library names by itself. Before returning guidance, this skill performs a freshness check on each consumed dossier by comparing its recorded `Version researched` against the library's current npm version, and invokes the `refresh-library` skill if the dossier is stale.
argument-hint: [question or library name]
allowed-tools: Read, Grep, Glob, Bash, WebFetch
---

# Animation + Rendering Library Dossier

Decision-support material for choosing a JS/TS motion or rendering library. 30 libraries researched with verified sources, organised into two buckets: **motion** (16) and **rendering** (14).

If invoked directly via `/animation-library:pick-library`, use `$ARGUMENTS` as the user's question to guide which dossier(s) to load.

## How to use this skill

The content is organised as:

- **[COMPARISON](COMPARISON.md)** — feature matrix and narrative synthesis across all 30 libraries. Start here for comparisons, cluster analysis, bundle-size / license / maintenance snapshots, and the curated stack recommendations.
- **`motion/<slug>/dossier.md`** — per-library dossier (when to use, when NOT, quick facts).
- **`motion/<slug>/references/*.md`** — deeper dives: `overview.md`, `api.md`, `differentiators.md`, `drawbacks.md`, `sources.md`.
- **`motion/<slug>/assets/`** — minimal runnable examples (where present).
- **`rendering/<slug>/…`** — same shape for rendering libraries.

For adding a new library or refreshing a stale dossier, use sibling skills in the same plugin:

- **`/animation-library:scaffold-library <slug>`** — create a new dossier from the template, fetch current docs, wire it into this skill's index and COMPARISON.md.
- **`/animation-library:refresh-library <slug>`** — re-verify an existing dossier against npm/release notes; dispatched automatically by Step 0 below when a version mismatch is detected.

### Workflow

0. **Freshness check.** For each dossier you're about to consume, read its Quick-facts `Version researched` row. If the value is a semver (`X.Y.Z (released YYYY-MM-DD)`), resolve the library's current npm package (use the `name` field in the dossier's frontmatter or the slug as a hint) and fetch `https://registry.npmjs.org/<package>/latest` with Bash (`curl -s … | jq -r .version`) or WebFetch. If npm's latest differs from the dossier, invoke the `refresh-library` skill for that slug before using the dossier. Skip this check when `Version researched` is non-semver (e.g. "Web standard (no SPDX)" for WAAPI / view-transitions-api, where there is no npm package). If npm is unreachable or the check fails, proceed with the existing dossier and note the uncertainty in your reply.
1. **If the user named a specific library**, read that library's `dossier.md` first. Pull references only if the dossier's "See also" points at one you need.
2. **If the user is choosing between options** (e.g. "which library for scroll-driven animations?", "what do I pair with R3F?"), read `COMPARISON.md` first — it has matrices and cluster writeups that frame the trade-offs. Then load the 2–3 dossiers that are live candidates.
3. **If the user is scaffolding fresh work** (e.g. "I'm building a portfolio, what should I use?"), read `COMPARISON.md`'s Part 2 narrative synthesis — it contains curated stack recommendations by use case.
4. **Don't load everything.** Each dossier is self-contained; loading all 30 is both wasteful and unnecessary. Prefer targeted reads.

## Library index

### Motion (16)

| Slug | One-line |
|---|---|
| [animate-css](motion/animate-css/dossier.md) | Drop-in CSS keyframe classes; zero JS, zero build step. Quick decorative effects. |
| [anime](motion/anime/dossier.md) | Imperative JS engine for CSS/SVG/DOM/objects with timelines, stagger, optional WAAPI backend. |
| [auto-animate](motion/auto-animate/dossier.md) | Animate list add/remove/reorder in one line — no keyframe authoring required. |
| [gsap](motion/gsap/dossier.md) | Imperative engine for sequenced, scroll-driven, and SVG/canvas animations where timing matters. |
| [lenis](motion/lenis/dossier.md) | Lightweight smooth-scroll engine for WebGL sync, parallax, and GSAP ScrollTrigger integration. |
| [motion](motion/motion/dossier.md) | Declarative React/Vue/JS animation with spring physics, layout, gestures, WAAPI hybrid engine. |
| [popmotion](motion/popmotion/dossier.md) | Frozen low-level JS engine; only for maintaining legacy framer-motion v7 code. |
| [react-spring](motion/react-spring/dossier.md) | Physics-based spring animations for React — natural motion, R3F interop. |
| [react-transition-group](motion/react-transition-group/dossier.md) | LEGACY. Unmaintained mount/unmount primitive shipped via MUI/Chakra/AntD. |
| [tailwindcss-animate](motion/tailwindcss-animate/dossier.md) | Tailwind v3 plugin for animate-in/out, fade, zoom, slide utilities. Dormant. |
| [tailwindcss-motion](motion/tailwindcss-motion/dossier.md) | Tailwind plugin for declarative CSS-only animations; zero JS runtime. |
| [theatre](motion/theatre/dossier.md) | Visual keyframe editor + JSON-state runtime for R3F/canvas tuned live by designers. |
| [tw-animate-css](motion/tw-animate-css/dossier.md) | CSS-only Tailwind v4 drop-in for tailwindcss-animate; current shadcn/ui default. |
| [use-gesture](motion/use-gesture/dossier.md) | Rich drag/pinch/scroll/wheel/hover gestures for React; pairs with react-spring or Motion. |
| [view-transitions-api](motion/view-transitions-api/dossier.md) | Browser-native cross-fade or shared-element transitions; SPA or MPA, CSS-first. |
| [waapi](motion/waapi/dossier.md) | Browser-native animation API; zero bundle, compositor-accelerated, scroll timelines in Chromium. |

### Rendering (14)

| Slug | One-line |
|---|---|
| [babylon-js](rendering/babylon-js/dossier.md) | Batteries-included 3D engine with Havok physics, WebXR, Node Material Editor. |
| [fabric-js](rendering/fabric-js/dossier.md) | Canvas 2D design-editor library — selection handles, inline text editing, SVG round-trip. |
| [konva](rendering/konva/dossier.md) | Canvas 2D framework for diagrams, whiteboards, editors; drag and Transformer built in. |
| [lottie](rendering/lottie/dossier.md) | AE animations as JSON/binary; lottie-web for SVG, dotlottie-web for WASM + state machines. |
| [p5-js](rendering/p5-js/dossier.md) | Creative-coding library for generative art, educational prototypes, interactive sketches. |
| [phaser](rendering/phaser/dossier.md) | 2D game engine for portfolio mini-games and interactive experiences — not a general renderer. |
| [pixi-js](rendering/pixi-js/dossier.md) | 2D WebGL/WebGPU renderer for high-performance sprites, particles, per-frame canvas work. |
| [pixi-react](rendering/pixi-react/dossier.md) | React 19 reconciler for PixiJS v8 — declarative 2D WebGPU/WebGL. First-party. |
| [react-konva](rendering/react-konva/dossier.md) | React reconciler for Konva — JSX 2D shapes with drag, events, hit-testing. |
| [react-three-fiber](rendering/react-three-fiber/dossier.md) | React renderer for three.js — 3D scenes, WebGL effects, data viz in React. |
| [react-three-rapier](rendering/react-three-rapier/dossier.md) | Rigid-body physics inside @react-three/fiber scenes; pmndrs-canonical. |
| [remotion](rendering/remotion/dossier.md) | React-based programmatic video renderer — export MP4/WebM/GIF via Node + headless Chromium. |
| [rive](rendering/rive/dossier.md) | Designer-authored interactive animations with state machines, driven at runtime via WASM. |
| [three-js](rendering/three-js/dossier.md) | Vanilla 3D library over WebGL/WebGPU; pick it for framework-agnostic 3D scenes. |

## When NOT to use this skill

- The user is already committed to a specific library and asking *how* to use its API — defer to that library's own docs (e.g. the `pixijs` skill for PixiJS coding, or fetch official docs via `find-docs` / context7).
- Pure CSS animation questions with no library choice involved — this skill is for picking a library, not authoring keyframes.
- Video editing, native (iOS/Android) animation, or non-web motion — this corpus is web-JS only.

## Standards

This corpus follows the [Agent Skills](https://agentskills.io) specification — each per-library folder is a self-contained skill (`dossier.md` front-matter + `references/` + `assets/`) that can be consumed in isolation or published as a standalone skill by renaming `dossier.md` back to `SKILL.md`. Inside this plugin the file is named `dossier.md` rather than `SKILL.md` so Claude Code's skill discovery surfaces only the top-level `pick-library` skill instead of 30 separately-triggered ones.

To add a new library to this corpus, invoke the sibling `scaffold-library` skill — it reads the template bundled there, fetches current docs, and writes the new dossier + index rows for you. The template's own README (under `../scaffold-library/template/README.md`) documents the format conventions (citation discipline, Quick-facts layout, bundle-size sourcing, differentiators / drawbacks structure) for anyone contributing manually or forking the corpus into a different domain.

## Freshness

Each dossier's Quick-facts `Version researched` row is the canonical freshness signal; Step 0 of the Workflow above compares it against npm before every consumption. If you need to refresh ad-hoc — e.g. before quoting a dossier in an external write-up — invoke `/animation-library:refresh-library <slug>` directly.
