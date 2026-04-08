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
        this.generateHorizontalCandy(scene);
        this.generateVerticalCandy(scene);
        this.generateColorBombCandy(scene);
    }

    static generateHorizontalCandy(scene) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        
        g.fillStyle(0x2c3e50, 1);
        g.fillCircle(32, 34, 28);
        g.fillStyle(0x3498db, 1);
        g.fillCircle(32, 32, 28);
        
        g.fillStyle(0xffffff, 1);
        g.fillRect(8, 28, 48, 8);
        g.fillStyle(0xf1c40f, 1);
        g.fillRect(10, 30, 44, 4);
        
        g.generateTexture('candy_horizontal', 64, 64);
        g.destroy();
    }

    static generateVerticalCandy(scene) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        
        g.fillStyle(0x2c3e50, 1);
        g.fillCircle(32, 34, 28);
        g.fillStyle(0xe74c3c, 1);
        g.fillCircle(32, 32, 28);
        
        g.fillStyle(0xffffff, 1);
        g.fillRect(28, 8, 8, 48);
        g.fillStyle(0xf1c40f, 1);
        g.fillRect(30, 10, 4, 44);
        
        g.generateTexture('candy_vertical', 64, 64);
        g.destroy();
    }

    static generateColorBombCandy(scene) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        
        g.fillStyle(0x2c3e50, 1);
        g.fillCircle(32, 34, 28);
        g.fillStyle(0x1a1a2e, 1);
        g.fillCircle(32, 32, 28);
        
        const colors = [0xe74c3c, 0xe67e22, 0xf1c40f, 0x2ecc71, 0x3498db, 0x9b59b6, 0xfd79a8];
        colors.forEach((color, i) => {
            const angle = (i / colors.length) * Math.PI * 2;
            const x = 32 + Math.cos(angle) * 14;
            const y = 32 + Math.sin(angle) * 14;
            g.fillStyle(color, 1);
            g.fillCircle(x, y, 5);
        });
        
        g.fillStyle(0xffffff, 0.8);
        g.fillCircle(26, 26, 4);
        
        g.generateTexture('candy_colorbomb', 64, 64);
        g.destroy();
    }

    static generateParticleTextures(scene) {
        const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#fd79a8'];
        
        colors.forEach((color, i) => {
            const g = scene.make.graphics({ x: 0, y: 0, add: false });
            g.fillStyle(Phaser.Display.Color.HexStringToColor(color).color, 1);
            g.fillCircle(8, 8, 8);
            g.generateTexture(`particle_${i}`, 16, 16);
            g.destroy();
        });
    }

    static generateUITextures(scene) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        
        g.fillStyle(0x2c3e50, 1);
        g.fillRoundedRect(0, 0, 200, 60, 12);
        g.fillStyle(0x34495e, 1);
        g.fillRoundedRect(4, 4, 192, 52, 10);
        g.generateTexture('button_large', 200, 60);
        g.destroy();

        const btn = scene.make.graphics({ x: 0, y: 0, add: false });
        btn.fillStyle(0x27ae60, 1);
        btn.fillRoundedRect(0, 0, 120, 50, 10);
        btn.fillStyle(0x2ecc71, 1);
        btn.fillRoundedRect(2, 2, 116, 46, 8);
        btn.generateTexture('btn_play', 120, 50);
        btn.destroy();

        const btnSmall = scene.make.graphics({ x: 0, y: 0, add: false });
        btnSmall.fillStyle(0x2980b9, 1);
        btnSmall.fillRoundedRect(0, 0, 100, 40, 8);
        btnSmall.fillStyle(0x3498db, 1);
        btnSmall.fillRoundedRect(2, 2, 96, 36, 6);
        btnSmall.generateTexture('btn_small', 100, 40);
        btnSmall.destroy();

        const btnPause = scene.make.graphics({ x: 0, y: 0, add: false });
        btnPause.fillStyle(0xf39c12, 1);
        btnPause.fillCircle(25, 25, 22);
        btnPause.fillStyle(0xf1c40f, 1);
        btnPause.fillCircle(25, 25, 18);
        btnPause.generateTexture('btn_pause', 50, 50);
        btnPause.destroy();

        const panel = scene.make.graphics({ x: 0, y: 0, add: false });
        panel.fillStyle(0x1a1a2e, 0.95);
        panel.fillRoundedRect(0, 0, 300, 400, 20);
        panel.lineStyle(4, 0xf1c40f, 1);
        panel.strokeRoundedRect(2, 2, 296, 396, 18);
        panel.generateTexture('panel', 300, 400);
        panel.destroy();

        const star = scene.make.graphics({ x: 0, y: 0, add: false });
        star.fillStyle(0xf1c40f, 1);
        star.fillPolygon(this.createStarPoints(32, 32, 5, 28, 14));
        star.generateTexture('star', 64, 64);
        star.destroy();

        const starEmpty = scene.make.graphics({ x: 0, y: 0, add: false });
        starEmpty.fillStyle(0x7f8c8d, 1);
        starEmpty.fillPolygon(this.createStarPoints(32, 32, 5, 28, 14));
        starEmpty.generateTexture('star_empty', 64, 64);
        starEmpty.destroy();

        const lock = scene.make.graphics({ x: 0, y: 0, add: false });
        lock.fillStyle(0x7f8c8d, 1);
        lock.fillRoundedRect(20, 28, 24, 20, 4);
        lock.fillStyle(0x95a5a6, 1);
        lock.fillCircle(32, 24, 12);
        lock.generateTexture('lock', 64, 64);
        lock.destroy();
    }

    static createStarPoints(centerX, centerY, points, outerRadius, innerRadius) {
        const coords = [];
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / points - Math.PI / 2;
            coords.push(centerX + Math.cos(angle) * radius);
            coords.push(centerY + Math.sin(angle) * radius);
        }
        return coords;
    }

    static generateBackgroundTextures(scene) {
        const bg = scene.make.graphics({ x: 0, y: 0, add: false });
        bg.fillStyle(0x1a1a2e, 1);
        bg.fillRect(0, 0, 480, 640);
        bg.fillStyle(0x16213e, 1);
        bg.fillRect(0, 0, 480, 320);
        
        for (let i = 0; i < 50; i++) {
            bg.fillStyle(0xffffff, Math.random() * 0.1 + 0.02);
            bg.fillCircle(Math.random() * 480, Math.random() * 640, Math.random() * 2 + 1);
        }
        bg.generateTexture('background', 480, 640);
        bg.destroy();

        const tileBg = scene.make.graphics({ x: 0, y: 0, add: false });
        tileBg.fillStyle(0x2c3e50, 0.5);
        tileBg.fillRoundedRect(0, 0, 64, 64, 8);
        tileBg.generateTexture('tile_bg', 64, 64);
        tileBg.destroy();
    }

    static generateAllTextures(scene) {
        this.generateCandyTextures(scene);
        this.generateSpecialCandyTextures(scene);
        this.generateParticleTextures(scene);
        this.generateUITextures(scene);
        this.generateBackgroundTextures(scene);
    }
}
