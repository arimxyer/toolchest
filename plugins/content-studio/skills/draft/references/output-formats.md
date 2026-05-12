# Output formats

The `/content-studio:draft` skill emits one of four formats. The format comes from (in order):

1. The user's explicit instruction in the prompt (e.g. "draft this as MDX").
2. `${user_config.default_format}` — set at plugin enable time.
3. `markdown` as the final fallback.

The chosen format determines the file extension, what frontmatter (if any) gets emitted, and how rich-content elements are rendered.

## markdown

- **Extension:** `.md`
- **Frontmatter:** none.
- **Rich content:** standard markdown only — no JSX, no HTML tags except for things markdown can't express (rare).
- **When to choose:** generic notes, README-style articles, anywhere the destination strips frontmatter or doesn't run a static-site build.

Example skeleton:

```markdown
# <Article title>

<Lead paragraph — the hook from the outline, prose form.>

## <First section heading>

<Body prose. Aim for the sentence-length mix from the voice guide.>

## <Next section heading>

<…>

## <Closing section>

<Single CTA, in voice.>
```

## frontmatter

- **Extension:** `.md` (some SSGs accept `.markdown` — default to `.md` unless the user's project clearly uses something else).
- **Frontmatter:** YAML block at the top of the file.
- **Rich content:** standard markdown only (no JSX). Use HTML tags sparingly when markdown can't express a structure.
- **When to choose:** Jekyll, Hugo, Eleventy, Astro's content collections, Next.js apps that read markdown via gray-matter, etc. The most common blog format.

Frontmatter fields to emit:

```yaml
---
title: "<Article title — sentence case unless voice guide says otherwise>"
description: "<Meta description, 140–160 chars, in voice>"
date: <YYYY-MM-DD — today's date>
slug: <kebab-case-slug-of-title>
author: <${user_config.author} if non-empty; otherwise omit the field entirely>
tags: [<2–5 topic tags, lowercase, hyphen-separated>]
draft: true
---
```

- `draft: true` is intentional — the writer should flip it to false (or remove it) once reviewed.
- If `${user_config.slug_prefix}` is non-empty, prepend it (e.g. `slug_prefix: posts/` + slug `lexcheck-12-minute-review` → `posts/lexcheck-12-minute-review`).
- Add `tags` only if the brief or outline gives you concrete signals — don't fabricate them from thin air.

Body follows the same shape as `markdown` format.

## mdx

- **Extension:** `.mdx`
- **Frontmatter:** YAML block (same fields as `frontmatter` above) if the project uses MDX with frontmatter (Astro, Next.js content collections, Docusaurus). Omit only if the user's project clearly doesn't use frontmatter in `.mdx`.
- **Rich content:** markdown plus JSX components. **Do not invent components.** If the project has a `<Callout>` or `<Figure>` component, use it only when the user has confirmed it exists. Otherwise stick to markdown.
- **When to choose:** Next.js sites with MDX, Astro, Docusaurus, anywhere `.mdx` is the convention.

If unsure whether a JSX component exists in the project, leave a markdown blockquote or note that says `<!-- TODO: replace with project Callout component -->` rather than emitting an undefined component.

## html

- **Extension:** `.html`
- **Frontmatter:** none.
- **Rich content:** semantic HTML. Wrap the article in `<article>`. Use `<h1>` for title, `<h2>` for section headings, `<p>` for paragraphs, `<ul>`/`<ol>` for lists, `<blockquote>` for pull quotes, `<a href="…">` for links.
- **When to choose:** CMS paste targets (WordPress block editor in HTML mode, Webflow rich-text fields, Ghost), email newsletters, or anywhere the destination doesn't accept markdown.

Example skeleton:

```html
<article>
  <h1>Article title</h1>
  <p class="lead"><!-- Lead paragraph --></p>

  <h2>First section heading</h2>
  <p><!-- Body prose --></p>

  <h2>Next section heading</h2>
  <p><!-- Body prose --></p>

  <p class="cta"><a href="#">Single call to action</a></p>
</article>
```

Do not emit `<html>`, `<head>`, or `<body>` wrappers — the article fragment is what the destination expects.

## File naming

- Slugify the title: lowercase, hyphenate, strip punctuation, max ~60 chars.
- Final filename: `${user_config.output_dir}/<slug><ext>` where `<ext>` is the format's extension.
- If a file at that path already exists, append `-2`, `-3`, etc. Do not overwrite.

## Common across all formats

- The article is always written to `${user_config.output_dir}` (default `./drafts`). Create the directory if it doesn't exist.
- Emit the path of the created file to the user when done.
- Never write to a path outside `${user_config.output_dir}` without explicit user confirmation — even if the user pastes an absolute path in their brief.
