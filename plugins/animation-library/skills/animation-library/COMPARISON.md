# Animation + Rendering Library Comparison

Thirty JS/TS libraries across two buckets — **motion** (16) and **rendering** (14) — side-by-side. All cells are sourced from the per-library research under `motion/<slug>/` and `rendering/<slug>/`. Where a per-library report marked a value "unknown" or "estimate," this matrix mirrors that. Nothing has been invented.

Legend: ✅ = first-class / built-in · ⚠️ = partial / indirect / plugin-only · ❌ = not supported

---

## Part 1a — Motion matrix (16 rows)

| Library | Category | Bundle gzip (source) | License | Framework support | Paradigm | Scroll-driven | Timeline | Physics/spring | SVG-first | Canvas/WebGL | Designer-asset runtime | Maintenance | Primary source |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [animate-css](motion/animate-css/) | CSS-only | ~5 kB (jsdelivr min.css, measured) | Hippocratic-2.1 | Framework-agnostic (pure CSS classes) | Declarative (CSS classes) | ❌ | ❌ | ❌ | ⚠️ (transforms only) | ❌ | ❌ | stable / feature-complete since v4.1.1 (Sep 2020) | https://animate.style |
| [anime](motion/anime/) | Timeline engine | ~36 kB full ESM; ~3 kB `animejs/waapi` submodule (readme; bundlephobia) | MIT | Framework-agnostic (DOM, SVG, JS objects) | Imperative | ⚠️ (not built-in) | ✅ | ⚠️ spring easing only | ✅ | ⚠️ via JS-object animation | ❌ | active (v4 rewrite Feb 2026) | https://animejs.com |
| [auto-animate](motion/auto-animate/) | Drop-in DOM animator | ~3.2 kB (bundlephobia) | MIT | Vanilla, React, Vue, Nuxt, Solid, Preact, Angular, Svelte | Declarative (zero-config) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | active | https://auto-animate.formkit.com |
| [gsap](motion/gsap/) | Timeline engine | Core ~26.6 kB; +ScrollTrigger ~18.3 kB (readme-measured) | Custom Webflow license (commercial use free) | Vanilla, React (`@gsap/react`), Vue, Angular, Next, Nuxt, Svelte | Imperative | ✅ (ScrollTrigger) | ✅ | ❌ (curve-based ease, not physics) | ✅ (DrawSVG, MorphSVG, MotionPath) | ⚠️ (via JS-object + `onUpdate`) | ❌ | active (v3.15.0, Apr 2026, Webflow-owned) | https://gsap.com |
| [lenis](motion/lenis/) | Smooth scroll | ~4 kB (homepage claim; bundlephobia did not render) | MIT | Vanilla, React (`lenis/react`), Vue, Nuxt, Framer | Imperative | ⚠️ (provides scroll position, not animation) | ❌ | ❌ | ❌ | ⚠️ (integrates with WebGL RAF) | ❌ | active (v1.3.23, 2026-04-15; Locomotive v5 wraps it) | https://lenis.darkroom.engineering |
| [motion](motion/motion/) | React physics + hybrid engine | ~4.6 kB initial w/ LazyMotion + `domAnimation`; ~34 kB full `motion.div` path (motion.dev docs) | MIT (Motion+ add-on $399 optional) | React 18/19, Vue/Nuxt, vanilla (`motion/dom`, `motion/mini`) | Declarative + imperative | ✅ (ScrollTimeline when available) | ⚠️ (sequence API; not scrub-GUI) | ✅ | ⚠️ (animates SVG attrs; no MorphSVG) | ❌ | ❌ | active (v12.38.0, Mar 2026; absorbed Popmotion) | https://motion.dev |
| [popmotion](motion/popmotion/) | Headless primitive (dormant) | ~6.8 kB whole pkg (bundlephobia) | MIT | Framework-agnostic (no DOM/SVG bindings) | Imperative | ❌ | ❌ | ✅ (raw spring generator) | ❌ | ❌ (headless; consumer wires renderer) | ❌ | dormant / absorbed into Motion (last publish 2022-08-15) | https://popmotion.io |
| [react-spring](motion/react-spring/) | React physics | ~19.2 kB (`@react-spring/web`, readme-measured) | MIT | React (web, native), R3F (`@react-spring/three`), Konva, Zdog | Declarative + imperative | ❌ | ⚠️ (`useChain`; no scrub) | ✅ | ⚠️ (via `animated.*` SVG tags) | ⚠️ (via `@react-spring/three` or `@react-spring/konva`) | ❌ | stable (v10.0.3, 2024-09-18; React 19 compat shipped) | https://react-spring.dev |
| [react-transition-group](motion/react-transition-group/) | Legacy (unmaintained) | ~4 kB (bundlephobia) | BSD-3-Clause | React >=16.6 | Declarative (lifecycle only) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | unmaintained (v4.4.5, 2022-08-01; last substantive commit Dec 2022) | https://github.com/reactjs/react-transition-group |
| [tailwindcss-animate](motion/tailwindcss-animate/) | Tailwind utility | n/a — CSS plugin (plugin JS ~4.9 KB, not shipped to browser) | MIT | Tailwind v3 plugin (framework-agnostic) | Declarative (CSS classes) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | dormant (v1.0.7, 2023-08-28; no Tailwind v4 support) | https://github.com/jamiebuilds/tailwindcss-animate |
| [tailwindcss-motion](motion/tailwindcss-motion/) | Tailwind utility | n/a — CSS plugin (0 runtime JS; CSS varies by purge) | MIT (Rombo editor: Free / $19 mo Pro) | Tailwind ≥3 plugin | Declarative (CSS classes) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | active (v1.1.1, 2024-06-10; v4 support merged Dec 2024) | https://rombo.co/tailwind |
| [theatre](motion/theatre/) | Timeline engine (GUI) | ~20 KiB gz `@theatre/core` (package readme) | Apache-2.0 (core); AGPL-3.0 (studio dev-only) | Vanilla JS, React (via `@theatre/r3f`), any renderer via callback | Declarative (state-driven) | ❌ | ✅ (scrub-able sheets/sequences) | ❌ | ⚠️ (via onValuesChange → manual) | ✅ (`@theatre/r3f` binds WebGL) | ⚠️ (consumes authored JSON state) | dormant-public (last publish 2024-05-19; 1.0 in private repo ≥23 months) | https://www.theatrejs.com |
| [tw-animate-css](motion/tw-animate-css/) | Tailwind utility | n/a — CSS plugin (tree-shaken by Tailwind v4) | MIT | Tailwind CSS v4+ (CSS-first; any framework) | Declarative (CSS classes) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | active (v1.4.0, 2025-09-24; shadcn/ui v4 default since Mar 2025) | https://github.com/Wombosvideo/tw-animate-css |
| [use-gesture](motion/use-gesture/) | Gesture primitives | ~8.88 kB gz (bundlephobia) | MIT | React (`@use-gesture/react`) + vanilla (`@use-gesture/vanilla`) | Imperative (hooks) | ❌ (produces gesture deltas, not scroll) | ❌ | ❌ (produces velocity → feed spring lib) | ❌ | ❌ | ❌ | stable (v10.3.1, 2024-03-22; embedded in pmndrs stack) | https://use-gesture.netlify.app |
| [view-transitions-api](motion/view-transitions-api/) | Browser-native | n/a — browser API | Web standard (no SPDX) | Any (browser-native) | Declarative (CSS) + JS trigger | ❌ | ❌ | ❌ | ❌ (bitmap snapshots only) | ❌ | ❌ | active (Level 1 Baseline widely available; Level 2 cross-doc Chromium+Safari, no Firefox) | https://drafts.csswg.org/css-view-transitions-1/ |
| [waapi](motion/waapi/) | Browser-native | n/a — browser API | Web standard (no SPDX) | Any (browser-native) | Imperative | ⚠️ (ScrollTimeline/ViewTimeline; Firefox behind flag) | ⚠️ (no native timeline object; sequence effects manually) | ❌ (no spring easing) | ⚠️ (animatable CSS props only) | ❌ | ❌ | active (Level 1 Baseline widely available) | https://www.w3.org/TR/web-animations-1/ |

### Notes on motion matrix

- **Physics/spring for GSAP** — ❌ by the dossier.md's own explicit callout: "GSAP eases are curve-based, not physics-based." GSAP's `InertiaPlugin` adds physics-flavoured deceleration but is not a spring model.
- **Canvas/WebGL** cells in the motion matrix mark ⚠️ when the library animates JS object properties that the developer must wire into a render loop (e.g., GSAP + three.js uniforms). ✅ is reserved for libraries with a built-in render-target binding (e.g., Theatre's `@theatre/r3f`, react-spring's `@react-spring/three`).
- **Designer-asset runtime** is ⚠️ for Theatre because `@theatre/core` replays designer-tuned JSON state; keyframes are authored in Studio. On the motion bucket, ✅ would mean a pre-authored asset format (Lottie-like); no motion library fits that.
- **Bundle size sourcing**: "bundlephobia" = live value; "readme" = figure quoted in the library's package readme or docs; "measured" = file size fetched from the CDN as-shipped.

---

## Part 1b — Rendering matrix (14 rows)

| Library | Category | Dimension | Runtime | License | Framework bindings | Bundle gzip (source) | Built-in scene graph | Built-in animation / tween | Pre-authored asset input | Maintenance | Primary source |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [babylon-js](rendering/babylon-js/) | 3D engine | 3D | WebGL + WebGPU | Apache-2.0 | Vanilla JS/TS; `react-babylonjs` (community, stale) | ~158 kB (readme/bundlephobia) | ✅ | ✅ (Animation groups + skeletal) | ✅ (glTF, Babylon native scene) | active (v9.3.4, 2026-04-21; Microsoft-backed) | https://babylonjs.com |
| [fabric-js](rendering/fabric-js/) | 2D Canvas (design editor) | 2D | Canvas 2D (WebGL for image filters only) | MIT | Vanilla JS/TS only (community React wrappers unsupported) | ~89 kB (bundlephobia, v7.3.1) | ✅ | ⚠️ limited — `fabric.util.animate`, no scrub | ✅ (SVG round-trip, JSON state) | active (v7.3.1, 2026-04-19) | https://fabricjs.com |
| [konva](rendering/konva/) | 2D Canvas UI | 2D | Canvas 2D | MIT | Vanilla; React (`react-konva`); Vue (`vue-konva`) | ~54 kB (bundlephobia, v10.2.5) | ✅ | ✅ (`Konva.Tween`, `Konva.Animation`) | ✅ (JSON serialisation) | active (v10.2.5, 2026-04-11) | https://konvajs.org |
| [lottie](rendering/lottie/) | Designer runtime | 2D | lottie-web: SVG / Canvas 2D / HTML. dotlottie-web: WASM → Canvas 2D | MIT (both runtimes) | lottie-web: vanilla + community wrappers. dotlottie-web: vanilla + official React/Vue/Svelte/Solid/WC | lottie-web ~75 kB; dotlottie-web ~33 kB JS + runtime-fetched WASM (readme) | ❌ (animation-only) | ✅ (entire library is a playback system) | ✅ (`.json` for lottie-web; `.lottie` + `.json` for dotlottie-web) | split: lottie-web slow (last push 2025-09-01); dotlottie-web active (weekly) | https://airbnb.io/lottie |
| [p5-js](rendering/p5-js/) | Creative coding | 2D+3D | Canvas 2D (P2D), WebGL, WebGPU (experimental) | LGPL-2.1 | Vanilla (global or instance mode); no first-class React binding | ~275 kB (bundlephobia, p5@2.2.3) | ❌ (immediate-mode draw, no retained scene) | ⚠️ (frame-driven only via `draw()` loop) | ⚠️ (images, fonts; no scene format) | active (v2.2.3, 2026-03-23; v1 still default in online editor until Aug 2026) | https://p5js.org |
| [phaser](rendering/phaser/) | Game engine | 2D | WebGL (RenderNode v4) + Canvas 2D (deprecated) | MIT | Vanilla JS/TS; no first-class React binding | ~349 kB (bundlephobia, v4.0.0) | ✅ (Scene → GameObjects) | ✅ (Tweens, AnimationManager, state machines) | ⚠️ (tilemaps, sprite sheets) | active (v4.0.0 "Caladan", 2026-04-10 — biggest release in project history) | https://phaser.io |
| [pixi-js](rendering/pixi-js/) | 2D WebGL/WebGPU | 2D | WebGPU → WebGL → Canvas fallback | MIT | Vanilla JS/TS; React via [@pixi/react](rendering/pixi-react/) | ~244 kB (bundlephobia, v8.18.1) | ✅ (Container tree, RenderGroups) | ⚠️ limited-scope (Ticker loop; no tween system — typical pairing is GSAP) | ⚠️ (sprite sheets, `gl2D` experimental) | active (v8.18.1, 2026-04-14) | https://pixijs.com |
| [pixi-react](rendering/pixi-react/) | React binding | 2D | Wraps PixiJS v8 (WebGPU → WebGL → Canvas) | MIT | React ≥ 19 (peer dep) | ~40 kB (bundlephobia) | ✅ (via PixiJS) | ⚠️ (inherits PixiJS; `useTick` hook) | ⚠️ (inherits PixiJS) | active (v8.0.5, 2025-12-01; first-party under `pixijs/` org) | https://react.pixijs.io |
| [react-konva](rendering/react-konva/) | React binding | 2D | Wraps Konva (Canvas 2D) | MIT | React 19 (v19.x branch); 18.x branch for React 18 | ~39 kB + ~53 kB konva peer = ~92 kB (bundlephobia) | ✅ (via Konva) | ✅ (via Konva) | ✅ (via Konva JSON) | active (v19.2.3; version tracks React major) | https://konvajs.org/docs/react/ |
| [react-three-fiber](rendering/react-three-fiber/) | React binding | 3D | Wraps three.js (WebGL + experimental WebGPU) | MIT | React 19 (r3f v9); React Native via r3f-native + Expo ≥43 | ~50 kB fiber + ~178 kB three = ~228 kB (bundlephobia) | ✅ (via three.js) | ⚠️ (useFrame hook; pair with react-spring/three or Theatre.js) | ✅ (GLTF via drei's `useGLTF`) | active (fiber 9.6.0, 2026-04-13; drei 10.7.7) | https://r3f.docs.pmnd.rs |
| [react-three-rapier](rendering/react-three-rapier/) | Physics (R3F) | 3D | WASM (rapier.rs → compiled Rust) | MIT | `@react-three/fiber` ≥9.0.4; React ≥19; three ≥0.159 | ~12 kB wrapper; ~824 kB gz full (incl. WASM) — bundlephobia + readme | ❌ (adds physics to R3F scene graph) | ⚠️ limited (physics step; not a tween engine) | ❌ | active (v2.2.0, 2025-11-03) | https://pmndrs.github.io/react-three-rapier |
| [remotion](rendering/remotion/) | Video renderer | 2D+3D (via React DOM/canvas) | Node.js + headless Chromium for export; optional `@remotion/player` in browser | Custom "Remotion License" — free for individuals & ≤3-employee companies; paid Company License required at 4+ | React only (React 18+) | n/a — not a browser animation runtime (see dossier.md; bundlephobia unresponsive) | ❌ (composition = React tree) | ✅ (`useCurrentFrame`, `interpolate`, `spring`) | ✅ (Audio, Video, Img, Lottie via community pkg) | active (v4.0.451 on npm, 2026-04-22) | https://remotion.dev |
| [rive](rendering/rive/) | Designer runtime | 2D | WASM (`@rive-app/canvas`) → Canvas 2D; `@rive-app/webgl2` → WebGL2 | MIT (runtimes); proprietary SaaS editor (Free → $120/seat/mo) | Vanilla, React, React Native, Flutter, iOS, Android, Unity, Unreal, Webflow, WordPress | `canvas-lite` 222 KB / `canvas` 567 KB / `webgl2` 648 KB brotli-9 (Rive docs; gzip not published) | ✅ (Artboards + state machines) | ✅ (timelines + state machines, Data Binding replacing Inputs API) | ✅ (`.riv` binary) | active (`@rive-app/canvas` 2.37.3, 2026-04-20) | https://rive.app |
| [three-js](rendering/three-js/) | 3D engine | 3D | WebGL2 (primary) + WebGPU (production-ready since r171) | MIT | Vanilla JS; React via [react-three-fiber](rendering/react-three-fiber/) | ~178 kB (bundlephobia, v0.184.0) | ✅ | ⚠️ limited-scope (`AnimationMixer` for skeletal/morph only) | ✅ (GLTF/GLB via `GLTFLoader`) | active (r184, 2026-04-16) | https://threejs.org |

### Notes on rendering matrix

- **"Built-in animation / tween system" ⚠️** is used in two distinct senses: (a) three.js / pixi-js / pixi-react / r3f have a frame-tick primitive but no general-purpose tween; external motion libraries are the canonical pairing. (b) react-three-rapier steps physics, which is animation in effect but not a tween API.
- **Bundle numbers** for three.js and PixiJS are significant (~178 kB, ~244 kB gz) — pair them with a motion library, do not treat "three.js + gsap" as "178 + 26 kB" without measuring your tree-shaken build.
- **Remotion's bundle cell is n/a** because `remotion` core + `@remotion/renderer` are Node-only. `@remotion/player` has a browser bundle not confirmed against a primary source in the per-library research.

---

## Part 2 — Narrative synthesis

### Overlap clusters

**Motion engines for React: [Motion](motion/motion/) ⇄ [React Spring](motion/react-spring/) ⇄ [Popmotion](motion/popmotion/).** Motion is the dominant declarative option — it absorbed Popmotion around framer-motion v7.6.18 (Dec 2022); Popmotion's spring primitives now live inside motion-dom rather than the standalone `popmotion` package. React Spring is the physics-first alternative from the pmndrs collective; its exclusive selling point is `@react-spring/three` for R3F, plus render targets across web, native, Three, Konva, and Zdog. React + 3D canvas → React Spring edges ahead; React + 2D DOM/SVG → Motion's ecosystem and gesture built-ins win. Popmotion should never be chosen for new code — it remains in the dossier only because ~1.98M weekly downloads still flow through pinned framer-motion ≤v7 deps.

**Timeline engines: [GSAP](motion/gsap/) ⇄ [Anime.js](motion/anime/) ⇄ [Theatre.js](motion/theatre/).** Three flavors of the same problem. GSAP is the imperative code-only standard — v3.15.0 (Apr 2026), all formerly paid plugins (SplitText, MorphSVG, ScrollSmoother, DrawSVG) now free under the post-Webflow custom license. Anime.js v4 is a full rewrite with named exports and a tree-shakeable `animejs/waapi` submodule (~3 kB). Theatre.js is the same timeline reframed as a designer-facing GUI with JSON-serialised state — keyframes edited in Studio, production ships only `@theatre/core`. Theatre trap: last public publish 2024-05-19, ~23 months of silence, 1.0 opaque in a private repo.

**Smooth scroll layer: [Lenis](motion/lenis/) (solo).** Lenis has won outright. Surprise buried in the audit: **Locomotive Scroll v5 is a thin wrapper over Lenis** — `lenisInstance` is exposed directly and Locomotive now contributes only an IntersectionObserver parallax layer on top (see [motion/lenis/references/differentiators.md](motion/lenis/references/differentiators.md)). The 2026 canonical stack for creative / agency sites is Lenis + GSAP ScrollTrigger + R3F; GSAP and the Lenis team document the integration officially.

**Gesture primitives ⇄ spring libs: [@use-gesture/react](motion/use-gesture/) + [react-spring](motion/react-spring/) / [Motion](motion/motion/).** use-gesture produces kinematic deltas (velocity, direction, swipe classification); it does not animate. The pmndrs canonical stack is `@use-gesture/react → react-spring → react-three-fiber`. Motion's own gesture props (`drag`, `whileHover`, `whileTap`) cover ~80% of needs without use-gesture, which is why use-gesture tends to appear in react-spring projects more than Motion ones.

**Zero-config layout transitions: [AutoAnimate](motion/auto-animate/) ⇄ Motion layout ⇄ [View Transitions API](motion/view-transitions-api/).** AutoAnimate is the one-line opt-in for list reorder / conditional render. Motion's `layout` / `layoutId` is the richer equivalent when you are already paying Motion's runtime. View Transitions solves the same problem browser-side via bitmap cross-fade — zero bundle, but Level 2 cross-document is Chromium + Safari only (no Firefox as of April 2026).

**Browser-native primitives: [WAAPI](motion/waapi/) ⇄ [View Transitions API](motion/view-transitions-api/).** WAAPI underpins both Motion's hybrid engine and Anime.js's `animejs/waapi` submodule. View Transitions is standalone — no dossier library wraps it; Motion and GSAP provide no VTA helpers, so shared-element route transitions mean using VTA directly or `motion`'s `layoutId` with more runtime cost.

**Tailwind utility lineage.** [tailwindcss-animate](motion/tailwindcss-animate/) (v1.0.7 Aug 2023, no commits since) was the shadcn/ui default through March 2025. On 2025-03-19, shadcn/ui deprecated it in favour of [tw-animate-css](motion/tw-animate-css/), a Tailwind v4-compatible CSS-first drop-in (see [motion/tw-animate-css/references/overview.md](motion/tw-animate-css/references/overview.md)). [tailwindcss-motion](motion/tailwindcss-motion/) is a parallel effort from Rombo with a free/paid visual authoring tool. Which one you pick is downstream of your Tailwind major version, not your use case.

**Legacy reality check.** [react-transition-group](motion/react-transition-group/) ships ~51M/wk npm downloads and has had no substantive commit since December 2022 — count is almost entirely transitive via MUI, Chakra UI, Ant Design. [animate.css](motion/animate-css/) sits at ~574K/wk despite being intentionally feature-complete since v4.1.1 (Sep 2020). Both stay in the dossier for audit-only reasons: you will encounter them transitively in almost every enterprise React stack.

**Designer-asset runtimes: [Lottie](rendering/lottie/) ⇄ [Rive](rendering/rive/).** Lottie has effectively forked — `lottie-web` (Airbnb, ~5.3M/wk, last push 2025-09-01, maintenance-only) vs. `@lottiefiles/dotlottie-web` (LottieFiles, ~1M/wk, weekly releases, WASM ThorVG renderer with `.lottie` binary, state machines, OffscreenCanvas). New 2026 code should default to dotlottie-web. Rive is the interactive-first alternative — state machines, Data Binding replacing the older Inputs API, proprietary SaaS editor ($0 free / $9-$120 paid), MIT runtimes across web, native mobile, Flutter, Unity, Unreal. Pick Lottie for playback-only illustration; pick Rive when animation branches must respond to runtime state.

**3D engines: [three.js](rendering/three-js/) vs. [babylon.js](rendering/babylon-js/).** The 55× download gap: ~8.7M/wk three.js vs. ~157K/wk `@babylonjs/core`. Three.js wins on community gravity; Babylon wins on batteries-included (Havok bundled, Node Material Editor, first-class WebXR). Critical audit point from [rendering/babylon-js/references/drawbacks.md](rendering/babylon-js/references/drawbacks.md): `react-babylonjs` ships ~2.7K/wk with last push September 2025 and no stable 3.x — not a viable React 3D option.

**R3F stack: [react-three-fiber](rendering/react-three-fiber/) + `@react-three/drei` + [@react-three/rapier](rendering/react-three-rapier/)** is the default 3D-in-React toolkit. R3F v9 and rapier v2.x require React 19 and three ≥0.159. Rapier's WASM payload (~824 kB gz) matters for bundle-budget-sensitive landing pages.

**2D WebGL sprite graphs: [pixi-js](rendering/pixi-js/) + [@pixi/react](rendering/pixi-react/).** @pixi/react v8 is now first-party under the `pixijs` GitHub org, wrapping PixiJS v8 in a React-19 reconciler with `useTick` as the game-loop primitive. PixiJS's v8 architecture (WebGPU first-class, WebGL and Canvas fallbacks) makes it the 2D counterpart to R3F.

**2D Canvas interactive UIs: [konva](rendering/konva/) + [react-konva](rendering/react-konva/).** Contrarian download fact: konva ~1.26M/wk exceeds pixi.js's ~578K/wk. The Konva niche — diagram editors, annotation overlays, seat maps — is larger than pixi.js's sprite/game niche in production usage, even though pixi.js has higher developer mindshare.

**Design-editor niche: [fabric-js](rendering/fabric-js/).** Canva-likes and whiteboards. Selling points: inline rich-text editing on canvas (`Textbox` with per-character styling, IME), SVG round-trip, per-object controls. Weakness: no first-party React binding; community wrappers lag core releases.

**Creative coding: [p5-js](rendering/p5-js/).** Sketch-first, educational-first. v2.x brought JS-authored shaders (`p5.strands`), OKLCH/HDR colour, variable fonts, experimental WebGPU renderer. Online p5 Editor still defaults to v1.x until at least August 2026 — a migration-control signal, not an adoption one.

**Game engine on a personal site: [phaser](rendering/phaser/) v4.** v4.0.0 "Caladan" (Apr 10 2026) is the largest release in project history — WebGL renderer rebuilt around a `RenderNode` architecture; new `SpriteGPULayer` / `TilemapGPULayer` GameObjects render 1M+ sprites in a single draw call. Portfolio fit is narrow: if the experience IS a mini-game, Phaser earns its 349 kB gz; for general interactive canvas, pixi-js at 244 kB without game-engine overhead is the better pick.

**Video renderer: [remotion](rendering/remotion/) (solo).** React → MP4 via headless Chromium + ffmpeg. Licensing gotcha: free for individuals and companies of ≤3 employees; 4+ requires a paid Company License — the only non-OSS license in the 30-library dossier.

### Decision shortcuts ("If you need X, use Y")

- Declarative React + layout animations → **[Motion](motion/motion/)**
- Per-character / stroke-drawn SVG with timeline control → **[GSAP](motion/gsap/)** (all plugins now free)
- Smooth-scroll foundation under GSAP ScrollTrigger → **[Lenis](motion/lenis/)**
- Gesture drag on a spring (pmndrs stack) → **[@use-gesture/react](motion/use-gesture/) + [react-spring](motion/react-spring/)** (in a Motion-only stack use Motion's `drag` prop)
- Interactive designer-authored runtime → **[Rive](rendering/rive/)**
- After-Effects-native illustrative motion → **[Lottie](rendering/lottie/)** (prefer `@lottiefiles/dotlottie-web` for new code)
- Programmatic video export → **[Remotion](rendering/remotion/)**
- 3D scene in React → **[react-three-fiber](rendering/react-three-fiber/) + drei** (add **[@react-three/rapier](rendering/react-three-rapier/)** for physics)
- 3D without React, or heavy game-engine needs → **[Babylon.js](rendering/babylon-js/)** (Havok bundled); vanilla 3D or Vue/Svelte → **[three.js](rendering/three-js/)**
- 2D sprites / particles / GPU-heavy 2D → **[pixi-js](rendering/pixi-js/)** (+ **[@pixi/react](rendering/pixi-react/)** for React)
- Interactive 2D canvas UI (diagram editor, annotation tool) → **[konva](rendering/konva/)** / **[react-konva](rendering/react-konva/)**
- Design editor (Canva-like, whiteboard, SVG round-trip) → **[fabric-js](rendering/fabric-js/)**
- Creative-coding sketch or educational visual → **[p5-js](rendering/p5-js/)**
- Portfolio mini-game or physics-heavy game loop → **[Phaser](rendering/phaser/) v4**
- Drop-in list reordering on add/remove → **[AutoAnimate](motion/auto-animate/)**
- Native route / state transitions where browser support is tolerable → **[View Transitions API](motion/view-transitions-api/)**
- CSS-only entrance animations without Tailwind → **[animate.css](motion/animate-css/)**
- Tailwind animations → **[tw-animate-css](motion/tw-animate-css/)** for v4 (shadcn/ui default), **[tailwindcss-animate](motion/tailwindcss-animate/)** for v3, **[tailwindcss-motion](motion/tailwindcss-motion/)** if you want a visual authoring tool
- Timeline scrubbing in a 3D scene tuned live by designers → **[Theatre.js](motion/theatre/)** (+ `@theatre/r3f`)
- Single micro-interaction with zero bundle cost → **[WAAPI](motion/waapi/)** (`element.animate()`)

### Trajectory notes

**Growing / actively maintained:** [Motion](motion/motion/) (v12.38.0 March 2026; independent of Framer BV since November 2024; absorbed Popmotion and Motion One into one `motion` package; ~30M monthly downloads); [GSAP](motion/gsap/) (v3.15.0 April 2026, Webflow-owned since 2024, all formerly paid Club GSAP plugins free as of v3.13.0); [Anime.js](motion/anime/) v4 (v4.3.6 Feb 2026, full rewrite with WAAPI-backed submodule); [Lenis](motion/lenis/) (v1.3.23 2026-04-15, ~420K/wk, Locomotive v5 wraps it); [Rive](rendering/rive/) (`@rive-app/canvas` 2.37.3, Data Binding replacing Inputs API); `@lottiefiles/dotlottie-web` (weekly releases, strategic direction of the Lottie ecosystem); [three.js](rendering/three-js/) r184 (`WebGPURenderer` production-ready since r171, September 2025); [Babylon.js](rendering/babylon-js/) v9.3.4 (shipped Apr 21); [pixi-js](rendering/pixi-js/) v8.18.1 with first-party [@pixi/react](rendering/pixi-react/) v8.0.5 under `pixijs/` org; [Konva](rendering/konva/) v10.2.5 / [react-konva](rendering/react-konva/) v19.2.3 (version tracks React major); [Fabric.js](rendering/fabric-js/) v7.3.1; [p5.js](rendering/p5-js/) v2.2.3 (online editor still defaults to v1.x until at least Aug 2026); [Phaser](rendering/phaser/) v4.0.0 "Caladan" (Apr 10 2026 — biggest release in project history, WebGL renderer rebuilt from scratch); [@react-three/rapier](rendering/react-three-rapier/) v2.2.0 (locked to React 19 / R3F v9).

**Stable / mature / slowing:** [React Spring](motion/react-spring/) (v10.0.3 Sep 2024, React 19 compat shipped, cadence has slowed to stability patches); [@use-gesture/react](motion/use-gesture/) (v10.3.1 March 2024, stable since the v10 rewrite, deeply embedded in pmndrs — slow cadence = maturity, not abandonment).

**Risks / dormant / unmaintained:** [Theatre.js](motion/theatre/) — last public publish 2024-05-19, ~23 months of public silence, 1.0 in a private repo with no public timeline; [Popmotion](motion/popmotion/) — last npm publish 2022-08-15, absorbed into Motion; Airbnb `lottie-web` — maintenance-only (last push 2025-09-01); [tailwindcss-animate](motion/tailwindcss-animate/) — no commits since August 2023, no Tailwind v4 support; [react-transition-group](motion/react-transition-group/) — v4.4.5 (Aug 2022), 258 open issues, ~51M/wk all transitive via MUI/Chakra/AntD; [animate.css](motion/animate-css/) — feature-complete at v4.1.1 (Sep 2020).

### Considered and rejected appendix

One-line dismissals. Sourced entries link into the per-library research; "scope-brief only" means the reason comes from the dossier planning brief, not a per-library primary source.

- **Locomotive Scroll** — now a Lenis wrapper: [motion/lenis/references/differentiators.md](motion/lenis/references/differentiators.md).
- **scrollama** — scope-brief only: stale since 2022.
- **ScrollMagic** — scope-brief only: aging / community-discouraged.
- **react-flip-toolkit** — Motion's `layout` prop covers it (scope-brief).
- **snap.svg / svg.js** — GSAP (DrawSVG/MorphSVG) and Motion cover SVG: [motion/gsap/references/overview.md](motion/gsap/references/overview.md).
- **Velocity.js** — scope-brief only: abandoned 2020.
- **mo.js / KUTE.js** — scope-brief only: near-zero 2026 signal.
- **matter.js** — 2D game physics; different scope. Bundled as the polygon option inside Phaser: [rendering/phaser/references/overview.md](rendering/phaser/references/overview.md).
- **react-motion** — scope-brief only: abandoned 2017, superseded by react-spring.
- **react-awesome-reveal** — scope-brief only: thin animate.css wrapper.
- **XState** — state machines, not animation; out of scope (scope-brief).
- **d3-transition** — data-viz only; out of scope (scope-brief).
- **PlayCanvas** — cloud-editor value-prop, not library-first (scope-brief).
- **luma.gl** — deck.gl internal; niche (scope-brief).
- **regl** — scope-brief: unmaintained; downloads transitive.
- **two.js** — scope-brief: stagnant 0.x.
- **paper.js** — scope-brief: unmaintained since 2021.
- **rough.js** — scope-brief: unmaintained since 2019.
- **Orillusion** — scope-brief: pre-commercial.
- **react-babylonjs** — ~2.7K/wk, last push Sep 2025, no stable 3.x: [rendering/babylon-js/references/drawbacks.md](rendering/babylon-js/references/drawbacks.md).

---

*All cells in Parts 1a and 1b are pulled from per-library dossier.md Quick Facts tables and `references/*.md` files. Where a per-library report marked a field "unknown" or "estimate," that qualifier is carried forward verbatim.*
