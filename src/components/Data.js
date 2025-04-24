// Data.js - Central location for all data from the match analysis

// Match metadata
export const metadata = {
  match: {
    homeTeam: "Liverpool",
    awayTeam: "Southampton",
    date: "April 14, 2025",
    competition: "Premier League",
    venue: "St. Mary's Stadium"
  },
  analysis: {
    winProbability: 70,
    drawProbability: 20,
    lossProbability: 10,
    timestamp: "2025-04-10T18:00:00Z",
    version: "1.0"
  }
};

// Team comparison data
export const teamComparison = [
  { name: "Possession", team: 57, opponent: 43 },
  { name: "Shots", team: 13, opponent: 9 },
  { name: "Shots on Target", team: 8, opponent: 4 },
  { name: "Corners", team: 11, opponent: 7 },
  { name: "Fouls", team: 9, opponent: 12 }
];

// Pressure data across match segments
export const pressureData = [
  { minute: "0-15", intensity: 75, recoveries: 5 },
  { minute: "16-30", intensity: 68, recoveries: 4 },
  { minute: "31-45", intensity: 73, recoveries: 6 },
  { minute: "46-60", intensity: 70, recoveries: 5 },
  { minute: "61-75", intensity: 78, recoveries: 6 },
  { minute: "76-90", intensity: 65, recoveries: 3 }
];

// Passing network data by player position
export const passingNetworkData = [
  { name: "GK", passes: 25, accuracy: 91 },
  { name: "RB", passes: 58, accuracy: 85 },
  { name: "CB1", passes: 66, accuracy: 92 },
  { name: "CB2", passes: 61, accuracy: 90 },
  { name: "LB", passes: 64, accuracy: 88 },
  { name: "CDM", passes: 72, accuracy: 87 },
  { name: "CM1", passes: 68, accuracy: 89 },
  { name: "CM2", passes: 60, accuracy: 86 },
  { name: "RW", passes: 42, accuracy: 79 },
  { name: "ST", passes: 38, accuracy: 76 },
  { name: "LW", passes: 47, accuracy: 81 }
];

// Opponent weaknesses analysis
export const opponentWeaknesses = [
  { name: "High Press", value: 80 },
  { name: "Defending Wide Areas", value: 72 },
  { name: "Aerial Duels", value: 65 },
  { name: "Transition Defense", value: 70 },
  { name: "Defending Set Pieces", value: 68 }
];

// Predicted opponent formations with probabilities
export const predictedFormations = [
  { name: "4-4-2", probability: 65 },
  { name: "4-2-2-2", probability: 25 },
  { name: "3-5-2", probability: 10 }
];

// Colors for charts
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Radar chart data for team strategy comparison
export const radarData = [
  { subject: "Attack", A: 83, B: 76, fullMark: 100 },
  { subject: "Defense", A: 78, B: 71, fullMark: 100 },
  { subject: "Possession", A: 85, B: 68, fullMark: 100 },
  { subject: "Physical", A: 74, B: 77, fullMark: 100 },
  { subject: "Set Pieces", A: 71, B: 64, fullMark: 100 },
  { subject: "Counter", A: 69, B: 66, fullMark: 100 }
];

// What-if scenario analysis data
export const scenarioAnalysis = [
  { scenario: "High Press", winProb: 72, drawProb: 20, lossProb: 8 },
  { scenario: "Low Block", winProb: 60, drawProb: 25, lossProb: 15 },
  { scenario: "Possession", winProb: 75, drawProb: 15, lossProb: 10 },
  { scenario: "Counter Attack", winProb: 58, drawProb: 22, lossProb: 20 }
];

// Tactical insights
export const tacticalInsights = {
  strengths: [
    "Liverpool maintained 57% possession with controlled midfield dominance.",
    "Attacking overloads from both wings led to 11 corners.",
    "Press intensity peaked between the 61st and 75th minute."
  ],
  weaknesses: [
    "Occasional gaps during transition after losing midfield control.",
    "Set piece defending still inconsistent under pressure.",
    "Susceptibility to quick, direct long balls behind the defense."
  ],
  keyPlayerImpact: [
    "Mohamed Salah's off-the-ball movement opened space for overlapping runs.",
    "Van Dijk's presence in aerial duels crucial to defensive stability.",
    "Alexander-Arnold remains a creative outlet from deep."
  ]
};

// Tactical recommendations
export const tacticalRecommendations = {
  formationSuggestion: "4-3-3",
  pressingStrategy: "High press on Southampton's full-backs to isolate central build-up.",
  attackingApproach: [
    "Exploit wide channels with Robertson and Salah overlapping combinations.",
    "Use early switches to bypass compact midfield lines.",
    "Quick central penetrations through Gakpo or Mac Allister in zone 14."
  ],
  defensiveApproach: [
    "Anticipate early long balls and second-ball recoveries.",
    "Compactness in the midfield to prevent overloads by Southampton's inverted wingers.",
    "High line with Alisson sweeping effectively behind the defense."
  ],
  setPlayStrategies: [
    "Near-post deliveries targeting Van Dijk and Konaté.",
    "Short corner routines to pull markers and create cut-back opportunities.",
    "Zonal defensive marking with man-marking on key aerial threats like Adams."
  ]
};

// Predicted opposition formation and player analysis
export const predictedOppositionFormation = {
  formation: "4-4-2",
  likelyStarters: [
    { position: "GK", player: "Gavin Bazunu", threatLevel: "Medium" },
    { position: "RB", player: "Kyle Walker-Peters", threatLevel: "High" },
    { position: "CB", player: "Jan Bednarek", threatLevel: "High" },
    { position: "CB", player: "Jack Stephens", threatLevel: "Medium" },
    { position: "LB", player: "Romain Perraud", threatLevel: "Medium" },
    { position: "RM", player: "Stuart Armstrong", threatLevel: "Medium" },
    { position: "CM", player: "James Ward-Prowse", threatLevel: "Very High" },
    { position: "CM", player: "Romeo Lavia", threatLevel: "High" },
    { position: "LM", player: "Moussa Djenepo", threatLevel: "Medium" },
    { position: "ST", player: "Che Adams", threatLevel: "High" },
    { position: "ST", player: "Adam Armstrong", threatLevel: "Medium" }
  ],
  keyTactics: [
    "Compact mid-block to reduce space between lines.",
    "Quick transitions targeting Adams' physicality and Armstrong's pace.",
    "Set-piece threat through Ward-Prowse deliveries.",
    "Aggressive full-back overlaps on counter-attacks.",
    "Use of diagonal long balls to switch play and stretch defense."
  ]
};

// Utility function to get appropriate chart height based on screen size
export const getChartHeight = (windowWidth, size) => {
  if (windowWidth < 480) return size === 'small' ? 140 : 160;
  if (windowWidth < 640) return size === 'small' ? 160 : 180;
  if (windowWidth < 768) return size === 'small' ? 180 : 200;
  return size === 'small' ? 200 : 250;
};