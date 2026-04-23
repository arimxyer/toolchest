# Konva — API Reference

Source: https://konvajs.org/api/Konva.html (retrieved 2026-04-22)

## Top-level namespace: `Konva`

Static settings:

| Property | Default | Purpose |
|---|---|---|
| `Konva.autoDrawEnabled` | `true` | Auto-redraw on attribute change |
| `Konva.dragDistance` | `3` | Pixels pointer must move before drag fires |
| `Konva.dragButtons` | `[0, 1]` | Mouse buttons that trigger drag |
| `Konva.angleDeg` | `true` | `false` → radians everywhere |
| `Konva.pixelRatio` | device | Override DPR for rendering |
| `Konva.showWarnings` | `true` | Console warnings for misuse |

Static methods: `Konva.isDragging()`, `Konva.isDragReady()`

## Stage

Root container. Creates and owns the DOM `<div>` wrapper and its child canvases.

```js
const stage = new Konva.Stage({
  container: 'container', // DOM element ID or element ref
  width: 800,
  height: 600,
});
```

Key methods: `stage.add(layer)`, `stage.toDataURL({ mimeType, quality })`, `stage.toJSON()`, `stage.find(selector)`, `stage.findOne(selector)`, `stage.destroy()`.

## Layer

A canvas element managed by the Stage. Multiple layers enable selective invalidation.

```js
const layer = new Konva.Layer();
stage.add(layer);
layer.draw(); // force redraw
layer.batchDraw(); // debounced redraw (preferred in animations)
```

## Shapes — common constructor options

All shapes share a base set of properties:

| Property | Type | Notes |
|---|---|---|
| `x`, `y` | number | Position (top-left or center depending on shape) |
| `width`, `height` | number | Dimensions |
| `fill` | string / gradient | Fill color |
| `stroke` | string | Stroke color |
| `strokeWidth` | number | Stroke thickness |
| `opacity` | 0–1 | |
| `rotation` | degrees | Rotates around `offsetX`/`offsetY` |
| `scaleX`, `scaleY` | number | |
| `draggable` | boolean | Enables drag without extra code |
| `visible` | boolean | |
| `listening` | boolean | `false` → shape ignored by hit graph |
| `shadowColor`, `shadowBlur`, `shadowOffsetX/Y` | | Drop shadow |
| `dash` | number[] | Dashed stroke pattern |
| `lineCap`, `lineJoin` | string | |
| `globalCompositeOperation` | string | Blend modes |

### Shape classes

`Rect`, `Circle`, `Ellipse`, `Line` (also Polygon/Spline via `tension`), `Arrow`, `Path` (SVG `d` string), `Text`, `TextPath`, `Image`, `Sprite`, `Ring`, `Arc`, `Wedge`, `RegularPolygon`, `Star`, `Label`, `Tag`

Custom shapes:

```js
const custom = new Konva.Shape({
  sceneFunc(ctx, shape) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(100, 50);
    ctx.closePath();
    ctx.fillStrokeShape(shape); // applies fill/stroke from props
  },
});
```

## Events

All nodes implement `on()`, `off()`, `fire()`:

```js
rect.on('click', (e) => console.log(e.target));
rect.on('mouseover', () => rect.fill('red'));
rect.on('dragstart dragmove dragend', handler);
// Attribute change events:
rect.on('xChange', (e) => console.log(e.oldVal, e.newVal));
```

Supported event namespaces: `shape.on('click.myns', fn)` / `shape.off('.myns')`.

## Transformer

Resize/rotate handles for one or more nodes:

```js
const tr = new Konva.Transformer({ nodes: [rect] });
layer.add(tr);
```

Options: `rotateEnabled`, `resizeEnabled`, `keepRatio`, `enabledAnchors` (array of anchor names), `boundBoxFunc` for constrained transforms.

## Animation

Frame loop:

```js
const anim = new Konva.Animation((frame) => {
  rect.x(rect.x() + frame.timeDiff * 0.1);
}, layer);
anim.start();
anim.stop();
```

Property tween:

```js
const tween = new Konva.Tween({
  node: rect,
  x: 400,
  duration: 1,
  easing: Konva.Easings.EaseInOut,
  onFinish: () => console.log('done'),
});
tween.play();
```

## Filters

Applied to cached shapes only:

```js
rect.cache();
rect.filters([Konva.Filters.Blur]);
rect.blurRadius(10);
layer.batchDraw();
```

Available: `Blur`, `Brighten`, `Contrast`, `Emboss`, `Enhance`, `Grayscale`, `HSL`, `Invert`, `Kaleidoscope`, `Mask`, `Noise`, `Pixelate`, `Posterize`, `RGBA`, `Sepia`, `Solarize`, `Threshold`.

## Serialization

```js
const json = stage.toJSON();
const stage2 = Konva.Node.create(json, 'container');
```

## Node hierarchy utilities

```js
node.getParent()       // direct parent
node.getLayer()        // containing layer
node.getStage()        // root stage
node.moveToTop()       // z-order
node.moveToBottom()
node.zIndex(n)
node.destroy()         // remove and clean up listeners
node.clone()           // deep copy
node.toDataURL()       // rasterize node to PNG/JPEG data URL
```
