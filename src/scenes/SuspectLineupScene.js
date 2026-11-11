// Prologue — Suspect Lineup & Mandatory Interviews Scene

import { gameState } from '../game/game-state.js';
import { audioManager } from '../game/audio-manager.js';
import { DialogueBox } from '../components/DialogueBox.js';
import { DIALOGUE_DATA } from '../data/dialogue.js';
import { getCharacterSVG } from '../assets/characters.js';
import { toastManager } from '../components/ClueToast.js';

export function createSuspectLineupScene(onComplete) {
  const container = document.createElement('div');
  container.className = 'suspect-lineup-scene';
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.background = 'radial-gradient(circle at center, #101828 0%, #060a12 100%)';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.justifyContent = 'space-between';
  container.style.padding = '30px 40px';

  let currentInterviewingSuspect = null;
  let dialogueInstance = null;

  function render() {
    const isKabirDone = gameState.suspectInterviews.kabir;
    const isTanviDone = gameState.suspectInterviews.tanvi;
    const isMishraDone = gameState.suspectInterviews.mishra;
    const allDone = isKabirDone && isTanviDone && isMishraDone;

    container.innerHTML = `
      <!-- Lineup Header -->
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--color-cyan); letter-spacing: 0.3em; margin-bottom: 6px;">
          PRELIMINARY INTERVIEWS // BHUBANESWAR POLICE PRECINCT
        </div>
        <h2 style="font-size: 24px; color: var(--color-text-main); font-weight: 800; letter-spacing: 0.05em;">
          PERSONS OF INTEREST
        </h2>
        <p style="font-size: 12px; color: var(--color-text-muted); margin-top: 4px;">
          Interrogate all three individuals before accessing the compromise victim's laptop.
        </p>
      </div>

      <!-- Suspect Polaroids Grid -->
      <div style="display: flex; justify-content: center; align-items: center; gap: 40px; flex-wrap: wrap; margin: auto 0;">
        <!-- Kabir Polaroid -->
        <div class="polaroid-card ${isKabirDone ? 'interviewed' : ''}" id="card-kabir" tabindex="0">
          <div class="polaroid-photo char-accent-kabir">
            ${getCharacterSVG('kabir', 'warm', false, 140)}
          </div>
          <div class="polaroid-caption">
            <div>KABIR NAYAK</div>
            <div style="font-size: 10px; color: #555; font-family: var(--font-mono);">CEO, NIRVANA LABS</div>
          </div>
        </div>

        <!-- Tanvi Polaroid -->
        <div class="polaroid-card ${isTanviDone ? 'interviewed' : ''}" id="card-tanvi" tabindex="0">
          <div class="polaroid-photo char-accent-tanvi">
            ${getCharacterSVG('tanvi', 'defensive', false, 140)}
          </div>
          <div class="polaroid-caption">
            <div>TANVI ROUT</div>
            <div style="font-size: 10px; color: #555; font-family: var(--font-mono);">FORMER QA ASSISTANT</div>
          </div>
        </div>

        <!-- Mishra Polaroid -->
        <div class="polaroid-card ${isMishraDone ? 'interviewed' : ''}" id="card-mishra" tabindex="0">
          <div class="polaroid-photo char-accent-mishra">
            ${getCharacterSVG('mishra', 'grumpy', false, 140)}
          </div>
          <div class="polaroid-caption">
            <div>PROF. DEV MISHRA</div>
            <div style="font-size: 10px; color: #555; font-family: var(--font-mono);">RESEARCH ADVISOR</div>
          </div>
        </div>
      </div>

      <!-- Proceed Button & Gate Status -->
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; margin-top: 20px;">
        <button id="btn-proceed-assist" style="background: ${allDone ? 'linear-gradient(135deg, var(--color-cyan) 0%, #0097e6 100%)' : 'rgba(20, 27, 45, 0.8)'}; border: 1px solid ${allDone ? 'var(--color-cyan)' : 'rgba(142, 157, 184, 0.3)'}; color: ${allDone ? '#0B0F1A' : 'var(--color-text-dim)'}; font-family: var(--font-mono); font-weight: bold; font-size: 13px; padding: 10px 24px; border-radius: var(--radius-sm); cursor: ${allDone ? 'pointer' : 'not-allowed'}; box-shadow: ${allDone ? 'var(--shadow-glow-cyan)' : 'none'};" ${allDone ? '' : 'disabled'}>
          ${allDone ? 'PROCEED TO ASSIST INITIALIZATION ➔' : 'INTERVIEW ALL 3 PERSONS OF INTEREST TO UNLOCK'}
        </button>
      </div>

      <!-- Dialogue Slot -->
      <div id="lineup-dialogue-slot"></div>
    `;

    // Bind Polaroid Clicks
    container.querySelector('#card-kabir').addEventListener('click', () => {
      audioManager.playKeyTick();
      startInterview('kabir');
    });

    container.querySelector('#card-tanvi').addEventListener('click', () => {
      audioManager.playKeyTick();
      startInterview('tanvi');
    });

    container.querySelector('#card-mishra').addEventListener('click', () => {
      audioManager.playKeyTick();
      startInterview('mishra');
    });

    // Bind Proceed
    const proceedBtn = container.querySelector('#btn-proceed-assist');
    if (allDone) {
      proceedBtn.addEventListener('click', () => {
        audioManager.playKeyTick();
        if (onComplete) onComplete('assist_intro');
      });
    }
  }

  function startInterview(suspectId) {
    currentInterviewingSuspect = suspectId;
    const startNodeKey = `interview_${suspectId}_1`;
    runDialogue(startNodeKey, suspectId);
  }

  function runDialogue(nodeKey, suspectId) {
    const node = DIALOGUE_DATA[nodeKey];
    if (!node) return;

    if (nodeKey === 'interview_kabir_2' || nodeKey === 'interview_kabir_3') {
      audioManager.playWatchTick();
    }

    const dialogueSlot = container.querySelector('#lineup-dialogue-slot');
    if (dialogueInstance) dialogueInstance.destroy();

    dialogueInstance = new DialogueBox(dialogueSlot, {
      onChoice: (choice) => {
        if (choice.next && choice.next.startsWith('finish_interview_')) {
          gameState.markInterviewComplete(suspectId);
          toastManager.showFeedback('Interview Concluded', `Statement recorded from ${suspectId.toUpperCase()}.`, 'success');
          dialogueInstance.destroy();
          dialogueInstance = null;
          render();
        } else if (choice.next && DIALOGUE_DATA[choice.next]) {
          runDialogue(choice.next, suspectId);
        } else {
          dialogueInstance.destroy();
          dialogueInstance = null;
          render();
        }
      }
    });

    dialogueInstance.show(node);
  }

  render();
  return container;
}

