// Canonical Evidence Data - Strict adherence to BUILD.md & DESIGN.md

export const EVIDENCE_LIST = [
  {
    id: 'clue_calendar',
    title: 'Calendar Entry: Server Room',
    time: '11:30 PM',
    sourceApp: 'Files',
    filename: 'meera_notes.txt',
    description: 'An entry in Meera\'s recovered notes: "11:30 PM — Kabir, Server Room. Reviewing core ledger discrepancies."',
    interpretation: 'Meera scheduled a meeting with CEO Kabir Nayak inside the secure server room shortly before she disappeared.',
    flashbackId: 'flashback_meeting',
    isContradictionFor: 'lie_kabir_alibi'
  },
  {
    id: 'clue_hospital',
    title: 'Emergency Room Pharmacy Receipt',
    time: '11:15 PM',
    sourceApp: 'Chat',
    filename: 'hospital_receipt_tanvi.png',
    description: 'A time-stamped pharmacy invoice from City General Hospital ER made out to Tanvi Rout at 11:15 PM.',
    interpretation: 'Tanvi was attending to her sick mother miles away from Nirvana Labs at 11:15 PM. She is cleared of sabotage.',
    flashbackId: 'flashback_hospital',
    isContradictionFor: 'lie_tanvi_sabotage'
  },
  {
    id: 'clue_mishra_email',
    title: 'Archived Dispute Email',
    time: '2 Months Ago (Sept 11)',
    sourceApp: 'Mail',
    filename: 'Re: Research IP Attribution',
    description: 'An email from Prof. Mishra fiercely arguing about algorithmic patent attribution. Stamped September 11.',
    interpretation: 'The quarrel between Mishra and Meera took place two months ago and was resolved. He had no recent contact on the night of disappearance.',
    flashbackId: 'flashback_old_argument',
    isContradictionFor: 'lie_mishra_threat'
  },
  {
    id: 'clue_shell_search',
    title: 'Offshore Audit & Search History',
    time: '11:02 PM',
    sourceApp: 'Browser',
    filename: 'Intranet Query: Nirvana Holdings',
    description: 'Meera\'s browser cache from 11:02 PM shows detailed searches into shell companies and illicit fund diversions in Mauritius.',
    interpretation: 'Meera uncovered evidence of large-scale corporate embezzlement orchestrated under Nirvana Holdings.',
    flashbackId: 'flashback_discovery',
    isContradictionFor: null
  },
  {
    id: 'clue_admin_log',
    title: 'System Admin Override Log',
    time: '11:58 PM',
    sourceApp: 'Browser/System',
    filename: 'auth_override.log',
    description: 'Security log: [11:58:22 PM] kabir_admin applied root patch to ASSIST core directives: "Target focus: Tanvi Rout. Suppress server logs."',
    interpretation: 'Kabir Nayak accessed the admin terminal at 11:58 PM to reprogram ASSIST into lying and framing Tanvi.',
    flashbackId: 'flashback_edit',
    isContradictionFor: null
  },
  {
    id: 'clue_private_message',
    title: 'Meera\'s Recorded Distress Note',
    time: '12:01 AM',
    sourceApp: 'Files (PRIVATE)',
    filename: 'for_the_police.txt',
    description: 'Decrypted message inside PRIVATE (Code 1147): "Kabir discovered I copied the offshore accounts. He is outside the server door. If anything happens to me, trust my notes, not his assistant."',
    interpretation: 'Meera\'s final testimony naming Kabir Nayak directly as her attacker before going dark at 12:03 AM.',
    flashbackId: 'flashback_last_message',
    isContradictionFor: null
  }
];

// Helper to get evidence by ID
export function getEvidenceById(id) {
  return EVIDENCE_LIST.find(e => e.id === id);
}

