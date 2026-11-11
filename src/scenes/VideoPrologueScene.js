// Video Prologue Scene — High-Impact Cinematic Presentation with Skip Option

import { audioManager } from '../game/audio-manager.js';

export function createVideoPrologueScene(onComplete) {
  const container = document.createElement('div');
  container.className = 'video-prologue-scene';

  let isSkipped = false;
  let animFrameId = null;
  let startTime = null;
  const totalDuration = 19.0; // 19 seconds cinematic

  container.innerHTML = `
    <!-- Top-Right Glowing Skip Button -->
    <button id="btn-skip-video" class="skip-prologue-btn" title="Skip Prologue" aria-label="Skip Prologue">
      <span>SKIP PROLOGUE</span>
      <span class="skip-key-hint">[ESC / SPACE]</span>
      <span style="font-size: 14px;">⏩</span>
    </button>

    <!-- 2.39:1 Anamorphic Cinema Letterbox Frame -->
    <div class="cinema-container" id="cinema-frame">
      <div class="cinema-bar-top"></div>
      <div class="cinema-bar-bottom"></div>

      <!-- Native HTML5 Video Element (plays if video file exists) -->
      <video id="veo-video-player" class="cinema-video-element hidden" playsinline muted>
        <source src="./videos/prologue_veo.mp4" type="video/mp4">
        <source src="./videos/prologue_veo.webm" type="video/webm">
      </video>

      <!-- Dynamic High-Def Canvas Renderer (Simulating Veo Cinematic Sequence) -->
      <canvas id="cinema-canvas" class="cinema-canvas-element" width="1280" height="536"></canvas>

      <!-- Cinematic Vignette & Overlay -->
      <div class="cinema-vignette"></div>

      <!-- Subtitles Display -->
      <div class="cinema-subtitles-bar">
        <div id="cinema-subtitles" class="cinema-subtitles-text">
          00:15 IST — Kuakhai Riverbank, Bhubaneswar.
        </div>
      </div>

      <!-- Playback Progress Bar -->
      <div id="cinema-progress" class="cinema-progress-bar"></div>
    </div>
  `;

  const canvas = container.querySelector('#cinema-canvas');
  const ctx = canvas.getContext('2d');
  const videoElem = container.querySelector('#veo-video-player');
  const subtitlesElem = container.querySelector('#cinema-subtitles');
  const progressElem = container.querySelector('#cinema-progress');
  const skipBtn = container.querySelector('#btn-skip-video');

  // Start atmospheric rain and low drone
  audioManager.ensureContext();
  audioManager.startRainAmbience();

  // Try checking if video file is loadable
  let useNativeVideo = false;
  videoElem.addEventListener('canplay', () => {
    useNativeVideo = true;
    canvas.classList.add('hidden');
    videoElem.classList.remove('hidden');
    videoElem.play().catch(() => {});
  });
  videoElem.addEventListener('ended', () => {
    finishPrologue();
  });

  // Handle Skip Action
  function finishPrologue() {
    if (isSkipped) return;
    isSkipped = true;

    if (animFrameId) cancelAnimationFrame(animFrameId);
    window.removeEventListener('keydown', keydownHandler);
    audioManager.stopRainAmbience();
    audioManager.playKeyTick();

    // Fade to black and advance
    container.style.transition = 'opacity 0.4s ease';
    container.style.opacity = '0';
    setTimeout(() => {
      container.remove();
      if (onComplete) onComplete();
    }, 400);
  }

  // Keyboard shortcut listener for Skip
  function keydownHandler(e) {
    if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      finishPrologue();
    }
  }
  window.addEventListener('keydown', keydownHandler);

  skipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    finishPrologue();
  });

  // Timed Subtitles Map
  const subtitleScript = [
    { start: 0.0, end: 4.5, text: "00:15 IST — Kuakhai Riverbank, Bhubaneswar." },
    { start: 4.5, end: 8.5, text: "Dr. Meera Sahoo vanished into the monsoon rain at midnight." },
    { start: 8.5, end: 12.5, text: "Forensics secured the perimeter. Two sets of footprints into the silt." },
    { start: 12.5, end: 16.5, text: "Her laptop was left logged in. Trust the evidence, Arya. Not the people." },
    { start: 16.5, end: 19.0, text: "LAST LOGIN // CASE SAHOO-2026-1147" }
  ];

  function updateSubtitles(elapsed) {
    const match = subtitleScript.find(s => elapsed >= s.start && elapsed < s.end);
    if (match) {
      if (subtitlesElem.textContent !== match.text) {
        subtitlesElem.style.opacity = '0';
        setTimeout(() => {
          subtitlesElem.textContent = match.text;
          subtitlesElem.style.opacity = '1';
        }, 150);
      }
    } else {
      subtitlesElem.textContent = '';
    }
  }

  // Cinematic Generative Animation Loop
  function renderFrame(timestamp) {
    if (isSkipped) return;
    if (!startTime) startTime = timestamp;

    const elapsed = (timestamp - startTime) / 1000;
    const progress = Math.min(100, (elapsed / totalDuration) * 100);
    progressElem.style.width = `${progress}%`;

    updateSubtitles(elapsed);

    if (elapsed >= totalDuration) {
      finishPrologue();
      return;
    }

    if (!useNativeVideo) {
      drawCinematicShot(ctx, elapsed);
    }

    animFrameId = requestAnimationFrame(renderFrame);
  }

  // Generative Cinematic Shots
  function drawCinematicShot(c, t) {
    const W = 1280;
    const H = 536;
    c.clearRect(0, 0, W, H);

    if (t < 4.5) {
      // Shot 1: Wide Aerial Riverbank with Police Lights & Lightning Flash
      const progress = t / 4.5;
      const zoom = 1.0 + progress * 0.08;

      c.save();
      c.translate(W / 2, H / 2);
      c.scale(zoom, zoom);
      c.translate(-W / 2, -H / 2);

      // Storm sky
      const skyGrad = c.createLinearGradient(0, 0, 0, H);
      skyGrad.addColorStop(0, '#04070e');
      skyGrad.addColorStop(0.5, '#0b1626');
      skyGrad.addColorStop(1, '#060d17');
      c.fillStyle = skyGrad;
      c.fillRect(0, 0, W, H);

      // Distant city silhouette
      c.fillStyle = '#050a12';
      c.beginPath();
      c.moveTo(0, 300);
      c.lineTo(150, 240);
      c.lineTo(260, 240);
      c.lineTo(340, 300);
      c.lineTo(480, 210);
      c.lineTo(580, 210);
      c.lineTo(680, 300);
      c.lineTo(820, 250);
      c.lineTo(950, 250);
      c.lineTo(1100, 300);
      c.lineTo(W, 280);
      c.lineTo(W, H);
      c.lineTo(0, H);
      c.closePath();
      c.fill();

      // Water Surface with moving ripples
      const riverGrad = c.createLinearGradient(0, 280, 0, H);
      riverGrad.addColorStop(0, '#081422');
      riverGrad.addColorStop(1, '#03060a');
      c.fillStyle = riverGrad;
      c.fillRect(0, 280, W, H - 280);

      // Police Strobe Beacons
      const strobeBlue = Math.sin(t * 8) > 0 ? 0.7 : 0.1;
      const strobeRed = Math.sin(t * 8 + Math.PI) > 0 ? 0.7 : 0.1;

      // Blue Beacon Light on left
      const gB = c.createRadialGradient(240, 290, 10, 240, 290, 220);
      gB.addColorStop(0, `rgba(61, 245, 255, ${strobeBlue})`);
      gB.addColorStop(1, 'rgba(61, 245, 255, 0)');
      c.fillStyle = gB;
      c.fillRect(0, 150, 500, 350);

      // Red Beacon Light on right
      const gR = c.createRadialGradient(980, 280, 10, 980, 280, 220);
      gR.addColorStop(0, `rgba(255, 59, 92, ${strobeRed})`);
      gR.addColorStop(1, 'rgba(255, 59, 92, 0)');
      c.fillStyle = gR;
      c.fillRect(700, 150, 580, 350);

      // Occasional Lightning Flash (at t = 2.4s)
      if (t > 2.3 && t < 2.5) {
        c.fillStyle = 'rgba(255, 255, 255, 0.35)';
        c.fillRect(0, 0, W, H);
      }

      // Rain Streaks
      drawRainStreaks(c, W, H, t);

      c.restore();

    } else if (t < 8.5) {
      // Shot 2: The Abandoned Vehicle with Headlights in Fog
      const localT = t - 4.5;
      const panX = localT * 18;

      c.save();
      c.fillStyle = '#060a10';
      c.fillRect(0, 0, W, H);

      // Ground path
      c.fillStyle = '#0f1722';
      c.beginPath();
      c.moveTo(0, 340);
      c.lineTo(W, 300);
      c.lineTo(W, H);
      c.lineTo(0, H);
      c.closePath();
      c.fill();

      // Car silhouette
      const carX = 420 - panX;
      c.fillStyle = '#090e16';
      c.beginPath();
      c.roundRect(carX, 220, 360, 120, [16, 24, 4, 4]);
      c.fill();

      // Cabin & Windows
      c.fillStyle = '#141e2c';
      c.beginPath();
      c.moveTo(carX + 80, 220);
      c.lineTo(carX + 150, 160);
      c.lineTo(carX + 280, 160);
      c.lineTo(carX + 320, 220);
      c.closePath();
      c.fill();

      // Open Driver's Door
      c.strokeStyle = '#223247';
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(carX + 130, 165);
      c.lineTo(carX + 105, 260);
      c.stroke();

      // Piercing Headlight Beams in Mist
      const beamGrad = c.createRadialGradient(carX + 355, 275, 5, carX + 600, 275, 400);
      beamGrad.addColorStop(0, 'rgba(255, 255, 240, 0.85)');
      beamGrad.addColorStop(0.4, 'rgba(255, 255, 240, 0.25)');
      beamGrad.addColorStop(1, 'rgba(255, 255, 240, 0)');
      c.fillStyle = beamGrad;
      c.beginPath();
      c.moveTo(carX + 355, 270);
      c.lineTo(W, 180);
      c.lineTo(W, 400);
      c.closePath();
      c.fill();

      // Volumetric rain & fog
      drawRainStreaks(c, W, H, t);

      c.restore();

    } else if (t < 12.5) {
      // Shot 3: Macro Close-up of Footprints in Mud & Flapping Police Tape
      const localT = t - 8.5;
      c.save();

      // Wet silt background
      c.fillStyle = '#0b111a';
      c.fillRect(0, 0, W, H);

      // Footprints impression in mud
      c.fillStyle = '#05080c';
      // Work boot print
      c.beginPath();
      c.ellipse(480, 320, 38, 70, Math.PI / 10, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.ellipse(540, 220, 32, 60, -Math.PI / 12, 0, Math.PI * 2);
      c.fill();

      // Oxford shoe print
      c.beginPath();
      c.ellipse(660, 330, 24, 55, Math.PI / 8, 0, Math.PI * 2);
      c.fill();

      // Puddle reflections
      c.fillStyle = 'rgba(61, 245, 255, 0.12)';
      c.beginPath();
      c.ellipse(500, 340, 80, 30, 0, 0, Math.PI * 2);
      c.fill();

      // Forensic Police Tape blowing across frame
      const tapeWave = Math.sin(localT * 6) * 18;
      c.strokeStyle = '#f1c40f';
      c.lineWidth = 26;
      c.beginPath();
      c.moveTo(-20, 160 + tapeWave);
      c.bezierCurveTo(400, 120 - tapeWave, 800, 200 + tapeWave, W + 20, 140 - tapeWave);
      c.stroke();

      // Black police tape text stripes
      c.strokeStyle = '#000000';
      c.lineWidth = 4;
      c.setLineDash([18, 14]);
      c.stroke();
      c.setLineDash([]);

      drawRainStreaks(c, W, H, t);
      c.restore();

    } else if (t < 16.5) {
      // Shot 4: Dramatic Close-up of the Glowing Laptop on Concrete Pillar
      const localT = t - 12.5;
      const pushIn = 1.0 + localT * 0.12;

      c.save();
      c.translate(W / 2, H / 2);
      c.scale(pushIn, pushIn);
      c.translate(-W / 2, -H / 2);

      // Dark concrete pillar
      c.fillStyle = '#070b12';
      c.fillRect(0, 0, W, H);

      c.fillStyle = '#141d29';
      c.beginPath();
      c.moveTo(280, 320);
      c.lineTo(1000, 320);
      c.lineTo(1050, H);
      c.lineTo(230, H);
      c.closePath();
      c.fill();

      // Laptop Base
      c.fillStyle = '#1e2836';
      c.fillRect(440, 310, 400, 24);

      // Glowing Laptop Screen (Beveled)
      c.fillStyle = '#080d16';
      c.fillRect(460, 140, 360, 170);
      c.strokeStyle = '#3DF5FF';
      c.lineWidth = 2;
      c.strokeRect(460, 140, 360, 170);

      // Screen Cyan Glow Bloom
      const screenBloom = c.createRadialGradient(640, 220, 30, 640, 220, 260);
      screenBloom.addColorStop(0, 'rgba(61, 245, 255, 0.45)');
      screenBloom.addColorStop(1, 'rgba(61, 245, 255, 0)');
      c.fillStyle = screenBloom;
      c.fillRect(380, 60, 520, 320);

      // OS Session Display on Screen
      c.fillStyle = '#3DF5FF';
      c.font = 'bold 14px Courier, monospace';
      c.fillText('NirvanaOS Heuristic Terminal v4.8', 480, 175);

      c.fillStyle = '#ffffff';
      c.font = '12px Courier, monospace';
      c.fillText('USER: Dr. Meera Sahoo (Active)', 480, 205);

      c.fillStyle = '#FFB84D';
      c.fillText('LAST LOGIN: 23:41:00 IST', 480, 230);

      c.fillStyle = '#4DFFA6';
      c.fillText('SESSION: ENCRYPTED // STANDBY', 480, 255);

      // ASSIST blinking icon on screen
      c.strokeStyle = '#3DF5FF';
      c.lineWidth = 2;
      c.beginPath();
      c.arc(770, 205, 16, 0, Math.PI * 2);
      c.stroke();
      c.fillStyle = '#3DF5FF';
      c.beginPath();
      c.arc(765, 202, 2.5, 0, Math.PI * 2);
      c.arc(775, 202, 2.5, 0, Math.PI * 2);
      c.fill();

      drawRainStreaks(c, W, H, t);
      c.restore();

    } else {
      // Shot 5: Smash to Black Title Card
      c.fillStyle = '#030508';
      c.fillRect(0, 0, W, H);

      c.fillStyle = '#dbe4de';
      c.font = '900 48px Impact, sans-serif';
      c.letterSpacing = '0.15em';
      c.textAlign = 'center';
      c.shadowColor = 'rgba(61, 245, 255, 0.5)';
      c.shadowBlur = 18;
      c.fillText('LAST LOGIN v2', W / 2, H / 2 - 10);

      c.fillStyle = '#FF3B5C';
      c.font = 'bold 14px Courier, monospace';
      c.shadowBlur = 8;
      c.shadowColor = 'rgba(255, 59, 92, 0.8)';
      c.fillText('CASE SAHOO // 2026-1147', W / 2, H / 2 + 30);
    }
  }

  function drawRainStreaks(c, W, H, t) {
    c.strokeStyle = 'rgba(61, 245, 255, 0.28)';
    c.lineWidth = 1.2;
    c.beginPath();
    for (let i = 0; i < 45; i++) {
      const rx = (i * 37 + t * 450) % W;
      const ry = (i * 29 + t * 900) % H;
      c.moveTo(rx, ry);
      c.lineTo(rx - 8, ry + 22);
    }
    c.stroke();
  }

  // Start Animation
  animFrameId = requestAnimationFrame(renderFrame);

  return container;
}

