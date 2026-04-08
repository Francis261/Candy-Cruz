import { GAME_WIDTH, GAME_HEIGHT, LEVELS, STORAGE_KEYS } from '../utils/GameConfig.js';
import { AudioManager } from '../utils/AudioManager.js';

export class LevelSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelect' });
    }

    create() {
        this.audioManager = new AudioManager(this);
        this.unlockedLevel = this.getUnlockedLevel();
        this.drawBackground();
        this.createHeader();
        this.createLevelGrid();
        this.createBackButton();
    }

    getUnlockedLevel() {
        const saved = localStorage.getItem(STORAGE_KEYS.LEVEL_PROGRESS);
        return saved ? parseInt(saved) : 1;
    }

    drawBackground() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
    }

    createHeader() {
        const headerBg = this.add.rectangle(GAME_WIDTH / 2, 0, GAME_WIDTH, 80, 0x1a1a2e, 0.8);
        headerBg.setOrigin(0.5, 0);

        this.add.text(GAME_WIDTH / 2, 40, 'SELECT LEVEL', {
            fontSize: '32px',
            fontFamily: 'Arial Black',
            color: '#f1c40f',
            bold: true
        }).setOrigin(0.5);
    }

    createLevelGrid() {
        const cols = 5;
        const cellWidth = 80;
        const cellHeight = 90;
        const startX = (GAME_WIDTH - cols * cellWidth) / 2 + cellWidth / 2;
        const startY = 120;
        const spacing = 10;

        LEVELS.forEach((level, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = startX + col * cellWidth;
            const y = startY + row * cellHeight;
            const isUnlocked = index + 1 <= this.unlockedLevel;

            this.createLevelButton(x, y, level, isUnlocked);
        });
    }

    createLevelButton(x, y, level, isUnlocked) {
        const bg = this.add.image(x, y, isUnlocked ? 'button_large' : 'button_large').setInteractive({ useHandCursor: isUnlocked });
        bg.setTint(isUnlocked ? 0xffffff : 0x666666);

        const levelText = this.add.text(x, y - 8, `${level.id}`, {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: isUnlocked ? '#2c3e50' : '#95a5a6',
            bold: true
        }).setOrigin(0.5);

        const scoreText = this.add.text(x, y + 14, `${level.scoreTarget}`, {
            fontSize: '12px',
            fontFamily: 'Arial',
            color: isUnlocked ? '#7f8c8d' : '#7f8c8d'
        }).setOrigin(0.5);

        if (isUnlocked) {
            bg.on('pointerover', () => {
                bg.setScale(1.1);
                levelText.setScale(1.1);
            });
            bg.on('pointerout', () => {
                bg.setScale(1);
                levelText.setScale(1);
            });
            bg.on('pointerdown', () => {
                this.audioManager.play('click');
                this.startLevel(level.id);
            });
        } else {
            const lock = this.add.image(x, y, 'lock').setScale(0.6);
            levelText.setVisible(false);
            scoreText.setVisible(false);
        }
    }

    startLevel(levelId) {
        this.scene.start('GameScene', { level: levelId });
    }

    createBackButton() {
        const btn = this.add.image(60, GAME_HEIGHT - 40, 'btn_small').setInteractive({ useHandCursor: true });
        const text = this.add.text(60, GAME_HEIGHT - 40, 'BACK', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffffff',
            bold: true
        }).setOrigin(0.5);

        btn.on('pointerover', () => btn.setScale(1.05));
        btn.on('pointerout', () => btn.setScale(1));
        btn.on('pointerdown', () => {
            this.audioManager.play('click');
            this.scene.start('MainMenu');
        });
    }
}
