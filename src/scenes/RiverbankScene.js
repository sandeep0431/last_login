// Prologue — Riverbank Scene with Parallax Layers, Rain, Police Lights & Hotspots

import { audioManager } from '../game/audio-manager.js';
import { DialogueBox } from '../components/DialogueBox.js';
import { DIALOGUE_DATA } from '../data/dialogue.js';
import { getCharacterSVG } from '../assets/characters.js';

export function createRiverbankScene(onComplete) {
  const container = document.createElement('div');
  container.className = 'riverbank-scene';
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.overflow = 'hidden';
  container.style.background = '#050a12';

  let aryaX = 180; // Arya's initial horizontal position (pixels)
  let dialogueInstance = null;

  container.innerHTML = `
    <!-- Layer 1: Distant City Skyline & Storm Clouds -->
    <div class="parallax-skyline" style="position: absolute; inset: 0; pointer-events: none; z-index: 1;">
      <svg viewBox="0 0 1200 600" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#050a14"/>
            <stop offset="60%" stop-color="#0b172a"/>
            <stop offset="100%" stop-color="#14243b"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#skyGrad)"/>
        <!-- Distant City Silhouette -->
        <polygon points="50,420 80,320 120,320 150,420 180,380 230,380 260,420 340,300 380,300 420,420 540,280 580,280 620,420 750,340 790,340 830,420 950,290 1000,290 1050,420 1150,360 1200,420 1200,480 0,480" fill="#070e1c" opacity="0.8"/>
        <!-- Radio Tower with Blinking Red Light -->
        <line x1="560" y1="280" x2="560" y2="210" stroke="#070e1c" stroke-width="2"/>
        <circle cx="560" cy="210" r="3" fill="#FF3B5C" opacity="0.9"/>
      </svg>
    </div>

    <!-- Layer 2: River Surface with Water Ripples & Reflections -->
    <div class="parallax-river" style="position: absolute; bottom: 120px; left: 0; right: 0; height: 180px; pointer-events: none; z-index: 2;">
      <svg viewBox="0 0 1200 180" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0b1a2e"/>
            <stop offset="100%" stop-color="#060d17"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="180" fill="url(#riverGrad)"/>
        <!-- Shimmering Water Lines -->
        <line x1="100" y1="40" x2="280" y2="40" stroke="#3DF5FF" stroke-width="1" opacity="0.25"/>
        <line x1="380" y1="65" x2="540" y2="65" stroke="#3DF5FF" stroke-width="1.5" opacity="0.2"/>
        <line x1="680" y1="35" x2="880" y2="35" stroke="#3DF5FF" stroke-width="1" opacity="0.25"/>
        <line x1="200" y1="90" x2="420" y2="90" stroke="#3DF5FF" stroke-width="1.5" opacity="0.3"/>
        <line x1="720" y1="85" x2="980" y2="85" stroke="#3DF5FF" stroke-width="1" opacity="0.25"/>
      </svg>
    </div>

    <!-- Police Beacon Strobes in Background -->
    <div class="police-lights">
      <div class="police-beacon-red" style="top: 35%; left: 15%; width: 220px; height: 120px;"></div>
      <div class="police-beacon-blue" style="top: 36%; left: 80%; width: 220px; height: 120px;"></div>
    </div>

    <!-- Dynamic Rain Particle Layer -->
    <div class="rain-container" id="rain-layer"></div>

    <!-- Layer 3: Foreground Riverbank & Muddy Shoreline -->
    <div class="parallax-foreground" style="position: absolute; bottom: 0; left: 0; right: 0; height: 150px; z-index: 6; pointer-events: auto;">
      <svg viewBox="0 0 1200 150" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#141f28"/>
            <stop offset="100%" stop-color="#080c10"/>
          </linearGradient>
        </defs>
        <path d="M 0 45 Q 300 20 600 40 T 1200 30 L 1200 150 L 0 150 Z" fill="url(#mudGrad)"/>
        <!-- Concrete Pier for Laptop -->
        <rect x="740" y="32" width="110" height="45" rx="3" fill="#1b2834" stroke="#2c3e50" stroke-width="2"/>
      </svg>

      <!-- Hotspot 1: Police Tape (Left) -->
      <div class="hotspot-item" id="hotspot-tape" style="position: absolute; bottom: 65px; left: 60px; cursor: pointer; z-index: 10;" title="Inspect Police Tape">
        <div style="background: rgba(241, 196, 15, 0.2); border: 2px dashed #f1c40f; color: #f1c40f; font-family: var(--font-mono); font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 6px;">
          <span>🚧 POLICE TAPE [E]</span>
        </div>
      </div>

      <!-- Hotspot 2: Muddy Footprints (Middle) -->
      <div class="hotspot-item" id="hotspot-footprints" style="position: absolute; bottom: 45px; left: 440px; cursor: pointer; z-index: 10;" title="Inspect Footprints">
        <div style="background: rgba(61, 245, 255, 0.15); border: 1px solid var(--color-cyan); color: var(--color-cyan); font-family: var(--font-mono); font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 6px;">
          <span>👣 MUDDY FOOTPRINTS [E]</span>
        </div>
      </div>

      <!-- Hotspot 3: Glowing Laptop (Right, Advances to Briefing) -->
      <div class="hotspot-item" id="hotspot-laptop" style="position: absolute; bottom: 85px; left: 755px; cursor: pointer; z-index: 10;" title="Inspect Dr. Sahoo's Laptop">
        <!-- Blinking Neon Laptop Glow -->
        <div style="background: rgba(61, 245, 255, 0.25); border: 2px solid var(--color-cyan); color: #fff; font-family: var(--font-mono); font-size: 11px; font-weight: bold; padding: 6px 12px; border-radius: var(--radius-sm); box-shadow: var(--shadow-glow-cyan); display: flex; align-items: center; gap: 8px; animation: charTalkBob 1s infinite alternate;">
          <span>💻 ACTIVE LAPTOP [INSPECT]</span>
        </div>
      </div>

      <!-- Inspector Arya Avatar on the Bank -->
      <div id="arya-avatar" style="position: absolute; bottom: 35px; left: ${aryaX}px; width: 80px; height: 95px; transition: left 0.12s linear; pointer-events: none; z-index: 8;">
        ${getCharacterSVG('arya', 'determined', false, 80)}
      </div>
    </div>

    <!-- On-screen Navigation Controls (Mobile & Accessibility Friendly) -->
    <div style="position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 14px; z-index: 20;">
      <button id="btn-move-left" style="background: rgba(20, 27, 45, 0.85); border: 1px solid var(--color-cyan); color: var(--color-cyan); font-family: var(--font-mono); font-size: 12px; padding: 6px 16px; border-radius: var(--radius-sm);">
        ◀ MOVE LEFT (A)
      </button>
      <button id="btn-move-right" style="background: rgba(20, 27, 45, 0.85); border: 1px solid var(--color-cyan); color: var(--color-cyan); font-family: var(--font-mono); font-size: 12px; padding: 6px 16px; border-radius: var(--radius-sm);">
        MOVE RIGHT (D) ▶
      </button>
    </div>

    <!-- Dialogue Box Container Slot -->
    <div id="riverbank-dialogue-slot"></div>
  `;

  // Start Rain Ambience
  audioManager.startRainAmbience();

  // Populate Rain Drops
  const rainLayer = container.querySelector('#rain-layer');
  for (let i = 0; i < 40; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.top = `${Math.random() * -20}%`;
    drop.style.height = `${16 + Math.random() * 24}px`;
    drop.style.animationDuration = `${0.6 + Math.random() * 0.4}s`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    rainLayer.appendChild(drop);
  }

  const avatar = container.querySelector('#arya-avatar');
  const dialogueSlot = container.querySelector('#riverbank-dialogue-slot');

  function updateAvatarPosition() {
    avatar.style.left = `${aryaX}px`;
  }

  function moveArya(delta) {
    aryaX = Math.max(30, Math.min(window.innerWidth - 120, aryaX + delta));
    updateAvatarPosition();
  }

  // Keyboard Navigation
  const keyHandler = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      moveArya(-35);
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      moveArya(35);
    }
  };
  window.addEventListener('keydown', keyHandler);

  container.querySelector('#btn-move-left').addEventListener('click', () => moveArya(-50));
  container.querySelector('#btn-move-right').addEventListener('click', () => moveArya(50));

  // Hotspot Interactions
  function triggerDialogue(nodeKey) {
    const node = DIALOGUE_DATA[nodeKey];
    if (!node) return;

    if (dialogueInstance) dialogueInstance.destroy();

    dialogueInstance = new DialogueBox(dialogueSlot, {
      onChoice: (choice) => {
        if (choice.next === 'briefing_start') {
          cleanup();
          if (onComplete) onComplete('briefing');
        } else if (choice.next && DIALOGUE_DATA[choice.next]) {
          triggerDialogue(choice.next);
        } else {
          dialogueInstance.destroy();
          dialogueInstance = null;
        }
      }
    });

    dialogueInstance.show(node);
  }

  container.querySelector('#hotspot-tape').addEventListener('click', () => {
    audioManager.playKeyTick();
    triggerDialogue('riverbank_tape');
  });

  container.querySelector('#hotspot-footprints').addEventListener('click', () => {
    audioManager.playKeyTick();
    triggerDialogue('riverbank_footprints');
  });

  container.querySelector('#hotspot-laptop').addEventListener('click', () => {
    audioManager.playKeyTick();
    triggerDialogue('riverbank_laptop');
  });

  function cleanup() {
    audioManager.stopRainAmbience();
    window.removeEventListener('keydown', keyHandler);
    if (dialogueInstance) dialogueInstance.destroy();
  }

  return container;
}

