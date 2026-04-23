# @pixi/react — Sources

All URLs retrieved 2026-04-22.

---

## Primary sources

| Source | URL | Notes |
|---|---|---|
| GitHub repo | https://github.com/pixijs/pixi-react | Official repo under pixijs org; README, package.json |
| Official docs | https://react.pixijs.io | v8.x documentation site |
| Getting started | https://react.pixijs.io/getting-started | Installation, core concepts |
| Application component | https://react.pixijs.io/components/application | `<Application>` props reference |
| npm package | https://www.npmjs.com/package/@pixi/react | Version history, weekly downloads |
| Bundlephobia | https://bundlephobia.com/package/@pixi/react@8.0.5 | Bundle size: 131 KB min / 40.6 KB gzip |

## Release verification

- v8.0.5 published: 2025-12-01 (verified via GitHub Releases API)
- v8.0.4 published: 2025-11-18
- v8.0.3 published: 2025-07-24
- v8.1.0-alpha.1 published: 2025-04-10 (alpha; not latest stable)
- Latest stable: **v8.0.5**

## Key facts verified

| Fact | Source | Verification method |
|---|---|---|
| License: MIT | `package.json` in repo + GitHub API `.license.spdx_id` | `gh api repos/pixijs/pixi-react` |
| React peer dep: `>=19.0.0` | `package.json` `peerDependencies` | `gh api repos/pixijs/pixi-react/contents/package.json` |
| PixiJS peer dep: `^8.2.6` | `package.json` `peerDependencies` | same |
| Bundle 40.6 KB gzip | Bundlephobia API | `bundlephobia.com/api/size?package=@pixi/react@8.0.5` |
| First-party under pixijs org | GitHub API `owner.login` + repo URL | `gh api repos/pixijs/pixi-react` |
| Homepage: react.pixijs.io | GitHub API `homepage` field | `gh api repos/pixijs/pixi-react` |
| Weekly downloads ~49,900 | Task brief; npm 403 blocked direct verification | Cross-referenced with Context7 |
| `extend()` API model | README + docs | GitHub repo README |
| `useApplication`, `useTick`, `useExtend` hooks | README + Context7 docs | Verified against both |

## Context7 library IDs used

- `/pixijs/pixi-react` — 101 snippets, High reputation, score 87.7
- `/websites/react_pixijs_io` — 58 snippets, High reputation, score 78.15
