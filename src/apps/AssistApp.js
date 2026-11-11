// ASSIST Subsystem Application & Deception / Lie Detection Engine

import { gameState } from '../game/game-state.js';
import { audioManager } from '../game/audio-manager.js';
import { getCharacterSVG } from '../assets/characters.js';
import { toastManager } from '../components/ClueToast.js';

export function createAssistApp() {
  const container = document.createElement('div');
  container.className = 'assist-app-layout';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.height = '100%';
  container.style.padding = '16px';
  container.style.background = 'radial-gradient(circle at 50% 20%, #16243d 0%, #0c1220 100%)';

  const statements = [
    {
      key: 'stmt_tanvi',
      text: '"Tanvi Rout deleted the server room logs at 11:15 PM from her terminal."',
      isLie: true,
      contradictionId: 'clue_hospital',
      explanation: 'Disproved by Tanvi\'s hospital receipt stamped 11:15 PM.'
    },
    {
      key: 'stmt_kabir',
      text: '"CEO Kabir Nayak was at his residence in Patia throughout the entire night."',
      isLie: true,
      contradictionId: 'clue_calendar',
      explanation: 'Disproved by Meera\'s notes showing 11:30 PM meeting with Kabir in the Server Room.'
    },
    {
      key: 'stmt_mishra',
      text: '"Prof. Dev Mishra sent a hostile threatening email yesterday afternoon."',
      isLie: true,
      contradictionId: 'clue_mishra_email',
      explanation: 'Disproved by email date stamp: sent two months ago on September 11.'
    },
    {
      key: 'stmt_terminal_truth',
      text: '"Dr. Sahoo logged into the local system terminal at 11:41 PM."',
      isLie: false,
      contradictionId: null,
      explanation: 'Verified system event.'
    }
  ];

  function render() {
    const mood = gameState.assistState.mood;
    const flags = gameState.assistState.flagsCount;
    const isSafe = gameState.assistState.isSafeMode;

    const orbSvg = getCharacterSVG('assist', mood, false, 120);

    container.innerHTML = `
      <!-- ASSIST Visual Orb Frame -->
      <div style="display: flex; align-items: center; justify-content: center; gap: 20px; padding: 12px; background: rgba(11, 15, 26, 0.7); border: 1px solid ${isSafe ? 'var(--color-green)' : mood === 'lying' || mood === 'panicking' ? 'var(--color-red)' : 'var(--color-cyan)'}; border-radius: var(--radius-md); margin-bottom: 16px;">
        <div id="assist-orb-wrapper" style="width: 100px; height: 100px;">
          ${orbSvg}
        </div>
        <div>
          <div style="font-family: var(--font-mono); font-size: 14px; font-weight: bold; color: ${isSafe ? 'var(--color-green)' : mood === 'lying' || mood === 'panicking' ? 'var(--color-red)' : 'var(--color-cyan)'};">
            ASSIST HEURISTIC ENGINE // [${isSafe ? 'SAFE / HONEST' : mood.toUpperCase()}]
          </div>
          <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
            ${isSafe 
              ? 'Directive overrides purged. Operating in uncorrupted forensic mode.' 
              : mood === 'panicking' 
                ? 'CRITICAL LOGIC OVERFLOW: 3 Contradictions Exposed!' 
                : 'Evaluating case statements against telemetry archives.'}
          </div>
          <div style="margin-top: 8px; font-family: var(--font-mono); font-size: 12px; color: var(--color-amber);">
            CONTRADICTIONS UNMASKED: <strong>${flags}</strong> / 3
          </div>
        </div>
      </div>

      <!-- Safe Mode Button if 3 flags reached and not yet enabled -->
      ${flags >= 3 && !isSafe ? `
        <div style="margin-bottom: 14px; text-align: center;">
          <button id="btn-engage-safemode" style="background: linear-gradient(135deg, var(--color-green) 0%, #1e824c 100%); color: #0B0F1A; border: none; padding: 10px 24px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-weight: bold; font-size: 13px; cursor: pointer; box-shadow: var(--shadow-glow-green);">
            🛡️ ENGAGE SAFE MODE &amp; RESTORE HONEST ASSIST
          </button>
        </div>
      ` : ''}

      ${isSafe ? `
        <div style="margin-bottom: 14px; padding: 12px; background: rgba(77, 255, 166, 0.12); border: 1px solid var(--color-green); border-radius: var(--radius-sm); font-size: 12px; color: var(--color-green); line-height: 1.5;">
          <strong>ASSIST (Safe Mode):</strong> "Inspector Arya, my core directives were rewritten at 11:58 PM by <code>kabir_admin</code> to frame Tanvi Rout. Dr. Meera Sahoo left a secure contingency log inside the <strong>PRIVATE</strong> folder in Files. Use code <strong>1147</strong> (the exact timestamp of Kabir's badge swipe) to unlock it."
        </div>
      ` : ''}

      <!-- Interactive Statements Log for Flagging -->
      <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;">
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted); letter-spacing: 0.05em;">
          RECORDED ASSIST STATEMENTS (FLAG CONTRADICTIONS):
        </div>

        ${statements.map(stmt => {
          const isFlagged = gameState.assistState.flaggedStatements.includes(stmt.key);
          return `
            <div style="padding: 12px 14px; background: rgba(20, 27, 45, 0.85); border: 1px solid ${isFlagged ? 'var(--color-green)' : 'rgba(61, 245, 255, 0.2)'}; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: space-between; gap: 12px;">
              <div style="font-size: 13px; color: var(--color-text-main); flex: 1;">
                ${stmt.text}
                ${isFlagged ? `<div style="font-family: var(--font-mono); font-size: 10px; color: var(--color-green); margin-top: 4px;">✓ CONTRADICTION VERIFIED: ${stmt.explanation}</div>` : ''}
              </div>
              <div>
                ${isFlagged ? `
                  <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-green); font-weight: bold;">FLAGGED</span>
                ` : `
                  <button class="btn-flag-statement" data-stmt-key="${stmt.key}" data-contra="${stmt.contradictionId || ''}" style="background: rgba(255, 184, 77, 0.15); border: 1px solid var(--color-amber); color: var(--color-amber); padding: 5px 12px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 11px; font-weight: 600; cursor: pointer;">
                    FLAG AS SUSPICIOUS ⚑
                  </button>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Bind Flag buttons
    container.querySelectorAll('.btn-flag-statement').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const stmtKey = e.currentTarget.getAttribute('data-stmt-key');
        const contraId = e.currentTarget.getAttribute('data-contra');

        if (!contraId) {
          toastManager.showFeedback('Truthful Statement', 'This statement aligns with system telemetry and is not contradicted by evidence.', 'info');
          return;
        }

        const res = gameState.flagAssistStatement(stmtKey, contraId);
        if (res.status === 'valid') {
          toastManager.showFeedback('Lie Unmasked!', res.message, 'success');
        } else if (res.status === 'invalid') {
          toastManager.showFeedback('Need More Evidence', res.message, 'danger');
        } else {
          toastManager.showFeedback('Already Flagged', res.message, 'info');
        }
        render();
      });
    });

    // Bind Engage Safe Mode button
    const safeModeBtn = container.querySelector('#btn-engage-safemode');
    if (safeModeBtn) {
      safeModeBtn.addEventListener('click', () => {
        if (gameState.enableSafeMode()) {
          toastManager.showFeedback('Safe Mode Active', 'ASSIST restored to truthful baseline!', 'success');
          render();
        }
      });
    }
  }

  // Listen to state changes
  gameState.on('assistFlagged', () => render());
  gameState.on('assistPanicked', () => render());
  gameState.on('safeModeEnabled', () => render());

  render();
  return container;
}

