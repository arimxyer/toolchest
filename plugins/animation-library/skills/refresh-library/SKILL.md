---
name: refresh-library
description: Refresh a stale library dossier in the animation-library corpus. Use this skill when the user says "the <lib> dossier is out of date", "refresh <lib>", "update <lib> to the latest version", "re-verify <lib>", or when invoked directly as `/animation-library:refresh-library <slug>`. Also invoked automatically by the sibling `pick-library` skill's Workflow Step 0 when its freshness check detects a version mismatch between a dossier's recorded `Version researched` and the library's current npm version. Fetches current npm version and release notes, dispatches a subagent to identify changes between the dossier's version and latest, applies the resulting edits across dossier.md / references/*.md / COMPARISON.md, and updates the sources.md retrieval date. Do NOT use for creating a new library entry (that's `scaffold-library`) or for answering "how do I use <lib>" questions (that's `pick-library`).
argument-hint: <library-slug>
allowed-tools: Read, Edit, Grep, Glob, Bash, WebFetch, Agent
---

# Refresh a library dossier

This skill reconciles an existing dossier in `../pick-library/` with the library's current upstream state. It's invoked in two ways:

- **Direct:** `/animation-library:refresh-library <slug>` — user explicitly asks to refresh a slug they name.
- **Automatic:** the sibling `pick-library` skill detects a version mismatch during its freshness check (Workflow Step 0) and hands off to this skill.

If invoked with `$ARGUMENTS`, the first positional arg is the library slug.

## Workflow

1. **Locate the dossier.** Search `../pick-library/motion/<slug>/` and `../pick-library/rendering/<slug>/`. If neither exists, tell the user and suggest `scaffold-library` instead.
2. **Read the current state:**
   - `dossier.md` — extract `name` (from frontmatter), the `Version researched` value (format: `X.Y.Z (released YYYY-MM-DD)`), and remember which category the dossier lives in.
   - `references/sources.md` — extract the current retrieval date (top-line `All sources retrieved YYYY-MM-DD.`) and scan for the upstream npm / docs / repo URLs.
   - `references/overview.md` — note the version-history table rows.
3. **Resolve the npm package name.** Usually it's the slug. When it isn't, it's documented in `dossier.md`'s Framework support row or `sources.md`'s first npm registry link. For non-npm entries (e.g. `waapi`, `view-transitions-api`) where `Version researched` is "Web standard (no SPDX)" or similar, skip to step 9 and report "not applicable — browser-native API, no npm version to compare against."
4. **Fetch current version + release date:**
   ```bash
   curl -s https://registry.npmjs.org/<package>/latest | jq -r '.version + " " + (.time.modified // .time.created)'
   ```
   (Use WebFetch with the same URL if Bash/curl is unavailable.)
5. **Compare.** If the current version equals the dossier's `Version researched` X.Y.Z, report "`<slug>` is current at `<version>` — no changes applied." and exit. No edits.
6. **On mismatch, dispatch a research subagent** (Explore for read-only verification followed by general-purpose for write-planning, or just general-purpose). The prompt must include:
   - Library slug, npm package name, category.
   - Old version from dossier (`X.Y.Z`) and new version from npm.
   - Verbatim current contents of `dossier.md`'s Quick facts, `references/overview.md`'s Version history table, `references/api.md`, `references/differentiators.md`, `references/drawbacks.md`, `references/sources.md`.
   - Instruction to fetch release notes / changelog / GitHub releases covering every intermediate version, then return a structured diff listing:
     - Exact `dossier.md` Quick-facts cells to replace (version, bundle size if changed, framework support if changed, runtime if changed).
     - New rows to append to `overview.md`'s Version history table.
     - New/removed/renamed APIs that affect `api.md`.
     - Any differentiator or drawback claims invalidated by the new release.
     - Updated bundle-size figures with the source annotation (`(bundlephobia)` / `(readme)` / `(measured)`).
     - New source URLs for `sources.md`.
   - Explicit ask to **not** invent values; flag anything unverifiable.
7. **Apply the edits** with Edit calls, targeting each file the subagent flagged. One Edit per distinct change; don't batch unrelated changes into a single Edit.
8. **Update retrieval date.** Rewrite `references/sources.md`'s top line to `All sources retrieved YYYY-MM-DD.` using today's date.
9. **Propagate to COMPARISON.md.** If any cell the subagent changed maps to a `COMPARISON.md` column (version string, bundle size, license, framework support, maintenance posture), update that library's row in the relevant matrix (Part 1a motion / Part 1b rendering). Leave cluster writeups in Part 2 alone unless the change is structural (e.g. ownership change, deprecation) — those are narrative and need human review.
10. **Report.** Summarise for the user:
    - Version delta (`X.Y.Z` → `A.B.C`).
    - Files changed (bullet list).
    - Anything the subagent flagged for human review (e.g. "API surface reshape too large to auto-apply — see `references/api.md` notes").
    - Suggested follow-up: the user should read the diff before committing.

## Principles

- **Citation discipline stays in force.** Every new or updated fact must trace back to a primary source the subagent retrieved today. Update `sources.md` with new URLs; don't drop old ones unless the target 404'd (note that case too).
- **Preserve retrieval-date honesty.** The retrieval date on `sources.md` is the date of *this* refresh, not the original research. The dossier's version history table (in `overview.md`) retains the full timeline.
- **Don't over-edit.** Refresh changes that are *factually* outdated (version numbers, bundle sizes, API names). Don't rewrite prose that's still accurate — preserve voice and structure from the original author.
- **Non-semver entries are exempt.** WAAPI / view-transitions-api and similar browser-native entries have no npm version; skip step 4 and exit with "not applicable".
- **Major version jumps may need human oversight.** If the subagent reports structural API changes (e.g. v3 → v4 with a breaking-change list), apply the easy parts (Quick facts, version history) and flag the rest for the user to review and write by hand — don't silently paper over a breaking-change migration.
