// Desktop Scene — Simulated Operating System (NirvanaOS)

import { gameState } from '../game/game-state.js';
import { audioManager } from '../game/audio-manager.js';
import { DESKTOP_APPS } from '../data/desktop-apps.js';
import { WindowFrame } from '../components/WindowFrame.js';

import { createFilesApp } from '../apps/FilesApp.js';
import { createMailApp } from '../apps/MailApp.js';
import { createChatApp } from '../apps/ChatApp.js';
import { createBrowserApp } from '../apps/BrowserApp.js';
import { createCaseBoardApp } from '../apps/CaseBoardApp.js';
import { createStatementsLogApp } from '../apps/StatementsLogApp.js';
import { createAssistApp } from '../apps/AssistApp.js';
import { createSettingsApp } from '../apps/SettingsApp.js';

export function createDesktopScene(onTriggerAccusation) {
  const container = document.createElement('div');
  container.className = 'desktop-container';

  let openWindows = new Map(); // appId -> WindowFrame instance
  let isBooted = false;

  // Render Boot Sequence
  function renderBootScreen() {
    container.innerHTML = `
      <div id="boot-overlay" style="position: absolute; inset: 0; background: #070B12; z-index: 1000; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 24px;">
        <div style="max-width: 620px; width: 100%; font-family: var(--font-mono); font-size: 12px; line-height: 1.8; color: var(--color-cyan);">
          <div>&gt;&gt; NIRVANA ARCHITECTURE BIOS v4.81-RELEASE</div>
          <div>&gt;&gt; DETECTING CRYPTOGRAPHIC HARDWARE... OK</div>
          <div>&gt;&gt; MOUNTING NirvanaFS VOLUME /dev/nvme0n1p2... OK</div>
          <div>&gt;&gt; LOADING HEURISTIC KERNEL /sys/assist/core.bin... OK</div>
          <div style="color: var(--color-amber);">&gt;&gt; SESSION NOTICE: User m_sahoo session was improperly suspended at 23:41:00 IST</div>
        </div>

        <div style="margin-top: 32px; text-align: center;">
          <div style="width: 80px; height: 80px; margin: 0 auto 16px auto; border-radius: 50%; background: rgba(61, 245, 255, 0.1); border: 2px solid var(--color-cyan); display: flex; align-items: center; justify-content: center; font-size: 32px;">
            💻
          </div>
          <div style="font-family: var(--font-mono); font-size: 15px; color: #fff; font-weight: bold;">
            Dr. Meera Sahoo
          </div>
          <div style="font-size: 11px; color: var(--color-text-dim); margin-top: 2px;">
            m.sahoo@nirvanalabs.in (Chief Architect)
          </div>
          <div style="margin-top: 20px;">
            <button id="btn-login-os" style="background: var(--color-cyan); color: #0B0F1A; font-family: var(--font-mono); font-weight: bold; font-size: 13px; padding: 8px 24px; border-radius: var(--radius-sm); box-shadow: var(--shadow-glow-cyan); cursor: pointer;">
              BYPASS LOGIN &amp; ACCESS WORKSPACE ➔
            </button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-login-os').addEventListener('click', () => {
      audioManager.playBootChime();
      isBooted = true;
      renderDesktop();
    });
  }

  // Render Main Desktop UI
  function renderDesktop() {
    container.innerHTML = `
      <!-- Wallpaper Grid -->
      <div class="desktop-wallpaper"></div>
      <div class="desktop-logo-watermark">NIRVANA LABS</div>

      <!-- Desktop Icons -->
      <div class="desktop-icons-area" role="toolbar" aria-label="Desktop Icons">
        ${DESKTOP_APPS.map(app => `
          <button class="desktop-icon-btn" data-app-id="${app.id}" title="${app.title}">
            <div class="desktop-icon-svg flex-center" style="font-size: 30px;">
              ${app.iconSymbol}
            </div>
            <div class="desktop-icon-label">${app.iconLabel}</div>
          </button>
        `).join('')}
      </div>

      <!-- Windows Layer Container -->
      <div class="windows-container" id="windows-stage"></div>

      <!-- Taskbar -->
      <footer class="taskbar">
        <div class="taskbar-left">
          <button class="start-btn" id="taskbar-start-btn">
            <span>💠</span> NirvanaOS
          </button>
          <div class="taskbar-tasks" id="taskbar-tasks-list"></div>
        </div>
        <div class="taskbar-right">
          <span style="font-size: 11px; color: var(--color-amber);">CLUES: <strong id="tb-clues-count">${gameState.collectedClues.size}</strong>/6</span>
          <span class="taskbar-clock" id="taskbar-live-clock">23:41 IST</span>
        </div>
      </footer>
    `;

    // Clock ticker
    const clockElem = container.querySelector('#taskbar-live-clock');
    const updateClock = () => {
      const now = new Date();
      clockElem.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };
    updateClock();
    setInterval(updateClock, 1000);

    // Bind App Icons
    container.querySelectorAll('.desktop-icon-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const appId = e.currentTarget.getAttribute('data-app-id');
        launchApp(appId);
      });
    });

    // Start Button (opens Case Board)
    container.querySelector('#taskbar-start-btn').addEventListener('click', () => {
      launchApp('case_board');
    });

    // Launch default starting apps
    launchApp('files');
    launchApp('assist');
  }

  function launchApp(appId) {
    if (openWindows.has(appId)) {
      const win = openWindows.get(appId);
      if (win.isMinimized) {
        win.restore();
      } else {
        win.bringToFront();
      }
      updateTaskbarTasks();
      return;
    }

    const appConfig = DESKTOP_APPS.find(a => a.id === appId);
    if (!appConfig) return;

    let appContent = null;
    switch (appId) {
      case 'files':
        appContent = createFilesApp();
        break;
      case 'mail':
        appContent = createMailApp();
        break;
      case 'chat':
        appContent = createChatApp();
        break;
      case 'browser':
        appContent = createBrowserApp();
        break;
      case 'case_board':
        appContent = createCaseBoardApp(onTriggerAccusation);
        break;
      case 'statements':
        appContent = createStatementsLogApp();
        break;
      case 'assist':
        appContent = createAssistApp();
        break;
      case 'settings':
        appContent = createSettingsApp();
        break;
      default:
        appContent = document.createElement('div');
        appContent.textContent = 'App content';
    }

    const stage = container.querySelector('#windows-stage');
    if (!stage) return;

    const winFrame = new WindowFrame(appConfig, appContent, (closedId) => {
      openWindows.delete(closedId);
      updateTaskbarTasks();
    });

    stage.appendChild(winFrame.element);
    openWindows.set(appId, winFrame);
    audioManager.playKeyTick();

    updateTaskbarTasks();
  }

  function updateTaskbarTasks() {
    const taskList = container.querySelector('#taskbar-tasks-list');
    if (!taskList) return;

    taskList.innerHTML = '';
    openWindows.forEach((win, appId) => {
      const btn = document.createElement('button');
      btn.className = `taskbar-task-btn ${!win.isMinimized ? 'active' : ''}`;
      btn.innerHTML = `<span>${win.appConfig.iconSymbol}</span> <span>${win.appConfig.iconLabel}</span>`;
      btn.addEventListener('click', () => {
        if (win.isMinimized) {
          win.restore();
        } else {
          win.minimize();
        }
        updateTaskbarTasks();
      });
      taskList.appendChild(btn);
    });

    const cluesCount = container.querySelector('#tb-clues-count');
    if (cluesCount) {
      cluesCount.textContent = gameState.collectedClues.size;
    }
  }

  // Update taskbar when clues update
  gameState.on('clueCollected', () => {
    const cluesCount = container.querySelector('#tb-clues-count');
    if (cluesCount) cluesCount.textContent = gameState.collectedClues.size;
  });

  renderBootScreen();

  return container;
}

