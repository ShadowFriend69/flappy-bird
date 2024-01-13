

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
        this.fontFill = '#CD00FF';
        this.fontOptions = {
            fontSize: this.fontSize,
            fill: this.fontFill,
        };
        this.linehight = 42;
    }

    create() {
        this.createBG();
    }

    createBG() {
        this.add.image(0, 0, 'sky').setOrigin(0);
    }

    createMenu(menu) {
        let lastMenuPositionY = 0;

        menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
            this.add.text(...menuPosition, menuItem.text, this.fontOptions)
                .setOrigin(0.5, 1);
            lastMenuPositionY += this.linehight;
        })

    }

}

export default BaseScene;