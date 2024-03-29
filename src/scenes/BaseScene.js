

import Phaser from "phaser";


class BaseScene extends Phaser.Scene {

    constructor(key, config) {
        super(key);
        this.config = config;
        this.screenCenter = [
            config.width / 2,
            config.height / 2,
        ];
        this.fontSize = '32px';
        this.fontFill = '#fff';
        this.fontOptions = {
            fontSize: this.fontSize,
            fill: this.fontFill,
        };
        this.linehight = 42;
    }

    create() {
        this.createBG();

        if (this.config.canGoBack) {
            const backButton = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
                .setScale(2)
                .setOrigin(1)
                .setInteractive();

            backButton.on('pointerup', () => {
                this.scene.start('MenuScene');
            })
        }
    }

    createBG() {
        this.add.image(0, 0, 'sky').setOrigin(0);
    }

    createMenu(menu, setupMenuEvents) {
        let lastMenuPositionY = 0;

        menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
            menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions)
                .setOrigin(0.5, 1);
            lastMenuPositionY += this.linehight;
            setupMenuEvents(menuItem);
        })

    }

}

export default BaseScene;