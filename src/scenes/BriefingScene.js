// Prologue — Captain Das Briefing Scene

import { audioManager } from '../game/audio-manager.js';
import { DialogueBox } from '../components/DialogueBox.js';
import { DIALOGUE_DATA } from '../data/dialogue.js';
import { getCharacterSVG } from '../assets/characters.js';

export function createBriefingScene(onComplete) {
  const container = document.createElement('div');
  container.className = 'briefing-scene';
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.justifyContent = 'space-between';
  container.style.background = 'radial-gradient(circle at 50% 40%, #151d2f 0%, #070b13 100%)';

  container.innerHTML = `
    <!-- Briefing Room Ambient Lighting & Portraits -->
    <div style="flex: 1; display: flex; align-items: center; justify-content: space-around; padding: 40px; position: relative; z-index: 5;">
      <!-- Arya Portrait (Left) -->
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="width: 150px; height: 150px;" class="char-accent-arya">
          ${getCharacterSVG('arya', 'determined', false, 150)}
        </div>
        <div style="font-family: var(--font-mono); font-size: 13px; color: var(--color-cyan); margin-top: 10px; font-weight: bold;">
          INSPECTOR ARYA
        </div>
        <div style="font-size: 11px; color: var(--color-text-dim);">Lead Forensics Investigator</div>
      </div>

      <!-- Center Lamp / Steaming Tea -->
      <div style="text-align: center; opacity: 0.6;">
        <div style="font-family: var(--font-mono); font-size: 12px; color: var(--color-amber); letter-spacing: 0.2em;">
          INCIDENT BRIEFING // PRECINCT 4
        </div>
        <div style="font-size: 11px; color: var(--color-text-dim); margin-top: 4px;">
          Kuakhai Shore Command Post
        </div>
      </div>

      <!-- Captain Das Portrait (Right) -->
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="width: 150px; height: 150px;" class="char-accent-das">
          ${getCharacterSVG('das', 'serious', false, 150)}
        </div>
        <div style="font-family: var(--font-mono); font-size: 13px; color: var(--char-das); margin-top: 10px; font-weight: bold;">
          CAPTAIN DAS
        </div>
        <div style="font-size: 11px; color: var(--color-text-dim);">Precinct Commander</div>
      </div>
    </div>

    <!-- Dialogue Container at Bottom -->
    <div id="briefing-dialogue-slot"></div>
  `;

  const dialogueSlot = container.querySelector('#briefing-dialogue-slot');
  let dialogueInstance = null;

  function loadNode(nodeKey) {
    const node = DIALOGUE_DATA[nodeKey];
    if (!node) return;

    if (dialogueInstance) dialogueInstance.destroy();

    dialogueInstance = new DialogueBox(dialogueSlot, {
      onChoice: (choice) => {
        if (choice.next === 'goto_suspects') {
          if (dialogueInstance) dialogueInstance.destroy();
          if (onComplete) onComplete('suspects');
        } else if (choice.next && DIALOGUE_DATA[choice.next]) {
          loadNode(choice.next);
        }
      }
    });

    dialogueInstance.show(node);
  }

  // Start with initial briefing prompt
  loadNode('briefing_start');

  return container;
}

