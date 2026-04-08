import { GAME_WIDTH, GAME_HEIGHT, STORAGE_KEYS } from '../utils/GameConfig.js';
import { AudioManager } from '../utils/AudioManager.js';

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        this.audioManager = new AudioManager(this);
        this.drawBackground();
        this.createTitle();
        this.createButtons();
        this.createParticles();
    }

    drawBackground() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        
        for (let i = 0; i < 7; i++) {
            const x = Math.random() * GAME_WIDTH;
            const y = Math.random() * GAME_HEIGHT;
            const candy = this.add.image(x, y, `candy_${['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'][i]}`);
            candy.setAlpha(0.2);
            candy.setScale(0.8);
        }
    }

    createTitle() {
        const titleShadow = this.add.text(GAME_WIDTH / 2 + 4, 120 + 4, 'Candy Cruz', {
            fontSize: '56px',
            fontFamily: 'Arial Black, Arial',
            color: '#1a1a2e',
            bold: true
        }).setOrigin(0.5);

        const title = this.add.text(GAME_WIDTH / 2, 120, 'Candy Cruz', {
            fontSize: '56px',
            fontFamily: 'Arial Black, Arial',
            color: '#f1c40f',
            bold: true,
            stroke: '#e67e22',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(GAME_WIDTH / 2, 180, 'Match 3 Puzzle', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#3498db'
        }).setOrigin(0.5);
    }

    createButtons() {
        const centerX = GAME_WIDTH / 2;
        const startY = 280;
        const spacing = 70;

        this.createButton(centerX, startY, 'PLAY', 'btn_play', () => {
            this.audioManager.play('click');
            this.scene.start('LevelSelect');
        });

        this.createButton(centerX, startY + spacing, 'OPTIONS', 'btn_small', () => {
            this.audioManager.play('click');
            this.showOptions();
        });

        this.createButton(centerX, startY + spacing * 2, 'HOW TO PLAY', 'btn_small', () => {
            this.audioManager.play('click');
            this.showHelp();
        });
    }

    createButton(x, y, text, texture, callback) {
        const btn = this.add.image(x, y, texture).setInteractive({ useHandCursor: true });
        const label = this.add.text(x, y, text, {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff',
            bold: true
        }).setOrigin(0.5);

        btn.on('pointerover', () => {
            btn.setScale(1.05);
            label.setScale(1.05);
        });

        btn.on('pointerout', () => {
            btn.setScale(1);
            label.setScale(1);
        });

        btn.on('pointerdown', callback);

        return { btn, label };
    }

    showOptions() {
        const overlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.7);
        const panel = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'panel');
        
        const title = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 150, 'Options', {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#f1c40f'
        }).setOrigin(0.5);

        const soundText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 80, 'Sound: ON', {
            fontSize: '22px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        const soundBtn = this.add.image(GAME_WIDTH / 2 + 100, GAME_HEIGHT / 2 - 80, 'btn_small').setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH / 2 + 100, GAME_HEIGHT / 2 - 80, 'TOGGLE', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        soundBtn.on('pointerdown', () => {
            const enabled = this.audioManager.toggle();
            soundText.setText(`Sound: ${enabled ? 'ON' : 'OFF'}`);
            this.audioManager.play('click');
        });

        const closeBtn = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 120, 'btn_small').setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 120, 'CLOSE', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        closeBtn.on('pointerdown', () => {
            overlay.destroy();
            panel.destroy();
            title.destroy();
            soundText.destroy();
            soundBtn.destroy();
            closeBtn.destroy();
        });
    }

    showHelp() {
        const overlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.7);
        const panel = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'panel');
        
        const title = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 150, 'How to Play', {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#f1c40f'
        }).setOrigin(0.5);

        const helpText = [
            'Match 3 or more candies',
            'of the same color in a row',
            'or column to score points!',
            '',
            'Special Candies:',
            '- Horizontal: Clears row',
            '- Vertical: Clears column',
            '- Color Bomb: Clears all',
            '  of one color',
            '',
            'Complete objectives within',
            'moves limit to win!'
        ];

        helpText.forEach((line, i) => {
            this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 80 + i * 22, line, {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#ecf0f1'
            }).setOrigin(0.5);
        });

        const closeBtn = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 130, 'btn_small').setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 130, 'CLOSE', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        closeBtn.on('pointerdown', () => {
            overlay.destroy();
            panel.destroy();
            title.destroy();
            closeBtn.destroy();
        });
    }

    createParticles() {
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * GAME_WIDTH;
            const y = GAME_HEIGHT + Math.random() * 100;
            const candy = this.add.image(x, y, `candy_${['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'][Math.floor(Math.random() * 7)]}`);
            candy.setAlpha(0.6);
            candy.setScale(0.5 + Math.random() * 0.5);
            
            this.tweens.add({
                targets: candy,
                y: -50,
                duration: 3000 + Math.random() * 4000,
                repeat: -1,
                yoyo: true
            });
        }
    }
}
