// Headless verification test running on Node.js

import { gameState } from './src/game/game-state.js';
import { EVIDENCE_LIST } from './src/data/evidence.js';
import { FLASHBACKS } from './src/data/flashbacks.js';
import { CHARACTERS } from './src/data/characters.js';
import { getCharacterSVG } from './src/assets/characters.js';

console.log('--- 1. VERIFYING CHARACTERS AND SVG GENERATION ---');
let charCount = 0;
for (const [id, char] of Object.entries(CHARACTERS)) {
  for (const expr of char.expressions) {
    const svg = getCharacterSVG(id, expr, false, 120);
    if (!svg || !svg.includes('<svg')) {
      throw new Error(`Failed to render SVG for character ${id} expression ${expr}`);
    }
  }
  charCount++;
}
console.log(`✓ All ${charCount} characters rendered across all 5 expressions each!`);

console.log('\n--- 2. VERIFYING EVIDENCE AND FLASHBACKS ---');
if (EVIDENCE_LIST.length !== 6) throw new Error(`Expected 6 clues, got ${EVIDENCE_LIST.length}`);
if (FLASHBACKS.length !== 6) throw new Error(`Expected 6 flashbacks, got ${FLASHBACKS.length}`);

for (const e of EVIDENCE_LIST) {
  const fb = FLASHBACKS.find(f => f.id === e.flashbackId);
  if (!fb) throw new Error(`Missing flashback for clue: ${e.id}`);
  if (!fb.svg || !fb.svg.includes('<svg')) throw new Error(`Missing SVG for flashback: ${fb.id}`);
}
console.log('✓ All 6 clues correctly mapped to 6 illustrated flashbacks!');

console.log('\n--- 3. VERIFYING SUSPECT INTERVIEWS PROGRESSION ---');
gameState.reset();
if (gameState.areAllInterviewsDone()) throw new Error('Interviews should not be done initially');
gameState.markInterviewComplete('kabir');
gameState.markInterviewComplete('tanvi');
if (gameState.areAllInterviewsDone()) throw new Error('Should require all 3 interviews');
gameState.markInterviewComplete('mishra');
if (!gameState.areAllInterviewsDone()) throw new Error('All 3 interviews should now be complete');
console.log('✓ Suspect lineup interview gating functions correctly!');

console.log('\n--- 4. VERIFYING CLUE COLLECTION & DECEPTION ENGINE ---');
// Collect clues 1, 2, 3
gameState.collectClue('clue_calendar');
gameState.collectClue('clue_hospital');
gameState.collectClue('clue_mishra_email');
if (gameState.collectedClues.size !== 3) throw new Error('Expected 3 collected clues');
if (gameState.unlockedFlashbacks.size !== 3) throw new Error('Expected 3 unlocked flashbacks');

// Test flagging without evidence vs with evidence
const invalidFlag = gameState.flagAssistStatement('stmt_fake', 'clue_shell_search');
if (invalidFlag.status !== 'invalid') throw new Error('Expected invalid flag without clue');

// Flag 1
const flag1 = gameState.flagAssistStatement('stmt_tanvi', 'clue_hospital');
if (flag1.status !== 'valid') throw new Error('Expected flag 1 to be valid');

// Duplicate flag check
const dupFlag = gameState.flagAssistStatement('stmt_tanvi', 'clue_hospital');
if (dupFlag.status !== 'duplicate') throw new Error('Expected duplicate flag detection');

// Flag 2
const flag2 = gameState.flagAssistStatement('stmt_kabir', 'clue_calendar');
if (flag2.status !== 'valid') throw new Error('Expected flag 2 to be valid');

// Flag 3
const flag3 = gameState.flagAssistStatement('stmt_mishra', 'clue_mishra_email');
if (flag3.status !== 'valid') throw new Error('Expected flag 3 to be valid');

if (gameState.assistState.flagsCount !== 3) throw new Error('Expected 3 flags');
if (gameState.assistState.mood !== 'panicking') throw new Error('ASSIST should be in panicking state');
console.log('✓ ASSIST deception unmasking & panic state trigger verified!');

console.log('\n--- 5. VERIFYING SAFE MODE & CODE 1147 ---');
const safeModeRes = gameState.enableSafeMode();
if (!safeModeRes || gameState.assistState.mood !== 'honest') throw new Error('Safe Mode failed');
console.log('✓ Safe Mode successfully engaged!');

// Test code unlock for PRIVATE folder
const wrongCode = gameState.unlockPrivateFolder('1234');
if (wrongCode) throw new Error('Wrong code should fail');

const rightCode = gameState.unlockPrivateFolder('1147');
if (!rightCode || !gameState.privateFolderUnlocked) throw new Error('Code 1147 should unlock folder');
if (!gameState.collectedClues.has('clue_private_message')) throw new Error('Clue 6 should be collected');
console.log('✓ PRIVATE folder successfully unlocked with code 1147!');

// Collect remaining clues 4 and 5
gameState.collectClue('clue_shell_search');
gameState.collectClue('clue_admin_log');
if (gameState.collectedClues.size !== 6) throw new Error(`Expected 6/6 clues, got ${gameState.collectedClues.size}`);
console.log('✓ All 6/6 clues collected!');

console.log('\n=============================================');
console.log('>>> ALL VERIFICATION TESTS PASSED (100%) <<<');
console.log('=============================================');

