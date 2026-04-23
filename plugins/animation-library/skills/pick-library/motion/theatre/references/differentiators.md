# Theatre.js — Differentiators

Compared against siblings in the dossier: motion, gsap, anime (v4), auto-animate, react-spring, rive, lottie, tailwindcss-animate, tw-animate-css, tailwindcss-motion, view-transitions-api, waapi, react-three-fiber (+drei), remotion, popmotion.

---

## Visual Editor That Round-Trips to Code State

Theatre.js is the **only library in this list** that ships a browser-embedded visual keyframe editor. Authored animation is serialized to JSON and loaded at runtime — no separate design tool, no render pipeline, no format conversion.

- **gsap** timelines are entirely programmatic: durations and easings live in JS source. Visual tweaking requires a paid GreenSock plugin (GS DevTools) that does not export back to code.
- **waapi / GSAP / anime** — all code-first, no GUI export loop.
- **Rive** is the closest conceptual peer: it has a desktop editor with a proprietary binary format. Theatre.js uses open JSON and Apache-2.0 core — no vendor runtime lock-in.

## First-Party react-three-fiber Adapter

`@theatre/r3f` is maintained by the Theatre.js team. It provides `<SheetProvider>`, `editable as e`, and a Studio extension that makes the 3D scene graph directly editable in the Studio UI. In contrast:

- **react-three-fiber (+drei)** itself has no timeline editor; you'd wire GSAP or a custom raf loop.
- Combining gsap + R3F works but is manual binding with no visual scrubbing of 3D transforms in context.
- Theatre.js is the only option in this list where a 3D scene's camera, mesh positions, and material colors can be keyframed visually while viewing the live canvas.

## Targeted at Long-Form Web Motion, Not Micro-Interactions

- **motion (Framer Motion)** and **react-spring** excel at UI gesture/state transitions (hover, route change). Theatre.js sequences run for seconds or minutes, driven by explicit play/pause rather than state machines.
- **auto-animate** requires zero configuration and handles list/DOM transitions — Theatre is the opposite: maximum configuration for deliberate, hand-crafted animation.

## Audio-Synchronized Playback

`sequence.attachAudio()` syncs an `AudioBuffer` to the playhead clock with frame accuracy. No other library in this list has native audio sync. This is the differentiator for interactive narrative, product storytelling, and music-reactive experiences.

## Versus Remotion

**remotion** is for rendering video frames to MP4/WebM offline (Node.js/ffmpeg). Theatre.js is for live browser playback. They are complementary: you could use Theatre.js to prototype timing, then implement the final sequence in Remotion for video export. Both use a timeline model; only Remotion can produce downloadable video files.

## State-Driven Playback Without the Editor

In production, the Studio is excluded and the `@theatre/core` runtime (~20 KiB gzipped) replays the exported JSON state. This means shipped bundle size is competitive with gsap (~30 KiB) and well below lottie-web (~50 KiB+). The authored JSON is the source of truth, version-controlled alongside code.

## Framework-Agnostic Value Producer

Theatre.js does not own the DOM, canvas, or WebGL context. It produces numbers and calls your callback. This makes it usable with vanilla Three.js, Pixi.js, CSS custom properties, SVG attributes, or any renderer — not just React. The only React-specific code is `@theatre/r3f`.
