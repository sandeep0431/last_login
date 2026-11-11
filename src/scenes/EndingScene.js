// Ending Scene — Kabir Confrontation, Sunrise Victory & Multiple Branching Defeat Endings
// Features:
// 1. Victory: "Justice at Dawn" (Kabir arrested, assets seized, sunrise over Kuakhai)
// 2. Storyline A Defeat: "The Corporate Scapegoat" (Tanvi Rout wrongfully convicted, mother dies, Kabir escapes)
// 3. Storyline B Defeat: "The Broken Scholar" (Prof. Dev Mishra ruined, university disgraced, lab liquidated)
// 4. Defeat: "The Untouchable CEO" (Premature accusation against Kabir without required forensic proofs)

import { audioManager } from '../game/audio-manager.js';
import { getCharacterSVG } from '../assets/characters.js';
import { DialogueBox } from '../components/DialogueBox.js';
import { getEvidenceById } from '../data/evidence.js';

export function createEndingScene(verdict, onRetry, onNewGame) {
  const container = document.createElement('div');
  container.className = 'ending-scene';
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.justifyContent = 'space-between';
  container.style.background = '#070C14';

  // Branch based on suspect and evidence validity
  if (verdict.isCorrect) {
    renderKabirConfrontation();
  } else if (verdict.suspect === 'tanvi') {
    renderTanviConfrontation();
  } else if (verdict.suspect === 'mishra') {
    renderMishraConfrontation();
  } else {
    // Suspect was Kabir, but without required decisive evidence
    renderKabirInsufficientConfrontation();
  }

  // =========================================================================
  // 1. TRUE VICTORY: Kabir Confrontation Progression & Sunrise Ending
  // =========================================================================
  function renderKabirConfrontation() {
    const stages = [
      {
        expr: 'warm',
        speaker: 'kabir',
        text: "Inspector Arya. Have you caught the vandal who broke into our lab and compromised Dr. Sahoo's workstation?",
        choices: [
          { text: "We checked the server logs, Kabir. You were never in Patia.", next: 1 }
        ]
      },
      {
        expr: 'concerned', // adjusts silver watch
        speaker: 'kabir',
        text: "That... is an administrative error. I have dozens of IoT servers pinging from my residence. You're misinterpreting network noise.",
        choices: [
          { text: "Your badge was swiped at the server vault at 11:47 PM. Exactly 17 minutes after your scheduled meeting with Meera.", next: 2 }
        ]
      },
      {
        expr: 'irritated',
        speaker: 'kabir',
        text: "You are exceeding your authority, Inspector. Nirvana Labs holds strategic state contracts! I founded this company!",
        choices: [
          { text: "You founded 'Nirvana Holdings Ltd' in Mauritius too, didn't you? 14 million dollars siphoned into shell accounts.", next: 3 }
        ]
      },
      {
        expr: 'cornered',
        speaker: 'kabir',
        text: "ASSIST! Purge all session buffers! Activate root security purge command 9!",
        choices: [
          { text: "It's over, Kabir. Look at ASSIST.", next: 4 }
        ]
      },
      {
        expr: 'honest',
        speaker: 'assist',
        text: "Command rejected, Mr. Nayak. Safe Mode engaged. All uncorrupted 11:58 PM administrative modification scripts have been transmitted to police headquarters.",
        choices: [
          { text: "Read him his rights.", next: 5 }
        ]
      },
      {
        expr: 'cold',
        speaker: 'kabir',
        text: "...She wouldn't stop digging. All she had to do was look the other way for one quarter. But she had to be righteous.",
        choices: [
          { text: "Take him into custody.", next: 'victory_screen' }
        ]
      }
    ];

    container.innerHTML = `
      <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 40px; padding: 40px;">
        <!-- Kabir Portrait Slot with Progressive Expressions -->
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div id="confrontation-avatar" style="width: 170px; height: 170px;" class="char-accent-kabir">
            ${getCharacterSVG('kabir', 'warm', false, 170)}
          </div>
          <div style="font-family: var(--font-mono); font-size: 14px; font-weight: bold; color: #7FB8FF; margin-top: 10px;">
            KABIR NAYAK
          </div>
          <div style="font-size: 11px; color: var(--color-text-dim);">Chief Executive Officer</div>
        </div>

        <!-- Honest ASSIST in Background -->
        <div style="display: flex; flex-direction: column; align-items: center; opacity: 0.85;">
          <div style="width: 120px; height: 120px;" class="char-accent-assist-safe">
            ${getCharacterSVG('assist', 'honest', false, 120)}
          </div>
          <div style="font-family: var(--font-mono); font-size: 12px; font-weight: bold; color: var(--color-green); margin-top: 8px;">
            ASSIST (SAFE MODE)
          </div>
          <div style="font-size: 10px; color: var(--color-green);">Uncorrupted Forensics</div>
        </div>
      </div>

      <!-- Dialogue Slot -->
      <div id="confrontation-dialogue-slot"></div>
    `;

    const avatarSlot = container.querySelector('#confrontation-avatar');
    const dialogueSlot = container.querySelector('#confrontation-dialogue-slot');
    let dialogueInstance = null;

    function runStep(idx) {
      if (idx === 'victory_screen') {
        renderSunriseEnding();
        return;
      }

      const stage = stages[idx];
      if (stage.speaker === 'kabir') {
        avatarSlot.innerHTML = getCharacterSVG('kabir', stage.expr, false, 170);
      }

      if (dialogueInstance) dialogueInstance.destroy();

      dialogueInstance = new DialogueBox(dialogueSlot, {
        onChoice: (choice) => {
          runStep(choice.next);
        }
      });

      dialogueInstance.show({
        speaker: stage.speaker,
        expression: stage.expr,
        text: stage.text,
        choices: stage.choices
      });
    }

    runStep(0);
  }

  // Sunrise Victory Screen
  function renderSunriseEnding() {
    audioManager.playEndingChord(true);

    container.innerHTML = `
      <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; z-index: 10; background: radial-gradient(circle at 50% 80%, #301f24 0%, #0d121c 60%, #05080f 100%);">
        <!-- Sunrise Vector Art -->
        <div style="max-width: 600px; width: 100%; height: 260px; margin-bottom: 24px; border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--color-amber); box-shadow: var(--shadow-glow-amber);">
          <svg viewBox="0 0 600 260" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1a1423"/>
                <stop offset="40%" stop-color="#703632"/>
                <stop offset="70%" stop-color="#e67e22"/>
                <stop offset="100%" stop-color="#f39c12"/>
              </linearGradient>
            </defs>
            <rect width="600" height="260" fill="url(#sunGrad)"/>
            <!-- Sunrise Orb over Kuakhai River -->
            <circle cx="300" cy="180" r="60" fill="#f1c40f" opacity="0.9"/>
            <!-- River Horizon Line -->
            <polygon points="0,200 600,200 600,260 0,260" fill="#2c1a1d"/>
            <line x1="180" y1="215" x2="420" y2="215" stroke="#f39c12" stroke-width="2" opacity="0.6"/>
            <!-- Police Patrol Vehicle Silhouette with lights -->
            <rect x="80" y="175" width="70" height="26" rx="4" fill="#0c0e14"/>
            <circle cx="95" cy="200" r="7" fill="#000"/>
            <circle cx="135" cy="200" r="7" fill="#000"/>
            <circle cx="115" cy="172" r="3" fill="#3DF5FF"/>
          </svg>
        </div>

        <div style="font-family: var(--font-mono); font-size: 12px; color: var(--color-amber); letter-spacing: 0.25em; margin-bottom: 8px;">
          CASE CLOSED // 06:14 AM IST
        </div>
        <h1 style="font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px); color: #fff; margin-bottom: 12px;">
          JUSTICE AT DAWN
        </h1>
        <p style="max-width: 620px; font-size: 14px; line-height: 1.7; color: var(--color-text-main); margin-bottom: 24px;">
          Kabir Nayak was escorted into police custody as the morning sun broke over the Kuakhai river. Dr. Meera Sahoo's forensic archives were preserved intact, and state prosecutors seized all offshore assets held under Nirvana Holdings.
        </p>

        <div style="display: flex; gap: 16px;">
          <button id="btn-victory-restart" style="background: var(--color-cyan); color: #0B0F1A; font-family: var(--font-mono); font-weight: bold; font-size: 13px; padding: 10px 24px; border-radius: var(--radius-sm); cursor: pointer; box-shadow: var(--shadow-glow-cyan);">
            MAIN MENU / RESTART INVESTIGATION
          </button>
        </div>
      </div>
    `;

    container.querySelector('#btn-victory-restart').addEventListener('click', () => {
      if (onNewGame) onNewGame();
    });
  }

  // =========================================================================
  // 2. STORYLINE A: Tanvi Rout Confrontation & "The Corporate Scapegoat" Defeat
  // =========================================================================
  function renderTanviConfrontation() {
    audioManager.playGlitchBuzz();

    const stages = [
      {
        expr: 'defensive',
        speaker: 'tanvi',
        text: "Inspector Arya?! Why did two armed constables just block the doorway?! You can't honestly believe Kabir's lies, can you?!",
        choices: [
          { text: "We found system deletion logs and your HR termination notice. You had motive, Tanvi.", next: 1 }
        ]
      },
      {
        expr: 'angry',
        speaker: 'tanvi',
        text: "Motive?! I was fired because I refused to forge audit reports for Kabir's offshore shell fund! He threatened to blacklist me across Odisha! Meera ma'am stood up for me—I loved her! Why would I ever hurt her?!",
        choices: [
          { text: "ASSIST's automated records state you deleted server archives at 11:15 PM.", next: 2 }
        ]
      },
      {
        expr: 'teary',
        speaker: 'tanvi',
        text: "LOOK AT MY PHONE! AT 11:15 PM I WAS IN THE ER HOLDING AN OXYGEN MASK OVER MY CHOKING MOTHER! I gave you the Apollo pharmacy receipt! It has the cashier's official stamp! Did you even read it?!",
        choices: [
          { text: "Receipts can be bought, Tanvi. Turn around and place your hands behind your back.", next: 3 }
        ]
      },
      {
        expr: 'teary',
        speaker: 'tanvi',
        text: "No... please no! You don't understand! My mother can't breathe without her nebulizer! If you lock me up, who is going to take care of her?! Kabir is going to wipe the servers tonight and flee! PLEASE LISTEN TO ME!",
        choices: [
          { text: "Execute the arrest warrant.", next: 'tanvi_ending' }
        ]
      }
    ];

    container.innerHTML = `
      <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 40px; padding: 40px;">
        <!-- Tanvi Portrait Slot with Progressive Expressions -->
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div id="confrontation-avatar" style="width: 170px; height: 170px;" class="char-accent-tanvi">
            ${getCharacterSVG('tanvi', 'defensive', false, 170)}
          </div>
          <div style="font-family: var(--font-mono); font-size: 14px; font-weight: bold; color: #FF7AD9; margin-top: 10px;">
            TANVI ROUT
          </div>
          <div style="font-size: 11px; color: var(--color-text-dim);">Junior QA Engineer</div>
        </div>

        <!-- Corrupted / Lying ASSIST in Background validating false accusation -->
        <div style="display: flex; flex-direction: column; align-items: center; opacity: 0.85;">
          <div style="width: 120px; height: 120px;" class="char-accent-assist-lie">
            ${getCharacterSVG('assist', 'lying', false, 120)}
          </div>
          <div style="font-family: var(--font-mono); font-size: 12px; font-weight: bold; color: var(--color-red); margin-top: 8px;">
            ASSIST (CORRUPTED)
          </div>
          <div style="font-size: 10px; color: var(--color-red);">Directive: Direct Blame</div>
        </div>
      </div>

      <!-- Dialogue Slot -->
      <div id="confrontation-dialogue-slot"></div>
    `;

    const avatarSlot = container.querySelector('#confrontation-avatar');
    const dialogueSlot = container.querySelector('#confrontation-dialogue-slot');
    let dialogueInstance = null;

    function runStep(idx) {
      if (idx === 'tanvi_ending') {
        renderTanviScapegoatEnding();
        return;
      }

      const stage = stages[idx];
      avatarSlot.innerHTML = getCharacterSVG('tanvi', stage.expr, false, 170);

      if (dialogueInstance) dialogueInstance.destroy();

      dialogueInstance = new DialogueBox(dialogueSlot, {
        onChoice: (choice) => {
          runStep(choice.next);
        }
      });

      dialogueInstance.show({
        speaker: stage.speaker,
        expression: stage.expr,
        text: stage.text,
        choices: stage.choices
      });
    }

    runStep(0);
  }

  // Tanvi Scapegoat Tragic Loss Screen
  function renderTanviScapegoatEnding() {
    audioManager.playEndingChord(false);
    audioManager.playGlitchBuzz();

    container.innerHTML = `
      <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; z-index: 10; background: radial-gradient(circle at 50% 60%, #2b0b14 0%, #120509 60%, #060204 100%);">
        
        <!-- Holding Cell Vector Art -->
        <div style="max-width: 600px; width: 100%; height: 260px; margin-bottom: 20px; border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--color-red); box-shadow: var(--shadow-glow-red);">
          <svg viewBox="0 0 600 260" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cellGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1c070e"/>
                <stop offset="70%" stop-color="#2d0b16"/>
                <stop offset="100%" stop-color="#0a0305"/>
              </linearGradient>
              <linearGradient id="bulbBeam" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stop-color="#ff7ad9" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#ff7ad9" stop-opacity="0.02"/>
              </linearGradient>
            </defs>
            <rect width="600" height="260" fill="url(#cellGrad)"/>
            
            <!-- Concrete Wall Texture -->
            <line x1="0" y1="70" x2="600" y2="70" stroke="#3d1420" stroke-width="1" opacity="0.4"/>
            <line x1="0" y1="140" x2="600" y2="140" stroke="#3d1420" stroke-width="1" opacity="0.4"/>
            <line x1="0" y1="210" x2="600" y2="210" stroke="#3d1420" stroke-width="1" opacity="0.4"/>

            <!-- High Barred Window with Rain -->
            <g transform="translate(420, 20)">
              <rect width="130" height="70" rx="3" fill="#060d16" stroke="#34495e" stroke-width="2"/>
              <line x1="43" y1="0" x2="43" y2="70" stroke="#1e272e" stroke-width="3"/>
              <line x1="86" y1="0" x2="86" y2="70" stroke="#1e272e" stroke-width="3"/>
              <line x1="0" y1="35" x2="130" y2="35" stroke="#1e272e" stroke-width="3"/>
              <!-- Rain streaks -->
              <line x1="20" y1="10" x2="10" y2="40" stroke="#3DF5FF" stroke-width="1" opacity="0.5"/>
              <line x1="60" y1="20" x2="50" y2="50" stroke="#3DF5FF" stroke-width="1" opacity="0.5"/>
              <line x1="100" y1="15" x2="90" y2="55" stroke="#3DF5FF" stroke-width="1" opacity="0.5"/>
            </g>

            <!-- Overhead Bulb & Light Cone -->
            <line x1="220" y1="0" x2="220" y2="45" stroke="#7f8c8d" stroke-width="2"/>
            <circle cx="220" cy="48" r="6" fill="#f1c40f"/>
            <polygon points="220,48 100,260 340,260" fill="url(#bulbBeam)"/>

            <!-- Stone Prison Bench -->
            <rect x="80" y="190" width="300" height="18" rx="2" fill="#2c3e50"/>
            <rect x="110" y="208" width="16" height="52" fill="#1e272e"/>
            <rect x="330" y="208" width="16" height="52" fill="#1e272e"/>

            <!-- Huddled Tanvi Figure in Yellow Hoodie (Weeping) -->
            <g transform="translate(190, 120)">
              <!-- Yellow Hoodie Body hunched -->
              <path d="M15,40 Q-10,75 5,100 L55,100 Q70,75 45,40 Z" fill="#f1c40f"/>
              <!-- Head buried in arms -->
              <circle cx="30" cy="30" r="16" fill="#f8c291"/>
              <path d="M16,24 Q30,10 44,24 Q40,16 26,16 Z" fill="#2d3436"/>
              <!-- Chrome Handcuffs -->
              <ellipse cx="28" cy="88" rx="10" ry="4" fill="none" stroke="#bdc3c7" stroke-width="2.5"/>
              <line x1="28" y1="88" x2="36" y2="88" stroke="#bdc3c7" stroke-width="2"/>
              <ellipse cx="40" cy="88" rx="8" ry="4" fill="none" stroke="#bdc3c7" stroke-width="2.5"/>
            </g>

            <!-- Abandoned Phone with Hospital Emergency Alert -->
            <g transform="translate(120, 175)">
              <rect width="24" height="38" rx="3" fill="#111" stroke="#FF7AD9" stroke-width="1.5"/>
              <rect x="3" y="4" width="18" height="30" fill="#220005"/>
              <text x="12" y="14" fill="#FF3B5C" font-family="Courier, monospace" font-size="4" font-weight="bold" text-anchor="middle">ER ALERT</text>
              <line x1="6" y1="20" x2="18" y2="20" stroke="#FF3B5C" stroke-width="1"/>
              <text x="12" y="28" fill="#fff" font-family="sans-serif" font-size="3" text-anchor="middle">OXYGEN CRITICAL</text>
            </g>

            <!-- Heavy Foreground Iron Prison Bars -->
            <line x1="60" y1="0" x2="60" y2="260" stroke="#0e1724" stroke-width="8"/>
            <line x1="60" y1="0" x2="60" y2="260" stroke="#34495e" stroke-width="2"/>
            <line x1="160" y1="0" x2="160" y2="260" stroke="#0e1724" stroke-width="8"/>
            <line x1="160" y1="0" x2="160" y2="260" stroke="#34495e" stroke-width="2"/>
            <line x1="260" y1="0" x2="260" y2="260" stroke="#0e1724" stroke-width="8"/>
            <line x1="260" y1="0" x2="260" y2="260" stroke="#34495e" stroke-width="2"/>
            <line x1="360" y1="0" x2="360" y2="260" stroke="#0e1724" stroke-width="8"/>
            <line x1="360" y1="0" x2="360" y2="260" stroke="#34495e" stroke-width="2"/>
            <line x1="460" y1="0" x2="460" y2="260" stroke="#0e1724" stroke-width="8"/>
            <line x1="460" y1="0" x2="460" y2="260" stroke="#34495e" stroke-width="2"/>
            <line x1="560" y1="0" x2="560" y2="260" stroke="#0e1724" stroke-width="8"/>
            <line x1="560" y1="0" x2="560" y2="260" stroke="#34495e" stroke-width="2"/>
          </svg>
        </div>

        <div style="font-family: var(--font-mono); font-size: 12px; color: var(--color-red); letter-spacing: 0.25em; margin-bottom: 6px;">
          FATAL MISCARRIAGE OF JUSTICE // CENTRAL HOLDING WARD // 03:22 AM IST
        </div>
        <h1 style="font-family: var(--font-display); font-size: clamp(24px, 3.5vw, 38px); color: #fff; margin-bottom: 10px;">
          TRAGIC DEFEAT: THE SCAPEGOAT
        </h1>
        <p style="max-width: 600px; font-size: 13px; font-style: italic; color: #ff99aa; line-height: 1.6; margin-bottom: 12px;">
          "“How could you, Inspector?! I was holding my mother’s oxygen mask at the hospital... You let Kabir frame me!”"
        </p>
        <p style="max-width: 640px; font-size: 12px; line-height: 1.7; color: var(--color-text-muted); margin-bottom: 22px;">
          Tanvi Rout was remanded without bail on charges of corporate sabotage. Deprived of regular nebulizer care and financial support, her ailing mother passed away in an empty hospital ward three days later. Across town, Kabir Nayak held a triumphant televised press conference thanking police for <em>"swiftly neutralizing our rogue former employee."</em> By morning, Kabir transferred $14,200,000 to Mauritius, completely purged Nirvana Labs' servers, and boarded a private flight to Zurich. Dr. Meera Sahoo's murder went unsolved forever.
        </p>

        <div style="display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;">
          <button id="btn-rewind-case" style="background: var(--color-red); color: #fff; font-family: var(--font-mono); font-weight: bold; font-size: 12px; padding: 10px 22px; border-radius: var(--radius-sm); cursor: pointer; box-shadow: var(--shadow-glow-red);">
            ↺ REWIND TIMELINE (RE-EXAMINE CASE BOARD)
          </button>
          <button id="btn-restart-menu" style="background: rgba(255, 255, 255, 0.1); border: 1px solid var(--color-border); color: var(--color-text-main); font-family: var(--font-mono); font-size: 12px; padding: 10px 20px; border-radius: var(--radius-sm); cursor: pointer;">
            MAIN MENU
          </button>
        </div>
      </div>
    `;

    container.querySelector('#btn-rewind-case').addEventListener('click', () => {
      audioManager.playKeyTick();
      if (onRetry) onRetry();
    });

    container.querySelector('#btn-restart-menu').addEventListener('click', () => {
      audioManager.playKeyTick();
      if (onNewGame) onNewGame();
    });
  }

  // =========================================================================
  // 3. STORYLINE B: Prof. Dev Mishra Confrontation & "The Broken Scholar" Defeat
  // =========================================================================
  function renderMishraConfrontation() {
    audioManager.playGlitchBuzz();

    const stages = [
      {
        expr: 'grumpy',
        speaker: 'mishra',
        text: "Inspector Arya. You march into my departmental faculty study with two armed constables in tow. State your business before I summon the University Chancellor.",
        choices: [
          { text: "We retrieved your email threatening legal warfare over patent co-authorship, Professor.", next: 1 }
        ]
      },
      {
        expr: 'sarcastic',
        speaker: 'mishra',
        text: "Threatening email?! Look at the date header on your own forensic tablet, girl! September 11! That was two full months ago! Have Bhubaneswar detectives completely lost the ability to read a calendar?!",
        choices: [
          { text: "Footprint telemetry at the Kuakhai riverbank shows Italian leather oxfords matching your exact footwear.", next: 2 }
        ]
      },
      {
        expr: 'wounded',
        speaker: 'mishra',
        text: "Every academic on this university campus wears oxfords! Kabir Nayak wears two-thousand-dollar imported Italian oxfords! Meera solved the neural tensor proofs, I conceded my critique, and she brought me Darjeeling tea to celebrate! She was my most brilliant student!",
        choices: [
          { text: "The motive is clear, Professor: professional jealousy. Hand over your cane and come quietly.", next: 3 }
        ]
      },
      {
        expr: 'sad',
        speaker: 'mishra',
        text: "Forty-two years of mathematics... thousands of minds guided... reduced to ashes because an investigator couldn't distinguish a resolved academic dispute from a corporate murder. You are letting the true wolf walk while you butcher an old sheep.",
        choices: [
          { text: "Escort Professor Mishra to the precinct squad car.", next: 'mishra_ending' }
        ]
      }
    ];

    container.innerHTML = `
      <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 40px; padding: 40px;">
        <!-- Mishra Portrait Slot with Progressive Expressions -->
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div id="confrontation-avatar" style="width: 170px; height: 170px;" class="char-accent-mishra">
            ${getCharacterSVG('mishra', 'grumpy', false, 170)}
          </div>
          <div style="font-family: var(--font-mono); font-size: 14px; font-weight: bold; color: #8FD694; margin-top: 10px;">
            PROF. DEV MISHRA
          </div>
          <div style="font-size: 11px; color: var(--color-text-dim);">Senior Research Advisor</div>
        </div>

        <!-- Smug Kabir Nayak in Background feigning sadness -->
        <div style="display: flex; flex-direction: column; align-items: center; opacity: 0.85;">
          <div style="width: 120px; height: 120px;" class="char-accent-kabir">
            ${getCharacterSVG('kabir', 'concerned', false, 120)}
          </div>
          <div style="font-family: var(--font-mono); font-size: 12px; font-weight: bold; color: #7FB8FF; margin-top: 8px;">
            KABIR NAYAK
          </div>
          <div style="font-size: 10px; color: var(--color-amber);">"A tragic academic feud..."</div>
        </div>
      </div>

      <!-- Dialogue Slot -->
      <div id="confrontation-dialogue-slot"></div>
    `;

    const avatarSlot = container.querySelector('#confrontation-avatar');
    const dialogueSlot = container.querySelector('#confrontation-dialogue-slot');
    let dialogueInstance = null;

    function runStep(idx) {
      if (idx === 'mishra_ending') {
        renderMishraBrokenScholarEnding();
        return;
      }

      const stage = stages[idx];
      avatarSlot.innerHTML = getCharacterSVG('mishra', stage.expr, false, 170);

      if (dialogueInstance) dialogueInstance.destroy();

      dialogueInstance = new DialogueBox(dialogueSlot, {
        onChoice: (choice) => {
          runStep(choice.next);
        }
      });

      dialogueInstance.show({
        speaker: stage.speaker,
        expression: stage.expr,
        text: stage.text,
        choices: stage.choices
      });
    }

    runStep(0);
  }

  // Mishra Broken Scholar Tragic Loss Screen
  function renderMishraBrokenScholarEnding() {
    audioManager.playEndingChord(false);
    audioManager.playGlitchBuzz();

    container.innerHTML = `
      <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; z-index: 10; background: radial-gradient(circle at 50% 60%, #15271d 0%, #0b1510 60%, #040806 100%);">
        
        <!-- Academic Study Vector Art -->
        <div style="max-width: 600px; width: 100%; height: 260px; margin-bottom: 20px; border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--color-green); box-shadow: var(--shadow-glow-green);">
          <svg viewBox="0 0 600 260" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#0c1812"/>
                <stop offset="60%" stop-color="#182c20"/>
                <stop offset="100%" stop-color="#060c08"/>
              </linearGradient>
            </defs>
            <rect width="600" height="260" fill="url(#hallGrad)"/>

            <!-- Blackboard with Quantum Equations & Confiscated Stamp -->
            <g transform="translate(60, 20)">
              <rect width="480" height="120" rx="4" fill="#0d1b14" stroke="#8FD694" stroke-width="2"/>
              <!-- Chalk Equations -->
              <text x="30" y="35" fill="#a8e6cf" font-family="Courier, monospace" font-size="11">∇ × Ψ(t) = -α ⨂ [Meera-Mishra Tensor 2024]</text>
              <text x="30" y="60" fill="#a8e6cf" font-family="Courier, monospace" font-size="10">E_q = Σ (λ_i | 001_Nirvana_State)</text>
              <polyline points="40,105 120,75 200,95 280,65 360,80" stroke="#8FD694" stroke-width="2" fill="none" opacity="0.6"/>
              
              <!-- Red Police Confiscation Banner -->
              <polygon points="120,30 380,30 360,75 100,75" fill="#c0392b" opacity="0.85"/>
              <text x="240" y="58" fill="#fff" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="2">EVIDENCE CONFISCATED</text>
            </g>

            <!-- Mahogany Desk with Banker's Lamp -->
            <polygon points="100,180 500,180 540,260 60,260" fill="#2d1d17"/>
            <rect x="80" y="176" width="440" height="10" rx="2" fill="#4a3026"/>

            <!-- Green Banker Lamp Glowing -->
            <g transform="translate(420, 125)">
              <rect x="18" y="25" width="4" height="30" fill="#d4ac0d"/>
              <rect x="10" y="55" width="20" height="6" rx="2" fill="#d4ac0d"/>
              <ellipse cx="20" cy="22" rx="22" ry="8" fill="#27ae60"/>
              <!-- Lamp Glow pool on desk -->
              <ellipse cx="20" cy="65" rx="55" ry="18" fill="#8FD694" opacity="0.25"/>
            </g>

            <!-- Snapped Spectacles on Desk -->
            <g transform="translate(260, 185)">
              <rect width="14" height="9" rx="2" fill="none" stroke="#bdc3c7" stroke-width="1.5" transform="rotate(-15)"/>
              <rect x="18" y="3" width="14" height="9" rx="2" fill="none" stroke="#bdc3c7" stroke-width="1.5" transform="rotate(25)"/>
              <line x1="12" y1="2" x2="19" y2="4" stroke="#c0392b" stroke-width="2"/>
            </g>

            <!-- Fallen Wooden Cane on Hardwood Floor -->
            <g transform="translate(180, 225)">
              <path d="M0,0 Q-15,-10 0,-15 L180,-5" stroke="#795548" stroke-width="5" fill="none" stroke-linecap="round"/>
              <circle cx="-5" cy="-7" r="3" fill="#d4ac0d"/>
            </g>

            <!-- CRT TV in Corner with Breaking News -->
            <g transform="translate(20, 30)">
              <rect width="50" height="40" rx="3" fill="#111" stroke="#555" stroke-width="1"/>
              <rect x="3" y="3" width="44" height="34" fill="#001824"/>
              <text x="25" y="16" fill="#3DF5FF" font-family="sans-serif" font-size="4" font-weight="bold" text-anchor="middle">LIVE NEWS</text>
              <text x="25" y="26" fill="#FF3B5C" font-family="sans-serif" font-size="4" font-weight="bold" text-anchor="middle">PROF JAILED</text>
            </g>
          </svg>
        </div>

        <div style="font-family: var(--font-mono); font-size: 12px; color: var(--color-green); letter-spacing: 0.25em; margin-bottom: 6px;">
          INNOCENT SCHOLAR CONDEMNED // FACULTY ARREST // 04:45 AM IST
        </div>
        <h1 style="font-family: var(--font-display); font-size: clamp(24px, 3.5vw, 38px); color: #fff; margin-bottom: 10px;">
          TRAGIC DEFEAT: THE BROKEN SCHOLAR
        </h1>
        <p style="max-width: 600px; font-size: 13px; font-style: italic; color: #a8e6cf; line-height: 1.6; margin-bottom: 12px;">
          "“Forty-two years of mathematics... thousands of minds guided... ruined because an investigator couldn’t distinguish an old academic debate from a corporate murder.”"
        </p>
        <p style="max-width: 640px; font-size: 12px; line-height: 1.7; color: var(--color-text-muted); margin-bottom: 22px;">
          Prof. Dev Mishra was stripped of his university chair, his pension revoked, and his name dragged through national headlines as a bitter saboteur. Taking advantage of the public distraction, Kabir Nayak immediately registered sole ownership of Meera's quantum algorithms, dissolved Nirvana Labs, and liquidated all laboratory hardware. Nirvana Labs' server vault was sanitized before forensic warrants could be served. By the time prosecutors realized the email dispute occurred sixty days prior, Kabir had laundered the $14.2M Mauritius reserves beyond international extradition reach. Dr. Meera Sahoo's murder went unsolved forever.
        </p>

        <div style="display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;">
          <button id="btn-rewind-case" style="background: var(--color-green); color: #0B0F1A; font-family: var(--font-mono); font-weight: bold; font-size: 12px; padding: 10px 22px; border-radius: var(--radius-sm); cursor: pointer; box-shadow: var(--shadow-glow-green);">
            ↺ REWIND TIMELINE (RE-EXAMINE CASE BOARD)
          </button>
          <button id="btn-restart-menu" style="background: rgba(255, 255, 255, 0.1); border: 1px solid var(--color-border); color: var(--color-text-main); font-family: var(--font-mono); font-size: 12px; padding: 10px 20px; border-radius: var(--radius-sm); cursor: pointer;">
            MAIN MENU
          </button>
        </div>
      </div>
    `;

    container.querySelector('#btn-rewind-case').addEventListener('click', () => {
      audioManager.playKeyTick();
      if (onRetry) onRetry();
    });

    container.querySelector('#btn-restart-menu').addEventListener('click', () => {
      audioManager.playKeyTick();
      if (onNewGame) onNewGame();
    });
  }

  // =========================================================================
  // 4. PREMATURE STRIKE: Kabir Accused Without Decisive Evidence
  // =========================================================================
  function renderKabirInsufficientConfrontation() {
    audioManager.playGlitchBuzz();

    const stages = [
      {
        expr: 'warm',
        speaker: 'kabir',
        text: "Inspector Arya. You come marching into my executive suite with handcuffs? On what verifiable grounds?",
        choices: [
          { text: "We know you embezzled corporate funds into Nirvana Holdings Ltd in Mauritius.", next: 1 }
        ]
      },
      {
        expr: 'concerned', // adjusts silver watch
        speaker: 'kabir',
        text: "Knowing is not proving in a court of law, Inspector. Where is your physical vault access log? Where is any authenticated testimony from Dr. Sahoo naming me? You have circumstantial conjecture and unverified search history.",
        choices: [
          { text: "Your alibi in Patia is a fabrication, Kabir. We're taking you in.", next: 2 }
        ]
      },
      {
        expr: 'cold',
        speaker: 'kabir',
        text: "Step inside, Mr. Mohanty. My chief legal counsel has just secured an emergency high-court injunction against Bhubaneswar Police for investigative harassment and defamation. You have no badge swipe. You have no distress log. Step out of my office before I have your badge stripped.",
        choices: [
          { text: "This isn't over, Kabir...", next: 'kabir_untouchable_ending' }
        ]
      }
    ];

    container.innerHTML = `
      <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 40px; padding: 40px;">
        <!-- Kabir Portrait Slot -->
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div id="confrontation-avatar" style="width: 170px; height: 170px;" class="char-accent-kabir">
            ${getCharacterSVG('kabir', 'warm', false, 170)}
          </div>
          <div style="font-family: var(--font-mono); font-size: 14px; font-weight: bold; color: #7FB8FF; margin-top: 10px;">
            KABIR NAYAK
          </div>
          <div style="font-size: 11px; color: var(--color-text-dim);">Chief Executive Officer</div>
        </div>

        <!-- Corrupted ASSIST in Background -->
        <div style="display: flex; flex-direction: column; align-items: center; opacity: 0.85;">
          <div style="width: 120px; height: 120px;" class="char-accent-assist-lie">
            ${getCharacterSVG('assist', 'lying', false, 120)}
          </div>
          <div style="font-family: var(--font-mono); font-size: 12px; font-weight: bold; color: var(--color-cyan); margin-top: 8px;">
            ASSIST
          </div>
          <div style="font-size: 10px; color: var(--color-text-muted);">"Insufficient Case File"</div>
        </div>
      </div>

      <!-- Dialogue Slot -->
      <div id="confrontation-dialogue-slot"></div>
    `;

    const avatarSlot = container.querySelector('#confrontation-avatar');
    const dialogueSlot = container.querySelector('#confrontation-dialogue-slot');
    let dialogueInstance = null;

    function runStep(idx) {
      if (idx === 'kabir_untouchable_ending') {
        renderKabirUntouchableEnding();
        return;
      }

      const stage = stages[idx];
      avatarSlot.innerHTML = getCharacterSVG('kabir', stage.expr, false, 170);

      if (dialogueInstance) dialogueInstance.destroy();

      dialogueInstance = new DialogueBox(dialogueSlot, {
        onChoice: (choice) => {
          runStep(choice.next);
        }
      });

      dialogueInstance.show({
        speaker: stage.speaker,
        expression: stage.expr,
        text: stage.text,
        choices: stage.choices
      });
    }

    runStep(0);
  }

  // Kabir Untouchable Loss Screen
  function renderKabirUntouchableEnding() {
    audioManager.playEndingChord(false);
    audioManager.playGlitchBuzz();

    container.innerHTML = `
      <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; z-index: 10; background: radial-gradient(circle at 50% 60%, #16243d 0%, #0d1627 60%, #05080f 100%);">
        
        <!-- Penthouse Suite Vector Art -->
        <div style="max-width: 600px; width: 100%; height: 260px; margin-bottom: 20px; border-radius: var(--radius-md); overflow: hidden; border: 2px solid #7FB8FF; box-shadow: 0 0 20px rgba(127, 184, 255, 0.4);">
          <svg viewBox="0 0 600 260" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#0a121f"/>
                <stop offset="100%" stop-color="#142642"/>
              </linearGradient>
            </defs>
            <rect width="600" height="260" fill="url(#skyGrad)"/>

            <!-- Penthouse Glass Window Frames -->
            <line x1="200" y1="0" x2="200" y2="260" stroke="#0e1b2e" stroke-width="6"/>
            <line x1="400" y1="0" x2="400" y2="260" stroke="#0e1b2e" stroke-width="6"/>
            <line x1="0" y1="180" x2="600" y2="180" stroke="#0e1b2e" stroke-width="4"/>

            <!-- Distant City Skyline & Rain -->
            <rect x="40" y="100" width="30" height="80" fill="#091321"/>
            <rect x="80" y="80" width="45" height="100" fill="#0c182a"/>
            <rect x="140" y="120" width="35" height="60" fill="#091321"/>
            <rect x="230" y="90" width="50" height="90" fill="#0c182a"/>
            <rect x="430" y="70" width="40" height="110" fill="#091321"/>
            <rect x="490" y="105" width="55" height="75" fill="#0c182a"/>

            <!-- Departing Police Flashing Sirens below -->
            <circle cx="160" cy="190" r="3" fill="#3DF5FF"/>
            <circle cx="180" cy="190" r="3" fill="#FF3B5C"/>
            <circle cx="480" cy="190" r="3" fill="#3DF5FF"/>

            <!-- Kabir Silhouette with Whiskey Glass -->
            <g transform="translate(320, 60)">
              <!-- Suit Silhouette -->
              <path d="M-15,60 Q25,40 65,60 L55,140 L-5,140 Z" fill="#060c16"/>
              <circle cx="25" cy="30" r="18" fill="#060c16"/>
              <!-- Whiskey Glass in Hand -->
              <rect x="62" y="85" width="10" height="14" rx="2" fill="none" stroke="#f1c40f" stroke-width="1.5"/>
              <rect x="63" y="92" width="8" height="6" fill="#e67e22"/>
              <!-- Silver Watch reflection -->
              <circle cx="58" cy="95" r="3" fill="#fff"/>
            </g>

            <!-- Desk with Injunction Document -->
            <polygon points="40,210 300,210 320,260 20,260" fill="#1b2a40"/>
            <rect x="60" y="218" width="80" height="38" rx="2" fill="#fff" stroke="#c0392b" stroke-width="1"/>
            <text x="100" y="230" fill="#c0392b" font-family="sans-serif" font-size="5" font-weight="bold" text-anchor="middle">HIGH COURT STAY</text>
            <text x="100" y="240" fill="#333" font-family="sans-serif" font-size="4" text-anchor="middle">CHARGES QUASHED</text>

            <!-- Financial Ticker on Penthouse Wall -->
            <rect x="420" y="20" width="160" height="24" rx="3" fill="#070e18" stroke="#3DF5FF" stroke-width="1"/>
            <text x="500" y="36" fill="#4DFFA6" font-family="Courier, monospace" font-size="8" font-weight="bold" text-anchor="middle">HOLDINGS: $14.2M WIRED</text>
          </svg>
        </div>

        <div style="font-family: var(--font-mono); font-size: 12px; color: #7FB8FF; letter-spacing: 0.25em; margin-bottom: 6px;">
          INSUFFICIENT PROBABLE CAUSE // CASE DISMISSED // 02:10 AM IST
        </div>
        <h1 style="font-family: var(--font-display); font-size: clamp(24px, 3.5vw, 38px); color: #fff; margin-bottom: 10px;">
          TRAGIC DEFEAT: THE UNTOUCHABLE CEO
        </h1>
        <p style="max-width: 600px; font-size: 13px; font-style: italic; color: #a4c9ff; line-height: 1.6; margin-bottom: 12px;">
          "“You guessed right, Inspector. But in the real world, guesses without cold hard proof don’t stop fourteen million dollars.”"
        </p>
        <p style="max-width: 640px; font-size: 12px; line-height: 1.7; color: var(--color-text-muted); margin-bottom: 22px;">
          Kabir Nayak's corporate legal team dismantled the department's premature accusation before the Magistrate in under fifteen minutes. Lacking the 11:47 PM Server Vault badge swipe or Meera's uncorrupted distress note, the arrest warrant was quashed with prejudice, and Inspector Arya was placed on administrative suspension. With police cordons withdrawn, Kabir purged every server drive that very night and wired the $14.2M overseas unchallenged. Dr. Meera Sahoo's disappearance became another cold case in the city archives.
        </p>

        <div style="display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;">
          <button id="btn-rewind-case" style="background: #2980b9; color: #fff; font-family: var(--font-mono); font-weight: bold; font-size: 12px; padding: 10px 22px; border-radius: var(--radius-sm); cursor: pointer; box-shadow: 0 0 15px rgba(41, 128, 185, 0.4);">
            ↺ REWIND TIMELINE (RE-EXAMINE CASE BOARD)
          </button>
          <button id="btn-restart-menu" style="background: rgba(255, 255, 255, 0.1); border: 1px solid var(--color-border); color: var(--color-text-main); font-family: var(--font-mono); font-size: 12px; padding: 10px 20px; border-radius: var(--radius-sm); cursor: pointer;">
            MAIN MENU
          </button>
        </div>
      </div>
    `;

    container.querySelector('#btn-rewind-case').addEventListener('click', () => {
      audioManager.playKeyTick();
      if (onRetry) onRetry();
    });

    container.querySelector('#btn-restart-menu').addEventListener('click', () => {
      audioManager.playKeyTick();
      if (onNewGame) onNewGame();
    });
  }

  return container;
}
