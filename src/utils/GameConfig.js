import { BootScene } from '../scenes/BootScene.js';
import { MainMenu } from '../scenes/MainMenu.js';
import { LevelSelect } from '../scenes/LevelSelect.js';
import { GameScene } from '../scenes/GameScene.js';
import { PauseScene } from '../scenes/PauseScene.js';
import { GameOverScene } from '../scenes/GameOverScene.js';
import { LevelCompleteScene } from '../scenes/LevelCompleteScene.js';

export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 640;
export const GRID_ROWS = 8;
export const GRID_COLS = 8;
export const TILE_SIZE = 64;
export const GRID_OFFSET_X = (GAME_WIDTH - GRID_COLS * TILE_SIZE) / 2;
export const GRID_OFFSET_Y = 100;
export const CANDY_TYPES = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];
export const SPECIAL_TYPES = {
    NONE: 0,
    HORIZONTAL: 1,
    VERTICAL: 2,
    COLOR_BOMB: 3
};
export const LEVELS = generateLevels();

function generateLevels() {
    const levels = [];
    for (let i = 1; i <= 50; i++) {
        const baseScore = 1000 + i * 500;
        const baseMoves = Math.max(15, 30 - Math.floor(i / 10));
        const candyTypes = Math.min(7, 5 + Math.floor(i / 15));
        const hasSpecials = i >= 3;
        levels.push({
            id: i,
            scoreTarget: baseScore + (i - 1) * 200,
            moves: baseMoves,
            candyTypes: candyTypes,
            gridRows: 8,
            gridCols: 8,
            hasSpecials: hasSpecials,
            specialsChance: i >= 5 ? 0.1 + (i - 5) * 0.01 : 0
        });
    }
    return levels;
}

export const STORAGE_KEYS = {
    HIGH_SCORE: 'candycruz_highscore',
    LEVEL_PROGRESS: 'candycruz_level',
    SOUND_ENABLED: 'candycruz_sound'
};

export function getGameConfig() {
    const isMobile = window.innerWidth < 768;
    const scaleFactor = isMobile ? Math.min(window.innerWidth / GAME_WIDTH, window.innerHeight / GAME_HEIGHT) : 1;
    
    return {
        type: Phaser.AUTO,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        parent: 'game-container',
        backgroundColor: '#1a1a2e',
        scale: {
            mode: Phaser.Scale.ENVELOP,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: '100%',
            height: '100%'
        },
        scene: [BootScene, MainMenu, LevelSelect, GameScene, PauseScene, GameOverScene, LevelCompleteScene],
        physics: {
            default: 'arcade',
            arcade: { debug: false }
        }
    };
}
