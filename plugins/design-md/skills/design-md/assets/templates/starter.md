---
version: alpha
name: Your Design System Name
description: One-line description of the design system
colors:
  primary: "#000000"
  # secondary: "#..."
  # tertiary: "#..."
  # neutral: "#..."
typography:
  body-md:
    fontFamily: System Font
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  headline-lg:
    fontFamily: System Font
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
  label-md:
    fontFamily: System Font
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
spacing:
  base: 16px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
rounded:
  none: 0
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px
---

# Your Design System Name

## Overview

Describe the brand personality, target audience, and emotional response the UI should evoke. Is it playful or professional? Dense or spacious? What does the product feel like to someone using it for the first time?

## Colors

Describe the color palette and the role of each color. Use descriptive prose names that map to the systematic token names defined in the frontmatter.

- **Primary (`#000000`):** Role and where it's used.
- **Secondary (`#...`):** Role and where it's used.
- **Tertiary (`#...`):** Role and where it's used.
- **Neutral (`#...`):** Role and where it's used.

## Typography

Describe the typography strategy: font families, weights, and the role of each level.

- **Headlines:** Where they're used and what voice they carry.
- **Body:** The default reading text and its intended density.
- **Labels:** Used for utilitarian text — buttons, captions, metadata.

## Layout

Describe the layout and spacing strategy. Grid model, breakpoints, containment principles. Identify the base unit and the common multiples.

## Elevation & Depth

Describe how visual hierarchy is conveyed: shadows, tonal layers, borders, color contrast, or some combination. State whether the design is flat or layered.

## Shapes

Describe the shape language for interactive elements, containers, and inputs. State the corner-radius philosophy (sharp / soft / mixed) and the common values.

## Components

Describe style guidance for the component atoms used by this system: buttons, chips, lists, tooltips, checkboxes, radios, inputs, and any domain-specific components. Note variant states (default, hover, pressed, disabled) where relevant.

## Do's and Don'ts

- Do …
- Don't …
- Do …
- Don't …
