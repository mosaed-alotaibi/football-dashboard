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

        {/* Combined Section for Recommendations, Exploit, and What-If */}
        {/* Wrap all three components in one flex container */}
        <div className="flex flex-wrap -mx-2">
          {/* Tactical Recommendations Widget */}
          {/* Added w-full lg:w-1/3 */}
          <div className="w-full lg:w-1/3 px-2 mb-4">
            <TacticalRecommendations windowWidth={windowWidth} />
          </div>

          {/* Exploit Analysis Widget */}
          {/* Kept lg:w-1/3 (adjust from lg:w-1/2 if you want three equal columns) */}
          {/* Changed from lg:w-1/2 to lg:w-1/3 */}
          <div className="w-full lg:w-1/3 px-2 mb-4">
            <ExploitAnalysis windowWidth={windowWidth} />
          </div>

          {/* What-If Analysis Widget */}
          {/* Changed from lg:w-1/2 to lg:w-1/3 */}
          <div className="w-full lg:w-1/3 px-2 mb-4">
            <WhatIfAnalysis windowWidth={windowWidth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;