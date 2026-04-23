# tw-animate-css — Drawbacks

## Tailwind v4-only
The library is designed exclusively for Tailwind CSS v4's CSS-first architecture. Projects on Tailwind v3 must use `tailwindcss-animate` instead. No v3 compatibility layer exists.

## Youth and stability risk
The library had its first notable public adoption (shadcn/ui) only in March 2025. At research time (April 2026) it has 22 releases and 747 stars — a small community footprint compared to established animation libraries. Breaking changes are explicitly anticipated in v2.0.0. The API surface has already shifted (fill-mode default, prefix entry point) across minor versions.

## Not a 100% compatible tailwindcss-animate replacement
The maintainer explicitly states it is not a complete drop-in. Projects relying on edge-case behavior or full class parity from `tailwindcss-animate` may encounter gaps during migration.

## No JavaScript layer — no orchestration
There is no way to sequence animations, respond to completion callbacks, coordinate multiple elements, or apply conditional logic. If any of these are required, a JS animation library (Motion, GSAP, React Spring) is necessary. tw-animate-css cannot replace them.

## Accordion/collapsible animations require external CSS vars
The pre-built component animations (`accordion-down`, etc.) depend on CSS custom properties published by specific headless UI libraries (Radix, BitsUI, Reka, Kobalte, ng-primitives). Outside those ecosystems, height-animating collapsible patterns must be wired manually or require a different approach.

## Limited utility count vs. full-featured alternatives
Compared to `tailwindcss-motion`, which offers per-property timing control and more granular composition, tw-animate-css covers a narrower set of effects (fade, zoom, slide, spin, blur) with coarser control. Complex motion sequences are out of scope.

## Gzipped size unknown
Because it is CSS-only, bundlephobia does not provide meaningful gzipped size data. The actual size impact depends on which utilities Tailwind's tree-shaking retains, so it is not straightforward to quote a single number.
