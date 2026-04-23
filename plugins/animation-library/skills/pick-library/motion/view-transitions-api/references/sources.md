# View Transitions API — Sources

All claims in this dossier are traced to one of the following primary sources. Retrieved 2026-04-22.

---

## Specifications

1. **CSS View Transitions Level 1 (same-document)**
   W3C Working Draft — CSSWG Editor's Draft
   https://drafts.csswg.org/css-view-transitions-1/
   Retrieved 2026-04-22

2. **CSS View Transitions Level 2 (cross-document + scoped transitions)**
   CSSWG Editor's Draft — dated 9 March 2026 (not yet a formal W3C WD or CR)
   https://drafts.csswg.org/css-view-transitions-2/
   Retrieved 2026-04-22

---

## MDN Web Docs

3. **View Transition API — main article**
   https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
   Retrieved 2026-04-22

4. **`document.startViewTransition()`**
   https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
   Retrieved 2026-04-22

5. **`ViewTransition` interface**
   https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition
   Retrieved 2026-04-22

6. **`@view-transition` at-rule (cross-document)**
   https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition
   Retrieved 2026-04-22

---

## Can I Use — browser support tables

7. **`document.startViewTransition` (same-document, Level 1)**
   ~91% global coverage; Baseline (widely available)
   https://caniuse.com/mdn-api_document_startviewtransition
   Retrieved 2026-04-22

8. **`@view-transition` at-rule (cross-document, Level 2)**
   ~87% global coverage; NOT Baseline — "Limited availability" (Firefox not supported)
   https://caniuse.com/mdn-css_at-rules_view-transition
   Retrieved 2026-04-22

---

## Browser release notes

9. **Chrome 111 release — View Transition API shipped**
   https://developer.chrome.com/blog/new-in-chrome-111/
   Retrieved 2026-04-22

10. **Chrome 126 release — Cross-document View Transitions shipped**
    https://developer.chrome.com/blog/new-in-chrome-126/
    Retrieved 2026-04-22

11. **Safari 18.0 release notes — View Transition API**
    https://webkit.org/blog/15383/webkit-features-in-safari-18-0/
    Retrieved 2026-04-22

12. **Safari 18.2 release notes — cross-document View Transitions**
    https://webkit.org/blog/16301/webkit-features-in-safari-18-2/
    Retrieved 2026-04-22 (estimate / training-data extrapolation — specific blog URL unverified; cross-document Safari 18.2 support confirmed via caniuse source #8)

13. **Firefox 144 — `startViewTransition` shipped (same-document)**
    https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/144
    Retrieved 2026-04-22

14. **Firefox cross-document tracking bug #1860854**
    https://bugzilla.mozilla.org/show_bug.cgi?id=1860854
    Referenced via docs-research skill — not independently fetched; cite as training-data corroboration

---

## Research method

Primary research conducted via the `docs-research` skill (calls MDN, caniuse, and CSSWG sources) on 2026-04-22. Browser support figures from caniuse (sources #7, #8). All feature-level claims cross-checked against MDN articles and the CSSWG Editor's Drafts.
