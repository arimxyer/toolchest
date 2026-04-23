---
name: scaffold-library
description: Scaffold a new library dossier inside the animation-library corpus. Use this skill when the user wants to add a new motion or rendering library to the decision-support dossier — phrases like "add a dossier for <lib>", "scaffold <lib>", "research <lib> into the corpus", "write up <lib> as a new library entry", or when invoked directly as `/animation-library:scaffold-library <slug>`. Generates a complete dossier tree (dossier.md + references/overview.md, api.md, differentiators.md, drawbacks.md, sources.md + assets/examples/minimal.*) from the bundled template, fetches current docs via find-docs / context7 / WebFetch, and wires the new entry into pick-library's Library index and COMPARISON.md matrix. Do NOT trigger this skill for general "how do I use <lib>" questions or for simple dossier edits — those belong in pick-library or refresh-library respectively.
argument-hint: <library-slug> [npm-package-name] [motion|rendering]
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, WebFetch, Agent
---

# Scaffold a new library dossier

This skill generates a new dossier entry for the `pick-library` corpus. The template it uses lives alongside this file at `template/`.

If invoked with `$ARGUMENTS`, parse positional args:

1. `<library-slug>` — required. Kebab-case name (e.g. `auto-animate`, `three-js`, `react-konva`). This becomes the folder name under `../pick-library/<category>/<slug>/`.
2. `[npm-package-name]` — optional. Name published to npm. Defaults to the slug if omitted; confirm with the user if the slug ≠ npm name (e.g. slug `three-js` but npm `three`).
3. `[motion|rendering]` — optional. Confirm with the user if not provided and not obvious from the library's purpose.

## Inputs you'll need before writing

Do not guess any of these. Resolve each before filling the template.

| Field | How to resolve |
|---|---|
| Current version + release date | `curl -s https://registry.npmjs.org/<pkg>/latest \| jq -r '.version, .time.modified // .time.created'` or WebFetch the same URL. |
| License (SPDX + cost) | npm registry `license` field; cross-check the upstream repo's LICENSE file for non-SPDX custom licenses or dual-licensing. |
| Framework support | Upstream README + docs. Note official binding package names (e.g. `@gsap/react`). |
| Bundle size (gzipped) | Prefer bundlephobia.com; fall back to a direct CDN fetch (`curl -sI | grep -i content-length` on the minified ESM build) or the readme's self-reported number. Always annotate the source in parens: `(bundlephobia)`, `(readme)`, or `(measured)`. |
| Runtime | DOM / SVG / Canvas 2D / WebGL / WebGPU / WASM / Node. Note browser-only vs SSR-capable. |
| Recent version history | The library's release notes / changelog / GitHub releases — last 3–4 releases with one-line summaries. |
| Sibling comparisons for `differentiators.md` | Compare against every library already in the same category under `../pick-library/<category>/`. |
| Primary sources for `sources.md` | Every non-obvious claim must trace to a numbered URL retrieved today. |

## Workflow

1. **Confirm category** — `motion` or `rendering`. Ask the user if not obvious.
2. **Read the template** — load every file under `template/` as the skeleton shape:
   - `template/dossier.md`
   - `template/references/overview.md`, `api.md`, `differentiators.md`, `drawbacks.md`, `sources.md`
   - `template/assets/examples/minimal.js`
   - `template/README.md` — the format-conventions reference. Re-read the "Quick facts table", "Bundle size sourcing", "differentiators.md structure", and "drawbacks.md structure" sections before you write.
3. **Scout the existing category** — list the slugs under `../pick-library/<category>/` so `differentiators.md` can compare against every sibling.
4. **Dispatch a research subagent** (Explore or general-purpose) with a prompt listing exactly the fields from the "Inputs" table above and the sibling slugs from step 3. Ask it to return a structured brief — one subsection per template section — with URL citations ready to drop into `sources.md`.
5. **Write the dossier tree** to `../pick-library/<category>/<slug>/`:
   - `dossier.md` — frontmatter (`name: <slug>`, one-sentence `description`); When to use / NOT; Quick facts (5 rows in the exact order the template specifies); See also with relative links.
   - `references/overview.md` — What it is, Architecture, Ecosystem/plugins, Version history, Runtime targets, Framework integration.
   - `references/api.md` — Installation, Core API, Framework-specific APIs, Gotchas.
   - `references/differentiators.md` — One `## vs. <sibling>` section per live sibling in the category, plus `## Unique <lib> strengths`.
   - `references/drawbacks.md` — Limitations + "When NOT to reach for this".
   - `references/sources.md` — Numbered URL table; opens with `All sources retrieved YYYY-MM-DD.` using today's date.
   - `assets/examples/minimal.js` (or `.ts` / `.tsx` / `.html` if the library's natural surface is TS-first or markup-first) — smallest runnable example.
6. **Wire into the index** — add a row to `../pick-library/SKILL.md`'s **Library index** table (alphabetical within its category section). The row format is: `| [<slug>](<category>/<slug>/dossier.md) | <one-line from the dossier's description frontmatter> |`.
7. **Wire into the comparison matrix** — add a row to `../pick-library/COMPARISON.md` (Part 1a motion matrix or Part 1b rendering matrix) in alphabetical order, following the exact column shape of neighbouring rows.
8. **Update the selector's description trigger list** — append the new library's display name (not the slug) to the comma-separated list inside `../pick-library/SKILL.md`'s `description:` frontmatter. Keep the bucket parenthetical (motion/rendering) correct.
9. **Report back** — list every file written and every index row added. Flag any field marked `unknown` or `estimate` so the user can re-verify. Suggest the user read the generated `dossier.md` and `COMPARISON.md` row before committing.

## Principles

- **Citation discipline.** Every non-obvious claim must be traceable to a numbered source in `sources.md`. If a fact cannot be verified against a primary source, write `unknown` or `estimate` — never invent. The existing 30 dossiers hold this standard and new ones must too.
- **Don't re-verify what the template already tells you.** The template README is authoritative on layout; don't second-guess its sections.
- **Prefer the sibling's shape.** Before writing a new dossier, skim 1–2 existing dossiers in the same category as reference for tone, depth, and table alignment (`../pick-library/<category>/gsap/` for motion, `../pick-library/<category>/three-js/` for rendering are good exemplars).
- **One commit per new library.** Don't bundle multiple scaffolds into one commit — each library deserves its own reviewable diff.
