// Save Manager — LocalStorage Persistence & State Restoration

const SAVE_KEY = 'last_login_v2_saved_game';

export class SaveManager {
  static hasSave() {
    try {
      if (typeof localStorage === 'undefined') return false;
      const data = localStorage.getItem(SAVE_KEY);
      return Boolean(data && JSON.parse(data));
    } catch (e) {
      return false;
    }
  }

  static save(state) {
    try {
      if (typeof localStorage === 'undefined') return false;
      const payload = {
        currentScene: state.currentScene,
        currentLevel: state.currentLevel,
        collectedClues: Array.from(state.collectedClues),
        unlockedFlashbacks: Array.from(state.unlockedFlashbacks),
        statementsLog: state.statementsLog,
        suspectInterviews: state.suspectInterviews,
        assistState: state.assistState,
        fileRenamed: state.fileRenamed,
        privateFolderUnlocked: state.privateFolderUnlocked,
        timestamp: Date.now()
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
      return true;
    } catch (e) {
      console.warn('Could not save game:', e);
      return false;
    }
  }

  static load() {
    try {
      if (typeof localStorage === 'undefined') return null;
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Could not parse save file:', e);
      return null;
    }
  }

  static clear() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(SAVE_KEY);
        localStorage.removeItem('last_login_v2_first_prologue_started');
      }
    } catch (e) {}
  }
}

