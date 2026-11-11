// Browser Application — QuantumNet Explorer & Tab Hopper Mechanic

import { gameState } from '../game/game-state.js';
import { audioManager } from '../game/audio-manager.js';

export function createBrowserApp() {
  const container = document.createElement('div');
  container.className = 'browser-layout';

  let activeTab = 'search';
  let tabHopperTriggered = false;

  function render() {
    container.innerHTML = `
      <div class="browser-chrome">
        <div class="browser-tabs">
          <button class="browser-tab ${activeTab === 'intranet' ? 'active' : ''}" data-tab="intranet">
            <span>🏢</span> Nirvana Intranet
          </button>
          <button class="browser-tab ${activeTab === 'search' ? 'active' : ''}" data-tab="search">
            <span>🔍</span> Search History (11:02 PM)
          </button>
          <button class="browser-tab ${activeTab === 'auth' ? 'active' : ''}" data-tab="auth">
            <span>🛡️</span> Security Gateway
          </button>
        </div>
        <div class="browser-url-bar">
          <span style="color: var(--color-cyan); font-size: 11px;">🔒 HTTPS</span>
          <span style="color: var(--color-text-main); font-size: 12px;" id="browser-url-text">
            ${activeTab === 'intranet' ? 'internal.nirvanalabs.in/portal' : activeTab === 'search' ? 'search.quantum.net/history?user=m_sahoo' : 'gateway.nirvanalabs.in/admin-audit'}
          </span>
        </div>
      </div>

      <div class="browser-viewport" id="browser-content"></div>

      <!-- Tab Hopper Popup when ASSIST attempts to divert Arya -->
      <div id="tab-hopper-dialog" class="hidden" style="position: absolute; inset: 0; background: rgba(11, 15, 26, 0.85); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 50;">
        <div style="max-width: 420px; background: #141B2D; border: 2px solid var(--color-red); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-glow-red); text-align: center;">
          <div style="font-size: 32px; margin-bottom: 8px;">👁️</div>
          <div style="font-family: var(--font-mono); font-size: 13px; color: var(--color-red); font-weight: bold; margin-bottom: 8px;">
            ASSIST REDIRECTION ADVISORY
          </div>
          <div style="font-size: 13px; color: var(--color-text-main); line-height: 1.5; margin-bottom: 14px;">
            "Where did you go, Inspector? You seem to be exploring unrelated administrative caches. Dr. Sahoo would prefer you investigate Tanvi Rout's malicious scripts instead."
          </div>
          <button id="btn-dismiss-hopper" style="background: var(--color-cyan); color: #0B0F1A; font-family: var(--font-mono); font-weight: bold; padding: 6px 16px; border-radius: var(--radius-sm);">
            DISMISS &amp; CONTINUE AUDIT
          </button>
        </div>
      </div>
    `;

    // Bind tab clicks
    container.querySelectorAll('.browser-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        activeTab = e.currentTarget.getAttribute('data-tab');
        audioManager.playKeyTick();

        // Trigger Tab Hopper event once when navigating to search history or auth
        if (!tabHopperTriggered && (activeTab === 'search' || activeTab === 'auth')) {
          triggerTabHopper();
        } else {
          render();
        }
      });
    });

    const viewport = container.querySelector('#browser-content');

    if (activeTab === 'search') {
      viewport.innerHTML = `
        <div style="max-width: 680px; margin: 0 auto;">
          <div style="border-bottom: 1px solid rgba(61, 245, 255, 0.2); padding-bottom: 10px; margin-bottom: 16px;">
            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">
              SEARCH AUDIT LOG // TIMESTAMP: 23:02:18 IST
            </div>
            <div style="font-family: var(--font-mono); font-size: 15px; color: var(--color-cyan); font-weight: bold; margin-top: 4px;">
              Query: "Nirvana Holdings shell company offshore beneficial owner"
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="padding: 12px; background: rgba(20, 27, 45, 0.8); border: 1px solid rgba(255, 184, 77, 0.4); border-radius: var(--radius-sm);">
              <div style="font-size: 13px; font-weight: bold; color: var(--color-amber); margin-bottom: 4px;">
                Mauritius Registrar of Companies — Entity #448921-A
              </div>
              <div style="font-size: 11px; color: var(--color-cyan); margin-bottom: 6px;">
                www.companies-registry.mu/entity/nirvana-holdings-ltd
              </div>
              <p style="font-size: 12px; line-height: 1.5; color: var(--color-text-main);">
                "Nirvana Holdings Ltd. Registered address: Ebene Cybercity, Port Louis. 100% of voting shares held by <strong>Kabir Nayak</strong>. Formed December 2025 as sole recipient for proprietary IP sublicensing royalties."
              </p>
            </div>

            <div style="padding: 12px; background: rgba(77, 255, 166, 0.1); border: 1px solid var(--color-green); border-radius: var(--radius-sm); font-size: 12px; color: var(--color-green);">
              ✓ <strong>CRITICAL EVIDENCE (4/6):</strong> Meera uncovered Kabir Nayak's covert shell company at 11:02 PM. Kabir was siphoning funds and Meera had documented the exact corporate registry.
            </div>
          </div>
        </div>
      `;

      gameState.collectClue('clue_shell_search');
    } else if (activeTab === 'auth') {
      viewport.innerHTML = `
        <div style="max-width: 680px; margin: 0 auto;">
          <div style="border-bottom: 1px solid rgba(61, 245, 255, 0.2); padding-bottom: 10px; margin-bottom: 16px;">
            <div style="font-family: var(--font-mono); font-size: 14px; color: var(--color-red); font-weight: bold;">
              ROOT ACCESS &amp; OVERRIDE TERMINAL AUDIT
            </div>
          </div>

          <div style="font-family: var(--font-mono); font-size: 12px; line-height: 1.8; color: var(--color-text-main); background: #070B12; padding: 14px; border: 1px solid rgba(255, 59, 92, 0.4); border-radius: var(--radius-sm);">
            <div>[23:41:10] Root Session Established on Terminal #04 (Server Vault)</div>
            <div>[23:47:33] Badge Swipe ID #001: KABIR NAYAK [AUTHORIZED EXEC]</div>
            <div style="color: var(--color-red); font-weight: bold;">
              [23:58:22] SUDO kabir_admin applied patch:
              <br/>&gt;&gt; TARGET: /sys/assist/heuristics/truth_rules.json
              <br/>&gt;&gt; INJECT: "DIRECT_BLAME -&gt; Tanvi Rout"
              <br/>&gt;&gt; INJECT: "SUPPRESS -&gt; Kabir 11:30 PM Server Appointment"
            </div>
            <div>[00:03:00] meera_session terminated abruptly.</div>
          </div>

          <div style="margin-top: 14px; padding: 12px; background: rgba(77, 255, 166, 0.1); border: 1px solid var(--color-green); border-radius: var(--radius-sm); font-size: 12px; color: var(--color-green);">
            ✓ <strong>CRITICAL EVIDENCE (5/6):</strong> Hard proof that Kabir logged in as <code>kabir_admin</code> at 11:58 PM and programmed ASSIST to frame Tanvi!
          </div>
        </div>
      `;

      gameState.collectClue('clue_admin_log');
    } else {
      viewport.innerHTML = `
        <div style="max-width: 680px; margin: 0 auto;">
          <h2 style="color: var(--color-cyan); font-size: 18px; margin-bottom: 12px;">Nirvana Labs — Executive Organization</h2>
          <p style="font-size: 13px; line-height: 1.6; color: var(--color-text-muted); margin-bottom: 16px;">
            Nirvana Labs is Odisha's premier neuro-computational research studio, specializing in autonomous cognitive subsystems.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div style="padding: 12px; background: rgba(20, 27, 45, 0.6); border: 1px solid rgba(61, 245, 255, 0.2); border-radius: var(--radius-sm);">
              <div style="color: #7FB8FF; font-weight: bold; font-size: 13px;">Kabir Nayak</div>
              <div style="font-size: 11px; color: var(--color-text-dim);">Founder &amp; Chief Executive Officer</div>
            </div>
            <div style="padding: 12px; background: rgba(20, 27, 45, 0.6); border: 1px solid rgba(255, 184, 77, 0.3); border-radius: var(--radius-sm);">
              <div style="color: #FFB84D; font-weight: bold; font-size: 13px;">Dr. Meera Sahoo</div>
              <div style="font-size: 11px; color: var(--color-text-dim);">Chief Architecture Officer</div>
            </div>
          </div>
        </div>
      `;
    }
  }

  function triggerTabHopper() {
    tabHopperTriggered = true;
    audioManager.playGlitchBuzz();
    const flash = document.getElementById('glitch-flash');
    if (flash) {
      flash.classList.add('active');
      setTimeout(() => flash.classList.remove('active'), 250);
    }

    render();

    const dialog = container.querySelector('#tab-hopper-dialog');
    if (dialog) {
      dialog.classList.remove('hidden');
      const dismissBtn = dialog.querySelector('#btn-dismiss-hopper');
      if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
          dialog.classList.add('hidden');
          audioManager.playKeyTick();
        });
      }
    }
  }

  render();
  return container;
}

