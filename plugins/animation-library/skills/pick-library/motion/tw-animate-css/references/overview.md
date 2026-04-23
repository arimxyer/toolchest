# tw-animate-css — Overview

## What it is

A pure-CSS animation utility library built as the Tailwind CSS v4 successor to `tailwindcss-animate`. It ships as a single CSS file imported via `@import "tw-animate-css"` — no `plugin()` call, no JavaScript runtime.

Maintained by **Wombosvideo** on GitHub. First released around early 2025; 22 releases as of the research date. 747 GitHub stars, 12 forks.

## Relationship to tailwindcss-animate

`tailwindcss-animate` is a Tailwind v3 JavaScript plugin. With Tailwind v4's CSS-first architecture, JS plugins are no longer the idiomatic extension mechanism. `tw-animate-css` provides the same animate-in/animate-out utility vocabulary as a plain CSS import that works natively in v4.

**shadcn/ui adoption (official):** On March 19, 2025, shadcn/ui deprecated `tailwindcss-animate` in favor of `tw-animate-css` for all v4 projects. All three shadcn/ui v4 base registry styles (`radix`, `base`, `new-york-v4`) declare `tw-animate-css` as a dev dependency with `@import "tw-animate-css"` injected into the global CSS. New shadcn/ui v4 projects install it automatically.

The maintainer notes it is not a 100% compatible drop-in; it covers the common subset used in practice. Breaking changes are expected in v2.0.0.

## Installation

```sh
npm install -D tw-animate-css
```

```css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";
```

## Animation model

Three-layer composition:

1. **Direction base** — `animate-in` or `animate-out`
2. **Effect modifiers** — stacked freely: `fade-in`, `zoom-in-95`, `slide-in-from-top-4`, `blur-in`
3. **Timing parameters** — standard Tailwind classes: `duration-300`, `delay-150`, `ease-out`

Pre-built animations for accordion/collapsible UI patterns (`accordion-down`, `accordion-up`, `collapsible-down`, `collapsible-up`) key off CSS custom properties published by Radix, BitsUI, Reka, and Kobalte. `caret-blink` is also included.

## Prefixed export

For Tailwind projects that use a class prefix, a separate entry point is provided:

```css
@import "tw-animate-css/prefix";
```
