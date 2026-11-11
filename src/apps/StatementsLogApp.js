// Statements Log Application — Interview Transcripts & Claims Archive

import { gameState } from '../game/game-state.js';

export function createStatementsLogApp() {
  const container = document.createElement('div');
  container.className = 'statements-layout';
  container.style.padding = '16px';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.height = '100%';
  container.style.overflowY = 'auto';

  function render() {
    const list = gameState.statementsLog;

    container.innerHTML = `
      <div style="margin-bottom: 14px; font-family: var(--font-mono); font-size: 11px; color: var(--color-cyan); border-bottom: 1px solid rgba(61, 245, 255, 0.2); padding-bottom: 8px;">
        RECORDED STATEMENTS &amp; POLICE INTERVIEWS (${list.length} LOGGED)
      </div>

      ${list.length === 0 ? `
        <div style="font-size: 12px; color: var(--color-text-dim); text-align: center; margin-top: 40px;">
          No witness or suspect statements recorded yet. Conduct interviews during the briefing or inspect chat archives.
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${list.map(s => `
            <div style="padding: 10px 14px; background: rgba(20, 27, 45, 0.85); border-left: 3px solid var(--color-cyan); border-radius: var(--radius-sm); font-size: 13px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-family: var(--font-mono); font-size: 11px; font-weight: bold; color: var(--color-cyan);">
                  ${s.speaker}
                </span>
                <span style="font-family: var(--font-mono); font-size: 10px; color: var(--color-text-dim);">
                  ${s.timestamp}
                </span>
              </div>
              <div style="line-height: 1.5; color: var(--color-text-main);">
                ${s.text}
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;
  }

  gameState.on('statementAdded', () => render());

  render();
  return container;
}

