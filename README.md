# Candy Cruz - Match 3 Game

A full-featured 2D match-3 puzzle game built with Phaser 3, featuring 50 levels, special candies, and responsive design.

## Quick Start

```bash
npm install
npm run start
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## Features

- **50 Levels** with increasing difficulty
- **8x8 Grid** with 5-7 candy types
- **Special Candies**: Horizontal, Vertical, and Color Bomb
- **Chain Combos** with score multipliers
- **Smooth Animations** using Phaser 3 tweens
- **Particle Effects** on matches
- **Local Storage** for progress persistence
- **Mobile Responsive** design

## Tech Stack

- Phaser 3.70
- JavaScript (ES6 modules)
- Web Audio API for sound effects
- Procedural texture generation

## Project Structure

```
src/
├── main.js              # Entry point
├── scenes/              # Game scenes
│   ├── BootScene.js     # Asset generation
│   ├── MainMenu.js     # Main menu
│   ├── LevelSelect.js   # Level selection
│   ├── GameScene.js     # Core gameplay
│   ├── UIScene.js       # HUD overlay
│   ├── PauseScene.js    # Pause menu
│   ├── GameOverScene.js # Game over
│   └── LevelCompleteScene.js # Victory
└── utils/
    ├── GameConfig.js    # Constants & levels
    ├── AssetGenerator.js # Procedural textures
    └── AudioManager.js  # Sound effects
```

## How to Play

1. Swap adjacent candies to match 3+ of the same color
2. Complete level objectives within the move limit
3. Create special candies by matching 4+ candies
4. Use special candies to clear rows, columns, or colors

## License

MIT
