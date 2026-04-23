# Library Dossier Template

Use this folder as a starting point when adding a new library to the `pick-library` skill or when forking the corpus for a different domain. The `scaffold-library` skill (this folder's parent) automates most of what's described below — prefer invoking `/animation-library:scaffold-library <slug>` over hand-copying.

## Layout

```
<slug>/
├── dossier.md                    # Entry-point: frontmatter + When to use / NOT / Quick facts / See also
├── references/
│   ├── overview.md               # What the library is, architecture, ecosystem, version history
│   ├── api.md                    # Core API surface — classes, hooks, plugins, options
│   ├── differentiators.md        # vs. sibling libraries in the same category
│   ├── drawbacks.md              # Honest limitations; when to walk away
│   └── sources.md                # Numbered URL table with retrieval date and "what it verifies"
└── assets/
    └── examples/
        └── minimal.js            # Smallest runnable example (delete or swap extension if N/A)
```

## How to add a new library

Automated: invoke `/animation-library:scaffold-library <slug>` — the scaffold-library skill reads this template, fetches current docs, and writes all the files + index rows for you.

Manual fallback, working from the scaffold-library skill root (`skills/scaffold-library/`):

1. Copy this `template/` folder to `../pick-library/<category>/<slug>/` — `<category>` is `motion` or `rendering`, `<slug>` is the kebab-case library name.
2. Delete the copy's `README.md` (that's this meta-file — it shouldn't live inside a library folder).
3. Keep every other filename exactly as shown so cross-references work.
4. Replace every `{{placeholder}}` in the files. Placeholders use double curly braces so they are easy to grep (`grep -r "{{" .`).
5. Delete any section that doesn't apply (e.g. remove the "Minimal example" row from `dossier.md`'s "See also" if you didn't author one).
6. Add a row to `../../pick-library/SKILL.md`'s **Library index** table, and a row to `../../pick-library/COMPARISON.md`'s matrix.
7. Update `../../pick-library/SKILL.md`'s `description` frontmatter to include the new library name in the trigger list.

## Format conventions

These are the conventions the existing 30 dossiers follow — match them for consistency.

### Citation discipline

Every non-obvious claim in `overview.md`, `api.md`, `differentiators.md`, and `drawbacks.md` should be traceable to a numbered source in `sources.md`. The `sources.md` table opens with `All sources retrieved YYYY-MM-DD.` so re-verification is easy.

### Quick facts table

Use these five rows, in this order, in `dossier.md`:

| Field | What to put |
|---|---|
| Version researched | `X.Y.Z (released YYYY-MM-DD)` — from the npm registry or the library's release notes |
| License SPDX + cost | SPDX identifier if applicable; note any paid tiers or non-standard licenses |
| Framework support | Vanilla / React / Vue / Angular / etc., with the official binding package names |
| Bundle size (gzipped) | Include the source in parens: `(bundlephobia)`, `(readme)`, or `(measured)` |
| Runtime | DOM / SVG / Canvas / WebGL / WebGPU / Node; note if browser-only or SSR-capable |

### Bundle size sourcing

- `(bundlephobia)` — live value from bundlephobia.com
- `(readme)` — figure quoted in the package readme or docs
- `(measured)` — file size fetched from the CDN as-shipped

If bundlephobia returns an error or the library is not applicable (e.g. a Node-only tool), write `n/a` with a brief reason.

### "Unknown" is a valid answer

If a figure could not be verified against a primary source, write `unknown` or `estimate` and mark it in `sources.md`. Do not invent values. The COMPARISON.md matrix mirrors this honesty column-for-column.

### `differentiators.md` structure

One `## vs. <sibling>` section per comparable library in the same category. Name 2–4 concrete differentiators per section — API ergonomics, bundle, framework story, runtime target, feature coverage. Close with a `## Unique <library> strengths` section listing what this library does that nothing else in the category does.

### `drawbacks.md` structure

Flat list of honest limitations: paid tiers, browser support gaps, maintenance concerns, ecosystem staleness, framework coupling, bundle cost, missing features. Include "when NOT to use this" guidance so readers can rule the library out quickly.

## Agent Skills compliance

Each `<slug>/dossier.md` carries a YAML frontmatter block (`name`, `description`) so it satisfies the [Agent Skills](https://agentskills.io) single-skill format even when read in isolation. Inside this plugin the file is named `dossier.md` (not `SKILL.md`) so Claude Code's skill discovery treats it as reference content under the top-level `pick-library` skill rather than 30 separate skills.

If you fork this corpus into a standalone multi-skill repo — e.g. one agentskills.io skill per library — rename each `dossier.md` back to `SKILL.md` and move each `<slug>/` to the top level of your skills directory. The internal structure is already compliant.
