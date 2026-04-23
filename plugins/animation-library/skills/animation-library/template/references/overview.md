# {{Library Display Name}} — Overview

## What it is

{{One or two paragraphs. Name the library, its author/maintainer, its position in the ecosystem, and what it fundamentally does. Include provenance (when released, who owns it now, any acquisitions or ownership changes).}}

## Architecture

{{Bulleted breakdown of the library's main concepts. Common shapes:}}

- **{{Core unit}}** — {{atomic concept the library exposes, e.g. Tween, Scene, Sprite, Spring.}}
- **{{Composer}}** — {{how core units compose, e.g. Timeline, Stage, Scene graph.}}
- **{{Loop driver}}** — {{the RAF / ticker / scheduler, where it lives, how to tap in.}}
- **{{Plugin / extension system}}** — {{how to extend, tree-shaking behaviour, naming conventions.}}
- **{{Context / lifecycle}}** — {{cleanup primitives, framework integration hooks.}}

## Ecosystem / plugins

{{Table if the library has a formal plugin system; otherwise a short paragraph naming first-party extensions and community packages.}}

| Plugin / package | Purpose |
|---|---|
| {{plugin-name}} | {{what it adds}} |

## Version history highlights

{{Three or four most recent releases with one-line changes. Cite against npm registry + release notes in sources.md.}}

| Version | Date | Change |
|---|---|---|
| {{X.Y.Z}} | {{YYYY-MM-DD}} | {{Headline feature or breaking change}} |

## Runtime targets

{{DOM, SVG, Canvas 2D, WebGL, WebGPU, WASM, Node. Note whether SSR is possible. Note framework coupling — can it run without a framework?}}

## Framework integration

- **{{React}}** — {{official binding package name, hook API, SSR / Strict Mode behaviour}}
- **{{Vue}}** — {{official or community, which major version}}
- **{{Other framework}}** — {{status: first-party / community / DIY}}
