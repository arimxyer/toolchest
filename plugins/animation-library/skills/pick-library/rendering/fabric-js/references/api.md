# Fabric.js — API Reference

All examples use the **v7 named-import ESM API** (`import { Canvas, Rect } from 'fabric'`). Do not use the legacy `fabric.Canvas` global-namespace style from v4 and earlier.

## Canvas instantiation

```javascript
import { Canvas } from 'fabric';

const canvas = new Canvas('myCanvas', {
  width: 800,
  height: 600,
  backgroundColor: '#f5f5f5',
  selection: true,                       // multi-select via drag
  selectionColor: 'rgba(100,100,255,0.2)',
  selectionBorderColor: '#2196F3',
  selectionLineWidth: 1,
});
```

**StaticCanvas** — render-only, no interactivity:

```javascript
import { StaticCanvas } from 'fabric';
const canvas = new StaticCanvas('myCanvas', { width: 800, height: 600 });
```

## Adding shapes

```javascript
import { Canvas, Rect, Circle, Ellipse, Triangle, Line, Polygon, Path } from 'fabric';

const rect = new Rect({
  left: 50, top: 50, width: 200, height: 120,
  fill: '#4CAF50', stroke: '#333', strokeWidth: 2,
  rx: 8, ry: 8,                           // rounded corners
  selectable: true, hasControls: true,
});
canvas.add(rect);
canvas.renderAll();
```

## Text and inline editing

```javascript
import { Text, IText, Textbox } from 'fabric';

// Static styled text
const label = new Text('Hello', { left: 100, top: 100, fontSize: 32, fontFamily: 'Georgia', fill: '#222' });

// Click-to-edit single-style text
const editable = new IText('Double-click me', { left: 100, top: 150, fontSize: 20 });

// Auto-wrapping editable text with per-character styling
const box = new Textbox('Long copy that wraps inside its bounding box.', {
  left: 100, top: 200, width: 300, fontSize: 16, lineHeight: 1.4,
});

canvas.add(label, editable, box);
```

## Images and filters

```javascript
import { FabricImage } from 'fabric';
import { Brightness, Contrast, Blur } from 'fabric/filters';

const img = await FabricImage.fromURL('photo.jpg');
img.set({ left: 50, top: 50, scaleX: 0.5, scaleY: 0.5 });
img.filters.push(new Brightness({ brightness: 0.1 }), new Blur({ blur: 0.05 }));
img.applyFilters();
canvas.add(img);
canvas.renderAll();
```

## SVG import / export

```javascript
import { Canvas, loadSVGFromURL, loadSVGFromString } from 'fabric';

// Import from URL
const { objects } = await loadSVGFromURL('icon.svg');
objects.forEach(obj => obj && canvas.add(obj));
canvas.renderAll();

// Export canvas to SVG string
const svgString = canvas.toSVG();
```

## Selection controls customisation

```javascript
import { Control, controlsUtils } from 'fabric';

// Hide middle-edge handles, keep corners + rotation
rect.setControlsVisibility({ mt: false, mb: false, ml: false, mr: false });

// Custom delete control
rect.controls.deleteBtn = new Control({
  x: 0.5, y: -0.5, offsetY: -16,
  cursorStyle: 'pointer',
  mouseUpHandler: (_e, transform) => {
    transform.target.canvas?.remove(transform.target);
    return true;
  },
  render: (ctx, left, top) => {
    ctx.save();
    ctx.translate(left, top);
    ctx.fillStyle = '#e53935';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },
});
```

## Event system

```javascript
// Canvas-level events
canvas.on('selection:created', ({ selected }) => console.log('selected:', selected));
canvas.on('selection:cleared', () => console.log('deselected'));
canvas.on('object:modified', ({ target }) => saveState(target));
canvas.on('mouse:down', (e) => console.log('click at', e.viewportPoint));

// Object-level events
rect.on('moving', () => console.log('rect moving'));

// One-shot listener
canvas.once('object:added', ({ target }) => console.log('first add:', target));
```

## Serialisation / persistence

```javascript
// Snapshot full scene
const json = canvas.toJSON(['id', 'name']); // include custom properties

// Restore scene
await canvas.loadFromJSON(json);
canvas.renderAll();
```

## Grouping

```javascript
import { Group } from 'fabric';

const group = new Group([rect, label], { left: 200, top: 200 });
canvas.add(group);
// group transforms apply to all children
group.set({ angle: 15, scaleX: 1.2 });
canvas.renderAll();
```

## Animation (built-in tween)

```javascript
rect.animate('left', 400, {
  duration: 1000,
  easing: fabric.util.ease.easeInOutQuad,
  onChange: () => canvas.renderAll(),
});
```

## Cleanup

```javascript
canvas.dispose(); // removes event listeners, frees canvas element
```

## Common pitfalls

- Always call `canvas.renderAll()` after mutations; Fabric does not auto-render on property changes.
- `loadFromJSON` is async in v6+; await it before `renderAll()`.
- The v7 ESM build tree-shakes filters — import them explicitly from `'fabric/filters'` rather than from `'fabric'`.
- `StaticCanvas` does not emit interaction events; use `Canvas` for any interactive scenario.
