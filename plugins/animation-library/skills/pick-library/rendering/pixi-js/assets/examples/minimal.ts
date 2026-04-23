import { Application, Assets, Sprite } from 'pixi.js';

// Wrap in async IIFE — required for Vite production builds (top-level await issue <=6.0.6)
(async () => {
  // v8: Application.init() is async because WebGPU adapter resolution is async
  const app = new Application();

  await app.init({
    background: '#1099bb',
    resizeTo: window,
    // Prefers WebGPU; falls back to WebGL, then Canvas
    preference: 'webgpu',
  });

  document.body.appendChild(app.canvas);

  // Load texture via the Assets system
  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

  // Create a sprite from the loaded texture
  const bunny = new Sprite(texture);

  // Anchor at centre so rotation pivots around the sprite's middle
  bunny.anchor.set(0.5);

  // Position at canvas centre
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  app.stage.addChild(bunny);

  // Per-frame update — multiply by deltaTime for frame-rate independence
  app.ticker.add((ticker) => {
    bunny.rotation += 0.05 * ticker.deltaTime;
  });
})();
