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

    <!-- Upper Forensic Objective & Guidance Hint Banner -->
    <div id="riverbank-hint-banner" class="riverbank-hint-banner" title="Click to approach and examine Dr. Sahoo's field laptop">
      <div class="hint-pulse-dot"></div>
      <div class="hint-body">
        <div class="hint-eyebrow">FORENSIC OBJECTIVE // KUAKHAI EMBANKMENT</div>
        <div id="hint-objective-title" class="hint-title">
          Walk right across the shoreline to reach <strong>Dr. Sahoo's glowing laptop</strong> on the concrete pier.
        </div>
      </div>
      <div id="hint-objective-cta" class="hint-action">
        WALK: <strong>A / D</strong> OR <strong>◀ / ▶</strong> &nbsp;•&nbsp; <strong>[E] / CLICK LAPTOP</strong>
      </div>
    </div>

    <!-- Layer 2.5: Dr. Sahoo's Abandoned Sedan (Upstream on the bank) -->
    <div class="parallax-car" style="position: absolute; bottom: 75px; left: 110px; width: 320px; height: 140px; pointer-events: none; z-index: 4;">
      <svg viewBox="0 0 320 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bankCarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0a1422"/>
            <stop offset="50%" stop-color="#18273c"/>
            <stop offset="100%" stop-color="#080f1a"/>
          </linearGradient>
          <radialGradient id="beamVol" cx="0%" cy="50%" r="100%">
            <stop offset="0%" stop-color="rgba(255, 255, 240, 0.85)"/>
            <stop offset="35%" stop-color="rgba(61, 245, 255, 0.3)"/>
            <stop offset="100%" stop-color="rgba(61, 245, 255, 0)"/>
          </radialGradient>
        </defs>

        <!-- Headlight Volumetric Beam Cutting Across the Mud -->
        <polygon points="265,75 320,40 320,110 265,82" fill="url(#beamVol)"/>

        <!-- Car Drop Shadow -->
        <ellipse cx="145" cy="118" rx="140" ry="12" fill="rgba(3, 6, 10, 0.8)"/>

        <!-- Wheels with Alloy Rims -->
        <circle cx="55" cy="104" r="20" fill="#090f16"/>
        <circle cx="55" cy="104" r="14" fill="#1b2938" stroke="#7f8c8d" stroke-width="2"/>
        <circle cx="55" cy="104" r="5" fill="#3DF5FF"/>

        <circle cx="225" cy="104" r="20" fill="#090f16"/>
        <circle cx="225" cy="104" r="14" fill="#1b2938" stroke="#7f8c8d" stroke-width="2"/>
        <circle cx="225" cy="104" r="5" fill="#3DF5FF"/>

        <!-- Sleek Sedan Chassis -->
        <path d="M 12 96 L 22 66 Q 35 48 60 50 Q 110 12 165 10 Q 215 12 235 50 Q 255 55 268 70 L 270 85 Q 268 98 250 102 L 244 102 A 22 22 0 0 0 206 102 L 74 102 A 22 22 0 0 0 36 102 Z" fill="url(#bankCarGrad)" stroke="#22364f" stroke-width="1.5"/>

        <!-- Metallic Specular Line -->
        <path d="M 30 58 L 260 72" stroke="rgba(127, 184, 255, 0.5)" stroke-width="1.2"/>

        <!-- Rear Cabin Window -->
        <path d="M 45 52 L 80 24 L 140 20 L 138 52 Z" fill="#0a121d" stroke="#34495e" stroke-width="1"/>

        <!-- Windshield -->
        <path d="M 160 18 L 210 22 L 230 52 L 180 52 Z" fill="#0c1724" stroke="#34495e" stroke-width="1"/>

        <!-- Interior Cabin Warm Illumination -->
        <ellipse cx="140" cy="40" rx="35" ry="18" fill="rgba(255, 220, 140, 0.45)"/>

        <!-- Dashboard Cyan Glow -->
        <rect x="180" y="44" width="16" height="6" rx="1" fill="#3DF5FF" opacity="0.85"/>

        <!-- Open Driver's Door (Swung open toward foreground) -->
        <path d="M 140 48 L 110 98 L 118 102 L 152 50 Z" fill="#0d1b2a" stroke="#7FB8FF" stroke-width="1.2"/>
        <line x1="140" y1="48" x2="110" y2="28" stroke="#34495e" stroke-width="1.5"/>
        <rect x="114" y="80" width="8" height="2" fill="#ecf0f1"/>

        <!-- Front Matrix LED Headlight -->
        <circle cx="264" cy="78" r="4.5" fill="#ffffff"/>
        <line x1="250" y1="70" x2="266" y2="76" stroke="#3DF5FF" stroke-width="2"/>

        <!-- Rear Red LED Ribbon -->
        <rect x="12" y="66" width="6" height="8" rx="1" fill="#ff1744"/>

        <!-- Amber Hazard Flasher (Pulsing) -->
        <circle cx="266" cy="84" r="3" fill="#f39c12">
          <animate attributeName="opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>

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
      </svg>

      <!-- Hotspot 1: Police Tape (Left) -->
      <div class="hotspot-item" id="hotspot-tape" style="position: absolute; bottom: 65px; left: 40px; cursor: pointer; z-index: 10;" title="Inspect Police Tape">
        <div style="background: rgba(241, 196, 15, 0.2); border: 2px dashed #f1c40f; color: #f1c40f; font-family: var(--font-mono); font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 6px;">
          <span>🚧 POLICE TAPE [E]</span>
        </div>
      </div>

      <!-- Hotspot 2: Abandoned Vehicle (Upstream) -->
      <div class="hotspot-item" id="hotspot-car" style="position: absolute; bottom: 80px; left: 220px; cursor: pointer; z-index: 10;" title="Inspect Abandoned Vehicle">
        <div style="background: rgba(127, 184, 255, 0.2); border: 2px solid #7FB8FF; color: #7FB8FF; font-family: var(--font-mono); font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 6px; box-shadow: 0 0 12px rgba(127, 184, 255, 0.35);">
          <span>🚗 ABANDONED SEDAN [E]</span>
        </div>
      </div>

      <!-- Hotspot 3: Muddy Footprints (Middle) -->
      <div class="hotspot-item" id="hotspot-footprints" style="position: absolute; bottom: 45px; left: 460px; cursor: pointer; z-index: 10;" title="Inspect Footprints">
        <div style="background: rgba(61, 245, 255, 0.15); border: 1px solid var(--color-cyan); color: var(--color-cyan); font-family: var(--font-mono); font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 6px;">
          <span>👣 MUDDY FOOTPRINTS [E]</span>
        </div>
      </div>

      <!-- Hotspot 4: BIG Glowing Laptop Workstation on Reinforced Pier (Advances to Briefing) -->
      <div class="laptop-workstation-station" id="hotspot-laptop" title="Inspect Dr. Sahoo's Compromised Laptop">
        <!-- Floating Animated Guidance Target Beacon & Chevron -->
        <div id="laptop-floating-badge" class="laptop-target-badge">
          <div class="badge-tag-box">
            <span>💻</span>
            <span>DR. SAHOO'S WORKSTATION</span>
            <span class="badge-action-text">[E / INSPECT]</span>
          </div>
          <div class="badge-arrow-down">▼</div>
        </div>

        <!-- High-Detail Scalable Vector Illustration of Dr. Sahoo's Big Rugged Workstation & Concrete Pier -->
        <svg viewBox="0 0 260 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="screenAmbientBloom" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(61, 245, 255, 0.85)"/>
              <stop offset="45%" stop-color="rgba(61, 245, 255, 0.3)"/>
              <stop offset="100%" stop-color="rgba(61, 245, 255, 0)"/>
            </radialGradient>

            <radialGradient id="pedestalGlow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="rgba(61, 245, 255, 0.55)"/>
              <stop offset="50%" stop-color="rgba(61, 245, 255, 0.15)"/>
              <stop offset="100%" stop-color="rgba(61, 245, 255, 0)"/>
            </radialGradient>

            <linearGradient id="volumetricBeam" x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stop-color="rgba(61, 245, 255, 0.45)"/>
              <stop offset="100%" stop-color="rgba(61, 245, 255, 0)"/>
            </linearGradient>

            <linearGradient id="chassisGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#19283d"/>
              <stop offset="50%" stop-color="#0f1926"/>
              <stop offset="100%" stop-color="#070c13"/>
            </linearGradient>

            <linearGradient id="pierGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#243447"/>
              <stop offset="40%" stop-color="#182330"/>
              <stop offset="100%" stop-color="#0d141c"/>
            </linearGradient>
          </defs>

          <!-- 1. Concrete Pedestal Pier (Industrial foundation in riverbank silt) -->
          <polygon points="20,220 240,220 226,145 34,145" fill="url(#pierGrad)" stroke="#2b3e55" stroke-width="2"/>
          <polygon points="34,145 226,145 214,130 46,130" fill="#223345" stroke="#3d5675" stroke-width="1.5"/>

          <!-- Concrete Caution Hazard Stripes -->
          <polygon points="55,145 75,145 62,220 42,220" fill="rgba(241, 196, 15, 0.22)"/>
          <polygon points="95,145 115,145 102,220 82,220" fill="rgba(241, 196, 15, 0.22)"/>
          <polygon points="135,145 155,145 142,220 122,220" fill="rgba(241, 196, 15, 0.22)"/>
          <polygon points="175,145 195,145 182,220 162,220" fill="rgba(241, 196, 15, 0.22)"/>

          <!-- Yellow Forensic Evidence Marker E-04 -->
          <polygon points="208,160 228,155 228,190 208,195" fill="#f1c40f" stroke="#b7950b" stroke-width="1"/>
          <text x="218" y="178" fill="#111" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle" transform="rotate(-14 218 178)">E4</text>

          <!-- Cyan Light Puddle on the Concrete Platform -->
          <ellipse cx="130" cy="138" rx="85" ry="14" fill="url(#pedestalGlow)"/>

          <!-- 2. Atmospheric Volumetric Light Cone projecting from the Screen -->
          <polygon points="50,30 210,30 245,0 15,0" fill="url(#volumetricBeam)" opacity="0.35"/>

          <!-- 3. Big Laptop Base (Keyboard Deck) in Perspective -->
          <ellipse cx="130" cy="144" rx="72" ry="8" fill="rgba(3, 7, 12, 0.8)"/>
          <polygon points="48,144 212,144 198,124 62,124" fill="url(#chassisGrad)" stroke="#304a6e" stroke-width="1.8"/>
          <polygon points="48,144 212,144 212,149 48,149" fill="#080e16" stroke="#22364f" stroke-width="1"/>

          <!-- Rubberized Rugged Corner Bumpers -->
          <rect x="46" y="138" width="8" height="10" rx="2" fill="#1e293b"/>
          <rect x="206" y="138" width="8" height="10" rx="2" fill="#1e293b"/>
          <rect x="60" y="122" width="7" height="6" rx="1" fill="#1e293b"/>
          <rect x="193" y="122" width="7" height="6" rx="1" fill="#1e293b"/>

          <!-- Backlit Keyboard Well -->
          <polygon points="68,140 192,140 184,127 76,127" fill="#070d16" stroke="rgba(61, 245, 255, 0.4)" stroke-width="1"/>

          <!-- Glowing Keyboard Rows -->
          <line x1="77" y1="130" x2="183" y2="130" stroke="#3DF5FF" stroke-width="1.2" opacity="0.75"/>
          <line x1="74" y1="133.5" x2="186" y2="133.5" stroke="#3DF5FF" stroke-width="1.2" opacity="0.8"/>
          <line x1="71" y1="137" x2="189" y2="137" stroke="#3DF5FF" stroke-width="1.2" opacity="0.85"/>

          <!-- Touchpad with Illuminated Border -->
          <polygon points="116,142 144,142 143,139 117,139" fill="none" stroke="#3DF5FF" stroke-width="0.8" opacity="0.8"/>

          <!-- Status Indicator LEDs on Chassis Front -->
          <circle cx="58" cy="146.5" r="1.5" fill="#3DF5FF"/>
          <circle cx="63" cy="146.5" r="1.5" fill="#f39c12">
            <animate attributeName="opacity" values="1;0.2;1" dur="0.35s" repeatCount="indefinite"/>
          </circle>
          <circle cx="68" cy="146.5" r="1.5" fill="#2ecc71"/>

          <!-- 4. Massive Laptop Display Screen Lid (Prominent, Big, Tilted Back) -->
          <polygon points="56,126 204,126 208,26 52,26" fill="#0b1320" stroke="#3b5c85" stroke-width="2.2"/>
          <polygon points="52,26 58,20 202,20 208,26 204,126 56,126" fill="#0e1726" stroke="#486f9e" stroke-width="1"/>

          <!-- Integrated HD Webcam & Active Indicator -->
          <circle cx="130" cy="23" r="1.5" fill="#000" stroke="#3DF5FF" stroke-width="0.5"/>
          <circle cx="137" cy="23" r="0.8" fill="#2ecc71"/>

          <!-- Radiant Screen Display Surface -->
          <polygon points="62,30 198,30 194,122 66,122" fill="#040913"/>
          <polygon points="62,30 198,30 194,122 66,122" fill="url(#screenAmbientBloom)" opacity="0.45"/>

          <!-- Screen Content: Top Header Bar -->
          <rect x="64" y="32" width="132" height="12" fill="#0a182c"/>
          <line x1="64" y1="44" x2="196" y2="44" stroke="#3DF5FF" stroke-width="0.8" opacity="0.6"/>
          <text x="68" y="41" fill="#3DF5FF" font-family="monospace" font-size="7" font-weight="bold" letter-spacing="0.5">NIRVANA-OS v4.2</text>
          <text x="180" y="41" fill="#ff4757" font-family="monospace" font-size="6.5" font-weight="bold">● LIVE</text>

          <!-- Screen Terminal Lines -->
          <text x="68" y="54" fill="#a4b0be" font-family="monospace" font-size="6.2">> USER: dr_sahoo [AUTHENTICATED]</text>
          <text x="68" y="63" fill="#f1c40f" font-family="monospace" font-size="6.2">> SESSION ABNORMALLY HALTED</text>
          <text x="68" y="72" fill="#3DF5FF" font-family="monospace" font-size="6.2">> RECOVERY KEY: DISK_#04_MOUNTED</text>

          <!-- Realtime Telemetry Audio/Process Waveform -->
          <polyline points="68,85 78,82 86,88 96,78 106,84 116,74 126,86 138,76 150,83 162,79 174,85 186,80 194,84" fill="none" stroke="#3DF5FF" stroke-width="1.4"/>
          <line x1="68" y1="85" x2="194" y2="85" stroke="rgba(61, 245, 255, 0.3)" stroke-width="0.6" stroke-dasharray="2,2"/>

          <!-- High-Priority Forensic Alert Badge on Screen -->
          <rect x="68" y="93" width="124" height="16" rx="2" fill="rgba(255, 59, 92, 0.25)" stroke="#ff3b5c" stroke-width="1"/>
          <text x="130" y="104" fill="#ff6b81" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle" letter-spacing="0.8">⚠ FORENSIC LOG READY</text>

          <!-- Active Blinking Prompt -->
          <text x="68" y="117" fill="#3DF5FF" font-family="monospace" font-size="7.5" font-weight="bold">> inspect_session --auth<tspan fill="#3DF5FF">_<animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite"/></tspan></text>

          <!-- CRT Scanlines on the Screen -->
          <line x1="63" y1="46" x2="197" y2="46" stroke="rgba(61, 245, 255, 0.2)" stroke-width="0.6"/>
          <line x1="63" y1="58" x2="197" y2="58" stroke="rgba(61, 245, 255, 0.2)" stroke-width="0.6"/>
          <line x1="64" y1="70" x2="196" y2="70" stroke="rgba(61, 245, 255, 0.2)" stroke-width="0.6"/>
          <line x1="64" y1="82" x2="196" y2="82" stroke="rgba(61, 245, 255, 0.2)" stroke-width="0.6"/>
          <line x1="65" y1="94" x2="195" y2="94" stroke="rgba(61, 245, 255, 0.2)" stroke-width="0.6"/>
          <line x1="65" y1="106" x2="195" y2="106" stroke="rgba(61, 245, 255, 0.2)" stroke-width="0.6"/>
          <line x1="66" y1="118" x2="194" y2="118" stroke="rgba(61, 245, 255, 0.2)" stroke-width="0.6"/>

          <!-- Screen Glass Specular Highlight Sheen -->
          <polygon points="62,30 115,30 85,122 66,122" fill="rgba(255, 255, 255, 0.05)"/>
        </svg>
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

  function checkProximity() {
    const laptopEl = container.querySelector('#hotspot-laptop');
    const hintBanner = container.querySelector('#riverbank-hint-banner');
    const laptopBadge = container.querySelector('#laptop-floating-badge');
    const hintTitle = container.querySelector('#hint-objective-title');
    const hintCta = container.querySelector('#hint-objective-cta');

    if (!laptopEl || !avatar) return;

    const avatarRect = avatar.getBoundingClientRect();
    const laptopRect = laptopEl.getBoundingClientRect();
    const avatarCenter = avatarRect.left + avatarRect.width / 2;
    const laptopCenter = laptopRect.left + laptopRect.width / 2;
    const dist = Math.abs(laptopCenter - avatarCenter);

    const isInRange = dist < 240 || (avatarRect.right >= laptopRect.left - 40 && avatarRect.left <= laptopRect.right + 40);

    if (isInRange) {
      if (hintBanner) hintBanner.classList.add('in-range');
      if (laptopBadge) laptopBadge.classList.add('in-range');
      if (hintTitle) {
        hintTitle.innerHTML = `<span style="color: #3DF5FF; font-weight: bold;">⚡ YOU ARE AT DR. SAHOO'S WORKSTATION:</span> Press <strong>[E]</strong> or click the laptop to inspect!`;
      }
      if (hintCta) {
        hintCta.innerHTML = `READY: <strong style="color: #3DF5FF;">PRESS [E] OR CLICK SCREEN</strong>`;
      }
    } else {
      if (hintBanner) hintBanner.classList.remove('in-range');
      if (laptopBadge) laptopBadge.classList.remove('in-range');
      if (hintTitle) {
        hintTitle.innerHTML = `Walk right across the shoreline to reach <strong>Dr. Sahoo's glowing laptop</strong> on the concrete pier.`;
      }
      if (hintCta) {
        hintCta.innerHTML = `WALK: <strong>A / D</strong> OR <strong>◀ / ▶</strong> &nbsp;•&nbsp; <strong>CLICK LAPTOP</strong>`;
      }
    }
  }

  function updateAvatarPosition() {
    avatar.style.left = `${aryaX}px`;
    checkProximity();
  }

  function moveArya(delta) {
    aryaX = Math.max(30, Math.min(window.innerWidth - 120, aryaX + delta));
    updateAvatarPosition();
  }

  function handleActionKey() {
    if (dialogueInstance) return;

    const laptopEl = container.querySelector('#hotspot-laptop');
    if (!laptopEl) return;
    const avatarRect = avatar.getBoundingClientRect();
    const laptopRect = laptopEl.getBoundingClientRect();
    const avatarCenter = avatarRect.left + avatarRect.width / 2;
    const laptopCenter = laptopRect.left + laptopRect.width / 2;
    const distToLaptop = Math.abs(laptopCenter - avatarCenter);

    // If near the laptop or approaching the pier
    if (distToLaptop < 260 || (avatarRect.right >= laptopRect.left - 60)) {
      audioManager.playKeyTick();
      triggerDialogue('riverbank_laptop');
      return;
    }

    // Check car proximity
    const carEl = container.querySelector('#hotspot-car');
    if (carEl) {
      const carRect = carEl.getBoundingClientRect();
      const carCenter = carRect.left + carRect.width / 2;
      if (Math.abs(carCenter - avatarCenter) < 160) {
        audioManager.playKeyTick();
        triggerDialogue('riverbank_car');
        return;
      }
    }

    // Check footprints proximity
    const fpEl = container.querySelector('#hotspot-footprints');
    if (fpEl) {
      const fpRect = fpEl.getBoundingClientRect();
      const fpCenter = fpRect.left + fpRect.width / 2;
      if (Math.abs(fpCenter - avatarCenter) < 160) {
        audioManager.playKeyTick();
        triggerDialogue('riverbank_footprints');
        return;
      }
    }

    // Check police tape proximity
    const tapeEl = container.querySelector('#hotspot-tape');
    if (tapeEl) {
      const tapeRect = tapeEl.getBoundingClientRect();
      const tapeCenter = tapeRect.left + tapeRect.width / 2;
      if (Math.abs(tapeCenter - avatarCenter) < 160) {
        audioManager.playKeyTick();
        triggerDialogue('riverbank_tape');
        return;
      }
    }

    // If moderately close to laptop and pressed E, examine it
    if (distToLaptop < 400) {
      audioManager.playKeyTick();
      triggerDialogue('riverbank_laptop');
    }
  }

  // Keyboard Navigation & Interaction
  const keyHandler = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      moveArya(-35);
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      moveArya(35);
    } else if (e.key === 'e' || e.key === 'E' || e.key === 'Enter' || e.key === ' ') {
      handleActionKey();
    }
  };
  window.addEventListener('keydown', keyHandler);

  const resizeHandler = () => {
    checkProximity();
  };
  window.addEventListener('resize', resizeHandler);

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

  const carHotspot = container.querySelector('#hotspot-car');
  if (carHotspot) {
    carHotspot.addEventListener('click', () => {
      audioManager.playKeyTick();
      triggerDialogue('riverbank_car');
    });
  }

  container.querySelector('#hotspot-footprints').addEventListener('click', () => {
    audioManager.playKeyTick();
    triggerDialogue('riverbank_footprints');
  });

  const laptopStation = container.querySelector('#hotspot-laptop');
  if (laptopStation) {
    laptopStation.addEventListener('click', () => {
      audioManager.playKeyTick();
      triggerDialogue('riverbank_laptop');
    });
  }

  // Click on Upper Hint Banner to advance or inspect
  const hintBanner = container.querySelector('#riverbank-hint-banner');
  if (hintBanner) {
    hintBanner.addEventListener('click', () => {
      audioManager.playKeyTick();
      const laptopEl = container.querySelector('#hotspot-laptop');
      if (laptopEl) {
        const laptopRect = laptopEl.getBoundingClientRect();
        const targetX = Math.min(window.innerWidth - 160, Math.max(300, laptopRect.left - 60));
        aryaX = targetX;
        updateAvatarPosition();
        setTimeout(() => {
          triggerDialogue('riverbank_laptop');
        }, 180);
      } else {
        triggerDialogue('riverbank_laptop');
      }
    });
  }

  // Initialize proximity check on startup
  setTimeout(checkProximity, 100);

  function cleanup() {
    audioManager.stopRainAmbience();
    window.removeEventListener('keydown', keyHandler);
    window.removeEventListener('resize', resizeHandler);
    if (dialogueInstance) dialogueInstance.destroy();
  }

  return container;
}

