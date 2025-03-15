// Data.js - Central location for all sample data
export const teamComparison = [
  { name: 'Possession', team: 58, opponent: 42 },
  { name: 'Shots', team: 14, opponent: 8 },
  { name: 'Shots on Target', team: 7, opponent: 3 },
  { name: 'Corners', team: 6, opponent: 4 },
  { name: 'Fouls', team: 12, opponent: 16 },
];

export const pressureData = [
  { minute: '0-15', intensity: 65, recoveries: 4 },
  { minute: '16-30', intensity: 72, recoveries: 6 },
  { minute: '31-45', intensity: 68, recoveries: 5 },
  { minute: '46-60', intensity: 58, recoveries: 3 },
  { minute: '61-75', intensity: 75, recoveries: 7 },
  { minute: '76-90', intensity: 62, recoveries: 4 },
];

export const passingNetworkData = [
  { name: 'GK', passes: 25, accuracy: 92 },
  { name: 'RB', passes: 58, accuracy: 86 },
  { name: 'CB1', passes: 62, accuracy: 94 },
  { name: 'CB2', passes: 57, accuracy: 91 },
  { name: 'LB', passes: 64, accuracy: 89 },
  { name: 'CDM', passes: 72, accuracy: 87 },
  { name: 'CM1', passes: 85, accuracy: 92 },
  { name: 'CM2', passes: 76, accuracy: 90 },
  { name: 'RW', passes: 42, accuracy: 82 },
  { name: 'ST', passes: 38, accuracy: 78 },
  { name: 'LW', passes: 46, accuracy: 84 },
];

export const opponentWeaknesses = [
  { name: 'High Press', value: 80 },
  { name: 'Counter Attacks', value: 75 },
  { name: 'Set Pieces', value: 60 },
  { name: 'Wing Play', value: 55 },
  { name: 'Through Balls', value: 85 },
];

export const predictedFormations = [
  { name: '4-3-3', probability: 65 },
  { name: '4-2-3-1', probability: 25 },
  { name: '3-5-2', probability: 10 },
];

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const radarData = [
  { subject: 'Attack', A: 85, B: 70, fullMark: 100 },
  { subject: 'Defense', A: 75, B: 80, fullMark: 100 },
  { subject: 'Possession', A: 90, B: 65, fullMark: 100 },
  { subject: 'Physical', A: 70, B: 85, fullMark: 100 },
  { subject: 'Set Pieces', A: 65, B: 75, fullMark: 100 },
  { subject: 'Counter', A: 80, B: 60, fullMark: 100 },
];

export const scenarioAnalysis = [
  { scenario: 'High Press', winProb: 65, drawProb: 25, lossProb: 10 },
  { scenario: 'Low Block', winProb: 45, drawProb: 35, lossProb: 20 },
  { scenario: 'Possession', winProb: 70, drawProb: 20, lossProb: 10 },
  { scenario: 'Counter Attack', winProb: 55, drawProb: 30, lossProb: 15 },
];

// Utility function to get appropriate chart height based on screen size
export const getChartHeight = (windowWidth, size) => {
  if (windowWidth < 480) return size === 'small' ? 140 : 160;
  if (windowWidth < 640) return size === 'small' ? 160 : 180;
  if (windowWidth < 768) return size === 'small' ? 180 : 200;
  return size === 'small' ? 200 : 250;
};
