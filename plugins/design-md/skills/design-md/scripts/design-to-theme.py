#!/usr/bin/env python3
"""Convert a DESIGN.md file's YAML frontmatter to a Tailwind v4 @theme CSS file.

Mapping rules match references/tailwind-conversion.md in the design-md skill.
"""
import re
import sys
import yaml


def quote_family(family: str) -> str:
    return f'"{family}"'


def expand_token_ref(value):
    """Resolve {path.to.token} to var(--<namespace>-<name>) for primitive groups."""
    if not isinstance(value, str):
        return value
    m = re.fullmatch(r"\{([^}]+)\}", value.strip())
    if not m:
        return value
    parts = m.group(1).split(".")
    if len(parts) == 2:
        group, name = parts
        ns_map = {
            "colors": "--color-",
            "spacing": "--spacing-",
            "rounded": "--radius-",
        }
        prefix = ns_map.get(group)
        if prefix:
            return f"var({prefix}{name})"
    return value


def emit(frontmatter: dict) -> str:
    out = ['@import "tailwindcss";', "", "@theme {"]

    if frontmatter.get("colors"):
        out.append("  /* Colors */")
        for name, value in frontmatter["colors"].items():
            out.append(f"  --color-{name}: {value};")
        out.append("")

    if frontmatter.get("typography"):
        out.append("  /* Typography */")
        for name, props in frontmatter["typography"].items():
            if "fontFamily" in props:
                out.append(f"  --font-{name}: {quote_family(props['fontFamily'])};")
            if "fontSize" in props:
                out.append(f"  --text-{name}: {props['fontSize']};")
            if "lineHeight" in props:
                out.append(f"  --text-{name}--line-height: {props['lineHeight']};")
            if "fontWeight" in props:
                out.append(f"  --font-weight-{name}: {props['fontWeight']};")
            if "letterSpacing" in props:
                out.append(f"  --tracking-{name}: {props['letterSpacing']};")
            if "fontFeature" in props:
                out.append(
                    f"  /* {name}: fontFeature {props['fontFeature']!r} — apply via font-feature-settings in component CSS */"
                )
            if "fontVariation" in props:
                out.append(
                    f"  /* {name}: fontVariation {props['fontVariation']!r} — apply via font-variation-settings in component CSS */"
                )
        out.append("")

    if frontmatter.get("spacing"):
        out.append("  /* Spacing */")
        for name, value in frontmatter["spacing"].items():
            out.append(f"  --spacing-{name}: {value};")
        out.append("")

    if frontmatter.get("rounded"):
        out.append("  /* Rounded */")
        for name, value in frontmatter["rounded"].items():
            out.append(f"  --radius-{name}: {value};")
        out.append("")

    if out[-1] == "":
        out.pop()
    out.append("}")

    if frontmatter.get("components"):
        out.append("")
        out.append("@layer components {")
        prop_to_css = {
            "backgroundColor": "background-color",
            "textColor": "color",
            "rounded": "border-radius",
            "padding": "padding",
            "height": "height",
            "width": "width",
        }
        for comp_name, props in frontmatter["components"].items():
            out.append(f"  .{comp_name} {{")
            for prop, value in props.items():
                if prop == "typography":
                    m = re.fullmatch(r"\{typography\.([^}]+)\}", str(value).strip())
                    if m:
                        n = m.group(1)
                        out.append(f"    font-family: var(--font-{n});")
                        out.append(f"    font-size: var(--text-{n});")
                        out.append(f"    line-height: var(--text-{n}--line-height);")
                        out.append(f"    font-weight: var(--font-weight-{n});")
                    else:
                        out.append(f"    /* typography: {value!r} — could not resolve */")
                    continue
                if prop == "size":
                    resolved = expand_token_ref(value)
                    out.append(f"    height: {resolved};")
                    out.append(f"    width: {resolved};")
                    continue
                css_prop = prop_to_css.get(prop, prop)
                out.append(f"    {css_prop}: {expand_token_ref(value)};")
            out.append("  }")
        out.append("}")

    return "\n".join(out) + "\n"


def main(path: str) -> None:
    with open(path) as f:
        text = f.read()
    parts = text.split("---\n", 2)
    if len(parts) < 3:
        raise SystemExit(f"No frontmatter in {path}")
    fm = yaml.safe_load(parts[1])
    sys.stdout.write(emit(fm))


if __name__ == "__main__":
    main(sys.argv[1])
