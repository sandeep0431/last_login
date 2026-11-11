// Game State Store & Reactive Event Dispatcher

import { SaveManager } from './save-manager.js';
import { audioManager } from './audio-manager.js';
import { getEvidenceById } from '../data/evidence.js';
import { getFlashbackByClueId } from '../data/flashbacks.js';

class GameState {
  constructor() {
    this.listeners = new Map();
    this.reset();
  }

  reset() {
    this.currentScene = 'title';
    this.currentLevel = 0; // 0: Boot, 1: Files, 2: Mail/Chat, 3: Browser, 4: Catch Liar, 5: Accusation
    this.collectedClues = new Set();
    this.unlockedFlashbacks = new Set();
    this.statementsLog = [];
    this.suspectInterviews = {
      kabir: false,
      tanvi: false,
      mishra: false
    };
    this.assistState = {
      mood: 'friendly', // 'friendly', 'thinking', 'lying', 'panicking', 'honest'
      flagsCount: 0,
      isSafeMode: false,
      flaggedStatements: []
    };
    this.fileRenamed = false;
    this.privateFolderUnlocked = false;
    this.currentOpenWindows = new Set(['files']);
    this.activeWindowId = 'files';
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => {
        try { cb(data); } catch (e) { console.error(`Error in event listener for ${event}:`, e); }
      });
    }
  }

  // Scene Navigation
  setScene(sceneName, payload = {}) {
    this.currentScene = sceneName;
    this.emit('sceneChanged', { scene: sceneName, payload });
    this.autosave();
  }

  // Level Progression
  setLevel(lvl) {
    if (lvl > this.currentLevel) {
      this.currentLevel = lvl;
      this.emit('levelChanged', { level: lvl });
      this.autosave();
    }
  }

  // Evidence Collection - strictly once per clue
  collectClue(clueId) {
    if (this.collectedClues.has(clueId)) return false;

    const clue = getEvidenceById(clueId);
    if (!clue) return false;

    this.collectedClues.add(clueId);
    audioManager.playCluePing();

    // Trigger toast notification
    this.emit('clueCollected', { clue, count: this.collectedClues.size });

    // Unlock corresponding flashback
    const flashback = getFlashbackByClueId(clueId);
    if (flashback) {
      this.unlockedFlashbacks.add(flashback.id);
      this.emit('flashbackUnlocked', { flashback });
    }

    // Check level progression based on clues
    if (this.collectedClues.has('clue_calendar') && this.currentLevel < 1) {
      this.setLevel(1);
    }
    if ((this.collectedClues.has('clue_hospital') || this.collectedClues.has('clue_mishra_email')) && this.currentLevel < 2) {
      this.setLevel(2);
    }
    if ((this.collectedClues.has('clue_shell_search') || this.collectedClues.has('clue_admin_log')) && this.currentLevel < 3) {
      this.setLevel(3);
    }
    if (this.assistState.flagsCount >= 3 && this.currentLevel < 4) {
      this.setLevel(4);
    }
    if (this.collectedClues.size === 6 && this.currentLevel < 5) {
      this.setLevel(5);
    }

    this.autosave();
    return true;
  }

  // Statements Log Registration
  addStatement(speaker, text, verified = false) {
    // Avoid duplicate identical statements
    const exists = this.statementsLog.some(s => s.speaker === speaker && s.text === text);
    if (exists) return;

    const record = {
      id: 'stmt_' + (this.statementsLog.length + 1),
      speaker,
      text,
      verified,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.statementsLog.push(record);
    this.emit('statementAdded', record);
    this.autosave();
  }

  // Suspect Interview Gating
  markInterviewComplete(suspectId) {
    if (this.suspectInterviews[suspectId] !== undefined) {
      this.suspectInterviews[suspectId] = true;
      this.emit('interviewCompleted', { suspectId, interviews: this.suspectInterviews });
      this.autosave();
    }
  }

  areAllInterviewsDone() {
    return this.suspectInterviews.kabir && this.suspectInterviews.tanvi && this.suspectInterviews.mishra;
  }

  // Flagging Mechanic for ASSIST's Deceptive Statements
  flagAssistStatement(statementKey, contradictionEvidenceId) {
    // Check if statement has already been flagged
    if (this.assistState.flaggedStatements.includes(statementKey)) {
      return { status: 'duplicate', message: 'You have already flagged this contradiction.' };
    }

    // Check if player holds the evidence that proves the lie
    const hasEvidence = this.collectedClues.has(contradictionEvidenceId);

    if (hasEvidence) {
      this.assistState.flaggedStatements.push(statementKey);
      this.assistState.flagsCount++;
      audioManager.playGlitchBuzz();

      // If reached 3 valid flags: ASSIST Panics & Safe Mode unlocked!
      if (this.assistState.flagsCount >= 3) {
        this.assistState.mood = 'panicking';
        this.emit('assistPanicked', { flags: this.assistState.flagsCount });
        this.setLevel(4);
      } else {
        this.assistState.mood = 'lying';
      }

      this.emit('assistFlagged', {
        statementKey,
        flagsCount: this.assistState.flagsCount,
        mood: this.assistState.mood
      });
      this.autosave();

      return {
        status: 'valid',
        message: `Contradiction proven! (${this.assistState.flagsCount}/3 lies unmasked)`
      };
    } else {
      return {
        status: 'invalid',
        message: 'Insufficient contradictory evidence in your case file to disprove this statement.'
      };
    }
  }

  // Safe Mode Activation
  enableSafeMode() {
    if (this.assistState.flagsCount >= 3) {
      this.assistState.isSafeMode = true;
      this.assistState.mood = 'honest';
      audioManager.playAccessGranted();
      audioManager.playMusic('safe_mode_theme');
      this.emit('safeModeEnabled');
      this.autosave();
      return true;
    }
    return false;
  }

  // Unlock PRIVATE folder with code 1147
  unlockPrivateFolder(code) {
    if (code.trim() === '1147') {
      this.privateFolderUnlocked = true;
      audioManager.playAccessGranted();
      this.emit('privateFolderUnlocked');
      // Collecting clue 6 from inside PRIVATE folder
      this.collectClue('clue_private_message');
      this.autosave();
      return true;
    } else {
      audioManager.playAccessDenied();
      return false;
    }
  }

  autosave() {
    SaveManager.save(this);
  }

  loadSavedGame() {
    const saved = SaveManager.load();
    if (!saved) return false;

    this.currentScene = saved.currentScene || 'title';
    this.currentLevel = saved.currentLevel || 0;
    this.collectedClues = new Set(saved.collectedClues || []);
    this.unlockedFlashbacks = new Set(saved.unlockedFlashbacks || []);
    this.statementsLog = saved.statementsLog || [];
    this.suspectInterviews = saved.suspectInterviews || { kabir: false, tanvi: false, mishra: false };
    this.assistState = saved.assistState || { mood: 'friendly', flagsCount: 0, isSafeMode: false, flaggedStatements: [] };
    this.fileRenamed = Boolean(saved.fileRenamed);
    this.privateFolderUnlocked = Boolean(saved.privateFolderUnlocked);

    this.emit('gameLoaded', this);
    return true;
  }
}

export const gameState = new GameState();

