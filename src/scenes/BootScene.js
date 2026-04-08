import { AssetGenerator } from '../utils/AssetGenerator.js';

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.createLoadingBar();
    }

    createLoadingBar() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const bg = this.add.rectangle(width / 2, height / 2, 300, 40, 0x2c3e50);
        const bar = this.add.rectangle(width / 2 - 145, height / 2, 0, 30, 0xf1c40f);
        
        this.load.on('progress', (value) => {
            bar.width = 290 * value;
        });
        
        this.add.text(width / 2, height / 2 - 50, 'Loading Candy Cruz...', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#f1c40f',
            bold: true
        }).setOrigin(0.5);
    }

    create() {
        AssetGenerator.generateAllTextures(this);
        this.scene.start('MainMenu');
    }
}
