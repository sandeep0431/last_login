// Comprehensive SVG Character Generator for 7 Characters x 5 Expressions

export function getCharacterSVG(charId, expression = 'default', isSpeaking = false, size = 160) {
  switch (charId) {
    case 'arya':
      return renderArya(expression, isSpeaking, size);
    case 'meera':
      return renderMeera(expression, isSpeaking, size);
    case 'kabir':
      return renderKabir(expression, isSpeaking, size);
    case 'tanvi':
      return renderTanvi(expression, isSpeaking, size);
    case 'mishra':
      return renderMishra(expression, isSpeaking, size);
    case 'das':
      return renderDas(expression, isSpeaking, size);
    case 'assist':
      return renderAssist(expression, size);
    default:
      return renderArya(expression, isSpeaking, size);
  }
}

// 1. Arya (Lead Detective)
function renderArya(expr, isSpeaking, size) {
  // Expressions: neutral, curious, suspicious, shocked, determined
  let eyebrowLeft = 'M 60 72 Q 72 70 82 72';
  let eyebrowRight = 'M 98 72 Q 108 70 120 72';
  let mouthPath = isSpeaking ? 'M 82 118 Q 90 126 98 118 Z' : 'M 82 118 Q 90 120 98 118';
  let eyeShapeL = 'circle cx="72" cy="84" r="5"';
  let eyeShapeR = 'circle cx="108" cy="84" r="5"';

  if (expr === 'curious') {
    eyebrowRight = 'M 98 66 Q 108 62 120 66'; // raised right brow
    mouthPath = isSpeaking ? 'M 84 116 Q 90 125 96 116 Z' : 'M 84 118 Q 90 115 96 118';
  } else if (expr === 'suspicious') {
    eyebrowLeft = 'M 60 76 Q 72 74 82 72'; // furrowed
    eyebrowRight = 'M 98 70 Q 108 66 120 70';
    eyeShapeL = 'ellipse cx="72" cy="85" rx="5" ry="2.5"';
    mouthPath = isSpeaking ? 'M 82 120 Q 90 125 98 118 Z' : 'M 84 120 L 96 118';
  } else if (expr === 'shocked') {
    eyebrowLeft = 'M 60 64 Q 72 60 82 64';
    eyebrowRight = 'M 98 64 Q 108 60 120 64';
    eyeShapeL = 'circle cx="72" cy="83" r="6.5"';
    eyeShapeR = 'circle cx="108" cy="83" r="6.5"';
    mouthPath = isSpeaking ? 'ellipse cx="90" cy="120" rx="7" ry="9"' : 'ellipse cx="90" cy="120" rx="5" ry="7"';
  } else if (expr === 'determined') {
    eyebrowLeft = 'M 60 73 Q 72 77 82 75';
    eyebrowRight = 'M 98 75 Q 108 77 120 73';
    mouthPath = isSpeaking ? 'M 82 118 Q 90 124 98 118 Z' : 'M 82 118 L 98 118';
  }

  const mouthTag = mouthPath.startsWith('ellipse') 
    ? `<${mouthPath} fill="#2c3e50" />`
    : `<path d="${mouthPath}" stroke="#2c3e50" stroke-width="2.5" fill="${isSpeaking ? '#2c3e50' : 'none'}" stroke-linecap="round"/>`;

  return `
    <svg viewBox="0 0 180 180" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" class="char-svg">
      <defs>
        <radialGradient id="rimArya" cx="50%" cy="40%" r="55%">
          <stop offset="70%" stop-color="#3DF5FF" stop-opacity="0"/>
          <stop offset="100%" stop-color="#3DF5FF" stop-opacity="0.35"/>
        </radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="#141B2D" stroke="#3DF5FF" stroke-width="2" />
      <circle cx="90" cy="90" r="86" fill="url(#rimArya)" />
      
      <!-- Body & Trench Coat -->
      <g class="anim-breathe">
        <path d="M 35 180 L 45 138 Q 90 126 135 138 L 145 180 Z" fill="#1e272e" />
        <path d="M 52 140 L 90 178 L 128 140" fill="#2d3436" />
        <!-- Cyan Forensic Lanyard & Badge -->
        <path d="M 80 142 L 84 180 L 96 180 L 100 142" stroke="#3DF5FF" stroke-width="2" fill="none" />
        <rect x="83" y="162" width="14" height="18" rx="2" fill="#3DF5FF" />
        <rect x="85" y="165" width="10" height="4" fill="#0B0F1A" />
      </g>

      <!-- Head & Short Hair -->
      <g class="${isSpeaking ? 'anim-talking' : ''}">
        <ellipse cx="90" cy="94" rx="36" ry="42" fill="#fad390" />
        <!-- Dark Short Cropped Hair -->
        <path d="M 52 86 C 48 50, 70 42, 90 42 C 114 42, 132 50, 128 86 C 122 62, 110 52, 90 52 C 70 52, 58 64, 52 86 Z" fill="#1e272e" />
        <!-- Hair Fringe -->
        <path d="M 56 65 Q 75 75 90 62 Q 105 75 124 65 Q 110 54 90 54 Q 70 54 56 65 Z" fill="#1e272e" />
        
        <!-- Eyebrows -->
        <path d="${eyebrowLeft}" stroke="#1e272e" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="${eyebrowRight}" stroke="#1e272e" stroke-width="3" stroke-linecap="round" fill="none"/>

        <!-- Eyes -->
        <g class="anim-blink">
          <${eyeShapeL} fill="#1e272e" />
          <circle cx="74" cy="82" r="1.5" fill="#ffffff" />
          <${eyeShapeR} fill="#1e272e" />
          <circle cx="110" cy="82" r="1.5" fill="#ffffff" />
        </g>

        <!-- Nose -->
        <path d="M 90 92 L 88 102 L 93 103" stroke="#e17055" stroke-width="1.8" fill="none" stroke-linecap="round" />

        <!-- Mouth -->
        ${mouthTag}
      </g>
    </svg>
  `;
}

// 2. Meera (Missing System Architect)
function renderMeera(expr, isSpeaking, size) {
  // Expressions: smiling, focused, worried, scared, determined
  let eyebrowL = 'M 60 70 Q 72 68 82 70';
  let eyebrowR = 'M 98 70 Q 108 68 120 70';
  let mouthPath = isSpeaking ? 'M 82 118 Q 90 126 98 118 Z' : 'M 82 118 Q 90 124 98 118';
  let eyeShapeL = 'circle cx="72" cy="84" r="4.5"';
  let eyeShapeR = 'circle cx="108" cy="84" r="4.5"';

  if (expr === 'focused') {
    eyebrowL = 'M 62 73 Q 72 75 82 73';
    eyebrowR = 'M 98 73 Q 108 75 118 73';
    mouthPath = isSpeaking ? 'M 84 118 Q 90 123 96 118 Z' : 'M 84 118 L 96 118';
  } else if (expr === 'worried') {
    eyebrowL = 'M 60 67 Q 72 72 82 74';
    eyebrowR = 'M 98 74 Q 108 72 120 67';
    mouthPath = isSpeaking ? 'M 82 122 Q 90 116 98 122 Z' : 'M 83 122 Q 90 117 97 122';
  } else if (expr === 'scared') {
    eyebrowL = 'M 60 64 Q 72 72 82 73';
    eyebrowR = 'M 98 73 Q 108 72 120 64';
    eyeShapeL = 'circle cx="72" cy="84" r="6"';
    eyeShapeR = 'circle cx="108" cy="84" r="6"';
    mouthPath = isSpeaking ? 'ellipse cx="90" cy="120" rx="7" ry="8"' : 'ellipse cx="90" cy="121" rx="5" ry="6"';
  } else if (expr === 'determined') {
    eyebrowL = 'M 60 72 Q 72 76 82 74';
    eyebrowR = 'M 98 74 Q 108 76 120 72';
    mouthPath = isSpeaking ? 'M 82 118 Q 90 124 98 118 Z' : 'M 82 118 L 98 118';
  }

  const mouthTag = mouthPath.startsWith('ellipse')
    ? `<${mouthPath} fill="#2c3e50" />`
    : `<path d="${mouthPath}" stroke="#8c2a3e" stroke-width="2.5" fill="${isSpeaking ? '#8c2a3e' : 'none'}" stroke-linecap="round"/>`;

  return `
    <svg viewBox="0 0 180 180" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" class="char-svg">
      <defs>
        <radialGradient id="rimMeera" cx="50%" cy="40%" r="55%">
          <stop offset="65%" stop-color="#FFB84D" stop-opacity="0"/>
          <stop offset="100%" stop-color="#FFB84D" stop-opacity="0.4"/>
        </radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="#141B2D" stroke="#FFB84D" stroke-width="2" />
      <circle cx="90" cy="90" r="86" fill="url(#rimMeera)" />

      <!-- Body / White Lab Coat & Sambalpuri Scarf -->
      <g class="anim-breathe">
        <path d="M 38 180 L 46 138 Q 90 128 134 138 L 142 180 Z" fill="#ecf0f1" />
        <!-- Indigo & Red Ikat Scarf -->
        <path d="M 72 136 L 90 178 L 108 136 Z" fill="#1e3799" />
        <path d="M 78 140 L 90 170 L 102 140 Z" fill="#b71540" />
      </g>

      <!-- Head & Bun with Pencil -->
      <g class="${isSpeaking ? 'anim-talking' : ''}">
        <!-- Hair Bun on top -->
        <circle cx="90" cy="42" r="18" fill="#2c3e50" />
        <!-- Amber pencil thrust through bun -->
        <line x1="68" y1="38" x2="114" y2="44" stroke="#f39c12" stroke-width="3.5" stroke-linecap="round" />
        
        <!-- Face -->
        <ellipse cx="90" cy="94" rx="35" ry="40" fill="#f8c291" />
        <!-- Dark Loose Waves around face -->
        <path d="M 52 88 C 48 56, 70 48, 90 48 C 112 48, 132 56, 128 88 C 122 72, 108 60, 90 60 C 72 60, 58 72, 52 88 Z" fill="#2c3e50" />

        <!-- Round Glasses -->
        <circle cx="72" cy="84" r="13" fill="none" stroke="#2c3e50" stroke-width="2" />
        <circle cx="108" cy="84" r="13" fill="none" stroke="#2c3e50" stroke-width="2" />
        <line x1="85" y1="84" x2="95" y2="84" stroke="#2c3e50" stroke-width="2" />

        <!-- Eyebrows -->
        <path d="${eyebrowL}" stroke="#2c3e50" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="${eyebrowR}" stroke="#2c3e50" stroke-width="2.5" stroke-linecap="round" fill="none"/>

        <!-- Eyes -->
        <g class="anim-blink">
          <${eyeShapeL} fill="#2c3e50" />
          <circle cx="73" cy="83" r="1.5" fill="#ffffff" />
          <${eyeShapeR} fill="#2c3e50" />
          <circle cx="109" cy="83" r="1.5" fill="#ffffff" />
        </g>

        <!-- Nose -->
        <path d="M 90 92 L 89 101 L 93 102" stroke="#e17055" stroke-width="1.8" fill="none" stroke-linecap="round" />

        <!-- Mouth -->
        ${mouthTag}
      </g>
    </svg>
  `;
}

// 3. Kabir (Culprit & CEO)
function renderKabir(expr, isSpeaking, size) {
  // Expressions: warm, concerned, irritated, cornered, cold
  let eyebrowL = 'M 60 70 Q 72 68 82 72';
  let eyebrowR = 'M 98 72 Q 108 68 120 70';
  let mouthPath = isSpeaking ? 'M 80 118 Q 90 128 100 118 Z' : 'M 78 116 Q 90 126 102 116';
  let eyeShapeL = 'ellipse cx="72" cy="84" rx="5" ry="4"';
  let eyeShapeR = 'ellipse cx="108" cy="84" rx="5" ry="4"';

  if (expr === 'concerned') {
    eyebrowL = 'M 60 68 Q 72 73 82 75';
    eyebrowR = 'M 98 75 Q 108 73 120 68';
    mouthPath = isSpeaking ? 'M 82 120 Q 90 115 98 120 Z' : 'M 84 120 Q 90 117 96 120';
  } else if (expr === 'irritated') {
    eyebrowL = 'M 60 74 Q 72 78 82 75';
    eyebrowR = 'M 98 75 Q 108 78 120 74';
    mouthPath = isSpeaking ? 'M 82 120 L 98 117 L 98 123 Z' : 'M 82 120 L 98 117';
  } else if (expr === 'cornered') {
    eyebrowL = 'M 60 65 Q 72 74 82 75';
    eyebrowR = 'M 98 75 Q 108 74 120 65';
    eyeShapeL = 'circle cx="72" cy="84" r="6"';
    eyeShapeR = 'circle cx="108" cy="84" r="6"';
    mouthPath = isSpeaking ? 'ellipse cx="90" cy="120" rx="8" ry="7"' : 'ellipse cx="90" cy="120" rx="6" ry="5"';
  } else if (expr === 'cold') {
    eyebrowL = 'M 60 74 L 82 74';
    eyebrowR = 'M 98 74 L 120 74';
    eyeShapeL = 'ellipse cx="72" cy="84" rx="5" ry="2"';
    eyeShapeR = 'ellipse cx="108" cy="84" rx="5" ry="2"';
    mouthPath = isSpeaking ? 'M 84 120 L 96 120' : 'M 82 120 L 98 120';
  }

  const mouthTag = mouthPath.startsWith('ellipse')
    ? `<${mouthPath} fill="#2c3e50" />`
    : `<path d="${mouthPath}" stroke="#2c3e50" stroke-width="2.5" fill="${isSpeaking ? '#2c3e50' : 'none'}" stroke-linecap="round"/>`;

  return `
    <svg viewBox="0 0 180 180" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" class="char-svg">
      <defs>
        <radialGradient id="rimKabir" cx="50%" cy="40%" r="55%">
          <stop offset="65%" stop-color="#7FB8FF" stop-opacity="0"/>
          <stop offset="100%" stop-color="#7FB8FF" stop-opacity="0.38"/>
        </radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="#141B2D" stroke="#7FB8FF" stroke-width="2" />
      <circle cx="90" cy="90" r="86" fill="url(#rimKabir)" />

      <!-- Sharp Navy Suit (No tie) -->
      <g class="anim-breathe">
        <path d="M 32 180 L 44 135 Q 90 124 136 135 L 148 180 Z" fill="#0f2042" />
        <!-- Crisp White Shirt V-Neck -->
        <polygon points="76,134 90,165 104,134" fill="#ffffff" />
        <!-- Silver Watch on Left Wrist -->
        <g transform="translate(42, 162)">
          <rect width="14" height="8" rx="2" fill="#bdc3c7" stroke="#7FB8FF" stroke-width="1.5" />
          <circle cx="7" cy="4" r="2.5" fill="#ffffff" />
        </g>
      </g>

      <!-- Head & Combed Jet Hair -->
      <g class="${isSpeaking ? 'anim-talking' : ''}">
        <ellipse cx="90" cy="92" rx="35" ry="41" fill="#fad390" />
        <!-- Sharp Combed Hair Side-parted -->
        <path d="M 52 78 C 50 45, 75 36, 92 36 C 114 36, 130 46, 128 78 C 122 55, 105 46, 90 48 C 72 49, 58 60, 52 78 Z" fill="#1e272e" />

        <!-- Eyebrows -->
        <path d="${eyebrowL}" stroke="#1e272e" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="${eyebrowR}" stroke="#1e272e" stroke-width="3" stroke-linecap="round" fill="none"/>

        <!-- Eyes -->
        <g class="anim-blink">
          <${eyeShapeL} fill="#1e272e" />
          <circle cx="74" cy="83" r="1.5" fill="#ffffff" />
          <${eyeShapeR} fill="#1e272e" />
          <circle cx="110" cy="83" r="1.5" fill="#ffffff" />
        </g>

        <!-- Nose -->
        <path d="M 90 90 L 88 100 L 93 101" stroke="#e17055" stroke-width="1.8" fill="none" stroke-linecap="round" />

        <!-- Mouth -->
        ${mouthTag}
      </g>
    </svg>
  `;
}

// 4. Tanvi (Junior QA Engineer)
function renderTanvi(expr, isSpeaking, size) {
  // Expressions: defensive, teary, angry, relieved, hopeful
  let eyebrowL = 'M 60 74 Q 72 70 82 72';
  let eyebrowR = 'M 98 72 Q 108 70 120 74';
  let mouthPath = isSpeaking ? 'M 84 120 Q 90 126 96 120 Z' : 'M 84 120 L 96 120';
  let eyeShapeL = 'circle cx="72" cy="84" r="4.5"';
  let eyeShapeR = 'circle cx="108" cy="84" r="4.5"';

  if (expr === 'teary') {
    eyebrowL = 'M 60 68 Q 72 73 82 75';
    eyebrowR = 'M 98 75 Q 108 73 120 68';
    eyeShapeL = 'circle cx="72" cy="84" r="5.5"';
    eyeShapeR = 'circle cx="108" cy="84" r="5.5"';
    mouthPath = isSpeaking ? 'M 82 122 Q 90 116 98 122 Z' : 'M 84 122 Q 90 118 96 122';
  } else if (expr === 'angry') {
    eyebrowL = 'M 60 76 Q 72 78 82 74';
    eyebrowR = 'M 98 74 Q 108 78 120 76';
    mouthPath = isSpeaking ? 'M 82 122 Q 90 130 98 122 Z' : 'M 82 120 L 98 120';
  } else if (expr === 'relieved') {
    eyebrowL = 'M 60 70 Q 72 68 82 70';
    eyebrowR = 'M 98 70 Q 108 68 120 70';
    mouthPath = isSpeaking ? 'M 82 118 Q 90 125 98 118 Z' : 'M 82 118 Q 90 124 98 118';
  } else if (expr === 'hopeful') {
    eyebrowL = 'M 60 68 Q 72 66 82 68';
    eyebrowR = 'M 98 68 Q 108 66 120 68';
    eyeShapeL = 'circle cx="72" cy="83" r="5.5"';
    eyeShapeR = 'circle cx="108" cy="83" r="5.5"';
    mouthPath = isSpeaking ? 'M 82 118 Q 90 126 98 118 Z' : 'M 82 118 Q 90 125 98 118';
  }

  const mouthTag = `<path d="${mouthPath}" stroke="#e84393" stroke-width="2.5" fill="${isSpeaking ? '#e84393' : 'none'}" stroke-linecap="round"/>`;

  return `
    <svg viewBox="0 0 180 180" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" class="char-svg">
      <defs>
        <radialGradient id="rimTanvi" cx="50%" cy="40%" r="55%">
          <stop offset="65%" stop-color="#FF7AD9" stop-opacity="0"/>
          <stop offset="100%" stop-color="#FF7AD9" stop-opacity="0.38"/>
        </radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="#141B2D" stroke="#FF7AD9" stroke-width="2" />
      <circle cx="90" cy="90" r="86" fill="url(#rimTanvi)" />

      <!-- Oversized Yellow Hoodie -->
      <g class="anim-breathe">
        <path d="M 34 180 L 44 135 Q 90 124 136 135 L 146 180 Z" fill="#f1c40f" />
        <path d="M 64 138 Q 90 156 116 138" stroke="#d4ac0d" stroke-width="3" fill="none" />
      </g>

      <!-- Pink Gaming Headset around neck -->
      <path d="M 50 135 Q 90 162 130 135" stroke="#FF7AD9" stroke-width="6" fill="none" stroke-linecap="round" />
      <circle cx="50" cy="135" r="8" fill="#e84393" />
      <circle cx="130" cy="135" r="8" fill="#e84393" />

      <!-- Head & Messy Short Hair -->
      <g class="${isSpeaking ? 'anim-talking' : ''}">
        <ellipse cx="90" cy="94" rx="34" ry="39" fill="#f8c291" />
        <!-- Messy Short Hair -->
        <path d="M 50 86 C 45 52, 65 42, 90 42 C 115 42, 135 52, 130 86 C 120 62, 106 50, 90 50 C 74 50, 60 62, 50 86 Z" fill="#2d3436" />
        <path d="M 52 70 L 60 84 L 66 72 L 76 86 L 86 68 L 98 86 L 110 70 L 120 84 L 126 68" stroke="#2d3436" stroke-width="3" fill="none" />

        <!-- Eyebrows -->
        <path d="${eyebrowL}" stroke="#2d3436" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="${eyebrowR}" stroke="#2d3436" stroke-width="2.5" stroke-linecap="round" fill="none"/>

        <!-- Eyes -->
        <g class="anim-blink">
          <${eyeShapeL} fill="#2d3436" />
          <circle cx="73" cy="83" r="1.5" fill="#ffffff" />
          <${eyeShapeR} fill="#2d3436" />
          <circle cx="109" cy="83" r="1.5" fill="#ffffff" />
        </g>

        <!-- Tear drop for teary expression -->
        ${expr === 'teary' ? '<circle cx="75" cy="94" r="2.5" fill="#3DF5FF" />' : ''}

        <!-- Nose -->
        <path d="M 90 92 L 89 100 L 92 101" stroke="#e17055" stroke-width="1.8" fill="none" stroke-linecap="round" />

        <!-- Mouth -->
        ${mouthTag}
      </g>
    </svg>
  `;
}

// 5. Prof. Dev Mishra (Senior Research Advisor)
function renderMishra(expr, isSpeaking, size) {
  // Expressions: grumpy, wounded, sarcastic, softened, sad
  let eyebrowL = 'M 60 74 Q 72 76 82 74';
  let eyebrowR = 'M 98 74 Q 108 76 120 74';
  let mouthPath = isSpeaking ? 'M 84 122 Q 90 128 96 122 Z' : 'M 84 122 L 96 122';

  if (expr === 'wounded') {
    eyebrowL = 'M 60 68 Q 72 73 82 75';
    eyebrowR = 'M 98 75 Q 108 73 120 68';
    mouthPath = isSpeaking ? 'M 84 124 Q 90 118 96 124 Z' : 'M 84 124 Q 90 120 96 124';
  } else if (expr === 'sarcastic') {
    eyebrowR = 'M 98 67 Q 108 63 120 67'; // raised brow
    mouthPath = isSpeaking ? 'M 82 120 Q 90 124 98 116 Z' : 'M 82 122 Q 92 122 98 118';
  } else if (expr === 'softened') {
    eyebrowL = 'M 60 70 Q 72 68 82 70';
    eyebrowR = 'M 98 70 Q 108 68 120 70';
    mouthPath = isSpeaking ? 'M 82 120 Q 90 126 98 120 Z' : 'M 82 120 Q 90 124 98 120';
  } else if (expr === 'sad') {
    eyebrowL = 'M 60 68 Q 72 74 82 76';
    eyebrowR = 'M 98 76 Q 108 74 120 68';
    mouthPath = isSpeaking ? 'M 84 124 Q 90 118 96 124 Z' : 'M 84 124 Q 90 119 96 124';
  }

  const mouthTag = `<path d="${mouthPath}" stroke="#2c3e50" stroke-width="2.5" fill="${isSpeaking ? '#2c3e50' : 'none'}" stroke-linecap="round"/>`;

  return `
    <svg viewBox="0 0 180 180" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" class="char-svg">
      <defs>
        <radialGradient id="rimMishra" cx="50%" cy="40%" r="55%">
          <stop offset="65%" stop-color="#8FD694" stop-opacity="0"/>
          <stop offset="100%" stop-color="#8FD694" stop-opacity="0.38"/>
        </radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="#141B2D" stroke="#8FD694" stroke-width="2" />
      <circle cx="90" cy="90" r="86" fill="url(#rimMishra)" />

      <!-- Thick Wool Cardigan with Elbow Patches -->
      <g class="anim-breathe">
        <path d="M 34 180 L 44 135 Q 90 124 136 135 L 146 180 Z" fill="#2d523e" />
        <path d="M 70 134 L 90 180 L 110 134" fill="#1b3327" />
        <!-- Cane Handle on Side -->
        <path d="M 30 150 Q 22 136 34 130 L 34 180" stroke="#795548" stroke-width="4" fill="none" />
      </g>

      <!-- Head & Grey Beard / Glasses on chain -->
      <g class="${isSpeaking ? 'anim-talking' : ''}">
        <ellipse cx="90" cy="94" rx="35" ry="41" fill="#f8c291" />
        
        <!-- Receding Grey Hair -->
        <path d="M 54 84 C 50 50, 70 42, 90 42 C 110 42, 130 50, 126 84 C 120 62, 106 54, 90 54 C 74 54, 60 62, 54 84 Z" fill="#95a5a6" />
        <!-- Glasses Chain -->
        <path d="M 64 88 Q 90 126 116 88" stroke="#d4ac0d" stroke-width="1" fill="none" />
        <!-- Small Reading Glasses -->
        <rect x="62" y="80" width="20" height="12" rx="2" fill="none" stroke="#2c3e50" stroke-width="1.8" />
        <rect x="98" y="80" width="20" height="12" rx="2" fill="none" stroke="#2c3e50" stroke-width="1.8" />
        <line x1="82" y1="86" x2="98" y2="86" stroke="#2c3e50" stroke-width="1.8" />

        <!-- Eyebrows (Bushy Grey) -->
        <path d="${eyebrowL}" stroke="#7f8c8d" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="${eyebrowR}" stroke="#7f8c8d" stroke-width="4" stroke-linecap="round" fill="none"/>

        <!-- Eyes -->
        <g class="anim-blink">
          <circle cx="72" cy="86" r="3.5" fill="#2c3e50" />
          <circle cx="108" cy="86" r="3.5" fill="#2c3e50" />
        </g>

        <!-- Thick Grey Beard -->
        <path d="M 64 106 Q 90 148 116 106 Q 106 142 90 144 Q 74 142 64 106 Z" fill="#bdc3c7" />

        <!-- Nose -->
        <path d="M 90 88 L 88 100 L 93 101" stroke="#e17055" stroke-width="2" fill="none" stroke-linecap="round" />

        <!-- Mouth inside beard -->
        ${mouthTag}
      </g>
    </svg>
  `;
}

// 6. Captain Das (Police Commander)
function renderDas(expr, isSpeaking, size) {
  // Expressions: neutral, tired, serious, concerned, reassuring
  let eyebrowL = 'M 60 72 Q 72 70 82 72';
  let eyebrowR = 'M 98 72 Q 108 70 120 72';
  let mouthPath = isSpeaking ? 'M 82 124 Q 90 130 98 124 Z' : 'M 82 124 L 98 124';

  if (expr === 'tired') {
    eyebrowL = 'M 60 70 Q 72 74 82 76';
    eyebrowR = 'M 98 76 Q 108 74 120 70';
  } else if (expr === 'serious') {
    eyebrowL = 'M 60 74 Q 72 76 82 72';
    eyebrowR = 'M 98 72 Q 108 76 120 74';
  } else if (expr === 'reassuring') {
    eyebrowL = 'M 60 70 Q 72 68 82 70';
    eyebrowR = 'M 98 70 Q 108 68 120 70';
    mouthPath = isSpeaking ? 'M 82 122 Q 90 128 98 122 Z' : 'M 82 122 Q 90 126 98 122';
  }

  return `
    <svg viewBox="0 0 180 180" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" class="char-svg">
      <defs>
        <radialGradient id="rimDas" cx="50%" cy="40%" r="55%">
          <stop offset="65%" stop-color="#C99A6B" stop-opacity="0"/>
          <stop offset="100%" stop-color="#C99A6B" stop-opacity="0.38"/>
        </radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="#141B2D" stroke="#C99A6B" stroke-width="2" />
      <circle cx="90" cy="90" r="86" fill="url(#rimDas)" />

      <!-- Khaki Police Uniform & Epaulets -->
      <g class="anim-breathe">
        <path d="M 32 180 L 44 135 Q 90 124 136 135 L 148 180 Z" fill="#6d543e" />
        <rect x="42" y="136" width="18" height="6" rx="2" fill="#c99a6b" />
        <rect x="120" y="136" width="18" height="6" rx="2" fill="#c99a6b" />
        <!-- Steaming Tea Cup in Hand -->
        <g transform="translate(132, 142)">
          <rect width="18" height="22" rx="3" fill="#ffffff" />
          <path d="M 4 -4 Q 8 -12 4 -18" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.6"/>
        </g>
      </g>

      <!-- Head & Thick Moustache -->
      <g class="${isSpeaking ? 'anim-talking' : ''}">
        <ellipse cx="90" cy="92" rx="36" ry="41" fill="#f8c291" />
        <!-- Short Military Crop -->
        <path d="M 54 78 C 50 48, 70 40, 90 40 C 110 40, 130 48, 126 78 Z" fill="#2d3436" />

        <!-- Eyebrows -->
        <path d="${eyebrowL}" stroke="#2d3436" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="${eyebrowR}" stroke="#2d3436" stroke-width="3" stroke-linecap="round" fill="none"/>

        <!-- Eyes with tired lower bags -->
        <g class="anim-blink">
          <circle cx="72" cy="84" r="4" fill="#2d3436" />
          <path d="M 64 92 Q 72 95 80 92" stroke="#d35400" stroke-width="1" fill="none" opacity="0.6" />
          <circle cx="108" cy="84" r="4" fill="#2d3436" />
          <path d="M 100 92 Q 108 95 116 92" stroke="#d35400" stroke-width="1" fill="none" opacity="0.6" />
        </g>

        <!-- Thick Indian Police Moustache -->
        <path d="M 66 114 Q 90 102 114 114 Q 90 126 66 114 Z" fill="#1e272e" />

        <!-- Nose -->
        <path d="M 90 88 L 88 100 L 93 101" stroke="#e17055" stroke-width="2" fill="none" stroke-linecap="round" />

        <!-- Mouth under moustache -->
        <path d="${mouthPath}" stroke="#2c3e50" stroke-width="2" fill="none" />
      </g>
    </svg>
  `;
}

// 7. ASSIST (Lying AI Helper)
function renderAssist(expr, size) {
  // Moods: friendly, thinking, lying, panicking, honest
  let ringColor = '#3DF5FF';
  let eyeOffsetL = 0;
  let eyeOffsetR = 0;
  let eyeY = 82;
  let eyeRadius = 5.5;
  let mouthPath = 'M 80 106 Q 90 114 100 106';
  let glitchElements = '';
  let ringDash = 'none';

  if (expr === 'thinking') {
    eyeY = 74; // looking upward
    mouthPath = 'M 82 106 Q 90 106 98 106'; // flat
    ringDash = '12 8';
  } else if (expr === 'lying') {
    eyeOffsetL = 6; // shifting sideways
    eyeOffsetR = 6;
    ringColor = '#FF3B5C'; // brief red glitch
    glitchElements = `
      <rect x="50" y="70" width="80" height="2" fill="#FF3B5C" opacity="0.8"/>
      <rect x="65" y="94" width="60" height="2" fill="#3DF5FF" opacity="0.8"/>
    `;
  } else if (expr === 'panicking') {
    eyeRadius = 3; // shrunken eyes
    mouthPath = 'M 80 112 Q 90 102 100 112'; // inverted grimace
    ringDash = '4 14 8 4'; // cracked ring look
    ringColor = '#FF3B5C';
  } else if (expr === 'honest') {
    ringColor = '#4DFFA6'; // soft safe green
    eyeRadius = 4.5;
    mouthPath = 'M 82 105 Q 90 112 98 105';
  }

  return `
    <svg viewBox="0 0 180 180" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" class="char-svg">
      <defs>
        <radialGradient id="assistCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="45%" stop-color="${ringColor}" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#0B0F1A" stop-opacity="0.95"/>
        </radialGradient>
      </defs>

      <!-- Outer Light Ring -->
      <circle cx="90" cy="90" r="76" fill="none" stroke="${ringColor}" stroke-width="4" stroke-dasharray="${ringDash}" opacity="0.85" />
      <circle cx="90" cy="90" r="82" fill="none" stroke="${ringColor}" stroke-width="1.5" opacity="0.3" />

      <!-- Floating Luminous Core Orb -->
      <circle cx="90" cy="90" r="54" fill="url(#assistCore)" />

      <!-- Glitch artifacts when lying/panicking -->
      ${glitchElements}

      <!-- Eyes -->
      <g>
        <circle cx="${72 + eyeOffsetL}" cy="${eyeY}" r="${eyeRadius}" fill="#0B0F1A" />
        <circle cx="${72 + eyeOffsetL + 1}" cy="${eyeY - 1}" r="1.5" fill="#ffffff" />
        
        <circle cx="${108 + eyeOffsetR}" cy="${eyeY}" r="${eyeRadius}" fill="#0B0F1A" />
        <circle cx="${108 + eyeOffsetR + 1}" cy="${eyeY - 1}" r="1.5" fill="#ffffff" />
      </g>

      <!-- Curved-Line Mouth -->
      <path d="${mouthPath}" stroke="#0B0F1A" stroke-width="3" fill="none" stroke-linecap="round" />
    </svg>
  `;
}

