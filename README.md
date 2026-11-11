# 🕵️‍♂️ LAST LOGIN

> **A psychological neo-noir cyber-thriller game played inside a compromised operating system.**  
> Built from scratch with pure native web standards. Zero external game engine bloat.

---

## 🎬 Narrative Premise

Midnight along the misty riverbank in Bhubaneswar, Odisha. A police patrol discovers an abandoned vehicle with its engine humming. On the passenger seat is an unlocked laptop running **NirvanaOS**. 

The chief quantum architect of Nirvana Labs, **Dr. Meera Sahoo**, has vanished without a trace.

You step into the trench coat of **Inspector Arya**. To uncover what happened to Dr. Meera Sahoo, you must dive into her compromised workstation, extract digital forensic evidence, and navigate a deceptive cyber mystery where the system's own AI assistant has been weaponized against you.

---

## 🎮 Core Game Mechanics

### 1. 🤖 The Deception Engine (Cross-Examining the AI)
- Unlike traditional detective games where computer assistants are trusted sources of truth, **ASSIST** has been hacked via root administrative access to plant red herrings and frame an innocent coworker.
- ASSIST features dynamic visual telemetry (*Friendly &rarr; Thinking &rarr; Lying &rarr; Panicking &rarr; Safe Mode*).
- When ASSIST makes false claims, present collected evidence to expose the contradictions.
- Flagging all 3 lies triggers a **Critical Logic Overflow**, unlocking **Safe Mode** where the uncorrupted AI turns into your whistleblower and provides the vault passcode.

### 2. 💻 Simulated Operating System (NirvanaOS)
- A fully functional virtual desktop environment with real-time multitasking:
  - **Files (NirvanaFS)**: Directory exploration, file renaming, hidden system logs, and encrypted vaults.
  - **Chat (NirvanaWire)**: Timestamped employee messenger archives and image attachments.
  - **Mail (NirvanaMail)**: Archived correspondence and academic dispute records.
  - **Browser (QuantumNet)**: Cached intranet search histories with active AI redirection mechanics.
  - **Case Board**: Interactive evidence wall mapping clues to suspects and unlocking memory flashbacks.

### 3. 🔍 Active Digital Forensics
- **Corrupted Buffer Recovery**: Rename `meera_notes.tmp` &rarr; `meera_notes.txt` to recover volatile memory logs.
- **Timestamp Cross-Referencing**: Break false alibis by cross-checking timestamps across chat receipts, badge logs, and emails.
- **Log-Derived Passcodes**: Deduce the 4-digit security PIN (`1147`) from system entrance badge swipes.

### 4. 🔀 "Tab Hopper" AI Sabotage
- While investigating sensitive offshore search history, ASSIST attempts to forcefully divert you away from incriminating corporate registries. You must override its redirection to secure the evidence.

### 5. ⚖️ Interactive Accusation & True Ending
- Present your chain of physical evidence against the true culprit in an intense branching dialogue confrontation to secure a full confession and reach the True Ending.

---

## 🕹️ Controls & Accessibility

- **Advance / Interact**: `[Enter]` or `[Space]`
- **Dialogue Choice Selection**: Number keys `[1]`, `[2]`, `[3]` or mouse click
- **Window Management**: Click icons to open, drag title bars to move, `_` minimize, `□` maximize, `✕` close
- **Settings & Audio Toggle**: Accessible exclusively inside the **Game Options & Settings** menu
- **Reduced Motion**: Disables camera zooms, heavy strobe, and CRT scanlines for motion sensitivity

---

## 🛠️ Game Engine Tech Stack (Engine View)

Instead of relying on heavy 150MB+ WebGL game engine exports (such as Unity or Unreal) or bloated UI frameworks, **LAST LOGIN** was engineered from scratch using pure native web hardware APIs:

| Subsystem | Technology | Architectural Highlight |
| :--- | :--- | :--- |
| **Rendering Pipeline** | **Canvas 2D API + Vector SVG** | Hardware-accelerated 60 FPS particle engine for volumetric fog and dust motes; inline SVG text masking for 4K crisp double-exposure title art without raster scaling blur. |
| **Sound Synthesis Engine** | **Native Web Audio API** | Procedural sound generation (sub-bass binaural oscillators at 55Hz–110Hz, LFO sweeps, mechanical switch transients, and per-character typewriter voice formant pitch modulation). Zero audio middleware required. |
| **Virtual OS & State** | **Vanilla ES6+ Modules & Pub/Sub** | Decoupled event-driven `GameState` store with automated JSON serialization and instant LocalStorage autosaving. |
| **Window Manager** | **Modern CSS3 (Tokens, Flexbox, Grid)** | Dynamic z-index layering, glassmorphism backdrop-filters, and retro phosphor CRT scanline shaders. |
| **Performance & Footprint**| **Zero Dependencies** | **Under 5MB total footprint**, boots in under 50ms, 100% offline-ready, and silky smooth 60+ FPS on any machine. |

---

## ⚡ Quick Start & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saswat132004/gameforge.git
   cd gameforge
   ```

2. **Launch standard local server**:
   ```bash
   # Python (Built-in standard server)
   python -m http.server 3000
   ```
   *Or with Node:*
   ```bash
   npx serve .
   ```

3. **Play**:
   Open [http://localhost:3000](http://localhost:3000) in any modern web browser.

---

## 📖 Walkthrough & Master Solution

For complete details on solving all 6 evidence clues, cracking the vault PIN, and exposing the killer, consult the master guide:
👉 **[`play.md`](./play.md)**

---

## 📜 Canonical Case Dossier

| Timestamp | Event Record | Forensic Meaning |
| :--- | :--- | :--- |
| **11:02 PM** | Meera queries "Nirvana Holdings shell company" | Discovers $14M offshore embezzlement |
| **11:15 PM** | Tanvi's ER pharmacy receipt stamped | Solid hospital alibi clearing Tanvi |
| **11:30 PM** | Meera's calendar notes: "Kabir, Server Room" | Meeting arranged in the basement vault |
| **11:41 PM** | Meera's terminal session hibernated | Workstation abandoned |
| **11:47 PM** | Kabir Nayak's badge swiped at server entrance | Kabir places himself inside the crime scene |
| **11:58 PM** | `kabir_admin` patches ASSIST core directives | Reprograms AI to frame Tanvi Rout |
| **12:01 AM** | Meera records `for_the_police.txt` in PRIVATE | Final dying declaration naming Kabir Nayak |
| **12:03 AM** | Meera's terminal forced offline | Dr. Meera Sahoo disappears |

**Culprit**: Kabir Nayak (CEO, Nirvana Labs)  
**Private Vault Passcode**: `1147` (Derived from Kabir's 11:47 PM badge swipe)

---

&copy; 2026 LAST LOGIN // Nirvana Labs Forensic Archives. MIT License.
