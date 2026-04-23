# Rive — API Reference

## Installation

```bash
npm install @rive-app/react-canvas   # React (wraps @rive-app/canvas)
npm install @rive-app/canvas         # Vanilla JS / other frameworks
npm install @rive-app/react-webgl2   # React + Rive Renderer (WebGL2)
```

## React — useRive hook

```ts
import { useRive, UseRiveParameters } from '@rive-app/react-canvas';

const params: UseRiveParameters = {
  src: '/animations/hero.riv',   // URL or ArrayBuffer
  artboard: 'HeroBoard',         // optional; defaults to artboard marked default in editor
  stateMachines: 'MainSM',       // string | string[]
  autoplay: true,
};

const { RiveComponent, rive } = useRive(params);
// <RiveComponent /> renders into a sized <canvas>; rive is the Rive instance (null until loaded)
```

## Low-level Rive constructor (vanilla JS)

```ts
import Rive from '@rive-app/canvas';

const r = new Rive({
  src: '/animations/hero.riv',
  canvas: document.getElementById('canvas') as HTMLCanvasElement,
  stateMachines: 'MainSM',
  autoplay: true,
  onLoad: () => r.resizeDrawingSurfaceToCanvas(),
});
```

## State Machine Inputs (legacy; prefer Data Binding for new work)

```ts
// After onLoad fires:
const inputs = r.stateMachineInputs('MainSM');

// Three input types:
const trigger  = inputs.find(i => i.name === 'Bump');   // Trigger — call .fire()
const flag     = inputs.find(i => i.name === 'IsOpen');  // Boolean — set .value
const speed    = inputs.find(i => i.name === 'Speed');   // Number  — set .value

trigger?.fire();
if (flag)  flag.value  = true;
if (speed) speed.value = 2.5;
```

## Callbacks

```ts
new Rive({
  // ...
  onStateChange: (event) => console.log('State changed:', event.data),
  onLoad:        ()      => { /* safe to call stateMachineInputs here */ },
  onPlay:        (event) => {},
  onPause:       (event) => {},
});
```

## Data Binding (forward-facing API)

Data Binding connects artboard view-model properties to runtime values declaratively. Configure bindings in the Rive editor; at runtime, set values via the view-model instance instead of inputs. See Rive docs → Data Binding for the current API surface.

## Renderer selection

| Package | Renderer | When to use |
|---|---|---|
| `@rive-app/canvas-lite` | Canvas 2D | Minimum bundle; no text/audio/scripting |
| `@rive-app/canvas` | Canvas 2D | General web use |
| `@rive-app/webgl2` | Rive Renderer (WebGL2) | Best visual quality; requires WebGL2 support |

The `@rive-app/webgl` package (WebGL1) is deprecated after v2.37.0 — use `webgl2`.
