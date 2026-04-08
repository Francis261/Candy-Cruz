import { GAME_WIDTH, GAME_HEIGHT, LEVELS, STORAGE_KEYS } from '../utils/GameConfig.js';

export class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        this.createTopBar();
        this.createPauseButton();
    }

    createTopBar() {
        const barHeight = 70;
        const bg = this.add.rectangle(GAME_WIDTH / 2, barHeight / 2, GAME_WIDTH, barHeight, 0x1a1a2e, 0.9);
        
        this.add.text(20, 20, 'LEVEL', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#7f8c8d'
        });
        
        this.levelText = this.add.text(20, 38, '1', {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#f1c40f'
        });
        
        const scoreLabel = this.add.text(GAME_WIDTH / 2, 20, 'SCORE', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#7f8c8d'
        }).setOrigin(0.5);
        
        this.scoreText = this.add.text(GAME_WIDTH / 2, 42, '0', {
            fontSize: '24px',
            fontFamily: 'Arial Black',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        this.add.text(GAME_WIDTH - 20, 20, 'MOVES', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#7f8c8d'
        }).setOrigin(1, 0);
        
        this.movesText = this.add.text(GAME_WIDTH - 20, 42, '30', {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#3498db'
        }).setOrigin(1, 0);
    }

    createPauseButton() {
        const btn = this.add.image(GAME_WIDTH - 30, GAME_HEIGHT - 30, 'btn_pause').setInteractive({ useHandCursor: true });
        
        btn.on('pointerdown', () => {
            const gameScene = this.scene.get('GameScene');
            gameScene.pauseGame();
        });
    }

    initUI(levelId, scoreTarget, moves) {
        this.levelText.setText(`${levelId}`);
        this.scoreText.setText('0');
        this.movesText.setText(`${moves}`);
        this.score = 0;
        this.targetScore = scoreTarget;
        this.moves = moves;
    }

    updateScore(score) {
        this.score = score;
        this.scoreText.setText(`${score}`);
        
        if (score >= this.targetScore) {
            this.scoreText.setColor('#2ecc71');
        }
    }

    updateMoves(moves) {
        this.moves = moves;
        this.movesText.setText(`${moves}`);
        
        if (moves <= 5) {
            this.movesText.setColor('#e74c3c');
        } else if (moves <= 10) {
            this.movesText.setColor('#f39c12');
        }
    }

    showGameOver(finalScore) {
        this.scene.start('GameOverScene', { score: finalScore, level: this.levelText.text });
    }

    showLevelComplete(finalScore) {
        const stars = this.calculateStars(finalScore);
        this.scene.start('LevelCompleteScene', { 
            score: finalScore, 
            level: this.levelText.text,
            stars: stars
        });
    }

    calculateStars(score) {
        const ratio = score / this.targetScore;
        if (ratio >= 2) return 3;
        if (ratio >= 1.5) return 2;
        return 1;
    }
}
