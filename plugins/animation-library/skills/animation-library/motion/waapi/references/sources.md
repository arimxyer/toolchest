# WAAPI — Sources

All sources verified on 2026-04-22.

---

## Specifications

| Title | URL | Status | Notes |
|---|---|---|---|
| Web Animations Level 1 | https://www.w3.org/TR/web-animations-1/ | W3C Working Draft, Jun 5 2023 | Covers Element.animate, KeyframeEffect, AnimationTimeline, DocumentTimeline |
| Web Animations Level 1 (Editor's Draft) | https://drafts.csswg.org/web-animations-1/ | ED (living) | CSS WG draft, may be ahead of published WD |
| Scroll-driven Animations | https://drafts.csswg.org/scroll-animations-1/ | Editor's Draft, Dec 17 2025 | Covers ScrollTimeline, ViewTimeline |

---

## MDN Web Docs

| Topic | URL |
|---|---|
| Web Animations API overview | https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API |
| Element.animate() | https://developer.mozilla.org/en-US/docs/Web/API/Element/animate |
| KeyframeEffect | https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect |
| AnimationTimeline | https://developer.mozilla.org/en-US/docs/Web/API/AnimationTimeline |
| ScrollTimeline | https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline |
| ViewTimeline | https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline |
| Animation (interface) | https://developer.mozilla.org/en-US/docs/Web/API/Animation |
| document.getAnimations() | https://developer.mozilla.org/en-US/docs/Web/API/Document/getAnimations |

---

## Browser support data

| Source | URL | Notes |
|---|---|---|
| MDN browser compat data (Element.animate) | https://developer.mozilla.org/en-US/docs/Web/API/Element/animate#browser_compatibility | Baseline widely available, Chrome 84+, Firefox 75+, Safari 13.1+ |
| MDN browser compat data (ScrollTimeline) | https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline#browser_compatibility | Chrome 115+, Edge 115+, Safari 26+; Firefox behind flag |
| MDN browser compat data (ViewTimeline) | https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline#browser_compatibility | Same matrix as ScrollTimeline |

---

## Chrome developer articles

| Title | URL |
|---|---|
| Scroll-driven Animations (chrome.dev) | https://developer.chrome.com/docs/css-ui/scroll-driven-animations |

---

## Notes on "unknown" / unverified fields

- Global usage figure (~95.5% for Element.animate) sourced from MDN browser compatibility data which aggregates caniuse-style usage stats. Treat as an approximation.
- Safari 26 for ScrollTimeline/ViewTimeline: referenced in MDN compat tables as upcoming/technology-preview. Exact GA release date not confirmed as of 2026-04-22.
- Firefox ScrollTimeline flag status: per MDN compat data as of 2026-04-22; subject to change in Firefox releases.
