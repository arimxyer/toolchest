---
name: dioxus
description: Documentation router for Dioxus, the Rust framework for cross-platform (web/desktop/mobile) apps in one codebase. Use whenever the user works with Dioxus — writing `rsx!` markup, components (`#[component]`), signals and hooks (`use_signal`, `use_resource`, `use_memo`, `use_context`, `use_effect`), the router, fullstack / server functions (`#[server]`), assets (the `asset!` macro), or the `dx` CLI (`dx new`, `dx serve`, `dx bundle`, `dx doctor`). Also trigger on Dioxus setup, styling, or deployment questions, a `Cargo.toml` with a `dioxus` dependency, `.rs` files importing `dioxus::prelude::*`, migrating to 0.7, or any "how do I <X> in Dioxus" question. This skill does not bundle the docs — it routes to the smallest fetchable source (per-page markdown, a section `llms.txt`, or docs.rs) and carries an inline Dioxus 0.7 gotchas cheat-sheet.
argument-hint: [question]
allowed-tools: Read, WebFetch, Bash, Grep
---

# Dioxus Documentation Skill

Dioxus is a Rust framework for building web, desktop, and mobile apps from one codebase,
with a React/Flutter-like feel (`rsx!` markup, signals, components). This skill is a
**router**: Dioxus doesn't ship a single consolidated `llms.txt`, so this skill maps every
doc topic to its smallest fetchable source and pulls only what a question needs.

If invoked directly via `/dioxus:dioxus`, use `$ARGUMENTS` as the user's question to decide
which page(s) to fetch.

## Workflow

0. **Pin the version.** Read the project's `Cargo.toml` and find the `dioxus` dependency
   version. The map in [`references/index.md`](references/index.md) is written for **0.7.9**;
   if the project targets another version, substitute the version segment in the URLs (the
   map's *Version awareness* section explains how). No `Cargo.toml` yet (greenfield) → assume
   current stable 0.7.

1. **Read [`references/index.md`](references/index.md).** It's the map — fetch patterns, the
   full per-page URL tree, section bundles, docs.rs crates, and two important fetch hazards.

2. **Fetch the smallest sufficient source:**
   - **Specific topic** → the single per-page raw-GitHub `.md` for it. Prefer
     `curl -s <raw-url>` (returns exact markdown incl. code); fall back to `WebFetch` with a
     *verbatim* prompt if `curl` is unavailable.
   - **Exact API signature / type** → docs.rs (`WebFetch https://docs.rs/dioxus/0.7.9/dioxus/…`).
   - **Broad "teach me this whole area"** → a section `llms-full.txt`, but heed the size
     hazards in the map (never dump the ~1.86 MB whole-guide; `essentials` is ~413 KB).

3. **Two hazards to respect** (detailed in the map): `WebFetch` *summarizes* rather than
   returning raw text — use `curl` for exact code, or a narrow verbatim prompt. And never
   `curl` a multi-hundred-KB file into context — fetch per-page, or `grep` the big one.

4. **Don't over-fetch.** Most questions need one page. The cheat-sheet below answers the
   most common gotchas with no fetch at all.

## Dioxus 0.7 cheat-sheet (current behavior — no fetch needed)

Verified against the 0.7 docs 2026-07-04. Confirm specifics against the linked pages when it matters.

**Project shape**
- One dependency, not many: `dioxus = { version = "0.7", features = ["web"] }` (or `desktop`,
  `mobile`, `fullstack`). Import everything via `use dioxus::prelude::*;`. The old
  `dioxus-lib` / `dioxus_lib::*` is gone.
- A few items are **not** in the prelude and need explicit imports: `use_drop`, `Runtime`,
  `queue_effect`, `provide_root_context`.
- Pinned transitive deps: Axum **0.8**, Wry **0.52**.

**Components & RSX**
```rust
use dioxus::prelude::*;

fn App() -> Element {
    let mut count = use_signal(|| 0);
    rsx! {
        h1 { "Count: {count}" }
        button { onclick: move |_| count += 1, "Up" }
    }
}
```
- Components are `fn Name() -> Element` returning `rsx! { … }`. Use `#[component]` to derive
  props from function arguments.
- `rsx!` is Rust-native markup: `element { attr: value, "text {interpolation}", child {} }`.

**State (reactivity)**
- `use_signal(|| initial)` → read by calling it (`count()`), write with `count += 1`,
  `count.set(v)`, or `count.write()`.
- `use_memo(move || …)` for derived values; `use_resource(move || async { … })` for async
  data; `use_context` / `use_context_provider` for shared state; `use_effect` for side effects.

**Forms — behavior flipped in 0.7**
- Forms now **submit by default**. To block the native submit, call `e.prevent_default()` in
  the handler (0.6 was the opposite — it blocked by default).

**Fullstack / server functions**
- `#[server]` functions default to the **JSON** codec (0.6 used URL-encoded forms). For
  URL-encoding specify `protocol = Http<GetUrl, Json>`.
- `ServerFnError` is imported from `dioxus`, not the `server_fn` crate.

**Assets**
- Unified builder: `asset!("/assets/img.png", AssetOptions::image().with_size(…).with_format(…))`.
  The old type-specific `ImageAssetOptions::new()` is replaced by `AssetOptions::image()`.

**`dx` CLI**
- Install: `curl -sSL https://dioxus.dev/install.sh | bash` (prebuilt) or
  `cargo binstall dioxus-cli` or `cargo install dioxus-cli` (slow, from source).
- Web target needs `rustup target add wasm32-unknown-unknown`.
- `dx new <app>` scaffold · `dx serve` run with hot-reload · `dx serve --platform desktop` ·
  `dx bundle` package for release · `dx doctor` check the toolchain.
- Linux desktop needs WebkitGtk + xdotool; Windows needs WebView2.

## Adding to this map

New doc pages appear in the docsite's `SUMMARY.md`. To refresh the map, `curl -s`
`https://raw.githubusercontent.com/DioxusLabs/docsite/main/docs-src/0.7/src/SUMMARY.md` and
reconcile against [`references/index.md`](references/index.md).
