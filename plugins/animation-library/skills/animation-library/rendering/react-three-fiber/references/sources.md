# React Three Fiber — Sources

All URLs verified 2026-04-22.

| Claim | Source | URL | Retrieved |
|---|---|---|---|
| r3f is a React renderer for three.js; key features including useFrame, no-overhead claim | Official docs — Introduction | https://r3f.docs.pmnd.rs/getting-started/introduction | 2026-04-22 |
| @react-three/fiber v9.6.0, published 2026-04-13 | npm registry | https://registry.npmjs.org/@react-three/fiber | 2026-04-22 |
| @react-three/fiber peer deps (three >=0.156, react >=19 <19.3) | npm registry latest manifest | https://registry.npmjs.org/@react-three/fiber/latest | 2026-04-22 |
| @react-three/fiber runtime deps (zustand ^5, its-fine ^2, suspend-react, etc.) | npm registry latest manifest | https://registry.npmjs.org/@react-three/fiber/latest | 2026-04-22 |
| @react-three/drei v10.7.7, published 2025-11-13 | npm registry | https://registry.npmjs.org/@react-three/drei | 2026-04-22 |
| @react-three/drei peer deps (three >=0.159, @react-three/fiber ^9.0.0, react ^19) | npm registry latest manifest | https://registry.npmjs.org/@react-three/drei/latest | 2026-04-22 |
| three.js v0.184.0, MIT license | npm registry latest manifest | https://registry.npmjs.org/three/latest | 2026-04-22 |
| @react-three/fiber bundle: ~50 KB gzip / ~156 KB min | Bundlephobia API | https://bundlephobia.com/api/size?package=@react-three/fiber@9.6.0 | 2026-04-22 |
| three.js bundle: ~178 KB gzip / ~707 KB min (v0.184.0) | Bundlephobia API | https://bundlephobia.com/api/size?package=three@0.184.0 | 2026-04-22 |
| @react-spring/three v10.0.3 peer deps (fiber >=6.0, react 16-19, three >=0.126) | npm registry latest manifest | https://registry.npmjs.org/@react-spring/three/latest | 2026-04-22 |
| React Native support via react-native >=0.78, expo >=43 peer deps | npm registry latest manifest | https://registry.npmjs.org/@react-three/fiber/latest | 2026-04-22 |
| drei helper overview (OrbitControls, useGLTF, Environment, Text, Instances, etc.) | Official docs — Getting Started | https://r3f.docs.pmnd.rs/getting-started/introduction | 2026-04-22 |

## Notes on unverified claims

- **drei bundle size** (~485 KB gzip reported by docs-research skill): the skill retrieved this from bundlephobia but with heavy caveats (tree-shakeable; weight depends on imports). Treat as an upper-bound estimate for full import.
- **WebGPU experimental support** (three.js r163+): documented in three.js release notes but not independently verified via primary source in this session; labeled "experimental."
- **@theatre/r3f interop**: not independently verified in this session; based on docs-research output referencing official Theatre.js documentation.
