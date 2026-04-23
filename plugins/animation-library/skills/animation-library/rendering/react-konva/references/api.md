# react-konva — API Reference

## Core components

All components accept any Konva config object prop plus React-style event handlers.

### `<Stage>`

Root canvas container. Renders a `<canvas>` element wrapped in a `<div>`.

```tsx
<Stage width={800} height={600} ref={stageRef}>
  {/* one or more Layers */}
</Stage>
```

Required props: `width`, `height` (numbers, in px).  
Optional: `className`, `style`, `scaleX`, `scaleY`, `draggable`.  
`ref` gives access to the underlying `Konva.Stage` instance.

### `<Layer>`

Groups shapes for independent compositing. Use multiple layers to separate static from dynamic content — each Layer is its own `<canvas>` element.

```tsx
<Layer listening={false}> {/* static background — skip hit-testing */}
  <Rect x={0} y={0} width={800} height={600} fill="#f5f5f5" />
</Layer>
<Layer>
  {/* interactive shapes */}
</Layer>
```

### Shape components

Every Konva shape is exposed as a React component. Common shapes:

| Component | Key props |
|---|---|
| `<Rect>` | `x`, `y`, `width`, `height`, `fill`, `stroke`, `cornerRadius` |
| `<Circle>` | `x`, `y`, `radius`, `fill`, `stroke` |
| `<Ellipse>` | `x`, `y`, `radiusX`, `radiusY` |
| `<Line>` | `points` (flat array), `stroke`, `tension`, `closed` |
| `<Text>` | `x`, `y`, `text`, `fontSize`, `fontFamily`, `fill` |
| `<Image>` | `x`, `y`, `image` (HTMLImageElement), `width`, `height` |
| `<Star>` | `x`, `y`, `numPoints`, `innerRadius`, `outerRadius` |
| `<RegularPolygon>` | `x`, `y`, `sides`, `radius` |
| `<Arrow>` | `points`, `pointerLength`, `pointerWidth` |
| `<Path>` | `data` (SVG path string), `fill`, `stroke` |
| `<Group>` | container — transform applied to all children |
| `<Transformer>` | resize/rotate handle widget (wraps `Konva.Transformer`) |

### Universal shape props

```tsx
<Rect
  x={20} y={20}
  width={100} height={50}
  fill="steelblue"
  stroke="#333" strokeWidth={2}
  opacity={0.8}
  rotation={15}           // degrees
  scaleX={1.5}
  draggable               // boolean shorthand
  shadowBlur={10}
  shadowColor="rgba(0,0,0,0.3)"
  listening={true}        // include in hit graph
/>
```

## Event handling

Events use `onEventName` convention, mapping to Konva's `on('eventname')`:

```tsx
<Rect
  onClick={(e) => {
    const node = e.target;          // Konva.Node
    const pos = node.position();    // { x, y }
  }}
  onDragStart={(e) => {}}
  onDragMove={(e) => {}}
  onDragEnd={(e) => {}}
  onMouseEnter={(e) => {}}
  onMouseLeave={(e) => {}}
  onTap={(e) => {}}                 // touch equivalent of click
/>
```

## Refs

Access the underlying Konva node for imperative operations:

```tsx
const rectRef = useRef<Konva.Rect>(null);
// imperative: rectRef.current.to({ x: 200, duration: 0.5 }); // tween
```

## Animation

Use Konva's `Konva.Animation` or `node.to()` tween — accessed via ref, not React state — for smooth animation without re-renders:

```tsx
useEffect(() => {
  const anim = new Konva.Animation((frame) => {
    rectRef.current!.rotation(frame!.time * 0.05 % 360);
  }, layerRef.current);
  anim.start();
  return () => anim.stop();
}, []);
```

## react-konva-utils

Optional companion package for two common cross-cutting needs:

```bash
npm install react-konva-utils
```

### `<Html>` — DOM overlay inside canvas

```tsx
import { Html } from 'react-konva-utils';

<Layer>
  <Html divProps={{ style: { position: 'absolute', top: 40, left: 40 } }}>
    <input type="text" />
  </Html>
</Layer>
```

### `<Portal>` — move nodes between Layers

```tsx
import { Portal } from 'react-konva-utils';

<Portal enabled={isDragging} container={topLayerRef.current}>
  <Rect ... />
</Portal>
```

## Minimal import (tree-shaking)

Reduce bundle by importing only needed shapes:

```ts
import { Stage, Layer } from 'react-konva/lib/ReactKonvaCore';
import 'konva/lib/shapes/Rect';
import 'konva/lib/shapes/Circle';
```

## Sources

- Konva React docs: https://konvajs.org/docs/react/ (retrieved 2026-04-22)
- react-konva GitHub: https://github.com/konvajs/react-konva (retrieved 2026-04-22)
- react-konva-utils: https://github.com/konvajs/react-konva-utils (retrieved 2026-04-22)
