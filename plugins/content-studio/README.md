# Content Studio

Write, outline, critique, and headline articles for a website that follows a brand voice guide.

Five user-invoked skills that read a project-local brand voice markdown file and emit drafts in markdown, MDX, frontmatter+body, or HTML — whichever format the destination expects.

## What it does

- **`/content-studio:init`** — scaffolds a starter `brand-voice.md` (with sections for voice, tone, vocabulary, examples, audience) plus a settings file at `.claude/content-studio.local.md`. The voice guide is intentionally placeholder-heavy; the user fills in the brand specifics.
- **`/content-studio:brainstorm`** — divergent ideation. Takes a theme, raw material (interview notes, a product update, a transcript), or nothing at all, and produces 5–8 distinct angle candidates with hook sentences and a critic's note on which are strongest. Hand the chosen angle to `/outline`.
- **`/content-studio:outline`** — turns a brief into a structured outline (hook, body sections with key points, CTA, headline candidates). Hand it to `/draft` or take it elsewhere.
- **`/content-studio:draft`** — drafts a full article from a brief or outline. Writes the file to the configured output directory (default `./drafts`) in the chosen format. Refuses briefs that land in the voice guide's "Things we don't write about" list.
- **`/content-studio:critique`** — reviews an existing draft against the voice guide. Reports violations (vocabulary, style, tone drift, structure, subject matter) with line refs and suggested rewrites. Offers to apply the edits, with a git-safety check before touching dirty or untracked files.
- **`/content-studio:headlines`** — produces 5–8 headline candidates across different angles, then a full SEO/social metadata bundle (meta description, slug, og:title, tags) for the chosen one.

## First-time setup

```text
/content-studio:init
```

That writes:

1. `./brand-voice.md` (or wherever you choose) — the source of truth for tone, vocabulary, examples, audience.
2. `.claude/content-studio.local.md` — plugin settings: voice guide path, output directory, default format.

Then edit `brand-voice.md`. The template's placeholders are doing the work of teaching what to write — replace every section. The highest-leverage section is **Examples** (on-voice / off-voice pairs); a couple of good pairs raise output quality more than any other input.

## Settings

`.claude/content-studio.local.md` — gitignored project-local config:

```yaml
---
voice_guide_path: ./brand-voice.md
output_dir: ./drafts
default_format: markdown
---
```

Fields:

| Field | Default | Notes |
|-------|---------|-------|
| `voice_guide_path` | `./brand-voice.md` | Path to the brand voice markdown file. Required by every skill except `/init`. |
| `output_dir` | `./drafts` | Where `/draft` writes generated articles. Created on first draft. |
| `default_format` | `markdown` | One of: `markdown`, `mdx`, `frontmatter`, `html`. Overridable per invocation. |
| `slug_prefix` | _none_ | Optional — prepended to slugs (e.g. `posts/`, `blog/`). |
| `author` | _none_ | Optional — written into frontmatter for `frontmatter` / `mdx` formats. |

## Output formats

- **`markdown`** — plain `.md`, no frontmatter. Generic notes, README-style articles.
- **`frontmatter`** — `.md` with YAML frontmatter (`title`, `description`, `date`, `slug`, `tags`, `draft: true`). Default for static-site generators (Jekyll, Hugo, Eleventy, Astro content collections, Next.js + gray-matter).
- **`mdx`** — `.mdx` with frontmatter. Skill does not invent JSX components — it leaves a TODO comment if the project might have a custom component the writer should use.
- **`html`** — raw `<article>` fragment for CMS paste targets (WordPress block editor, Webflow rich-text, Ghost) or email.

Full per-format spec is in `skills/draft/references/output-formats.md`.

## Typical workflow

```text
# First time in a project
/content-studio:init
# Then edit brand-voice.md with real brand content.

# Per article — start with brainstorming if you don't have a fixed angle
/content-studio:brainstorm we want to write more about how legal review velocity affects ops
# … pick an angle, then …
/content-studio:outline a piece on why batching legal review hurts ops velocity
# … review the outline, edit, then …
/content-studio:draft <paste the outline + any extra constraints>
# … draft is written to ./drafts/<slug>.md

/content-studio:critique ./drafts/<slug>.md
# … review the report, apply edits, iterate.

/content-studio:headlines ./drafts/<slug>.md
# … pick a headline, paste metadata into frontmatter, ship.
```

## What this plugin does not do

- It does not infer a brand voice from existing site content. The voice guide is human-written.
- It does not publish, schedule, or commit. The user owns those steps.
- It does not do keyword research, competitor analysis, or A/B test headlines.
- It does not generate images or alt-text — image slots get `<!-- TODO: image -->`.
