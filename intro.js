// ==========================================================================
// LAST LOGIN — 4K Atmospheric Canvas & Native Web Audio Engine
// ==========================================================================

class AudioSynthEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.droneGain = null;
    this.isDronePlaying = false;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startAmbientDrone() {
    this.ensureContext();
    if (!this.ctx || this.isDronePlaying) return;
    this.isDronePlaying = true;

    const now = this.ctx.currentTime;
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.0001, now);
    this.droneGain.gain.exponentialRampToValueAtTime(0.35, now + 3.0);
    this.droneGain.connect(this.masterGain);

    // Sub-bass sine (55 Hz - Low A)
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(55, now);

    // Detuned Triangle (110 Hz - A2 with 0.8Hz binaural beating)
    const triOsc = this.ctx.createOscillator();
    triOsc.type = 'triangle';
    triOsc.frequency.setValueAtTime(110.8, now);

    // Filter to suppress high frequencies
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(140, now);
    lowpass.Q.setValueAtTime(2.0, now);

    // LFO modulation for breathing sub-drone
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.18, now); // slow breathing cycle
    lfoGain.gain.setValueAtTime(28, now);
    lfo.connect(lfoGain);
    lfoGain.connect(lowpass.frequency);

    subOsc.connect(lowpass);
    triOsc.connect(lowpass);
    lowpass.connect(this.droneGain);

    subOsc.start(now);
    triOsc.start(now);
    lfo.start(now);
  }

  playMechanicalSwitchSFX() {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // 1. High-pass transient click (relay snap)
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(3400, now);
    clickGain.gain.setValueAtTime(0.28, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
    clickOsc.connect(clickGain);
    clickGain.connect(this.masterGain);
    clickOsc.start(now);
    clickOsc.stop(now + 0.03);

    // 2. Heavy sub-thud impact
    const thudOsc = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thudOsc.type = 'sine';
    thudOsc.frequency.setValueAtTime(160, now);
    thudOsc.frequency.exponentialRampToValueAtTime(36, now + 0.28);
    thudGain.gain.setValueAtTime(0.55, now);
    thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    thudOsc.connect(thudGain);
    thudGain.connect(this.masterGain);
    thudOsc.start(now);
    thudOsc.stop(now + 0.32);
  }
}

// Particle Canvas Fog & Dust System
class AtmosphereCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.dustMotes = [];
    this.width = 0;
    this.height = 0;
    this.dpr = 1;
    this.animId = null;

    this.resize();
    this.initParticles();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  initParticles() {
    // 40 rolling mist clouds
    this.particles = [];
    for (let i = 0; i < 42; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: this.height * 0.4 + Math.random() * (this.height * 0.55),
        radius: 120 + Math.random() * 180,
        speedX: 0.15 + Math.random() * 0.3,
        baseY: 0,
        floatOffset: Math.random() * Math.PI * 2,
        opacity: 0.03 + Math.random() * 0.06
      });
    }

    // 60 dust motes catching light
    this.dustMotes = [];
    for (let i = 0; i < 65; i++) {
      this.dustMotes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: 0.8 + Math.random() * 1.8,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -0.15 - Math.random() * 0.25,
        alpha: 0.1 + Math.random() * 0.5
      });
    }
  }

  start() {
    let lastTime = performance.now();
    const render = (time) => {
      const dt = (time - lastTime) * 0.001;
      lastTime = time;

      this.ctx.clearRect(0, 0, this.width, this.height);

      // Render rolling mist particles
      for (const p of this.particles) {
        p.x += p.speedX;
        if (p.x - p.radius > this.width) {
          p.x = -p.radius;
        }
        const floatY = p.y + Math.sin(time * 0.0008 + p.floatOffset) * 18;

        const grad = this.ctx.createRadialGradient(p.x, floatY, 0, p.x, floatY, p.radius);
        grad.addColorStop(0, `rgba(168, 194, 216, ${p.opacity})`);
        grad.addColorStop(0.6, `rgba(52, 72, 93, ${p.opacity * 0.5})`);
        grad.addColorStop(1, 'rgba(5, 8, 13, 0)');

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(p.x, floatY, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Render dust motes
      for (const d of this.dustMotes) {
        d.x += d.speedX;
        d.y += d.speedY;

        if (d.y < 0) d.y = this.height;
        if (d.x < 0) d.x = this.width;
        if (d.x > this.width) d.x = 0;

        // Subtle shimmer
        const shimmer = d.alpha * (0.8 + 0.2 * Math.sin(time * 0.003 + d.x));
        this.ctx.fillStyle = `rgba(232, 242, 250, ${shimmer})`;
        this.ctx.beginPath();
        this.ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.animId = requestAnimationFrame(render);
    };

    this.animId = requestAnimationFrame(render);
  }
}

// Controller & Scene Lifecycle
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('atmosphere-canvas');
  const atmosphere = new AtmosphereCanvas(canvas);
  atmosphere.start();

  const audioSynth = new AudioSynthEngine();
  const enterBtn = document.getElementById('btn-enter-game');
  const promptLabel = document.getElementById('hud-prompt-label');
  const fadeOverlay = document.getElementById('cinematic-fade');
  const introScreen = document.getElementById('intro-screen');

  let hasStarted = false;

  // Start ambient sub-drone on any first user gesture
  const onFirstInteraction = () => {
    audioSynth.startAmbientDrone();
    window.removeEventListener('pointerdown', onFirstInteraction);
    window.removeEventListener('keydown', onFirstInteraction);
  };
  window.addEventListener('pointerdown', onFirstInteraction);
  window.addEventListener('keydown', onFirstInteraction);

  function triggerGameLaunch() {
    if (hasStarted) return;
    hasStarted = true;

    // Trigger switch SFX
    audioSynth.playMechanicalSwitchSFX();

    // Visual button trigger state
    enterBtn.classList.add('triggered');
    promptLabel.textContent = 'COMMENCING INVESTIGATION... ⏩';

    // Cinematic zoom & fade
    introScreen.style.transform = 'scale(1.035)';
    introScreen.style.opacity = '0.4';
    fadeOverlay.classList.add('active');

    setTimeout(() => {
      if (typeof window.startGame === 'function') {
        window.startGame();
      } else {
        console.log('Intro transition complete: Starting game loop.');
        window.location.href = './game.html';
      }
    }, 800);
  }

  enterBtn.addEventListener('click', triggerGameLaunch);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerGameLaunch();
    }
  });
});
