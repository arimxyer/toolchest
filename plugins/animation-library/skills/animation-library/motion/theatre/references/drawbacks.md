# Theatre.js — Drawbacks

## Effectively Dormant Publicly (High Risk)

Last public npm publish: **2024-05-19** (v0.7.2). Last commit to the public repo: **2024-08-14**. As of April 2026 — roughly 20 months of public silence — the team has not released code, blog posts, or a 1.0 ship date. Their README banner states development moved to a private repo; Discord confirmed in July 2025 it is "still alive." For most production teams, shipping on a library with no public activity for 20+ months is a meaningful adoption risk. No external contributors can audit, patch, or fork forward from the private work.

## Studio-First Workflow Friction

There is no programmatic keyframe authoring API (the `__experimental_getKeyframes` reads keyframes, but doesn't write them). All animation must be created through the Studio UI. This means:

- Every animation requires a browser-based edit session.
- Onboarding non-JS team members requires them to run a dev server with Studio mounted.
- CI/CD pipelines cannot generate or verify keyframe content.
- Procedural or data-driven animations (e.g., "animate N bars to their data values") require workarounds or bypassing the keyframe system entirely with `onValuesChange`.

## Studio AGPL-3.0 License

`@theatre/studio` is AGPL-3.0. If you ship the Studio to users (e.g., as an embedded editor in a SaaS product), the AGPL copyleft terms apply. Keeping Studio dev-only (the intended use) sidesteps this, but requires disciplined build configuration — a missed conditional import in a production bundle is a compliance issue.

## No Declarative API for Common UI Patterns

Theatre.js is not suited for hover effects, route transitions, scroll-triggered micro-interactions, or gesture-driven animations. It has no equivalent to `AnimatePresence`, `whileHover`, or spring physics. For these use cases, motion or react-spring are more appropriate.

## Large State JSON for Complex Animations

The exported project state is human-readable JSON, but complex animations with many objects and keyframes produce large blobs. The JSON must be bundled or fetched; there is no binary or compressed format. For very long sequences this can add meaningful kilobytes to the initial load.

## R3F Adapter Version Lag

`@theatre/r3f` has historically lagged behind `@react-three/fiber` major versions. Upgrading R3F can require waiting for a Theatre.js adapter release — a friction point when the public repo is not being actively updated.

## No First-Party React DOM Integration

`@theatre/r3f` is specifically for Three.js/WebGL. Animating HTML/CSS DOM elements with Theatre.js requires manually wiring `onValuesChange` callbacks to `style` properties or CSSOM — there is no `@theatre/react` for DOM. This compares unfavorably to gsap's universal DOM targeting or motion's native React DOM integration.
