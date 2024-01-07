

import Phaser from 'phaser';
import {validate} from "@babel/core/lib/config/validation/options";


const config = {
    // WebGl (Web graphics library) JS Api for rendering 2D and 3D graphics
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        // Arcade physics plugin
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 300},
        },
    },
    scene: {
        preload,
        create,
        update,
    }
}


let bird = null;
const flapVelocity = 200;
const initialBirdPosition = {
    x: config.width * 0.1,
    y: config.height / 2,
}


// Loading assets (images, music, animations ...)
function preload() {
    // 'this' context - scene
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
}

function  create() {
    // x, y, key of the image
    this.add.image(0, 0, 'sky').setOrigin(0);
    bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);

    this.input.on('pointerdown', flap)
    this.input.keyboard.on('keydown_SPACE', flap)
}

function update(time, delta) {
    if (bird.y > config.height - bird.height || bird.y < 0) {
        restartBirdPosition();
    }
}

function restartBirdPosition() {
    bird.x = initialBirdPosition.x;
    bird.y = initialBirdPosition.y;
    bird.body.velocity.y = 0;
}

function flap() {
    bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);
