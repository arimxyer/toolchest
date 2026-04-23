# tailwindcss-animate — Drawbacks

## Tailwind v4 incompatibility (critical)

The plugin's peer dependency is `tailwindcss: ">=3.0.0 || insiders"` — Tailwind v4 is not listed. A community PR (#63) for v4 support was opened November 27, 2024 and remains unmerged as of 2026-04-22. The author shows no active engagement. If you are on or migrating to Tailwind v4, this library is a dead end.

**The ecosystem has moved**: shadcn/ui deprecated `tailwindcss-animate` on March 19, 2025 in favor of `tw-animate-css`, which has an identical class API and is a drop-in replacement.

## Abandoned maintenance

- Last release: v1.0.7, August 28, 2023.
- No changelog, no GitHub Releases, no commits since August 2023.
- Open issues and PRs are unaddressed by the author.
- For a new project, depending on this library means accepting no security patches, no bug fixes, and no v4 support unless you fork.

## No exit orchestration

CSS cannot delay DOM removal. `animate-out` will play the exit CSS animation, but the element is immediately removed if the DOM mutation happens simultaneously. You must manually coordinate class toggling and `animationend` events (or use a framework's transition system) to actually hold the element in the DOM long enough for the exit animation to finish. Libraries like Motion handle this automatically via `AnimatePresence`.

## No physics, spring, or scroll-linked animation

Only keyframe-based animations via CSS `@keyframes`. Bounce, spring, velocity-follow, and scroll-progress animations are outside the scope of this library.

## No programmatic control

There is no JS API. You cannot start, stop, seek, or sequence animations from code. The only control surface is `running` / `paused` classes and `delay-*` timing utilities. Complex choreography requires a different tool.

## Class-name verbosity

Composing multiple effects results in long class strings: `animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 delay-100 ease-out`. Tailwind's approach inherently produces this, but it's worth noting for readability.

## No built-in named presets

Unlike `tailwindcss-motion`, there are no higher-level named animation presets (e.g., `motion-preset-bounce`). Every animation must be composed from primitives, which is more verbose for common patterns.
