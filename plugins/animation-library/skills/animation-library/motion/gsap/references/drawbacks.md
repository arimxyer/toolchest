# GSAP — Drawbacks

---

## Bundle weight

- Core alone is ~26.6 kB gz (~71 kB min). Add ScrollTrigger (~18.3 kB gz) and you're at ~45 kB gz before any other plugins. For a single fade or entrance animation, this is significant overhead versus WAAPI (0 KB) or a CSS class toggle.
- The full npm package is 6 MB unpacked (all plugins, ESM + UMD + types). Tree-shaking works but only if plugins are not `registerPlugin`d at module root.

## Non-standard license

- GSAP does not use a standard SPDX license (not MIT, Apache-2, etc.). The Webflow-owned custom license is free for most uses but contains a competitive-use restriction: you cannot use GSAP in a product that lets users build visual animations without writing code if that product competes with Webflow's visual animation builder.
- License terms can change unilaterally — Webflow reserves the right to update at any time.
- "Free" is a business decision by a for-profit company, not a community-governed OSS guarantee.

## Historical paid-license friction (resolved, but worth knowing)

- For most of GSAP's commercial life (pre-v3.13, pre-April 2025), premium plugins (SplitText, MorphSVG, ScrollSmoother, DrawSVG, Flip) required a paid Club GSAP membership ($150/yr+). This created friction for OSS projects and meant plugins were not distributable via public npm. This is now resolved — all plugins ship in the public `gsap` npm package.
- Some older tutorials and Stack Overflow answers reference the members-only CDN or `gsap-bonus` private registry; those instructions are now obsolete.

## Imperative, not declarative

- GSAP is code-first. Every animation is imperative JavaScript. There is no JSX-friendly `<Animate>` component, no declarative prop-driven state transition model. For component-state-driven UI, motion (Framer Motion) or react-spring integrate more naturally into React's render model.
- Cleanup in React requires `useGSAP()` hook or manual `gsap.context().revert()` — easy to get wrong with Strict Mode.

## No physics model

- GSAP eases are mathematical curves with a fixed duration. There is no spring physics simulation — you cannot define mass, tension, or friction and let the physics resolve to a natural resting point. react-spring and popmotion are better choices when animations must feel physically continuous (e.g., gesture-driven dragging with momentum).

## Code-only — no GUI editor

- Unlike Theatre.js (Studio editor) or Rive (node-based animation editor), GSAP provides no visual authoring environment. Complex sequences require mental-model timecode arithmetic or iterating in a browser devtools inspector.

## Server-side rendering

- GSAP is a browser runtime. It has no SSR output capability and must be used with `typeof window !== "undefined"` guards or dynamic imports in SSR frameworks (Next.js, Nuxt). `ScrollTrigger.refresh()` is frequently needed on hydration to recalculate page geometry.

## Accessibility

- GSAP does not automatically reduce motion for `prefers-reduced-motion`. Developers must wrap animations in `gsap.matchMedia()` checks manually. (SplitText v3.13+ does preserve `aria-label` on split containers, which is an improvement.)
