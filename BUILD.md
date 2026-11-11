# BUILD.md — Last Login v2

## 1. Project Overview

Build **Last Login v2**, a character-driven detective mystery game set inside a deceptive, fictional operating system. The player is Inspector Arya, investigating the disappearance of Dr. Meera Sahoo. The player explores a simulated desktop, interviews suspects, collects evidence, detects lies from the AI assistant ASSIST, reconstructs the timeline, and identifies Kabir Nayak as the culprit.

The game must feel like a playable mystery—not a static story page or a generic desktop mock-up. Characters, expressions, dialogue choices, evidence interactions, and the final accusation are core gameplay.

## 2. Primary Build Objective

Create a polished, responsive, browser-playable game with:
- A short interactive prologue.
- A character and expression system using original SVG artwork drawn in code.
- A simulated operating-system desktop with functional app windows.
- Evidence collection, statements, clue tracking, and a Case Board.
- An AI helper character (ASSIST) whose visual behaviour reveals when it lies.
- Six clue-triggered memory flashbacks.
- Safe Mode, a final accusation, and correct/incorrect endings.
- Keyboard and pointer controls, with mobile-friendly touch alternatives.

Do not use third-party character images or copyrighted game assets. Generate the visual assets with SVG, CSS, and Web Audio API. Keep the game self-contained and usable offline after dependencies are installed.


### Title-screen visual requirement
Use the uploaded Outlast title-screen image only as inspiration for distressed uppercase title typography, widely spaced typewriter-like menu lettering, dark blurred environment, vignette, and restrained film grain. Create an original LAST LOGIN title and original Nirvana Labs background. Do not copy the Outlast logo, screenshot, background, or proprietary assets. Keep the main game desktop in the established neon-noir retro-OS palette; the horror treatment is strongest on the title screen and selected suspense moments.

## 3. Recommended Technology

Use:
- Vite + vanilla JavaScript (preferred for a fast, lightweight implementation).
- HTML5 and CSS3.
- Inline or component-generated SVG for characters, scenes, icons, and evidence illustrations.
- CSS animations for blinking, breathing, talking, glow, rain, scanlines, and glitches.
- Web Audio API for procedural sound effects.
- LocalStorage for save state and game progress.

Do not add a backend, database, external AI API, or authentication service. ASSIST is a scripted in-game character; it is not a real AI service. Keep dependencies minimal. If the existing repository already uses a working framework, preserve it rather than rewriting the project without reason.

## 4. Required Game Flow

Implement the following sequence and gate progression correctly:

1. **Title / Start screen**
   - Show the game title, a short premise, Start Game, Continue (only if a save exists), and sound toggle.
2. **Prologue — Riverbank**
   - Night-time riverbank with rain, police lights, skyline/river/bank parallax layers.
   - Player moves Arya left/right using arrow keys or A/D; provide touch controls on mobile.
   - Clickable hotspots: police tape, muddy footprints, glowing laptop.
   - Laptop advances to the briefing.
3. **Prologue — Captain Das briefing**
   - Dialogue with three selectable questions:
     - “Who reported her missing?”
     - “Any enemies?”
     - “What do we have?”
   - All choices converge on the same closing line: “The laptop was still logged in. Trust the evidence, Arya. Not the people.”
4. **Prologue — Suspect lineup**
   - Three clickable suspect portraits: Kabir, Tanvi, and Prof. Mishra.
   - Each opens a short interview with two questions or interaction beats.
   - Save every suspect statement in the Statements Log.
   - Require all three interviews before continuing.
5. **Prologue — Meet ASSIST**
   - ASSIST greets Arya honestly and introduces the player to its interface.
   - The “Can I trust you?” response includes a very brief flicker/glitch as the first subtle warning.
6. **Level 0 — Boot and Login**
   - Show a fictional boot sequence and login screen.
   - Teach window opening, closing, dragging (if practical), desktop icons, and clue notifications.
7. **Level 1 — Files**
   - Player renames `meera_notes.tmp` to `meera_notes.txt`.
   - Inspect the file and discover the calendar entry for 11:30 PM: “Kabir, Server Room”.
   - Unlock Flashback 1: “The Meeting”.
8. **Level 2 — Mail and Chat**
   - Inspect messages and dates.
   - Discover Tanvi's hospital receipt stamped 11:15 PM, clearing her.
   - Find Prof. Mishra's old email and its date, clearing him as a current suspect.
   - Unlock Flashbacks 2 and 3.
   - Introduce the “Flag as suspicious” mechanic.
9. **Level 3 — Browser and Tab Hopper**
   - Browser history reveals Meera searched “Nirvana Holdings shell company” at 11:02 PM.
   - A tab-switch event / Tab Hopper interaction challenges the player to inspect the correct tab and retain evidence.
   - ASSIST becomes overly helpful and asks, “Where did you go?”
   - Unlock Flashbacks 4 and 5 when their associated clues are found.
10. **Level 4 — Catch the Liar**
    - Open Case Board and compare statements with evidence.
    - Player must flag three suspicious ASSIST statements.
    - On the third valid flag, ASSIST panics and Safe Mode becomes available.
    - Open the `PRIVATE` folder using code `1147`.
    - Find Meera's final message and unlock Flashback 6.
    - Switch ASSIST into Honest / Safe Mode.
11. **Level 5 — Accusation**
    - Ask the player to choose one suspect and attach two pieces of evidence.
    - Correct accusation: Kabir confrontation, expression progression, honest ASSIST, sunrise/arrest ending.
    - Wrong accusation: hurt response from Tanvi or Mishra, lying ASSIST laughs, screen glitches, retry option.

## 5. Fixed Story Facts — Do Not Change

The following facts are canonical. Do not change the culprit, chronology, clue meaning, or character motivations.

| Time | Event |
|---|---|
| 11:02 PM | Meera searches “Nirvana Holdings shell company” and discovers embezzlement. |
| 11:15 PM | Tanvi's hospital receipt is stamped; this clears Tanvi. |
| 11:30 PM | Meera's calendar shows “Kabir, Server Room”. |
| 11:41 PM | Meera's last login. |
| 11:47 PM | Kabir's badge is swiped at the server room. |
| 11:58 PM | `kabir_admin` modifies ASSIST's configuration to make it lie and steer Arya toward Tanvi. |
| 12:03 AM | Meera goes offline. |

**Culprit:** Kabir Nayak, CEO of Nirvana Labs. He siphoned company funds, Meera discovered it, and he altered ASSIST to frame someone else.

The `1147` folder code is tied to the 11:47 PM badge-swipe clue. Do not change it.

## 6. Evidence and Flashback Mapping

Implement these as structured data, not scattered hard-coded conditions.

| Evidence | Meaning | Flashback |
|---|---|---|
| Calendar entry | Meera planned to meet Kabir in the server room. | The Meeting |
| Tanvi's hospital receipt | Tanvi was at the hospital at 11:15 PM. | The Hospital |
| Prof. Mishra's old email | The argument happened two months earlier. | The Old Argument |
| Shell-company browser search | Meera found evidence of embezzlement. | The Discovery |
| `kabir_admin` configuration log | Kabir altered ASSIST at 11:58 PM. | The Edit |
| `PRIVATE` folder message | Meera left a message for the Inspector. | Her Last Message |

Every clue must:
- Have a unique ID, title, source app, timestamp (where relevant), description, and interpretation.
- Be added to the evidence inventory once only.
- Trigger a visible clue toast and update the 0/6 counter.
- Unlock its associated flashback.
- Appear on the Case Board and be available for replay.

## 7. Core Systems

### Character system
- Seven character bases: Arya, Meera, Kabir, Tanvi, Mishra, Das, ASSIST.
- Five expressions for each human character, implemented by swapping SVG facial features where practical.
- Idle breathing and blinking; talking mouth toggle and subtle head bob.
- Character identity must remain visually consistent between dialogue, interviews, flashbacks, and endings.

### Dialogue system
- Character portrait, name tag, dialogue text, typewriter reveal, and selectable choices.
- Allow click/keypress to finish the typewriter line.
- Prevent choices from being selected before they are visible.
- Store important statements in the Statements Log.
- Avoid dialogue soft-locks; provide a skip/continue control.

### Desktop system
- Fictional desktop wallpaper, taskbar, clock, eight desktop icons, and window chrome.
- Apps: Files, Mail, Chat, Browser, Case Board, Statements Log, and ASSIST.
- Window open/close/minimize controls should work.
- Right-click or long-press context menu includes “Flag as suspicious”.
- App contents must be readable and usable at common laptop resolutions.

### ASSIST state machine
- Friendly: round eyes, gentle smile, steady cyan ring.
- Thinking: eyes look upward, ring spins.
- Lying: eyes shift sideways, ring flickers, a one-frame red glitch, subtle static.
- Panicking: eyes shrink and ring appears cracked.
- Honest / Safe Mode: soft green colour, half-closed eyes, calm ring.
- ASSIST must have a scripted set of statements, with each statement mapped to its truth value and evidence contradiction.
- The player can flag suspicious statements. Count only valid flags; show feedback for invalid or duplicate flags.
- Three valid flags trigger panic and enable Safe Mode.

### Save system
- Autosave after each major scene, interview completion, clue discovery, flashback unlock, and level completion.
- Save collected clues, interviews, flags, unlocked flashbacks, current level, sound preference, and ending state.
- Continue must restore a valid game state.
- Provide a New Game confirmation before overwriting a save.

## 8. Acceptance Criteria

The game is complete only when:
- A new player can finish the entire game without developer instructions.
- Every prologue scene is playable and all three interviews are required.
- All six clues can be found and each unlocks the correct flashback.
- The fixed timeline and culprit are preserved.
- ASSIST's lie tell is visible and the flag mechanic works.
- Safe Mode requires three valid flags.
- `PRIVATE` requires code `1147`.
- The final accusation requires two evidence selections.
- Correct and incorrect endings both work, and retry does not corrupt progress.
- No dead buttons, broken windows, missing assets, console errors, or progression soft-locks remain.
- Layout adapts to desktop and mobile widths.
- Source code is included and the game can be started using the README instructions.

## 9. Implementation Order

Build in small tested stages:
1. Project shell, scene router, game state, and save system.
2. SVG character system, expressions, idle/talking animation.
3. Dialogue engine and Statements Log.
4. Riverbank, briefing, lineup interviews, ASSIST introduction.
5. Desktop shell and Files/Mail apps.
6. Chat, Browser, Tab Hopper, clue flags, ASSIST state machine.
7. Case Board, flashbacks, Safe Mode, final accusation, endings.
8. Sound, visual polish, responsive testing, and final playthrough.

Prioritize a complete playable game over decorative complexity. If time is short, make flashbacks static illustrated panels and simplify the riverbank movement, but do not remove character expressions, ASSIST's lying tell, or the final confrontation.
