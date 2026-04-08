import { GAME_WIDTH, GAME_HEIGHT, LEVELS, STORAGE_KEYS } from '../utils/GameConfig.js';
import { AudioManager } from '../utils/AudioManager.js';

export class LevelCompleteScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelCompleteScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.levelId = parseInt(data.level) || 1;
        this.stars = data.stars || 1;
    }

    create() {
        this.audioManager = new AudioManager(this);
        this.audioManager.play('levelComplete');
        
        this.saveProgress();
        this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.85);
        
        const panel = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'panel');
        
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 160, 'LEVEL COMPLETE!', {
            fontSize: '32px',
            fontFamily: 'Arial Black',
            color: '#2ecc71'
        }).setOrigin(0.5);
        
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 110, 'Level ' + this.levelId, {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#95a5a6'
        }).setOrigin(0.5);
        
        this.createStars();
        
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 10, 'SCORE', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#95a5a6'
        }).setOrigin(0.5);
        
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 25, `${this.finalScore}`, {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            color: '#f1c40f'
        }).setOrigin(0.5);
        
        const nextLevel = this.levelId < 50 ? this.levelId + 1 : null;
        
        if (nextLevel) {
            this.createButton(GAME_WIDTH / 2 - 70, GAME_HEIGHT / 2 + 90, 'NEXT', () => {
                this.audioManager.play('click');
                this.scene.start('GameScene', { level: nextLevel });
            });
        }
        
        this.createButton(GAME_WIDTH / 2 + 70, GAME_HEIGHT / 2 + 90, 'REPLAY', () => {
            this.audioManager.play('click');
            this.scene.start('GameScene', { level: this.levelId });
        });
        
        this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 150, 'LEVEL SELECT', () => {
            this.audioManager.play('click');
            this.scene.start('LevelSelect');
        });
    }

    createStars() {
        const starY = GAME_HEIGHT / 2 - 60;
        const spacing = 80;
        const startX = GAME_WIDTH / 2 - spacing;
        
        for (let i = 0; i < 3; i++) {
            const x = startX + i * spacing;
            const isEarned = i < this.stars;
            
            const star = this.add.image(x, starY, isEarned ? 'star' : 'star_empty');
            star.setScale(0);
            
            this.tweens.add({
                targets: star,
                scaleX: 1,
                scaleY: 1,
                duration: 300,
                delay: 200 + i * 150,
                ease: 'Back.easeOut'
            });
            
            if (isEarned) {
                this.tweens.add({
                    targets: star,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    duration: 200,
                    delay: 400 + i * 150,
                    yoyo: true
                });
            }
        }
    }

    saveProgress() {
        const currentUnlocked = localStorage.getItem(STORAGE_KEYS.LEVEL_PROGRESS);
        const nextLevel = this.levelId + 1;
        
        if (!currentUnlocked || nextLevel > parseInt(currentUnlocked)) {
            localStorage.setItem(STORAGE_KEYS.LEVEL_PROGRESS, nextLevel.toString());
        }
        
        const highScoreKey = `${STORAGE_KEYS.HIGH_SCORE}_${this.levelId}`;
        const currentHigh = localStorage.getItem(highScoreKey);
        
        if (!currentHigh || this.finalScore > parseInt(currentHigh)) {
            localStorage.setItem(highScoreKey, this.finalScore.toString());
        }
    }

    createButton(x, y, text, callback) {
        const btn = this.add.image(x, y, 'btn_small').setInteractive({ useHandCursor: true });
        const label = this.add.text(x, y, text, {
            fontSize: '16px',
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
