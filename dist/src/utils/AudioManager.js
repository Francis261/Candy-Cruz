export class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.enabled = localStorage.getItem('candycruz_sound') !== 'false';
        this.sounds = {};
        this.music = null;
        this.createSounds();
    }

    createSounds() {
        try {
            this.sounds.swap = this.createSound('swap', 300, 'sine', 0.3);
            this.sounds.match = this.createSound('match', 500, 'sine', 0.4);
            this.sounds.special = this.createSound('special', 700, 'triangle', 0.5);
            this.sounds.invalid = this.createSound('invalid', 150, 'square', 0.2);
            this.sounds.click = this.createSound('click', 600, 'sine', 0.2);
            this.sounds.levelComplete = this.createSound('levelComplete', [400, 500, 600, 800], 'sine', 0.4);
            this.sounds.gameOver = this.createSound('gameOver', [500, 400, 300, 200], 'sawtooth', 0.3);
        } catch (e) {
            console.log('Audio not available, using silent fallback');
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
                        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration / 1000);
                        
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.start();
                        osc.stop(ctx.currentTime + duration / 1000);
                    } catch (e) {}
                }
            };
        } catch (e) {
            return { play: () => {} };
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
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(baseFreq + 200, ctx.currentTime + 0.1);
            
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } catch (e) {}
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('candycruz_sound', this.enabled);
        return this.enabled;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
        localStorage.setItem('candycruz_sound', enabled);
    }
}
