import { useEffect } from 'react';
import Phaser from 'phaser/dist/phaser-arcade-physics.js';

export default function FooterGame() {
  useEffect(() => {
    class FooterScene extends Phaser.Scene {
      player!: Phaser.Physics.Arcade.Sprite;
      cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

      constructor() {
        super({ key: 'FooterScene' });
      }

      preload() {
        this.load.image('ground', '/ground.png');
        this.load.image('player', '/player.png');
      }

      create() {
        // Ground
        this.add.image(300, 60, 'ground');

        // Player
        this.player = this.physics.add.sprite(50, 50, 'player');
        this.player.setCollideWorldBounds(true);

        // Cursors
        this.cursors = this.input.keyboard.createCursorKeys();
      }

      update() {
        if (!this.cursors || !this.player) return;

        if (this.cursors.left?.isDown) {
          this.player.setVelocityX(-160);
        } else if (this.cursors.right?.isDown) {
          this.player.setVelocityX(160);
        } else {
          this.player.setVelocityX(0);
        }

        if (this.cursors.up?.isDown && this.player.body.touching.down) {
          this.player.setVelocityY(-330);
        }
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 600,
      height: 120,
      parent: 'phaser-footer',
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 300 } },
      },
      scene: FooterScene,
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-footer" className="w-full h-32 mx-auto" />;
}
