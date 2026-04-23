// Konva minimal example — Stage + Layer + draggable Rect with hover
// Requires: <div id="container"></div> and konva loaded (npm install konva)
// Docs: https://konvajs.org/docs/overview.html

import Konva from 'konva';

// 1. Stage — root container bound to a DOM element
const stage = new Konva.Stage({ container: 'container', width: 600, height: 400 });

// 2. Layer — a canvas surface inside the Stage
const layer = new Konva.Layer();
stage.add(layer);

// 3. Shape — draggable Rect; hover changes fill
const rect = new Konva.Rect({
  x: 80, y: 80, width: 160, height: 100,
  fill: '#4f8ef7', cornerRadius: 8,
  draggable: true,
  shadowColor: 'black', shadowBlur: 10, shadowOpacity: 0.3,
});

// 4. Events — no manual redraw needed when autoDrawEnabled (default: true)
rect.on('mouseover', () => {
  rect.fill('#e05c5c');
  document.body.style.cursor = 'pointer';
});
rect.on('mouseout', () => {
  rect.fill('#4f8ef7');
  document.body.style.cursor = 'default';
});
rect.on('dragstart', () => rect.shadowOpacity(0.6));
rect.on('dragend',   () => rect.shadowOpacity(0.3));

layer.add(rect);
layer.draw();
