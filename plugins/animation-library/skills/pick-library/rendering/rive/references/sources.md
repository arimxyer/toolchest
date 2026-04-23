# Rive — Sources

All claims verified on 2026-04-22 via primary sources.

| Claim | URL | Retrieved |
|---|---|---|
| Package list, renderer variants, canvas vs WebGL2 | https://rive.app/docs/runtimes/web/canvas-vs-webgl | 2026-04-22 |
| `@rive-app/canvas` version 2.37.3, release date 2026-04-20 | https://registry.npmjs.org/@rive-app/canvas (npm registry API) | 2026-04-22 |
| `@rive-app/react-canvas` version 4.28.1, release date 2026-04-17 | https://registry.npmjs.org/@rive-app/react-canvas (npm registry API) | 2026-04-22 |
| Bundle sizes (brotli-9): canvas-lite 222KB, canvas 567KB, webgl2 648KB | https://rive.app/docs/runtimes/runtime-sizes | 2026-04-22 |
| MIT license for rive-wasm runtime | https://github.com/rive-app/rive-wasm/blob/master/LICENSE | 2026-04-22 |
| Editor pricing tiers (Free / Cadet $9 / Voyager $32 / Enterprise $120) | https://rive.app/pricing | 2026-04-22 |
| Free tier restrictions: no commercial export, 3 files, 1 project | https://rive.app/pricing | 2026-04-22 |
| Supported platforms: Web, React, React Native (Nitro), Flutter, iOS, Android, Unity, Unreal, Webflow, WordPress | https://rive.app/docs/runtimes/web (platform list) | 2026-04-22 |
| State machine inputs API: Trigger/Boolean/Number, stateMachineInputs(), fire(), value | https://rive.app/docs/runtimes/web/inputs | 2026-04-22 |
| Inputs API deprecated in favor of Data Binding | https://rive.app/docs/runtimes/web/inputs | 2026-04-22 |
| No "State Machine 2" branding found in current docs | https://rive.app/docs/runtimes/web/state-machines | 2026-04-22 |
| onStateChange, onLoad, onPlay, onPause callbacks | https://github.com/rive-app/rive-docs/blob/main/runtimes/web/inputs.mdx | 2026-04-22 |
| useRive hook, RiveComponent, stateMachines param | https://github.com/rive-app/rive-react/blob/main/examples/src/components/Http.tsx (MIT) | 2026-04-22 |
| webgl (WebGL1) deprecated after v2.37.0; use webgl2 | https://rive.app/docs/runtimes/web/canvas-vs-webgl | 2026-04-22 |
| canvas-lite strips text, layout, audio, scripting | https://rive.app/docs/runtimes/web/canvas-vs-webgl | 2026-04-22 |

## Note on bundle size unit

Rive's official runtime-sizes page reports **brotli-9** compression, not gzip. Bundlephobia reports ~42 KB gzip for the JS entry point only, but this omits the WASM binary that dominates the actual payload. The brotli-9 figures from Rive's docs (567 KB for `canvas`) represent the complete JS+WASM asset. Gzip figures for the combined JS+WASM payload are not separately published by Rive as of 2026-04-22.
