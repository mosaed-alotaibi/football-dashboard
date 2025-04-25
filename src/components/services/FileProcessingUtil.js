// services/FileProcessingUtil.js

/**
 * Utility functions for processing uploaded files
 */

/**
 * Read a file as text
 * @param {File} file - The file to read
 * @returns {Promise<string>} - A promise that resolves to the file content as text
 */
export const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };
  
  /**
   * Parse file content based on file extension
   * @param {string} content - The file content as text
   * @param {string} fileName - The name of the file (used to determine file type)
   * @returns {Object|Array|string} - The parsed content
   */
  export const parseFileContent = (content, fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'json':
        return JSON.parse(content);
      case 'csv':
        return parseCSV(content);
      case 'txt':
        // Try to parse as JSON first
        try {
          return JSON.parse(content);
        } catch (e) {
          // If not valid JSON, check if it looks like CSV
          if (content.includes(',')) {
            return parseCSV(content);
          }
          // Return as plain text if not JSON or CSV
          return content;
        }
      default:
        return content;
    }
  };
  
  /**
   * Simple CSV parser (for more complex needs, consider using a library like PapaParse)
   * @param {string} content - CSV content as text
   * @returns {Array} - Parsed CSV as array of objects
   */
  const parseCSV = (content) => {
    // Split by lines
    const lines = content.split(/\r\n|\n/);
    
    // Extract headers (first line)
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Process rows
    const rows = lines.slice(1)
      .filter(line => line.trim() !== '') // Remove empty lines
      .map(line => {
        const values = line.split(',').map(value => value.trim());
        
        // Create object from headers and values
        return headers.reduce((obj, header, index) => {
          // Try to convert numeric values
          const value = values[index];
          obj[header] = !isNaN(value) && value !== '' ? parseFloat(value) : value;
          return obj;
        }, {});
      });
    
    return rows;
  };
  
  /**
   * Validate uploaded analysis files against the expected format
   * @param {Object} data - The parsed file data
   * @returns {Object} - Validation result { valid: boolean, message: string }
   */
  export const validateAnalysisData = (data) => {
    // Check if data is an object
    if (typeof data !== 'object' || data === null) {
      return { 
        valid: false, 
        message: 'Invalid data format. Expected a JSON object.' 
      };
    }
    
    // Check for required top-level keys
    const requiredKeys = [
      'metadata',
      'teamComparison',
      'pressureData',
      'passingNetworkData',
      'opponentWeaknesses',
      'predictedFormations',
      'radarData',
      'scenarioAnalysis',
      'tacticalInsights',
      'tacticalRecommendations',
      'predictedOppositionFormation'
    ];
    
    const missingKeys = requiredKeys.filter(key => !(key in data));
    
    if (missingKeys.length > 0) {
      return {
        valid: false,
        message: `Missing required data: ${missingKeys.join(', ')}`
      };
    }
    
    // Check if metadata has required structure
    if (!data.metadata.match || !data.metadata.analysis) {
      return {
        valid: false,
        message: 'Invalid metadata structure. Match and analysis objects are required.'
      };
    }
    
    // Basic validation of arrays
    const arrayFields = [
      'teamComparison', 
      'pressureData', 
      'passingNetworkData', 
      'opponentWeaknesses',
      'predictedFormations',
      'radarData',
      'scenarioAnalysis'
    ];
    
    for (const field of arrayFields) {
      if (!Array.isArray(data[field]) || data[field].length === 0) {
        return {
          valid: false,
          message: `Invalid ${field} data. Expected a non-empty array.`
        };
      }
    }
    
    return { valid: true, message: 'Data is valid' };
  };
  
  /**
   * Create a sample reference file that matches the expected format
   * @returns {Object} - A sample match analysis object
   */
  export const createReferenceFileData = () => {
    return {
      metadata: {
        match: {
          homeTeam: "YourTeam",
          awayTeam: "OpponentTeam", 
          date: "April 25, 2025", 
          competition: "League Name", 
          venue: "Stadium Name" 
        },
        analysis: {
          winProbability: 70, 
          drawProbability: 20, 
          lossProbability: 10, 
          timestamp: "2025-04-25T18:00:00Z", 
          version: "1.0"
        }
      },
      teamComparison: [
        { name: "Possession", YourTeam: 55, OpponentTeam: 45 }, 
        { name: "Shots", YourTeam: 15, OpponentTeam: 8 }, 
        { name: "Shots on Target", YourTeam: 7, OpponentTeam: 3 }, 
        { name: "Corners", YourTeam: 6, OpponentTeam: 4 }, 
        { name: "Fouls", YourTeam: 10, OpponentTeam: 12 } 
      ],
      pressureData: [
        { minute: "0-15", intensity: 75, recoveries: 5 },
        { minute: "16-30", intensity: 68, recoveries: 4 },
        { minute: "31-45", intensity: 73, recoveries: 6 },
        { minute: "46-60", intensity: 70, recoveries: 5 },
        { minute: "61-75", intensity: 78, recoveries: 6 },
        { minute: "76-90", intensity: 65, recoveries: 3 }
      ],
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
      opponentWeaknesses: [
        { name: "High Press", value: 80 },
        { name: "Defending Wide Areas", value: 72 },
        { name: "Aerial Duels", value: 65 },
        { name: "Transition Defense", value: 70 },
        { name: "Defending Set Pieces", value: 68 }
      ],
      predictedFormations: [
        { name: "4-4-2", probability: 65 },
        { name: "4-2-3-1", probability: 25 },
        { name: "3-5-2", probability: 10 }
      ],
      radarData: [
        { subject: "Attack", A: 83, B: 76, fullMark: 100 },
        { subject: "Defense", A: 78, B: 71, fullMark: 100 },
        { subject: "Possession", A: 85, B: 68, fullMark: 100 },
        { subject: "Physical", A: 74, B: 77, fullMark: 100 },
        { subject: "Set Pieces", A: 71, B: 64, fullMark: 100 },
        { subject: "Counter", A: 69, B: 66, fullMark: 100 }
      ],
      scenarioAnalysis: [
        { scenario: "High Press", winProb: 72, drawProb: 20, lossProb: 8 },
        { scenario: "Low Block", winProb: 60, drawProb: 25, lossProb: 15 },
        { scenario: "Possession", winProb: 75, drawProb: 15, lossProb: 10 },
        { scenario: "Counter Attack", winProb: 58, drawProb: 22, lossProb: 20 }
      ],
      tacticalInsights: {
        strengths: [
          "Maintained possession with controlled midfield dominance.",
          "Attacking overloads from both wings led to 6 corners.",
          "Press intensity peaked between the 61st and 75th minute."
        ],
        weaknesses: [
          "Occasional gaps during transition after losing midfield control.",
          "Set piece defending still inconsistent under pressure.",
          "Susceptibility to quick, direct long balls behind the defense."
        ],
        keyPlayerImpact: [
          "Off-the-ball movement opened space for overlapping runs.",
          "Center back's presence in aerial duels crucial to defensive stability.",
          "Creative outlets from deep positions remain key to attacking success."
        ]
      },
      tacticalRecommendations: {
        formationSuggestion: "4-3-3",
        pressingStrategy: "High press on opponent's full-backs to isolate central build-up.",
        attackingApproach: [
          "Exploit wide channels with overlapping combinations.",
          "Use early switches to bypass compact midfield lines.",
          "Quick central penetrations through attacking midfielders in zone 14."
        ],
        defensiveApproach: [
          "Anticipate early long balls and second-ball recoveries.",
          "Compactness in the midfield to prevent overloads by opponent's inverted wingers.",
          "High line with goalkeeper sweeping effectively behind the defense."
        ],
        setPlayStrategies: [
          "Near-post deliveries targeting central defenders.",
          "Short corner routines to pull markers and create cut-back opportunities.",
          "Zonal defensive marking with man-marking on key aerial threats."
        ]
      },
      predictedOppositionFormation: {
        formation: "4-4-2",
        likelyStarters: [
          { position: "GK", player: "Goalkeeper Name", threatLevel: "Medium" },
          { position: "RB", player: "Right Back Name", threatLevel: "High" },
          { position: "CB", player: "Center Back 1 Name", threatLevel: "High" },
          { position: "CB", player: "Center Back 2 Name", threatLevel: "Medium" },
          { position: "LB", player: "Left Back Name", threatLevel: "Medium" },
          { position: "RM", player: "Right Mid Name", threatLevel: "Medium" },
          { position: "CM", player: "Central Mid 1 Name", threatLevel: "Very High" },
          { position: "CM", player: "Central Mid 2 Name", threatLevel: "High" },
          { position: "LM", player: "Left Mid Name", threatLevel: "Medium" },
          { position: "ST", player: "Striker 1 Name", threatLevel: "High" },
          { position: "ST", player: "Striker 2 Name", threatLevel: "Medium" }
        ],
        keyTactics: [
          "Compact mid-block to reduce space between lines.",
          "Quick transitions targeting physicality and pace.",
          "Set-piece threat through quality deliveries.",
          "Aggressive full-back overlaps on counter-attacks.",
          "Use of diagonal long balls to switch play and stretch defense."
        ]
      }
    };
  };
  
  /**
   * Download JSON file with sample data
   */
  export const downloadSampleFile = () => {
    const sampleData = createReferenceFileData();
    const dataStr = JSON.stringify(sampleData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', dataUri);
    downloadLink.setAttribute('download', 'sample_match_analysis.json');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };