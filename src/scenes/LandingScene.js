// Pure 4K Vector SVG & High-DPI Canvas Atmospheric Title Screen
// Zero raster images — pure SVG double exposure, canvas mist, and synthesized audio.

import { audioManager } from '../game/audio-manager.js';

export function createLandingScene(onProceedToPrologue) {
  const container = document.createElement('div');
  container.className = 'landing-scene pure-vector-theme';

  let hasTriggered = false;
  let animId = null;

  container.innerHTML = `
    <!-- High-DPI Atmospheric Mist & Dust Particles Canvas -->
    <canvas id="landing-atmosphere-canvas" class="landing-canvas"></canvas>

    <!-- Center Stage: Pure Vector Double-Exposure LAST LOGIN -->
    <div class="vector-title-container">
      <svg class="landing-title-svg" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="godRayBeam" x1="0%" y1="0%" x2="30%" y2="100%">
            <stop offset="0%" stop-color="#E8F2FA" stop-opacity="0.9"/>
            <stop offset="20%" stop-color="#A8C2D8" stop-opacity="0.55"/>
            <stop offset="55%" stop-color="#34485D" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#05080D" stop-opacity="0"/>
          </linearGradient>

          <radialGradient id="flashlightCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
            <stop offset="45%" stop-color="#E8F2FA" stop-opacity="0.85"/>
            <stop offset="100%" stop-color="#A8C2D8" stop-opacity="0"/>
          </radialGradient>

          <linearGradient id="textMistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="35%" stop-color="#E8F2FA"/>
            <stop offset="70%" stop-color="#A8C2D8"/>
            <stop offset="100%" stop-color="#34485D"/>
          </linearGradient>

          <!-- Double Exposure Mask for LAST LOGIN -->
          <mask id="titleMask">
            <rect width="100%" height="100%" fill="black" />
            <text x="600" y="235" text-anchor="middle" font-family="'Oswald', 'Bebas Neue', Impact, sans-serif" font-size="255" font-weight="700" letter-spacing="0.08em" fill="white">LAST</text>
            <text x="600" y="520" text-anchor="middle" font-family="'Oswald', 'Bebas Neue', Impact, sans-serif" font-size="255" font-weight="700" letter-spacing="0.08em" fill="white">LOGIN</text>
          </mask>
        </defs>

        <!-- Dynamic Volumetric Light Rays angling down from flashlight -->
        <g class="volumetric-godrays">
          <polygon points="466,432 60,640 1140,640" fill="url(#godRayBeam)" opacity="0.8" />
          <polygon points="466,432 200,640 960,640" fill="url(#godRayBeam)" opacity="0.6" />
          <polygon points="466,432 320,640 820,640" fill="url(#godRayBeam)" opacity="0.4" />
        </g>

        <!-- Double Exposure Forest inside Typography -->
        <g mask="url(#titleMask)">
          <rect width="1200" height="640" fill="url(#textMistGrad)" />

          <!-- Distant Misty Mountain Ridge -->
          <path d="M 0,380 L 140,310 L 260,350 L 400,260 L 560,340 L 720,240 L 860,320 L 1020,250 L 1200,310 L 1200,640 L 0,640 Z" fill="#1A2533" opacity="0.85" />
          
          <!-- Mid Forest Ridge -->
          <path d="M 0,440 L 100,390 L 220,430 L 360,340 L 500,420 L 640,330 L 780,410 L 920,350 L 1080,410 L 1200,360 L 1200,640 L 0,640 Z" fill="#0C131D" opacity="0.9" />

          <!-- Serrated Pine Tree Silhouettes -->
          <path d="
            M 0,640 L 0,490 L 35,510 L 65,440 L 85,510 L 135,420 L 175,500 L 215,410 L 255,490 
            L 315,380 L 365,480 L 415,390 L 455,490 L 505,400 L 545,510 L 605,390 L 665,490 
            L 725,410 L 775,500 L 835,400 L 885,490 L 945,420 L 1005,500 L 1065,390 L 1125,490 L 1200,430 L 1200,640 Z
          " fill="#05080D" />
        </g>

        <!-- Sharp Outer Text Contour -->
        <text x="600" y="235" text-anchor="middle" font-family="'Oswald', 'Bebas Neue', Impact, sans-serif" font-size="255" font-weight="700" letter-spacing="0.08em" fill="none" stroke="rgba(232, 242, 250, 0.45)" stroke-width="1.5">LAST</text>
        <text x="600" y="520" text-anchor="middle" font-family="'Oswald', 'Bebas Neue', Impact, sans-serif" font-size="255" font-weight="700" letter-spacing="0.08em" fill="none" stroke="rgba(232, 242, 250, 0.45)" stroke-width="1.5">LOGIN</text>

        <!-- Lone Detective Silhouette inside letter 'O' of LOGIN -->
        <g class="detective-cutout" transform="translate(422, 356)">
          <path d="M 18,12 Q 10,12 10,24 Q 10,34 18,36 Q 26,34 26,24 Q 26,12 18,12 Z" fill="#05080D" />
          <circle cx="18" cy="22" r="7" fill="#05080D" />
          <polygon points="11,28 18,32 12,40" fill="#020305" />
          <polygon points="25,28 18,32 24,40" fill="#020305" />
          <path d="M 10,36 L 4,58 L 5,96 L -2,130 L 18,132 L 20,96 L 22,96 L 24,132 L 42,130 L 34,96 L 36,58 L 28,36 Z" fill="#05080D" />
          <path d="M 5,52 L -1,72 L -3,88 L 0,90 L 4,76 L 9,58 Z" fill="#05080D" />
          <path d="M 31,52 L 38,70 L 43,78 L 47,76 L 41,66 L 35,52 Z" fill="#05080D" />
          <path d="M 7,130 L 6,155 L 12,157 L 13,131 Z" fill="#020305" />
          <path d="M 27,131 L 28,157 L 34,155 L 33,130 Z" fill="#020305" />

          <!-- Flashlight Lens Core -->
          <circle cx="47" cy="76" r="6" fill="url(#flashlightCore)" />
          <circle cx="47" cy="76" r="2.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>

    <!-- Interactive HUD Prompt Button -->
    <div class="landing-hud-wrapper">
      <button type="button" id="btn-enter-game" class="landing-enter-button" aria-label="Press Enter or Click to Play">
        <span class="hud-corner top-left"></span>
        <span class="hud-corner top-right"></span>
        <span class="landing-prompt-text" id="landing-prompt-label">PRESS ENTER TO START GAME [CLICK TO START &bull; PRESS ENTER]</span>
        <span class="hud-corner bottom-left"></span>
        <span class="hud-corner bottom-right"></span>
      </button>
      <div class="landing-clean-notice">&copy; 2026 NIRVANA LABS // ODYSSEY CYBER CRIME INVESTIGATION</div>
    </div>

    <!-- Cinematic Flash / Fade Overlay -->
    <div id="landing-flash" class="landing-flash-overlay"></div>
  `;

  // Initialize Canvas Particles
  const canvas = container.querySelector('#landing-atmosphere-canvas');
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Mist & Dust particles
  const mists = Array.from({ length: 36 }, () => ({
    x: Math.random() * width,
    y: height * 0.45 + Math.random() * (height * 0.5),
    radius: 120 + Math.random() * 160,
    speedX: 0.2 + Math.random() * 0.3,
    floatOffset: Math.random() * Math.PI * 2,
    opacity: 0.03 + Math.random() * 0.05
  }));

  const dusts = Array.from({ length: 60 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 0.8 + Math.random() * 1.6,
    speedX: (Math.random() - 0.5) * 0.25,
    speedY: -0.15 - Math.random() * 0.2,
    alpha: 0.15 + Math.random() * 0.4
  }));

  function renderParticles(time) {
    ctx.clearRect(0, 0, width, height);

    for (const m of mists) {
      m.x += m.speedX;
      if (m.x - m.radius > width) m.x = -m.radius;
      const floatY = m.y + Math.sin(time * 0.0008 + m.floatOffset) * 16;
      const grad = ctx.createRadialGradient(m.x, floatY, 0, m.x, floatY, m.radius);
      grad.addColorStop(0, `rgba(168, 194, 216, ${m.opacity})`);
      grad.addColorStop(0.6, `rgba(52, 72, 93, ${m.opacity * 0.4})`);
      grad.addColorStop(1, 'rgba(5, 8, 13, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(m.x, floatY, m.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const d of dusts) {
      d.x += d.speedX;
      d.y += d.speedY;
      if (d.y < 0) d.y = height;
      if (d.x < 0) d.x = width;
      if (d.x > width) d.x = 0;
      const shimmer = d.alpha * (0.8 + 0.2 * Math.sin(time * 0.003 + d.x));
      ctx.fillStyle = `rgba(232, 242, 250, ${shimmer})`;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
      ctx.fill();
    }

    animId = requestAnimationFrame(renderParticles);
  }
  animId = requestAnimationFrame(renderParticles);

  // Audio & Interaction Handling
  const enterBtn = container.querySelector('#btn-enter-game');
  const promptLabel = container.querySelector('#landing-prompt-label');
  const flashOverlay = container.querySelector('#landing-flash');

  // Attempt to play intro audio
  audioManager.playIntroMusic();

  const wakeAudio = () => {
    try {
      audioManager.ensureContext();
      audioManager.playIntroMusic();
    } catch (e) {}
  };
  window.addEventListener('pointerdown', wakeAudio, { once: true });
  window.addEventListener('keydown', wakeAudio, { once: true });

  function cleanup() {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', resizeCanvas);
    window.removeEventListener('keydown', keyHandler);
    window.removeEventListener('pointerdown', wakeAudio);
  }

  function triggerStart() {
    if (hasTriggered) return;
    hasTriggered = true;

    if (enterBtn) enterBtn.classList.add('triggered');
    if (promptLabel) promptLabel.textContent = 'COMMENCING INVESTIGATION... ⏩';
    if (flashOverlay) flashOverlay.classList.add('active');

    try {
      audioManager.ensureContext();
      audioManager.playWhoosh();
      audioManager.playStoryMusic();
    } catch (e) {}

    cleanup();

    container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    container.style.opacity = '0';
    container.style.transform = 'scale(1.03)';

    setTimeout(() => {
      container.remove();
      if (onProceedToPrologue) onProceedToPrologue();
    }, 600);
  }

  function keyHandler(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerStart();
    }
  }

  if (enterBtn) enterBtn.addEventListener('click', triggerStart);
  window.addEventListener('keydown', keyHandler);

  return container;
}
