// Flashback Scenes Data with Vector Art Illustrations

export const FLASHBACKS = [
  {
    id: 'flashback_meeting',
    clueId: 'clue_calendar',
    title: 'Flashback I — The Meeting',
    caption: '11:30 PM: Dr. Meera Sahoo glances at her watch in the dimly lit corridor, clutching her terminal as she heads down to the basement server vault to meet Kabir.',
    svg: `
      <svg viewBox="0 0 700 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="fg1" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="#2a3b5c"/>
            <stop offset="100%" stop-color="#080c14"/>
          </radialGradient>
          <linearGradient id="doorGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#3DF5FF" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#3DF5FF" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect width="700" height="360" fill="url(#fg1)"/>
        <!-- Server Corridor Perspective -->
        <polygon points="120,40 580,40 680,340 20,340" fill="#101828"/>
        <line x1="120" y1="40" x2="20" y2="340" stroke="#3DF5FF" stroke-width="2" opacity="0.4"/>
        <line x1="580" y1="40" x2="680" y2="340" stroke="#3DF5FF" stroke-width="2" opacity="0.4"/>
        <line x1="280" y1="40" x2="220" y2="340" stroke="#3DF5FF" stroke-width="1" stroke-dasharray="8 6" opacity="0.2"/>
        <line x1="420" y1="40" x2="480" y2="340" stroke="#3DF5FF" stroke-width="1" stroke-dasharray="8 6" opacity="0.2"/>
        <!-- Vault Door -->
        <rect x="310" y="70" width="80" height="150" fill="#162238" stroke="#3DF5FF" stroke-width="2"/>
        <circle cx="370" cy="140" r="4" fill="#FFB84D"/>
        <!-- Meera Silhouette in Warm Gold Glow -->
        <g transform="translate(320, 160)">
          <!-- Golden Halo Rim -->
          <ellipse cx="30" cy="80" rx="45" ry="70" fill="none" stroke="#FFB84D" stroke-width="3" opacity="0.5"/>
          <!-- Lab coat / body -->
          <path d="M15,45 Q5,85 0,130 L60,130 Q55,85 45,45 Z" fill="#FFB84D" opacity="0.85"/>
          <!-- Scarf pattern -->
          <path d="M22,45 L38,45 L35,80 L25,80 Z" fill="#9e2a2b"/>
          <!-- Head & Bun with Pencil -->
          <circle cx="30" cy="28" r="16" fill="#f8c291"/>
          <circle cx="30" cy="14" r="8" fill="#2d3436"/>
          <line x1="20" y1="12" x2="42" y2="16" stroke="#f39c12" stroke-width="2"/>
          <!-- Round Glasses -->
          <circle cx="26" cy="27" r="4" fill="none" stroke="#000" stroke-width="1.5"/>
          <circle cx="34" cy="27" r="4" fill="none" stroke="#000" stroke-width="1.5"/>
          <line x1="30" y1="27" x2="31" y2="27" stroke="#000" stroke-width="1.5"/>
        </g>
        <!-- Digital Timestamp overlay -->
        <text x="350" y="325" fill="#FFB84D" font-family="Courier, monospace" font-size="14" font-weight="bold" text-anchor="middle">
          23:30:14 IST — SERVER ROOM ACCESS CORRIDOR
        </text>
      </svg>
    `
  },
  {
    id: 'flashback_hospital',
    clueId: 'clue_hospital',
    title: 'Flashback II — The Hospital',
    caption: '11:15 PM: Tanvi sits in the cold neon light of City General Hospital waiting room, checking pharmacy prescriptions for her ailing mother while holding her phone.',
    svg: `
      <svg viewBox="0 0 700 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="360" fill="#0d1622"/>
        <!-- Hospital Wall & Strip Lights -->
        <rect x="0" y="0" width="700" height="240" fill="#132133"/>
        <rect x="60" y="20" width="180" height="12" rx="4" fill="#ffffff" opacity="0.8"/>
        <rect x="460" y="20" width="180" height="12" rx="4" fill="#ffffff" opacity="0.8"/>
        <!-- Medical Cross Sign -->
        <g transform="translate(560, 70)" opacity="0.4">
          <rect x="25" y="10" width="10" height="40" fill="#FF7AD9"/>
          <rect x="10" y="25" width="40" height="10" fill="#FF7AD9"/>
        </g>
        <!-- Bench -->
        <rect x="180" y="230" width="340" height="16" rx="4" fill="#34495e"/>
        <rect x="210" y="246" width="12" height="70" fill="#2c3e50"/>
        <rect x="480" y="246" width="12" height="70" fill="#2c3e50"/>
        <!-- Tanvi Figure in Yellow Hoodie -->
        <g transform="translate(300, 140)">
          <!-- Yellow Hoodie Body -->
          <path d="M20,50 Q-5,80 5,120 L65,120 Q75,80 50,50 Z" fill="#f1c40f"/>
          <!-- Head & Messy Hair -->
          <circle cx="35" cy="35" r="16" fill="#f8c291"/>
          <path d="M22,30 Q35,16 48,30 Q45,20 30,20 Z" fill="#2d3436"/>
          <!-- Headphones around neck -->
          <path d="M22,46 Q35,56 48,46" stroke="#e84393" stroke-width="4" fill="none"/>
          <!-- Glowing Phone Screen in Hands -->
          <rect x="28" y="85" width="14" height="22" rx="2" fill="#3DF5FF"/>
        </g>
        <!-- Stamped Receipt Slip Floating in Pink Accent -->
        <g transform="translate(430, 160)">
          <rect width="110" height="70" rx="3" fill="#ffffff" stroke="#FF7AD9" stroke-width="2"/>
          <text x="10" y="22" font-family="Courier, monospace" font-size="9" fill="#e84393" font-weight="bold">CITY HOSPITAL ER</text>
          <text x="10" y="40" font-family="Courier, monospace" font-size="8" fill="#333">Rx: Tanvi Rout</text>
          <text x="10" y="56" font-family="Courier, monospace" font-size="10" fill="#c0392b" font-weight="bold">STAMP: 11:15 PM</text>
        </g>
        <text x="350" y="335" fill="#FF7AD9" font-family="Courier, monospace" font-size="14" font-weight="bold" text-anchor="middle">
          23:15:00 IST — CITY GENERAL HOSPITAL WARD 4
        </text>
      </svg>
    `
  },
  {
    id: 'flashback_old_argument',
    clueId: 'clue_mishra_email',
    title: 'Flashback III — The Old Argument',
    caption: 'Two Months Ago (September 11): Prof. Mishra loudly accused Meera in the faculty quad over algorithmic co-authorship. Heated words were spoken, but the dispute ended that autumn.',
    svg: `
      <svg viewBox="0 0 700 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="360" fill="#0b1712"/>
        <!-- Academic Hallway with Bookcases -->
        <rect x="40" y="40" width="140" height="240" fill="#142820" stroke="#8FD694" stroke-width="1" opacity="0.5"/>
        <line x1="40" y1="100" x2="180" y2="100" stroke="#8FD694" stroke-width="1" opacity="0.4"/>
        <line x1="40" y1="160" x2="180" y2="160" stroke="#8FD694" stroke-width="1" opacity="0.4"/>
        <line x1="40" y1="220" x2="180" y2="220" stroke="#8FD694" stroke-width="1" opacity="0.4"/>
        <!-- Calendar on Wall Marked SEPT -->
        <g transform="translate(540, 50)">
          <rect width="70" height="80" rx="3" fill="#ffffff"/>
          <rect width="70" height="22" rx="3" fill="#c0392b"/>
          <text x="35" y="16" fill="#fff" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">SEPT 11</text>
          <text x="35" y="55" fill="#333" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">11</text>
        </g>
        <!-- Mishra Figure with Cane -->
        <g transform="translate(240, 110)">
          <!-- Cardigan -->
          <path d="M20,60 Q0,90 5,140 L65,140 Q70,90 50,60 Z" fill="#2d523e"/>
          <!-- Head with grey hair & beard -->
          <circle cx="35" cy="35" r="18" fill="#f8c291"/>
          <path d="M20,30 Q35,15 50,30" stroke="#bdc3c7" stroke-width="8" fill="none"/>
          <path d="M24,42 Q35,62 46,42 Z" fill="#ecf0f1"/>
          <!-- Wooden Cane -->
          <path d="M-8,90 Q-15,80 -5,75 L-5,160" stroke="#795548" stroke-width="4" fill="none"/>
        </g>
        <!-- Meera listening calmly -->
        <g transform="translate(410, 120)">
          <path d="M15,50 Q5,85 0,130 L60,130 Q55,85 45,50 Z" fill="#FFB84D" opacity="0.7"/>
          <circle cx="30" cy="30" r="15" fill="#f8c291"/>
        </g>
        <text x="350" y="325" fill="#8FD694" font-family="Courier, monospace" font-size="14" font-weight="bold" text-anchor="middle">
          60 DAYS PRIOR — RESOLVED DEPARTMENTAL ARCHIVE
        </text>
      </svg>
    `
  },
  {
    id: 'flashback_discovery',
    clueId: 'clue_shell_search',
    title: 'Flashback IV — The Discovery',
    caption: '11:02 PM: Alone in her office, Meera traced the offshore banking entities registered under "Nirvana Holdings". The illicit ledger showed millions diverted by Kabir.',
    svg: `
      <svg viewBox="0 0 700 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="360" fill="#080e1b"/>
        <!-- Laptop Monitor Glowing Brightly -->
        <g transform="translate(180, 50)">
          <rect x="0" y="0" width="340" height="210" rx="6" fill="#141B2D" stroke="#3DF5FF" stroke-width="2"/>
          <rect x="15" y="15" width="310" height="180" fill="#070c14"/>
          <!-- Financial Table / Wire graph -->
          <text x="25" y="38" fill="#FF3B5C" font-family="Courier, monospace" font-size="11" font-weight="bold">
            ! NIRVANA HOLDINGS LTD [PORT LOUIS]
          </text>
          <text x="25" y="58" fill="#3DF5FF" font-family="Courier, monospace" font-size="10">
            ACCT: #904-8812-B &gt;&gt; DIVERTED: $14,200,000
          </text>
          <text x="25" y="78" fill="#FFB84D" font-family="Courier, monospace" font-size="10">
            SIGNATORY: KABIR NAYAK [SOLE BENEFICIARY]
          </text>
          <!-- Financial Graph -->
          <polyline points="30,160 90,140 150,150 210,100 280,75" stroke="#FF3B5C" stroke-width="3" fill="none"/>
        </g>
        <!-- Meera Hands on Keyboard -->
        <g transform="translate(240, 240)">
          <polygon points="0,0 220,0 240,40 -20,40" fill="#1e272e"/>
          <circle cx="50" cy="18" r="8" fill="#f8c291"/>
          <circle cx="170" cy="18" r="8" fill="#f8c291"/>
          <!-- Debug Life Mug -->
          <rect x="250" y="-15" width="28" height="36" rx="3" fill="#e67e22"/>
          <text x="254" y="8" fill="#fff" font-family="sans-serif" font-size="6">DEBUG</text>
        </g>
        <text x="350" y="330" fill="#FFB84D" font-family="Courier, monospace" font-size="14" font-weight="bold" text-anchor="middle">
          23:02:18 IST — UNRESTRICTED LEDGER AUDIT
        </text>
      </svg>
    `
  },
  {
    id: 'flashback_edit',
    clueId: 'clue_admin_log',
    title: 'Flashback V — The Edit',
    caption: '11:58 PM: A dark silhouette in a navy suit leans over Meera\'s laptop. Rapid keystrokes overwrite ASSIST\'s instructions, turning the AI into a deceptive shield.',
    svg: `
      <svg viewBox="0 0 700 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="360" fill="#0c070e"/>
        <!-- Laptop Glow with Red Glitch -->
        <rect x="220" y="100" width="260" height="160" rx="4" fill="#1a1a24" stroke="#FF3B5C" stroke-width="2"/>
        <rect x="235" y="115" width="230" height="130" fill="#14080a"/>
        <!-- ASSIST Orb on Screen Turning Red -->
        <circle cx="350" cy="170" r="28" fill="#FF3B5C" opacity="0.85"/>
        <circle cx="340" cy="165" r="4" fill="#fff"/>
        <circle cx="360" cy="165" r="4" fill="#fff"/>
        <path d="M340,182 Q350,175 360,182" stroke="#fff" stroke-width="2" fill="none"/>
        <text x="350" y="225" fill="#FF3B5C" font-family="Courier, monospace" font-size="9" text-anchor="middle">
          PATCHING: STEER_TO_TANVI.JSON
        </text>
        <!-- Looming Silhouette in Navy Suit adjusting Silver Watch -->
        <g transform="translate(290, 20)">
          <!-- Broad Suit Shoulders -->
          <path d="M-20,90 Q60,60 140,90 L120,200 L0,200 Z" fill="#0f1b2b"/>
          <!-- Combed Hair & Head Silhouette -->
          <circle cx="60" cy="45" r="30" fill="#080e18"/>
          <!-- Watch Reflection -->
          <ellipse cx="115" cy="170" rx="8" ry="4" fill="#ecf0f1" stroke="#7FB8FF" stroke-width="1.5"/>
        </g>
        <text x="350" y="325" fill="#FF3B5C" font-family="Courier, monospace" font-size="14" font-weight="bold" text-anchor="middle">
          23:58:22 IST — ADMIN PRIVILEGE OVERRIDE (kabir_admin)
        </text>
      </svg>
    `
  },
  {
    id: 'flashback_last_message',
    clueId: 'clue_private_message',
    title: 'Flashback VI — Her Last Message',
    caption: '12:01 AM: Hearing footsteps approaching the server vault, Meera encrypts her final distress dispatch into the PRIVATE vault with code 1147: the time of Kabir\'s swipe.',
    svg: `
      <svg viewBox="0 0 700 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="700" height="360" fill="#070b12"/>
        <!-- Heavy Server Vault Interior -->
        <rect x="80" y="30" width="120" height="260" fill="#10192a" stroke="#3DF5FF" stroke-width="1"/>
        <rect x="500" y="30" width="120" height="260" fill="#10192a" stroke="#3DF5FF" stroke-width="1"/>
        <!-- Blinking Rack LEDs -->
        <circle cx="100" cy="60" r="3" fill="#4DFFA6"/>
        <circle cx="100" cy="80" r="3" fill="#FF3B5C"/>
        <circle cx="100" cy="100" r="3" fill="#4DFFA6"/>
        <circle cx="520" cy="60" r="3" fill="#4DFFA6"/>
        <circle cx="520" cy="80" r="3" fill="#3DF5FF"/>
        <!-- Meera at Terminal Typing with Urgency -->
        <g transform="translate(290, 80)">
          <!-- Translucent Gold Glow -->
          <ellipse cx="60" cy="110" rx="80" ry="100" fill="none" stroke="#FFB84D" stroke-width="2" opacity="0.6"/>
          <!-- Lab coat -->
          <path d="M35,60 Q15,100 10,160 L110,160 Q105,100 85,60 Z" fill="#FFB84D" opacity="0.9"/>
          <circle cx="60" cy="38" r="22" fill="#f8c291"/>
          <!-- Scarf -->
          <path d="M48,60 L72,60 L68,100 L52,100 Z" fill="#9e2a2b"/>
          <!-- Glasses -->
          <circle cx="54" cy="36" r="5" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="66" cy="36" r="5" fill="none" stroke="#000" stroke-width="2"/>
        </g>
        <!-- Terminal Message Box -->
        <g transform="translate(230, 220)">
          <rect width="240" height="60" rx="4" fill="#050a12" stroke="#4DFFA6" stroke-width="2"/>
          <text x="12" y="24" fill="#4DFFA6" font-family="Courier, monospace" font-size="10" font-weight="bold">
            VAULT: CODE 1147 LOCKED
          </text>
          <text x="12" y="44" fill="#fff" font-family="Courier, monospace" font-size="9">
            "TRUST THE EVIDENCE, NOT ASSIST."
          </text>
        </g>
        <text x="350" y="325" fill="#4DFFA6" font-family="Courier, monospace" font-size="14" font-weight="bold" text-anchor="middle">
          00:01:45 IST — FINAL ENCRYPTED LOGOUT
        </text>
      </svg>
    `
  }
];

export function getFlashbackById(id) {
  return FLASHBACKS.find(f => f.id === id);
}

export function getFlashbackByClueId(clueId) {
  return FLASHBACKS.find(f => f.clueId === clueId);
}

