import { GAME_WIDTH, GAME_HEIGHT, LEVELS, STORAGE_KEYS } from '../utils/GameConfig.js';
import { AudioManager } from '../utils/AudioManager.js';

export class LevelSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelect' });
    }

    create() {
        this.audioManager = new AudioManager(this);
        this.unlockedLevel = this.getUnlockedLevel();
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.createHeader();
        this.createLevelGrid();
        this.createBackButton();
        this.createScrollbar();
    }

    getUnlockedLevel() {
        const saved = localStorage.getItem(STORAGE_KEYS.LEVEL_PROGRESS);
        return saved ? parseInt(saved) : 1;
    }

    createHeader() {
        this.add.rectangle(GAME_WIDTH / 2, 50, GAME_WIDTH, 80, 0x1a1a2e, 0.9);
        
        const title = this.add.text(GAME_WIDTH / 2, 50, 'LEVELS', {
            fontSize: '36px',
            fontFamily: 'Arial',
            color: '#f1c40f',
            bold: true
        }).setOrigin(0.5);

        const subtitle = this.add.text(GAME_WIDTH / 2, 85, `Level ${this.unlockedLevel} of 50`, {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#7f8c8d'
        }).setOrigin(0.5);
    }

    createLevelGrid() {
        this.levelContainer = this.add.container(0, 100);
        this.page = 0;
        this.levelsPerPage = 20;
        
        const cols = 4;
        const cellW = 100;
        const cellH = 100;
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
            const y = 40 + row * cellH;
            const level = LEVELS[i];
            const isUnlocked = i + 1 <= this.unlockedLevel;
            
            this.createLevelCard(x, y, level.id, level.scoreTarget, isUnlocked);
        }
    }

    createLevelCard(x, y, levelNum, score, isUnlocked) {
        const card = this.add.container(x, y);
        
        const bg = this.add.rectangle(0, 0, 85, 85, isUnlocked ? 0x2c3e50 : 0x34495e);
        if (!isUnlocked) bg.setAlpha(0.5);
        card.add(bg);
        
        if (isUnlocked) {
            const num = this.add.text(0, -15, `${levelNum}`, {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#f1c40f',
                bold: true
            }).setOrigin(0.5);
            card.add(num);
            
            const txt = this.add.text(0, 15, `${score}`, {
                fontSize: '12px',
                fontFamily: 'Arial',
                color: '#95a5a6'
            }).setOrigin(0.5);
            card.add(txt);
            
            card.setSize(85, 85);
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
                fontSize: '24px'
            }).setOrigin(0.5);
            card.add(lock);
            
            const num = this.add.text(0, -15, `${levelNum}`, {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#7f8c8d'
            }).setOrigin(0.5);
            card.add(num);
        }
    }

    createScrollbar() {
        this.add.rectangle(GAME_WIDTH - 20, GAME_HEIGHT / 2 + 50, 15, 300, 0x1a1a2e, 0.8);
        
        const totalPages = Math.ceil(LEVELS.length / this.levelsPerPage);
        const btnY = 150 + (this.page / (totalPages - 1)) * 250;
        this.scrollThumb = this.add.rectangle(GAME_WIDTH - 20, btnY, 15, 30, 0xf1c40f);
        
        this.add.text(GAME_WIDTH - 40, 130, '◀', {
            fontSize: '20px',
            color: '#7f8c8d'
        }).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.prevPage());
        
        this.add.text(GAME_WIDTH - 40, GAME_HEIGHT - 80, '▶', {
            fontSize: '20px',
            color: '#7f8c8d'
        }).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.nextPage());
    }

    prevPage() {
        if (this.page > 0) {
            this.page--;
            this.updateLevelButtons(100, 100, 100, 4);
            this.updateScrollbar();
        }
    }

    nextPage() {
        const totalPages = Math.ceil(LEVELS.length / this.levelsPerPage);
        if (this.page < totalPages - 1) {
            this.page++;
            this.updateLevelButtons(100, 100, 100, 4);
            this.updateScrollbar();
        }
    }

    updateScrollbar() {
        const totalPages = Math.ceil(LEVELS.length / this.levelsPerPage);
        const btnY = 150 + (this.page / Math.max(1, totalPages - 1)) * 250;
        this.tweens.add({ targets: this.scrollThumb, y: btnY, duration: 200 });
    }

    createBackButton() {
        const btn = this.add.container(60, GAME_HEIGHT - 40);
        const bg = this.add.rectangle(0, 0, 100, 40, 0x2980b9);
        const text = this.add.text(0, 0, '← BACK', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);
        btn.add([bg, text]);
        btn.setSize(100, 40);
        btn.setInteractive({ useHandCursor: true });
        
        btn.on('pointerover', () => btn.setScale(1.05));
        btn.on('pointerout', () => btn.setScale(1));
        btn.on('pointerdown', () => {
            this.audioManager.play('click');
            this.scene.start('MainMenu');
        });
    }
}