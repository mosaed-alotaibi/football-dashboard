// Dashboard.jsx

import React, { useState, useEffect } from 'react';
import Header from './Header';
import MatchPrediction from './MatchPrediction';
import TacticalAnalysis from './TacticalAnalysis';
import TacticalRecommendations from './TacticalRecommendations';
import ExploitAnalysis from './ExploitAnalysis';
import WhatIfAnalysis from './WhatIfAnalysis';

const Dashboard = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Component */}
      <Header />

      <div className="container mx-auto p-3 md:p-4">
        {/* Match Prediction Widget */}
        <MatchPrediction windowWidth={windowWidth} />

        {/* Tactical Analysis Widget */}
        <TacticalAnalysis windowWidth={windowWidth} />

        

        {/* Tactical Recommendations Widget */}
        <TacticalRecommendations windowWidth={windowWidth} />

        {/* Exploit Analysis Widget */}
        <ExploitAnalysis windowWidth={windowWidth} />

        {/* What-If Analysis Widget */}
        <WhatIfAnalysis windowWidth={windowWidth} />

      </div>
    </div>
  );
};

export default Dashboard;