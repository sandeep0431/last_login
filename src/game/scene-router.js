// Scene Router — Directs Stage Transitions, Ambience & Background Music

import { gameState } from './game-state.js';
import { audioManager } from './audio-manager.js';
import { createLandingScene } from '../scenes/LandingScene.js';
import { createTitleScene } from '../scenes/TitleScene.js?v=2.2';
import { createVideoPrologueScene } from '../scenes/VideoPrologueScene.js';
import { createRiverbankScene } from '../scenes/RiverbankScene.js';
import { createBriefingScene } from '../scenes/BriefingScene.js';
import { createSuspectLineupScene } from '../scenes/SuspectLineupScene.js';
import { createAssistIntroScene } from '../scenes/AssistIntroScene.js';
import { createDesktopScene } from '../scenes/DesktopScene.js';
import { createEndingScene } from '../scenes/EndingScene.js';

export class SceneRouter {
  constructor(appStageElement) {
    this.stage = appStageElement;
    this.currentSceneElement = null;
    this.currentSceneName = null;
  }

  goTo(sceneName, payload = {}) {
    if (this.currentSceneElement) {
      this.currentSceneElement.remove();
      this.currentSceneElement = null;
    }

    this.currentSceneName = sceneName;
    gameState.currentScene = sceneName;

    // Toggle fullscreen mode on landing page (immersive borderless Alan Wake title screen)
    const hud = document.getElementById('global-hud');
    if (hud) {
      hud.style.display = sceneName === 'landing' ? 'none' : 'flex';
    }
    if (this.stage) {
      this.stage.classList.toggle('landing-active', sceneName === 'landing');
    }

    // Update HUD status label
    const hudStatus = document.getElementById('hud-status');
    if (hudStatus) {
      hudStatus.textContent = `SCENE // ${sceneName.toUpperCase()}`;
    }

    switch (sceneName) {
      case 'landing':
        audioManager.playIntroMusic();
        this.currentSceneElement = createLandingScene(() => {
          // After clicking anywhere on the landing page, the video prologue starts automatically!
          this.goTo('video_prologue');
        });
        break;

      case 'title':
        audioManager.playStoryMusic();
        this.currentSceneElement = createTitleScene((action) => {
          if (action === 'continue') {
            gameState.loadSavedGame();
            this.goTo(gameState.currentScene || 'desktop');
          } else if (action === 'new_game') {
            gameState.reset();
            this.goTo('riverbank');
          } else if (action === 'video_prologue') {
            this.goTo('video_prologue');
          } else if (action === 'prologue' || action === 'briefing') {
            this.goTo('riverbank');
          }
        }, payload);
        break;

      case 'video_prologue':
        audioManager.playStoryMusic();
        this.currentSceneElement = createVideoPrologueScene(() => {
          // After video finishes or user skips, show the game options!
          this.goTo('title', { showOptions: true });
        });
        break;

      case 'riverbank':
        audioManager.playStoryMusic();
        this.currentSceneElement = createRiverbankScene((nextScene) => {
          this.goTo(nextScene || 'briefing');
        });
        break;

      case 'briefing':
        audioManager.playStoryMusic();
        this.currentSceneElement = createBriefingScene((nextScene) => {
          this.goTo(nextScene || 'suspects');
        });
        break;

      case 'suspects':
        audioManager.playStoryMusic();
        this.currentSceneElement = createSuspectLineupScene((nextScene) => {
          this.goTo(nextScene || 'assist_intro');
        });
        break;

      case 'assist_intro':
        audioManager.playStoryMusic();
        this.currentSceneElement = createAssistIntroScene((nextScene, nextPayload) => {
          this.goTo(nextScene || 'desktop', nextPayload || {});
        });
        break;

      case 'desktop':
        audioManager.playStoryMusic();
        this.currentSceneElement = createDesktopScene((verdict) => {
          this.goTo('ending', { verdict });
        });
        break;

      case 'ending':
        audioManager.playStoryMusic();
        this.currentSceneElement = createEndingScene(
          payload.verdict || { isCorrect: false, suspect: 'tanvi' },
          () => {
            // Safe Retry: Return to desktop with all progress intact
            this.goTo('desktop');
          },
          () => {
            // New Game / Title
            gameState.reset();
            this.goTo('title');
          }
        );
        break;

      default:
        this.currentSceneElement = createLandingScene(() => {
          this.goTo('video_prologue');
        });
    }

    if (this.currentSceneElement) {
      this.stage.appendChild(this.currentSceneElement);
    }
  }
}
