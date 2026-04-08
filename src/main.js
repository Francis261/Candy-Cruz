import { getGameConfig } from './utils/GameConfig.js';

window.addEventListener('load', () => {
    const config = getGameConfig();
    const game = new Phaser.Game(config);
    
    game.scene.add('BootScene', config.scene[0]);
    game.scene.add('MainMenu', config.scene[1]);
    game.scene.add('LevelSelect', config.scene[2]);
    game.scene.add('GameScene', config.scene[3]);
    game.scene.add('UIScene', config.scene[4]);
    game.scene.add('PauseScene', config.scene[5]);
    game.scene.add('GameOverScene', config.scene[6]);
    game.scene.add('LevelCompleteScene', config.scene[7]);
    
    console.log('Candy Cruz Match-3 Game Initialized');
});