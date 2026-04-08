import { 
    GAME_WIDTH, GAME_HEIGHT, GRID_ROWS, GRID_COLS, TILE_SIZE, 
    GRID_OFFSET_X, GRID_OFFSET_Y, LEVELS, SPECIAL_TYPES, CANDY_TYPES 
} from '../utils/GameConfig.js';
import { AudioManager } from '../utils/AudioManager.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.levelId = data.level || 1;
        this.levelData = LEVELS[this.levelId - 1];
        this.grid = [];
        this.selectedTile = null;
        this.isProcessing = false;
        this.score = 0;
        this.movesLeft = this.levelData.moves;
        this.chainCount = 0;
        this.isGameOver = false;
    }

    create() {
        this.audioManager = new AudioManager(this);
        this.candyTypes = CANDY_TYPES.slice(0, this.levelData.candyTypes);
        this.setupBackground();
        this.createGrid();
        this.startGame();
    }

    setupBackground() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        
        const gridBg = this.add.rectangle(
            GAME_WIDTH / 2, GRID_OFFSET_Y + (GRID_ROWS * TILE_SIZE) / 2,
            GRID_COLS * TILE_SIZE + 20, GRID_ROWS * TILE_SIZE + 20,
            0x1a1a2e, 0.6
        );
        
        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS; col++) {
                const x = GRID_OFFSET_X + col * TILE_SIZE + TILE_SIZE / 2;
                const y = GRID_OFFSET_Y + row * TILE_SIZE + TILE_SIZE / 2;
                this.add.image(x, y, 'tile_bg').setAlpha(0.3);
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
        const x = GRID_OFFSET_X + col * TILE_SIZE + TILE_SIZE / 2;
        const y = GRID_OFFSET_Y + row * TILE_SIZE + TILE_SIZE / 2;
        const type = this.candyTypes[Math.floor(Math.random() * this.candyTypes.length)];
        
        let texture = `candy_${type}`;
        if (specialType === SPECIAL_TYPES.HORIZONTAL) texture = 'candy_horizontal';
        if (specialType === SPECIAL_TYPES.VERTICAL) texture = 'candy_vertical';
        if (specialType === SPECIAL_TYPES.COLOR_BOMB) texture = 'candy_colorbomb';
        
        const candy = this.add.image(x, y, texture);
        candy.setInteractive({ useHandCursor: true });
        candy.setData('row', row);
        candy.setData('col', col);
        candy.setData('type', type);
        candy.setData('special', specialType);
        candy.setScale(0);
        
        this.tweens.add({
            targets: candy,
            scaleX: 1,
            scaleY: 1,
            duration: 200,
            ease: 'Back.easeOut'
        });

        candy.on('pointerdown', () => this.onCandyClick(candy));
        
        return candy;
    }

    onCandyClick(candy) {
        if (this.isProcessing || this.isGameOver) return;
        
        this.audioManager.play('click');
        
        if (this.selectedTile === null) {
            this.selectedTile = candy;
            this.tweens.add({
                targets: candy,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 100,
                yoyo: true,
                repeat: 2
            });
        } else {
            const row = candy.getData('row');
            const col = candy.getData('col');
            const selectedRow = this.selectedTile.getData('row');
            const selectedCol = this.selectedTile.getData('col');
            
            const isAdjacent = 
                (Math.abs(row - selectedRow) === 1 && col === selectedCol) ||
                (Math.abs(col - selectedCol) === 1 && row === selectedRow);
            
            if (isAdjacent) {
                this.swapCandies(this.selectedTile, candy);
            } else {
                this.tweens.killTweensOf(this.selectedTile);
                this.selectedTile.setScale(1);
                this.selectedTile = candy;
                this.tweens.add({
                    targets: candy,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    duration: 100,
                    yoyo: true,
                    repeat: 2
                });
            }
        }
    }

    swapCandies(candy1, candy2) {
        this.isProcessing = true;
        this.tweens.killTweensOf(candy1);
        this.tweens.killTweensOf(candy2);
        candy1.setScale(1);
        candy2.setScale(1);

        const row1 = candy1.getData('row');
        const col1 = candy1.getData('col');
        const row2 = candy2.getData('row');
        const col2 = candy2.getData('col');

        const x1 = GRID_OFFSET_X + col1 * TILE_SIZE + TILE_SIZE / 2;
        const y1 = GRID_OFFSET_Y + row1 * TILE_SIZE + TILE_SIZE / 2;
        const x2 = GRID_OFFSET_X + col2 * TILE_SIZE + TILE_SIZE / 2;
        const y2 = GRID_OFFSET_Y + row2 * TILE_SIZE + TILE_SIZE / 2;

        this.audioManager.play('swap');

        this.tweens.add({
            targets: [candy1, candy2],
            x: [x2, x1],
            y: [y2, y1],
            duration: 200,
            ease: 'Power2',
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
                        targets: [candy1, candy2],
                        x: [x1, x2],
                        y: [y1, y2],
                        duration: 200,
                        ease: 'Power2',
                        onComplete: () => {
                            candy1.setData('row', row1);
                            candy1.setData('col', col1);
                            candy2.setData('row', row2);
                            candy2.setData('col', col2);
                            this.grid[row1][col1] = candy1;
                            this.grid[row2][col2] = candy2;
                            this.isProcessing = false;
                            this.selectedTile = null;
                            this.audioManager.play('invalid');
                        }
                    });
                }
            }
        });
    }

    findMatches() {
        const matches = [];
        const checked = new Set();

        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS; col++) {
                const candy = this.grid[row][col];
                if (!candy) continue;

                const type = candy.getData('type');
                const hMatch = this.getHorizontalMatch(row, col, type);
                const vMatch = this.getVerticalMatch(row, col, type);

                if (hMatch.length >= 3) {
                    const key = hMatch.map(c => `${c.row},${c.col}`).join('|');
                    if (!checked.has(key)) {
                        matches.push(hMatch);
                        checked.add(key);
                    }
                }

                if (vMatch.length >= 3) {
                    const key = vMatch.map(c => `${c.row},${c.col}`).join('|');
                    if (!checked.has(key)) {
                        matches.push(vMatch);
                        checked.add(key);
                    }
                }
            }
        }

        return matches;
    }

    getHorizontalMatch(row, col, type) {
        const match = [{ row, col }];
        
        for (let c = col - 1; c >= 0; c--) {
            const candy = this.grid[row][c];
            if (!candy || candy.getData('type') !== type) break;
            match.unshift({ row, col: c });
        }
        
        for (let c = col + 1; c < GRID_COLS; c++) {
            const candy = this.grid[row][c];
            if (!candy || candy.getData('type') !== type) break;
            match.push({ row, col: c });
        }
        
        return match.length >= 3 ? match : [];
    }

    getVerticalMatch(row, col, type) {
        const match = [{ row, col }];
        
        for (let r = row - 1; r >= 0; r--) {
            const candy = this.grid[r][col];
            if (!candy || candy.getData('type') !== type) break;
            match.unshift({ row: r, col });
        }
        
        for (let r = row + 1; r < GRID_ROWS; r++) {
            const candy = this.grid[r][col];
            if (!candy || candy.getData('type') !== type) break;
            match.push({ row: r, col });
        }
        
        return match.length >= 3 ? match : [];
    }

    processMatches(matches) {
        this.chainCount++;
        
        const allPositions = [];
        const specialsToCreate = [];
        const colorBombActivations = [];

        matches.forEach(match => {
            let hasHorizontal = false;
            let hasVertical = false;
            
            match.forEach(pos => {
                const candy = this.grid[pos.row][pos.col];
                if (candy) {
                    const special = candy.getData('special');
                    if (special === SPECIAL_TYPES.HORIZONTAL) hasHorizontal = true;
                    if (special === SPECIAL_TYPES.VERTICAL) hasVertical = true;
                    if (special === SPECIAL_TYPES.COLOR_BOMB) {
                        colorBombActivations.push({ row: pos.row, col: pos.col, type: candy.getData('type') });
                    }
                    allPositions.push(pos);
                }
            });

            if (match.length >= 4 && !hasHorizontal && !hasVertical) {
                const midIndex = Math.floor(match.length / 2);
                specialsToCreate.push({
                    row: match[midIndex].row,
                    col: match[midIndex].col,
                    type: 'horizontal',
                    matchLength: match.length
                });
            }
            if (match.length >= 5) {
                const midIndex = Math.floor(match.length / 2);
                specialsToCreate.push({
                    row: match[midIndex].row,
                    col: match[midIndex].col,
                    type: 'colorbomb'
                });
            }
        });

        if (colorBombActivations.length > 0) {
            const extraPositions = [];
            colorBombActivations.forEach(cb => {
                const targetType = cb.type;
                for (let row = 0; row < GRID_ROWS; row++) {
                    for (let col = 0; col < GRID_COLS; col++) {
                        const candy = this.grid[row][col];
                        if (candy && candy.getData('type') === targetType) {
                            extraPositions.push({ row, col });
                        }
                    }
                }
            });
            allPositions.push(...extraPositions);
        }

        this.removeMatches(allPositions, () => {
            specialsToCreate.forEach(spec => {
                this.createSpecialCandy(spec.row, spec.col, spec.type);
            });
            
            this.dropCandies(() => {
                this.refillGrid(() => {
                    const newMatches = this.findMatches();
                    if (newMatches.length > 0) {
                        this.audioManager.playChain(this.chainCount);
                        this.processMatches(newMatches);
                    } else {
                        this.chainCount = 0;
                        this.isProcessing = false;
                        this.checkGameState();
                    }
                });
            });
        });

        this.calculateScore(allPositions.length);
        this.updateUI();
    }

    removeMatches(positions, callback) {
        const toRemove = [...new Set(positions.map(p => `${p.row},${p.col}`))].map(s => {
            const [row, col] = s.split(',').map(Number);
            return { row, col };
        });

        let removed = 0;
        const specials = [];

        toRemove.forEach(pos => {
            const candy = this.grid[pos.row][pos.col];
            if (candy) {
                const special = candy.getData('special');
                if (special === SPECIAL_TYPES.HORIZONTAL) {
                    specials.push({ type: 'horizontal', row: pos.row, col: pos.col });
                } else if (special === SPECIAL_TYPES.VERTICAL) {
                    specials.push({ type: 'vertical', row: pos.row, col: pos.col });
                }

                this.createParticles(candy.x, candy.y, candy.getData('type'));
                
                this.tweens.add({
                    targets: candy,
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0,
                    duration: 200,
                    ease: 'Power2',
                    onComplete: () => {
                        candy.destroy();
                        removed++;
                        if (removed === toRemove.length) {
                            specials.forEach(spec => this.activateSpecial(spec));
                            callback();
                        }
                    }
                });
                this.grid[pos.row][pos.col] = null;
            }
        });

        if (toRemove.length === 0) callback();
        
        this.audioManager.play('match');
    }

    activateSpecial(special) {
        const { type, row, col } = special;
        
        if (type === 'horizontal') {
            for (let c = 0; c < GRID_COLS; c++) {
                const candy = this.grid[row][c];
                if (candy) {
                    this.createParticles(candy.x, candy.y, candy.getData('type'));
                    candy.destroy();
                    this.grid[row][c] = null;
                }
            }
            this.createExplosionLine(GRID_OFFSET_Y + row * TILE_SIZE + TILE_SIZE / 2, 'horizontal');
        }
        
        if (type === 'vertical') {
            for (let r = 0; r < GRID_ROWS; r++) {
                const candy = this.grid[r][col];
                if (candy) {
                    this.createParticles(candy.x, candy.y, candy.getData('type'));
                    candy.destroy();
                    this.grid[r][col] = null;
                }
            }
            this.createExplosionLine(GRID_OFFSET_X + col * TILE_SIZE + TILE_SIZE / 2, 'vertical');
        }

        this.audioManager.play('special');
    }

    createExplosionLine(pos, direction) {
        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0xf1c40f, 1);
        
        if (direction === 'horizontal') {
            graphics.lineBetween(GRID_OFFSET_X, pos, GRID_OFFSET_X + GRID_COLS * TILE_SIZE, pos);
        } else {
            graphics.lineBetween(pos, GRID_OFFSET_Y, pos, GRID_OFFSET_Y + GRID_ROWS * TILE_SIZE);
        }
        
        this.tweens.add({
            targets: graphics,
            alpha: 0,
            duration: 300,
            onComplete: () => graphics.destroy()
        });
    }

    createSpecialCandy(row, col, type) {
        if (row < 0 || row >= GRID_ROWS || col < 0 || col >= GRID_COLS) return;
        
        const x = GRID_OFFSET_X + col * TILE_SIZE + TILE_SIZE / 2;
        const y = GRID_OFFSET_Y + row * TILE_SIZE + TILE_SIZE / 2;
        
        let specialType = SPECIAL_TYPES.NONE;
        let texture = '';
        
        if (type === 'horizontal') {
            specialType = SPECIAL_TYPES.HORIZONTAL;
            texture = 'candy_horizontal';
        } else if (type === 'vertical') {
            specialType = SPECIAL_TYPES.VERTICAL;
            texture = 'candy_vertical';
        } else if (type === 'colorbomb') {
            specialType = SPECIAL_TYPES.COLOR_BOMB;
            texture = 'candy_colorbomb';
        }
        
        const candy = this.add.image(x, y, texture);
        candy.setData('row', row);
        candy.setData('col', col);
        candy.setData('type', 'special');
        candy.setData('special', specialType);
        candy.setInteractive({ useHandCursor: true });
        candy.on('pointerdown', () => this.onCandyClick(candy));
        
        this.grid[row][col] = candy;
        
        this.tweens.add({
            targets: candy,
            scaleX: 1,
            scaleY: 1,
            duration: 200,
            ease: 'Back.easeOut'
        });
    }

    createParticles(x, y, type) {
        const colors = {
            red: 0xe74c3c, orange: 0xe67e22, yellow: 0xf1c40f,
            green: 0x2ecc71, blue: 0x3498db, purple: 0x9b59b6, pink: 0xfd79a8
        };
        
        const color = colors[type] || 0xffffff;
        
        for (let i = 0; i < 8; i++) {
            const particle = this.add.graphics();
            particle.fillStyle(color, 1);
            particle.fillCircle(0, 0, 4 + Math.random() * 4);
            particle.x = x;
            particle.y = y;
            
            const angle = Math.random() * Math.PI * 2;
            const speed = 50 + Math.random() * 100;
            
            this.tweens.add({
                targets: particle,
                x: x + Math.cos(angle) * speed,
                y: y + Math.sin(angle) * speed,
                alpha: 0,
                scale: 0,
                duration: 400 + Math.random() * 200,
                ease: 'Power2',
                onComplete: () => particle.destroy()
            });
        }
    }

    dropCandies(callback) {
        let hasDropped = false;
        
        for (let col = 0; col < GRID_COLS; col++) {
            let emptySpaces = 0;
            
            for (let row = GRID_ROWS - 1; row >= 0; row--) {
                if (this.grid[row][col] === null) {
                    emptySpaces++;
                } else if (emptySpaces > 0) {
                    const candy = this.grid[row][col];
                    const newRow = row + emptySpaces;
                    
                    this.grid[newRow][col] = candy;
                    this.grid[row][col] = null;
                    candy.setData('row', newRow);
                    
                    const targetY = GRID_OFFSET_Y + newRow * TILE_SIZE + TILE_SIZE / 2;
                    
                    this.tweens.add({
                        targets: candy,
                        y: targetY,
                        duration: 150,
                        ease: 'Power2'
                    });
                    
                    hasDropped = true;
                }
            }
        }
        
        if (hasDropped) {
            this.time.delayedCall(200, callback);
        } else {
            callback();
        }
    }

    refillGrid(callback) {
        let refillCount = 0;
        
        for (let col = 0; col < GRID_COLS; col++) {
            let emptyCount = 0;
            
            for (let row = 0; row < GRID_ROWS; row++) {
                if (this.grid[row][col] === null) {
                    emptyCount++;
                }
            }
            
            let refillIndex = 0;
            for (let row = 0; row < GRID_ROWS; row++) {
                if (this.grid[row][col] === null) {
                    const y = GRID_OFFSET_Y + row * TILE_SIZE + TILE_SIZE / 2;
                    const x = GRID_OFFSET_X + col * TILE_SIZE + TILE_SIZE / 2;
                    const type = this.candyTypes[Math.floor(Math.random() * this.candyTypes.length)];
                    const texture = `candy_${type}`;
                    
                    const candy = this.add.image(x, y, texture);
                    candy.setData('row', row);
                    candy.setData('col', col);
                    candy.setData('type', type);
                    candy.setData('special', SPECIAL_TYPES.NONE);
                    candy.setInteractive({ useHandCursor: true });
                    candy.on('pointerdown', () => this.onCandyClick(candy));
                    
                    const startY = GRID_OFFSET_Y - (emptyCount - refillIndex) * TILE_SIZE + TILE_SIZE / 2;
                    candy.y = startY;
                    
                    this.tweens.add({
                        targets: candy,
                        y: y,
                        duration: 200,
                        delay: refillIndex * 50,
                        ease: 'Power2'
                    });
                    
                    this.grid[row][col] = candy;
                    refillCount++;
                    refillIndex++;
                }
            }
        }
        
        if (refillCount > 0) {
            this.time.delayedCall(300, callback);
        } else {
            callback();
        }
    }

    calculateScore(matchedCount) {
        const basePoints = matchedCount * 10;
        const chainBonus = Math.max(1, this.chainCount * 0.5);
        this.score += Math.floor(basePoints * chainBonus);
    }

    updateUI() {
        this.scene.get('UIScene').updateScore(this.score);
        this.scene.get('UIScene').updateMoves(this.movesLeft);
    }

    checkGameState() {
        if (this.score >= this.levelData.scoreTarget) {
            this.isGameOver = true;
            this.time.delayedCall(500, () => {
                this.scene.get('UIScene').showLevelComplete(this.score);
            });
        } else if (this.movesLeft <= 0) {
            this.isGameOver = true;
            this.time.delayedCall(500, () => {
                this.scene.get('UIScene').showGameOver(this.score);
            });
        } else {
            this.checkForPossibleMoves();
        }
    }

    checkForPossibleMoves() {
        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS; col++) {
                if (col < GRID_COLS - 1) {
                    this.swapInGrid(row, col, row, col + 1);
                    if (this.findMatches().length > 0) {
                        this.swapInGrid(row, col, row, col + 1);
                        return;
                    }
                    this.swapInGrid(row, col, row, col + 1);
                }
                if (row < GRID_ROWS - 1) {
                    this.swapInGrid(row, col, row + 1, col);
                    if (this.findMatches().length > 0) {
                        this.swapInGrid(row, col, row + 1, col);
                        return;
                    }
                    this.swapInGrid(row, col, row + 1, col);
                }
            }
        }
        
        this.shuffleBoard();
    }

    swapInGrid(row1, col1, row2, col2) {
        const temp = this.grid[row1][col1];
        this.grid[row1][col1] = this.grid[row2][col2];
        this.grid[row2][col2] = temp;
        
        if (this.grid[row1][col1]) {
            this.grid[row1][col1].setData('row', row1);
            this.grid[row1][col1].setData('col', col1);
        }
        if (this.grid[row2][col2]) {
            this.grid[row2][col2].setData('row', row2);
            this.grid[row2][col2].setData('col', col2);
        }
    }

    shuffleBoard() {
        const allCandies = [];
        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS; col++) {
                if (this.grid[row][col]) {
                    allCandies.push({
                        row, col,
                        type: this.grid[row][col].getData('type'),
                        special: this.grid[row][col].getData('special')
                    });
                    this.grid[row][col].destroy();
                    this.grid[row][col] = null;
                }
            }
        }
        
        for (let i = allCandies.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allCandies[i], allCandies[j]] = [allCandies[j], allCandies[i]];
        }
        
        let index = 0;
        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS; col++) {
                const candyData = allCandies[index];
                this.createCandy(row, col, candyData.special);
                this.grid[row][col].setData('type', candyData.type);
                this.grid[row][col].setTexture(`candy_${candyData.type}`);
                index++;
            }
        }
    }

    startGame() {
        this.score = 0;
        this.movesLeft = this.levelData.moves;
        this.chainCount = 0;
        this.isGameOver = false;
        this.isProcessing = false;
        this.selectedTile = null;
        
        this.scene.get('UIScene').initUI(this.levelId, this.levelData.scoreTarget, this.movesLeft);
        this.updateUI();
    }

    pauseGame() {
        this.scene.pause();
        this.scene.launch('PauseScene');
    }
}
