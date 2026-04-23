# Anime.js — Overview

## What it is

Anime.js is a lightweight JavaScript animation engine for the browser. It animates CSS properties, SVG attributes, DOM attributes, and plain JavaScript object properties using a unified, declarative-parameter API.

## V3 vs V4 — Breaking Rewrite

V4 is a **full rewrite** with an incompatible API. Key differences:

| | V3 | V4 |
|---|---|---|
| Import style | `import anime from 'animejs'` (default export) | `import { animate, stagger, timeline } from 'animejs'` (named exports only) |
| Global `anime` object | Yes — `anime({ ... })` | Removed |
| Architecture | Monolithic bundle | Fully modular with subpath exports (`animejs/animation`, `animejs/timer`, `animejs/waapi`, etc.) |
| WAAPI integration | No | Yes — `waapi.animate()` ships as a 3 KB alternative backend |
| `splitText` | No | Yes — built-in text splitting for char/word/line animations |
| Draggable | No | Yes — `Draggable` module |
| TypeScript | Types via DefinitelyTyped | First-party types shipped with package |
| npm package name | `animejs` | `animejs` (unchanged) |

A migration guide from v3 to v4 is maintained at: https://github.com/juliangarnier/anime/wiki/Migrating-from-v3-to-v4

## Current version

4.3.6, released 2026-02-13. MIT license, no commercial restrictions.

## Runtime targets

DOM elements (CSS property and attribute animation), SVG elements (path morphing, stroke, transform), plain JS objects, Canvas (any numeric property). Browser-only — no server-side rendering output.

## Module structure

V4 ships all distribution formats (ESM, CJS, UMD, IIFE, minified variants) in the npm package (~1.8 MB unpacked). With a bundler, tree-shake to only the submodules used:

- `animejs` — full library (named exports)
- `animejs/animation` — `animate()` only (~10 KB gzip)
- `animejs/waapi` — `waapi.animate()` only (~3 KB gzip)
- `animejs/timeline`, `animejs/timer`, `animejs/draggable`, `animejs/scope`, `animejs/svg`, `animejs/text`, `animejs/utils`
