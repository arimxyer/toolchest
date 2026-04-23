# Popmotion — Differentiators vs. Siblings

All comparisons are for popmotion v11.0.5 (frozen, 2022-08-15).

---

## vs. motion (fka framer-motion) — direct successor

Motion is the correct replacement in all new code. Same author (Matt Perry), same physics model — motion-dom's generators are the popmotion code inlined and evolved.

| | popmotion v11 | motion v12 |
|---|---|---|
| DOM/CSS bindings | None | Full |
| React integration | None | First-class |
| Layout animations | None | Yes |
| Gestures | None | Yes |
| Bundle (gzipped) | 6.8 kB (full) | ~31 kB (react); motion-dom alone ~18 kB |
| Maintenance | Frozen | Actively developed |

**Choose motion** for any project that touches the DOM or React.

---

## vs. react-spring — physics animation, React-first

react-spring and popmotion share a spring/physics focus but are architecturally opposite.

- react-spring is React-native (hooks, render-props); popmotion is framework-agnostic.
- react-spring is actively maintained; popmotion is frozen.
- react-spring has no direct vanilla-JS equivalent; popmotion does.
- If you need vanilla JS spring animation today without adopting motion, react-spring is not an option — popmotion or motion-dom are the choices.

---

## vs. anime v4 — lightweight with timelines

anime is actively maintained (~6 kB gzipped), has timeline/stagger/SVG support, and provides DOM bindings. Popmotion has no timeline and no DOM bindings.

For lightweight vanilla animation with sequencing, anime v4 wins over popmotion.

---

## vs. gsap — professional production suite

GSAP has timelines, ScrollTrigger, morphSVG, and a commercial licensing model. It is the opposite end of the spectrum from popmotion's headless primitives. No meaningful overlap in use case.

---

## vs. waapi (Web Animations API) — browser-native

WAAPI is free (browser-native), has no bundle cost, and covers keyframe + easing animation of DOM elements. Popmotion's residual advantage over WAAPI is physics/spring animation (spring is not natively in WAAPI) and arbitrary numeric interpolation outside the DOM.

---

## vs. lottie / rive — asset-driven animation

No comparison: lottie and rive render designer-produced animation files. Popmotion animates raw numeric values programmatically. Different jobs entirely.

---

## Residual niche for popmotion (honest assessment)

Popmotion's only defensible use in 2026: a ~6.8 kB headless physics engine for non-DOM environments (Canvas, WebGL, game loops, embedded JS runtimes) where you want a zero-dependency spring/keyframe primitive and cannot adopt motion-dom. In DOM/browser contexts, motion supersedes it completely.
