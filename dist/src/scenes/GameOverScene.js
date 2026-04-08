import { GAME_WIDTH, GAME_HEIGHT, STORAGE_KEYS } from '../utils/GameConfig.js';
import { AudioManager } from '../utils/AudioManager.js';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.levelId = data.level || 1;
    }

    create() {
        this.audioManager = new AudioManager(this);
        this.audioManager.play('gameOver');
        
        this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.85);
        
        const panel = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'panel');
        
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 140, 'GAME OVER', {
            fontSize: '38px',
            fontFamily: 'Arial Black',
            color: '#e74c3c'
        }).setOrigin(0.5);
        
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 90, 'Level ' + this.levelId, {
            fontSize: '22px',
            fontFamily: 'Arial',
            color: '#7f8c8d'
        }).setOrigin(0.5);
        
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, 'SCORE', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#95a5a6'
        }).setOrigin(0.5);
        
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 15, `${this.finalScore}`, {
            fontSize: '42px',
            fontFamily: 'Arial Black',
            color: '#f1c40f'
        }).setOrigin(0.5);
        
        this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50, 'TRY AGAIN', () => {
            this.audioManager.play('click');
            this.scene.start('GameScene', { level: parseInt(this.levelId) });
        });
        
        this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 110, 'LEVEL SELECT', () => {
            this.audioManager.play('click');
            this.scene.start('LevelSelect');
        });
        
        this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 170, 'MAIN MENU', () => {
            this.audioManager.play('click');
            this.scene.start('MainMenu');
        });
    }

    createButton(x, y, text, callback) {
        const btn = this.add.image(x, y, 'btn_small').setInteractive({ useHandCursor: true });
        const label = this.add.text(x, y, text, {
            fontSize: '18px',
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
}
