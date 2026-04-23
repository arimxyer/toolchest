# Rive — Differentiators

## vs. Lottie

The closest sibling. Both follow the **designer-tool → binary → runtime** pipeline, but the philosophies diverge sharply:

- **Lottie** exports from After Effects (`.json` or `.lottie`); it is a **playback-only timeline**. No runtime branching, no interactivity — you trigger play/pause/seek.
- **Rive** was designed for **interactive, state-driven animations**. State machines with inputs, transitions, and data binding are first-class. A loading spinner that responds to hover, a character that reacts to game events — Rive; Lottie cannot.
- **Format fidelity**: Rive's editor is the canonical authoring environment for `.riv`; there is no After Effects round-trip. Lottie's AE plugin path has well-known unsupported-feature gaps. Rive's pipeline is tighter.
- **Size**: `canvas-lite` at 222 KB brotli-9 vs Lottie-Web at ~60 KB gzipped. Lottie wins on weight for pure playback.

## vs. motion (Framer Motion)

- Motion is **code-first** — engineers write animations in JSX/JS. Rive is **designer-first** — the source of truth is a `.riv` file.
- Motion operates on DOM/CSS transforms and opacity; Rive renders into a `<canvas>` and is not DOM-node-based.
- Motion integrates natively with React state and layout; Rive requires bridging via inputs or data binding.
- Use Motion for UI transitions and gesture-driven micro-interactions in React apps. Use Rive for complex, multi-state branded animations.

## vs. GSAP

- GSAP is a **code-first timeline engine**; sequences are authored in JS. Rive sequences are authored in the editor.
- GSAP has no native state machine concept but can be scripted to equivalent behavior.
- GSAP's footprint (~34 KB gzip core) is far smaller; it directly manipulates DOM/SVG/CSS properties.
- GSAP is better for scroll-driven or sequence-heavy animations that engineers control precisely. Rive is better when designers own the animation fully.

## vs. Theatre.js

- Theatre is also code-first (or editor-assisted) and targets precise cinematic sequencing for 3D/WebGL scenes.
- Theatre's editor is a sequencer overlay over the running app; Rive's editor is a standalone SaaS design tool.
- No cross-over in use cases: Theatre for complex narrative sequences in 3D contexts; Rive for interactive UI/game animations.

## vs. react-three-fiber / drei

- r3f is for **3D WebGL scenes** (meshes, lights, cameras); Rive is for **2D vector animations** rendered to canvas.
- They can coexist (embed a Rive canvas inside an r3f scene texture) but solve orthogonal problems.

## vs. remotion

- Remotion is for **rendering video programmatically**; output is MP4/WebM. Rive is for real-time interactive playback.
- Rive cannot produce video output; Remotion cannot produce interactive runtime animations.

## Summary positioning

Rive is the only library in this dossier that combines **designer-native authoring**, **interactive state machines**, and **cross-platform (web + mobile + game engine) binary runtimes**. Its unique position is the Lottie upgrade path when animation needs to branch or respond to input.
