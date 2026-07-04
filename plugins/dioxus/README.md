# Dioxus Plugin

A documentation router for [Dioxus](https://dioxuslabs.com), the Rust framework for building
web, desktop, and mobile apps from one codebase. Dioxus doesn't publish a single consolidated
`llms.txt`, so this plugin maps every doc topic to its smallest fetchable source and pulls only
what a question needs — keeping the repo tiny and the answers current even while Dioxus 0.7 is
actively evolving.

## What it does

- **Routes, doesn't bundle** — a version-pinned map (`references/index.md`) points at every
  guide page's raw markdown, the served section `llms.txt` files, and docs.rs, so nothing
  stale is copied into the repo.
- **Per-page granularity** — the full `SUMMARY.md` nav tree mapped to raw-GitHub URLs, so the
  agent fetches one small page instead of a 1.86 MB blob.
- **Version-aware** — reads the project's `Cargo.toml` and swaps the version segment so a 0.6
  project gets 0.6 docs, not silently-wrong 0.7 answers.
- **Fetch-hazard aware** — knows `WebFetch` summarizes rather than returning raw text, and
  prefers `curl` for exact code and small per-page files.
- **Inline 0.7 cheat-sheet** — the most common gotchas (form-submit default, `#[server]` JSON
  codec, single `dioxus` dependency, `asset!`/`AssetOptions`, signals, the `dx` CLI) answered
  with no fetch at all.

## Usage

The skill triggers automatically when you work with Dioxus code, or invoke it directly:

```text
/dioxus:dioxus how do I share state between components with use_context?
```

## Updating the map

The doc tree lives in the docsite's `SUMMARY.md`. To refresh `references/index.md`:

```bash
curl -s https://raw.githubusercontent.com/DioxusLabs/docsite/main/docs-src/0.7/src/SUMMARY.md
# reconcile new/renamed pages into references/index.md
```

Confirm current stable: `curl -s https://crates.io/api/v1/crates/dioxus | jq -r '.crate.max_stable_version'`.
