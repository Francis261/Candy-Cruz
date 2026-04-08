export class AssetGenerator {
    static generateCandyTextures(scene) {
        const colors = {
            red: { main: '#e74c3c', light: '#ff6b6b', dark: '#c0392b' },
            orange: { main: '#e67e22', light: '#f39c12', dark: '#d35400' },
            yellow: { main: '#f1c40f', light: '#f9e79f', dark: '#d4ac0d' },
            green: { main: '#2ecc71', light: '#58d68d', dark: '#27ae60' },
            blue: { main: '#3498db', light: '#5dade2', dark: '#2980b9' },
            purple: { main: '#9b59b6', light: '#af7ac5', dark: '#8e44ad' },
            pink: { main: '#fd79a8', light: '#ff9ff3', dark: '#e84393' }
        };

        Object.entries(colors).forEach(([name, color]) => {
            const g = scene.make.graphics({ x: 0, y: 0, add: false });
            g.fillStyle(Phaser.Display.Color.HexStringToColor(color.dark).color, 1);
            g.fillCircle(32, 34, 28);
            g.fillStyle(Phaser.Display.Color.HexStringToColor(color.main).color, 1);
            g.fillCircle(32, 32, 28);
            g.fillStyle(Phaser.Display.Color.HexStringToColor(color.light).color, 0.6);
            g.fillCircle(24, 24, 10);
            g.generateTexture(`candy_${name}`, 64, 64);
            g.destroy();
        });
    }

    static generateSpecialCandyTextures(scene) {
        const h = scene.make.graphics({ x: 0, y: 0, add: false });
        h.fillStyle(0x2c3e50, 1);
        h.fillCircle(32, 34, 28);
        h.fillStyle(0x3498db, 1);
        h.fillCircle(32, 32, 28);
        h.fillStyle(0xffffff, 1);
        h.fillRect(8, 28, 48, 8);
        h.fillStyle(0xf1c40f, 1);
        h.fillRect(10, 30, 44, 4);
        h.generateTexture('candy_horizontal', 64, 64);
        h.destroy();

        const v = scene.make.graphics({ x: 0, y: 0, add: false });
        v.fillStyle(0x2c3e50, 1);
        v.fillCircle(32, 34, 28);
        v.fillStyle(0xe74c3c, 1);
        v.fillCircle(32, 32, 28);
        v.fillStyle(0xffffff, 1);
        v.fillRect(28, 8, 8, 48);
        v.fillStyle(0xf1c40f, 1);
        v.fillRect(30, 10, 4, 44);
        v.generateTexture('candy_vertical', 64, 64);
        v.destroy();

        const cb = scene.make.graphics({ x: 0, y: 0, add: false });
        cb.fillStyle(0x2c3e50, 1);
        cb.fillCircle(32, 34, 28);
        cb.fillStyle(0x1a1a2e, 1);
        cb.fillCircle(32, 32, 28);
        [0xe74c3c, 0xe67e22, 0xf1c40f, 0x2ecc71, 0x3498db, 0x9b59b6, 0xfd79a8].forEach((color, i) => {
            const angle = (i / 7) * Math.PI * 2;
            cb.fillStyle(color, 1);
            cb.fillCircle(32 + Math.cos(angle) * 14, 32 + Math.sin(angle) * 14, 5);
        });
        cb.fillStyle(0xffffff, 0.8);
        cb.fillCircle(26, 26, 4);
        cb.generateTexture('candy_colorbomb', 64, 64);
        cb.destroy();
    }

    static generateParticleTextures(scene) {
        ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#fd79a8'].forEach((color, i) => {
            const g = scene.make.graphics({ x: 0, y: 0, add: false });
            g.fillStyle(Phaser.Display.Color.HexStringToColor(color).color, 1);
            g.fillCircle(8, 8, 8);
            g.generateTexture(`particle_${i}`, 16, 16);
            g.destroy();
        });
    }

    static generateUITextures(scene) {
        let g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x2c3e50, 1);
        g.fillRect(0, 0, 200, 60);
        g.fillStyle(0x34495e, 1);
        g.fillRect(4, 4, 192, 52);
        g.generateTexture('button_large', 200, 60);
        g.destroy();

        g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x27ae60, 1);
        g.fillRect(0, 0, 120, 50);
        g.fillStyle(0x2ecc71, 1);
        g.fillRect(2, 2, 116, 46);
        g.generateTexture('btn_play', 120, 50);
        g.destroy();

        g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x2980b9, 1);
        g.fillRect(0, 0, 100, 40);
        g.fillStyle(0x3498db, 1);
        g.fillRect(2, 2, 96, 36);
        g.generateTexture('btn_small', 100, 40);
        g.destroy();

        g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xf39c12, 1);
        g.fillCircle(25, 25, 22);
        g.fillStyle(0xf1c40f, 1);
        g.fillCircle(25, 25, 18);
        g.generateTexture('btn_pause', 50, 50);
        g.destroy();

        g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x1a1a2e, 0.95);
        g.fillRect(0, 0, 300, 400);
        g.lineStyle(4, 0xf1c40f, 1);
        g.strokeRect(2, 2, 296, 396);
        g.generateTexture('panel', 300, 400);
        g.destroy();

        g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xf1c40f, 1);
        g.fillCircle(32, 24, 20);
        g.fillStyle(0xffd700, 1);
        g.fillCircle(32, 20, 8);
        g.generateTexture('star', 64, 64);
        g.destroy();

        g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x7f8c8d, 1);
        g.fillCircle(32, 24, 20);
        g.fillStyle(0x95a5a6, 1);
        g.fillCircle(32, 20, 8);
        g.generateTexture('star_empty', 64, 64);
        g.destroy();

        g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x7f8c8d, 1);
        g.fillRect(20, 28, 24, 20);
        g.fillStyle(0x95a5a6, 1);
        g.fillCircle(32, 24, 12);
        g.generateTexture('lock', 64, 64);
        g.destroy();
    }

    static generateBackgroundTextures(scene) {
        let g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x1a1a2e, 1);
        g.fillRect(0, 0, 480, 640);
        g.fillStyle(0x16213e, 1);
        g.fillRect(0, 0, 480, 320);
        for (let i = 0; i < 50; i++) {
            g.fillStyle(0xffffff, Math.random() * 0.1 + 0.02);
            g.fillCircle(Math.random() * 480, Math.random() * 640, Math.random() * 2 + 1);
        }
        g.generateTexture('background', 480, 640);
        g.destroy();

        g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x2c3e50, 0.5);
        g.fillRect(0, 0, 64, 64);
        g.generateTexture('tile_bg', 64, 64);
        g.destroy();
    }

    static generateAllTextures(scene) {
        this.generateCandyTextures(scene);
        this.generateSpecialCandyTextures(scene);
        this.generateParticleTextures(scene);
        this.generateUITextures(scene);
        this.generateBackgroundTextures(scene);
    }
}