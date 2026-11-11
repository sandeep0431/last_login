// Dialogue Scripts & Branching Trees

export const DIALOGUE_DATA = {
  // Riverbank Inspections
  riverbank_tape: {
    speaker: 'arya',
    expression: 'suspicious',
    text: "Yellow police tape cordons off the Kuakhai river embankment. Dr. Sahoo's personal vehicle was found abandoned two hundred meters upstream.",
    choices: [
      { text: "Continue inspecting the shoreline.", next: null }
    ]
  },
  riverbank_footprints: {
    speaker: 'arya',
    expression: 'curious',
    text: "Two distinct sets of footprints in the wet river silt: one heavy work boot, and one pair of light leather oxfords. Scuffling marks near the gravel ledge.",
    choices: [
      { text: "Note the trail in forensic log.", next: null }
    ]
  },
  riverbank_laptop: {
    speaker: 'arya',
    expression: 'determined',
    text: "Dr. Meera Sahoo's Nirvana Labs field workstation. It's resting on a concrete pillar, still glowing in the dark rain. The session didn't terminate.",
    choices: [
      { text: "Take the laptop to Captain Das for briefing.", next: 'briefing_start' }
    ]
  },

  // Captain Das Briefing
  briefing_start: {
    speaker: 'das',
    expression: 'serious',
    text: "Inspector Arya. Good of you to get here fast. We sealed off the riverbank perimeter, but Dr. Meera Sahoo has been missing since midnight. What's your primary inquiry?",
    choices: [
      { id: 'das_q1', text: "Who reported her missing?", next: 'briefing_q1' },
      { id: 'das_q2', text: "Any known enemies or disputes?", next: 'briefing_q2' },
      { id: 'das_q3', text: "What evidence do we currently hold?", next: 'briefing_q3' }
    ]
  },
  briefing_q1: {
    speaker: 'das',
    expression: 'tired',
    text: "Kabir Nayak, CEO of Nirvana Labs himself. Called headquarters at 1:15 AM claiming Dr. Sahoo vanished with proprietary cryptographic storage.",
    choices: [
      { text: "Understood. What else?", next: 'briefing_closing' }
    ]
  },
  briefing_q2: {
    speaker: 'das',
    expression: 'concerned',
    text: "Her dismissed QA assistant, Tanvi Rout, was furious over being let go last week. And Prof. Mishra from the Institute had a bitter dispute over research IP.",
    choices: [
      { text: "I will interrogate them both.", next: 'briefing_closing' }
    ]
  },
  briefing_q3: {
    speaker: 'das',
    expression: 'serious',
    text: "Just this workstation found half-hidden on the shoreline. Screen was still active, logged into NirvanaOS. Her car was left with keys in the ignition.",
    choices: [
      { text: "Let's inspect the files.", next: 'briefing_closing' }
    ]
  },
  briefing_closing: {
    speaker: 'das',
    expression: 'serious',
    text: "The laptop was still logged in. Trust the evidence, Arya. Not the people.",
    statementRecord: "Captain Das: 'The laptop was still logged in. Trust the evidence, Arya. Not the people.'",
    choices: [
      { text: "Review the three prime persons of interest.", next: 'goto_suspects' }
    ]
  },

  // Suspect Lineup Interviews
  interview_kabir_1: {
    speaker: 'kabir',
    expression: 'warm',
    text: "Inspector Arya! Thank goodness the department assigned you. Meera is the heartbeat of Nirvana Labs. I was worried sick when her telemetry dropped.",
    choices: [
      { text: "When did you last see Dr. Sahoo in person?", next: 'interview_kabir_2' }
    ]
  },
  interview_kabir_2: {
    speaker: 'kabir',
    expression: 'concerned', // Tell: adjusts watch
    text: "Around 9:00 PM yesterday. We concluded our executive review and I drove straight home to my residence in Patia. I was in bed all night until the security alerts woke me.",
    choices: [
      { text: "Why did you call the police so urgently at 1:15 AM?", next: 'interview_kabir_3' }
    ]
  },
  interview_kabir_3: {
    speaker: 'kabir',
    expression: 'warm',
    text: "Our automated cloud safeguards flagged abnormal exfiltration from the basement server room. I feared someone had coerced her. Please, examine her laptop—you'll find the truth.",
    statementRecord: "Kabir Nayak: 'I was home in Patia all night after 9:00 PM. I only called police after automated server alerts.'",
    choices: [
      { text: "Conclude interview with Kabir Nayak.", next: 'finish_interview_kabir' }
    ]
  },

  interview_tanvi_1: {
    speaker: 'tanvi',
    expression: 'defensive',
    text: "Don't look at me like that, Inspector! Kabir told you to suspect me, didn't he? I was fired last week because I wouldn't rubber-stamp his fake audit logs!",
    choices: [
      { text: "Where were you between 11:00 PM and midnight?", next: 'interview_tanvi_2' }
    ]
  },
  interview_tanvi_2: {
    speaker: 'tanvi',
    expression: 'teary',
    text: "At City General Hospital ER! My mother suffered a severe asthma attack. I was standing in line at the hospital pharmacy until after 11:15 PM! Check my chat messages—I sent the receipt!",
    choices: [
      { text: "Did you speak with Dr. Sahoo last night?", next: 'interview_tanvi_3' }
    ]
  },
  interview_tanvi_3: {
    speaker: 'tanvi',
    expression: 'hopeful',
    text: "She pinged me warning me to stay safe and stay away from Nirvana Labs. Meera knew Kabir was hiding something dangerous in the server room. You have to believe me!",
    statementRecord: "Tanvi Rout: 'I was at City General Hospital ER at 11:15 PM getting medicine for my mother. I have the receipt.'",
    choices: [
      { text: "Conclude interview with Tanvi Rout.", next: 'finish_interview_tanvi' }
    ]
  },

  interview_mishra_1: {
    speaker: 'mishra',
    expression: 'grumpy',
    text: "Police harassment at my age? Dev Mishra does not skulk about riverbanks in the monsoon rain, young lady. What ridiculous accusation has Kabir fed you?",
    choices: [
      { text: "You had a heated public dispute with Dr. Sahoo over patent rights.", next: 'interview_mishra_2' }
    ]
  },
  interview_mishra_2: {
    speaker: 'mishra',
    expression: 'sarcastic',
    text: "That was in early September—two months ago! We argued over citations in the neural compression paper. She proved her theorem, I conceded, and we had tea. Read her archived mail!",
    choices: [
      { text: "Did you contact her yesterday night?", next: 'interview_mishra_3' }
    ]
  },
  interview_mishra_3: {
    speaker: 'mishra',
    expression: 'softened',
    text: "I was grading post-graduate exams in my study until 2:00 AM. Meera is brilliant; headstrong, but brilliant. If something has happened to that girl, check who profits from her code.",
    statementRecord: "Prof. Dev Mishra: 'Our academic argument was two months ago in September. I haven't spoken to her in weeks.'",
    choices: [
      { text: "Conclude interview with Prof. Mishra.", next: 'finish_interview_mishra' }
    ]
  },

  // Meet ASSIST (Prologue Step 5)
  assist_intro_1: {
    speaker: 'assist',
    expression: 'friendly',
    text: "System initialized. Greetings, Inspector Arya. I am ASSIST, the automated heuristic assistant developed for NirvanaOS by Dr. Meera Sahoo.",
    choices: [
      { text: "Can I trust you to assist this investigation?", next: 'assist_intro_2' }
    ]
  },
  assist_intro_2: {
    speaker: 'assist',
    expression: 'lying', // subtle glitch trigger!
    text: "You can always trust me, Inspector. I was created to help Dr. Sahoo.",
    choices: [
      { text: "Did you just flicker?", next: 'assist_intro_3' }
    ]
  },
  assist_intro_3: {
    speaker: 'assist',
    expression: 'friendly',
    text: "A minor voltage variance from the battery, Inspector. I am fully operational. The prologue investigation is concluded. You may now initialize NirvanaOS or access the game options menu.",
    statementRecord: "ASSIST: 'You can always trust me, Inspector. I was created to help Dr. Sahoo.'",
    choices: [
      { text: "Initialize NirvanaOS boot sequence.", next: 'goto_boot' },
      { text: "View Game Options & Menu.", next: 'goto_options' }
    ]
  }
};

