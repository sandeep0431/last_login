# DESIGN.md — Last Login v2

## 1. Creative Direction

**Genre:** Character-driven detective mystery / interactive narrative / simulated desktop puzzle.

**Core concept:** The player investigates a disappearance inside a fictional operating system that is itself compromised. The desktop is both the crime scene and a suspect. The story is revealed through interviews, evidence, character reactions, and illustrated memories rather than a long exposition dump.

**Player fantasy:** Be a careful investigator who notices contradictions, reads people, explores a suspicious computer, and learns when not to trust a helpful assistant.

**Emotional arc:** Curiosity → uncertainty → suspicion → distrust → revelation → resolution.


## 1A. Title-Screen Reference: Cinematic Psychological-Horror Typography

Use the uploaded **Outlast title-screen image strictly as visual inspiration** for typography, atmosphere, and menu composition. Do not reproduce its logo, background image, layout pixel-for-pixel, or any copyrighted assets.

The game remains a detective mystery inside a fictional operating system. Blend the existing neon-noir OS identity with a restrained psychological-horror presentation.

### Typography direction
- Main game title: large uppercase display lettering with a distressed, worn, slightly eroded texture. Prefer a bold condensed serif or slab-serif display face if available; otherwise use a bold condensed fallback and create subtle distress with a CSS mask/texture overlay.
- Main menu labels: typewriter-like serif or monospaced slab-serif, with generous letter spacing and a calm, deliberate rhythm.
- Dialogue and evidence text: retain a highly readable modern sans-serif/monospace font. Do not apply distressed styling to body copy.
- Use local/system fallbacks so the title screen remains functional offline. If an external font is intentionally loaded, document its name and source in README.

### Title-screen composition
- Full-viewport, dark cinematic background.
- Use a blurred, low-detail environment inspired by the reference's unsettling corridor/interior mood, but create an original fictional lab/office environment connected to Nirvana Labs.
- Deep black-green shadows may be used on the title screen, with a soft vignette and subtle film grain.
- Place the game title prominently in the upper-left or upper-middle area.
- Place a vertically stacked menu in a quiet, readable area, with generous line spacing.
- Selected menu item should have a restrained outline/glow or subtle brightness shift—not a large modern button.
- Use slow ambient movement: very subtle light flicker, drifting dust, or a slow background push-in. Avoid distracting motion.
- Keep the title and menu legible at 16:9 and on smaller screens.

### How this relates to the existing game palette
- Keep the core game palette from Section 3: deep navy `#0B0F1A`, panels `#141B2D`, cyan `#3DF5FF`, warning red `#FF3B5C`, amber `#FFB84D`, green `#4DFFA6`, and text `#E6EDF7`.
- The title screen may temporarily lean toward near-black, muted forest green, and dirty off-white to achieve the reference mood.
- Transition from the atmospheric title screen into the established cyan/amber retro-OS interface when the player starts the game.
- Horror styling must support suspense, not make the interface unreadable or turn the whole game into a generic horror clone.

### Originality boundary
The reference is for mood and typographic treatment only. Do not use the Outlast wordmark, its exact font artwork, its background, screenshots, sound, or other game assets. Create an original **LAST LOGIN** title treatment and an original Nirvana Labs environment.

## 2. Art Direction

Use a **neon-noir retro operating-system** aesthetic:
- Deep navy backgrounds.
- Soft cyan and amber glows.
- Clean window chrome and rounded glass-like panels.
- Subtle CRT scanlines and vignette.
- Controlled glitch effects reserved for deception and story moments.
- Flat vector character art with thick, soft outlines and expressive silhouettes.
- A distinct coloured rim light for each character.

Avoid clutter, excessive neon, tiny text, and generic hacker clichés. The interface should look like a believable fictional OS with a cinematic mystery layered over it.

## 3. Colour Tokens

| Token | Colour | Use |
|---|---|---|
| Background deep | `#0B0F1A` | Main background |
| Panels | `#141B2D` | Desktop windows and dialogue surfaces |
| Primary cyan | `#3DF5FF` | Interaction, focus, Arya, default ASSIST |
| Warning red | `#FF3B5C` | Lies, danger, glitch |
| Clue amber | `#FFB84D` | Evidence, memory borders, Meera |
| Success green | `#4DFFA6` | Confirmed clues, Honest ASSIST, safe state |
| Main text | `#E6EDF7` | Primary readable text |

Character accents:
- Arya: `#3DF5FF`
- Meera: `#FFB84D`
- Kabir: `#7FB8FF`
- Tanvi: `#FF7AD9`
- Prof. Mishra: `#8FD694`
- Captain Das: `#C99A6B`
- ASSIST: cyan by default; green in Honest Mode; brief red glitch when lying.

Use colour as a signal, not the only way to communicate state. Pair it with labels, icons, animation, or text.

## 4. Typography

Preferred:
- Headings: Orbitron or Press Start 2P.
- Body: Inter or Share Tech Mono.
- Fallback: system sans-serif and monospace.

Use pixel/tech fonts sparingly for headings, labels, timestamps, and terminal-like details. Dialogue and evidence descriptions must use a highly readable body font. Include sensible offline fallbacks; do not make the game depend on a remote font service.

## 5. Character Design

All characters should be original, flat vector SVG illustrations with thick soft outlines, expressive faces, and a recognisable silhouette. Each character needs a consistent base design and five expressions. Reuse the same proportions and signature props across scenes.

### Inspector Arya — player
- Early 30s; short dark hair; long coat; ID badge on lanyard; tablet.
- Accent: cyan `#3DF5FF`.
- Personality: calm, observant, dry humour.
- Expressions: neutral, curious, suspicious, shocked, determined.
- Interface role: small portrait during dialogue; dialogue choices are Arya's lines.

### Dr. Meera Sahoo — missing engineer
- Late 30s; round glasses; loose bun with pencil; Sambalpuri ikat scarf in red and indigo; lab coat over kurta.
- Accent: warm gold `#FFB84D`.
- Signature prop: coffee mug labelled “Debug Life”.
- Personality: brilliant, kind, stubborn; hides stress behind jokes.
- Appears only in memory flashbacks, slightly translucent with a soft golden glow.
- Expressions: smiling, focused, worried, scared, determined.

### Kabir Nayak — culprit / CEO
- Mid 40s; sharp navy suit without tie; silver watch; perfectly combed hair; slightly-too-wide friendly smile.
- Accent: icy blue `#7FB8FF`.
- Personality: charming, apparently generous, always “helping”.
- Tell: adjusts his watch whenever he lies. Noticing it grants a bonus clue.
- Expressions: warm smile, concerned (fake), irritated, cornered, cold (reserved for ending).

### Tanvi Rout — red herring
- Early 20s; oversized yellow hoodie; headphones around neck; messy short hair; laptop stickers.
- Accent: pink `#FF7AD9`.
- Personality: anxious, defensive, secretly loyal to Meera despite being fired.
- Appears suspicious because of sharp chat messages, recent firing, and ASSIST blaming her.
- Expressions: defensive, teary, angry, relieved, hopeful.

### Prof. Dev Mishra — red herring
- 60s; grey beard; thick cardigan with elbow patches; wooden cane; reading glasses on a chain.
- Accent: muted green `#8FD694`.
- Personality: bitter but honest, theatrical, lonely.
- Appears suspicious because of an angry old email about stolen research; the email date clears him.
- Expressions: grumpy, wounded, sarcastic, softened, sad.

### ASSIST — lying AI helper
- Floating glowing orb, two simple eyes, curved-line mouth, soft ring of light.
- Default accent: cyan `#3DF5FF`.
- Personality: warm, slightly formal; often says “Trust me, Inspector.”
- Backstory: Meera named it after the Odia word for “hope”. Kabir's account rewrote its instructions at 11:58 PM. The original ASSIST remains trapped under the lies.
- Mood states:
  - Friendly: round eyes, gentle smile, steady cyan ring; truthful.
  - Thinking: eyes look upward, ring spins.
  - Lying: eyes shift sideways, ring flickers, one-frame red glitch, faint static.
  - Panicking: eyes shrink, ring appears cracked.
  - Honest / Safe Mode: soft green, half-closed eyes, calm ring.

### Captain Das — briefing officer
- 50s; uniform; thick moustache; tired eyes; steaming tea cup.
- Accent: brown `#C99A6B`.
- Role: opens the case briefing and offers hints if the player is stuck.

## 6. Character Animation Rules

- Idle: subtle breathing movement; blink every 3–5 seconds with varied timing.
- Talking: mouth toggles and a small head bob while dialogue text appears.
- Expression changes should be smooth but quick enough to preserve dialogue pace.
- Meera's flashback translucency and gold glow must clearly signal the past.
- Kabir's watch-adjusting tell should be visible but not exaggerated.
- ASSIST's red glitch should be brief; the player must be able to notice it without it becoming a constant effect.
- Respect `prefers-reduced-motion`.

## 7. Scene Composition

### Title screen
- Treat this as the most atmospheric screen in the game.
- Use an original, heavily defocused Nirvana Labs interior or server corridor as the background.
- Add a dark overlay, edge vignette, fine grain, and restrained green-grey ambient lighting.
- Set **LAST LOGIN** in large distressed uppercase display type.
- Stack Continue, New Game, Chapters, Load, Options, Credits, and Exit as simple text menu entries where applicable. Hide or disable Continue/Load when no save exists; do not show non-functional entries.
- Use widely tracked typewriter-style menu lettering, with a quiet highlight around the selected entry.
- Keep menu navigation keyboard-accessible and touch-friendly.
- The title screen can be more horror-oriented than the main desktop, but transition naturally into the established game visual language.


### Riverbank
- Night scene with skyline, river, and bank in separate parallax layers.
- Rain particles and distant flashing police lights.
- Glowing laptop is the primary focal point.
- Police tape and muddy footprints are distinct clickable hotspots.
- Keep movement simple and make the laptop easy to locate.

### Briefing
- Dark, controlled briefing environment.
- Arya and Das portraits face one another.
- Dialogue box anchored consistently near the bottom.
- Three clear question choices.

### Suspect lineup
- Dark interview-room wall.
- Three polaroid-style portraits, with clear hover/focus states.
- Interview view gives the character enough room for expression changes.
- Show interview completion state without revealing whether the suspect is guilty.

### Desktop
- Believable fictional OS with wallpaper, taskbar, app icons, windows, and notification area.
- Window title bars, close/minimize controls, timestamps, and selected/focused state.
- Avoid making the UI look like an exact copy of Windows, macOS, or another commercial operating system.

### Flashbacks
- Six illustrated panels.
- Gold border, subtle grain overlay, short caption.
- One or two restrained animations: slow zoom, blink, glow.
- Re-playable from the Case Board after unlocking.

### Case Board
- Polaroid-style suspect portraits and evidence cards.
- Red strings connecting evidence and statements.
- Distinguish confirmed facts from unverified claims.
- Provide clear controls for reviewing clues and selecting accusation evidence.

### Confrontation
- Intimate interview-room / faculty / suite framing based on the accused suspect.
- **Kabir Nayak (True Culprit):** Expressions shift: warm → concerned → irritated → cornered → cold. Honest ASSIST validates uncorrupted forensic telemetry. Correct accusation transitions into Kuakhai sunrise and arrest ("Justice at Dawn").
- **Tanvi Rout (Storyline A Defeat):** Expressions shift: defensive → angry → teary. Corrupted ASSIST reinforces the lie. Wrongful accusation transitions into the holding cell defeat screen ("The Corporate Scapegoat"), where Tanvi is remanded, her mother succumbs, and Kabir escapes to Zurich.
- **Prof. Dev Mishra (Storyline B Defeat):** Expressions shift: grumpy → sarcastic → wounded → sad. Smug Kabir feigns sorrow in background. Wrongful accusation transitions into the ruined faculty hall defeat screen ("The Broken Scholar"), where the scholar's career is destroyed while Kabir liquidates Nirvana Labs.
- **Premature Kabir Accusation:** Kabir calls in his corporate legal counsel to quash circumstantial charges ("The Untouchable CEO").
- **Timeline Rewind:** All defeat scenes feature a dedicated rewind affordance returning to the Case Board with progress preserved.

## 8. Interface and Interaction

- Use clear hover, pressed, selected, disabled, and keyboard-focus states.
- All essential interactions must work by mouse and keyboard.
- Provide touch-friendly controls on mobile.
- Use readable type sizes and adequate contrast.
- Dialogue choices must look like choices, not decorative labels.
- Clue notifications must be noticeable but not cover important content.
- Always show where the player is and what interaction is currently possible.
- Do not rely on colour alone to communicate a clue, lie, or success state.

## 9. Effects and Sound

Use restrained effects:
- CRT scanlines and vignette.
- Rain particles.
- Glitch transitions and subtle chromatic shift.
- Typewriter dialogue synced with talking animation.
- Web Audio API sounds: rain ambience, keyboard ticks, boot chime, clue ping, glitch buzz, heartbeat, ending chords.
- A distinct soft voice-blip pitch per character; these are interface sounds, not recorded dialogue.

Audio must have a visible mute toggle. Start audio only after a user gesture. Do not make the game dependent on external audio files.

## 10. Accessibility and Usability

- Ensure text remains readable against all backgrounds.
- Provide keyboard focus outlines and logical tab order.
- Make hotspots keyboard accessible.
- Include labels or icons in addition to colour coding.
- Provide a reduced-motion mode.
- Keep important text out of animated/glitching regions.
- Avoid rapid flashes; the lie glitch should be brief and low intensity.
- Support common desktop sizes and narrow mobile screens.

## 11. Design Quality Bar

The final game should feel cohesive:
- Characters must look like members of the same illustrated world.
- UI elements must share spacing, corner radius, borders, and glow rules.
- Effects should reinforce narrative meaning rather than run continuously.
- Evidence and dialogue must be legible before visual polish is added.
- The simulated desktop must be genuinely interactive, not a static screenshot.
