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
      // Shot 2: High-Impact Cinematic Tracking Shot of Dr. Sahoo's Abandoned Sedan
      const localT = t - 4.5;
      drawDetailedAbandonedVehicle(c, W, H, localT, t);

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

  function drawDetailedAbandonedVehicle(c, W, H, localT, t) {
    const progress = localT / 4.0;
    // Anamorphic steadycam tracking dolly motion
    const camZoom = 1.0 + progress * 0.10;
    const camShakeX = Math.sin(localT * 8.5) * 1.4 + Math.cos(localT * 14.2) * 0.7;
    const camShakeY = Math.cos(localT * 7.1) * 1.0 + Math.sin(localT * 11.5) * 0.5;
    const panX = progress * 42;

    c.save();
    c.translate(W / 2 + camShakeX, H / 2 + camShakeY);
    c.scale(camZoom, camZoom);
    c.translate(-W / 2 - panX, -H / 2);

    // 1. Dark Monsoon Sky & Embankment
    const skyGrad = c.createLinearGradient(0, 0, 0, 320);
    skyGrad.addColorStop(0, '#020509');
    skyGrad.addColorStop(0.7, '#070f1a');
    skyGrad.addColorStop(1, '#0b1626');
    c.fillStyle = skyGrad;
    c.fillRect(0, 0, W, 320);

    // Distant River & Silhouette Trees
    c.fillStyle = '#050a12';
    c.beginPath();
    c.moveTo(0, 240);
    c.bezierCurveTo(300, 220, 700, 260, W, 230);
    c.lineTo(W, 310);
    c.lineTo(0, 310);
    c.closePath();
    c.fill();

    // Kuakhai River Water Ribbon with moving current shimmer
    const riverGrad = c.createLinearGradient(0, 240, 0, 310);
    riverGrad.addColorStop(0, '#06111e');
    riverGrad.addColorStop(1, '#0a1a2e');
    c.fillStyle = riverGrad;
    c.fillRect(0, 240, W, 70);

    // River water highlights
    c.strokeStyle = 'rgba(61, 245, 255, 0.2)';
    c.lineWidth = 1;
    for (let r = 0; r < 5; r++) {
      const rx = (r * 220 + t * 40) % W;
      c.beginPath();
      c.moveTo(rx, 255 + r * 10);
      c.lineTo(rx + 80, 255 + r * 10);
      c.stroke();
    }

    // Wet muddy ground road / riverbank embankment
    const groundGrad = c.createLinearGradient(0, 300, 0, H);
    groundGrad.addColorStop(0, '#0c1520');
    groundGrad.addColorStop(0.4, '#141e2a');
    groundGrad.addColorStop(1, '#070c12');
    c.fillStyle = groundGrad;
    c.beginPath();
    c.moveTo(0, 310);
    c.bezierCurveTo(400, 290, 800, 320, W, 300);
    c.lineTo(W, H);
    c.lineTo(0, H);
    c.closePath();
    c.fill();

    // Mud tire ruts from Dr. Sahoo's car skidding to a halt
    c.strokeStyle = '#05080c';
    c.lineWidth = 14;
    c.beginPath();
    c.moveTo(0, 390);
    c.quadraticCurveTo(320, 375, 480, 385);
    c.stroke();
    c.beginPath();
    c.moveTo(0, 440);
    c.quadraticCurveTo(340, 435, 780, 420);
    c.stroke();

    // Wet Puddle 1: Main pool under and extending past headlights
    const p1Grad = c.createRadialGradient(820, 430, 20, 820, 430, 280);
    p1Grad.addColorStop(0, 'rgba(30, 45, 65, 0.7)');
    p1Grad.addColorStop(0.7, 'rgba(12, 20, 30, 0.5)');
    p1Grad.addColorStop(1, 'rgba(8, 14, 20, 0)');
    c.fillStyle = p1Grad;
    c.beginPath();
    c.ellipse(820, 430, 260, 50, -0.05, 0, Math.PI * 2);
    c.fill();

    // Wet Puddle 2: Under open driver's door
    c.fillStyle = 'rgba(25, 38, 55, 0.65)';
    c.beginPath();
    c.ellipse(540, 410, 120, 30, 0.05, 0, Math.PI * 2);
    c.fill();

    // Animated rain ripples on puddles
    const ripplePhase = (localT * 3.5) % 1;
    c.strokeStyle = `rgba(61, 245, 255, ${0.4 * (1 - ripplePhase)})`;
    c.lineWidth = 1;
    c.beginPath();
    c.ellipse(800, 425, 25 + ripplePhase * 40, 8 + ripplePhase * 12, 0, 0, Math.PI * 2);
    c.stroke();
    c.beginPath();
    c.ellipse(540, 410, 15 + ripplePhase * 30, 5 + ripplePhase * 10, 0, 0, Math.PI * 2);
    c.stroke();

    // ==========================================
    // CAR SPECIFICATIONS & GEOMETRY
    // ==========================================
    const carX = 350 - progress * 35;
    const carY = 205;

    // Headlight Voltage Flicker effect
    const flicker = 0.94 + Math.sin(t * 14) * 0.04 + (Math.sin(t * 31) > 0.8 ? 0.06 : 0);
    // Hazard Flasher rhythm
    const isHazardOn = Math.sin(localT * 6.5) > 0.1;

    // --- REAR LIGHT REFLECTION IN WATER ---
    const tailReflect = c.createRadialGradient(carX + 50, 415, 5, carX + 50, 415, 80);
    tailReflect.addColorStop(0, 'rgba(255, 23, 68, 0.35)');
    tailReflect.addColorStop(1, 'rgba(255, 23, 68, 0)');
    c.fillStyle = tailReflect;
    c.fillRect(carX - 30, 385, 160, 60);

    // --- HEADLIGHT GROUND CAUSTICS IN PUDDLE ---
    const headReflect = c.createRadialGradient(carX + 580, 425, 20, carX + 680, 425, 240);
    headReflect.addColorStop(0, `rgba(255, 255, 230, ${0.65 * flicker})`);
    headReflect.addColorStop(0.3, `rgba(61, 245, 255, ${0.35 * flicker})`);
    headReflect.addColorStop(1, 'rgba(61, 245, 255, 0)');
    c.fillStyle = headReflect;
    c.fillRect(carX + 400, 380, W - (carX + 400), 100);

    // --- CAR DROP SHADOW ---
    c.fillStyle = 'rgba(2, 4, 7, 0.85)';
    c.beginPath();
    c.ellipse(carX + 240, carY + 168, 250, 24, 0, 0, Math.PI * 2);
    c.fill();

    // --- CAR CHASSIS: LOWER RUNNING BOARD & UNDERBODY ---
    c.fillStyle = '#05090f';
    c.fillRect(carX + 80, carY + 140, 340, 18);

    // --- ALLOY WHEELS ---
    function drawWheel(wx, wy) {
      // Outer tire shadow
      c.fillStyle = '#020406';
      c.beginPath();
      c.arc(wx, wy, 38, 0, Math.PI * 2);
      c.fill();

      // Tire rubber with tread
      c.fillStyle = '#0b1118';
      c.beginPath();
      c.arc(wx, wy, 36, 0, Math.PI * 2);
      c.fill();

      // Wet tire rubber specular ring
      c.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      c.lineWidth = 1.5;
      c.beginPath();
      c.arc(wx, wy, 34, Math.PI * 1.1, Math.PI * 1.9);
      c.stroke();

      // Inner Rim Barrel
      c.fillStyle = '#17222f';
      c.beginPath();
      c.arc(wx, wy, 26, 0, Math.PI * 2);
      c.fill();

      // Performance Cyan Brake Caliper (Brembo style)
      c.fillStyle = '#3DF5FF';
      c.beginPath();
      c.arc(wx, wy, 22, -Math.PI * 0.45, -Math.PI * 0.05);
      c.lineTo(wx + 16, wy - 4);
      c.closePath();
      c.fill();

      // Slotted Brake Rotor
      c.strokeStyle = '#576574';
      c.lineWidth = 1;
      c.beginPath();
      c.arc(wx, wy, 20, 0, Math.PI * 2);
      c.stroke();

      // 5-Spoke Alloy Rim
      c.strokeStyle = '#c8d6e5';
      c.lineWidth = 3.5;
      for (let s = 0; s < 5; s++) {
        const ang = (s * Math.PI * 2) / 5 + (localT * 0.1);
        c.beginPath();
        c.moveTo(wx, wy);
        c.lineTo(wx + Math.cos(ang) * 24, wy + Math.sin(ang) * 24);
        c.stroke();
      }

      // Center Hub Cap & Lug Nuts
      c.fillStyle = '#090e14';
      c.beginPath();
      c.arc(wx, wy, 7, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = '#3DF5FF';
      c.beginPath();
      c.arc(wx, wy, 3, 0, Math.PI * 2);
      c.fill();
    }

    // Rear Wheel
    drawWheel(carX + 85, carY + 145);
    // Front Wheel
    drawWheel(carX + 395, carY + 145);

    // --- WHEEL ARCHES ---
    c.fillStyle = '#060a10';
    c.beginPath();
    c.arc(carX + 85, carY + 145, 42, Math.PI, 0);
    c.fill();
    c.beginPath();
    c.arc(carX + 395, carY + 145, 42, Math.PI, 0);
    c.fill();

    // --- MAIN CAR BODY PROFILE (Executive Obsidian Metallic Sedan) ---
    const bodyGrad = c.createLinearGradient(carX, carY, carX + 480, carY + 160);
    bodyGrad.addColorStop(0, '#0a121c');
    bodyGrad.addColorStop(0.3, '#182536');
    bodyGrad.addColorStop(0.6, '#0f1824');
    bodyGrad.addColorStop(1, '#070c14');
    c.fillStyle = bodyGrad;

    c.beginPath();
    // Start at rear bumper
    c.moveTo(carX - 10, carY + 138);
    // Rear decklid & trunk
    c.lineTo(carX + 2, carY + 88);
    c.quadraticCurveTo(carX + 15, carY + 65, carX + 45, carY + 68);
    // Rear roofline arch
    c.quadraticCurveTo(carX + 140, carY + 8, carX + 240, carY + 6);
    // Windshield slope
    c.quadraticCurveTo(carX + 340, carY + 12, carX + 375, carY + 68);
    // Front hood
    c.quadraticCurveTo(carX + 430, carY + 76, carX + 472, carY + 98);
    // Front bumper & grille nose
    c.lineTo(carX + 478, carY + 122);
    c.quadraticCurveTo(carX + 475, carY + 142, carX + 450, carY + 145);
    // Front wheel cutout
    c.lineTo(carX + 436, carY + 145);
    c.arc(carX + 395, carY + 145, 41, 0, Math.PI, true);
    // Rocker panel
    c.lineTo(carX + 126, carY + 145);
    // Rear wheel cutout
    c.arc(carX + 85, carY + 145, 41, 0, Math.PI, true);
    c.lineTo(carX - 10, carY + 138);
    c.closePath();
    c.fill();

    // Metallic Specular Horizon Edge Reflection Line
    c.strokeStyle = 'rgba(127, 184, 255, 0.45)';
    c.lineWidth = 1.8;
    c.beginPath();
    c.moveTo(carX + 40, carY + 75);
    c.lineTo(carX + 465, carY + 98);
    c.stroke();

    // Aerodynamic lower body creaseline
    c.strokeStyle = 'rgba(61, 245, 255, 0.18)';
    c.lineWidth = 1.2;
    c.beginPath();
    c.moveTo(carX + 130, carY + 132);
    c.lineTo(carX + 350, carY + 132);
    c.stroke();

    // --- REAR PASSENGER CABIN & GLASS ---
    c.fillStyle = '#08101a';
    c.beginPath();
    c.moveTo(carX + 65, carY + 68);
    c.lineTo(carX + 120, carY + 22);
    c.lineTo(carX + 210, carY + 18);
    c.lineTo(carX + 205, carY + 68);
    c.closePath();
    c.fill();

    // Chrome window trim outline
    c.strokeStyle = 'rgba(200, 215, 230, 0.4)';
    c.lineWidth = 1.2;
    c.stroke();

    // --- FRONT WINDSHIELD (Tinted Glass reflecting monsoon sky) ---
    const windGrad = c.createLinearGradient(carX + 260, carY + 15, carX + 370, carY + 70);
    windGrad.addColorStop(0, '#091524');
    windGrad.addColorStop(0.6, '#14253a');
    windGrad.addColorStop(1, '#08101a');
    c.fillStyle = windGrad;
    c.beginPath();
    c.moveTo(carX + 245, carY + 14);
    c.lineTo(carX + 335, carY + 18);
    c.lineTo(carX + 372, carY + 68);
    c.lineTo(carX + 280, carY + 68);
    c.closePath();
    c.fill();

    // Windshield Wiper Blade in resting position
    c.strokeStyle = '#1e272e';
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(carX + 285, carY + 68);
    c.lineTo(carX + 350, carY + 38);
    c.stroke();

    // --- INTERIOR COCKPIT ILLUMINATION (Through Open Door) ---
    // Warm Tungsten / Amber Dome light glowing from cabin ceiling
    const domeLight = c.createRadialGradient(carX + 230, carY + 55, 10, carX + 230, carY + 75, 140);
    domeLight.addColorStop(0, 'rgba(255, 230, 160, 0.85)');
    domeLight.addColorStop(0.5, 'rgba(255, 184, 77, 0.4)');
    domeLight.addColorStop(1, 'rgba(255, 184, 77, 0)');
    c.fillStyle = domeLight;
    c.beginPath();
    c.moveTo(carX + 170, carY + 30);
    c.lineTo(carX + 295, carY + 30);
    c.lineTo(carX + 280, carY + 145);
    c.lineTo(carX + 155, carY + 145);
    c.closePath();
    c.fill();

    // Footwell courtesy spill on the ground outside the open door
    const footwellLight = c.createRadialGradient(carX + 210, carY + 160, 5, carX + 210, carY + 165, 85);
    footwellLight.addColorStop(0, 'rgba(255, 220, 140, 0.55)');
    footwellLight.addColorStop(0.6, 'rgba(255, 184, 77, 0.18)');
    footwellLight.addColorStop(1, 'rgba(255, 184, 77, 0)');
    c.fillStyle = footwellLight;
    c.beginPath();
    c.ellipse(carX + 210, carY + 165, 90, 24, 0, 0, Math.PI * 2);
    c.fill();

    // Driver's Empty Bucket Seat silhouette (Stitched leather)
    c.fillStyle = '#060a10';
    // Headrest
    c.beginPath();
    c.roundRect(carX + 195, carY + 45, 18, 22, [5, 5, 2, 2]);
    c.fill();
    // Seat Back & Bolsters
    c.beginPath();
    c.moveTo(carX + 188, carY + 70);
    c.lineTo(carX + 220, carY + 70);
    c.lineTo(carX + 218, carY + 120);
    c.lineTo(carX + 185, carY + 120);
    c.closePath();
    c.fill();

    // Tilt Steering Wheel Silhouette
    c.strokeStyle = '#1e272e';
    c.lineWidth = 3.5;
    c.beginPath();
    c.ellipse(carX + 258, carY + 76, 12, 20, -0.3, 0, Math.PI * 2);
    c.stroke();

    // Digital Instrument Cluster glowing Cyan
    c.fillStyle = '#3DF5FF';
    c.shadowColor = '#3DF5FF';
    c.shadowBlur = 10;
    c.fillRect(carX + 266, carY + 66, 26, 12);
    c.shadowBlur = 0; // reset
    c.fillStyle = '#0B0F1A';
    c.font = 'bold 5px Courier, monospace';
    c.fillText('ON', carX + 273, carY + 74);

    // --- THE OPEN DRIVER'S DOOR (3D Perspective Open Door) ---
    // Outer door panel swinging open toward viewer
    const doorX1 = carX + 180; // Hinge point at A-pillar
    const doorY1 = carY + 70;
    const doorX2 = carX + 135; // Swung open outward tip
    const doorY2 = carY + 148;

    c.save();
    // Door thickness / shadow
    c.fillStyle = '#04070c';
    c.beginPath();
    c.moveTo(doorX1, doorY1);
    c.lineTo(doorX2 - 6, doorY2);
    c.lineTo(doorX2 + 8, doorY2 + 4);
    c.lineTo(doorX1 + 14, doorY1);
    c.closePath();
    c.fill();

    // Outer painted door skin
    const doorSkinGrad = c.createLinearGradient(doorX1, doorY1, doorX2, doorY2);
    doorSkinGrad.addColorStop(0, '#162436');
    doorSkinGrad.addColorStop(1, '#091018');
    c.fillStyle = doorSkinGrad;
    c.beginPath();
    c.moveTo(doorX1, doorY1);
    c.lineTo(doorX2, doorY2 - 32);
    c.lineTo(doorX2, doorY2);
    c.lineTo(doorX1 + 10, doorY1 + 68);
    c.closePath();
    c.fill();
    c.strokeStyle = 'rgba(127, 184, 255, 0.4)';
    c.lineWidth = 1.2;
    c.stroke();

    // Open Door Window Frame
    c.strokeStyle = '#34495e';
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(doorX1, doorY1);
    c.lineTo(doorX2, doorY2 - 68);
    c.lineTo(doorX2, doorY2 - 32);
    c.stroke();

    // Chrome Flush Door Handle on open door
    c.fillStyle = '#ecf0f1';
    c.fillRect(doorX2 + 10, doorY2 - 20, 14, 3);

    // Water droplets dripping from corner of open door
    const dripProgress = (localT * 4.0) % 1;
    c.fillStyle = 'rgba(61, 245, 255, 0.75)';
    c.beginPath();
    c.arc(doorX2, doorY2 + dripProgress * 28, 2, 0, Math.PI * 2);
    c.fill();

    c.restore();

    // --- SIDE MIRROR WITH AMBER BLINKER ---
    c.fillStyle = '#080d15';
    c.beginPath();
    c.roundRect(carX + 265, carY + 68, 18, 9, 3);
    c.fill();
    if (isHazardOn) {
      c.fillStyle = '#f1c40f';
      c.shadowColor = '#f39c12';
      c.shadowBlur = 8;
      c.fillRect(carX + 266, carY + 72, 8, 3);
      c.shadowBlur = 0;
    }

    // --- REAR TAILLIGHTS (Continuous Crimson LED Ribbon) ---
    c.fillStyle = '#ff1744';
    c.shadowColor = '#ff1744';
    c.shadowBlur = 14;
    c.fillRect(carX - 2, carY + 90, 8, 12);
    c.fillRect(carX + 5, carY + 86, 26, 4);
    c.shadowBlur = 0;

    // --- FRONT HEADLIGHT ASSEMBLY & VOLUMETRIC BEAMS ---
    const hx = carX + 452;
    const hy = carY + 104;

    // Headlight Lens Housing
    c.fillStyle = '#142233';
    c.beginPath();
    c.moveTo(hx - 12, hy - 14);
    c.lineTo(hx + 18, hy);
    c.lineTo(hx + 8, hy + 18);
    c.lineTo(hx - 12, hy + 10);
    c.closePath();
    c.fill();

    // Crystal LED Projector Bulb
    c.fillStyle = `rgba(255, 255, 255, ${flicker})`;
    c.shadowColor = '#ffffff';
    c.shadowBlur = 20;
    c.beginPath();
    c.arc(hx + 6, hy + 6, 7, 0, Math.PI * 2);
    c.fill();
    c.shadowBlur = 0;

    // Sharp Cyan DRL Eyebrow
    c.strokeStyle = '#3DF5FF';
    c.lineWidth = 2.5;
    c.beginPath();
    c.moveTo(hx - 10, hy - 10);
    c.lineTo(hx + 14, hy + 1);
    c.stroke();

    // Front Amber Turn Signal
    if (isHazardOn) {
      c.fillStyle = '#f39c12';
      c.shadowColor = '#f39c12';
      c.shadowBlur = 12;
      c.fillRect(hx + 10, hy + 8, 6, 5);
      c.shadowBlur = 0;
    }

    // ==========================================
    // VOLUMETRIC HIGH-BEAM LIGHT CONE
    // ==========================================
    const coneGrad = c.createRadialGradient(hx + 10, hy + 6, 10, hx + 400, hy + 60, 680);
    coneGrad.addColorStop(0, `rgba(255, 255, 245, ${0.92 * flicker})`);
    coneGrad.addColorStop(0.18, `rgba(230, 245, 255, ${0.48 * flicker})`);
    coneGrad.addColorStop(0.55, `rgba(61, 245, 255, ${0.16 * flicker})`);
    coneGrad.addColorStop(1, 'rgba(61, 245, 255, 0)');

    c.fillStyle = coneGrad;
    c.beginPath();
    c.moveTo(hx + 10, hy + 4);
    c.lineTo(W, 110);
    c.lineTo(W, 460);
    c.lineTo(hx + 10, hy + 12);
    c.closePath();
    c.fill();

    // High-Beam Core Shaft
    const coreGrad = c.createLinearGradient(hx, hy, W, hy + 50);
    coreGrad.addColorStop(0, `rgba(255, 255, 255, ${0.85 * flicker})`);
    coreGrad.addColorStop(0.3, `rgba(255, 255, 240, ${0.35 * flicker})`);
    coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    c.fillStyle = coreGrad;
    c.beginPath();
    c.moveTo(hx + 10, hy + 5);
    c.lineTo(W, 210);
    c.lineTo(W, 290);
    c.lineTo(hx + 10, hy + 9);
    c.closePath();
    c.fill();

    // ==========================================
    // PARTICLES IN BEAM & DRAGGING MIST
    // ==========================================
    // Floating dust/water particles sparkling in the headlight cone
    c.fillStyle = 'rgba(255, 255, 255, 0.65)';
    for (let p = 0; p < 35; p++) {
      const px = hx + ((p * 29 + t * 160) % (W - hx));
      const py = hy + ((p * 17 + Math.sin(t * 2 + p) * 40) % 240) - 20;
      if (py > 130 && py < 420) {
        const pSize = 1.2 + (p % 3) * 0.8;
        c.beginPath();
        c.arc(px, py, pSize, 0, Math.PI * 2);
        c.fill();
      }
    }

    // Drifting Low Fog Banks
    for (let f = 0; f < 3; f++) {
      const fogX = ((localT * 35 * (f + 1) + f * 400) % (W + 400)) - 200;
      const fogGrad = c.createRadialGradient(fogX, 400 + f * 25, 20, fogX, 400 + f * 25, 180);
      fogGrad.addColorStop(0, 'rgba(168, 194, 216, 0.12)');
      fogGrad.addColorStop(1, 'rgba(168, 194, 216, 0)');
      c.fillStyle = fogGrad;
      c.fillRect(fogX - 180, 320, 360, 160);
    }

    // Heavy Rain Streaks & Splashes
    drawRainStreaks(c, W, H, t);

    // Splashes on car roof and hood
    c.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    c.lineWidth = 1;
    for (let sp = 0; sp < 8; sp++) {
      const sx = carX + 60 + (sp * 45 + localT * 200) % 360;
      const sy = carY + 35 + (sp % 3) * 15;
      c.beginPath();
      c.moveTo(sx, sy);
      c.lineTo(sx - 3, sy - 3);
      c.moveTo(sx, sy);
      c.lineTo(sx + 3, sy - 3);
      c.stroke();
    }

    c.restore();
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

