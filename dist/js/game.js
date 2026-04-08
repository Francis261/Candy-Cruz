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
      this.scaleFactor = Math.min(this.scale.width / GAME_WIDTH, this.scale.height / GAME_HEIGHT);
      this.audioManager = new AudioManager(this);
      this.drawBackground();
      this.createTitle();
      this.createButtons();
    }
    drawBackground() {
      this.add.image(0, 0, "background").setOrigin(0, 0).setScale(this.scaleFactor);
    }
    createTitle() {
      this.add.text(GAME_WIDTH / 2, 120 * this.scaleFactor, "Candy Cruz", {
        fontSize: `${56 * this.scaleFactor}px`,
        fontFamily: "Arial Black",
        color: "#f1c40f",
        bold: true,
        stroke: "#e67e22",
        strokeThickness: 6
      }).setOrigin(0.5);
      this.add.text(GAME_WIDTH / 2, 180 * this.scaleFactor, "Match 3 Puzzle", {
        fontSize: `${24 * this.scaleFactor}px`,
        fontFamily: "Arial",
        color: "#3498db"
      }).setOrigin(0.5);
    }
    createButtons() {
      const centerX = GAME_WIDTH / 2;
      const startY = 280 * this.scaleFactor;
      const spacing = 70 * this.scaleFactor;
      this.createButton(centerX, startY, "PLAY", "btn_play", () => {
        this.audioManager.play("click");
        this.scene.start("LevelSelect");
      });
      this.createButton(centerX, startY + spacing, "HOW TO PLAY", "btn_small", () => {
        this.audioManager.play("click");
        this.showHelp();
      });
    }
    createButton(x, y, text, texture, callback) {
      const btn = this.add.image(x, y, texture).setScale(this.scaleFactor).setInteractive({ useHandCursor: true });
      const label = this.add.text(x, y, text, {
        fontSize: `${20 * this.scaleFactor}px`,
        fontFamily: "Arial",
        color: "#ffffff",
        bold: true
      }).setOrigin(0.5);
      btn.on("pointerover", () => btn.setScale(1.05 * this.scaleFactor));
      btn.on("pointerout", () => btn.setScale(this.scaleFactor));
      btn.on("pointerdown", callback);
    }
    showHelp() {
      const overlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0, 0.8);
      const helpText = [
        "Match 3 or more candies",
        "of the same color",
        "in a row or column!",
        "",
        "Special Candies:",
        "- Horizontal: Clears row",
        "- Vertical: Clears column",
        "- Color Bomb: Clears color",
        "",
        "Complete objectives",
        "within moves to win!"
      ];
      const startY = GAME_HEIGHT / 2 - 80 * this.scaleFactor;
      helpText.forEach((line, i) => {
        this.add.text(GAME_WIDTH / 2, startY + i * 22 * this.scaleFactor, line, {
          fontSize: `${14 * this.scaleFactor}px`,
          fontFamily: "Arial",
          color: "#ecf0f1"
        }).setOrigin(0.5);
      });
      const closeBtn = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 130 * this.scaleFactor, "btn_small").setScale(this.scaleFactor).setInteractive({ useHandCursor: true });
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 130 * this.scaleFactor, "CLOSE", {
        fontSize: `${16 * this.scaleFactor}px`,
        fontFamily: "Arial",
        color: "#ffffff"
      }).setOrigin(0.5);
      closeBtn.on("pointerdown", () => {
        overlay.destroy();
        closeBtn.destroy();
      });
    }
  };

  // src/scenes/LevelSelect.js
  var LevelSelect = class extends Phaser.Scene {
    constructor() {
      super({ key: "LevelSelect" });
    }
    create() {
      this.scaleFactor = Math.min(this.scale.width / GAME_WIDTH, this.scale.height / GAME_HEIGHT);
      this.audioManager = new AudioManager(this);
      this.unlockedLevel = this.getUnlockedLevel();
      this.background = this.add.image(0, 0, "background").setOrigin(0, 0).setScale(this.scaleFactor);
      this.createHeader();
      this.createLevelGrid();
      this.createBackButton();
    }
    getUnlockedLevel() {
      const saved = localStorage.getItem(STORAGE_KEYS.LEVEL_PROGRESS);
      return saved ? parseInt(saved) : 1;
    }
    createHeader() {
      this.add.rectangle(GAME_WIDTH / 2, 50 * this.scaleFactor, GAME_WIDTH * this.scaleFactor, 80 * this.scaleFactor, 1710638, 0.9);
      this.add.text(GAME_WIDTH / 2, 50 * this.scaleFactor, "LEVELS", {
        fontSize: `${36 * this.scaleFactor}px`,
        fontFamily: "Arial",
        color: "#f1c40f",
        bold: true
      }).setOrigin(0.5);
      this.add.text(GAME_WIDTH / 2, 85 * this.scaleFactor, `Level ${this.unlockedLevel} of 50`, {
        fontSize: `${14 * this.scaleFactor}px`,
        fontFamily: "Arial",
        color: "#7f8c8d"
      }).setOrigin(0.5);
    }
    createLevelGrid() {
      this.levelContainer = this.add.container(0, 100 * this.scaleFactor);
      this.page = 0;
      this.levelsPerPage = 20;
      const cols = 4;
      const cellW = 100 * this.scaleFactor;
      const cellH = 100 * this.scaleFactor;
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
        const y = 40 * this.scaleFactor + row * cellH;
        const level = LEVELS[i];
        const isUnlocked = i + 1 <= this.unlockedLevel;
        this.createLevelCard(x, y, level.id, level.scoreTarget, isUnlocked, cellW);
      }
    }
    createLevelCard(x, y, levelNum, score, isUnlocked, cellW) {
      const card = this.add.container(x, y);
      const size = cellW * 0.85;
      const bg = this.add.rectangle(0, 0, size, size, isUnlocked ? 2899536 : 3426654);
      if (!isUnlocked) bg.setAlpha(0.5);
      card.add(bg);
      if (isUnlocked) {
        const num = this.add.text(0, -size * 0.15, `${levelNum}`, {
          fontSize: `${28 * this.scaleFactor}px`,
          fontFamily: "Arial",
          color: "#f1c40f",
          bold: true
        }).setOrigin(0.5);
        card.add(num);
        const txt = this.add.text(0, size * 0.15, `${score}`, {
          fontSize: `${12 * this.scaleFactor}px`,
          fontFamily: "Arial",
          color: "#95a5a6"
        }).setOrigin(0.5);
        card.add(txt);
        card.setSize(size, size);
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
          fontSize: `${24 * this.scaleFactor}px`
        }).setOrigin(0.5);
        card.add(lock);
      }
    }
    createBackButton() {
      const btn = this.add.container(60 * this.scaleFactor, GAME_HEIGHT - 40 * this.scaleFactor);
      const bg = this.add.rectangle(0, 0, 100 * this.scaleFactor, 40 * this.scaleFactor, 2719929);
      const text = this.add.text(0, 0, "\u2190 BACK", {
        fontSize: `${16 * this.scaleFactor}px`,
        fontFamily: "Arial",
        color: "#ffffff"
      }).setOrigin(0.5);
      btn.add([bg, text]);
      btn.setSize(100 * this.scaleFactor, 40 * this.scaleFactor);
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
      this.add.rectangle(GAME_WIDTH / 2, barY, GAME_WIDTH * this.scaleFactor, barH, 1710638, 0.95);
      this.add.text(20 * this.scaleFactor, 15 * this.scaleFactor, "LV", { fontSize: `${12 * this.scaleFactor}px`, color: "#7f8c8d" });
      this.levelText = this.add.text(20 * this.scaleFactor, 32 * this.scaleFactor, "1", { fontSize: `${24 * this.scaleFactor}px`, color: "#f1c40f", bold: true });
      this.add.text(GAME_WIDTH / 2, 15 * this.scaleFactor, "SCORE", { fontSize: `${12 * this.scaleFactor}px`, color: "#7f8c8d" }).setOrigin(0.5);
      this.scoreText = this.add.text(GAME_WIDTH / 2, 35 * this.scaleFactor, "0", { fontSize: `${20 * this.scaleFactor}px`, color: "#fff", bold: true }).setOrigin(0.5);
      this.add.text(GAME_WIDTH - 20 * this.scaleFactor, 15 * this.scaleFactor, "MOVES", { fontSize: `${12 * this.scaleFactor}px`, color: "#7f8c8d" }).setOrigin(1, 0);
      this.movesText = this.add.text(GAME_WIDTH - 20 * this.scaleFactor, 32 * this.scaleFactor, "30", { fontSize: `${24 * this.scaleFactor}px`, color: "#3498db", bold: true }).setOrigin(1, 0);
      this.add.image(GAME_WIDTH - 30 * this.scaleFactor, GAME_HEIGHT - 30 * this.scaleFactor, "btn_pause").setScale(this.scaleFactor).setInteractive().on("pointerdown", () => this.pauseGame());
    }
    setupBackground() {
      this.add.image(0, 0, "background").setOrigin(0, 0).setScale(this.scaleFactor);
      this.add.rectangle(
        GAME_WIDTH / 2,
        this.gridOffsetY + GRID_ROWS * this.tileSize / 2,
        GRID_COLS * this.tileSize + 16,
        GRID_ROWS * this.tileSize + 16,
        1710638,
        0.7
      );
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          this.add.image(
            this.gridOffsetX + col * this.tileSize + this.tileSize / 2,
            this.gridOffsetY + row * this.tileSize + this.tileSize / 2,
            "tile_bg"
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
      if (specialType === SPECIAL_TYPES.HORIZONTAL) texture = "candy_horizontal";
      if (specialType === SPECIAL_TYPES.VERTICAL) texture = "candy_vertical";
      if (specialType === SPECIAL_TYPES.COLOR_BOMB) texture = "candy_colorbomb";
      const candy = this.add.image(x, y, texture).setScale(this.scaleFactor);
      candy.setInteractive({ useHandCursor: true });
      candy.setData("row", row);
      candy.setData("col", col);
      candy.setData("type", type);
      candy.setData("special", specialType);
      candy.on("pointerdown", () => this.onCandyClick(candy));
      return candy;
    }
    onCandyClick(candy) {
      if (this.isProcessing || this.isGameOver) return;
      if (this.selectedTile === null) {
        this.selectedTile = candy;
        this.tweens.add({ targets: candy, scaleX: 1.2 * this.scaleFactor, scaleY: 1.2 * this.scaleFactor, duration: 100, yoyo: true, repeat: 2 });
      } else {
        const row = candy.getData("row");
        const col = candy.getData("col");
        const sRow = this.selectedTile.getData("row");
        const sCol = this.selectedTile.getData("col");
        const isAdjacent = Math.abs(row - sRow) === 1 && col === sCol || Math.abs(col - sCol) === 1 && row === sRow;
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
      const row1 = candy1.getData("row");
      const col1 = candy1.getData("col");
      const row2 = candy2.getData("row");
      const col2 = candy2.getData("col");
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
              onComplete: () => {
                candy1.setData("row", row1);
                candy1.setData("col", col1);
                candy2.setData("row", row2);
                candy2.setData("col", col2);
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
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const matches = [];
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS - 2; col++) {
          const type = (_a = this.grid[row][col]) == null ? void 0 : _a.getData("type");
          if (type && ((_b = this.grid[row][col + 1]) == null ? void 0 : _b.getData("type")) === type && ((_c = this.grid[row][col + 2]) == null ? void 0 : _c.getData("type")) === type) {
            const match = [{ row, col }];
            let c = col + 1;
            while (c < GRID_COLS && ((_d = this.grid[row][c]) == null ? void 0 : _d.getData("type")) === type) {
              match.push({ row, col: c });
              c++;
            }
            if (match.length >= 3) matches.push(match);
          }
        }
      }
      for (let col = 0; col < GRID_COLS; col++) {
        for (let row = 0; row < GRID_ROWS - 2; row++) {
          const type = (_e = this.grid[row][col]) == null ? void 0 : _e.getData("type");
          if (type && ((_f = this.grid[row + 1][col]) == null ? void 0 : _f.getData("type")) === type && ((_g = this.grid[row + 2][col]) == null ? void 0 : _g.getData("type")) === type) {
            const match = [{ row, col }];
            let r = row + 1;
            while (r < GRID_ROWS && ((_h = this.grid[r][col]) == null ? void 0 : _h.getData("type")) === type) {
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
      matches.forEach((match) => match.forEach((p) => positions.push(p)));
      positions.forEach((pos) => {
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
            candy.setData("row", newRow);
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
            candy.setData("row", row);
            candy.setData("col", col);
            candy.setData("type", type);
            candy.on("pointerdown", () => this.onCandyClick(candy));
            this.grid[row][col] = candy;
            this.tweens.add({ targets: candy, y, duration: 200 });
          }
        }
      }
      this.time.delayedCall(250, callback);
    }
    updateUI() {
      this.scoreText.setText(`${this.score}`);
      this.movesText.setText(`${this.movesLeft}`);
      if (this.score >= this.levelData.scoreTarget) {
        this.scoreText.setColor("#2ecc71");
      }
      if (this.movesLeft <= 5) {
        this.movesText.setColor("#e74c3c");
      } else if (this.movesLeft <= 10) {
        this.movesText.setColor("#f39c12");
      }
    }
    checkGameState() {
      if (this.score >= this.levelData.scoreTarget) {
        this.isGameOver = true;
        this.time.delayedCall(500, () => {
          this.scene.start("LevelCompleteScene", { score: this.score, level: this.levelId, stars: 1 });
        });
      } else if (this.movesLeft <= 0) {
        this.isGameOver = true;
        this.time.delayedCall(500, () => {
          this.scene.start("GameOverScene", { score: this.score, level: this.levelId });
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
      this.scoreText.setText("0");
      this.movesText.setText(`${this.movesLeft}`);
    }
    pauseGame() {
      this.scene.pause();
      this.scene.launch("PauseScene");
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
    const isMobile = window.innerWidth < 768;
    const scaleFactor = isMobile ? Math.min(window.innerWidth / GAME_WIDTH, window.innerHeight / GAME_HEIGHT) : 1;
    return {
      type: Phaser.AUTO,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      parent: "game-container",
      backgroundColor: "#1a1a2e",
      scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: "100%",
        height: "100%"
      },
      scene: [BootScene, MainMenu, LevelSelect, GameScene, PauseScene, GameOverScene, LevelCompleteScene],
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
