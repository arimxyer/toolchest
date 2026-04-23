# Lottie — Sources

All claims verified via primary sources. Retrieved 2026-04-22.

## npm Registry

- **lottie-web package metadata** (version, release date, weekly downloads)
  URL: https://registry.npmjs.org/lottie-web
  Retrieved: 2026-04-22
  Claims: version 5.13.0, released 2025-05-21; ~5.28M weekly downloads

- **@lottiefiles/dotlottie-web package metadata** (version, release date, weekly downloads)
  URL: https://registry.npmjs.org/@lottiefiles/dotlottie-web
  Retrieved: 2026-04-22
  Claims: version 0.71.0, released 2026-04-14; ~1.0M weekly downloads; weekly release cadence confirmed by changelog

## GitHub

- **airbnb/lottie-web repository** (stars, issues, forks, last push date, maintenance status)
  URL: https://api.github.com/repos/airbnb/lottie-web
  Retrieved: 2026-04-22
  Claims: 31,815 stars, 847 open issues, 2,926 forks, last push 2025-09-01

- **lottiefiles/dotlottie-web repository** (stars, issues, forks, last push date)
  URL: https://api.github.com/repos/lottiefiles/dotlottie-web
  Retrieved: 2026-04-22
  Claims: 502 stars, 52 open issues, 31 forks, last push 2026-04-22 (active)

- **airbnb/lottie-web README** (renderer types, API, file format, license)
  URL: https://github.com/airbnb/lottie-web/blob/master/README.md
  Retrieved: 2026-04-22 (via context7)
  Claims: MIT license; renderers: svg / canvas / html; loadAnimation API; instance method list; global lottie API

- **lottiefiles/dotlottie-web README** (API, format support, framework wrappers)
  URL: https://github.com/lottiefiles/dotlottie-web/blob/main/README.md
  Retrieved: 2026-04-22 (via context7)
  Claims: MIT license; WASM/ThorVG renderer; DotLottie constructor API; .lottie + .json format support

## Bundle Sizes (bundlephobia API)

- **lottie-web@5.13.0 bundle size**
  URL: https://bundlephobia.com/api/size?package=lottie-web@5.13.0
  Retrieved: 2026-04-22
  Claims: 305,885 bytes minified; 76,789 bytes gzipped (~75 kB gzip)

- **@lottiefiles/dotlottie-web@0.71.0 bundle size**
  URL: https://bundlephobia.com/api/size?package=@lottiefiles/dotlottie-web@0.71.0
  Retrieved: 2026-04-22
  Claims: 322,237 bytes minified; 34,216 bytes gzipped (~33 kB gzip) — JS only, excludes WASM binary loaded at runtime

## Official Documentation

- **LottieFiles dotlottie-web developer docs** (DotLottie API, state machines, theming, framework wrappers)
  URL: https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-web
  Retrieved: 2026-04-22 (via context7)
  Claims: DotLottie constructor options, state machine API, OffscreenCanvas/Worker support, renderConfig options

## Notes on unverified / estimated claims

- The "light" SVG-only build of lottie-web being significantly smaller than the full build: stated in lottie-web README but no specific gzip figure retrieved via bundlephobia (the API endpoint `lottie-web/src/main/lottie_light.js` is not a standard npm export path that bundlephobia can measure). Marked as "significant but unquantified" in dossier.md.
- Rive `.riv` file size vs. Lottie JSON comparison in differentiators.md: general engineering knowledge, not freshly benchmarked. Labeled accordingly.
- ThorVG WASM binary transfer size: not independently verified from a CDN or build artifact. Described as "additional network cost" without a specific byte count.
