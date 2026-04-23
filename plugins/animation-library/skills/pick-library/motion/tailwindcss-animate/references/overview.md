# tailwindcss-animate — Overview

A Tailwind CSS v3 plugin by Jamie Kyle (jamiebuilds) that exposes CSS animation properties as composable utility classes. The entire animation is declared in HTML via class names; no JavaScript is required at runtime.

## What it provides

Adds 24 utility families to Tailwind's class vocabulary:

- **Enter/exit orchestrators**: `animate-in`, `animate-out` — activate the enter or exit keyframe set.
- **Opacity**: `fade-in-{0–100}`, `fade-out-{0–100}`
- **Scale**: `zoom-in-{0–100}`, `zoom-out-{0–100}`
- **Rotation**: `spin-in-{degrees}`, `spin-out-{degrees}`
- **Translation**: `slide-in-from-{top|bottom|left|right}-{amount}`, `slide-out-to-{top|bottom|left|right}-{amount}`
- **Timing control**: `duration-{ms}`, `delay-{ms}`, `ease-{keyword}`, `repeat-{n}`
- **Direction**: `direction-{normal|reverse|alternate|alternate-reverse}`
- **Fill mode**: `fill-mode-{none|forwards|backwards|both}`
- **Play state**: `running`, `paused`

Each combine with Tailwind's default numeric scales to generate hundreds of concrete classes.

## How it works

Registered as a Tailwind plugin in `tailwind.config.js`. At build time, Tailwind generates only the classes referenced in your source (via content scanning). Zero JavaScript is shipped to the browser — all animation runs via CSS `@keyframes` and `animation` properties.

```js
// tailwind.config.js
module.exports = {
  plugins: [require("tailwindcss-animate")],
};
```

```html
<div class="animate-in fade-in zoom-in-50 duration-300 ease-out">
  Animates on mount
</div>
```

## Tailwind v4 status — IMPORTANT

`tailwindcss-animate` **does not support Tailwind v4**. The peer dependency is `tailwindcss: ">=3.0.0 || insiders"`. A community PR (#63) to add v4 compatibility was opened November 27, 2024 and remains unmerged as of 2026-04-22.

**shadcn/ui** formally deprecated `tailwindcss-animate` on March 19, 2025 and switched all new v4 projects to `tw-animate-css`, a CSS-first drop-in replacement with an identical class API.

## Maintenance status

- Latest version: 1.0.7 (August 28, 2023)
- No changelog, no GitHub Releases
- No commits since August 2023
- Repository issues open; no maintainer activity visible
