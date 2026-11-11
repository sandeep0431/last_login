# ASSET.md — Last Login v2

## 1. Asset Policy

Create all visual assets in the project using original SVG markup, CSS, HTML, and simple procedural effects. Do not use third-party character images, stock illustrations, or copyrighted game art. The game plan explicitly requires original assets and disclosure of any fonts loaded.

Prefer reusable vector components over separate image files. Character expressions should be assembled from reusable facial features wherever practical.


## 1A. Title Screen Reference Assets

Create an original title-screen composition inspired by the uploaded reference's typography and atmosphere:
- Original blurred Nirvana Labs corridor / server-room environment; no copied Outlast imagery.
- Dark overlay with near-black and muted green-grey tones.
- Soft vignette and subtle film-grain texture.
- Original distressed uppercase `LAST LOGIN` title treatment.
- Typewriter-style menu typography with generous letter spacing.
- A restrained selected-item outline or glow.
- Optional subtle dust, light flicker, or slow background zoom.

The title screen should be implemented primarily with CSS and original SVG/vector elements. Do not source or reproduce the reference game's logo, font artwork, screenshot, background, or sound.

## 2. Character Asset Inventory

Create seven SVG character bases:

| Character ID | Character | Main visual identifiers | Accent |
|---|---|---|---|
| `arya` | Inspector Arya | Short dark hair, long coat, ID lanyard, tablet | `#3DF5FF` |
| `meera` | Dr. Meera Sahoo | Round glasses, loose bun with pencil, ikat scarf, lab coat, “Debug Life” mug | `#FFB84D` |
| `kabir` | Kabir Nayak | Navy suit, silver watch, combed hair, wide smile | `#7FB8FF` |
| `tanvi` | Tanvi Rout | Yellow hoodie, headphones, short messy hair, laptop stickers | `#FF7AD9` |
| `mishra` | Prof. Dev Mishra | Grey beard, cardigan with elbow patches, cane, glasses chain | `#8FD694` |
| `assist` | ASSIST | Glowing orb, two eyes, curved mouth, luminous ring | `#3DF5FF` |
| `das` | Captain Das | Uniform, thick moustache, tired eyes, tea cup | `#C99A6B` |

### Expression variants

Create five expression variants for each human character. Use the exact expression names in `DESIGN.md`:
- Arya: `neutral`, `curious`, `suspicious`, `shocked`, `determined`.
- Meera: `smiling`, `focused`, `worried`, `scared`, `determined`.
- Kabir: `warm`, `concerned`, `irritated`, `cornered`, `cold`.
- Tanvi: `defensive`, `teary`, `angry`, `relieved`, `hopeful`.
- Mishra: `grumpy`, `wounded`, `sarcastic`, `softened`, `sad`.
- Das: create a practical set of five matching the briefing role (for example `neutral`, `tired`, `serious`, `concerned`, `reassuring`).

ASSIST needs five mood states: `friendly`, `thinking`, `lying`, `panicking`, `honest`.

## 3. Scene Asset Inventory

### Riverbank
- Three parallax layers: skyline/sky, river, foreground bank.
- Rain particle layer.
- Distant police light effect.
- Police tape hotspot.
- Muddy footprints hotspot.
- Glowing laptop hotspot.
- Optional simple Arya walking sprite/pose.

### Interview room
- Dark interview-room background.
- Three polaroid frames for suspect lineup.
- Character portrait placement.
- Subtle wall texture or lighting.

### Flashbacks
Create six separate illustrated SVG scenes:
1. `flashback-meeting.svg` — Meera checks her calendar and walks toward the server room.
2. `flashback-hospital.svg` — Tanvi sits beside her mother at the hospital, holding her phone.
3. `flashback-old-argument.svg` — Mishra argues with Meera in a corridor; make it clear this happened two months earlier.
4. `flashback-discovery.svg` — Meera sees the shell-company information and realises Kabir has been stealing.
5. `flashback-edit.svg` — A silhouette types at Meera's laptop; ASSIST's face turns red in the dark.
6. `flashback-last-message.svg` — Meera types her note for the Inspector, looks hopefully at ASSIST, and the screen goes dark.

Each flashback requires a gold border, light grain overlay, short caption, and one or two subtle CSS animations. Static illustrations are acceptable if time is limited.

### Endings
- `ending-sunrise.svg` — sunrise / arrest resolution.
- `ending-glitch.svg` — wrong-accusation glitch failure scene.

## 4. Desktop and UI Assets

Create these as SVG/CSS components:
- Desktop wallpaper.
- Taskbar and system tray.
- Eight desktop app icons.
- Window title bar and controls.
- Dialogue panel, character portrait frame, name tag, and choice buttons.
- Suspect polaroid frames.
- Evidence cards and Case Board red strings.
- Statements Log rows.
- Clue toast and 0/6 progress counter.
- Boot screen and login screen.
- Right-click / long-press context menu with “Flag as suspicious”.
- ASSIST orb and ring states.
- Safe Mode indicator.
- Locked `PRIVATE` folder icon and code-entry panel.
- Tab Hopper alert/event indicator.
- Mute/sound toggle and reduced-motion setting.

Suggested desktop app icons:
1. Files
2. Mail
3. Chat
4. Browser
5. Case Board
6. Statements Log
7. ASSIST
8. Settings / System

## 5. Motion and Effects Inventory

Implement with CSS and Web Audio API:
- Character breathing.
- Character blinking.
- Character talking mouth toggle and head bob.
- ASSIST ring pulse and spin.
- ASSIST lie flicker and brief red glitch.
- ASSIST panic/cracked ring.
- Rain particles.
- Police light pulse.
- Window open/close transition.
- Typewriter dialogue.
- Clue toast entrance/exit.
- Flashback slow zoom, blink, or glow.
- CRT scanlines and vignette.
- Tab-switch glitch cue.
- Ending transition.

Keep animation light and performant. Respect reduced-motion settings.

## 6. Sound Inventory

Generate sounds procedurally using Web Audio API; do not require external audio assets:
- Rain ambience.
- Keyboard tick.
- Boot chime.
- Clue ping.
- Glitch buzz/static.
- Heartbeat.
- Ending chord.
- Distinct short voice-blip pitches for Arya, Meera, Kabir, Tanvi, Mishra, Das, and ASSIST.

Requirements:
- Audio starts after user interaction.
- Global mute toggle.
- Sound preference persists.
- Avoid sudden high-volume effects.
- If browser audio is unavailable, the game remains fully playable silently.

## 7. Suggested Asset Organisation

```text
src/
├── assets/
│   ├── characters/
│   │   ├── arya.svg
│   │   ├── meera.svg
│   │   ├── kabir.svg
│   │   ├── tanvi.svg
│   │   ├── mishra.svg
│   │   ├── assist.svg
│   │   └── das.svg
│   ├── scenes/
│   │   ├── riverbank-sky.svg
│   │   ├── riverbank-river.svg
│   │   ├── riverbank-foreground.svg
│   │   ├── interview-room.svg
│   │   ├── confrontation-room.svg
│   │   ├── flashback-meeting.svg
│   │   ├── flashback-hospital.svg
│   │   ├── flashback-old-argument.svg
│   │   ├── flashback-discovery.svg
│   │   ├── flashback-edit.svg
│   │   ├── flashback-last-message.svg
│   │   ├── ending-sunrise.svg
│   │   └── ending-glitch.svg
│   └── icons/
│       ├── files.svg
│       ├── mail.svg
│       ├── chat.svg
│       ├── browser.svg
│       ├── case-board.svg
│       ├── statements.svg
│       ├── assist.svg
│       └── settings.svg
└── styles/
    ├── characters.css
    └── effects.css
```

This is a suggested organisation. If the framework handles SVG components more effectively inline, use that approach while preserving reusable assets and clear naming.

## 8. Asset Acceptance Checklist

- [ ] Seven recognisable character bases exist.
- [ ] Human characters have five working expressions each.
- [ ] ASSIST has five distinct mood states.
- [ ] Character proportions and signature props remain consistent.
- [ ] Riverbank has three depth layers and required hotspots.
- [ ] Interview room and suspect polaroids exist.
- [ ] Six flashback scenes exist and map to the correct clues.
- [ ] Both ending scenes exist.
- [ ] Desktop icons, window chrome, dialogue UI, evidence cards, and clue toast exist.
- [ ] Scanline, rain, glow, and glitch effects are subtle and performant.
- [ ] Procedural sounds and mute control work.
- [ ] No third-party images are used.
- [ ] Any loaded fonts are named in README / submission disclosure.
