import { GAME_WIDTH, GAME_HEIGHT, LEVELS, STORAGE_KEYS } from '../utils/GameConfig.js';
import { AudioManager } from '../utils/AudioManager.js';

export class LevelSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelect' });
    }

    create() {
        this.scaleFactor = Math.min(this.scale.width / GAME_WIDTH, this.scale.height / GAME_HEIGHT);
        this.audioManager = new AudioManager(this);
        this.unlockedLevel = this.getUnlockedLevel();
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(this.scaleFactor);
        this.createHeader();
        this.createLevelGrid();
        this.createBackButton();
    }

    getUnlockedLevel() {
        const saved = localStorage.getItem(STORAGE_KEYS.LEVEL_PROGRESS);
        return saved ? parseInt(saved) : 1;
    }

    createHeader() {
        this.add.rectangle(GAME_WIDTH / 2, 50 * this.scaleFactor, GAME_WIDTH * this.scaleFactor, 80 * this.scaleFactor, 0x1a1a2e, 0.9);
        
        this.add.text(GAME_WIDTH / 2, 50 * this.scaleFactor, 'LEVELS', {
            fontSize: `${36 * this.scaleFactor}px`,
            fontFamily: 'Arial',
            color: '#f1c40f',
            bold: true
        }).setOrigin(0.5);

        this.add.text(GAME_WIDTH / 2, 85 * this.scaleFactor, `Level ${this.unlockedLevel} of 50`, {
            fontSize: `${14 * this.scaleFactor}px`,
            fontFamily: 'Arial',
            color: '#7f8c8d'
        }).setOrigin(0.5);
    }

    createLevelGrid() {
        this.levelContainer = this.add.container(0, 100 * this.scaleFactor);
        this.page = 0;
        this.levelsPerPage = 20;
        
        const cols = 4;
        const cellW = 100 * this.scaleFactor;
        const cellH = 100 * this.scaleFactor;
        const startX = (GAME_WIDTH - cols * cellW) / 2 + cellW / 2;
        
        this.updateLevelButtons(startX, cellW, cellH, cols);
    }

    updateLevelButtons(startX, cellW, cellH, cols) {
        this.levelContainer.removeAll(true);
        
        const startLevel = this.page * this.levelsPerPage;
        const endLevel = Math.min(startLevel + this.levelsPerPage, LEVELS.length);
        
        for (let i = startLevel; i < endLevel; i++) {
            const col = (i - startLevel) % cols;
            const row = Math.floor((i - startLevel) / cols);
            const x = startX + col * cellW;
            const y = 40 * this.scaleFactor + row * cellH;
            const level = LEVELS[i];
            const isUnlocked = i + 1 <= this.unlockedLevel;
            
            this.createLevelCard(x, y, level.id, level.scoreTarget, isUnlocked, cellW);
        }
    }

    createLevelCard(x, y, levelNum, score, isUnlocked, cellW) {
        const card = this.add.container(x, y);
        const size = cellW * 0.85;
        
        const bg = this.add.rectangle(0, 0, size, size, isUnlocked ? 0x2c3e50 : 0x34495e);
        if (!isUnlocked) bg.setAlpha(0.5);
        card.add(bg);
        
        if (isUnlocked) {
            const num = this.add.text(0, -size * 0.15, `${levelNum}`, {
                fontSize: `${28 * this.scaleFactor}px`,
                fontFamily: 'Arial',
                color: '#f1c40f',
                bold: true
            }).setOrigin(0.5);
            card.add(num);
            
            const txt = this.add.text(0, size * 0.15, `${score}`, {
                fontSize: `${12 * this.scaleFactor}px`,
                fontFamily: 'Arial',
                color: '#95a5a6'
            }).setOrigin(0.5);
            card.add(txt);
            
            card.setSize(size, size);
            card.setInteractive({ useHandCursor: true });
            
            card.on('pointerover', () => {
                this.tweens.add({ targets: card, scaleX: 1.1, scaleY: 1.1, duration: 100 });
            });
            card.on('pointerout', () => {
                this.tweens.add({ targets: card, scaleX: 1, scaleY: 1, duration: 100 });
            });
            card.on('pointerdown', () => {
                this.audioManager.play('click');
                this.scene.start('GameScene', { level: levelNum });
            });
        } else {
            const lock = this.add.text(0, 0, '🔒', {
                fontSize: `${24 * this.scaleFactor}px`
            }).setOrigin(0.5);
            card.add(lock);
        }
    }

    createBackButton() {
        const btn = this.add.container(60 * this.scaleFactor, GAME_HEIGHT - 40 * this.scaleFactor);
        const bg = this.add.rectangle(0, 0, 100 * this.scaleFactor, 40 * this.scaleFactor, 0x2980b9);
        const text = this.add.text(0, 0, '← BACK', {
            fontSize: `${16 * this.scaleFactor}px`,
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);
        btn.add([bg, text]);
        btn.setSize(100 * this.scaleFactor, 40 * this.scaleFactor);
        btn.setInteractive({ useHandCursor: true });
        
        btn.on('pointerover', () => btn.setScale(1.05));
        btn.on('pointerout', () => btn.setScale(1));
        btn.on('pointerdown', () => {
            this.audioManager.play('click');
            this.scene.start('MainMenu');
        });
    }
}