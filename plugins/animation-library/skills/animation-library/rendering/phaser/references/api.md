# Phaser — API Reference

Primary docs: https://docs.phaser.io

## Game configuration

```js
const game = new Phaser.Game({
  type: Phaser.AUTO,       // AUTO → WebGL, fallback Canvas
  width: 800,
  height: 600,
  backgroundColor: '#1a1a2e',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 300 }, debug: false }
  },
  scene: [PreloadScene, GameScene, UIScene]
});
```

`Phaser.AUTO` tries WebGL first (the RenderNode renderer in v4), falls back to Canvas.

## Scene lifecycle

```js
class GameScene extends Phaser.Scene {
  constructor() { super({ key: 'GameScene' }); }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 48, frameHeight: 48
    });
  }

  create() {
    this.add.image(400, 300, 'sky');

    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // v4: set tint mode explicitly (setTintFill removed)
    this.player.setTint(0xff6600);
    this.player.setTintMode(Phaser.TintModes.FILL);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }
  }
}
```

## Key namespaces

| Namespace | Description |
|---|---|
| `this.add` | GameObjects factory: `image`, `sprite`, `text`, `graphics`, `tilemapLayer`, etc. |
| `this.load` | Asset loader: `image`, `spritesheet`, `atlas`, `tilemapTiledJSON`, `audio`, `atlasPCT` (v4 compact format) |
| `this.physics` | Physics world: `add.sprite`, `add.staticImage`, `add.group`, `add.collider`, `add.overlap` |
| `this.input` | Input manager: `keyboard.createCursorKeys()`, `on('pointerdown', fn)`, `gamepad` |
| `this.cameras` | Camera manager: `main.startFollow(target)`, `main.setZoom(n)`, `add(x,y,w,h)` |
| `this.tweens` | Tween system: `add({ targets, x, duration, ease })` |
| `this.time` | Timer: `addEvent({ delay, callback, loop })` |
| `this.scene` | Scene manager: `start('key')`, `pause()`, `resume()`, `launch('key')` |
| `this.events` | Scene event emitter |
| `this.sound` | Audio: `add('key')`, `play('key')` |

## Arcade Physics quick reference

```js
// Add physics body
const enemy = this.physics.add.sprite(x, y, 'enemy');
enemy.setVelocity(100, 0);
enemy.setGravityY(-300);          // override world gravity locally
enemy.setBounce(0.5);
enemy.setCollideWorldBounds(true);

// Collider (blocks movement)
this.physics.add.collider(this.player, this.platforms);

// Overlap (no physics response, fires callback)
this.physics.add.overlap(this.player, this.coins, collectCoin, null, this);
```

## Filters (v4)

```js
// Attach a glow filter to a sprite
const glow = this.player.filters.external.addGlow({
  color: 0x00ffcc,
  outerStrength: 4,
  innerStrength: 0
});

// Attach to camera for full-scene effect
this.cameras.main.filters.internal.addBlur({ strength: 4 });
```

## SpriteGPULayer (v4 — high-performance)

```js
const layer = this.add.spriteGPULayer(10000, 'enemy-texture');
for (let i = 0; i < 10000; i++) {
  layer.addSprite(Math.random() * 800, Math.random() * 600);
}
// All 10K sprites render in one draw call
```

## Atlas PCT (v4 compact format)

```js
// Load — 90-95% smaller than JSON atlas
this.load.atlasPCT('sprites', 'assets/sprites.pct');

// Use identically to a JSON atlas
this.add.image(0, 0, 'sprites', 'frame-name');
```

## v3 → v4 migration quick reference

| v3 | v4 |
|---|---|
| `sprite.setTintFill(c)` | `sprite.setTint(c).setTintMode(Phaser.TintModes.FILL)` |
| `sprite.setPipeline('Light2D')` | `sprite.setLighting(true)` |
| `new BitmapMask(scene, src)` + `obj.setMask(m)` | `obj.filters.internal.addMask(maskObject)` |
| `colorMatrix.sepia()` | `colorMatrix.colorMatrix.sepia()` |
| `Geom.Point.*` | `Vector2.*` (drop-in; full table in migration guide) |
| Custom pipeline registered via `renderer.addPipeline` | `RenderNode` registered via `RenderConfig#renderNodes` |
| `DynamicTexture` / `RenderTexture` auto-render | Explicit `.render()` call required |
