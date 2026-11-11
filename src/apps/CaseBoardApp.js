// Case Board Application — Crime Pinboard, Flashback Replay & Accusation

import { gameState } from '../game/game-state.js';
import { audioManager } from '../game/audio-manager.js';
import { EVIDENCE_LIST } from '../data/evidence.js';
import { getFlashbackById } from '../data/flashbacks.js';
import { getCharacterSVG } from '../assets/characters.js';
import { toastManager } from '../components/ClueToast.js';

export function createCaseBoardApp(onStartAccusation) {
  const container = document.createElement('div');
  container.className = 'case-board-layout';

  let selectedSuspect = null;
  const selectedEvidence = new Set();
  let activeTab = 'evidence'; // 'evidence' or 'flashbacks'

  function render() {
    const collectedCount = gameState.collectedClues.size;

    container.innerHTML = `
      <div class="case-board-header">
        <div style="display: flex; align-items: center; gap: 14px;">
          <button id="btn-tab-evidence" style="font-family: var(--font-mono); font-size: 12px; font-weight: bold; color: ${activeTab === 'evidence' ? 'var(--color-cyan)' : 'var(--color-text-muted)'}; background: transparent; padding: 4px 10px; border-bottom: 2px solid ${activeTab === 'evidence' ? 'var(--color-cyan)' : 'transparent'};">
            🗂 EVIDENCE BOARD (${collectedCount}/6)
          </button>
          <button id="btn-tab-flashbacks" style="font-family: var(--font-mono); font-size: 12px; font-weight: bold; color: ${activeTab === 'flashbacks' ? 'var(--color-amber)' : 'var(--color-text-muted)'}; background: transparent; padding: 4px 10px; border-bottom: 2px solid ${activeTab === 'flashbacks' ? 'var(--color-amber)' : 'transparent'};">
            📼 FLASHBACK ARCHIVE (${gameState.unlockedFlashbacks.size}/6)
          </button>
        </div>

        <button id="btn-open-accusation-modal" class="btn-accuse">
          ⚖️ FORMAL ACCUSATION
        </button>
      </div>

      <div class="case-board-content" id="case-board-main"></div>

      <!-- Accusation Modal -->
      <div id="accusation-modal" class="hidden" style="position: absolute; inset: 0; background: rgba(5, 8, 14, 0.94); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(10px);">
        <div style="max-width: 720px; width: 100%; background: #141B2D; border: 2px solid var(--color-red); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-glow-red); max-height: 90vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid rgba(255, 59, 92, 0.3); padding-bottom: 10px;">
            <div style="font-family: var(--font-mono); font-size: 15px; color: var(--color-red); font-weight: bold;">
              POLICE WARRANT // FORMAL CASE ACCUSATION
            </div>
            <button id="btn-close-modal" style="color: var(--color-text-muted); font-size: 18px; background: transparent;">✕</button>
          </div>

          <!-- Step 1: Select Suspect -->
          <div style="margin-bottom: 20px;">
            <div style="font-family: var(--font-mono); font-size: 12px; color: var(--color-cyan); margin-bottom: 10px;">
              STEP 1: SELECT PRIMARY PERPETRATOR (CHOOSE 1)
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
              <div class="suspect-choice-card ${selectedSuspect === 'kabir' ? 'selected' : ''}" data-suspect="kabir" style="padding: 12px; background: rgba(20, 27, 45, 0.9); border: 2px solid ${selectedSuspect === 'kabir' ? 'var(--color-cyan)' : 'rgba(127, 184, 255, 0.3)'}; border-radius: var(--radius-sm); cursor: pointer; text-align: center;">
                <div style="width: 70px; height: 70px; margin: 0 auto 8px auto;">
                  ${getCharacterSVG('kabir', 'warm', false, 70)}
                </div>
                <div style="font-weight: bold; font-size: 13px; color: #7FB8FF;">Kabir Nayak</div>
                <div style="font-size: 10px; color: var(--color-text-dim);">CEO, Nirvana Labs</div>
              </div>

              <div class="suspect-choice-card ${selectedSuspect === 'tanvi' ? 'selected' : ''}" data-suspect="tanvi" style="padding: 12px; background: rgba(20, 27, 45, 0.9); border: 2px solid ${selectedSuspect === 'tanvi' ? 'var(--color-cyan)' : 'rgba(255, 122, 217, 0.3)'}; border-radius: var(--radius-sm); cursor: pointer; text-align: center;">
                <div style="width: 70px; height: 70px; margin: 0 auto 8px auto;">
                  ${getCharacterSVG('tanvi', 'defensive', false, 70)}
                </div>
                <div style="font-weight: bold; font-size: 13px; color: #FF7AD9;">Tanvi Rout</div>
                <div style="font-size: 10px; color: var(--color-text-dim);">Junior QA Engineer</div>
              </div>

              <div class="suspect-choice-card ${selectedSuspect === 'mishra' ? 'selected' : ''}" data-suspect="mishra" style="padding: 12px; background: rgba(20, 27, 45, 0.9); border: 2px solid ${selectedSuspect === 'mishra' ? 'var(--color-cyan)' : 'rgba(143, 214, 148, 0.3)'}; border-radius: var(--radius-sm); cursor: pointer; text-align: center;">
                <div style="width: 70px; height: 70px; margin: 0 auto 8px auto;">
                  ${getCharacterSVG('mishra', 'grumpy', false, 70)}
                </div>
                <div style="font-weight: bold; font-size: 13px; color: #8FD694;">Prof. Dev Mishra</div>
                <div style="font-size: 10px; color: var(--color-text-dim);">Senior Research Advisor</div>
              </div>
            </div>
          </div>

          <!-- Step 2: Select 2 Pieces of Evidence -->
          <div style="margin-bottom: 20px;">
            <div style="font-family: var(--font-mono); font-size: 12px; color: var(--color-cyan); margin-bottom: 10px;">
              STEP 2: ATTACH SUPPORTING EVIDENCE (EXACTLY 2 REQUIRED) [Selected: ${selectedEvidence.size}/2]
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              ${EVIDENCE_LIST.map(e => {
                const isHeld = gameState.collectedClues.has(e.id);
                const isChecked = selectedEvidence.has(e.id);
                if (!isHeld) return '';
                return `
                  <div class="evidence-select-card" data-clue-id="${e.id}" style="padding: 10px; background: rgba(11, 15, 26, 0.9); border: 1px solid ${isChecked ? 'var(--color-cyan)' : 'rgba(255, 184, 77, 0.3)'}; border-radius: var(--radius-sm); cursor: pointer; display: flex; align-items: center; gap: 10px;">
                    <div style="width: 16px; height: 16px; border: 1px solid var(--color-cyan); border-radius: 3px; display: flex; align-items: center; justify-content: center; background: ${isChecked ? 'var(--color-cyan)' : 'transparent'}; color: #0B0F1A; font-weight: bold; font-size: 11px;">
                      ${isChecked ? '✓' : ''}
                    </div>
                    <div>
                      <div style="font-size: 12px; font-weight: bold; color: var(--color-text-main);">${e.title}</div>
                      <div style="font-size: 10px; color: var(--color-amber);">${e.time} • ${e.sourceApp}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Submit Warrant Button -->
          <div style="text-align: right;">
            <button id="btn-submit-warrant" style="background: var(--color-red); color: #fff; font-family: var(--font-mono); font-weight: bold; padding: 10px 24px; border-radius: var(--radius-sm); font-size: 13px; cursor: pointer;">
              EXECUTE ARREST WARRANT ➔
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind Tabs
    container.querySelector('#btn-tab-evidence').addEventListener('click', () => {
      activeTab = 'evidence';
      render();
    });
    container.querySelector('#btn-tab-flashbacks').addEventListener('click', () => {
      activeTab = 'flashbacks';
      render();
    });

    const mainSlot = container.querySelector('#case-board-main');

    if (activeTab === 'evidence') {
      mainSlot.innerHTML = `
        <div class="evidence-cards-grid">
          ${EVIDENCE_LIST.map(e => {
            const isHeld = gameState.collectedClues.has(e.id);
            return `
              <div class="evidence-card-item ${isHeld ? '' : 'pointer-events-none'}" style="opacity: ${isHeld ? 1 : 0.38}; border-style: ${isHeld ? 'solid' : 'dashed'};">
                <div class="evidence-card-time">${isHeld ? e.time : '??:?? — UNDISCOVERED'}</div>
                <div class="evidence-card-title">${isHeld ? e.title : 'Encrypted Case Lead'}</div>
                <div class="evidence-card-desc">${isHeld ? e.description : 'Explore files, chat transcripts, or system logs to recover this evidence.'}</div>
                ${isHeld ? `
                  <div style="margin-top: 6px; font-family: var(--font-mono); font-size: 10px; color: var(--color-green);">
                    INTERPRETATION: ${e.interpretation}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else {
      mainSlot.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
          ${EVIDENCE_LIST.map(e => {
            const isUnlocked = gameState.unlockedFlashbacks.has(e.flashbackId);
            const fb = getFlashbackById(e.flashbackId);
            return `
              <div style="background: rgba(20, 27, 45, 0.85); border: 1px solid ${isUnlocked ? 'var(--color-amber)' : 'rgba(255, 255, 255, 0.1)'}; border-radius: var(--radius-sm); padding: 14px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; opacity: ${isUnlocked ? 1 : 0.4};">
                <div>
                  <div style="font-family: var(--font-mono); font-size: 11px; color: var(--color-amber); font-weight: bold;">
                    ${isUnlocked ? fb.title : 'LOCKED FLASHBACK'}
                  </div>
                  <div style="font-size: 12px; color: var(--color-text-muted); margin-top: 4px;">
                    ${isUnlocked ? fb.caption : 'Find corresponding evidence to unlock this reconstructed memory.'}
                  </div>
                </div>
                ${isUnlocked ? `
                  <button class="btn-replay-flashback" data-fb-id="${fb.id}" style="background: rgba(255, 184, 77, 0.15); border: 1px solid var(--color-amber); color: var(--color-amber); font-family: var(--font-mono); font-size: 11px; padding: 5px 10px; border-radius: var(--radius-sm); cursor: pointer; align-self: flex-start;">
                    ▶ REPLAY MEMORY
                  </button>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;

      mainSlot.querySelectorAll('.btn-replay-flashback').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const fbId = e.currentTarget.getAttribute('data-fb-id');
          openFlashbackModal(fbId);
        });
      });
    }

    // Accusation Modal Handling
    const modal = container.querySelector('#accusation-modal');
    const openModalBtn = container.querySelector('#btn-open-accusation-modal');
    const closeModalBtn = container.querySelector('#btn-close-modal');

    openModalBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    // Suspect Choice Cards
    modal.querySelectorAll('.suspect-choice-card').forEach(card => {
      card.addEventListener('click', (e) => {
        selectedSuspect = e.currentTarget.getAttribute('data-suspect');
        audioManager.playKeyTick();
        render();
        container.querySelector('#accusation-modal').classList.remove('hidden');
      });
    });

    // Evidence Select Cards
    modal.querySelectorAll('.evidence-select-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-clue-id');
        if (selectedEvidence.has(id)) {
          selectedEvidence.delete(id);
        } else {
          if (selectedEvidence.size < 2) {
            selectedEvidence.add(id);
          } else {
            toastManager.showFeedback('Selection Limit', 'Select exactly 2 supporting pieces of evidence.', 'info');
          }
        }
        audioManager.playKeyTick();
        render();
        container.querySelector('#accusation-modal').classList.remove('hidden');
      });
    });

    // Warrant Submit
    const submitBtn = modal.querySelector('#btn-submit-warrant');
    submitBtn.addEventListener('click', () => {
      if (!selectedSuspect) {
        toastManager.showFeedback('Suspect Required', 'Please select a primary perpetrator to accuse.', 'danger');
        return;
      }
      if (selectedEvidence.size !== 2) {
        toastManager.showFeedback('Evidence Required', 'You must attach exactly two pieces of evidence.', 'danger');
        return;
      }

      // Check verdict
      const isKabir = selectedSuspect === 'kabir';
      // Valid clues against Kabir: clue_calendar (11:30 PM), clue_shell_search (11:02 PM), clue_admin_log (11:58 PM), or clue_private_message
      const validKabirClues = ['clue_calendar', 'clue_shell_search', 'clue_admin_log', 'clue_private_message'];
      let matchingCount = 0;
      selectedEvidence.forEach(id => {
        if (validKabirClues.includes(id)) matchingCount++;
      });

      const isCorrect = isKabir && matchingCount === 2;

      modal.classList.add('hidden');
      if (onStartAccusation) {
        onStartAccusation({
          suspect: selectedSuspect,
          evidence: Array.from(selectedEvidence),
          isCorrect
        });
      }
    });
  }

  function openFlashbackModal(fbId) {
    const fb = getFlashbackById(fbId);
    if (!fb) return;

    const modal = document.createElement('div');
    modal.className = 'flashback-modal';
    modal.innerHTML = `
      <div class="flashback-frame">
        <div class="flashback-svg-view">
          ${fb.svg}
        </div>
        <div class="flashback-caption-bar">
          <div class="flashback-caption-text">
            <strong style="color: var(--color-amber);">${fb.title}:</strong> ${fb.caption}
          </div>
          <button class="flashback-close-btn" id="btn-close-fb">CLOSE</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#btn-close-fb').addEventListener('click', () => {
      modal.remove();
    });
  }

  // Listen for state changes
  gameState.on('clueCollected', () => render());
  gameState.on('flashbackUnlocked', () => render());

  render();
  return container;
}

