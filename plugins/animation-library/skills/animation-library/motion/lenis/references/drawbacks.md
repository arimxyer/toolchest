# Lenis — Drawbacks

---

## Scroll hijacking and accessibility

Lenis intercepts `wheel` and `touch` events and overrides native scroll behavior. This creates several accessibility concerns:

- **Vestibular disorders** — users with motion sensitivity (WCAG 2.1 SC 2.3.3) can be affected by smooth, momentum-driven scroll. The browser's `prefers-reduced-motion` media query is **not respected automatically**. You must add a manual guard:
  ```js
  const lenis = new Lenis()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis.destroy()
  }
  ```
- **Keyboard and assistive technology navigation** — native scroll via `Tab`, `Space`, `Page Down`, and screen reader virtual cursor may behave unexpectedly when Lenis overrides the scroll container geometry. Requires testing.
- **No ARIA or semantic interaction** — Lenis makes no accessibility guarantees and provides no ARIA attributes. The library is opinionated about UX at the cost of native behavior fidelity.

## SSR / server-side rendering

Lenis is a pure browser runtime. All initialization code must be guarded:

- In Next.js/Nuxt, any top-level `new Lenis()` call will crash during SSR. Must use `typeof window !== 'undefined'` guards or dynamic imports.
- `lenis/nuxt` module handles this for Nuxt automatically; `lenis/react`'s `<ReactLenis>` handles it for React via useEffect, but only if used correctly.
- Hydration mismatches can occur if scroll position differs between server render and client init.

## CSS scroll-snap incompatibility

Native CSS `scroll-snap-type` / `scroll-snap-align` do not work with Lenis because Lenis bypasses the browser's native scroll engine. Use `lenis/snap` (first-party package) as a replacement — but it requires additional configuration and does not cover all CSS scroll-snap use cases.

## Safari performance ceiling

- Capped at 60fps on Safari due to a known WebKit bug (webkit.org/b/173434). Native scroll on Safari M-series runs at full ProMotion (up to 120fps); Lenis cannot exceed 60fps on that platform.
- On low-power mode (iOS), the cap drops to 30fps.

## iframe limitation

Lenis stops working for content inside `<iframe>` elements — iframes do not forward wheel events to the parent document. Any embedded third-party content in an iframe will not participate in Lenis smooth scroll.

## Nested scroll complexity

Lenis's scroll intercept conflicts with nested scrollable containers by default. Workarounds:

- `allowNestedScroll: true` — automatic but runs a DOM traversal on every scroll event (performance cost).
- `data-lenis-prevent` attributes — explicit, performant, but requires annotating every nested scroll container in markup.
- `prevent` callback — JS-based, per-event DOM tree walk.

None of these are zero-cost or zero-configuration.

## Touch device behavior

- `syncTouch: false` (default) means touch devices use native scroll momentum, not Lenis lerp. The scroll events still fire, but the lerp effect is absent.
- `syncTouch: true` enables touch lerp but is documented as unstable on iOS < 16, and can produce jitter (v1.3.23 includes a fix for syncTouch slow-scroll jitter, but the underlying instability on older iOS remains).

## No physics model

Lenis uses lerp (linear interpolation), not spring physics. The momentum feel is mathematically simple and configurable (`lerp`, `duration`, `easing`) but cannot model mass/friction/tension like react-spring or popmotion. The scroll feel is smooth but not physically simulated.

## position: fixed lag (Safari pre-M1)

`position: fixed` elements may lag during Lenis scroll on macOS Safari pre-M1, due to a compositing issue (GitHub issue #103). This is a known, hardware-specific limitation with no full workaround.
