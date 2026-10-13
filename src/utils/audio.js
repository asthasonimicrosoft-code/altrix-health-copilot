// Web Audio API synthesized futuristic healthcare sound effects
class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playTone(freq, type, duration, gainLevel = 0.05) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio playback failed silently
    }
  }

  click() {
    this.playTone(880, 'sine', 0.08, 0.04);
  }

  pulse() {
    this.playTone(440, 'triangle', 0.2, 0.05);
    setTimeout(() => this.playTone(554.37, 'sine', 0.15, 0.03), 80);
  }

  organSelect() {
    this.playTone(523.25, 'sine', 0.12, 0.06);
    setTimeout(() => this.playTone(659.25, 'sine', 0.12, 0.06), 90);
    setTimeout(() => this.playTone(783.99, 'sine', 0.2, 0.05), 180);
  }

  scan() {
    this.playTone(1200, 'sine', 0.15, 0.03);
  }

  success() {
    this.playTone(587.33, 'sine', 0.15, 0.05);
    setTimeout(() => this.playTone(880, 'sine', 0.25, 0.06), 120);
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }
}

export const sounds = new SoundManager();
