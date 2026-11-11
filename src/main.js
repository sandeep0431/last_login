// Application Main Entry Point — Last Login v2

import { gameState } from './game/game-state.js';
import { audioManager } from './game/audio-manager.js';
import { SceneRouter } from './game/scene-router.js';
import { toastManager } from './components/ClueToast.js';

document.addEventListener('DOMContentLoaded', () => {
  const appStage = document.getElementById('app');
  if (!appStage) {
    console.error('App stage container #app not found!');
    return;
  }

  // Initialize Scene Router
  const router = new SceneRouter(appStage);

  // Setup HUD Clue Counter Reactive Listener
  const hudClueVal = document.getElementById('hud-clue-val');
  const hudClueBadge = document.getElementById('hud-clue-counter');

  const updateHudClues = () => {
    const count = gameState.collectedClues.size;
    if (hudClueVal) hudClueVal.textContent = count;
    if (hudClueBadge) {
      if (count === 6) {
        hudClueBadge.classList.add('complete');
      } else {
        hudClueBadge.classList.remove('complete');
      }
    }
  };

  gameState.on('clueCollected', ({ clue, count }) => {
    updateHudClues();
    toastManager.showClueToast(clue, count);
  });

  gameState.on('gameLoaded', () => {
    updateHudClues();
  });

  // Motion Toggle Button in HUD
  const btnMotion = document.getElementById('btn-toggle-motion');
  if (btnMotion) {
    btnMotion.addEventListener('click', () => {
      document.body.classList.toggle('reduced-motion');
      audioManager.playKeyTick();
    });
  }

  // Wake audio on any first user gesture
  const userGestureWake = () => {
    audioManager.ensureContext();
    window.removeEventListener('click', userGestureWake);
    window.removeEventListener('keydown', userGestureWake);
    window.removeEventListener('touchstart', userGestureWake);
  };
  window.addEventListener('click', userGestureWake);
  window.addEventListener('keydown', userGestureWake);
  window.addEventListener('touchstart', userGestureWake);

  // HUD Options / Menu Button
  const btnHudOptions = document.getElementById('btn-hud-options');
  if (btnHudOptions) {
    btnHudOptions.addEventListener('click', () => {
      audioManager.ensureContext();
      audioManager.playKeyTick();
      router.goTo('title', { showOptions: true });
    });
  }

  // Check if prologue has already started once for this user
  const FIRST_PROLOGUE_KEY = 'last_login_v2_first_prologue_done';
  const hasSeenFirstPrologue = typeof localStorage !== 'undefined' && localStorage.getItem(FIRST_PROLOGUE_KEY) === 'true';

  // Initial Launch: Mount Landing Page. Clicking anywhere on the landing page
  // unlocks the audio engine and automatically begins the video prologue.
  router.goTo('landing');
});

