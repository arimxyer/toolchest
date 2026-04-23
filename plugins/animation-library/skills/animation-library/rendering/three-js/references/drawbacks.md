# three.js — Drawbacks

## Bundle weight

three.js core is ~178 KB gzip / ~724 KB minified (v0.184.0). This is unavoidable — the library encodes a full scene graph, PBR shaders, loaders, and renderer. For a landing page animation or a subtle scroll effect, this cost is rarely justified. Compare to motion (~18 KB gz), GSAP (~25 KB gz), or WAAPI (zero cost — built into the browser). Tree-shaking helps only modestly; the renderer and core math are always included.

Additional loaders (`GLTFLoader`, `EXRLoader`), postprocessing passes, and controls are in separate `jsm/` files that add further weight on demand.

## Steep learning curve

three.js does not abstract away 3D graphics fundamentals. Developers must understand:

- Scene graph composition and coordinate systems (world vs. local space, handedness)
- Camera models (perspective frustum, field of view, near/far planes, aspect ratio)
- Physically-based rendering — metalness, roughness, environment maps, gamma correction
- Geometry buffers, UV mapping, normals for non-trivial meshes
- WebGL constraints: draw calls, texture memory limits, fill rate, state machine behavior
- Asset pipeline: exporting GLTF correctly from Blender/Maya/Cinema4D so animations and materials survive

Developers who know JS but not 3D graphics face a significant ramp that JSX wrappers or documentation cannot shortcut.

## AnimationMixer is not a general tween engine

`AnimationMixer` / `AnimationClip` / `AnimationAction` exist specifically to play **skeletal and morph-target animation data baked into GLTF/FBX models** — walking characters, facial rigs, blended poses. They are not designed for tweening arbitrary object properties (position, scale, material color) in response to user interaction or scroll events.

For that use case, pair three.js with **GSAP** (`gsap.to(mesh.position, { x: 5, duration: 1 })`) or **Motion**. Attempting to use `AnimationMixer` as a general tween engine leads to awkward clip construction that GSAP handles trivially.

## No SSR story

three.js accesses browser APIs (`WebGLRenderingContext`, `window`, `document`, `HTMLCanvasElement`) at import time or first use. In SSR frameworks (Next.js, Astro, SvelteKit):

- The renderer must be guarded with `typeof window !== 'undefined'` checks
- In Next.js, components containing three.js must be dynamically imported with `{ ssr: false }`
- Server-side rendering a three.js scene to an image requires headless WebGL (e.g., the `gl` npm package on Node) — functional but adds significant infrastructure complexity
- SSR-generated HTML contains no 3D content; the scene only appears after client hydration

## Imperative API verbosity

Vanilla three.js is fully imperative. Creating a simple lit sphere with orbit controls requires ~30–50 lines of boilerplate (renderer setup, camera, lights, resize handler, animation loop, controls update). React Three Fiber eliminates most of this boilerplate in exchange for a React dependency; vanilla three.js does not.

Every scene teardown requires manual `.dispose()` calls on geometries, materials, textures, and render targets to avoid GPU memory leaks. Forgetting disposal in a SPA causes gradual VRAM exhaustion.

## No built-in physics, audio, or UI

three.js is a rendering library only. Compared to Babylon.js (which ships integrated physics, a GUI system, and an audio engine), three.js requires separate libraries for:

- Physics: cannon-es, rapier (via @react-three/rapier in the r3f ecosystem), ammo.js
- Audio: `THREE.AudioListener` / `THREE.Audio` exists but is basic; Web Audio API or Howler.js for production needs
- In-scene UI: no built-in solution; `jsm/renderers/CSS2DRenderer.js` or DOM overlay required

## Versioning and breaking changes

three.js uses numbered revisions (r171, r184) with breaking changes between each. There is no semver stability guarantee. Migration between revisions requires checking the migration guide; popular patterns (e.g., `geometry.vertices`) were removed years ago and community examples are often stale.

npm installs as `0.184.0` but the docs reference `r184` — this dual naming causes confusion when matching community tutorials to the installed version.

## WebGPU renderer maturity

While `WebGPURenderer` is production-ready since r171, the TSL (Three Shading Language) node-based material system — required for WebGPU custom shaders — is a new abstraction with its own learning curve distinct from traditional GLSL. Not all three.js examples and add-ons have been ported to TSL/WebGPU yet.
