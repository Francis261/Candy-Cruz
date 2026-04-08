var Game = (() => {
  // src/utils/AssetGenerator.js
  var AssetGenerator = class {
    static generateCandyTextures(scene) {
      const colors = {
        red: { main: "#e74c3c", light: "#ff6b6b", dark: "#c0392b" },
        orange: { main: "#e67e22", light: "#f39c12", dark: "#d35400" },
        yellow: { main: "#f1c40f", light: "#f9e79f", dark: "#d4ac0d" },
        green: { main: "#2ecc71", light: "#58d68d", dark: "#27ae60" },
        blue: { main: "#3498db", light: "#5dade2", dark: "#2980b9" },
        purple: { main: "#9b59b6", light: "#af7ac5", dark: "#8e44ad" },
        pink: { main: "#fd79a8", light: "#ff9ff3", dark: "#e84393" }
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
      h.fillStyle(2899536, 1);
      h.fillCircle(32, 34, 28);
      h.fillStyle(3447003, 1);
      h.fillCircle(32, 32, 28);
      h.fillStyle(16777215, 1);
      h.fillRect(8, 28, 48, 8);
      h.fillStyle(15844367, 1);
      h.fillRect(10, 30, 44, 4);
      h.generateTexture("candy_horizontal", 64, 64);
      h.destroy();
      const v = scene.make.graphics({ x: 0, y: 0, add: false });
      v.fillStyle(2899536, 1);
      v.fillCircle(32, 34, 28);
      v.fillStyle(15158332, 1);
      v.fillCircle(32, 32, 28);
      v.fillStyle(16777215, 1);
      v.fillRect(28, 8, 8, 48);
      v.fillStyle(15844367, 1);
      v.fillRect(30, 10, 4, 44);
      v.generateTexture("candy_vertical", 64, 64);
      v.destroy();
      const cb = scene.make.graphics({ x: 0, y: 0, add: false });
      cb.fillStyle(2899536, 1);
      cb.fillCircle(32, 34, 28);
      cb.fillStyle(1710638, 1);
      cb.fillCircle(32, 32, 28);
      [15158332, 15105570, 15844367, 3066993, 3447003, 10181046, 16611752].forEach((color, i) => {
        const angle = i / 7 * Math.PI * 2;
        cb.fillStyle(color, 1);
        cb.fillCircle(32 + Math.cos(angle) * 14, 32 + Math.sin(angle) * 14, 5);
      });
      cb.fillStyle(16777215, 0.8);
      cb.fillCircle(26, 26, 4);
      cb.generateTexture("candy_colorbomb", 64, 64);
      cb.destroy();
    }
    static generateParticleTextures(scene) {
      ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#3498db", "#9b59b6", "#fd79a8"].forEach((color, i) => {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(Phaser.Display.Color.HexStringToColor(color).color, 1);
        g.fillCircle(8, 8, 8);
        g.generateTexture(`particle_${i}`, 16, 16);
        g.destroy();
      });
    }
    static generateUITextures(scene) {
      let g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(2899536, 1);
      g.fillRect(0, 0, 200, 60);
      g.fillStyle(3426654, 1);
      g.fillRect(4, 4, 192, 52);
      g.generateTexture("button_large", 200, 60);
      g.destroy();
      g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(2600544, 1);
      g.fillRect(0, 0, 120, 50);
      g.fillStyle(3066993, 1);
      g.fillRect(2, 2, 116, 46);
      g.generateTexture("btn_play", 120, 50);
      g.destroy();
      g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(2719929, 1);
      g.fillRect(0, 0, 100, 40);
      g.fillStyle(3447003, 1);
      g.fillRect(2, 2, 96, 36);
      g.generateTexture("btn_small", 100, 40);
      g.destroy();
      g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(15965202, 1);
      g.fillCircle(25, 25, 22);
      g.fillStyle(15844367, 1);
      g.fillCircle(25, 25, 18);
      g.generateTexture("btn_pause", 50, 50);
      g.destroy();
      g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(1710638, 0.95);
      g.fillRect(0, 0, 300, 400);
      g.lineStyle(4, 15844367, 1);
      g.strokeRect(2, 2, 296, 396);
      g.generateTexture("panel", 300, 400);
      g.destroy();
      g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(15844367, 1);
      g.fillCircle(32, 24, 20);
      g.fillStyle(16766720, 1);
      g.fillCircle(32, 20, 8);
      g.generateTexture("star", 64, 64);
      g.destroy();
      g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(8359053, 1);
      g.fillCircle(32, 24, 20);
      g.fillStyle(9807270, 1);
      g.fillCircle(32, 20, 8);
      g.generateTexture("star_empty", 64, 64);
      g.destroy();
      g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(8359053, 1);
      g.fillRect(20, 28, 24, 20);
      g.fillStyle(9807270, 1);
      g.fillCircle(32, 24, 12);
      g.generateTexture("lock", 64, 64);
      g.destroy();
    }
    static generateBackgroundTextures(scene) {
      let g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(1710638, 1);
      g.fillRect(0, 0, 480, 640);
      g.fillStyle(1450302, 1);
      g.fillRect(0, 0, 480, 320);
      for (let i = 0; i < 50; i++) {
        g.fillStyle(16777215, Math.random() * 0.1 + 0.02);
        g.fillCircle(Math.random() * 480, Math.random() * 640, Math.random() * 2 + 1);
      }
      g.generateTexture("background", 480, 640);
      g.destroy();
      g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(2899536, 0.5);
      g.fillRect(0, 0, 64, 64);
      g.generateTexture("tile_bg", 64, 64);
      g.destroy();
    }
    static generateAllTextures(scene) {
      this.generateCandyTextures(scene);
      this.generateSpecialCandyTextures(scene);
      this.generateParticleTextures(scene);
      this.generateUITextures(scene);
      this.generateBackgroundTextures(scene);
    }
  };

  // src/scenes/BootScene.js
  var BootScene = class extends Phaser.Scene {
    constructor() {
      super({ key: "BootScene" });
    }
    preload() {
      this.createLoadingBar();
    }
    createLoadingBar() {
      const width = this.cameras.main.width;
      const height = this.cameras.main.height;
      const bg = this.add.rectangle(width / 2, height / 2, 300, 40, 2899536);
      const bar = this.add.rectangle(width / 2 - 145, height / 2, 0, 30, 15844367);
      this.load.on("progress", (value) => {
        bar.width = 290 * value;
      });
      this.add.text(width / 2, height / 2 - 50, "Loading Candy Cruz...", {
        fontSize: "24px",
        fontFamily: "Arial",
        color: "#f1c40f",
        bold: true
      }).setOrigin(0.5);
    }
    create() {
      AssetGenerator.generateAllTextures(this);
      this.scene.start("MainMenu");
    }
  };

  // src/utils/AudioManager.js
  var AudioManager = class {
    constructor(scene) {
      this.scene = scene;
      this.enabled = localStorage.getItem("candycruz_sound") !== "false";
      this.sounds = {};
      this.music = null;
      this.createSounds();
    }
    createSounds() {
      try {
        this.sounds.swap = this.createSound("swap", 300, "sine", 0.3);
        this.sounds.match = this.createSound("match", 500, "sine", 0.4);
        this.sounds.special = this.createSound("special", 700, "triangle", 0.5);
        this.sounds.invalid = this.createSound("invalid", 150, "square", 0.2);
        this.sounds.click = this.createSound("click", 600, "sine", 0.2);
        this.sounds.levelComplete = this.createSound("levelComplete", [400, 500, 600, 800], "sine", 0.4);
        this.sounds.gameOver = this.createSound("gameOver", [500, 400, 300, 200], "sawtooth", 0.3);
      } catch (e) {
        console.log("Audio not available, using silent fallback");
      }
    }
    createSound(key, frequencies, type, volume) {
      try {
        const durations = { swap: 100, match: 200, special: 300, invalid: 100, click: 50, levelComplete: 600, gameOver: 800 };
        const duration = durations[key] || 200;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.type = type;
        oscillator.frequency.value = Array.isArray(frequencies) ? frequencies[0] : frequencies;
        gainNode.gain.value = 0;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        return {
          play: () => {
            if (!this.enabled) return;
            try {
              const ctx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = type;
              const freqs = Array.isArray(frequencies) ? frequencies : [frequencies];
              let freqIndex = 0;
              osc.frequency.value = freqs[freqIndex];
              if (freqs.length > 1) {
                setInterval(() => {
                  freqIndex = (freqIndex + 1) % freqs.length;
                  osc.frequency.value = freqs[freqIndex];
                }, duration / freqs.length);
              }
              gain.gain.setValueAtTime(0, ctx.currentTime);
              gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
              gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration / 1e3);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + duration / 1e3);
            } catch (e) {
            }
          }
        };
      } catch (e) {
        return { play: () => {
        } };
      }
    }
    play(key) {
      if (this.sounds[key] && this.enabled) {
        this.sounds[key].play();
      }
    }
    playChain(chainCount) {
      if (!this.enabled || !this.sounds.match) return;
      const baseFreq = 400 + chainCount * 100;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(baseFreq + 200, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) {
      }
    }
    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem("candycruz_sound", this.enabled);
      return this.enabled;
    }
    setEnabled(enabled) {
      this.enabled = enabled;
      localStorage.setItem("candycruz_sound", enabled);
    }
  };

  // src/scenes/MainMenu.js
  var MainMenu = class extends Phaser.Scene {
    constructor() {
      super({ key: "MainMenu" });
    }
    create() {
      this.audioManager = new AudioManager(this);
      this.drawBackground();
      this.createTitle();
      this.createButtons();
      this.createParticles();
    }
    drawBackground() {
      this.add.image(0, 0, "background").setOrigin(0, 0);
      for (let i = 0; i < 7; i++) {
        const x = Math.random() * GAME_WIDTH;
        const y = Math.random() * GAME_HEIGHT;
        const candy = this.add.image(x, y, `candy_${["red", "orange", "yellow", "green", "blue", "purple", "pink"][i]}`);
        candy.setAlpha(0.2);
        candy.setScale(0.8);
      }
    }
    createTitle() {
      const titleShadow = this.add.text(GAME_WIDTH / 2 + 4, 120 + 4, "Candy Cruz", {
        fontSize: "56px",
        fontFamily: "Arial Black, Arial",
        color: "#1a1a2e",
        bold: true
      }).setOrigin(0.5);
      const title = this.add.text(GAME_WIDTH / 2, 120, "Candy Cruz", {
        fontSize: "56px",
        fontFamily: "Arial Black, Arial",
        color: "#f1c40f",
        bold: true,
        stroke: "#e67e22",
        strokeThickness: 6
      }).setOrigin(0.5);
      this.add.text(GAME_WIDTH / 2, 180, "Match 3 Puzzle", {
        fontSize: "24px",
        fontFamily: "Arial",
        color: "#3498db"
      }).setOrigin(0.5);
    }
    createButtons() {
      const centerX = GAME_WIDTH / 2;
      const startY = 280;
      const spacing = 70;
      this.createButton(centerX, startY, "PLAY", "btn_play", () => {
        this.audioManager.play("click");
        this.scene.start("LevelSelect");
      });
      this.createButton(centerX, startY + spacing, "OPTIONS", "btn_small", () => {
        this.audioManager.play("click");
        this.showOptions();
      });
      this.createButton(centerX, startY + spacing * 2, "HOW TO PLAY", "btn_small", () => {
        this.audioManager.play("click");
        this.showHelp();
      });
    }
    createButton(x, y, text, texture, callback) {
      const btn = this.add.image(x, y, texture).setInteractive({ useHandCursor: true });
      const label = this.add.text(x, y, text, {
        fontSize: "20px",
        fontFamily: "Arial",
        color: "#ffffff",
        bold: true
      }).setOrigin(0.5);
      btn.on("pointerover", () => {
        btn.setScale(1.05);
        label.setScale(1.05);
      });
      btn.on("pointerout", () => {
        btn.setScale(1);
        label.setScale(1);
      });
      btn.on("pointerdown", callback);
      return { btn, label };
    }
    showOptions() {
      const overlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0, 0.7);
      const panel = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "panel");
      const title = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 150, "Options", {
        fontSize: "28px",
        fontFamily: "Arial Black",
        color: "#f1c40f"
      }).setOrigin(0.5);
      const soundText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 80, "Sound: ON", {
        fontSize: "22px",
        fontFamily: "Arial",
        color: "#ffffff"
      }).setOrigin(0.5);
      const soundBtn = this.add.image(GAME_WIDTH / 2 + 100, GAME_HEIGHT / 2 - 80, "btn_small").setInteractive({ useHandCursor: true });
      this.add.text(GAME_WIDTH / 2 + 100, GAME_HEIGHT / 2 - 80, "TOGGLE", {
        fontSize: "14px",
        fontFamily: "Arial",
        color: "#ffffff"
      }).setOrigin(0.5);
      soundBtn.on("pointerdown", () => {
        const enabled = this.audioManager.toggle();
        soundText.setText(`Sound: ${enabled ? "ON" : "OFF"}`);
        this.audioManager.play("click");
      });
      const closeBtn = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 120, "btn_small").setInteractive({ useHandCursor: true });
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 120, "CLOSE", {
        fontSize: "16px",
        fontFamily: "Arial",
        color: "#ffffff"
      }).setOrigin(0.5);
      closeBtn.on("pointerdown", () => {
        overlay.destroy();
        panel.destroy();
        title.destroy();
        soundText.destroy();
        soundBtn.destroy();
        closeBtn.destroy();
      });
    }
    showHelp() {
      const overlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0, 0.7);
      const panel = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "panel");
      const title = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 150, "How to Play", {
        fontSize: "28px",
        fontFamily: "Arial Black",
        color: "#f1c40f"
      }).setOrigin(0.5);
      const helpText = [
        "Match 3 or more candies",
        "of the same color in a row",
        "or column to score points!",
        "",
        "Special Candies:",
        "- Horizontal: Clears row",
        "- Vertical: Clears column",
        "- Color Bomb: Clears all",
        "  of one color",
        "",
        "Complete objectives within",
        "moves limit to win!"
      ];
      helpText.forEach((line, i) => {
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 80 + i * 22, line, {
          fontSize: "14px",
          fontFamily: "Arial",
          color: "#ecf0f1"
        }).setOrigin(0.5);
      });
      const closeBtn = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 130, "btn_small").setInteractive({ useHandCursor: true });
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 130, "CLOSE", {
        fontSize: "16px",
        fontFamily: "Arial",
        color: "#ffffff"
      }).setOrigin(0.5);
      closeBtn.on("pointerdown", () => {
        overlay.destroy();
        panel.destroy();
        title.destroy();
        closeBtn.destroy();
      });
    }
    createParticles() {
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * GAME_WIDTH;
        const y = GAME_HEIGHT + Math.random() * 100;
        const candy = this.add.image(x, y, `candy_${["red", "orange", "yellow", "green", "blue", "purple", "pink"][Math.floor(Math.random() * 7)]}`);
        candy.setAlpha(0.6);
        candy.setScale(0.5 + Math.random() * 0.5);
        this.tweens.add({
          targets: candy,
          y: -50,
          duration: 3e3 + Math.random() * 4e3,
          repeat: -1,
          yoyo: true
        });
      }
    }
  };

  // src/scenes/LevelSelect.js
  var LevelSelect = class extends Phaser.Scene {
    constructor() {
      super({ key: "LevelSelect" });
    }
    create() {
      this.audioManager = new AudioManager(this);
      this.unlockedLevel = this.getUnlockedLevel();
      this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
      this.createHeader();
      this.createLevelGrid();
      this.createBackButton();
      this.createScrollbar();
    }
    getUnlockedLevel() {
      const saved = localStorage.getItem(STORAGE_KEYS.LEVEL_PROGRESS);
      return saved ? parseInt(saved) : 1;
    }
    createHeader() {
      this.add.rectangle(GAME_WIDTH / 2, 50, GAME_WIDTH, 80, 1710638, 0.9);
      const title = this.add.text(GAME_WIDTH / 2, 50, "LEVELS", {
        fontSize: "36px",
        fontFamily: "Arial",
        color: "#f1c40f",
        bold: true
      }).setOrigin(0.5);
      const subtitle = this.add.text(GAME_WIDTH / 2, 85, `Level ${this.unlockedLevel} of 50`, {
        fontSize: "14px",
        fontFamily: "Arial",
        color: "#7f8c8d"
      }).setOrigin(0.5);
    }
    createLevelGrid() {
      this.levelContainer = this.add.container(0, 100);
      this.page = 0;
      this.levelsPerPage = 20;
      const cols = 4;
      const cellW = 100;
      const cellH = 100;
      const startX = (GAME_WIDTH - cols * cellW) / 2 + cellW / 2;
      this.updateLevelButtons(startX, cellW, cellH, cols);
    }
    updateLevelButtons(startX, cellW, cellH, cols) {
      this.levelContainer.removeAll(true);
      const startLevel = this.page * this.levelsPerPage;
      const endLevel = Math.min(startLevel + this.levelsPerPage, LEVELS.length);
      for (let i = startLevel; i < endLevel; i++) {
        const col = (i - startLevel) % cols;
        const row = Math.floor((i - startLevel) / cols);
        const x = startX + col * cellW;
        const y = 40 + row * cellH;
        const level = LEVELS[i];
        const isUnlocked = i + 1 <= this.unlockedLevel;
        this.createLevelCard(x, y, level.id, level.scoreTarget, isUnlocked);
      }
    }
    createLevelCard(x, y, levelNum, score, isUnlocked) {
      const card = this.add.container(x, y);
      const bg = this.add.rectangle(0, 0, 85, 85, isUnlocked ? 2899536 : 3426654);
      if (!isUnlocked) bg.setAlpha(0.5);
      card.add(bg);
      if (isUnlocked) {
        const num = this.add.text(0, -15, `${levelNum}`, {
          fontSize: "28px",
          fontFamily: "Arial",
          color: "#f1c40f",
          bold: true
        }).setOrigin(0.5);
        card.add(num);
        const txt = this.add.text(0, 15, `${score}`, {
          fontSize: "12px",
          fontFamily: "Arial",
          color: "#95a5a6"
        }).setOrigin(0.5);
        card.add(txt);
        card.setSize(85, 85);
        card.setInteractive({ useHandCursor: true });
        card.on("pointerover", () => {
          this.tweens.add({ targets: card, scaleX: 1.1, scaleY: 1.1, duration: 100 });
        });
        card.on("pointerout", () => {
          this.tweens.add({ targets: card, scaleX: 1, scaleY: 1, duration: 100 });
        });
        card.on("pointerdown", () => {
          this.audioManager.play("click");
          this.scene.start("GameScene", { level: levelNum });
        });
      } else {
        const lock = this.add.text(0, 0, "\u{1F512}", {
          fontSize: "24px"
        }).setOrigin(0.5);
        card.add(lock);
        const num = this.add.text(0, -15, `${levelNum}`, {
          fontSize: "20px",
          fontFamily: "Arial",
          color: "#7f8c8d"
        }).setOrigin(0.5);
        card.add(num);
      }
    }
    createScrollbar() {
      this.add.rectangle(GAME_WIDTH - 20, GAME_HEIGHT / 2 + 50, 15, 300, 1710638, 0.8);
      const totalPages = Math.ceil(LEVELS.length / this.levelsPerPage);
      const btnY = 150 + this.page / (totalPages - 1) * 250;
      this.scrollThumb = this.add.rectangle(GAME_WIDTH - 20, btnY, 15, 30, 15844367);
      this.add.text(GAME_WIDTH - 40, 130, "\u25C0", {
        fontSize: "20px",
        color: "#7f8c8d"
      }).setInteractive({ useHandCursor: true }).on("pointerdown", () => this.prevPage());
      this.add.text(GAME_WIDTH - 40, GAME_HEIGHT - 80, "\u25B6", {
        fontSize: "20px",
        color: "#7f8c8d"
      }).setInteractive({ useHandCursor: true }).on("pointerdown", () => this.nextPage());
    }
    prevPage() {
      if (this.page > 0) {
        this.page--;
        this.updateLevelButtons(100, 100, 100, 4);
        this.updateScrollbar();
      }
    }
    nextPage() {
      const totalPages = Math.ceil(LEVELS.length / this.levelsPerPage);
      if (this.page < totalPages - 1) {
        this.page++;
        this.updateLevelButtons(100, 100, 100, 4);
        this.updateScrollbar();
      }
    }
    updateScrollbar() {
      const totalPages = Math.ceil(LEVELS.length / this.levelsPerPage);
      const btnY = 150 + this.page / Math.max(1, totalPages - 1) * 250;
      this.tweens.add({ targets: this.scrollThumb, y: btnY, duration: 200 });
    }
    createBackButton() {
      const btn = this.add.container(60, GAME_HEIGHT - 40);
      const bg = this.add.rectangle(0, 0, 100, 40, 2719929);
      const text = this.add.text(0, 0, "\u2190 BACK", {
        fontSize: "16px",
        fontFamily: "Arial",
        color: "#ffffff"
      }).setOrigin(0.5);
      btn.add([bg, text]);
      btn.setSize(100, 40);
      btn.setInteractive({ useHandCursor: true });
      btn.on("pointerover", () => btn.setScale(1.05));
      btn.on("pointerout", () => btn.setScale(1));
      btn.on("pointerdown", () => {
        this.audioManager.play("click");
        this.scene.start("MainMenu");
      });
    }
  };

  // src/scenes/GameScene.js
  var GameScene = class extends Phaser.Scene {
    constructor() {
      super({ key: "GameScene" });
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
      this.scene.launch("UIScene");
      this.createGrid();
      this.startGame();
    }
    setupBackground() {
      this.add.image(0, 0, "background").setOrigin(0, 0);
      const gridBg = this.add.rectangle(
        GAME_WIDTH / 2,
        GRID_OFFSET_Y + GRID_ROWS * TILE_SIZE / 2,
        GRID_COLS * TILE_SIZE + 20,
        GRID_ROWS * TILE_SIZE + 20,
        1710638,
        0.6
      );
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          const x = GRID_OFFSET_X + col * TILE_SIZE + TILE_SIZE / 2;
          const y = GRID_OFFSET_Y + row * TILE_SIZE + TILE_SIZE / 2;
          this.add.image(x, y, "tile_bg").setAlpha(0.3);
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
      if (specialType === SPECIAL_TYPES.HORIZONTAL) texture = "candy_horizontal";
      if (specialType === SPECIAL_TYPES.VERTICAL) texture = "candy_vertical";
      if (specialType === SPECIAL_TYPES.COLOR_BOMB) texture = "candy_colorbomb";
      const candy = this.add.image(x, y, texture);
      candy.setInteractive({ useHandCursor: true });
      candy.setData("row", row);
      candy.setData("col", col);
      candy.setData("type", type);
      candy.setData("special", specialType);
      candy.setScale(0);
      this.tweens.add({
        targets: candy,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: "Back.easeOut"
      });
      candy.on("pointerdown", () => this.onCandyClick(candy));
      return candy;
    }
    onCandyClick(candy) {
      if (this.isProcessing || this.isGameOver) return;
      this.audioManager.play("click");
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
        const row = candy.getData("row");
        const col = candy.getData("col");
        const selectedRow = this.selectedTile.getData("row");
        const selectedCol = this.selectedTile.getData("col");
        const isAdjacent = Math.abs(row - selectedRow) === 1 && col === selectedCol || Math.abs(col - selectedCol) === 1 && row === selectedRow;
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
      const row1 = candy1.getData("row");
      const col1 = candy1.getData("col");
      const row2 = candy2.getData("row");
      const col2 = candy2.getData("col");
      const x1 = GRID_OFFSET_X + col1 * TILE_SIZE + TILE_SIZE / 2;
      const y1 = GRID_OFFSET_Y + row1 * TILE_SIZE + TILE_SIZE / 2;
      const x2 = GRID_OFFSET_X + col2 * TILE_SIZE + TILE_SIZE / 2;
      const y2 = GRID_OFFSET_Y + row2 * TILE_SIZE + TILE_SIZE / 2;
      this.audioManager.play("swap");
      this.tweens.add({
        targets: [candy1, candy2],
        x: [x2, x1],
        y: [y2, y1],
        duration: 200,
        ease: "Power2",
        onComplete: () => {
          candy1.setData("row", row2);
          candy1.setData("col", col2);
          candy2.setData("row", row1);
          candy2.setData("col", col1);
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
              ease: "Power2",
              onComplete: () => {
                candy1.setData("row", row1);
                candy1.setData("col", col1);
                candy2.setData("row", row2);
                candy2.setData("col", col2);
                this.grid[row1][col1] = candy1;
                this.grid[row2][col2] = candy2;
                this.isProcessing = false;
                this.selectedTile = null;
                this.audioManager.play("invalid");
              }
            });
          }
        }
      });
    }
    findMatches() {
      const matches = [];
      const checked = /* @__PURE__ */ new Set();
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          const candy = this.grid[row][col];
          if (!candy) continue;
          const type = candy.getData("type");
          const hMatch = this.getHorizontalMatch(row, col, type);
          const vMatch = this.getVerticalMatch(row, col, type);
          if (hMatch.length >= 3) {
            const key = hMatch.map((c) => `${c.row},${c.col}`).join("|");
            if (!checked.has(key)) {
              matches.push(hMatch);
              checked.add(key);
            }
          }
          if (vMatch.length >= 3) {
            const key = vMatch.map((c) => `${c.row},${c.col}`).join("|");
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
        if (!candy || candy.getData("type") !== type) break;
        match.unshift({ row, col: c });
      }
      for (let c = col + 1; c < GRID_COLS; c++) {
        const candy = this.grid[row][c];
        if (!candy || candy.getData("type") !== type) break;
        match.push({ row, col: c });
      }
      return match.length >= 3 ? match : [];
    }
    getVerticalMatch(row, col, type) {
      const match = [{ row, col }];
      for (let r = row - 1; r >= 0; r--) {
        const candy = this.grid[r][col];
        if (!candy || candy.getData("type") !== type) break;
        match.unshift({ row: r, col });
      }
      for (let r = row + 1; r < GRID_ROWS; r++) {
        const candy = this.grid[r][col];
        if (!candy || candy.getData("type") !== type) break;
        match.push({ row: r, col });
      }
      return match.length >= 3 ? match : [];
    }
    processMatches(matches) {
      this.chainCount++;
      const allPositions = [];
      const specialsToCreate = [];
      const colorBombActivations = [];
      matches.forEach((match) => {
        let hasHorizontal = false;
        let hasVertical = false;
        match.forEach((pos) => {
          const candy = this.grid[pos.row][pos.col];
          if (candy) {
            const special = candy.getData("special");
            if (special === SPECIAL_TYPES.HORIZONTAL) hasHorizontal = true;
            if (special === SPECIAL_TYPES.VERTICAL) hasVertical = true;
            if (special === SPECIAL_TYPES.COLOR_BOMB) {
              colorBombActivations.push({ row: pos.row, col: pos.col, type: candy.getData("type") });
            }
            allPositions.push(pos);
          }
        });
        if (match.length >= 4 && !hasHorizontal && !hasVertical) {
          const midIndex = Math.floor(match.length / 2);
          specialsToCreate.push({
            row: match[midIndex].row,
            col: match[midIndex].col,
            type: "horizontal",
            matchLength: match.length
          });
        }
        if (match.length >= 5) {
          const midIndex = Math.floor(match.length / 2);
          specialsToCreate.push({
            row: match[midIndex].row,
            col: match[midIndex].col,
            type: "colorbomb"
          });
        }
      });
      if (colorBombActivations.length > 0) {
        const extraPositions = [];
        colorBombActivations.forEach((cb) => {
          const targetType = cb.type;
          for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS; col++) {
              const candy = this.grid[row][col];
              if (candy && candy.getData("type") === targetType) {
                extraPositions.push({ row, col });
              }
            }
          }
        });
        allPositions.push(...extraPositions);
      }
      this.removeMatches(allPositions, () => {
        specialsToCreate.forEach((spec) => {
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
      const toRemove = [...new Set(positions.map((p) => `${p.row},${p.col}`))].map((s) => {
        const [row, col] = s.split(",").map(Number);
        return { row, col };
      });
      let removed = 0;
      const specials = [];
      toRemove.forEach((pos) => {
        const candy = this.grid[pos.row][pos.col];
        if (candy) {
          const special = candy.getData("special");
          if (special === SPECIAL_TYPES.HORIZONTAL) {
            specials.push({ type: "horizontal", row: pos.row, col: pos.col });
          } else if (special === SPECIAL_TYPES.VERTICAL) {
            specials.push({ type: "vertical", row: pos.row, col: pos.col });
          }
          this.createParticles(candy.x, candy.y, candy.getData("type"));
          this.tweens.add({
            targets: candy,
            scaleX: 0,
            scaleY: 0,
            alpha: 0,
            duration: 200,
            ease: "Power2",
            onComplete: () => {
              candy.destroy();
              removed++;
              if (removed === toRemove.length) {
                specials.forEach((spec) => this.activateSpecial(spec));
                callback();
              }
            }
          });
          this.grid[pos.row][pos.col] = null;
        }
      });
      if (toRemove.length === 0) callback();
      this.audioManager.play("match");
    }
    activateSpecial(special) {
      const { type, row, col } = special;
      if (type === "horizontal") {
        for (let c = 0; c < GRID_COLS; c++) {
          const candy = this.grid[row][c];
          if (candy) {
            this.createParticles(candy.x, candy.y, candy.getData("type"));
            candy.destroy();
            this.grid[row][c] = null;
          }
        }
        this.createExplosionLine(GRID_OFFSET_Y + row * TILE_SIZE + TILE_SIZE / 2, "horizontal");
      }
      if (type === "vertical") {
        for (let r = 0; r < GRID_ROWS; r++) {
          const candy = this.grid[r][col];
          if (candy) {
            this.createParticles(candy.x, candy.y, candy.getData("type"));
            candy.destroy();
            this.grid[r][col] = null;
          }
        }
        this.createExplosionLine(GRID_OFFSET_X + col * TILE_SIZE + TILE_SIZE / 2, "vertical");
      }
      this.audioManager.play("special");
    }
    createExplosionLine(pos, direction) {
      const graphics = this.add.graphics();
      graphics.lineStyle(4, 15844367, 1);
      if (direction === "horizontal") {
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
      let texture = "";
      if (type === "horizontal") {
        specialType = SPECIAL_TYPES.HORIZONTAL;
        texture = "candy_horizontal";
      } else if (type === "vertical") {
        specialType = SPECIAL_TYPES.VERTICAL;
        texture = "candy_vertical";
      } else if (type === "colorbomb") {
        specialType = SPECIAL_TYPES.COLOR_BOMB;
        texture = "candy_colorbomb";
      }
      const candy = this.add.image(x, y, texture);
      candy.setData("row", row);
      candy.setData("col", col);
      candy.setData("type", "special");
      candy.setData("special", specialType);
      candy.setInteractive({ useHandCursor: true });
      candy.on("pointerdown", () => this.onCandyClick(candy));
      this.grid[row][col] = candy;
      this.tweens.add({
        targets: candy,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: "Back.easeOut"
      });
    }
    createParticles(x, y, type) {
      const colors = {
        red: 15158332,
        orange: 15105570,
        yellow: 15844367,
        green: 3066993,
        blue: 3447003,
        purple: 10181046,
        pink: 16611752
      };
      const color = colors[type] || 16777215;
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
          ease: "Power2",
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
            candy.setData("row", newRow);
            const targetY = GRID_OFFSET_Y + newRow * TILE_SIZE + TILE_SIZE / 2;
            this.tweens.add({
              targets: candy,
              y: targetY,
              duration: 150,
              ease: "Power2"
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
            candy.setData("row", row);
            candy.setData("col", col);
            candy.setData("type", type);
            candy.setData("special", SPECIAL_TYPES.NONE);
            candy.setInteractive({ useHandCursor: true });
            candy.on("pointerdown", () => this.onCandyClick(candy));
            const startY = GRID_OFFSET_Y - (emptyCount - refillIndex) * TILE_SIZE + TILE_SIZE / 2;
            candy.y = startY;
            this.tweens.add({
              targets: candy,
              y,
              duration: 200,
              delay: refillIndex * 50,
              ease: "Power2"
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
      this.scene.get("UIScene").updateScore(this.score);
      this.scene.get("UIScene").updateMoves(this.movesLeft);
    }
    checkGameState() {
      if (this.score >= this.levelData.scoreTarget) {
        this.isGameOver = true;
        this.time.delayedCall(500, () => {
          this.scene.get("UIScene").showLevelComplete(this.score);
        });
      } else if (this.movesLeft <= 0) {
        this.isGameOver = true;
        this.time.delayedCall(500, () => {
          this.scene.get("UIScene").showGameOver(this.score);
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
        this.grid[row1][col1].setData("row", row1);
        this.grid[row1][col1].setData("col", col1);
      }
      if (this.grid[row2][col2]) {
        this.grid[row2][col2].setData("row", row2);
        this.grid[row2][col2].setData("col", col2);
      }
    }
    shuffleBoard() {
      const allCandies = [];
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          if (this.grid[row][col]) {
            allCandies.push({
              row,
              col,
              type: this.grid[row][col].getData("type"),
              special: this.grid[row][col].getData("special")
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
          this.grid[row][col].setData("type", candyData.type);
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
      this.scene.get("UIScene").initUI(this.levelId, this.levelData.scoreTarget, this.movesLeft);
      this.updateUI();
    }
    pauseGame() {
      this.scene.pause();
      this.scene.launch("PauseScene");
    }
  };

  // src/scenes/UIScene.js
  var UIScene = class extends Phaser.Scene {
    constructor() {
      super({ key: "UIScene" });
    }
    create() {
      this.createTopBar();
      this.createPauseButton();
    }
    createTopBar() {
      const barHeight = 70;
      const bg = this.add.rectangle(GAME_WIDTH / 2, barHeight / 2, GAME_WIDTH, barHeight, 1710638, 0.9);
      this.add.text(20, 20, "LEVEL", {
        fontSize: "14px",
        fontFamily: "Arial",
        color: "#7f8c8d"
      });
      this.levelText = this.add.text(20, 38, "1", {
        fontSize: "28px",
        fontFamily: "Arial Black",
        color: "#f1c40f"
      });
      const scoreLabel = this.add.text(GAME_WIDTH / 2, 20, "SCORE", {
        fontSize: "14px",
        fontFamily: "Arial",
        color: "#7f8c8d"
      }).setOrigin(0.5);
      this.scoreText = this.add.text(GAME_WIDTH / 2, 42, "0", {
        fontSize: "24px",
        fontFamily: "Arial Black",
        color: "#ffffff"
      }).setOrigin(0.5);
      this.add.text(GAME_WIDTH - 20, 20, "MOVES", {
        fontSize: "14px",
        fontFamily: "Arial",
        color: "#7f8c8d"
      }).setOrigin(1, 0);
      this.movesText = this.add.text(GAME_WIDTH - 20, 42, "30", {
        fontSize: "28px",
        fontFamily: "Arial Black",
        color: "#3498db"
      }).setOrigin(1, 0);
    }
    createPauseButton() {
      const btn = this.add.image(GAME_WIDTH - 30, GAME_HEIGHT - 30, "btn_pause").setInteractive({ useHandCursor: true });
      btn.on("pointerdown", () => {
        const gameScene = this.scene.get("GameScene");
        gameScene.pauseGame();
      });
    }
    initUI(levelId, scoreTarget, moves) {
      this.levelText.setText(`${levelId}`);
      this.scoreText.setText("0");
      this.movesText.setText(`${moves}`);
      this.score = 0;
      this.targetScore = scoreTarget;
      this.moves = moves;
    }
    updateScore(score) {
      this.score = score;
      this.scoreText.setText(`${score}`);
      if (score >= this.targetScore) {
        this.scoreText.setColor("#2ecc71");
      }
    }
    updateMoves(moves) {
      this.moves = moves;
      this.movesText.setText(`${moves}`);
      if (moves <= 5) {
        this.movesText.setColor("#e74c3c");
      } else if (moves <= 10) {
        this.movesText.setColor("#f39c12");
      }
    }
    showGameOver(finalScore) {
      this.scene.start("GameOverScene", { score: finalScore, level: this.levelText.text });
    }
    showLevelComplete(finalScore) {
      const stars = this.calculateStars(finalScore);
      this.scene.start("LevelCompleteScene", {
        score: finalScore,
        level: this.levelText.text,
        stars
      });
    }
    calculateStars(score) {
      const ratio = score / this.targetScore;
      if (ratio >= 2) return 3;
      if (ratio >= 1.5) return 2;
      return 1;
    }
  };

  // src/scenes/PauseScene.js
  var PauseScene = class extends Phaser.Scene {
    constructor() {
      super({ key: "PauseScene" });
    }
    create() {
      this.audioManager = new AudioManager(this);
      this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0, 0.7);
      const panel = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "panel");
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 130, "PAUSED", {
        fontSize: "36px",
        fontFamily: "Arial Black",
        color: "#f1c40f"
      }).setOrigin(0.5);
      this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, "RESUME", () => {
        this.audioManager.play("click");
        this.scene.stop();
        this.scene.resume("GameScene");
      });
      this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, "RESTART", () => {
        this.audioManager.play("click");
        this.scene.stop();
        this.scene.stop("GameScene");
        this.scene.start("GameScene", { level: this.scene.get("GameScene").levelId });
      });
      this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100, "QUIT", () => {
        this.audioManager.play("click");
        this.scene.stop();
        this.scene.stop("GameScene");
        this.scene.start("LevelSelect");
      });
    }
    createButton(x, y, text, callback) {
      const btn = this.add.image(x, y, "btn_small").setInteractive({ useHandCursor: true });
      const label = this.add.text(x, y, text, {
        fontSize: "18px",
        fontFamily: "Arial",
        color: "#ffffff",
        bold: true
      }).setOrigin(0.5);
      btn.on("pointerover", () => {
        btn.setScale(1.05);
        label.setScale(1.05);
      });
      btn.on("pointerout", () => {
        btn.setScale(1);
        label.setScale(1);
      });
      btn.on("pointerdown", callback);
      return { btn, label };
    }
  };

  // src/scenes/GameOverScene.js
  var GameOverScene = class extends Phaser.Scene {
    constructor() {
      super({ key: "GameOverScene" });
    }
    init(data) {
      this.finalScore = data.score || 0;
      this.levelId = data.level || 1;
    }
    create() {
      this.audioManager = new AudioManager(this);
      this.audioManager.play("gameOver");
      this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0, 0.85);
      const panel = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "panel");
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 140, "GAME OVER", {
        fontSize: "38px",
        fontFamily: "Arial Black",
        color: "#e74c3c"
      }).setOrigin(0.5);
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 90, "Level " + this.levelId, {
        fontSize: "22px",
        fontFamily: "Arial",
        color: "#7f8c8d"
      }).setOrigin(0.5);
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, "SCORE", {
        fontSize: "16px",
        fontFamily: "Arial",
        color: "#95a5a6"
      }).setOrigin(0.5);
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 15, `${this.finalScore}`, {
        fontSize: "42px",
        fontFamily: "Arial Black",
        color: "#f1c40f"
      }).setOrigin(0.5);
      this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50, "TRY AGAIN", () => {
        this.audioManager.play("click");
        this.scene.start("GameScene", { level: parseInt(this.levelId) });
      });
      this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 110, "LEVEL SELECT", () => {
        this.audioManager.play("click");
        this.scene.start("LevelSelect");
      });
      this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 170, "MAIN MENU", () => {
        this.audioManager.play("click");
        this.scene.start("MainMenu");
      });
    }
    createButton(x, y, text, callback) {
      const btn = this.add.image(x, y, "btn_small").setInteractive({ useHandCursor: true });
      const label = this.add.text(x, y, text, {
        fontSize: "18px",
        fontFamily: "Arial",
        color: "#ffffff",
        bold: true
      }).setOrigin(0.5);
      btn.on("pointerover", () => {
        btn.setScale(1.05);
        label.setScale(1.05);
      });
      btn.on("pointerout", () => {
        btn.setScale(1);
        label.setScale(1);
      });
      btn.on("pointerdown", callback);
      return { btn, label };
    }
  };

  // src/scenes/LevelCompleteScene.js
  var LevelCompleteScene = class extends Phaser.Scene {
    constructor() {
      super({ key: "LevelCompleteScene" });
    }
    init(data) {
      this.finalScore = data.score || 0;
      this.levelId = parseInt(data.level) || 1;
      this.stars = data.stars || 1;
    }
    create() {
      this.audioManager = new AudioManager(this);
      this.audioManager.play("levelComplete");
      this.saveProgress();
      this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0, 0.85);
      const panel = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "panel");
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 160, "LEVEL COMPLETE!", {
        fontSize: "32px",
        fontFamily: "Arial Black",
        color: "#2ecc71"
      }).setOrigin(0.5);
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 110, "Level " + this.levelId, {
        fontSize: "20px",
        fontFamily: "Arial",
        color: "#95a5a6"
      }).setOrigin(0.5);
      this.createStars();
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 10, "SCORE", {
        fontSize: "16px",
        fontFamily: "Arial",
        color: "#95a5a6"
      }).setOrigin(0.5);
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 25, `${this.finalScore}`, {
        fontSize: "48px",
        fontFamily: "Arial Black",
        color: "#f1c40f"
      }).setOrigin(0.5);
      const nextLevel = this.levelId < 50 ? this.levelId + 1 : null;
      if (nextLevel) {
        this.createButton(GAME_WIDTH / 2 - 70, GAME_HEIGHT / 2 + 90, "NEXT", () => {
          this.audioManager.play("click");
          this.scene.start("GameScene", { level: nextLevel });
        });
      }
      this.createButton(GAME_WIDTH / 2 + 70, GAME_HEIGHT / 2 + 90, "REPLAY", () => {
        this.audioManager.play("click");
        this.scene.start("GameScene", { level: this.levelId });
      });
      this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 150, "LEVEL SELECT", () => {
        this.audioManager.play("click");
        this.scene.start("LevelSelect");
      });
    }
    createStars() {
      const starY = GAME_HEIGHT / 2 - 60;
      const spacing = 80;
      const startX = GAME_WIDTH / 2 - spacing;
      for (let i = 0; i < 3; i++) {
        const x = startX + i * spacing;
        const isEarned = i < this.stars;
        const star = this.add.image(x, starY, isEarned ? "star" : "star_empty");
        star.setScale(0);
        this.tweens.add({
          targets: star,
          scaleX: 1,
          scaleY: 1,
          duration: 300,
          delay: 200 + i * 150,
          ease: "Back.easeOut"
        });
        if (isEarned) {
          this.tweens.add({
            targets: star,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 200,
            delay: 400 + i * 150,
            yoyo: true
          });
        }
      }
    }
    saveProgress() {
      const currentUnlocked = localStorage.getItem(STORAGE_KEYS.LEVEL_PROGRESS);
      const nextLevel = this.levelId + 1;
      if (!currentUnlocked || nextLevel > parseInt(currentUnlocked)) {
        localStorage.setItem(STORAGE_KEYS.LEVEL_PROGRESS, nextLevel.toString());
      }
      const highScoreKey = `${STORAGE_KEYS.HIGH_SCORE}_${this.levelId}`;
      const currentHigh = localStorage.getItem(highScoreKey);
      if (!currentHigh || this.finalScore > parseInt(currentHigh)) {
        localStorage.setItem(highScoreKey, this.finalScore.toString());
      }
    }
    createButton(x, y, text, callback) {
      const btn = this.add.image(x, y, "btn_small").setInteractive({ useHandCursor: true });
      const label = this.add.text(x, y, text, {
        fontSize: "16px",
        fontFamily: "Arial",
        color: "#ffffff",
        bold: true
      }).setOrigin(0.5);
      btn.on("pointerover", () => {
        btn.setScale(1.05);
        label.setScale(1.05);
      });
      btn.on("pointerout", () => {
        btn.setScale(1);
        label.setScale(1);
      });
      btn.on("pointerdown", callback);
      return { btn, label };
    }
  };

  // src/utils/GameConfig.js
  var GAME_WIDTH = 480;
  var GAME_HEIGHT = 640;
  var GRID_ROWS = 8;
  var GRID_COLS = 8;
  var TILE_SIZE = 64;
  var GRID_OFFSET_X = (GAME_WIDTH - GRID_COLS * TILE_SIZE) / 2;
  var GRID_OFFSET_Y = 100;
  var CANDY_TYPES = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
  var SPECIAL_TYPES = {
    NONE: 0,
    HORIZONTAL: 1,
    VERTICAL: 2,
    COLOR_BOMB: 3
  };
  var LEVELS = generateLevels();
  function generateLevels() {
    const levels = [];
    for (let i = 1; i <= 50; i++) {
      const baseScore = 1e3 + i * 500;
      const baseMoves = Math.max(15, 30 - Math.floor(i / 10));
      const candyTypes = Math.min(7, 5 + Math.floor(i / 15));
      const hasSpecials = i >= 3;
      levels.push({
        id: i,
        scoreTarget: baseScore + (i - 1) * 200,
        moves: baseMoves,
        candyTypes,
        gridRows: 8,
        gridCols: 8,
        hasSpecials,
        specialsChance: i >= 5 ? 0.1 + (i - 5) * 0.01 : 0
      });
    }
    return levels;
  }
  var STORAGE_KEYS = {
    HIGH_SCORE: "candycruz_highscore",
    LEVEL_PROGRESS: "candycruz_level",
    SOUND_ENABLED: "candycruz_sound"
  };
  function getGameConfig() {
    return {
      type: Phaser.AUTO,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      parent: "game-container",
      backgroundColor: "#1a1a2e",
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: { width: 320, height: 480 },
        max: { width: 768, height: 1024 }
      },
      scene: [BootScene, MainMenu, LevelSelect, GameScene, UIScene, PauseScene, GameOverScene, LevelCompleteScene],
      physics: {
        default: "arcade",
        arcade: { debug: false }
      }
    };
  }

  // src/main.js
  window.addEventListener("load", () => {
    const config = getGameConfig();
    const game = new Phaser.Game(config);
    console.log("Candy Cruz Match-3 Game Initialized");
  });
})();
//# sourceMappingURL=game.js.map
