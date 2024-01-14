

import BaseScene from "./BaseScene";


class ScoreScene extends BaseScene {

    constructor(config) {
        super('ScoreScene', {...config, canGoBack: true});

    }

    create() {
        super.create();
        this.createScore();
    }

    createScore() {
        this.score = 0;
        const bestScore = localStorage.getItem('bestScore')
        this.bestScoreText = this.add.text(...this.screenCenter, `Best score: ${bestScore || 0}`, this.fontOptions).
        setOrigin(0.5, 1);
    }
}

export default ScoreScene;