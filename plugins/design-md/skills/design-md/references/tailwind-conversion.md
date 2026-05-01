# DESIGN.md → Tailwind conversion

DESIGN.md is Tailwind-version-agnostic — the same DESIGN.md compiles to either format. **Default to Tailwind v4** (`@theme` directive in CSS). Use the v3 fallback only when the project signals v3 or the user explicitly asks for it.

## Contents

- [When to use v4 vs v3](#when-to-use-v4-vs-v3)
- [v4 (primary): CSS @theme](#v4-primary-css-theme)
- [v3 (fallback): tailwind.config.js](#v3-fallback-tailwindconfigjs)
- [Token references](#token-references)

## When to use v4 vs v3

Default to v4. Drop to v3 only if **any** of these signals is present:

- `package.json` pins `tailwindcss` to `^3.x` or `~3.x`
- The project has a `tailwind.config.{js,ts,cjs,mjs}` and **no** `@theme` block in any CSS entry file
- An entry CSS uses the v3 directives `@tailwind base; @tailwind components; @tailwind utilities;` instead of `@import "tailwindcss";`
- The user explicitly says "v3", "tailwind.config.js", "JS config"

If signals are mixed (e.g. v4 install but a leftover v3 config), ask the user which to target before generating.

> **Compat note.** v4 still supports `@config "./tailwind.config.js";` for migrating projects, but that is not the canonical v4 form — only emit it when the user is mid-migration and explicitly wants both.

## v4 (primary): CSS `@theme`

A v4 project has a single CSS entry file (often `app.css` or `globals.css`) that imports Tailwind and declares theme tokens via the `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-primary: #1A1C1E;
  /* ... */
}
```

### Mapping table

| DESIGN.md token | v4 namespace | Notes |
|---|---|---|
| `colors.<name>: <hex>` | `--color-<name>` | hex value as-is |
| `typography.<name>.fontFamily` | `--font-<name>` | string with optional fallbacks |
| `typography.<name>.fontSize` | `--text-<name>` | dimension value |
| `typography.<name>.lineHeight` | `--text-<name>--line-height` | modifier on `--text-*`, paired with the size |
| `typography.<name>.fontWeight` | `--font-weight-<name>` | numeric (`400`, `600`) or named |
| `typography.<name>.letterSpacing` | `--tracking-<name>` | dimension value |
| `typography.<name>.fontFeature` | (no namespace) | apply via `font-feature-settings:` in component CSS |
| `typography.<name>.fontVariation` | (no namespace) | apply via `font-variation-settings:` in component CSS |
| `spacing.<name>` | `--spacing-<name>` | dimension or unitless number |
| `rounded.<name>` | `--radius-<name>` | dimension value |
| `components.<name>.<prop>` | (no namespace) | emit as `@layer components` rules; reference base tokens via `var(--color-...)`, `var(--radius-...)`, etc. |

The named-text-modifier shape (`--text-<name>--line-height`) is the only namespace with a "double dash" suffix — it pairs the line-height with the font-size so `text-<name>` utilities apply both together.

### Worked example

DESIGN.md frontmatter:

```yaml
---
name: Daylight Prestige
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
typography:
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: 500
    letterSpacing: 0.1em
spacing:
  base: 16px
  sm: 8px
  md: 16px
  lg: 32px
rounded:
  sm: 4px
  md: 8px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px
---
```

Generated v4 CSS:

```css
@import "tailwindcss";

@theme {
  --color-primary: #1A1C1E;
  --color-secondary: #6C7278;

  --font-body-md: "Public Sans", sans-serif;
  --text-body-md: 16px;
  --text-body-md--line-height: 1.6;
  --font-weight-body-md: 400;

  --font-label-caps: "Space Grotesk", sans-serif;
  --text-label-caps: 12px;
  --font-weight-label-caps: 500;
  --tracking-label-caps: 0.1em;

  --spacing-base: 16px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;

  --radius-sm: 4px;
  --radius-md: 8px;
}

@layer components {
  .button-primary {
    background-color: var(--color-primary);
    border-radius: var(--radius-md);
    padding: 12px;
  }
}
```

`components.*` blocks become hand-written `@layer components` rules — there is no v4 namespace that auto-generates a multi-property utility from a token group.

## v3 (fallback): `tailwind.config.js`

Use only when one of the v3 signals above is present.

### Mapping table

| DESIGN.md token | v3 path under `theme.extend` |
|---|---|
| `colors.<name>` | `colors[<name>]` |
| `typography.<name>.fontFamily` | `fontFamily[<name>]` — array of strings |
| `typography.<name>.fontSize/lineHeight/letterSpacing/fontWeight` | `fontSize[<name>] = ['<size>', { lineHeight, letterSpacing, fontWeight }]` |
| `spacing.<name>` | `spacing[<name>]` |
| `rounded.<name>` | `borderRadius[<name>]` |
| `components.<name>` | not emitted in `tailwind.config.js`; emit as a CSS plugin or hand-written `@layer components` rules |

### Worked example

Same DESIGN.md frontmatter as above:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        "primary": "#1A1C1E",
        "secondary": "#6C7278",
      },
      fontFamily: {
        "body-md": ["Public Sans", "sans-serif"],
        "label-caps": ["Space Grotesk", "sans-serif"],
      },
      fontSize: {
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-caps": ["12px", { letterSpacing: "0.1em", fontWeight: "500" }],
      },
      spacing: {
        "base": "16px",
        "sm": "8px",
        "md": "16px",
        "lg": "32px",
      },
      borderRadius: {
        "sm": "4px",
        "md": "8px",
      },
    },
  },
};
```

The upstream `examples/*/tailwind.config.js` files in the [google-labs-code/design.md repo](https://github.com/google-labs-code/design.md/tree/main/examples) follow this shape and are a good reference when emitting v3 output.

## Token references

DESIGN.md uses `{path.to.token}` for cross-references. They convert to:

| In DESIGN.md | v4 (CSS) | v3 (JS) |
|---|---|---|
| `{colors.primary}` | `var(--color-primary)` | `theme('colors.primary')` |
| `{rounded.md}` | `var(--radius-md)` | `theme('borderRadius.md')` |
| `{spacing.lg}` | `var(--spacing-lg)` | `theme('spacing.lg')` |

For composite typography references inside `components` (e.g. `typography: "{typography.body-md}"`), expand each property in the emitted CSS rather than referencing a single variable — neither v4 nor v3 stores a Typography object as one variable. In v4:

```css
.card {
  font-family: var(--font-body-md);
  font-size: var(--text-body-md);
  line-height: var(--text-body-md--line-height);
  font-weight: var(--font-weight-body-md);
}
```
