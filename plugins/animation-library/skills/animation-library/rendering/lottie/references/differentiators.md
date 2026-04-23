# Lottie — Differentiators

## vs. Rive

Rive is the closest conceptual sibling: both ship designer-authored animations to a runtime. Key differences:

- **Authoring tool lock-in:** Lottie accepts After Effects exports (industry-standard tool most motion designers already use). Rive requires its own web-based editor — a harder org adoption if designers are AE-native.
- **Format:** Lottie uses open JSON/`.lottie` (inspectable, toolable). Rive uses a proprietary binary `.riv` format.
- **State machines:** Both support them. Rive's state machine system is more mature and expressive (nested states, blend trees, listeners). `dotlottie-web` 0.x state machines are newer and simpler.
- **Renderer:** Rive uses its own WASM renderer (Rive Renderer or fallback). `dotlottie-web` uses ThorVG WASM. `lottie-web` uses JS SVG/Canvas. Rive's renderer has better AE feature parity for complex effects.
- **File size:** Rive `.riv` files tend to be smaller than equivalent Lottie JSON for complex animations due to binary encoding.
- **Verdict:** If your team is AE-native, Lottie is the natural path. If you're starting fresh and need rich interactivity, Rive is worth evaluating.

## vs. motion (Framer Motion)

- `motion` animates arbitrary React component props via JS-driven spring/keyframe physics. Lottie plays pre-baked timelines authored by a designer.
- Use `motion` for UI transitions, micro-interactions, drag/gesture response. Use Lottie for illustrative/decorative animations that originated in AE.
- They are complementary: `motion` for component choreography, Lottie for illustrative assets.

## vs. GSAP

- GSAP is a pro-grade JS animation engine for arbitrary DOM/CSS/SVG properties. Lottie is a player for designer-exported JSON animations.
- GSAP can drive Lottie animations (scroll-link via `lottie.goToAndStop()` + ScrollTrigger) — a common pattern.
- GSAP is for engineers coding animations; Lottie is for engineers playing designer-authored animations.

## vs. react-spring

- `react-spring` provides physics-based spring interpolation for React state → CSS/transform/SVG props. Lottie plays pre-baked frame sequences.
- Not direct competitors; often co-exist.

## vs. WAAPI / tailwindcss-animate / tailwindcss-motion

- CSS-native approaches animate only CSS properties (transform, opacity, color, etc.). They are zero-JS and zero-bundle for simple effects.
- Lottie handles complexity that CSS cannot: morphing shapes, gradient animations, masked layers, multi-element AE compositions.
- For a spinner or a fade-in, use CSS. For a character animation or a branded illustration that loops, use Lottie.

## vs. remotion

- Remotion is for programmatically composing and rendering video sequences in React. Lottie plays pre-authored animation files in the browser.
- Remotion can embed Lottie animations as components within a video composition.

## vs. Theatre.js

- Theatre.js is a programmatic animation sequencer with a studio GUI for choreographing React/Three.js scenes. Lottie plays designer-exported JSON with no code-level choreography.
- Complementary; Theatre.js can sequence when a Lottie animation plays.

## Unique Lottie strengths

1. **Designer-to-runtime pipeline with no re-implementation** — the gold standard for AE-native teams.
2. **lottie-web SVG renderer produces accessible, styleable DOM nodes** — unique among runtime-rendered animation libraries (Rive, dotlottie output Canvas only).
3. **Largest ecosystem of ready-to-use assets** — LottieFiles marketplace has millions of free and paid animations.
4. **Format openness** — Lottie JSON is inspectable, diffable, and toolable; many converters exist (Lottie → MP4, Lottie → GIF, Lottie → SVG static).
