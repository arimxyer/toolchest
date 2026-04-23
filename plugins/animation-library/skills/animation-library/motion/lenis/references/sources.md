# Lenis — Sources

All sources retrieved 2026-04-22.

---

| # | Source | URL | Notes |
|---|---|---|---|
| 1 | GitHub repository (darkroomengineering/lenis) — README, settings, API tables, limitations | https://github.com/darkroomengineering/lenis | Primary API reference; v1.3.23 state |
| 2 | npm package registry — version history, weekly downloads, file listing | https://www.npmjs.com/package/lenis | Confirmed 1.3.23, 420 K weekly downloads, MIT license, 0 runtime deps |
| 3 | npm registry latest endpoint | https://registry.npmjs.org/lenis/latest | Confirmed v1.3.21 as prior latest; version history table |
| 4 | GitHub Releases page (darkroomengineering/lenis) | https://github.com/darkroomengineering/lenis/releases | Confirmed v1.3.23 released 2026-04-15, v1.3.22 released 2026-04-15 |
| 5 | Bundlephobia — lenis package size | https://bundlephobia.com/package/lenis | Attempted; page did not render the gzipped metric (client-side JS rendering not available in fetch). Homepage "<4 kB gz" claim unconfirmed via Bundlephobia — treat as estimate / vendor claim. Min.js file size (17.3 kB uncompressed) confirmed via npm file listing. |
| 6 | Lenis MANIFESTO (darkroomengineering/lenis) | https://github.com/darkroomengineering/lenis/blob/main/MANIFESTO.md | Origin story — WebGL sync problem; smooth scroll as "the happy mistake" |
| 7 | Locomotive Scroll v5 — Introduction docs | https://scroll.locomotive.ca/docs/ | Confirmed "Built on top of Lenis, reduced to 9.4kB gzipped" |
| 8 | Locomotive Scroll v5 — Migration Guide (v4 → v5) | https://scroll.locomotive.ca/docs/extras/migration-guide | Confirmed Lenis is the scroll engine; options now inside `lenisOptions` object |
| 9 | Locomotive Scroll v5 — GitHub issue #570 (wrapper) | https://github.com/locomotivemtl/locomotive-scroll/issues/570 | Shows Locomotive v5 creates `new Lenis()` internally; thin wrapper confirmed at code level |
| 10 | lenis/vue package — Nuxt module docs | https://github.com/darkroomengineering/lenis/tree/main/packages/vue | Confirmed `modules: ['lenis/nuxt']` pattern |
| 11 | Lenis homepage / demo | https://lenis.darkroom.engineering | Homepage confirmed live; "under 4 kB" size claim; demo showcase |
| 12 | WebKit bug — 60fps Safari cap | https://bugs.webkit.org/show_bug.cgi?id=173434 | Source of Safari 60fps limitation documented in Lenis README |
| 13 | Lenis GitHub issue #103 — position fixed Safari lag | https://github.com/darkroomengineering/lenis/issues/103 | Confirmed position:fixed lag on pre-M1 Safari |
