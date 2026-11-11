// Comprehensive Procedural Web Audio API Engine — Ambient Music & Complete SFX

class AudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = typeof localStorage !== 'undefined' && localStorage.getItem('last_login_v2_sound_muted') === 'true';
    
    // Master Gain Nodes
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;

    // External Music Tracks (intro.mpeg & story.mpeg)
    this.introAudio = null;
    this.storyAudio = null;
    this.activeExternalTrack = null;

    // Music State
    this.currentTrack = null;
    this.musicOscillators = [];
    this.musicInterval = null;

    // Rain / Ambient source
    this.rainSource = null;
    this.rainGain = null;

    // Character voice frequencies (Hz) for dialogue typewriter
    this.voicePitches = {
      arya: 260,
      meera: 340,
      kabir: 200,
      tanvi: 400,
      mishra: 160,
      das: 140,
      assist: 520
    };
  }

  init() {
    if (this.ctx) return;
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Setup gain hierarchy
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('last_login_v2_sound_muted', String(this.isMuted));
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
    }
    this.syncAudioMute();
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = !!muted;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('last_login_v2_sound_muted', String(this.isMuted));
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
    }
    this.syncAudioMute();
    return this.isMuted;
  }

  syncAudioMute() {
    if (this.introAudio) {
      this.introAudio.muted = this.isMuted;
      this.introAudio.volume = this.isMuted ? 0 : 0.65;
    }
    if (this.storyAudio) {
      this.storyAudio.muted = this.isMuted;
      this.storyAudio.volume = this.isMuted ? 0 : 0.55;
    }
  }

  // ==========================================
  // EXTERNAL SOUNDTRACK ENGINE (intro.mpeg & story.mpeg)
  // ==========================================

  playIntroMusic() {
    this.ensureContext();
    this.stopProceduralMusic();
    if (this.storyAudio) {
      try {
        this.storyAudio.pause();
        this.storyAudio.currentTime = 0;
      } catch (e) {}
    }
    if (typeof window === 'undefined') return;

    this.activeExternalTrack = 'intro';

    if (!this.introAudio) {
      this.introAudio = new Audio('./music/intro.mpeg');
      this.introAudio.loop = true;
    }

    this.syncAudioMute();

    const startPlay = () => {
      if (this.activeExternalTrack !== 'intro' || !this.introAudio) return;
      this.syncAudioMute();
      this.introAudio.play().catch(() => {});
    };

    this.introAudio.play().catch(() => {
      // Browser blocked autoplay; attach one-time user gesture handler
      const onUserGesture = () => {
        startPlay();
        window.removeEventListener('click', onUserGesture);
        window.removeEventListener('keydown', onUserGesture);
        window.removeEventListener('pointerdown', onUserGesture);
      };
      window.addEventListener('click', onUserGesture, { once: true });
      window.addEventListener('keydown', onUserGesture, { once: true });
      window.addEventListener('pointerdown', onUserGesture, { once: true });
    });
  }

  playStoryMusic() {
    this.ensureContext();
    this.stopProceduralMusic();
    if (this.introAudio) {
      try {
        this.introAudio.pause();
        this.introAudio.currentTime = 0;
      } catch (e) {}
    }
    if (typeof window === 'undefined') return;

    this.activeExternalTrack = 'story';

    if (!this.storyAudio) {
      this.storyAudio = new Audio('./music/story.mpeg');
      this.storyAudio.loop = true;
    }

    this.syncAudioMute();

    // If already playing continuously, do not interrupt or restart
    if (this.storyAudio.paused) {
      const startPlay = () => {
        if (this.activeExternalTrack !== 'story' || !this.storyAudio) return;
        this.syncAudioMute();
        this.storyAudio.play().catch(() => {});
      };

      this.storyAudio.play().catch(() => {
        const onUserGesture = () => {
          startPlay();
          window.removeEventListener('click', onUserGesture);
          window.removeEventListener('keydown', onUserGesture);
          window.removeEventListener('pointerdown', onUserGesture);
        };
        window.addEventListener('click', onUserGesture, { once: true });
        window.addEventListener('keydown', onUserGesture, { once: true });
        window.addEventListener('pointerdown', onUserGesture, { once: true });
      });
    }
  }

  stopProceduralMusic() {
    this.stopMusic(0.2);
  }

  // Unified Music Player: routes to intro or story continuous loop
  playMusic(trackName) {
    if (trackName === 'intro_theme' || trackName === 'intro') {
      this.playIntroMusic();
      return;
    }
    // All other scenes (video_prologue, title, riverbank, briefing, desktop, etc.) use story.mpeg continuously
    this.playStoryMusic();
  }

  stopMusic(fadeDuration = 0.5) {
    if (!this.ctx) return;
    this.currentTrack = null;

    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }

    if (this.musicOscillators.length > 0) {
      const now = this.ctx.currentTime;
      this.musicOscillators.forEach(({ osc, gain }) => {
        try {
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.linearRampToValueAtTime(0.0001, now + fadeDuration);
          osc.stop(now + fadeDuration + 0.1);
        } catch (e) {}
      });
      this.musicOscillators = [];
    }
  }

  // 1. Cinematic Prologue Theme: Deep Sub-Bass Drone & Minor Arpeggio
  startPrologueMusic() {
    const freqs = [55, 110, 164.81]; // A1, A2, E3
    const now = this.ctx.currentTime;

    freqs.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 2.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start();
      this.musicOscillators.push({ osc, gain });
    });

    // Slow ambient arpeggio notes
    const notes = [220, 261.63, 329.63, 392.00, 329.63];
    let noteIdx = 0;
    this.musicInterval = setInterval(() => {
      if (this.currentTrack !== 'prologue_theme' || !this.ctx || this.isMuted) return;
      const noteOsc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const noteTime = this.ctx.currentTime;

      noteOsc.type = 'sine';
      noteOsc.frequency.setValueAtTime(notes[noteIdx % notes.length], noteTime);
      noteGain.gain.setValueAtTime(0, noteTime);
      noteGain.gain.linearRampToValueAtTime(0.04, noteTime + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.8);

      noteOsc.connect(noteGain);
      noteGain.connect(this.musicGain);
      noteOsc.start(noteTime);
      noteOsc.stop(noteTime + 2.0);

      noteIdx++;
    }, 1800);
  }

  // 2. Riverbank Theme: Noir Ambient Pads & Heavy Rain
  startRiverbankMusic() {
    this.startRainAmbience();
    const chords = [73.42, 146.83, 220.00]; // D2, D3, A3
    const now = this.ctx.currentTime;

    chords.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start();
      this.musicOscillators.push({ osc, gain });
    });
  }

  // 3. Interrogation Briefing Theme: Low Tense Mystery Drone
  startInterrogationMusic() {
    const freqs = [65.41, 130.81, 196.00]; // C2, C3, G3
    const now = this.ctx.currentTime;

    freqs.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 2.0);

      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start();
      this.musicOscillators.push({ osc, gain });
    });
  }

  // 4. NirvanaOS Desktop Theme: Electronic Retro Hum & Data Pulse
  startDesktopMusic() {
    const humOsc = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    humOsc.type = 'triangle';
    humOsc.frequency.setValueAtTime(60, now); // 60Hz CRT power hum
    humGain.gain.setValueAtTime(0.0001, now);
    humGain.gain.linearRampToValueAtTime(0.02, now + 1.5);

    humOsc.connect(humGain);
    humGain.connect(this.musicGain);
    humOsc.start();
    this.musicOscillators.push({ osc: humOsc, gain: humGain });

    // Occasional gentle data blip
    this.musicInterval = setInterval(() => {
      if (this.currentTrack !== 'desktop_theme' || !this.ctx || this.isMuted) return;
      const blip = this.ctx.createOscillator();
      const bGain = this.ctx.createGain();
      const bTime = this.ctx.currentTime;

      blip.type = 'sine';
      blip.frequency.setValueAtTime(880 + Math.random() * 400, bTime);
      bGain.gain.setValueAtTime(0.015, bTime);
      bGain.gain.exponentialRampToValueAtTime(0.0001, bTime + 0.15);

      blip.connect(bGain);
      bGain.connect(this.musicGain);
      blip.start(bTime);
      blip.stop(bTime + 0.2);
    }, 3200);
  }

  // 5. Confrontation Theme: Tension Pulse with Heartbeat
  startConfrontationMusic() {
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(116.54, now); // Bb2 tension note

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 1.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);
    osc.start();
    this.musicOscillators.push({ osc, gain });

    // Heartbeat pulse interval
    this.musicInterval = setInterval(() => {
      if (this.currentTrack !== 'confrontation_theme' || !this.ctx || this.isMuted) return;
      this.playHeartbeat();
    }, 900);
  }

  // 6. Safe Mode Theme: Serene Major Seventh Pad
  startSafeModeMusic() {
    const chords = [174.61, 220.00, 261.63, 329.63]; // F, A, C, E (Fmaj7)
    const now = this.ctx.currentTime;

    chords.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 1.5);

      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start();
      this.musicOscillators.push({ osc, gain });
    });
  }

  // ==========================================
  // COMPLETE PROCEDURAL SOUND EFFECTS (SFX)
  // ==========================================

  // Cinematic Camera Whoosh / Scene Transition
  playWhoosh() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.18);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(now);
    } catch (e) {}
  }

  // Distant Storm Thunder Rumble
  playThunder() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(25, now + 1.8);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 2.1);
    } catch (e) {}
  }

  // Window Open Sound
  playWindowOpen() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [440, 659.25].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.06, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.18);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.2);
      });
    } catch (e) {}
  }

  // Window Close / Pop Sound
  playWindowClose() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.1);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch (e) {}
  }

  // Access Granted Chime (Private Vault unlocked)
  playAccessGranted() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.08, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.6);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.65);
      });
    } catch (e) {}
  }

  // Access Denied Harsh Buzz
  playAccessDenied() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.38);
    } catch (e) {}
  }

  // Metallic Chronometer Watch Tick (Kabir's tell)
  playWatchTick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  // Incoming Notification Chime (Chat / Mail)
  playNotification() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [587.33, 880.00].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.06, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.4);
      });
    } catch (e) {}
  }

  // Typewriter Voice Blips
  playVoiceBlip(charId = 'arya') {
    if (this.isMuted || !this.ctx) return;
    try {
      const freq = this.voicePitches[charId] || 250;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = charId === 'assist' ? 'sine' : 'triangle';
      const jitter = (Math.random() - 0.5) * 20;
      osc.frequency.setValueAtTime(freq + jitter, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  // Keyboard Tick for system typing / clicking
  playKeyTick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch (e) {}
  }

  // Clue Ping / Discovery Chime
  playCluePing() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.8);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.85);
      });
    } catch (e) {}
  }

  // NirvanaOS Boot Chime
  playBootChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const chords = [220, 329.63, 440, 554.37, 659.25];
      chords.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.06, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.3);
      });
    } catch (e) {}
  }

  // Glitch Static / Deception Buzz
  playGlitchBuzz() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(now);
    } catch (e) {}
  }

  // Heartbeat Sound
  playHeartbeat() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  // Ending Chord
  playEndingChord(isVictory = true) {
    if (this.isMuted || !this.ctx) return;
    try {
      this.stopMusic(0.2);
      const now = this.ctx.currentTime;
      const freqs = isVictory 
        ? [261.63, 329.63, 392.00, 523.25, 659.25] // C Major
        : [146.83, 174.61, 220.00, 261.63, 311.13]; // D Diminished
      freqs.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = isVictory ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 3.3);
      });
    } catch (e) {}
  }

  // Rain Ambience Loop
  startRainAmbience() {
    if (!this.ctx || this.rainSource) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;

      this.rainSource = this.ctx.createBufferSource();
      this.rainSource.buffer = buffer;
      this.rainSource.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.07, this.ctx.currentTime);

      this.rainSource.connect(filter);
      filter.connect(this.rainGain);
      this.rainGain.connect(this.sfxGain);

      this.rainSource.start();
    } catch (e) {}
  }

  stopRainAmbience() {
    if (this.rainSource) {
      try {
        this.rainSource.stop();
        this.rainSource.disconnect();
      } catch (e) {}
      this.rainSource = null;
    }
  }
}

export const audioManager = new AudioManager();
