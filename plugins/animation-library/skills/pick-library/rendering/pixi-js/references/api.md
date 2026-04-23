# PixiJS v8 — API Reference

All imports come from the single `pixi.js` package. Sub-package imports (e.g. `@pixi/sprite`) are a v7 pattern — avoid in v8.

```ts
import {
  Application, Assets, Container, Sprite, Graphics,
  Text, BitmapText, TilingSprite, ParticleContainer,
  Ticker, RenderLayer,
} from 'pixi.js';
```

---

## Application

```ts
const app = new Application();

// v8 breaking change: init() is async (WebGPU needs an async handshake)
await app.init({
  background: '#1099bb',   // canvas background colour
  resizeTo: window,        // auto-resize canvas to element
  width: 800,              // explicit width (ignored if resizeTo set)
  height: 600,
  antialias: true,
  preference: 'webgpu',    // 'webgpu' | 'webgl' — falls back automatically
  // Texture GC tunables:
  textureGCActive: true,
  textureGCMaxIdle: 3600,  // frames before GC (default: ~1 min at 60 fps)
});

document.body.appendChild(app.canvas);

// Access subsystems:
app.stage    // root Container
app.ticker   // main Ticker
app.renderer // WebGPURenderer | WebGLRenderer
app.screen   // { width, height } in CSS pixels
```

---

## Assets

```ts
// Single asset
const texture = await Assets.load('bunny.png');

// Multiple assets — returns Record<url, result>
const textures = await Assets.load(['hero.png', 'bg.png']);

// Bundle manifest
await Assets.init({ manifest: 'assets/manifest.json' });
await Assets.loadBundle('game-screen');

// Get already-loaded asset
const tex = Assets.get('bunny.png');

// Background (non-blocking) load
Assets.backgroundLoad(['level2.png', 'level2-audio.mp3']);
```

---

## Sprite

```ts
const texture = await Assets.load('bunny.png');

// From pre-loaded texture
const sprite = new Sprite(texture);

// Shorthand (loads if not cached)
const sprite2 = Sprite.from('bunny.png');

sprite.anchor.set(0.5);        // centre pivot; 0–1 in each axis
sprite.position.set(400, 300);
sprite.scale.set(2);
sprite.rotation = Math.PI / 4; // radians
sprite.alpha = 0.8;
sprite.tint = 0xff0000;        // multiply tint
sprite.zIndex = 10;

app.stage.addChild(sprite);
```

---

## Graphics (v8 API — shape first, style second)

```ts
const g = new Graphics();

// Shape, then fill/stroke — do NOT use v7 beginFill/endFill
g.rect(0, 0, 100, 50);
g.fill({ color: 0xff0000, alpha: 0.8 });
g.stroke({ color: 0x000000, width: 2 });

g.circle(200, 200, 40);
g.fill('blue');

g.roundRect(10, 10, 120, 80, 12);
g.fill(0x00ff00);
g.stroke({ color: 'white', width: 3, alignment: 0 }); // alignment: 0=inner, 0.5=centre, 1=outer

g.moveTo(0, 0).lineTo(100, 100).stroke({ color: 'red', width: 2 });

app.stage.addChild(g);
```

---

## Container

```ts
const group = new Container();
group.position.set(100, 100);
group.addChild(sprite, g);
app.stage.addChild(group);

// GPU-optimised sub-scene for static content:
const staticGroup = new Container({ isRenderGroup: true });
```

---

## ParticleContainer

```ts
// Fastest way to render many sprites sharing one texture
const particles = new ParticleContainer({
  dynamicProperties: {
    position: true,
    rotation: true,
    alpha: false, // disabling unused props speeds up batching
  },
});

for (let i = 0; i < 10_000; i++) {
  const p = new Sprite(texture);
  p.position.set(Math.random() * 800, Math.random() * 600);
  particles.addChild(p);
}

app.stage.addChild(particles);
```

---

## Ticker

```ts
// Delta-time scaled — always multiply for frame-rate independence
app.ticker.add((ticker) => {
  sprite.rotation += 0.01 * ticker.deltaTime;
  // ticker.elapsedMS — unscaled ms since last frame
  // ticker.deltaTime — frame delta scaled by app's speed
  // ticker.FPS — current frame rate
});

// One-shot
app.ticker.addOnce(() => console.log('first frame'));

// Custom ticker (e.g. for background work)
const myTicker = new Ticker();
myTicker.add(() => { /* ... */ });
myTicker.start();
```

---

## RenderLayer

```ts
const uiLayer = new RenderLayer();
app.stage.addChild(uiLayer);  // position in scene graph sets draw order

// Attach object to layer; it renders at layer's position regardless of logical parent
uiLayer.attach(healthBar);

// Detach
uiLayer.detach(healthBar);
// Note: removing object from logical parent auto-detaches it from layers
```

---

## Text

```ts
// Dynamic text (rasterises to canvas → texture each change; avoid per-frame updates)
const label = new Text({
  text: 'Hello',
  style: { fontSize: 24, fill: '#ffffff', fontFamily: 'Arial' },
});

// BitmapText — GPU-rendered, cheap to update per-frame
const score = new BitmapText({ text: '0', style: { fontFamily: 'Arial', fontSize: 32 } });
```

---

## Event interaction

```ts
sprite.eventMode = 'static';  // enables pointer events; 'dynamic' for moving objects
sprite.cursor = 'pointer';

sprite.on('pointerdown', (e) => console.log('clicked', e.global));
sprite.on('pointerover', () => sprite.tint = 0xcccccc);
sprite.on('pointerout', () => sprite.tint = 0xffffff);

// Manual hit area (avoids expensive texture alpha-hit test)
import { Rectangle } from 'pixi.js';
sprite.hitArea = new Rectangle(0, 0, 64, 64);
```

---

## Resource cleanup

```ts
// Always destroy objects you no longer need
sprite.destroy();
texture.unload();  // unload from GPU without destroying JS reference

// Texture GC handles idle textures automatically; configure via app.init() options
```
