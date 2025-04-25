// services/apiService.js

import { mockTeams, mockRecentMatches, createMockAnalysisData } from './mockDataService';

// Base API URL - would be configured based on environment in a real app
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://mosaedb25.app.n8n.cloud/webhook-test/';

// Flag to determine if we should use mock data (useful for development)
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true' || true;

// Variable to store the last uploaded analysis data
let lastUploadedAnalysisData = null;

/**
 * Generic function to handle API requests
 * @param {string} endpoint - API endpoint to call
 * @param {Object} options - Fetch options like method, headers, body
 * @returns {Promise<any>} - API response data
 */
const apiRequest = async (endpoint, options = {}) => {
  // If using mock data, don't make actual API calls
  if (USE_MOCK_DATA) {
    throw new Error('Using mock data');
  }
  
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Default headers (don't set Content-Type for FormData)
    const headers = {
      ...options.headers,
    };
    
    // If Content-Type is explicitly set, include it
    if (options.headers && options.headers['Content-Type']) {
      headers['Content-Type'] = options.headers['Content-Type'];
    }
    
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status: ${response.status}`);
    }
    
    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${error.message}`);
    throw error;
  }
};

/**
 * Fetch teams data from the API
 * @returns {Promise<Array>} - List of teams
 */
export const fetchTeams = async () => {
  try {
    if (USE_MOCK_DATA) {
      console.log('Using mock teams data');
      return Promise.resolve(mockTeams);
    }
    return await apiRequest('/teams');
  } catch (error) {
    console.warn('Falling back to mock teams data:', error.message);
    return mockTeams;
  }
};

/**
 * Fetch recent matches data from the API
 * @returns {Promise<Array>} - List of recent matches
 */
export const fetchRecentMatches = async () => {
  try {
    if (USE_MOCK_DATA) {
      console.log('Using mock recent matches data');
      return Promise.resolve(mockRecentMatches);
    }
    return await apiRequest('/matches/recent');
  } catch (error) {
    console.warn('Falling back to mock recent matches data:', error.message);
    return mockRecentMatches;
  }
};

/**
 * Helper function to read file as text
 * @param {File} file - File to read
 * @returns {Promise<string>} - File contents as text
 */
const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

/**
 * Parse file content based on file extension
 * @param {string} content - File content as text
 * @param {string} fileName - Name of the file
 * @returns {Object} - Parsed file content
 */
const parseFileContent = (content, fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  
  switch (extension) {
    case 'json':
      return JSON.parse(content);
    case 'csv':
      // Very basic CSV parsing for demonstration
      const lines = content.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index];
          return obj;
        }, {});
      });
      return rows;
    case 'txt':
    default:
      // Basic text parsing, assuming JSON-like structure
      try {
        return JSON.parse(content);
      } catch (e) {
        // Return as is if not valid JSON
        return content;
      }
  }
};

/**
 * Upload files and get match analysis data
 * @param {string} homeTeam - Name of the home team
 * @param {string} awayTeam - Name of the away team
 * @param {File} teamStatsFile - Team statistics file
 * @param {File} matchAnalysisFile - Match analysis file
 * @returns {Promise<Object>} - Match analysis data
 */
export const uploadFilesAndGetAnalysis = async (homeTeam, awayTeam, teamStatsFile, matchAnalysisFile) => {
  try {
    if (USE_MOCK_DATA) {
      console.log('Using mock match analysis data with uploaded files');
      
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Read file contents
      const [teamStatsContent, matchAnalysisContent] = await Promise.all([
        readFileAsText(teamStatsFile),
        readFileAsText(matchAnalysisFile)
      ]);
      
      // Parse file contents
      const teamStats = parseFileContent(teamStatsContent, teamStatsFile.name);
      const matchAnalysis = parseFileContent(matchAnalysisContent, matchAnalysisFile.name);
      
      // In a real application, the server would process these files
      // For demo purposes, we'll use the mock data but simulate file processing
      console.log('Processed team stats:', teamStats);
      console.log('Processed match analysis:', matchAnalysis);
      
      // Generate a combined analysis using both files and mock data
      const mockData = createMockAnalysisData(homeTeam, awayTeam);
      
      // Store the data for later retrieval
      lastUploadedAnalysisData = mockData;
      
      return mockData;
    }
    
    // Create FormData object to send files
    const formData = new FormData();
    formData.append('homeTeam', homeTeam);
    formData.append('awayTeam', awayTeam);
    formData.append('teamStatsFile', teamStatsFile);
    formData.append('matchAnalysisFile', matchAnalysisFile);
    
    // Make the API request
    const analysisData = await apiRequest('/analysis/upload', {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header with FormData - browser will set with boundary
    });
    
    // Store the data for later retrieval
    lastUploadedAnalysisData = analysisData;
    
    return analysisData;
  } catch (error) {
    console.warn('Error in file upload, falling back to mock data:', error.message);
    const mockData = createMockAnalysisData(homeTeam, awayTeam);
    lastUploadedAnalysisData = mockData;
    return mockData;
  }
};

/**
 * Fetch match analysis data for specific teams
 * @param {string} homeTeam - Name of the home team
 * @param {string} awayTeam - Name of the away team
 * @returns {Promise<Object>} - Match analysis data
 */
export const fetchMatchAnalysis = async (homeTeam, awayTeam) => {
  try {
    // If we have previously uploaded analysis data, use that
    if (lastUploadedAnalysisData) {
      console.log('Using previously uploaded analysis data');
      return Promise.resolve(lastUploadedAnalysisData);
    }
    
    if (USE_MOCK_DATA) {
      console.log('Using mock match analysis data');
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1500));
      return Promise.resolve(createMockAnalysisData(homeTeam, awayTeam));
    }
    
    return await apiRequest(`/analysis?homeTeam=${encodeURIComponent(homeTeam)}&awayTeam=${encodeURIComponent(awayTeam)}`);
  } catch (error) {
    console.warn('Falling back to mock match analysis data:', error.message);
    return createMockAnalysisData(homeTeam, awayTeam);
  }
};

/**
 * Main function to get match analysis, either from API or mock data
 * @param {string} homeTeam - Name of the home team
 * @param {string} awayTeam - Name of the away team
 * @returns {Promise<Object>} - Match analysis data
 */
export const getMatchAnalysis = async (homeTeam, awayTeam) => {
  return await fetchMatchAnalysis(homeTeam, awayTeam);
};