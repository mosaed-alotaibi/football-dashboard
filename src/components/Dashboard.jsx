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
import { useLanguage } from './LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();
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
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: 'var(--color-neutral-100)' }}>
        <div className="text-center animate-fade-in">
          <div className="loader loader-lg mx-auto mb-4"></div>
          <p style={{ color: 'var(--color-neutral-600)' }}>{t('generatingAnalysis')}</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: 'var(--color-neutral-100)' }}>
        <div className="card max-w-md mx-auto animate-slide-up">
          <div className="card-header">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-error)' }}>{t('error')}</h2>
          </div>
          <div className="card-body">
            <p className="mb-4" style={{ color: 'var(--color-neutral-700)' }}>{error}</p>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
            >
              {t('returnToHome')}
            </button>
          </div>
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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-neutral-100)' }}>
      {/* Back button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto p-2">
          <button
            onClick={() => navigate('/')}
            className="btn btn-sm btn-outline flex items-center"
            style={{ color: 'var(--color-primary-600)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('backToHome')}
          </button>
        </div>
      </div>

      {/* Header Component */}
      <Header metadata={matchData.metadata} />

      <div className="container mx-auto p-4 md:p-6 animate-slide-up">
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
