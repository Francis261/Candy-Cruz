import { 
    GAME_WIDTH, GAME_HEIGHT, GRID_ROWS, GRID_COLS, TILE_SIZE, 
    GRID_OFFSET_X, GRID_OFFSET_Y, LEVELS, SPECIAL_TYPES, CANDY_TYPES 
} from '../utils/GameConfig.js';
import { AudioManager } from '../utils/AudioManager.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.tileSize = TILE_SIZE;
    }

    init(data) {
        this.levelId = data.level || 1;
        this.levelData = LEVELS[Math.min(this.levelId - 1, LEVELS.length - 1)];
        this.grid = [];
        this.selectedTile = null;
        this.isProcessing = false;
        this.score = 0;
        this.movesLeft = this.levelData.moves;
        this.chainCount = 0;
        this.isGameOver = false;
        
        this.scaleGame();
    }

    scaleGame() {
        const w = this.scale.width;
        const h = this.scale.height;
        const scaleX = w / GAME_WIDTH;
        const scaleY = h / GAME_HEIGHT;
        this.scaleFactor = Math.min(scaleX, scaleY);
        
        if (this.scaleFactor < 1) {
            this.tileSize = Math.floor(TILE_SIZE * this.scaleFactor);
            this.gridOffsetX = Math.floor(GRID_OFFSET_X * this.scaleFactor);
            this.gridOffsetY = Math.floor(100 * this.scaleFactor);
        } else {
            this.tileSize = TILE_SIZE;
            this.gridOffsetX = GRID_OFFSET_X;
            this.gridOffsetY = 100;
        }
    }

    create() {
        this.audioManager = new AudioManager(this);
        this.candyTypes = CANDY_TYPES.slice(0, this.levelData.candyTypes);
        this.createUI();
        this.setupBackground();
        this.createGrid();
        this.startGame();
    }

    createUI() {
        const barY = 35 * this.scaleFactor;
        const barH = 70 * this.scaleFactor;
        
        this.add.rectangle(GAME_WIDTH / 2, barY, GAME_WIDTH * this.scaleFactor, barH, 0x1a1a2e, 0.95);
        
        this.add.text(20 * this.scaleFactor, 15 * this.scaleFactor, 'LV', { fontSize: `${12 * this.scaleFactor}px`, color: '#7f8c8d' });
        this.levelText = this.add.text(20 * this.scaleFactor, 32 * this.scaleFactor, '1', { fontSize: `${24 * this.scaleFactor}px`, color: '#f1c40f', bold: true });
        
        this.add.text(GAME_WIDTH / 2, 15 * this.scaleFactor, 'SCORE', { fontSize: `${12 * this.scaleFactor}px`, color: '#7f8c8d' }).setOrigin(0.5);
        this.scoreText = this.add.text(GAME_WIDTH / 2, 35 * this.scaleFactor, '0', { fontSize: `${20 * this.scaleFactor}px`, color: '#fff', bold: true }).setOrigin(0.5);
        
        this.add.text(GAME_WIDTH - 20 * this.scaleFactor, 15 * this.scaleFactor, 'MOVES', { fontSize: `${12 * this.scaleFactor}px`, color: '#7f8c8d' }).setOrigin(1, 0);
        this.movesText = this.add.text(GAME_WIDTH - 20 * this.scaleFactor, 32 * this.scaleFactor, '30', { fontSize: `${24 * this.scaleFactor}px`, color: '#3498db', bold: true }).setOrigin(1, 0);

        this.add.image(GAME_WIDTH - 30 * this.scaleFactor, GAME_HEIGHT - 30 * this.scaleFactor, 'btn_pause')
            .setScale(this.scaleFactor)
            .setInteractive()
            .on('pointerdown', () => this.pauseGame());
    }

    setupBackground() {
        this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(this.scaleFactor);
        
        this.add.rectangle(
            GAME_WIDTH / 2, this.gridOffsetY + (GRID_ROWS * this.tileSize) / 2,
            GRID_COLS * this.tileSize + 16, GRID_ROWS * this.tileSize + 16,
            0x1a1a2e, 0.7
        );
        
        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS; col++) {
                this.add.image(
                    this.gridOffsetX + col * this.tileSize + this.tileSize / 2,
                    this.gridOffsetY + row * this.tileSize + this.tileSize / 2,
                    'tile_bg'
                ).setAlpha(0.3).setScale(this.scaleFactor);
            }
        }
    }

    createGrid() {
        this.grid = [];
        for (let row = 0; row < GRID_ROWS; row++) {
            this.grid[row] = [];
            for (let col = 0; col < GRID_COLS; col++) {
                this.grid[row][col] = this.createCandy(row, col);
            }
        }
    }

    createCandy(row, col, specialType = SPECIAL_TYPES.NONE) {
        const x = this.gridOffsetX + col * this.tileSize + this.tileSize / 2;
        const y = this.gridOffsetY + row * this.tileSize + this.tileSize / 2;
        const type = this.candyTypes[Math.floor(Math.random() * this.candyTypes.length)];
        
        let texture = `candy_${type}`;
        if (specialType === SPECIAL_TYPES.HORIZONTAL) texture = 'candy_horizontal';
        if (specialType === SPECIAL_TYPES.VERTICAL) texture = 'candy_vertical';
        if (specialType === SPECIAL_TYPES.COLOR_BOMB) texture = 'candy_colorbomb';
        
        const candy = this.add.image(x, y, texture).setScale(this.scaleFactor);
        candy.setInteractive({ useHandCursor: true });
        candy.setData('row', row);
        candy.setData('col', col);
        candy.setData('type', type);
        candy.setData('special', specialType);
        
        candy.on('pointerdown', () => this.onCandyClick(candy));
        return candy;
    }

    onCandyClick(candy) {
        if (this.isProcessing || this.isGameOver) return;
        
        if (this.selectedTile === null) {
            this.selectedTile = candy;
            this.tweens.add({ targets: candy, scaleX: 1.2 * this.scaleFactor, scaleY: 1.2 * this.scaleFactor, duration: 100, yoyo: true, repeat: 2 });
        } else {
            const row = candy.getData('row');
            const col = candy.getData('col');
            const sRow = this.selectedTile.getData('row');
            const sCol = this.selectedTile.getData('col');
            
            const isAdjacent = (Math.abs(row - sRow) === 1 && col === sCol) || (Math.abs(col - sCol) === 1 && row === sRow);
            
            if (isAdjacent) {
                this.swapCandies(this.selectedTile, candy);
            } else {
                this.selectedTile.setScale(this.scaleFactor);
                this.selectedTile = candy;
                this.tweens.add({ targets: candy, scaleX: 1.2 * this.scaleFactor, scaleY: 1.2 * this.scaleFactor, duration: 100, yoyo: true, repeat: 2 });
            }
        }
    }

    swapCandies(candy1, candy2) {
        this.isProcessing = true;
        const row1 = candy1.getData('row');
        const col1 = candy1.getData('col');
        const row2 = candy2.getData('row');
        const col2 = candy2.getData('col');
        
        const x1 = this.gridOffsetX + col1 * this.tileSize + this.tileSize / 2;
        const y1 = this.gridOffsetY + row1 * this.tileSize + this.tileSize / 2;
        const x2 = this.gridOffsetX + col2 * this.tileSize + this.tileSize / 2;
        const y2 = this.gridOffsetY + row2 * this.tileSize + this.tileSize / 2;

        this.tweens.add({
            targets: [candy1, candy2],
            x: [x2, x1],
            y: [y2, y1],
            duration: 200,
            onComplete: () => {
                candy1.setData('row', row2);
                candy1.setData('col', col2);
                candy2.setData('row', row1);
                candy2.setData('col', col1);
                this.grid[row1][col1] = candy2;
                this.grid[row2][col2] = candy1;
                
                const matches = this.findMatches();
                if (matches.length > 0) {
                    this.movesLeft--;
                    this.selectedTile = null;
                    this.processMatches(matches);
                } else {
                    this.tweens.add({
                        targets: [candy1, candy2], x: [x1, x2], y: [y1, y2], duration: 200,
                        onComplete: () => {
                            candy1.setData('row', row1);
                            candy1.setData('col', col1);
                            candy2.setData('row', row2);
                            candy2.setData('col', col2);
                            this.grid[row1][col1] = candy1;
                            this.grid[row2][col2] = candy2;
                            this.isProcessing = false;
                            this.selectedTile = null;
                        }
                    });
                }
            }
        });
    }

    findMatches() {
        const matches = [];
        
        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS - 2; col++) {
                const type = this.grid[row][col]?.getData('type');
                if (type && this.grid[row][col + 1]?.getData('type') === type && this.grid[row][col + 2]?.getData('type') === type) {
                    const match = [{ row, col }];
                    let c = col + 1;
                    while (c < GRID_COLS && this.grid[row][c]?.getData('type') === type) {
                        match.push({ row, col: c });
                        c++;
                    }
                    if (match.length >= 3) matches.push(match);
                }
            }
        }
        
        for (let col = 0; col < GRID_COLS; col++) {
            for (let row = 0; row < GRID_ROWS - 2; row++) {
                const type = this.grid[row][col]?.getData('type');
                if (type && this.grid[row + 1][col]?.getData('type') === type && this.grid[row + 2][col]?.getData('type') === type) {
                    const match = [{ row, col }];
                    let r = row + 1;
                    while (r < GRID_ROWS && this.grid[r][col]?.getData('type') === type) {
                        match.push({ row: r, col });
                        r++;
                    }
                    if (match.length >= 3) matches.push(match);
                }
            }
        }
        
        return matches;
    }

    processMatches(matches) {
        this.chainCount++;
        
        const positions = [];
        matches.forEach(match => match.forEach(p => positions.push(p)));
        
        positions.forEach(pos => {
            const candy = this.grid[pos.row][pos.col];
            if (candy) {
                this.tweens.add({ targets: candy, scaleX: 0, scaleY: 0, alpha: 0, duration: 200, onComplete: () => candy.destroy() });
                this.grid[pos.row][pos.col] = null;
            }
        });
        
        const basePoints = positions.length * 10;
        this.score += Math.floor(basePoints * Math.max(1, this.chainCount * 0.5));
        
        this.dropCandies(() => {
            this.refillGrid(() => {
                const newMatches = this.findMatches();
                if (newMatches.length > 0) {
                    this.processMatches(newMatches);
                } else {
                    this.chainCount = 0;
                    this.isProcessing = false;
                    this.checkGameState();
                }
            });
        });
        
        this.updateUI();
    }

    dropCandies(callback) {
        for (let col = 0; col < GRID_COLS; col++) {
            let empty = 0;
            for (let row = GRID_ROWS - 1; row >= 0; row--) {
                if (this.grid[row][col] === null) {
                    empty++;
                } else if (empty > 0) {
                    const candy = this.grid[row][col];
                    const newRow = row + empty;
                    this.grid[newRow][col] = candy;
                    this.grid[row][col] = null;
                    candy.setData('row', newRow);
                    this.tweens.add({ targets: candy, y: this.gridOffsetY + newRow * this.tileSize + this.tileSize / 2, duration: 150 });
                }
            }
        }
        this.time.delayedCall(200, callback);
    }

    refillGrid(callback) {
        for (let col = 0; col < GRID_COLS; col++) {
            let emptyCount = 0;
            for (let row = 0; row < GRID_ROWS; row++) {
                if (this.grid[row][col] === null) {
                    emptyCount++;
                }
            }
            
            for (let row = 0; row < GRID_ROWS; row++) {
                if (this.grid[row][col] === null) {
                    const y = this.gridOffsetY + row * this.tileSize + this.tileSize / 2;
                    const x = this.gridOffsetX + col * this.tileSize + this.tileSize / 2;
                    const type = this.candyTypes[Math.floor(Math.random() * this.candyTypes.length)];
                    const candy = this.add.image(x, y - emptyCount * 30, `candy_${type}`).setScale(this.scaleFactor);
                    candy.setInteractive({ useHandCursor: true });
                    candy.setData('row', row);
                    candy.setData('col', col);
                    candy.setData('type', type);
                    candy.on('pointerdown', () => this.onCandyClick(candy));
                    this.grid[row][col] = candy;
                    this.tweens.add({ targets: candy, y: y, duration: 200 });
                }
            }
        }
        this.time.delayedCall(250, callback);
    }

    updateUI() {
        this.scoreText.setText(`${this.score}`);
        this.movesText.setText(`${this.movesLeft}`);
        
        if (this.score >= this.levelData.scoreTarget) {
            this.scoreText.setColor('#2ecc71');
        }
        if (this.movesLeft <= 5) {
            this.movesText.setColor('#e74c3c');
        } else if (this.movesLeft <= 10) {
            this.movesText.setColor('#f39c12');
        }
    }

    checkGameState() {
        if (this.score >= this.levelData.scoreTarget) {
            this.isGameOver = true;
            this.time.delayedCall(500, () => {
                this.scene.start('LevelCompleteScene', { score: this.score, level: this.levelId, stars: 1 });
            });
        } else if (this.movesLeft <= 0) {
            this.isGameOver = true;
            this.time.delayedCall(500, () => {
                this.scene.start('GameOverScene', { score: this.score, level: this.levelId });
            });
        }
    }

    startGame() {
        this.score = 0;
        this.movesLeft = this.levelData.moves;
        this.chainCount = 0;
        this.isGameOver = false;
        this.isProcessing = false;
        this.selectedTile = null;
        
        this.levelText.setText(`${this.levelId}`);
        this.scoreText.setText('0');
        this.movesText.setText(`${this.movesLeft}`);
    }

    pauseGame() {
        this.scene.pause();
        this.scene.launch('PauseScene');
    }
}