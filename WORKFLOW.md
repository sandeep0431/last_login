# WORKFLOW.md — Antigravity Build Workflow

## Purpose

This file defines how to implement **Last Login v2** safely and incrementally in Antigravity. Follow the stages in order. Do not attempt to generate the entire game in one unverified pass.

## 1. Working Rules

1. Inspect the existing project before editing. Identify its framework, entry point, package manager, and current assets.
2. Preserve working code and project configuration. Do not replace the project structure unless required.
3. Read `BUILD.md`, `DESIGN.md`, and `ASSET.md` before implementation.
4. Treat the story timeline, culprit, clue mapping, and code `1147` in `BUILD.md` as immutable requirements.
5. Implement one stage at a time. After each stage, run the app, inspect the browser, test the feature, and fix errors before continuing.
6. Prefer small reusable modules and data-driven content over one huge component or script.
7. Do not leave placeholder buttons, fake interactions, TODO screens, or unimplemented menu items in the final build.
8. Use original SVG/CSS assets generated in the project. Do not download third-party character art.
9. Keep all game content local. Do not add real authentication, external AI APIs, analytics, or network-dependent gameplay.
10. Maintain a `IMPLEMENTATION_NOTES.md` file recording completed stages, known issues, and test results.

## 2. Suggested Project Structure

Adapt this to the existing framework where appropriate:

```text
last-login-v2/
├── public/
│   ├── favicon.svg
│   └── audio/                 # Only if any locally generated audio is used
├── src/
│   ├── main.js
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   ├── characters.css
│   │   ├── desktop.css
│   │   └── effects.css
│   ├── data/
│   │   ├── characters.js
│   │   ├── dialogue.js
│   │   ├── evidence.js
│   │   ├── flashbacks.js
│   │   └── desktop-apps.js
│   ├── game/
│   │   ├── game-state.js
│   │   ├── save-manager.js
│   │   ├── scene-router.js
│   │   ├── progression.js
│   │   ├── evidence-manager.js
│   │   └── audio-manager.js
│   ├── components/
│   │   ├── Character.js
│   │   ├── DialogueBox.js
│   │   ├── ChoiceButton.js
│   │   ├── ClueToast.js
│   │   ├── WindowFrame.js
│   │   └── EvidenceCard.js
│   ├── scenes/
│   │   ├── TitleScene.js
│   │   ├── RiverbankScene.js
│   │   ├── BriefingScene.js
│   │   ├── SuspectLineupScene.js
│   │   ├── AssistIntroScene.js
│   │   ├── DesktopScene.js
│   │   ├── FlashbackScene.js
│   │   └── EndingScene.js
│   └── apps/
│       ├── FilesApp.js
│       ├── MailApp.js
│       ├── ChatApp.js
│       ├── BrowserApp.js
│       ├── CaseBoardApp.js
│       ├── StatementsLogApp.js
│       └── AssistApp.js
├── index.html
├── package.json
├── BUILD.md
├── WORKFLOW.md
├── DESIGN.md
├── ASSET.md
└── README.md
```

## 3. Stage-by-Stage Execution

### Stage 0 — Repository inspection and setup
**Task**
- Inspect files and identify the current stack.
- Confirm the app runs before changes.
- Set up the scene root, global styles, design tokens, and a simple title screen.

**Verify**
- Development server starts without errors.
- No existing working functionality was removed.
- Browser console is clean.

**Do not proceed** until the base app runs.

### Stage 1 — Character engine
**Task**
- Build seven original SVG character bases.
- Implement five expressions per character where specified.
- Add blink, breathing, and talking animations.
- Create a reusable character component that accepts character ID, expression, size, and speaking state.

**Verify**
- All seven characters render.
- Expressions change without changing character identity or proportions.
- Animation does not cause layout shifts.
- Reduced-motion preference is respected.

### Stage 2 — Dialogue engine
**Task**
- Build the reusable dialogue box, portrait slot, name label, typewriter text, and choice buttons.
- Add keyboard support: Enter/Space to advance; number keys 1–3 may select visible choices.
- Add Statements Log storage.
- Ensure branching choices can converge to a common scene transition.

**Verify**
- Text can be completed instantly by clicking or pressing a key.
- Choices cannot be double-selected.
- Statements persist when the player changes scenes.
- Dialogue can be skipped without skipping required evidence or progression gates.

### Stage 3 — Prologue
**Task**
- Implement Riverbank with three visual depth layers, rain, police lights, and hotspots.
- Implement Captain Das briefing with the three required choices.
- Implement suspect lineup and all three interviews.
- Gate the ASSIST introduction until all interviews are complete.
- Implement the ASSIST trust scene and subtle first flicker.

**Verify**
- Hotspots are clickable and keyboard-accessible.
- All three suspect interviews are required.
- Statements are stored exactly once.
- Every route reaches the ASSIST introduction.

### Stage 4 — Simulated desktop
**Task**
- Create desktop wallpaper, taskbar, clock, eight icons, and reusable window frames.
- Add Files, Mail, Chat, Browser, Case Board, Statements Log, and ASSIST apps.
- Add open, close, minimize, focus, and basic drag behaviour for windows.
- Add right-click/long-press “Flag as suspicious”.

**Verify**
- Each icon opens the correct app.
- Multiple windows do not break the layout.
- Window controls work.
- Desktop is usable at 1366×768 and at narrower mobile widths.

### Stage 5 — Clue progression and flashbacks
**Task**
- Implement evidence as structured records with unique IDs.
- Implement one-time clue collection, counter, toast, inventory, and Case Board integration.
- Trigger the six flashbacks from their exact associated clues.
- Allow replay of unlocked flashbacks from the Case Board.

**Verify**
- Counter increments once per unique clue, from 0/6 to 6/6.
- No clue can be collected twice.
- Each flashback unlocks only from its corresponding clue.
- Flashback replay does not change progression state.

### Stage 6 — ASSIST deception and Tab Hopper
**Task**
- Implement ASSIST's five mood states.
- Add scripted statements with truth metadata and contradiction evidence.
- Make visual lie tells observable: sideways eyes, ring flicker, brief red glitch, subtle static.
- Implement valid/invalid/duplicate flag feedback.
- Add Tab Hopper event in the Browser level.

**Verify**
- Three valid suspicious flags—not three random clicks—trigger panic.
- Invalid and duplicate flags do not increase the count.
- ASSIST's state changes are visually and audibly distinguishable.
- Tab Hopper can be completed without losing collected evidence.

### Stage 7 — Safe Mode and final deduction
**Task**
- Unlock Safe Mode after three valid flags.
- Require code `1147` for the `PRIVATE` folder.
- Reveal Meera's final message and Flashback 6.
- Require a suspect selection and exactly two evidence selections for the accusation.
- Implement Kabir's correct confrontation and wrong-accusation retry.

**Verify**
- Safe Mode cannot be entered early.
- Incorrect folder codes show feedback and allow retry.
- Correct accusation requires Kabir plus two relevant evidence items.
- Wrong accusation shows the specified failure scene and offers a safe retry.
- Restart/retry does not erase or duplicate evidence unexpectedly.

### Stage 8 — Audio, polish, accessibility
**Task**
- Add procedural sound effects with Web Audio API.
- Add scanlines, vignette, subtle glow, rain, and controlled glitch effects.
- Add per-character voice blips using different pitches; no speech synthesis is required.
- Add mute toggle and persist preference.
- Add responsive and reduced-motion behaviour.

**Verify**
- Audio begins only after a user gesture.
- Mute disables all sound.
- Effects do not obscure text or clues.
- Reduced-motion mode limits nonessential animation.
- Text contrast and button focus states are usable.

### Stage 9 — Final QA and delivery
**Task**
- Play through from New Game to both endings.
- Test Continue after reload.
- Test every clue, flashback, interview, flag, and window.
- Remove console errors, broken links, dead buttons, and debug UI.
- Write README with setup, controls, gameplay flow, and AI-assisted development disclosure.

**Final checklist**
- [ ] New Game works.
- [ ] Continue works with a saved game.
- [ ] Prologue is fully playable.
- [ ] All three interviews are required.
- [ ] Six clues and six flashbacks work.
- [ ] Timeline is unchanged.
- [ ] ASSIST lie tell and three-flag mechanic work.
- [ ] Safe Mode and code `1147` work.
- [ ] Both endings and retry work.
- [ ] Desktop and mobile layouts work.
- [ ] Mute and reduced motion work.
- [ ] No console errors or placeholder interactions.
- [ ] README and source code are included.

## 4. Antigravity Prompting Protocol

For each stage, use this pattern:

> Read BUILD.md, WORKFLOW.md, DESIGN.md, and ASSET.md. Inspect the current repository and report the files you intend to create or modify. Implement **Stage [number/name] only**. Preserve all fixed story facts and existing working code. After implementation, run the project, test the stage in the browser, fix errors, and update IMPLEMENTATION_NOTES.md with what changed and what was verified. Do not start the next stage.

After a stage passes, issue a separate prompt for the next stage.

## 5. Non-Negotiable Story and Logic Checks

- Kabir is the culprit.
- Tanvi is cleared by the 11:15 PM hospital receipt.
- Prof. Mishra is cleared by the date of his old email.
- Meera's calendar meeting is at 11:30 PM.
- Meera's last login is 11:41 PM.
- Kabir's badge swipe is at 11:47 PM.
- `kabir_admin` modifies ASSIST at 11:58 PM.
- Meera goes offline at 12:03 AM.
- `PRIVATE` code is `1147`.
- The player must flag three valid lies to enable Safe Mode.
- The final accusation requires two pieces of evidence.
