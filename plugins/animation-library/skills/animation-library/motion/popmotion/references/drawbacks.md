# Popmotion — Drawbacks

## Absorption / frozen status (primary concern)

Popmotion's animation core was inlined into framer-motion at v7.6.18 (2022-12-02). Since that moment, the standalone `popmotion` npm package has received no feature development. The package is:

- **Not npm-deprecated** (no `deprecated` field in registry).
- **Not GitHub-archived** (repo flag `archived: false`).
- But **frozen**: last npm publish 2022-08-15 (v11.0.5), last meaningful repo activity before 2024.
- Its direct successor is `motion-dom` (part of the `motion` / framer-motion v12 ecosystem). All ongoing fixes and improvements go there, not here.

If you use popmotion in a new project today, you are adopting a library whose author has moved on and whose bug reports will not be fixed.

---

## No DOM / CSS / SVG bindings

Popmotion v11 animates numbers, colors, and strings. It has no `element.style` integration, no WAAPI adapter, no SVG attribute driver. You write all rendering code yourself. This was a deliberate design choice — it becomes a drawback when compared to motion, anime, or gsap, which handle DOM wiring for you.

---

## No timeline, sequencing, or stagger

Removed in the v9 rewrite. If your animation requires sequencing multiple targets or staggering children, popmotion cannot express it. Use motion, gsap, or anime v4.

---

## Transitive download count masks actual adoption

~1.98 M weekly downloads sounds healthy. Nearly all of it is transitive: projects locked to framer-motion ≤ v7.6.17 pull popmotion as a declared dependency. Direct, intentional adoption is a small fraction. Do not read the download number as evidence of an active community.

---

## No React / Vue / Svelte integration

No hooks, no declarative component wrappers. Integrating popmotion into a React component requires manual `useEffect` lifecycle management. This is exactly what motion (framer-motion) solved — use motion instead.

---

## Stale ecosystem around it

Packages that wrapped popmotion for specific use cases (Pose, react-pose, stylefire, etc.) are all separately deprecated. The broader ecosystem that once surrounded popmotion no longer exists.

---

## License note

MIT license confirmed in npm registry metadata. The GitHub repository has no SPDX-detectable LICENSE file at root (GitHub API returns `license: null`), but the published npm artifact carries `"license": "MIT"` — that governs the published package.
