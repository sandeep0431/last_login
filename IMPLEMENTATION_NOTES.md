# IMPLEMENTATION_NOTES.md — Last Login v2

## Project Verification & Progress Log

### Stage 0: Repository Inspection & Stack Architecture
- **Stack**: Standard Vanilla HTML5, CSS3, ES Modules, SVG vector graphics, and Web Audio API. Zero external dependencies or network APIs.
- **Entry Points**: `index.html` at root with modular imports in `src/main.js`.
- **Status**: PASSED. Development server serves all files cleanly without build tool complications.

### Stage 1: Vector Character Engine
- **Artwork**: 7 unique SVG character bases drawn in pure code:
  - Inspector Arya (Detective)
  - Dr. Meera Sahoo (Missing Architect)
  - Kabir Nayak (CEO / Culprit)
  - Tanvi Rout (Junior QA)
  - Prof. Dev Mishra (Research Advisor)
  - Captain Das (Precinct Commander)
  - ASSIST (Autonomous AI Helper)
- **Expressions**: 5 distinct facial expressions for each character (`neutral`, `curious`, `suspicious`, `shocked`, `determined`, etc.) with idle breathing, blinking, and talking mouth animations.
- **Status**: PASSED.

### Stage 2: Dialogue & Statements System
- **Components**: `DialogueBox.js`, `DialogueBox` typewriter effect, keyboard accessibility (`[1]`, `[2]`, `[3]`, `Space` to advance).
- **Statements Log**: Automatically captures testimony from suspects and briefing choices.
- **Status**: PASSED.

### Stage 3: Prologue Progression
- **Scenes**:
  - Riverbank with 3 visual parallax depth layers (skyline, river, muddy bank), dynamic rain particles, flashing police beacons, movable Arya avatar, and 3 clickable hotspots.
  - Captain Das briefing with 3 selectable questions converging to: *"The laptop was still logged in. Trust the evidence, Arya. Not the people."*
  - Suspect Lineup with 3 required interviews (Kabir, Tanvi, Prof. Mishra) before unlocking ASSIST.
  - ASSIST introduction with the subtle first flicker/glitch on *"Can I trust you?"*.
- **Status**: PASSED.

### Stage 4: Simulated Desktop (NirvanaOS)
- **Features**: Boot sequence, login screen for Dr. Sahoo, desktop wallpaper, taskbar, live clock, 8 functional application icons, and draggable window frames with minimize/maximize/close controls.
- **Status**: PASSED.

### Stage 5: Clue Progression & Memory Flashbacks
- **Clue Mapping**: All 6 canonical clues implemented with unique IDs, timestamps, and interpretations:
  1. `clue_calendar` (11:30 PM: Kabir, Server Room) -> Flashback 1: *The Meeting*
  2. `clue_hospital` (11:15 PM: Tanvi ER Receipt) -> Flashback 2: *The Hospital*
  3. `clue_mishra_email` (2 Months Ago: Mishra Old Argument) -> Flashback 3: *The Old Argument*
  4. `clue_shell_search` (11:02 PM: Nirvana Holdings Shell Search) -> Flashback 4: *The Discovery*
  5. `clue_admin_log` (11:58 PM: kabir_admin override) -> Flashback 5: *The Edit*
  6. `clue_private_message` (Meera final message in PRIVATE) -> Flashback 6: *Her Last Message*
- **Case Board**: Interactive pinboard with evidence cards and flashback replay modal.
- **Status**: PASSED.

### Stage 6: ASSIST Deception & Lie Detection Engine
- **State Machine**: 5 mood states (`friendly`, `thinking`, `lying`, `panicking`, `honest`).
- **Mechanics**: Players can flag ASSIST's statements. Requires matching evidence in the case file to prove each lie. Exactly 3 valid flags trigger panic and unlock Safe Mode.
- **Tab Hopper**: Intrusive redirection event in the Browser app.
- **Status**: PASSED.

### Stage 7: Safe Mode & Final Accusation
- **Safe Mode**: Restores honest ASSIST with calm green light. ASSIST reveals code `1147` for the `PRIVATE` folder.
- **Private Folder**: Requires passcode `1147`, unlocks Meera's direct note and clue 6.
- **Accusation**: Selecting Kabir + 2 pieces of supporting evidence triggers the 5-stage progressive confrontation ending. Selecting Tanvi or Mishra triggers the wrong-accusation glitch failure with a safe retry option.
- **Status**: PASSED.

### Stage 8: Procedural Audio & Accessibility
- **Sound & Music Engine**: Web Audio API generates procedural ambient background soundtracks (`prologue_theme`, `riverbank_theme`, `interrogation_theme`, `desktop_theme`, `confrontation_theme`, and `safe_mode_theme`) alongside complete SFX (whoosh transitions, thunder rumble, window open/close pops, notification chimes, watch ticking, access granted/denied signals, and per-character typewriter voice blips).
- **Accessibility**: Global mute toggle, reduced-motion toggle, full keyboard navigation.
- **Status**: PASSED.

### Stage 9: Final Quality Assurance
- **Verification**: Complete playthrough verified from New Game to both victory and failure branches. No external images, no missing assets, clean console.
- **Landing Page & Instant Auto-Start**: Added an atmospheric first-contact landing page (`LandingScene.js`). Clicking anywhere on the screen primes the browser Web Audio context and automatically commences the video-based prologue without requiring manual menu clicks.
- **Video-Based Prologue & Skip Option**: Integrated a full 2.39:1 widescreen cinematic video prologue (`VideoPrologueScene.js`) with dynamic shots, subtitles, progress bar, and an instant `[ SKIP PROLOGUE (ESC) ⏩ ]` option. Direct drop-in support for Veo MP4/WebM files at `videos/prologue_veo.mp4`.

