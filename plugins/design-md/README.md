# DESIGN.md Plugin

A skill for working with [DESIGN.md](https://github.com/google-labs-code/design.md) — Google Labs' open format for self-contained, plain-text design systems that stay consistent across design sessions and between AI agents and tools.

## What it does

A DESIGN.md file has two parts:

- **YAML frontmatter** — typed design tokens (colors, typography, spacing, rounded scale, components) following the Design Token JSON spec, with `{path.to.token}` cross-references.
- **Markdown body** — design rationale and guidance across eight standard sections (Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts).

Tokens convert cleanly to/from `tokens.json`, Figma variables, and Tailwind CSS — primary target is **Tailwind v4 `@theme` CSS directives**, with legacy v3 `tailwind.config.js` as fallback.

The skill bundles:

- **8 section references** — one per DESIGN.md section, loaded only when authoring or interpreting that section
- **Tailwind conversion guide** — v4 vs v3 detection signals plus full mapping tables
- **3 worked examples** — atmospheric-glass, paws-and-paths, totality-festival — each with the round-trip across `DESIGN.md`, `design_tokens.json` (DTCG), `theme.css` (v4), and `tailwind.config.js` (v3)
- **Starter template** — minimal DESIGN.md scaffold to copy and fill in
- **`design-to-theme.py`** — Python converter that emits Tailwind v4 `theme.css` from DESIGN.md frontmatter

## Usage

The skill triggers automatically when you work with DESIGN.md files, design tokens, or Tailwind theme conversions. Or invoke directly:

```
/design-md:design-md generate a DESIGN.md for a high-contrast festival landing page
/design-md:design-md convert this DESIGN.md to Tailwind v4 @theme CSS
```

## Updating

The spec is sourced from [google-labs-code/design.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) (currently `alpha`). Examples mirror the upstream `examples/` directory verbatim, with `theme.css` synthesized locally via `scripts/design-to-theme.py`.

To refresh examples:

```bash
# pull upstream verbatim files
curl -sL https://raw.githubusercontent.com/google-labs-code/design.md/main/examples/<name>/DESIGN.md -o ...
# regenerate v4 theme.css
python3 scripts/design-to-theme.py path/to/DESIGN.md > theme.css
```
