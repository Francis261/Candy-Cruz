import { GAME_WIDTH, GAME_HEIGHT } from '../utils/GameConfig.js';
import { AudioManager } from '../utils/AudioManager.js';

export class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        this.audioManager = new AudioManager(this);
        
        this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.7);
        
        const panel = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'panel');
        
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 130, 'PAUSED', {
            fontSize: '36px',
            fontFamily: 'Arial Black',
            color: '#f1c40f'
        }).setOrigin(0.5);
        
        this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, 'RESUME', () => {
            this.audioManager.play('click');
            this.scene.stop();
            this.scene.resume('GameScene');
        });
        
        this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, 'RESTART', () => {
            this.audioManager.play('click');
            this.scene.stop();
            this.scene.stop('GameScene');
            this.scene.start('GameScene', { level: this.scene.get('GameScene').levelId });
        });
        
        this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100, 'QUIT', () => {
            this.audioManager.play('click');
            this.scene.stop();
            this.scene.stop('GameScene');
            this.scene.start('LevelSelect');
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
