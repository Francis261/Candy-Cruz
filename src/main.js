import { getGameConfig } from './utils/GameConfig.js';

window.addEventListener('load', () => {
    const config = getGameConfig();
    const game = new Phaser.Game(config);
    
    console.log('Candy Cruz Match-3 Game Initialized');
});