# @react-three/rapier — Differentiators

r3/rapier is the only physics engine in this dossier. Its comparisons are: (1) how it fits alongside its R3F host, (2) how it differs from alternative physics approaches, and (3) where the 2D/CSS siblings in this dossier are irrelevant.

---

## vs. react-three-fiber (the host)

r3f renders and animates 3D scenes declaratively. It has no physics. r3/rapier is an additive layer on top of r3f — `<Physics>` lives inside `<Canvas>`, and RigidBody components wrap r3f meshes. The two are complementary; rapier is not usable without r3f in the React ecosystem.

| Concern | r3f alone | r3f + r3/rapier |
|---|---|---|
| Object movement | Manual `useFrame` + position updates | Simulation-driven; read positions from the physics world |
| Collision detection | Ray-cast only (three.js Raycaster) | Full narrow-phase collision with contact normals and forces |
| Constraints | None | Revolute, prismatic, spring, rope, spherical, fixed joints |
| Performance model | JS per-frame updates | WASM tick; sync to three.js via ref writes |

## vs. three-js (vanilla, no React)

Vanilla three.js users needing physics call rapier.js (`@dimforge/rapier3d-compat`) directly — the same underlying WASM binary. r3/rapier is exactly that binding expressed as React components and hooks. For non-React three.js projects, there is no reason to add the React wrapper overhead; use rapier.js directly.

Cannon-es is the older alternative used in many three.js tutorials. It is JavaScript-only (no WASM), last released in 2021, and significantly slower at scale. Rapier.rs supersedes it on every axis: speed, active maintenance, feature set.

## vs. babylon-js (alternative 3D + physics stack)

Babylon.js ships Havok physics integration as a first-class, opt-in module — no separate physics library needed. If you are evaluating which 3D engine to adopt and physics is a key requirement, Babylon.js + Havok is a self-contained alternative to the R3F + r3/rapier stack.

The trade-off: Babylon.js is heavier overall and not React-native (though React wrappers exist). R3F + r3/rapier gives you React-idiomatic scene authoring with the same underlying physics quality.

## vs. 2D siblings in this dossier

None of the motion/animation siblings (motion, gsap, anime, react-spring, Theatre.js, WAAPI, tailwindcss-animate, etc.) provide physics simulation. They animate DOM, SVG, or CSS properties. r3/rapier simulates a 3D physical world. These are categorically different and never compete directly.

The only partial overlap: **react-spring** — `@react-spring/three` applies spring-physics to R3F mesh transforms. That is spring interpolation on properties, not rigid-body simulation. You would use react-spring for a bouncy UI reveal and r3/rapier for a box falling onto a floor.

## vs. other rendering siblings

| Library | Physics capability |
|---|---|
| three-js | None built-in; pair with rapier.js directly |
| react-three-fiber | None built-in; pair with r3/rapier |
| babylon-js | Havok built-in (opt-in) |
| pixi-js / pixi-react | No 3D; 2D only; pair with matter.js for 2D physics |
| konva / react-konva | No physics |
| lottie / rive | Animation playback only; no physics |
| remotion | Video rendering; no real-time physics |
| p5-js / phaser | 2D physics via Matter.js or Arcade (Phaser built-in) |

## Summary positioning

r3/rapier is the correct pick when: (a) you are in an R3F scene, and (b) you need simulation-driven motion — collisions, constraints, or forces. For everything else in this dossier, the question of "physics" does not arise.
