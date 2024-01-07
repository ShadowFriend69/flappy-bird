

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
        },
    },
    scene: {
        preload,
        create,
        update,
    }
}


const PIPES_TO_RENDER =4;


let bird = null;
let pipes = null;

let pipeHorizontalDistance = 0;

const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [450, 500];

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
    this.load.image('pipe', 'assets/pipe.png');

}

function  create() {
    // x, y, key of the image
    this.add.image(0, 0, 'sky').setOrigin(0);
    bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
    bird.body.gravity.y = 300;

    pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
        const upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 1);
        const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 0);

        placePipe(upperPipe, lowerPipe);
    }

    pipes.setVelocityX(-200);


    this.input.on('pointerdown', flap)
    this.input.keyboard.on('keydown_SPACE', flap)
}

function update(time, delta) {
    if (bird.y > config.height - bird.height || bird.y < 0) {
        restartBirdPosition();
    }

    recyclePipes();
}

function  placePipe(uPipe, lPipe) {
    const rightMostX = getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
    const pipeVerticalPosition = Phaser.Math.Between(20, config.height - 20 - pipeVerticalDistance);
    const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);

    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;

}

function recyclePipes() {
    const tempPipes = [];
    pipes.getChildren().forEach(pipe => {
        if (pipe.getBounds().right <= 0) {
            tempPipes.push(pipe);
            if (tempPipes.length === 2) {
                placePipe(...tempPipes);
            }
        }
    });
}


function getRightMostPipe() {
    let rightmostX = 0;

    pipes.getChildren().forEach(function (pipe) {
        rightmostX = Math.max(pipe.x, rightmostX);
    })
    return rightmostX
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
