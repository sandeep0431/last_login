// Chat Application — NirvanaWire Messenger

import { gameState } from '../game/game-state.js';
import { audioManager } from '../game/audio-manager.js';

export function createChatApp() {
  audioManager.playNotification();
  const container = document.createElement('div');
  container.className = 'chat-layout';

  function render() {
    container.innerHTML = `
      <div class="chat-header">
        <div style="width: 10px; height: 10px; border-radius: 50%; background: #FF7AD9;"></div>
        <div>
          <div style="font-family: var(--font-mono); font-size: 13px; font-weight: bold; color: #FF7AD9;">Tanvi Rout</div>
          <div style="font-size: 10px; color: var(--color-text-dim);">Offline • Last seen yesterday at 23:20 IST</div>
        </div>
      </div>

      <div class="chat-messages-container" id="chat-messages">
        <!-- Message 1 -->
        <div class="chat-bubble incoming">
          <div>Meera ma'am, Kabir just revoked my access card. He said I was asking too many questions about the Mauritius ledger transfers.</div>
          <div class="chat-time">22:45 PM</div>
        </div>

        <!-- Message 2 (Meera) -->
        <div class="chat-bubble outgoing">
          <div>Tanvi, listen to me carefully. Do not come back to the building tonight. I am going into the server room to clone the root transaction logs myself.</div>
          <div class="chat-time">22:52 PM</div>
        </div>

        <!-- Message 3 -->
        <div class="chat-bubble incoming">
          <div>Please be careful ma'am. Also, I couldn't even if I wanted to—my mother collapsed with an asthma seizure. I'm at City General Hospital Emergency Ward right now waiting for her nebulizer medication.</div>
          <div class="chat-time">23:08 PM</div>
        </div>

        <!-- Message 4 (Hospital Receipt Attachment) -->
        <div class="chat-bubble incoming" style="border: 2px solid #FF7AD9; background: rgba(255, 122, 217, 0.08);">
          <div style="font-family: var(--font-mono); font-size: 11px; color: #FF7AD9; font-weight: bold; margin-bottom: 6px;">
            📎 ATTACHMENT: hospital_receipt_tanvi.png [11:15 PM]
          </div>
          <!-- Vector Receipt Preview -->
          <div id="receipt-preview-box" style="background: #ffffff; color: #111; padding: 12px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 11px; cursor: pointer;">
            <div style="font-weight: bold; border-bottom: 1px dashed #333; padding-bottom: 4px; margin-bottom: 6px;">
              CITY GENERAL HOSPITAL — 24HR ER PHARMACY
            </div>
            <div>PATIENT: Mrs. S. Rout (Mother)</div>
            <div>ATTENDEE / PAYER: Tanvi Rout</div>
            <div>MED: Budecort Respules + Salbutamol</div>
            <div style="margin-top: 6px; font-weight: bold; color: #c0392b; font-size: 12px;">
              TIMESTAMP STAMP: 23:15:22 IST (PAID)
            </div>
          </div>
          <div class="chat-time">23:18 PM</div>
        </div>

        <!-- Message 5 -->
        <div class="chat-bubble incoming">
          <div>They gave me the meds. Ma'am, are you still there? Please pick up your phone!</div>
          <div class="chat-time">23:20 PM</div>
        </div>
      </div>
    `;

    // Click on receipt collects clue
    const receiptBox = container.querySelector('#receipt-preview-box');
    if (receiptBox) {
      receiptBox.addEventListener('click', () => {
        audioManager.playKeyTick();
        gameState.collectClue('clue_hospital');
      });
    }

    // Auto-collect on viewing
    gameState.collectClue('clue_hospital');
  }

  render();
  return container;
}

