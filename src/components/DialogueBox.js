// Reusable Dialogue Box Component with Typewriter & Keyboard Support

import { CHARACTERS } from '../data/characters.js';
import { getCharacterSVG } from '../assets/characters.js';
import { audioManager } from '../game/audio-manager.js';
import { gameState } from '../game/game-state.js';

export class DialogueBox {
  constructor(container, options = {}) {
    this.container = container;
    this.currentNode = null;
    this.typewriterTimer = null;
    this.isTyping = false;
    this.fullText = '';
    this.displayedText = '';
    this.onChoiceSelected = options.onChoice || null;
    this.onComplete = options.onComplete || null;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  destroy() {
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    window.removeEventListener('keydown', this.handleKeyDown);
    this.container.innerHTML = '';
  }

  show(dialogueNode) {
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    this.currentNode = dialogueNode;
    this.fullText = dialogueNode.text || '';
    this.displayedText = '';
    this.isTyping = true;

    // If dialogue contains a statement record, auto-log to Statements Log
    if (dialogueNode.statementRecord) {
      const speakerData = CHARACTERS[dialogueNode.speaker] || {};
      gameState.addStatement(speakerData.name || dialogueNode.speaker, dialogueNode.statementRecord);
    }

    this.render();
    this.startTypewriter();
  }

  render() {
    const speaker = CHARACTERS[this.currentNode.speaker] || {
      name: this.currentNode.speaker,
      color: '#3DF5FF'
    };

    const portraitSvg = getCharacterSVG(
      this.currentNode.speaker,
      this.currentNode.expression || 'default',
      this.isTyping,
      120
    );

    this.container.innerHTML = `
      <div class="dialogue-overlay">
        <div class="dialogue-container" role="dialog" aria-labelledby="dialogue-speaker-name">
          <!-- Portrait Frame -->
          <div class="dialogue-portrait-slot char-accent-${this.currentNode.speaker}">
            ${portraitSvg}
          </div>

          <!-- Dialogue Content -->
          <div class="dialogue-content">
            <div>
              <div class="dialogue-speaker-tag" id="dialogue-speaker-name" style="color: ${speaker.color}">
                <span class="speaker-dot" style="background: ${speaker.color}"></span>
                ${speaker.name}
              </div>
              <div class="dialogue-text-body" id="dialogue-text">${this.displayedText}</div>
            </div>

            <div class="dialogue-controls">
              <!-- Choices (hidden while typing) -->
              <div class="dialogue-choices-grid ${this.isTyping ? 'hidden' : ''}" id="dialogue-choices">
                ${(this.currentNode.choices || []).map((choice, idx) => `
                  <button class="dialogue-choice-btn" data-choice-index="${idx}" tabindex="0">
                    <span class="choice-key-indicator">[${idx + 1}]</span>
                    <span>${choice.text}</span>
                  </button>
                `).join('')}
              </div>

              <!-- Click/Press to skip/advance prompt -->
              <div class="dialogue-prompt-advance" id="dialogue-advance-prompt">
                ${this.isTyping ? '<span>CLICK OR PRESS [SPACE] TO SPEED UP ▶</span>' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind Choice Click Events
    const choiceBtns = this.container.querySelectorAll('.dialogue-choice-btn');
    choiceBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-choice-index'), 10);
        this.selectChoice(idx);
      });
    });

    // Advance Prompt Click
    const advancePrompt = this.container.querySelector('#dialogue-advance-prompt');
    if (advancePrompt) {
      advancePrompt.addEventListener('click', () => {
        if (this.isTyping) {
          this.finishTypewriter();
        }
      });
    }

    // Whole dialogue container click can finish typewriter
    const box = this.container.querySelector('.dialogue-container');
    if (box) {
      box.addEventListener('click', (e) => {
        if (this.isTyping && !e.target.closest('.dialogue-choice-btn')) {
          this.finishTypewriter();
        }
      });
    }
  }

  startTypewriter() {
    let charIndex = 0;
    const speed = 20; // ms per char

    this.typewriterTimer = setInterval(() => {
      if (charIndex < this.fullText.length) {
        this.displayedText += this.fullText[charIndex];
        const textElem = this.container.querySelector('#dialogue-text');
        if (textElem) textElem.textContent = this.displayedText;

        // Play voice blip every 2-3 characters
        if (charIndex % 3 === 0) {
          audioManager.playVoiceBlip(this.currentNode.speaker);
        }
        charIndex++;
      } else {
        this.finishTypewriter();
      }
    }, speed);
  }

  finishTypewriter() {
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    this.isTyping = false;
    this.displayedText = this.fullText;

    const textElem = this.container.querySelector('#dialogue-text');
    if (textElem) textElem.textContent = this.fullText;

    const choicesElem = this.container.querySelector('#dialogue-choices');
    if (choicesElem) choicesElem.classList.remove('hidden');

    const advancePrompt = this.container.querySelector('#dialogue-advance-prompt');
    if (advancePrompt) advancePrompt.innerHTML = '';

    // Update portrait to non-talking expression
    const portraitSlot = this.container.querySelector('.dialogue-portrait-slot');
    if (portraitSlot) {
      portraitSlot.innerHTML = getCharacterSVG(
        this.currentNode.speaker,
        this.currentNode.expression || 'default',
        false,
        120
      );
    }
  }

  selectChoice(index) {
    if (this.isTyping) {
      this.finishTypewriter();
      return;
    }

    const choices = this.currentNode.choices || [];
    if (index >= 0 && index < choices.length) {
      const selected = choices[index];
      audioManager.playKeyTick();
      if (this.onChoiceSelected) {
        this.onChoiceSelected(selected, index);
      }
    }
  }

  handleKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      if (this.isTyping) {
        e.preventDefault();
        this.finishTypewriter();
      }
    } else if (['1', '2', '3', '4'].includes(e.key)) {
      if (!this.isTyping) {
        const choiceIdx = parseInt(e.key, 10) - 1;
        this.selectChoice(choiceIdx);
      }
    }
  }
}

