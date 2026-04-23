# Rive — Drawbacks

## Editor lock-in — no code authoring path

`.riv` is a proprietary binary format produced exclusively by the Rive editor. There is no programmatic API to generate `.riv` files. Engineers cannot create or modify animations without a designer using the editor. This is a hard organizational dependency.

## Commercial use requires a paid editor seat

The free tier explicitly prohibits commercial export and shipping. Any team shipping Rive animations in a product must have at least one paid Cadet seat ($9/seat/mo). This is an ongoing licensing cost tied to the editor, separate from the MIT-licensed runtimes.

## WASM bundle weight

`@rive-app/canvas` is 1.7 MB uncompressed / 567 KB brotli-9. Even the lite variant is 222 KB brotli-9. For comparison, Lottie-Web is ~60 KB gzipped. The WASM binary dominates and is not tree-shakeable. On mobile web or bandwidth-constrained environments this is a meaningful penalty.

## Inputs API deprecation — docs/examples churn

The `stateMachineInputs()` / Trigger / Boolean / Number API is deprecated in favor of Data Binding. Many community tutorials and existing codebases use the old API. Onboarding engineers hit outdated patterns immediately. Data Binding is the forward path but has a steeper learning curve tied to editor-side binding configuration.

## No SSR / server-side rendering

The runtime is browser- and native-only. There is no way to render `.riv` frames server-side for OG images, PDFs, or static thumbnails. If you need a static frame of an animation, you need a separate asset.

## State machine authoring requires design skill + editor familiarity

State machine graphs are built in the Rive editor UI, not in code. Debugging a broken transition requires reopening the editor. There is no text-based representation of the state machine that engineers can audit or diff in source control (the binary `.riv` is not human-readable).

## Proprietary binary in version control

`.riv` files are binary. Git diff is meaningless; PR reviews cannot show what changed in an animation. Teams must rely on Rive's own editor history or external conventions for change tracking.

## No CSS-only fallback

If JavaScript is disabled or the WASM fails to load, nothing renders. There is no CSS fallback path. Accessibility and progressive enhancement require separate consideration.
