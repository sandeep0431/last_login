// Mail Application — NirvanaMail Client

import { gameState } from '../game/game-state.js';
import { audioManager } from '../game/audio-manager.js';

export function createMailApp() {
  audioManager.playNotification();
  const container = document.createElement('div');
  container.className = 'mail-layout';

  const emails = [
    {
      id: 'mail_mishra',
      sender: 'Prof. Dev Mishra',
      email: 'd.mishra@cyber-institute.ac.in',
      date: 'Sep 11 (2 Months Ago)',
      subject: 'Re: Research IP Attribution & Citations',
      body: `Dr. Sahoo,\n\nI must formally protest the lack of secondary author citation in the recent preprint regarding neural tensor trees.\n\nWhile I acknowledge your laboratory carried out the empirical proofs, the core formulation belongs to our joint 2024 fellowship.\n\nWe must convene with the academic board next Tuesday to resolve this amicably. I have no wish to escalate this through legal chambers.\n\nRegards,\nProf. Dev Mishra\nInstitute of Information Sciences`,
      isClue: true,
      clueId: 'clue_mishra_email'
    },
    {
      id: 'mail_kabir',
      sender: 'Kabir Nayak (CEO)',
      email: 'k.nayak@nirvanalabs.in',
      date: 'Yesterday, 4:15 PM',
      subject: 'Urgent: FY26 Q4 Audit Adjustments',
      body: `Meera,\n\nPlease halt your unilateral manual inspection of the Nirvana Holdings subsidiary ledger. Those entries are proprietary to the board and outside standard technical audit.\n\nLet us speak tonight in private before you run automated checksums.\n\nKabir Nayak\nChief Executive Officer`,
      isClue: false
    },
    {
      id: 'mail_hr',
      sender: 'Nirvana Labs HR',
      email: 'internal-notices@nirvanalabs.in',
      date: '3 Days Ago',
      subject: 'Notice of Personnel Departure — Tanvi Rout',
      body: `All Staff,\n\nPlease be advised that Tanvi Rout has concluded her engagement with Nirvana Labs QA wing effective immediately. All physical credentials and VPN keys have been revoked.\n\nHR Department`,
      isClue: false
    }
  ];

  let selectedMailId = 'mail_mishra';

  function render() {
    const selectedMail = emails.find(m => m.id === selectedMailId) || emails[0];

    container.innerHTML = `
      <div class="mail-list">
        ${emails.map(mail => `
          <div class="mail-item ${mail.id === selectedMailId ? 'active' : ''}" data-mail-id="${mail.id}">
            <div class="mail-item-sender">${mail.sender}</div>
            <div class="mail-item-subject">${mail.subject}</div>
            <div class="mail-item-date">${mail.date}</div>
          </div>
        `).join('')}
      </div>

      <div class="mail-reader">
        <div class="mail-header-info">
          <h3 style="font-size: 15px; margin-bottom: 6px; color: var(--color-cyan);">${selectedMail.subject}</h3>
          <div style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted); display: flex; justify-content: space-between;">
            <div>From: <strong>${selectedMail.sender}</strong> &lt;${selectedMail.email}&gt;</div>
            <div style="color: var(--color-amber);">${selectedMail.date}</div>
          </div>
        </div>

        <div style="font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: var(--color-text-main); flex: 1;">${selectedMail.body}</div>

        ${selectedMail.isClue ? `
          <div style="margin-top: 16px; padding: 10px; background: rgba(77, 255, 166, 0.12); border: 1px solid var(--color-green); border-radius: var(--radius-sm); font-size: 12px; color: var(--color-green);">
            ✓ <strong>Investigation Clue:</strong> Notice the date stamp: <em>September 11 (Two months prior)</em>. This confirms Prof. Mishra's argument was an old academic dispute, clearing him of immediate involvement last night.
          </div>
        ` : ''}
      </div>
    `;

    // Item selection
    container.querySelectorAll('.mail-item').forEach(item => {
      item.addEventListener('click', (e) => {
        selectedMailId = e.currentTarget.getAttribute('data-mail-id');
        audioManager.playKeyTick();
        render();

        // If selecting Mishra's email, collect Clue 3
        if (selectedMailId === 'mail_mishra') {
          gameState.collectClue('clue_mishra_email');
        }
      });
    });

    // Auto-collect if Mishra email opened
    if (selectedMailId === 'mail_mishra') {
      gameState.collectClue('clue_mishra_email');
    }
  }

  render();
  return container;
}

