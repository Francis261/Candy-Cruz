import { GAME_WIDTH, GAME_HEIGHT, STORAGE_KEYS } from '../utils/GameConfig.js';
import { AudioManager } from '../utils/AudioManager.js';

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        this.scaleFactor = Math.min(this.scale.width / GAME_WIDTH, this.scale.height / GAME_HEIGHT);
        this.audioManager = new AudioManager(this);
        this.drawBackground();
        this.createTitle();
        this.createButtons();
    }

    drawBackground() {
        this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(this.scaleFactor);
    }

    createTitle() {
        this.add.text(GAME_WIDTH / 2, 120 * this.scaleFactor, 'Candy Cruz', {
            fontSize: `${56 * this.scaleFactor}px`,
            fontFamily: 'Arial Black',
            color: '#f1c40f',
            bold: true,
            stroke: '#e67e22',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(GAME_WIDTH / 2, 180 * this.scaleFactor, 'Match 3 Puzzle', {
            fontSize: `${24 * this.scaleFactor}px`,
            fontFamily: 'Arial',
            color: '#3498db'
        }).setOrigin(0.5);
    }

    createButtons() {
        const centerX = GAME_WIDTH / 2;
        const startY = 280 * this.scaleFactor;
        const spacing = 70 * this.scaleFactor;

        this.createButton(centerX, startY, 'PLAY', 'btn_play', () => {
            this.audioManager.play('click');
            this.scene.start('LevelSelect');
        });

        this.createButton(centerX, startY + spacing, 'HOW TO PLAY', 'btn_small', () => {
            this.audioManager.play('click');
            this.showHelp();
        });
    }

    createButton(x, y, text, texture, callback) {
        const btn = this.add.image(x, y, texture).setScale(this.scaleFactor).setInteractive({ useHandCursor: true });
        const label = this.add.text(x, y, text, {
            fontSize: `${20 * this.scaleFactor}px`,
            fontFamily: 'Arial',
            color: '#ffffff',
            bold: true
        }).setOrigin(0.5);

        btn.on('pointerover', () => btn.setScale(1.05 * this.scaleFactor));
        btn.on('pointerout', () => btn.setScale(this.scaleFactor));
        btn.on('pointerdown', callback);
    }

    showHelp() {
        const overlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.8);
        
        const helpText = [
            'Match 3 or more candies',
            'of the same color',
            'in a row or column!',
            '',
            'Special Candies:',
            '- Horizontal: Clears row',
            '- Vertical: Clears column',
            '- Color Bomb: Clears color',
            '',
            'Complete objectives',
            'within moves to win!'
        ];

        const startY = GAME_HEIGHT / 2 - 80 * this.scaleFactor;
        helpText.forEach((line, i) => {
            this.add.text(GAME_WIDTH / 2, startY + i * 22 * this.scaleFactor, line, {
                fontSize: `${14 * this.scaleFactor}px`,
                fontFamily: 'Arial',
                color: '#ecf0f1'
            }).setOrigin(0.5);
        });

        const closeBtn = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 130 * this.scaleFactor, 'btn_small').setScale(this.scaleFactor).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 130 * this.scaleFactor, 'CLOSE', {
            fontSize: `${16 * this.scaleFactor}px`,
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        closeBtn.on('pointerdown', () => {
            overlay.destroy();
            closeBtn.destroy();
        });
    }
}