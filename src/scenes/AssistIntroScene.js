// Prologue — Meet ASSIST & Subtle Glitch Warning Scene

import { audioManager } from '../game/audio-manager.js';
import { DialogueBox } from '../components/DialogueBox.js';
import { DIALOGUE_DATA } from '../data/dialogue.js';
import { getCharacterSVG } from '../assets/characters.js';

export function createAssistIntroScene(onComplete) {
  const container = document.createElement('div');
  container.className = 'assist-intro-scene';
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.justifyContent = 'space-between';
  container.style.background = 'radial-gradient(circle at center, #101c30 0%, #060912 100%)';

  container.innerHTML = `
    <!-- Center Orb Stage -->
    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
      <div id="assist-intro-orb" style="width: 160px; height: 160px; filter: drop-shadow(0 0 24px rgba(61, 245, 255, 0.4)); animation: charBreathe 3s infinite ease-in-out;">
        ${getCharacterSVG('assist', 'friendly', false, 160)}
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <div style="font-family: var(--font-mono); font-size: 16px; font-weight: bold; color: var(--color-cyan); letter-spacing: 0.15em;">
          ASSIST // HEURISTIC COMPANION v4.8
        </div>
        <div style="font-size: 12px; color: var(--color-text-muted); margin-top: 6px;">
          Nirvana Labs Heuristic Companion Subsystem
        </div>
      </div>
    </div>

    <!-- Dialogue Slot -->
    <div id="assist-intro-dialogue-slot"></div>
  `;

  const orbContainer = container.querySelector('#assist-intro-orb');
  const dialogueSlot = container.querySelector('#assist-intro-dialogue-slot');
  let dialogueInstance = null;

  function runNode(nodeKey) {
    const node = DIALOGUE_DATA[nodeKey];
    if (!node) return;

    if (dialogueInstance) dialogueInstance.destroy();

    // Trigger subtle glitch on node assist_intro_2
    if (nodeKey === 'assist_intro_2') {
      triggerSubtleGlitch();
    }

    dialogueInstance = new DialogueBox(dialogueSlot, {
      onChoice: (choice) => {
        if (choice.next === 'goto_boot') {
          if (dialogueInstance) dialogueInstance.destroy();
          if (onComplete) onComplete('desktop');
        } else if (choice.next === 'goto_options') {
          if (dialogueInstance) dialogueInstance.destroy();
          if (onComplete) onComplete('title', { showOptions: true });
        } else if (choice.next && DIALOGUE_DATA[choice.next]) {
          runNode(choice.next);
        }
      }
    });

    dialogueInstance.show(node);
  }

  function triggerSubtleGlitch() {
    audioManager.playGlitchBuzz();
    const flash = document.getElementById('glitch-flash');
    if (flash) {
      flash.classList.add('active');
      setTimeout(() => flash.classList.remove('active'), 180);
    }
    // Swap orb to lying glitch look for a moment
    orbContainer.innerHTML = getCharacterSVG('assist', 'lying', false, 160);
    setTimeout(() => {
      orbContainer.innerHTML = getCharacterSVG('assist', 'friendly', false, 160);
    }, 450);
  }

  runNode('assist_intro_1');

  return container;
}

