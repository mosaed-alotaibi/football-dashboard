// services/mockDataService.js

// Mock teams data
export const mockTeams = [
    { id: 1, name: 'Liverpool', logo: '/team-logos/liverpool.png' },
    { id: 2, name: 'Southampton', logo: '/team-logos/southampton.png' },
    { id: 3, name: 'Manchester United', logo: '/team-logos/man-united.png' },
    { id: 4, name: 'Manchester City', logo: '/team-logos/man-city.png' },
    { id: 5, name: 'Chelsea', logo: '/team-logos/chelsea.png' },
    { id: 6, name: 'Arsenal', logo: '/team-logos/arsenal.png' },
    { id: 7, name: 'Tottenham Hotspur', logo: '/team-logos/tottenham.png' },
    { id: 8, name: 'Leicester City', logo: '/team-logos/leicester.png' },
    { id: 9, name: 'West Ham United', logo: '/team-logos/west-ham.png' },
    { id: 10, name: 'Everton', logo: '/team-logos/everton.png' },
    { id: 11, name: 'Aston Villa', logo: '/team-logos/aston-villa.png' },
    { id: 12, name: 'Newcastle United', logo: '/team-logos/newcastle.png' },
    { id: 13, name: 'Ittihad', logo: '/team-logos/ittihad.png' },
  ];
  
  // Mock recent matches data
  export const mockRecentMatches = [
    {
      id: 1,
      homeTeam: 'Liverpool',
      awayTeam: 'Southampton',
      date: 'April 14, 2025',
      competition: 'Premier League',
      venue: "St. Mary's Stadium"
    },
    {
      id: 2,
      homeTeam: 'Manchester United',
      awayTeam: 'Chelsea',
      date: 'April 12, 2025',
      competition: 'Premier League',
      venue: "Old Trafford"
    },
    {
      id: 3,
      homeTeam: 'Arsenal',
      awayTeam: 'Manchester City',
      date: 'April 10, 2025',
      competition: 'Premier League',
      venue: "Emirates Stadium"
    },
    {
      id: 4,
      homeTeam: 'Tottenham Hotspur',
      awayTeam: 'Newcastle United',
      date: 'April 8, 2025',
      competition: 'Premier League',
      venue: "Tottenham Hotspur Stadium"
    },
    {
      id: 5,
      homeTeam: 'Ittihad',
      awayTeam: 'Al Hilal',
      date: 'April 7, 2025',
      competition: 'Saudi Pro League',
      venue: "King Abdullah Sports City"
    },
    {
      id: 6,
      homeTeam: 'West Ham United',
      awayTeam: 'Everton',
      date: 'April 5, 2025',
      competition: 'Premier League',
      venue: "London Stadium"
    }
  ];
  
  // Complete mock match analysis data based on expected API response
  export const createMockAnalysisData = (homeTeam, awayTeam) => {
    // Default values that would come from the backend model
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
    
    return {
      metadata: {
        match: {
          homeTeam: homeTeam || "Liverpool",
          awayTeam: awayTeam || "Southampton",
          date: "April 14, 2025",
          competition: homeTeam === "Ittihad" ? "Saudi Pro League" : "Premier League",
          venue: homeTeam === "Ittihad" ? "King Abdullah Sports City" : 
                 (awayTeam === "Ittihad" ? "King Abdullah Sports City" : `${awayTeam} Home Stadium`)
        },
        analysis: {
          winProbability: 70,
          drawProbability: 20,
          lossProbability: 10,
          timestamp: "2025-04-10T18:00:00Z",
          version: "1.0"
        }
      },
      
      // Team comparison data with dynamic team names
      teamComparison: [
        { name: "Possession", [homeTeam]: 57, [awayTeam]: 43 },
        { name: "Shots", [homeTeam]: 13, [awayTeam]: 9 },
        { name: "Shots on Target", [homeTeam]: 8, [awayTeam]: 4 },
        { name: "Corners", [homeTeam]: 11, [awayTeam]: 7 },
        { name: "Fouls", [homeTeam]: 9, [awayTeam]: 12 }
      ],
      
      // Pressure data across match segments
      pressureData: [
        { minute: "0-15", intensity: 75, recoveries: 5 },
        { minute: "16-30", intensity: 68, recoveries: 4 },
        { minute: "31-45", intensity: 73, recoveries: 6 },
        { minute: "46-60", intensity: 70, recoveries: 5 },
        { minute: "61-75", intensity: 78, recoveries: 6 },
        { minute: "76-90", intensity: 65, recoveries: 3 }
      ],
      
      // Passing network data by player position
      passingNetworkData: [
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
      ],
      
      // Opponent weaknesses analysis
      opponentWeaknesses: [
        { name: "High Press", value: 80 },
        { name: "Defending Wide Areas", value: 72 },
        { name: "Aerial Duels", value: 65 },
        { name: "Transition Defense", value: 70 },
        { name: "Defending Set Pieces", value: 68 }
      ],
      
      // Predicted opponent formations with probabilities
      predictedFormations: [
        { name: "4-4-2", probability: 65 },
        { name: "4-2-2-2", probability: 25 },
        { name: "3-5-2", probability: 10 }
      ],
      
      // Colors for charts
      COLORS: COLORS,
      
      // Radar chart data for team strategy comparison
      radarData: [
        { subject: "Attack", A: 83, B: 76, fullMark: 100 },
        { subject: "Defense", A: 78, B: 71, fullMark: 100 },
        { subject: "Possession", A: 85, B: 68, fullMark: 100 },
        { subject: "Physical", A: 74, B: 77, fullMark: 100 },
        { subject: "Set Pieces", A: 71, B: 64, fullMark: 100 },
        { subject: "Counter", A: 69, B: 66, fullMark: 100 }
      ],
      
      // What-if scenario analysis data
      scenarioAnalysis: [
        { scenario: "High Press", winProb: 72, drawProb: 20, lossProb: 8 },
        { scenario: "Low Block", winProb: 60, drawProb: 25, lossProb: 15 },
        { scenario: "Possession", winProb: 75, drawProb: 15, lossProb: 10 },
        { scenario: "Counter Attack", winProb: 58, drawProb: 22, lossProb: 20 }
      ],
      
      // Tactical insights
      tacticalInsights: {
        strengths: [
          `${homeTeam} maintained 57% possession with controlled midfield dominance.`,
          "Attacking overloads from both wings led to 11 corners.",
          "Press intensity peaked between the 61st and 75th minute."
        ],
        weaknesses: [
          "Occasional gaps during transition after losing midfield control.",
          "Set piece defending still inconsistent under pressure.",
          `Susceptibility to quick, direct long balls behind the defense against ${awayTeam}.`
        ],
        keyPlayerImpact: [
          `${homeTeam === "Liverpool" ? "Mohamed Salah's" : "Star player's"} off-the-ball movement opened space for overlapping runs.`,
          `${homeTeam === "Liverpool" ? "Van Dijk's" : "Central defender's"} presence in aerial duels crucial to defensive stability.`,
          `${homeTeam === "Liverpool" ? "Alexander-Arnold" : "Full-back"} remains a creative outlet from deep.`
        ]
      },
      
      // Tactical recommendations
      tacticalRecommendations: {
        formationSuggestion: "4-3-3",
        pressingStrategy: `High press on ${awayTeam}'s full-backs to isolate central build-up.`,
        attackingApproach: [
          `Exploit wide channels with ${homeTeam === "Liverpool" ? "Robertson and Salah" : "full-backs and wingers"} overlapping combinations.`,
          "Use early switches to bypass compact midfield lines.",
          `Quick central penetrations through ${homeTeam === "Liverpool" ? "Gakpo or Mac Allister" : "attacking midfielders"} in zone 14.`
        ],
        defensiveApproach: [
          "Anticipate early long balls and second-ball recoveries.",
          `Compactness in the midfield to prevent overloads by ${awayTeam}'s inverted wingers.`,
          `High line with ${homeTeam === "Liverpool" ? "Alisson" : "goalkeeper"} sweeping effectively behind the defense.`
        ],
        setPlayStrategies: [
          `Near-post deliveries targeting ${homeTeam === "Liverpool" ? "Van Dijk and Konaté" : "central defenders"}.`,
          "Short corner routines to pull markers and create cut-back opportunities.",
          "Zonal defensive marking with man-marking on key aerial threats."
        ]
      },
      
      // Predicted opposition formation and player analysis
      predictedOppositionFormation: {
        formation: "4-4-2",
        likelyStarters: [
          { position: "GK", player: generatePlayerName(awayTeam, "GK"), threatLevel: "Medium" },
          { position: "RB", player: generatePlayerName(awayTeam, "RB"), threatLevel: "High" },
          { position: "CB", player: generatePlayerName(awayTeam, "CB1"), threatLevel: "High" },
          { position: "CB", player: generatePlayerName(awayTeam, "CB2"), threatLevel: "Medium" },
          { position: "LB", player: generatePlayerName(awayTeam, "LB"), threatLevel: "Medium" },
          { position: "RM", player: generatePlayerName(awayTeam, "RM"), threatLevel: "Medium" },
          { position: "CM", player: generatePlayerName(awayTeam, "CM1"), threatLevel: "Very High" },
          { position: "CM", player: generatePlayerName(awayTeam, "CM2"), threatLevel: "High" },
          { position: "LM", player: generatePlayerName(awayTeam, "LM"), threatLevel: "Medium" },
          { position: "ST", player: generatePlayerName(awayTeam, "ST1"), threatLevel: "High" },
          { position: "ST", player: generatePlayerName(awayTeam, "ST2"), threatLevel: "Medium" }
        ],
        keyTactics: [
          "Compact mid-block to reduce space between lines.",
          "Quick transitions targeting physicality and pace.",
          "Set-piece threat through quality deliveries.",
          "Aggressive full-back overlaps on counter-attacks.",
          "Use of diagonal long balls to switch play and stretch defense."
        ]
      },
      
      // Utility function to get appropriate chart height based on screen size
      getChartHeight: (windowWidth, size) => {
        if (windowWidth < 480) return size === 'small' ? 140 : 160;
        if (windowWidth < 640) return size === 'small' ? 160 : 180;
        if (windowWidth < 768) return size === 'small' ? 180 : 200;
        return size === 'small' ? 200 : 250;
      }
    };
  };
  
  // Helper function to generate mock player names based on team and position
  function generatePlayerName(team, position) {
    const teamSpecificPlayers = {
      'Southampton': {
        'GK': 'Gavin Bazunu',
        'RB': 'Kyle Walker-Peters',
        'CB1': 'Jan Bednarek',
        'CB2': 'Jack Stephens',
        'LB': 'Romain Perraud',
        'RM': 'Stuart Armstrong',
        'CM1': 'James Ward-Prowse',
        'CM2': 'Romeo Lavia',
        'LM': 'Moussa Djenepo',
        'ST1': 'Che Adams',
        'ST2': 'Adam Armstrong'
      },
      'Manchester United': {
        'GK': 'André Onana',
        'RB': 'Diogo Dalot',
        'CB1': 'Harry Maguire',
        'CB2': 'Lisandro Martínez',
        'LB': 'Luke Shaw',
        'RM': 'Antony',
        'CM1': 'Bruno Fernandes',
        'CM2': 'Casemiro',
        'LM': 'Marcus Rashford',
        'ST1': 'Rasmus Højlund',
        'ST2': 'Alejandro Garnacho'
      },
      'Ittihad': {
        'GK': 'Marcelo Grohe',
        'RB': 'Ahmed Sharahili',
        'CB1': 'Ahmed Hegazi',
        'CB2': 'Omar Hawsawi',
        'LB': 'Muhannad Al-Shanqeeti',
        'RM': 'Fabinho',
        'CM1': 'N\'Golo Kanté',
        'CM2': 'Jota',
        'LM': 'Romarinho',
        'ST1': 'Karim Benzema',
        'ST2': 'Abderrazak Hamdallah'
      }
    };
    
    if (teamSpecificPlayers[team] && teamSpecificPlayers[team][position]) {
      return teamSpecificPlayers[team][position];
    }
    
    // Generic placeholder names if specific team data isn't available
    const positionNames = {
      'GK': 'Goalkeeper',
      'RB': 'Right Back',
      'CB1': 'Center Back 1',
      'CB2': 'Center Back 2',
      'LB': 'Left Back',
      'RM': 'Right Midfielder',
      'CM1': 'Central Midfielder 1',
      'CM2': 'Central Midfielder 2',
      'LM': 'Left Midfielder',
      'ST1': 'Striker 1',
      'ST2': 'Striker 2'
    };
    
    return positionNames[position] || `${position} Player`;
  }