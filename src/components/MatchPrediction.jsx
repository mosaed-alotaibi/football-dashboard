import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const MatchPrediction = ({ 
  windowWidth, 
  metadata, 
  predictedFormations, 
  COLORS, 
  tacticalInsights,
  pressureData,
  homeTeam,
  awayTeam
}) => {
  // Check if required data is available
  if (!metadata || !metadata.analysis || !predictedFormations || !Array.isArray(predictedFormations) || 
      !tacticalInsights || !pressureData || !Array.isArray(pressureData)) {
    return (
      <div className="card mb-6 animate-fade-in">
        <div className="card-header">
          <h2 className="text-lg md:text-xl font-semibold">AI Match Prediction</h2>
        </div>
        <div className="card-body">
          <p className="text-sm" style={{ color: 'var(--color-neutral-600)' }}>
            Match prediction data is not available.
          </p>
        </div>
      </div>
    );
  }

  // Set default values for homeTeam and awayTeam if not provided
  const displayHomeTeam = homeTeam || (metadata.match && metadata.match.homeTeam) || 'Home Team';
  const displayAwayTeam = awayTeam || (metadata.match && metadata.match.awayTeam) || 'Away Team';

  // Convert win/draw/loss probabilities to pie chart data
  const matchProbabilityData = [
    { name: 'Win', value: metadata.analysis.winProbability, color: 'var(--color-success)' },
    { name: 'Draw', value: metadata.analysis.drawProbability, color: 'var(--color-warning)' },
    { name: 'Loss', value: metadata.analysis.lossProbability, color: 'var(--color-error)' }
  ];

  // Ensure tacticalInsights has all required properties
  const validTacticalInsights = {
    strengths: tacticalInsights.strengths && Array.isArray(tacticalInsights.strengths) && tacticalInsights.strengths.length > 0 
      ? tacticalInsights.strengths 
      : ['No strength data available'],
    weaknesses: tacticalInsights.weaknesses && Array.isArray(tacticalInsights.weaknesses) && tacticalInsights.weaknesses.length > 0 
      ? tacticalInsights.weaknesses 
      : ['No weakness data available'],
    keyPlayerImpact: tacticalInsights.keyPlayerImpact && Array.isArray(tacticalInsights.keyPlayerImpact) && tacticalInsights.keyPlayerImpact.length > 0 
      ? tacticalInsights.keyPlayerImpact 
      : ['No player impact data available']
  };

  // Calculate peak pressure safely
  const peakPressure = pressureData.length > 0 
    ? Math.max(...pressureData.map(d => d.intensity || 0)) 
    : 0;
  
  const peakPressureMinute = pressureData.length > 0 
    ? pressureData.reduce((acc, curr) => (curr.intensity || 0) > (acc.intensity || 0) ? curr : acc, {}).minute || 'N/A'
    : 'N/A';

  return (
    <div className="card mb-6 animate-fade-in">
      <div className="card-header">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: 'var(--color-success)' }}></div>
          <h2 className="text-lg md:text-xl font-semibold">
            AI Match Prediction: {metadata.analysis.winProbability}% Win Probability for {displayHomeTeam}
          </h2>
        </div>
      </div>
      
      <div className="card-body">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <div className="p-4 rounded-lg h-full" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
              <h3 className="font-semibold mb-3 text-sm md:text-base" style={{ color: 'var(--color-neutral-700)' }}>Match Outcome</h3>
              <ResponsiveContainer width="100%" height={windowWidth < 480 ? 120 : (windowWidth < 768 ? 150 : 180)}>
                <PieChart>
                  <Pie
                    data={matchProbabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={windowWidth < 480 ? 30 : 40}
                    outerRadius={windowWidth < 480 ? 50 : 60}
                    dataKey="value"
                    labelLine={false}
                    label={({name, value}) => `${name}: ${value}%`}
                  >
                    {matchProbabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: 'var(--color-neutral-800)',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      color: 'white'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <div className="p-4 rounded-lg h-full" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
              <h3 className="font-semibold mb-3 text-sm md:text-base" style={{ color: 'var(--color-neutral-700)' }}>Predicted {displayAwayTeam} Formation</h3>
              <ResponsiveContainer width="100%" height={windowWidth < 480 ? 120 : (windowWidth < 768 ? 150 : 180)}>
                <PieChart>
                  <Pie
                    data={predictedFormations}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={windowWidth < 480 ? 50 : 60}
                    dataKey="probability"
                    label={({name, probability}) => `${name}: ${probability}%`}
                  >
                    {predictedFormations.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`var(--color-${index === 0 ? 'primary' : index === 1 ? 'secondary' : 'neutral'}-${500 - index * 100})`} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: 'var(--color-neutral-800)',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      color: 'white'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="w-full md:w-1/3 px-2">
            <div className="p-4 rounded-lg h-full" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
              <h3 className="font-semibold mb-3 text-sm md:text-base" style={{ color: 'var(--color-neutral-700)' }}>Key Tactical Insights</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>{validTacticalInsights.strengths[0]}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-error)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </span>
                  <span className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>{validTacticalInsights.weaknesses[0]}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-primary-600)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>{validTacticalInsights.keyPlayerImpact[0]}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-primary-600)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <span className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>
                    Peak pressure: {peakPressure}% intensity during minutes {peakPressureMinute}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPrediction;
