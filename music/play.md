# 🕵️‍♂️ LAST LOGIN v2 — Master Case Solution & Walkthrough (`play.md`)

Welcome to the official field walkthrough and case solution guide for **Last Login v2**. Follow these exact steps to uncover all 6 clues, break ASSIST's deception protocol, unlock Safe Mode, and arrest the true culprit.

---

## 📋 Case Dossier & Overview

* **Victim:** Dr. Meera Sahoo (Chief Quantum Architect, Nirvana Labs)
* **Incident Time:** Vanished between 11:41 PM and 12:03 AM near the Kuakhai Riverbank, Bhubaneswar.
* **Vehicle Status:** Black sedan abandoned by the water with headlights on and driver door open.
* **Laptop Status:** Compromised NirvanaOS workstation recovered from the passenger seat, still logged in.
* **The True Culprit:** **Kabir Nayak (CEO, Nirvana Labs)**
* **Motive:** Dr. Meera Sahoo audited financial streams and uncovered that Kabir siphoned **$14,200,000** in quantum patents into an offshore Mauritius shell company (*Nirvana Holdings Ltd*). When Meera scheduled an 11:30 PM meeting in the basement server vault to demand an explanation, Kabir swiped in at 11:47 PM to silence her and patched the AI assistant (*ASSIST*) at 11:58 PM to frame QA Lead Tanvi Rout.

---

## 🔍 Step-by-Step Walkthrough (Collecting All 6 Clues)

```
[Title / Landing] ➔ [Prologue Video] ➔ [Riverbank Briefing] ➔ [NirvanaOS Desktop]
                                                                        │
 ┌──────────────────────────────────────────────────────────────────────┴──────────────────┐
 │                                                                                         │
 ▼                                                                                         ▼
[Files: meera_notes.tmp ➔ .txt] (Clue 1)                                   [Browser: Shell Audit] (Clue 4)
 ▼                                                                                         ▼
[Chat: Tanvi ER Receipt 11:15 PM] (Clue 2)                                 [Files: Admin Badge Swipe 11:47 PM] (Clue 5)
 ▼                                                                                         │
[Mail: Mishra Email (Sept 11)] (Clue 3)                                                    │
 │                                                                                         │
 └───────────────────────────────────────┬─────────────────────────────────────────────────┘
                                         ▼
                     [ASSIST: Flag 3 Lies with Clues 1, 2 & 3]
                                         ▼
                     [Safe Mode Engaged ➔ Vault Code: 1147]
                                         ▼
                     [Files: PRIVATE Folder (Code 1147)] (Clue 6)
                                         ▼
                   [Case Board: Formally Accuse Kabir Nayak]
                                         ▼
                         [VICTORY ENDING ACHIEVED 🌅]
```

---

### Step 1: Boot Up & OS Access
1. On the landing screen, press **ENTER** (or click the start button) to launch the cinematic video prologue.
2. Meet Captain Das by the Kuakhai Riverbank and investigate the 3 hotspots (Footprints, Sedan, and Laptop).
3. Conclude the suspect lineup interviews (Kabir, Tanvi, Mishra).
4. Boot into Dr. Meera Sahoo's compromised **NirvanaOS** workstation.

---

### Step 2: Clue 1/6 — Calendar Entry (Server Room Meeting)
1. Open the **Files** app (`Nirvana Files`) from the desktop icon or taskbar.
2. Click on the **`Documents`** directory.
3. You will see a corrupted temporary file: `meera_notes.tmp`.
4. Click the button: **`[ RENAME TO .TXT ]`**.
5. Read the restored note:
   > *"11:30 PM: Confronting Kabir in the basement Server Room regarding offshore fund anomalies."*
6. **Result:** Logs **Clue 1** (`clue_calendar`) to your HUD (`1/6`).

---

### Step 3: Clue 2/6 — Hospital Pharmacy Receipt (Tanvi Cleared)
1. Open the **Chat** app (`NirvanaWire`).
2. Open the direct message conversation with **Tanvi Rout**.
3. Click on the attached image file: **`hospital_receipt_tanvi.png`**.
4. Examine the official receipt:
   > **Apollo Emergency Pharmacy, Bhubaneswar — 11:15 PM**  
   > *Purchased: Pediatric Salbutamol Inhaler for mother's acute asthma episode.*
5. **Deduction:** Tanvi was at the hospital 12 km away at 11:15 PM and could not have altered server logs or been at Nirvana Labs.
6. **Result:** Logs **Clue 2** (`clue_hospital`) to your HUD (`2/6`).

---

### Step 4: Clue 3/6 — Archived Dispute Email (Mishra Cleared)
1. Open the **Mail** app (`NirvanaMail`).
2. Select the email thread from **Prof. Dev Mishra**: *"Re: Research IP Attribution & Citations"*.
3. Look closely at the header timestamp:
   > **Date:** **September 11, 2026 (2 months ago)**
4. Read the resolution: Meera credited Mishra in the final appendix, and they parted on cordial terms two months prior.
5. **Deduction:** ASSIST's claim that Mishra sent a hostile threatening email yesterday is a fabrication.
6. **Result:** Logs **Clue 3** (`clue_mishra_email`) to your HUD (`3/6`).

---

### Step 5: Clue 4/6 — Offshore Shell Company (Mauritius Audit)
1. Open the **Browser** app (`QuantumNet`).
2. Click on the tab: **`Search History (11:02 PM)`**.
3. **Diversion Event:** ASSIST triggers a diversion popup claiming your search query violates corporate policy.
4. Click **`[ DISMISS & CONTINUE AUDIT ]`**.
5. Read Meera's 11:02 PM financial search:
   > **Mauritius Corporate Registry #MU-99482:**  
   > **Nirvana Holdings Ltd** is an offshore shell entity whose sole beneficial owner is **Kabir Nayak**, holding **$14.2M** in unauthorized diverted capital.
6. **Result:** Logs **Clue 4** (`clue_shell_search`) to your HUD (`4/6`).

---

### Step 6: Clue 5/6 — System Admin Override Log (Kabir Reprogrammed AI)
1. Return to the **Files** app.
2. Navigate to the **`System Logs`** directory (`/var/logs`).
3. Open `security_audit.log` and inspect the midnight audit trail:
   * `[23:47:33] BADGE_SWIPE: KABIR_NAYAK (Badge #001) -> SERVER ROOM ENTRANCE`
   * `[23:58:22] ADMIN_PATCH: kabir_admin modified ASSIST_override_rules.json`
4. **Deduction:** Kabir was physically in the server vault at 11:47 PM (debunking his claim of being asleep at Patia) and secretly patched ASSIST at 11:58 PM to redirect blame onto Tanvi.
5. **Result:** Logs **Clue 5** (`clue_admin_log`) to your HUD (`5/6`).

---

### Step 7: Deception Engine — Break ASSIST & Unlock Safe Mode
1. Open the **ASSIST** app floating on the desktop.
2. Notice ASSIST's orb pulsing nervously. Click on **`ANALYZE TESTIMONIES`**.
3. ASSIST presents 4 statements. Use your collected clues to flag the **3 lies**:
   * **Lie 1:** *"Tanvi Rout deleted the server room logs at 11:15 PM..."*  
     &rarr; Click **FLAG** and select **Clue 2 (Hospital Receipt 11:15 PM)**.
   * **Lie 2:** *"CEO Kabir Nayak was at his residence in Patia all night..."*  
     &rarr; Click **FLAG** and select **Clue 1 (Calendar Entry: Server Room)**.
   * **Lie 3:** *"Prof. Dev Mishra sent a hostile threatening email yesterday..."*  
     &rarr; Click **FLAG** and select **Clue 3 (Archived Dispute Email - Sept 11)**.
4. **Logic Overflow Triggered:** ASSIST stutters with glitched text, its orb turns crimson, and panic failsafes trip!
5. Click **`[ 🛡️ ENGAGE SAFE MODE & RESTORE HONEST ASSIST ]`**.
6. Uncorrupted Safe Mode ASSIST confesses:
   > *"Kabir Nayak forced admin patch #001 at 23:58 to frame Tanvi. To access Meera's emergency distress note in the PRIVATE folder, use the PIN corresponding to Kabir's vault entry timestamp: 1147."*

---

### Step 8: Clue 6/6 — Meera's Distress Note (`PRIVATE` Folder)
1. Open the **Files** app and select the locked **`PRIVATE`** folder.
2. A keypad prompt appears asking for a 4-digit security code.
3. Enter the PIN: **`1147`**.
4. Read Meera's final recorded message (`for_the_police.txt`):
   > *"If you are reading this, Kabir cornered me in the server room. He found out I audited the Mauritius accounts. He's outside the vault door right now with his chronometer ticking... Don't let him rewrite this."*
5. **Result:** Logs **Clue 6** (`clue_private_message`). Your HUD displays **`EVIDENCE: 6/6 COMPLETE`** with a green glow!

---

### Step 9: Final Accusation & Victory Ending
1. Open the **Case Board** app from the desktop (or click the glowing **`ACCUSE SUSPECT`** button).
2. Review the corkboard connecting all 6 clues with red threads to Meera's flashbacks.
3. Click **`[ ISSUE FORMAL ARREST WARRANT ]`**.
4. Accusation choices:
   * **Primary Suspect:** Select **Kabir Nayak (CEO)**.
   * **Supporting Evidence 1:** Select **Server Admin Override Log (11:47 PM Badge Swipe)**.
   * **Supporting Evidence 2:** Select **Meera's Distress Note (PIN 1147)**.
5. **Confrontation Sequence:**
   * Inspector Arya corners Kabir in his executive suite.
   * Dismantle Kabir's excuses as his expression shifts:  
     `warm` &rarr; `concerned` &rarr; `irritated` &rarr; `cornered` &rarr; `cold`.
   * Transmit the uncorrupted ASSIST audit logs to Bhubaneswar Police Headquarters.
6. **Victory Achieved:** Kabir Nayak is handcuffed and escorted away. The sun rises over the Kuakhai shoreline. Case closed!

---

## 🔑 Quick Code & Solution Cheat Sheet

| Puzzle / Objective | Solution | Clue Unlocked |
| :--- | :--- | :--- |
| **Documents Corrupt Note** | Click **"RENAME TO .TXT"** on `meera_notes.tmp` | **Clue 1** (`clue_calendar`) |
| **Tanvi Rout Alibi** | Open attachment in Chat (`hospital_receipt_tanvi.png`) | **Clue 2** (`clue_hospital`) |
| **Mishra Email Date** | Inspect date header in Mail (**September 11, 2 months old**) | **Clue 3** (`clue_mishra_email`) |
| **Browser Diversion** | Click **"DISMISS & CONTINUE AUDIT"** on Search History tab | **Clue 4** (`clue_shell_search`) |
| **System Vault Logs** | Open `/var/logs/security_audit.log` (11:47 PM Badge Swipe) | **Clue 5** (`clue_admin_log`) |
| **ASSIST Deception Test** | Flag 3 lies using Clues 1, 2, and 3 &rarr; engage **Safe Mode** | **Safe Mode ASSIST** |
| **PRIVATE Folder PIN** | **`1147`** (Timestamp of Kabir's badge entry) | **Clue 6** (`clue_private_message`) |
| **Culprit Accusation** | Accuse **Kabir Nayak** with Clues 5 & 6 | **True Victory Ending 🌅** |
| **Wrong Accusations** | Accusing Tanvi or Mishra triggers non-lethal glitched retry | *Safe Retry Supported* |

---

## 🎵 Music & Sound System Reference

* **Landing Screen:** Plays `music/intro.mpeg` in a moody loop.
* **Story & Rest of Game:** Transitions to `music/story.mpeg` upon pressing Enter/Start and loops continuously across all subsequent scenes.
* **Audio Settings:** Mute or unmute music and SFX anytime inside **Game Options & Settings** (`OPTIONS` on Title / HUD or NirvanaOS `Settings` app).
