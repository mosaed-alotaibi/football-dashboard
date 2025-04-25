// Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import MatchPrediction from './MatchPrediction';
import TacticalAnalysis from './TacticalAnalysis';
import TacticalRecommendations from './TacticalRecommendations';
import ExploitAnalysis from './ExploitAnalysis';
import WhatIfAnalysis from './WhatIfAnalysis';
import { getMatchAnalysis } from './services/apiService';

const Dashboard = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Extract query parameters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const homeTeam = queryParams.get('homeTeam');
        const awayTeam = queryParams.get('awayTeam');
        
        // If teams are not provided, redirect to home page
        if (!homeTeam || !awayTeam) {
          navigate('/');
          return;
        }
        
        setLoading(true);
        // Fetch match analysis data from API
        const data = await getMatchAnalysis(homeTeam, awayTeam);
        setMatchData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load match data:', err);
        setError('Failed to load match analysis. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [location.search, navigate]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Generating match analysis...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  // If we don't have data yet, don't render anything
  if (!matchData) {
    return null;
  }
  
  // Extract team names from the metadata
  const homeTeam = matchData.metadata.match.homeTeam;
  const awayTeam = matchData.metadata.match.awayTeam;

  // Add COLORS if not provided in the data
  const COLORS = matchData.COLORS || ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Create a utility function to get the chart height if not provided
  const getChartHeight = matchData.getChartHeight || 
    ((windowWidth, size) => {
      if (windowWidth < 480) return size === 'small' ? 140 : 160;
      if (windowWidth < 640) return size === 'small' ? 160 : 180;
      if (windowWidth < 768) return size === 'small' ? 180 : 200;
      return size === 'small' ? 200 : 250;
    });

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Back button */}
      <div className="bg-white p-2 shadow-sm">
        <div className="container mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>

      {/* Header Component */}
      <Header metadata={matchData.metadata} />

      <div className="container mx-auto p-3 md:p-4">
        {/* Match Prediction Widget */}
        <MatchPrediction 
          windowWidth={windowWidth} 
          metadata={matchData.metadata}
          predictedFormations={matchData.predictedFormations}
          COLORS={COLORS}
          tacticalInsights={matchData.tacticalInsights}
          pressureData={matchData.pressureData}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
        />

        {/* Tactical Analysis Widget */}
        <TacticalAnalysis 
          windowWidth={windowWidth}
          teamComparison={matchData.teamComparison}
          pressureData={matchData.pressureData}
          passingNetworkData={matchData.passingNetworkData}
          radarData={matchData.radarData}
          tacticalInsights={matchData.tacticalInsights}
        />

        {/* Tactical Recommendations Widget */}
        <TacticalRecommendations 
          windowWidth={windowWidth}
          tacticalRecommendations={matchData.tacticalRecommendations}
          predictedOppositionFormation={matchData.predictedOppositionFormation}
        />

        {/* Exploit Analysis Widget */}
        <ExploitAnalysis 
          windowWidth={windowWidth}
          opponentWeaknesses={matchData.opponentWeaknesses}
          getChartHeight={getChartHeight}
        />

        {/* What-If Analysis Widget */}
        <WhatIfAnalysis 
          windowWidth={windowWidth}
          scenarioAnalysis={matchData.scenarioAnalysis}
          getChartHeight={getChartHeight}
        />
      </div>
    </div>
  );
};

export default Dashboard;