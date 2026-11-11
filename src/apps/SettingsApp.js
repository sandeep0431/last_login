// Settings Application — System Preferences & Diagnostics

import { audioManager } from '../game/audio-manager.js';
import { SaveManager } from '../game/save-manager.js';

export function createSettingsApp() {
  const container = document.createElement('div');
  container.className = 'settings-layout';
  container.style.padding = '20px';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '16px';
  container.style.height = '100%';
  container.style.overflowY = 'auto';

  function render() {
    const isMuted = audioManager.isMuted;
    const isReduced = document.body.classList.contains('reduced-motion');

    container.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 14px; font-weight: bold; color: var(--color-cyan); border-bottom: 1px solid rgba(61, 245, 255, 0.2); padding-bottom: 8px;">
        NIRVANAOS SETTINGS &amp; ACCESSIBILITY
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        <!-- Audio Setting -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(20, 27, 45, 0.7); border-radius: var(--radius-sm);">
          <div>
            <div style="font-size: 13px; font-weight: bold;">Soundtrack &amp; Game Audio</div>
            <div style="font-size: 11px; color: var(--color-text-dim);">intro.mpeg &amp; story.mpeg music loop, plus SFX</div>
          </div>
          <button id="btn-toggle-sound-app" style="background: ${isMuted ? 'rgba(255, 59, 92, 0.2)' : 'rgba(77, 255, 166, 0.2)'}; border: 1px solid ${isMuted ? 'var(--color-red)' : 'var(--color-green)'}; color: ${isMuted ? 'var(--color-red)' : 'var(--color-green)'}; padding: 6px 14px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 12px; font-weight: bold;">
            ${isMuted ? 'OFF / MUTED' : 'ON / PLAYING'}
          </button>
        </div>

        <!-- Reduced Motion Setting -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(20, 27, 45, 0.7); border-radius: var(--radius-sm);">
          <div>
            <div style="font-size: 13px; font-weight: bold;">Reduced Motion Mode</div>
            <div style="font-size: 11px; color: var(--color-text-dim);">Disables screen shakes, scanline flicker, and heavy zoom</div>
          </div>
          <button id="btn-toggle-motion-app" style="background: ${isReduced ? 'rgba(77, 255, 166, 0.2)' : 'rgba(142, 157, 184, 0.2)'}; border: 1px solid ${isReduced ? 'var(--color-green)' : 'rgba(142, 157, 184, 0.4)'}; color: ${isReduced ? 'var(--color-green)' : 'var(--color-text-main)'}; padding: 6px 14px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 12px; font-weight: bold;">
            ${isReduced ? 'ACTIVE' : 'OFF'}
          </button>
        </div>

        <!-- Reset Progress -->
        <div style="margin-top: 20px; padding: 14px; background: rgba(255, 59, 92, 0.08); border: 1px solid var(--color-red); border-radius: var(--radius-sm);">
          <div style="font-size: 13px; font-weight: bold; color: var(--color-red); margin-bottom: 4px;">
            ⚠️ Reset Investigation Data
          </div>
          <div style="font-size: 11px; color: var(--color-text-muted); margin-bottom: 10px;">
            Clears all cached clues, interviews, and progress from browser LocalStorage.
          </div>
          <button id="btn-clear-save" style="background: var(--color-red); color: #fff; border: none; padding: 6px 16px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 11px; font-weight: bold; cursor: pointer;">
            WIPE CASE STATE
          </button>
        </div>
      </div>
    `;

    // Audio Toggle
    container.querySelector('#btn-toggle-sound-app').addEventListener('click', () => {
      audioManager.toggleMute();
      render();
    });

    // Motion Toggle
    container.querySelector('#btn-toggle-motion-app').addEventListener('click', () => {
      document.body.classList.toggle('reduced-motion');
      render();
    });

    // Clear Save
    container.querySelector('#btn-clear-save').addEventListener('click', () => {
      if (confirm('Are you sure you want to erase all case progress and restart?')) {
        SaveManager.clear();
        window.location.reload();
      }
    });
  }

  render();
  return container;
}

