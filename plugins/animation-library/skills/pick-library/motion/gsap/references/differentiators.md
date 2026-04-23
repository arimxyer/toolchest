# GSAP — Differentiators

Compared against sibling libraries in this dossier: motion (Framer Motion), anime (v4), waapi (Web Animations API), theatre (Theatre.js), auto-animate, react-spring, rive, lottie, tailwindcss-animate, tailwindcss-motion, tw-animate-css, tailwindcss-motion, view-transitions-api, react-three-fiber, remotion, popmotion.

---

## vs. anime (v4)

- **Timeline sequencing**: GSAP's position parameter syntax (`"<"`, `">-0.5"`, `"-=25%"`) enables precise overlap and offset control. anime's timeline uses `offset` but lacks the same expressiveness for relative positioning.
- **Plugin depth**: GSAP ships ScrollTrigger, SplitText, MorphSVG, Flip, DrawSVG out-of-the-box (all free). anime v4 has no equivalent scroll-trigger or SVG-morphing plugin.
- **Render performance**: GSAP's `lazy: true` default batches DOM writes to end-of-tick; anime does not guarantee this batching.
- **Maturity**: GSAP has 14+ years of browser bug workarounds and cross-browser transform normalization; anime v4 is a ground-up rewrite and still maturing.

## vs. motion (Framer Motion)

- **Paradigm**: GSAP is imperative; motion is declarative / state-driven. GSAP wins for sequences triggered by external events or scroll; motion wins for React component state transitions.
- **Non-DOM targets**: GSAP animates any numeric JS object (canvas, WebGL uniforms). motion is DOM/CSS/SVG only.
- **Bundle**: motion's `m` tree-shakeable build is comparable for simple cases; full GSAP with ScrollTrigger is ~44.9 kB gz vs. motion full at ~50 kB gz. Neither is clearly smaller when fully utilized.
- **No React coupling**: GSAP works identically in vanilla JS, Vue, Angular, or any renderer. motion requires React (or a Solid/Vue port).

## vs. waapi (Web Animations API)

- **Zero-KB runtime**: WAAPI is browser-native — no download, no parse cost. For one-off, single-element animations WAAPI is the budget choice.
- **Timeline control**: WAAPI has `GroupEffect` / `SequenceEffect` but browser support is inconsistent; GSAP's Timeline is battle-tested everywhere.
- **Easing library**: WAAPI supports only CSS easing strings. GSAP's ease families (elastic, bounce, rough, custom) are far richer.
- **Scroll integration**: WAAPI + `animation-timeline: scroll()` is CSS-native but limited to CSS properties. GSAP's ScrollTrigger handles pinning, snapping, horizontal scroll, and progress callbacks.
- **SVG**: WAAPI cannot animate SVG attributes (`r`, `cx`, `d`). GSAP's `attr: {}` and MorphSVG do.

## vs. theatre (Theatre.js)

- **GUI editor**: Theatre ships a keyframe editor UI (the Studio). GSAP is code-only.
- **Use case split**: Theatre is for authored cinematic sequences (film-like, story-driven). GSAP is for interactive UI animation (triggered by events, scroll, user input).
- **Playback control**: Both support play/pause/seek; Theatre exports a JSON sequence file; GSAP defines animations in code.

## vs. react-spring

- **Physics vs. curves**: react-spring models spring physics (mass, tension, friction). GSAP uses easing curves with fixed duration. Spring physics feel more natural for gesture-driven UIs; GSAP is better for timed choreography.
- **Non-React**: GSAP is framework-agnostic. react-spring requires React (or a Vue port, `@vueuse/motion`).

## vs. lottie / rive

- **Asset source**: Lottie plays After Effects JSON; Rive plays `.riv` binary from the Rive editor. GSAP animations are defined in code — no external design-tool artifact.
- **Interactivity**: Rive's state machine enables interactive branching at runtime. GSAP can respond to events but requires code for every branch.
- **File size for complex animations**: A complex Lottie JSON can be hundreds of KB; a GSAP animation is code-weight only.

## Unique GSAP strengths

1. **ScrollTrigger** — the most capable scroll-animation plugin in the ecosystem; scrub, pin, snap, progress, batch, horizontal scroll, and `containerAnimation` for carousel scroll contexts.
2. **SplitText** — production-grade text splitting with `autoSplit` resize handling and accessibility (`aria-label` preservation). No equivalent in anime, motion, or waapi without custom code.
3. **MorphSVG** — smooth shape morphing between arbitrary SVG `<path>` elements with configurable subdivision. waapi and anime lack this.
4. **`gsap.context` + `useGSAP()`** — first-class cleanup API designed for component-based frameworks; avoids stale-closure memory leaks without wrapper libraries.
5. **Non-DOM animation** — canvas rendering, Three.js camera animation, WebGL uniform tweening. motion, anime, and waapi are DOM/CSS focused.
6. **`easeReverse` (v3.15)** — per-animation directional easing control; unique in the ecosystem for handling mid-animation reversals gracefully.
