---
name: design-md
description: "DESIGN.md format specification from Google Labs — a self-contained plain-text representation of a design system that keeps visual identity consistent across design sessions and between AI agents and tools. A DESIGN.md file has two parts: YAML frontmatter holding typed design tokens (colors, typography, spacing, rounded scale, components) plus a markdown body with design rationale and guidance. Tokens follow the Design Token JSON spec with {path.to.token} cross-references and convert cleanly to/from tokens.json, Figma variables, and Tailwind CSS — primary target is Tailwind v4 @theme CSS directives, with legacy v3 tailwind.config.js as fallback. Use when working with DESIGN.md files, defining or editing design tokens, generating a DESIGN.md from scratch, converting tokens to/from tokens.json / Figma / Tailwind v4 @theme / Tailwind v3 config, interpreting another agent's DESIGN.md, or answering questions about the DESIGN.md format."
metadata:
  source: "https://github.com/google-labs-code/design.md/blob/main/docs/spec.md"
  version: "alpha"
---

# DESIGN.md

DESIGN.md is a self-contained, plain-text representation of a design system. It defines the visual identity of a brand and product so stylistic choices can be followed across design sessions and between different AI agents and tools. As a human-readable, open-format document, it serves as a living source of truth that both humans and AI can understand and refine.

A DESIGN.md file contains two parts: an optional YAML frontmatter and a markdown body. The frontmatter contains machine-readable design tokens. The markdown body sections provide human-readable design rationale and guidance. Prose may use descriptive color names (e.g., "Midnight Forest Green") that correspond to systematic token names (e.g., `primary`). The tokens are the normative values; the prose provides context for how to apply them.

## How to use this skill

1. **Starting a new DESIGN.md** → copy [`assets/templates/starter.md`](assets/templates/starter.md) and fill in each section.
2. **Studying a complete real-world example** → read one of the [Examples](#examples) below (each ships with the DESIGN.md plus its converted `design_tokens.json` and `tailwind.config.js` upstream).
3. **Authoring or interpreting tokens** (frontmatter) → read the [Design Tokens](#design-tokens) chapter below for the schema, types (`Color`, `Typography`, `Dimension`), and the `{path.to.token}` reference syntax.
4. **Authoring or interpreting one specific section** of the body → read only that section's reference file from the [Sections](#sections) table.
5. **Picking token names** → see [Recommended Token Names](#recommended-token-names-non-normative).
6. **Converting a DESIGN.md to Tailwind CSS** → read [references/tailwind-conversion.md](references/tailwind-conversion.md). Default to Tailwind v4 (`@theme` in CSS); fall back to v3 (`tailwind.config.js`) only when the project pins `tailwindcss@^3.x`, ships an existing v3 config without any `@theme` block, uses the v3 `@tailwind base; @tailwind components; @tailwind utilities;` directives, or the user explicitly asks for v3.
7. **Reading another agent's DESIGN.md with extension content** → see [Consumer Behavior for Unknown Content](#consumer-behavior-for-unknown-content).

## Design Tokens

DESIGN.md may embed design tokens in a structured format. The system that we use to describe design tokens is inspired by the [Design Token JSON spec](https://www.designtokens.org/tr/2025.10/format/#abstract). Specifically, we adopt the concept of typed token groups (colors, typography, spacing) and the `{path.to.token}` reference syntax for cross-referencing values.

These tokens are easily converted from or to `tokens.json`, Figma variables, and Tailwind theme configs.

Design tokens are embedded as YAML front matter at the beginning of the file. The front matter block must begin with a line containing exactly `---` and end with a line containing exactly `---`. The YAML content between these delimiters is parsed according to the schema defined below.

Example:

```yaml
---
version: alpha
name: Daylight Prestige
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
---
```

### Schema

```yaml
version: <string>          # optional, current version: "alpha"
name: <string>
description: <string>      # optional
colors:
  <token-name>: <Color>
typography:
  <token-name>: <Typography>
rounded:
  <scale-level>: <Dimension>
spacing:
  <scale-level>: <Dimension | number>
components:
  <component-name>:
    <token-name>: <string|token reference>
```

The `<scale-level>` placeholder represents a named level in a sizing or spacing scale. Common level names include `xs`, `sm`, `md`, `lg`, `xl`, and `full`. Any descriptive string key is valid.

**Color**: A color value must start with "#" followed by a hex color code in the SRGB color space.

**Typography**:
- `fontFamily` (string)
- `fontSize` (Dimension)
- `fontWeight` (number) — A numeric font weight value (e.g., `400`, `700`). In YAML, this may be expressed as either a bare number or a quoted string; both are equivalent.
- `lineHeight` (Dimension | number) — Accepts either a Dimension (e.g., `24px`, `1.5rem`) or a unitless number (e.g., `1.6`). A unitless number represents a multiplier of the element's `fontSize`, which is the recommended CSS practice.
- `letterSpacing` (Dimension)
- `fontFeature` (string) — configures [`font-feature-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-feature-settings).
- `fontVariation` (string) — configures [`font-variation-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variation-settings).

**Dimension**: A dimension value is a string with a unit suffix. Valid units are: `px`, `em`, `rem`.

**Token References**: A token reference must be wrapped in curly braces and contain an object path to another value in the YAML tree. For most token groups, the reference must point to a primitive value (e.g., `colors.primary-60`), not a group (e.g., `colors`). Within the `components` section, references to composite values (e.g., `{typography.label-md}`) are permitted.

## Sections

Every `DESIGN.md` follows the same structure. Sections can be omitted if they're not relevant to your project, but those present must appear in the order below. All sections use H2 (`##`) headings. An optional H1 may appear for document titling but is not parsed as a section.

| # | Section | Aliases | Has tokens? | Reference |
|---|---------|---------|-------------|-----------|
| 1 | Overview | "Brand & Style" | No | [references/overview.md](references/overview.md) |
| 2 | Colors | — | Yes (`colors`) | [references/colors.md](references/colors.md) |
| 3 | Typography | — | Yes (`typography`) | [references/typography.md](references/typography.md) |
| 4 | Layout | "Layout & Spacing" | Yes (`spacing`) | [references/layout.md](references/layout.md) |
| 5 | Elevation & Depth | "Elevation" | No | [references/elevation.md](references/elevation.md) |
| 6 | Shapes | — | Yes (`rounded`) | [references/shapes.md](references/shapes.md) |
| 7 | Components | — | Yes (`components`) | [references/components.md](references/components.md) |
| 8 | Do's and Don'ts | — | No | [references/dos-and-donts.md](references/dos-and-donts.md) |

Read only the section reference(s) the task touches.

## Templates

- [`assets/templates/starter.md`](assets/templates/starter.md) — minimal DESIGN.md scaffold with frontmatter for every token group, all 8 section headings, and inline guidance for what each prose block should contain. Copy as a starting point and fill in.

## Scripts

- [`scripts/design-to-theme.py`](scripts/design-to-theme.py) — converts a DESIGN.md file's YAML frontmatter to a Tailwind v4 `theme.css` (`@import "tailwindcss";` + `@theme {…}` block + `@layer components` rules). Run via `python3 scripts/design-to-theme.py path/to/DESIGN.md > theme.css`. Requires `pyyaml`. Mapping rules match [references/tailwind-conversion.md](references/tailwind-conversion.md).

## Examples

Three complete real-world DESIGN.md examples from the upstream repo, each demonstrating a distinctive design language. Each example bundles five files showing the round-trip across formats:

| File | Source | Purpose |
|---|---|---|
| `DESIGN.md` | upstream verbatim | the authoring format |
| `README.md` | upstream verbatim | one-paragraph description of the design system |
| `design_tokens.json` | upstream verbatim | DTCG-format machine tokens (the `tokens.json` that DESIGN.md frontmatter converts to/from) |
| `theme.css` | synthesized via [`scripts/design-to-theme.py`](scripts/design-to-theme.py) | **Tailwind v4 (primary)** — `@import "tailwindcss";` + `@theme {…}` with `--color-*`, `--font-*`, `--text-*`, `--text-*--line-height`, `--font-weight-*`, `--tracking-*`, `--spacing-*`, `--radius-*`, plus `@layer components` rules expanding every `components.*` block |
| `tailwind.config.js` | upstream verbatim | **Tailwind v3 (legacy fallback only)** — emit only when the project signals v3, see [references/tailwind-conversion.md](references/tailwind-conversion.md) |

The three examples:

- [`assets/examples/atmospheric-glass/`](assets/examples/atmospheric-glass/DESIGN.md) — dark-mode glassmorphism with deep navy surfaces, light-blue secondary, generous tonal layering.
- [`assets/examples/paws-and-paths/`](assets/examples/paws-and-paths/DESIGN.md) — warm, friendly, outdoor-trail palette; rounded shapes; humanist typography.
- [`assets/examples/totality-festival/`](assets/examples/totality-festival/DESIGN.md) — high-contrast festival branding with bold accents and dramatic typography.

## Recommended Token Names (Non-Normative)

The following names are commonly used across design systems. They are not required but provide guidance for consistency.

**Colors:** `primary`, `secondary`, `tertiary`, `neutral`, `surface`, `on-surface`, `error`

**Typography:** `headline-display`, `headline-lg`, `headline-md`, `body-lg`, `body-md`, `body-sm`, `label-lg`, `label-md`, `label-sm`

**Rounded:** `none`, `sm`, `md`, `lg`, `xl`, `full`

## Consumer Behavior for Unknown Content

When a DESIGN.md consumer encounters content not defined by this spec:

| Scenario | Behavior | Example |
|---|---|---|
| Unknown section heading | Preserve; do not error | `## Iconography` |
| Unknown color token name | Accept if value is valid | `surface-container-high: '#ede7dd'` |
| Unknown typography token name | Accept as valid typography | `telemetry-data` |
| Unknown spacing value | Accept; store as string if not a valid dimension | `grid-columns: '5'` |
| Unknown component property | Accept with warning | `borderColor` |
| Duplicate section heading | Error; reject the file | Two `## Colors` headings |
