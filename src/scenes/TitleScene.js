// Title Scene — Atmospheric Psychological Horror-Noir Presentation & Game Options

import { SaveManager } from '../game/save-manager.js';
import { audioManager } from '../game/audio-manager.js';

export function createTitleScene(onSelectAction, payload = {}) {
  const container = document.createElement('div');
  container.className = 'title-scene';

  const hasSave = SaveManager.hasSave();

  container.innerHTML = `
    <!-- Nirvana Labs Blurred Interior Background -->
    <div class="title-bg-scene">
      <div class="corridor-silhouette"></div>
    </div>

    <!-- Title Header -->
    <div class="title-header">
      <div class="title-subtag">CASE // BHUBANESWAR SPECIAL FORENSICS</div>
      <h1 class="title-main">
        LAST LOGIN
      </h1>
      <p class="title-tagline">
        DR. MEERA SAHOO DISAPPEARED INTO THE CODE AT MIDNIGHT.<br/>
        THE TERMINAL IS STILL UNLOCKED. TRUST THE EVIDENCE. NOT THE PEOPLE.
      </p>
    </div>

    <!-- Typewriter-Style Spaced Menu / Game Options -->
    <div class="title-menu-container">
      <nav class="title-menu" role="menu" aria-label="Game Menu">
        ${hasSave ? `
          <button class="title-menu-item" id="btn-menu-continue" role="menuitem">
            <span class="menu-dot"></span>
            <span>CONTINUE CASE</span>
          </button>
        ` : ''}

        <button class="title-menu-item" id="btn-menu-new-game" role="menuitem">
          <span class="menu-dot"></span>
          <span>NEW INVESTIGATION</span>
        </button>

        <button class="title-menu-item" id="btn-menu-video-prologue" role="menuitem">
          <span class="menu-dot"></span>
          <span>WATCH VIDEO PROLOGUE 🎬</span>
        </button>

        <button class="title-menu-item" id="btn-menu-prologue" role="menuitem">
          <span class="menu-dot"></span>
          <span>INTERACTIVE RIVERBANK PROLOGUE</span>
        </button>

        <button class="title-menu-item" id="btn-menu-options" role="menuitem">
          <span class="menu-dot"></span>
          <span>GAME OPTIONS &amp; SETTINGS</span>
        </button>

        <button class="title-menu-item" id="btn-menu-howtoplay" role="menuitem">
          <span class="menu-dot"></span>
          <span>HOW TO PLAY</span>
        </button>
      </nav>
    </div>

    <!-- Title Footer -->
    <footer class="title-footer">
      <div class="title-credits">
        <div>NIRVANA LABS ARCHIVES // INCIDENT REPORT #1147</div>
        <p>A character-driven detective mystery powered by vector graphics &amp; Web Audio API.</p>
      </div>
      <div>
        <span>BUILD 2.0.4-RELEASE</span>
      </div>
    </footer>

    <!-- Game Options & Settings Modal -->
    <div id="options-modal" class="hidden" style="position: absolute; inset: 0; background: rgba(5, 8, 14, 0.95); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 24px; backdrop-filter: blur(10px);">
      <div style="max-width: 540px; width: 100%; background: #141B2D; border: 2px solid var(--color-cyan); padding: 26px; border-radius: var(--radius-md); box-shadow: var(--shadow-glow-cyan);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; border-bottom: 1px solid rgba(61, 245, 255, 0.25); padding-bottom: 10px;">
          <h3 style="font-family: var(--font-mono); color: var(--color-cyan); font-size: 16px; font-weight: bold;">
            ⚙️ GAME OPTIONS &amp; SETTINGS
          </h3>
          <button id="btn-close-options" style="color: var(--color-text-muted); font-size: 18px; background: transparent;">✕</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          <!-- Sound / Music Toggle -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(11, 15, 26, 0.7); border-radius: var(--radius-sm);">
            <div>
              <div style="font-size: 13px; font-weight: bold; color: var(--color-text-main);">Soundtrack &amp; Game Audio</div>
              <div style="font-size: 11px; color: var(--color-text-muted);">Mute or unmute intro &amp; story music, plus SFX</div>
            </div>
            <button id="btn-toggle-sound-opt" style="background: ${audioManager.isMuted ? 'rgba(255, 59, 92, 0.2)' : 'rgba(77, 255, 166, 0.2)'}; border: 1px solid ${audioManager.isMuted ? 'var(--color-red)' : 'var(--color-green)'}; color: ${audioManager.isMuted ? 'var(--color-red)' : 'var(--color-green)'}; font-family: var(--font-mono); font-weight: bold; font-size: 11px; padding: 6px 14px; border-radius: var(--radius-sm);">
              ${audioManager.isMuted ? 'OFF / MUTED' : 'ON / PLAYING'}
            </button>
          </div>

          <!-- Reduced Motion Toggle -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(11, 15, 26, 0.7); border-radius: var(--radius-sm);">
            <div>
              <div style="font-size: 13px; font-weight: bold; color: var(--color-text-main);">Reduced Motion Mode</div>
              <div style="font-size: 11px; color: var(--color-text-muted);">Limits camera zooms, heavy strobe and screen shakes</div>
            </div>
            <button id="btn-toggle-motion-opt" style="background: ${document.body.classList.contains('reduced-motion') ? 'rgba(77, 255, 166, 0.2)' : 'rgba(142, 157, 184, 0.2)'}; border: 1px solid ${document.body.classList.contains('reduced-motion') ? 'var(--color-green)' : 'rgba(142, 157, 184, 0.4)'}; color: ${document.body.classList.contains('reduced-motion') ? 'var(--color-green)' : 'var(--color-text-main)'}; font-family: var(--font-mono); font-weight: bold; font-size: 11px; padding: 6px 14px; border-radius: var(--radius-sm);">
              ${document.body.classList.contains('reduced-motion') ? 'ACTIVE' : 'OFF'}
            </button>
          </div>

          <!-- CRT Overlay Toggle -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(11, 15, 26, 0.7); border-radius: var(--radius-sm);">
            <div>
              <div style="font-size: 13px; font-weight: bold; color: var(--color-text-main);">CRT Scanlines &amp; Vignette</div>
              <div style="font-size: 11px; color: var(--color-text-muted);">Retro display scanlines and phosphor glow</div>
            </div>
            <button id="btn-toggle-crt-opt" style="background: rgba(61, 245, 255, 0.15); border: 1px solid var(--color-cyan); color: var(--color-cyan); font-family: var(--font-mono); font-weight: bold; font-size: 11px; padding: 6px 14px; border-radius: var(--radius-sm);">
              VISIBLE
            </button>
          </div>

          <!-- Reset Case / First-Time State -->
          <div style="margin-top: 8px; padding: 12px; background: rgba(255, 59, 92, 0.08); border: 1px dashed var(--color-red); border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 12px; font-weight: bold; color: var(--color-red);">Wipe Case &amp; Reset First-Time State</div>
              <div style="font-size: 10px; color: var(--color-text-dim);">Clears all progress, restarting prologue on next launch</div>
            </div>
            <button id="btn-reset-case-opt" style="background: var(--color-red); color: #fff; font-family: var(--font-mono); font-weight: bold; font-size: 11px; padding: 5px 12px; border-radius: var(--radius-sm);">
              RESET
            </button>
          </div>
        </div>

        <div style="margin-top: 20px; text-align: right;">
          <button id="btn-done-options" style="background: var(--color-cyan); color: #0B0F1A; font-family: var(--font-mono); font-weight: bold; padding: 8px 22px; border-radius: var(--radius-sm); font-size: 12px;">
            SAVE &amp; RETURN
          </button>
        </div>
      </div>
    </div>

    <!-- How To Play Modal -->
    <div id="howtoplay-modal" class="hidden" style="position: absolute; inset: 0; background: rgba(5, 8, 14, 0.95); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 24px; backdrop-filter: blur(8px);">
      <div style="max-width: 580px; width: 100%; background: #141B2D; border: 2px solid var(--color-cyan); padding: 24px; border-radius: var(--radius-md); box-shadow: var(--shadow-glow-cyan);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid rgba(61, 245, 255, 0.25); padding-bottom: 8px;">
          <h3 style="font-family: var(--font-mono); color: var(--color-cyan); font-size: 16px; font-weight: bold;">
            🎮 HOW TO PLAY // INVESTIGATOR BRIEFING
          </h3>
          <button id="btn-close-howtoplay-x" style="color: var(--color-text-muted); font-size: 18px; background: transparent; cursor: pointer; border: none;">✕</button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px; line-height: 1.6; color: var(--color-text-main);">
          <div style="padding: 10px; background: rgba(11, 15, 26, 0.7); border-radius: var(--radius-sm); border-left: 3px solid var(--color-cyan);">
            <strong style="color: var(--color-cyan);">1. Explore NirvanaOS:</strong> Use the simulated desktop apps (Files, Mail, Chat, Browser, Case Board). Drag, minimize, or snap windows to manage your forensic workspace.
          </div>
          <div style="padding: 10px; background: rgba(11, 15, 26, 0.7); border-radius: var(--radius-sm); border-left: 3px solid var(--color-amber);">
            <strong style="color: var(--color-amber);">2. Digital Forensics:</strong> Rename corrupted files (<code>.tmp</code> &rarr; <code>.txt</code>), cross-reference timestamps in emails and chats, and check system logs for door badge swipe times.
          </div>
          <div style="padding: 10px; background: rgba(11, 15, 26, 0.7); border-radius: var(--radius-sm); border-left: 3px solid var(--color-red);">
            <strong style="color: var(--color-red);">3. Cross-Examine ASSIST:</strong> The AI assistant has been reprogrammed to lie. Flag contradictions in the ASSIST app using your collected clues to force it into <strong>Safe Mode</strong> and get the private vault passcode.
          </div>
          <div style="padding: 10px; background: rgba(11, 15, 26, 0.7); border-radius: var(--radius-sm); border-left: 3px solid var(--color-green);">
            <strong style="color: var(--color-green);">4. Crack the Vault & Accuse:</strong> Use the 4-digit code in the <code>PRIVATE</code> folder, retrieve the final evidence, and confront the culprit on the Case Board.
          </div>
        </div>

        <div style="margin-top: 18px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-muted);">Controls: [ENTER/SPACE] Advance &bull; [CLICK] Select</span>
          <button id="btn-close-howtoplay" style="background: var(--color-cyan); color: #0B0F1A; font-family: var(--font-mono); font-weight: bold; padding: 7px 20px; border-radius: var(--radius-sm); cursor: pointer; border: none;">
            UNDERSTOOD
          </button>
        </div>
      </div>
    </div>
  `;

  // Bind Continue
  const btnContinue = container.querySelector('#btn-menu-continue');
  if (btnContinue) {
    btnContinue.addEventListener('click', () => {
      audioManager.ensureContext();
      audioManager.playKeyTick();
      if (onSelectAction) onSelectAction('continue');
    });
  }

  // Bind New Game
  const btnNewGame = container.querySelector('#btn-menu-new-game');
  btnNewGame.addEventListener('click', () => {
    audioManager.ensureContext();
    audioManager.playKeyTick();
    if (onSelectAction) onSelectAction('new_game');
  });

  // Bind Video Prologue
  const btnVideoPrologue = container.querySelector('#btn-menu-video-prologue');
  if (btnVideoPrologue) {
    btnVideoPrologue.addEventListener('click', () => {
      audioManager.ensureContext();
      audioManager.playKeyTick();
      if (onSelectAction) onSelectAction('video_prologue');
    });
  }

  // Bind Replay Prologue
  const btnPrologue = container.querySelector('#btn-menu-prologue');
  btnPrologue.addEventListener('click', () => {
    audioManager.ensureContext();
    audioManager.playKeyTick();
    if (onSelectAction) onSelectAction('prologue');
  });

  // Bind Options Modal
  const optionsModal = container.querySelector('#options-modal');
  const btnOptions = container.querySelector('#btn-menu-options');
  const btnCloseOptions = container.querySelector('#btn-close-options');
  const btnDoneOptions = container.querySelector('#btn-done-options');

  const openOptions = () => {
    audioManager.ensureContext();
    audioManager.playKeyTick();
    optionsModal.classList.remove('hidden');
  };

  const closeOptions = () => {
    audioManager.playKeyTick();
    optionsModal.classList.add('hidden');
  };

  btnOptions.addEventListener('click', openOptions);
  btnCloseOptions.addEventListener('click', closeOptions);
  btnDoneOptions.addEventListener('click', closeOptions);

  // Sound Toggle inside Options
  const soundBtnOpt = container.querySelector('#btn-toggle-sound-opt');
  soundBtnOpt.addEventListener('click', () => {
    const isMuted = audioManager.toggleMute();
    soundBtnOpt.textContent = isMuted ? 'OFF / MUTED' : 'ON / PLAYING';
    soundBtnOpt.style.background = isMuted ? 'rgba(255, 59, 92, 0.2)' : 'rgba(77, 255, 166, 0.2)';
    soundBtnOpt.style.borderColor = isMuted ? 'var(--color-red)' : 'var(--color-green)';
    soundBtnOpt.style.color = isMuted ? 'var(--color-red)' : 'var(--color-green)';
  });

  // Motion Toggle inside Options
  const motionBtnOpt = container.querySelector('#btn-toggle-motion-opt');
  motionBtnOpt.addEventListener('click', () => {
    document.body.classList.toggle('reduced-motion');
    const isReduced = document.body.classList.contains('reduced-motion');
    motionBtnOpt.textContent = isReduced ? 'ACTIVE' : 'OFF';
    motionBtnOpt.style.background = isReduced ? 'rgba(77, 255, 166, 0.2)' : 'rgba(142, 157, 184, 0.2)';
    motionBtnOpt.style.borderColor = isReduced ? 'var(--color-green)' : 'rgba(142, 157, 184, 0.4)';
    motionBtnOpt.style.color = isReduced ? 'var(--color-green)' : 'var(--color-text-main)';
  });

  // CRT Toggle inside Options
  const crtBtnOpt = container.querySelector('#btn-toggle-crt-opt');
  const crtOverlay = document.getElementById('crt-overlay');
  crtBtnOpt.addEventListener('click', () => {
    if (crtOverlay) {
      crtOverlay.classList.toggle('hidden');
      const isHidden = crtOverlay.classList.contains('hidden');
      crtBtnOpt.textContent = isHidden ? 'HIDDEN' : 'VISIBLE';
    }
  });

  // Reset Case Data
  const resetCaseBtn = container.querySelector('#btn-reset-case-opt');
  resetCaseBtn.addEventListener('click', () => {
    if (confirm('Reset investigation progress and restart the prologue from scratch?')) {
      SaveManager.clear();
      window.location.reload();
    }
  });

  // How To Play Modal
  const howtoplayModal = container.querySelector('#howtoplay-modal');
  const btnHowToPlay = container.querySelector('#btn-menu-howtoplay');
  const btnCloseHowToPlay = container.querySelector('#btn-close-howtoplay');
  const btnCloseHowToPlayX = container.querySelector('#btn-close-howtoplay-x');

  if (btnHowToPlay && howtoplayModal) {
    btnHowToPlay.addEventListener('click', () => {
      audioManager.ensureContext();
      audioManager.playKeyTick();
      howtoplayModal.classList.remove('hidden');
    });

    const closeHowToPlay = () => {
      audioManager.playKeyTick();
      howtoplayModal.classList.add('hidden');
    };

    if (btnCloseHowToPlay) btnCloseHowToPlay.addEventListener('click', closeHowToPlay);
    if (btnCloseHowToPlayX) btnCloseHowToPlayX.addEventListener('click', closeHowToPlay);
  }

  // If payload requested showing options directly
  if (payload.showOptions) {
    optionsModal.classList.remove('hidden');
  }

  return container;
}
