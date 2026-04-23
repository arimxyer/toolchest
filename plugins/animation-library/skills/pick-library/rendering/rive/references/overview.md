# Rive — Overview

Rive is a two-part product: a **vector animation editor** (SaaS) and a set of **open-source runtimes** (MIT). Designers create `.riv` binary files in the editor; runtimes load and render them with a WASM core.

## Core concepts

**Artboards** are the canvas unit — one `.riv` file can contain multiple artboards. Each artboard has timelines and state machines.

**State Machines** are the interactivity layer. A state machine is a graph of animation states connected by transitions. Inputs (Trigger, Boolean, Number) or Data Binding drive transitions. As of 2026-04-22, Rive's docs do not use the term "State Machine 2"; the current system is simply "State Machines." The older Inputs API is deprecated in favor of Data Binding for new projects.

**Data Binding** connects artboard properties directly to runtime values, replacing imperative `stateMachineInputs()` wrangling. It is the forward-facing API.

**Renderers**: two web targets exist:
- `@rive-app/canvas` — uses browser `CanvasRenderingContext2D`; wider device compat
- `@rive-app/webgl2` — uses Rive's own vector renderer over WebGL2; better quality (feathering, blending)

**Lite variants**: `@rive-app/canvas-lite` strips text, layout, audio, and scripting for the smallest footprint (222 KB brotli-9).

## Editor pricing (as of 2026-04-22)

| Tier | Cost | Key constraint |
|---|---|---|
| Free | $0/seat | 3 files, 1 project, no commercial export |
| Cadet | $9/seat/mo | Commercial use, unlimited files, export enabled |
| Voyager | $32/seat/mo | Libraries, CDN hosting, real-time collaboration |
| Enterprise | $120/seat/mo | SSO, SOC2, dedicated support |

The free tier explicitly prohibits commercial shipping. Paid tiers enable the export step required to embed `.riv` files in products.

## Platform matrix

Web (JS/WASM), React, React Native (Rive Nitro), Flutter, iOS (SwiftUI), Android (Compose), Unity, Unreal Engine, Webflow, WordPress.
