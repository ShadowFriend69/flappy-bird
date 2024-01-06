

import Phaser from 'phaser';


const config = {
    // WebGl (Web graphics library) JS Api for rendering 2D and 3D graphics
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        // Arcade physics plugin
        default: 'arcade'
    },
    scene: {
        preload,
        create,
    }
}

// Loading assets (images, music, animations ...)
function preload() {
    // 'this' context - scene
    debugger
}

function  create() {
    debugger
}

new Phaser.Game(config);

