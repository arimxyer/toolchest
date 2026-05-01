# Shapes

This section describes how visual elements are shaped.

## Example prose

```markdown
## Shapes

The shape language is defined by **Architectural Sharpness**. All interactive
elements, containers, and inputs utilize a minimal **4px corner radius**. This
provides just enough softness to feel modern while maintaining a rigid,
engineered aesthetic.
```

## Design Tokens

The `rounded` section defines the design tokens for rounded corners used in
buttons, cards, and other rectangular shapes.

It is a map\<string, Dimension>.

```yaml
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
```
