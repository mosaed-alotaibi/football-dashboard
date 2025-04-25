// services/apiService.js

import { mockTeams, mockRecentMatches, createMockAnalysisData } from './mockDataService';

// Base API URL - would be configured based on environment in a real app
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://mosaedb25.app.n8n.cloud/webhook-test/';

// Flag to determine if we should use mock data (useful for development)
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true' || true;

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
    
    // Default headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
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
 * Fetch match analysis data for specific teams
 * @param {string} homeTeam - Name of the home team
 * @param {string} awayTeam - Name of the away team
 * @returns {Promise<Object>} - Match analysis data
 */
export const fetchMatchAnalysis = async (homeTeam, awayTeam) => {
  try {
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