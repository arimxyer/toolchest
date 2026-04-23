// Phaser v4 — minimal Scene example (~35 lines)
// Demonstrates: config, Scene subclassing, preload/create/update,
// Arcade Physics, v4-specific tint API (setTintFill removed in v4)

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('sky',    'assets/sky.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('player', 'assets/player.png');
  }

  create() {
    this.add.image(400, 300, 'sky');

    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').refreshBody();

    this.player = this.physics.add.image(100, 300, 'player');
    this.player.setBounce(0.3);
    this.player.setCollideWorldBounds(true);

    // v4: setTintFill() is removed; use setTintMode(Phaser.TintModes.FILL)
    this.player.setTint(0x88ccff);
    this.player.setTintMode(Phaser.TintModes.FILL);

    this.physics.add.collider(this.player, platforms);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const onGround = this.player.body.blocked.down;
    this.player.setVelocityX(this.cursors.left.isDown ? -200 : this.cursors.right.isDown ? 200 : 0);
    if (this.cursors.up.isDown && onGround) this.player.setVelocityY(-400);
  }
}

new Phaser.Game({
  type:   Phaser.AUTO,
  width:  800,
  height: 600,
  physics: { default: 'arcade', arcade: { gravity: { y: 400 } } },
  scene:  [GameScene]
});
