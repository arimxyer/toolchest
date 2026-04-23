// Fabric.js v7 — minimal interactive canvas
// v7 API: named ESM imports only (no legacy `fabric.Canvas` global namespace)
import { Canvas, Rect, Textbox } from 'fabric';

// 1. Interactive canvas — selection + transform handles enabled by default
const canvas = new Canvas('c', {
  width: 600,
  height: 400,
  backgroundColor: '#fafafa',
});

// 2. Rectangle — corner + rotation handles appear on click automatically
const rect = new Rect({
  left: 60, top: 80,
  width: 200, height: 120,
  fill: '#4CAF50', stroke: '#2E7D32', strokeWidth: 2,
  rx: 6, ry: 6,
});

// 3. Editable, auto-wrapping text — double-click activates inline cursor
const label = new Textbox('Double-click to edit.\nDrag handles to resize.', {
  left: 310, top: 80, width: 230,
  fontSize: 16, fontFamily: 'sans-serif',
  fill: '#212121', lineHeight: 1.4,
});

canvas.add(rect, label);
canvas.renderAll();

// 4. Every modification fires here — hook for undo/redo or persistence
canvas.on('object:modified', ({ target }) => {
  console.log('modified:', target.type, canvas.toJSON());
});
