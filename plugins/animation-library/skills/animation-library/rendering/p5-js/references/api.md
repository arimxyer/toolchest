# p5.js — API Reference

## Lifecycle functions

```js
// v1.x — synchronous preload
function preload() {
  img = loadImage('photo.jpg'); // blocks draw() until complete
}

// v2.x — async setup (preferred)
async function setup() {
  createCanvas(400, 400);
  img = await loadImage('photo.jpg');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // called ~60x/s; return is ignored
}
```

| Function | When called | Notes |
|---|---|---|
| `preload()` | Before setup, blocking | v1.x only |
| `setup()` | Once | `async` in v2.x; create canvas here |
| `draw()` | Every frame (RAF) | Immediate-mode: you redraw everything |

Loop control: `noLoop()` / `loop()` / `redraw()` / `isLooping()`.

---

## `createCanvas()`

```js
createCanvas(width, height)                    // P2D (Canvas 2D)
createCanvas(width, height, WEBGL)             // WebGL
createCanvas(width, height, P2DHDR)            // HDR Canvas (v2)
await createCanvas(width, height, WEBGPU)      // WebGPU (v2, async)
```

Returns a `p5.Renderer`. Canvas is inserted into the body by default; pass a parent element as the 4th argument to control placement.

---

## Key globals (global mode)

| Name | Type | Description |
|---|---|---|
| `width`, `height` | number | Canvas dimensions |
| `mouseX`, `mouseY` | number | Current pointer position |
| `pmouseX`, `pmouseY` | number | Previous frame pointer position |
| `mouseIsPressed` | boolean | Pointer currently down |
| `frameCount` | number | Total frames drawn |
| `deltaTime` | number | ms since last frame |
| `key`, `keyCode` | string / number | Most recent key event |
| `touches` | array | Active touch/pointer points |
| `PI`, `TWO_PI`, `HALF_PI`, `TAU` | number | Math constants |
| `P2D`, `WEBGL`, `WEBGPU`, `P2DHDR` | constant | Renderer flags |

---

## Drawing primitives (2D)

```js
background(r, g, b)           // clear canvas
fill(r, g, b)                 // set fill color
stroke(r, g, b)               // set stroke color
noFill()
noStroke()

rect(x, y, w, h)
ellipse(x, y, w, h)
line(x1, y1, x2, y2)
point(x, y)
triangle(x1,y1, x2,y2, x3,y3)
quad(...)
arc(x, y, w, h, start, stop)
text('hello', x, y)
image(img, x, y)
```

All drawing functions are stateful — `fill()` / `stroke()` persist until changed. Use `push()` / `pop()` to save and restore graphics state.

---

## Math and noise

```js
random(low, high)             // uniform random
randomGaussian(mean, sd)      // Gaussian
noise(x, y, z)                // Perlin noise
map(val, lo1, hi1, lo2, hi2)  // linear remap
lerp(start, stop, t)
constrain(n, low, high)
dist(x1, y1, x2, y2)
```

---

## Instance mode

Avoids global namespace pollution; required in module environments and multi-sketch pages.

```js
import p5 from 'p5';

const sketch = (p) => {
  let x = 200;

  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(30);
    p.fill(255);
    p.ellipse(x, p.height / 2, 50, 50);
    x = (x + 1) % p.width;
  };
};

const myp5 = new p5(sketch, document.getElementById('canvas-container'));
```

All p5 functions and constants are prefixed with `p.` — no bare globals.

---

## v2.x — shaders in JS (`p5.strands`)

```js
// Declare a custom stroke shader in JavaScript (no GLSL)
const myStroke = p5.buildStrokeShader({
  getColor({ position, color }) {
    return color;
  },
});

function setup() {
  createCanvas(400, 400, WEBGL);
  strokeShader(myStroke);
}
```

---

## Event callbacks

```js
// v1.x — separate handlers
function mousePressed() { ... }
function touchStarted() { ... }

// v2.x — unified pointer events
function pointerPressed(event) { ... }
function pointerMoved(event) { ... }
function pointerReleased(event) { ... }
```

---

## Useful patterns

```js
// Frame-rate-independent motion
function draw() {
  x += speed * (deltaTime / 16.67); // normalise to 60fps baseline
}

// Save canvas as PNG
function keyPressed() {
  if (key === 's') saveCanvas('sketch', 'png');
}
```
