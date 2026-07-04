# Dioxus Documentation Map

> Routing table for Dioxus docs. This plugin bundles **no doc content** — it maps every
> topic to the smallest fetchable source, so the agent pulls only what a question needs.
>
> **Version:** pinned to **0.7.9** (current stable, checked 2026-07-04). See
> [Version awareness](#version-awareness) — if the project targets a different version,
> swap the version segment in every URL below.

## Fetch patterns (fastest → broadest)

Dioxus exposes docs three ways. Prefer the **narrowest** source that answers the question.

| Grain | Source | How to fetch |
|---|---|---|
| **Single page** (the workhorse) | raw GitHub markdown | `curl -s <raw-url>` — returns exact CommonMark incl. code blocks. Files are a few KB each. |
| **API signatures / types** | docs.rs | `WebFetch https://docs.rs/dioxus/0.7.9/dioxus/…` |
| **A whole section** | served `llms-full.txt` | see [Section bundles](#section-bundles) — large; read with care |

### Two hazards, both real (verified 2026-07-04)

1. **`WebFetch` summarizes — it does not return raw text.** It answers your *prompt*
   against the page via a small model. On a big file it silently returns a partial
   summary (this bit the research that built this plugin). So:
   - For exact code/signatures, prefer **`curl -s <raw-url>`** (true raw markdown).
   - If you must use `WebFetch`, give a *specific* prompt ("return the section on X
     verbatim, including all code blocks") — never "return everything."
2. **Never dump a big file into context.** The whole-guide `llms-full.txt` is ~1.86 MB
   (~500K tokens) and `essentials` is ~413 KB. Do **not** `curl` those wholesale.
   `curl` per-page files freely; for a big section either fetch specific pages or
   `curl … | grep`/pattern-match for the relevant part.

## Per-page markdown (primary source)

Base URL (substitute the version segment as needed — see [Version awareness](#version-awareness)):

```
https://raw.githubusercontent.com/DioxusLabs/docsite/main/docs-src/0.7/src/
```

Append any path below. Derived straight from the docsite's `SUMMARY.md` nav — to
re-verify or discover new pages, `curl -s <BASE>SUMMARY.md`.

### Getting Started
- `index.md` — Welcome / What is Dioxus
- `getting_started/index.md` — install Rust + `dx` CLI, platform toolchains, `dx doctor`

### Take a Tour (tutorial — the "HotDog" app)
- `tutorial/index.md` · `tutorial/tooling.md` · `tutorial/new_app.md` · `tutorial/component.md`
- `tutorial/rsx.md` · `tutorial/assets.md` · `tutorial/state.md` · `tutorial/data_fetching.md`
- `tutorial/backend.md` · `tutorial/databases.md` · `tutorial/routing.md` · `tutorial/bundle.md`
- `tutorial/deploy.md` · `tutorial/next_steps.md`

### Core Concepts — Building UIs (`essentials/ui/`)
- `essentials/index.md` — section overview
- `essentials/ui/rsx.md` — Introducing RSX · `essentials/ui/elements.md` — Elements and Text
- `essentials/ui/attributes.md` — Dynamic Attributes · `essentials/ui/conditional.md` — Conditional Rendering
- `essentials/ui/iteration.md` — Rendering Lists · `essentials/ui/components.md` — Components
- `essentials/ui/render.md` — Reconciliation · `essentials/ui/assets.md` — Assets
- `essentials/ui/styling.md` — Styling · `essentials/ui/hotreload.md` — Hot-Reload
- `essentials/ui/escape.md` — Escape Hatches

### Core Concepts — State (`essentials/basics/`)
- `essentials/basics/reactivity.md` — Intro to Reactivity · `essentials/basics/hooks.md` — Storing State in Hooks
- `essentials/basics/signals.md` — Reactive Signals · `essentials/basics/event_handlers.md` — User Input
- `essentials/basics/async.md` — Async and Futures · `essentials/basics/resources.md` — Data Fetching
- `essentials/basics/effects.md` — Effects and Memos · `essentials/basics/hoisting.md` — Hoisting State
- `essentials/basics/context.md` — Global Context · `essentials/basics/collections.md` — Stores and Collections
- `essentials/basics/error_handling.md` — Error Handling · `essentials/basics/suspense.md` — Suspense

### Core Concepts — Fullstack (`essentials/fullstack/`)
- `essentials/fullstack/index.md` · `project_setup.md` · `ssr.md` · `server_functions.md` · `errors.md`
- `essentials/fullstack/axum.md` — Router and State · `middleware.md` · `websockets.md` · `streams.md`
- `essentials/fullstack/forms.md` · `authentication.md` · `native.md` · `streaming.md` · `static_site_generation.md`

### Core Concepts — Routing (`essentials/router/`)
- `essentials/router/index.md` · `routes.md` — Defining Routes · `navigation.md` · `layouts.md`

### Core Concepts — Advanced (`essentials/advanced/`)
- `essentials/advanced/index.md` · `custom_hooks.md` · `lifecycle.md` — Component Lifecycle · `breaking_out.md`

### Guides (`guides/`)
- `guides/index.md` — overview
- Tools: `guides/tools/index.md` · `creating.md` · `configure.md` · `translate.md`
- Platforms: `guides/platforms/index.md` · `web.md` · `desktop.md` · `mobile.md`
- Publishing: `guides/deploy/index.md` · `config.md`
- Testing/Debugging: `guides/testing/index.md` · `web.md` · `guides/tips/optimizing.md` · `guides/tips/antipatterns.md`
- Utilities: `guides/utilities/index.md` · `logging.md` · `internationalization.md` · `tailwind.md`
- In-Depth: `guides/depth/index.md` · `custom_renderer.md`

### Migration (`migration/`)
- `migration/index.md` · `migration/to_07.md` — **0.6→0.7 deltas** · `migration/to_06.md` · `migration/to_05/index.md`

### Beyond (`beyond/`)
- `beyond/index.md` · `beyond/contributing.md` · `beyond/project_structure.md`

## Section bundles

Whole-section `llms-full.txt` (served, agent-formatted CommonMark). Use only for broad
"teach me this whole area" reads, and heed the hazards above.

| Section | URL | Approx size |
|---|---|---|
| Whole guide | `https://dioxuslabs.com/learn/0.7/llms-full.txt` | ~1.86 MB — **last resort, never dump** |
| Section index | `https://dioxuslabs.com/learn/0.7/llms.txt` | ~13 KB — intro + links |
| Tutorial | `https://dioxuslabs.com/learn/0.7/tutorial/llms-full.txt` | ~85 KB |
| Essentials | `https://dioxuslabs.com/learn/0.7/essentials/llms-full.txt` | ~413 KB — large |
| Guides | `https://dioxuslabs.com/learn/0.7/guides/llms-full.txt` | ~90 KB |
| Migration | `https://dioxuslabs.com/learn/0.7/migration/llms-full.txt` | small |
| Beyond | `https://dioxuslabs.com/learn/0.7/beyond/llms-full.txt` | small |

**Route caveats (verified):** the section route name must match a `docs-src/0.7/src/`
directory. Root `https://dioxuslabs.com/llms.txt` **404s**. `getting_started/llms-full.txt`
**404s** (not every dir is a served route) — use the per-page raw GitHub `getting_started/index.md`
instead. When unsure, fall back to the per-page raw markdown, which always resolves.

## API reference — docs.rs

For exact signatures, types, trait bounds, and re-exports the prose guide omits:

- Umbrella crate (most lookups): `https://docs.rs/dioxus/0.7.9/dioxus/` — most APIs surface via `dioxus::prelude`
- Core: `dioxus-core` · Hooks: `dioxus-hooks` · Signals: `dioxus-signals`
- Router: `dioxus-router` · Web: `dioxus-web` · Desktop: `dioxus-desktop` · Fullstack: `dioxus-fullstack`
- Pattern: `https://docs.rs/<crate>/0.7.9/<crate_underscored>/`
- Renderers/asset crates: `blitz` (WGPU HTML/CSS), `manganis` (assets, the `asset!` macro), `subsecond` (hot-reload)

## Version awareness

The URLs above are pinned to **0.7.9** / `/learn/0.7/` / `docs-src/0.7/`. A greenfield
project builds against a pinned version, so **route to *that* version's docs**:

1. Read the project's `Cargo.toml`; find the `dioxus` dependency version (e.g. `dioxus = "0.7"`).
2. If it's not 0.7.x, swap the version segment in every URL: `/learn/0.7/` → `/learn/0.6/`,
   and `docs-src/0.7/src/` → `docs-src/0.6/src/`. The docsite retains `0.3`–`0.7`; earlier
   trees can differ in layout, so re-`curl` that version's `SUMMARY.md` to confirm paths.
3. `0.8.0-alpha.0` exists as a prerelease; if the project pins it, check whether
   `docs-src/0.8/` exists yet before assuming a docs path.

Confirm current stable anytime: `curl -s https://crates.io/api/v1/crates/dioxus | jq -r '.crate.max_stable_version'`.

## Optional accelerator — context7 MCP

If the session has context7, it has Dioxus indexed: `/dioxuslabs/dioxus`,
`/websites/dioxuslabs_learn`, `/dioxuslabs/docsite`, and pre-indexed
`/llmstxt/dioxuslabs_learn_0_7_llms-full_txt`. Handy, but its snippets lag current
stable (topped out ~0.7.2 as of 2026-07-04) — prefer the raw sources above for exact,
current API. Not required; this plugin works with `WebFetch`/`curl` alone.
