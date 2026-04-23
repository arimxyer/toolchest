# tailwindcss-motion — Drawbacks

## Hard constraints

**Tailwind-only.** The plugin generates utilities via the Tailwind plugin API; it cannot be used without Tailwind CSS in the build chain. Teams not on Tailwind must look elsewhere (WAAPI, anime, motion).

**Pure CSS — no programmatic control.** You cannot pause, seek, reverse, or chain animations from JavaScript without adding your own state toggling (removing/re-adding classes). There is no JS API surface. Complex sequencing or scroll-linked progress is out of scope.

**Trigger model is class-presence only.** Animations fire when a class is present on mount. Replaying requires class removal + reflow + re-add. Intersection-observer triggering, hover triggering, and scroll progress all require additional JS glue that the library does not provide.

**No SVG path/stroke animation.** No equivalent of GSAP's DrawSVG or motion's `pathLength`. Limited to the CSS properties listed (opacity, transform axes, blur, color).

## Tailwind v4 compatibility

Initial v4 support was merged in December 2024, but as of April 2026 multiple bugs remain open: typewriter preset broken, confetti broken, color variable reset conflicts, `_flattenColorPalette` function error, and ESM import failures in production builds. Treat v4 as "officially supported but rough around the edges."

## Pro-tier gating (Rombo tooling)

The npm plugin itself is MIT/free. However, the Chrome Extension's custom animation creation and save-for-reuse features require a $19/mo Rombo Pro subscription. Team sharing and automated motion library generation require a custom-priced Team plan. Developers relying only on the preset catalog and the open-source plugin are unaffected, but the extension's most useful authoring workflow (build custom animations visually) is paywalled.

## Bundle/CSS output

The npm package unpacked size is ~457 KB (source + types). This includes TypeScript source and types; the actual CSS added to your bundle depends on Tailwind's purge/JIT behavior — only used utilities are emitted. However, users who use many presets or modifier combinations can generate substantial CSS since each combination is a distinct rule. There is no tree-shaking at the JS level because there is no JS runtime.

## Ecosystem maturity

The project was at v1.1.1 as of mid-2024, last tagged June 2024. Pace of tagged releases has slowed relative to the volume of open v4-related issues. Community size is much smaller than motion or GSAP. No official React/Vue wrapper or hook layer exists.
