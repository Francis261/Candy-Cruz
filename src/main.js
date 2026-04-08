import { getGameConfig } from './utils/GameConfig.js';
import { BootScene } from './scenes/BootScene.js';
import { MainMenu } from './scenes/MainMenu.js';
import { LevelSelect } from './scenes/LevelSelect.js';
import { GameScene } from './scenes/GameScene.js';
import { UIScene } from './scenes/UIScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { LevelCompleteScene } from './scenes/LevelCompleteScene.js';

window.addEventListener('load', () => {
    const config = getGameConfig();
    const game = new Phaser.Game(config);
    
    game.scene.add('BootScene', BootScene);
    game.scene.add('MainMenu', MainMenu);
    game.scene.add('LevelSelect', LevelSelect);
    game.scene.add('GameScene', GameScene);
    game.scene.add('UIScene', UIScene);
    game.scene.add('PauseScene', PauseScene);
    game.scene.add('GameOverScene', GameOverScene);
    game.scene.add('LevelCompleteScene', LevelCompleteScene);
    
    console.log('Candy Cruz Match-3 Game Initialized');
});
