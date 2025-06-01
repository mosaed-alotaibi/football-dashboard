// TacticalRecommendations.jsx

import React from 'react';

const TacticalRecommendations = ({ windowWidth, tacticalRecommendations, predictedOppositionFormation }) => {
  // Check if required data is available
  if (!tacticalRecommendations || !predictedOppositionFormation) {
    return (
      <div className="card mb-6 animate-fade-in">
        <div className="card-header">
          <h2 className="text-lg md:text-xl font-semibold">Tactical Recommendations</h2>
        </div>
        <div className="card-body">
          <p className="text-sm" style={{ color: 'var(--color-neutral-600)' }}>
            Tactical recommendation data is not available.
          </p>
        </div>
      </div>
    );
  }

  // Ensure all required properties exist
  const validTacticalRecommendations = {
    formationSuggestion: tacticalRecommendations.formationSuggestion || '4-4-2',
    pressingStrategy: tacticalRecommendations.pressingStrategy || 'No pressing strategy available',
    attackingApproach: Array.isArray(tacticalRecommendations.attackingApproach) && tacticalRecommendations.attackingApproach.length > 0
      ? tacticalRecommendations.attackingApproach
      : ['No attacking approach data available'],
    defensiveApproach: Array.isArray(tacticalRecommendations.defensiveApproach) && tacticalRecommendations.defensiveApproach.length > 0
      ? tacticalRecommendations.defensiveApproach
      : ['No defensive approach data available'],
    setPlayStrategies: Array.isArray(tacticalRecommendations.setPlayStrategies) && tacticalRecommendations.setPlayStrategies.length > 0
      ? tacticalRecommendations.setPlayStrategies
      : ['No set play strategies data available']
  };

  const validPredictedOppositionFormation = {
    formation: predictedOppositionFormation.formation || '4-4-2',
    likelyStarters: Array.isArray(predictedOppositionFormation.likelyStarters) && predictedOppositionFormation.likelyStarters.length > 0
      ? predictedOppositionFormation.likelyStarters
      : [
          { position: 'GK', player: 'Unknown', threatLevel: 'Medium' },
          { position: 'DEF', player: 'Unknown', threatLevel: 'Medium' },
          { position: 'MID', player: 'Unknown', threatLevel: 'Medium' },
          { position: 'FWD', player: 'Unknown', threatLevel: 'Medium' }
        ],
    keyTactics: Array.isArray(predictedOppositionFormation.keyTactics) && predictedOppositionFormation.keyTactics.length > 0
      ? predictedOppositionFormation.keyTactics
      : ['No key tactics data available']
  };

  // Function to get color based on threat level
  const getThreatColor = (threatLevel) => {
    switch(threatLevel) {
      case 'Very High': return { color: 'var(--color-error)', fontWeight: 'bold' };
      case 'High': return { color: 'var(--color-error)' };
      case 'Medium': return { color: 'var(--color-warning)' };
      default: return { color: 'var(--color-success)' };
    }
  };

  return (
    <div className="card mb-6 animate-fade-in">
      <div className="card-header">
        <h2 className="text-lg md:text-xl font-semibold">Tactical Recommendations</h2>
      </div>

      <div className="card-body">
        <div className="flex flex-wrap -mx-2">
          {/* Our Recommended Approach Section */}
          <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <div className="p-4 rounded-lg h-full" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
              <h3 className="font-semibold text-sm md:text-base mb-3" style={{ color: 'var(--color-primary-700)' }}>Our Recommended Approach</h3>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-neutral-700)' }}>Suggested Formation</span>
                  <span className="badge badge-primary">{validTacticalRecommendations.formationSuggestion}</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--color-neutral-600)' }}>{validTacticalRecommendations.pressingStrategy}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-primary-600)' }}>Attacking Approach</p>
                <ul className="space-y-2">
                  {validTacticalRecommendations.attackingApproach.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block mr-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-primary-500)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <span className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-primary-600)' }}>Defensive Approach</p>
                <ul className="space-y-2">
                  {validTacticalRecommendations.defensiveApproach.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block mr-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-primary-500)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                        </svg>
                      </span>
                      <span className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-primary-600)' }}>Set Play Strategies</p>
                <ul className="space-y-2">
                  {validTacticalRecommendations.setPlayStrategies.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block mr-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-primary-500)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </span>
                      <span className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Opponent Analysis Section */}
          <div className="w-full md:w-1/2 px-2">
            <div className="p-4 rounded-lg h-full" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
              <div className="flex items-center mb-3">
                <h3 className="font-semibold text-sm md:text-base mr-2" style={{ color: 'var(--color-primary-700)' }}>
                  Opponent Analysis:
                </h3>
                <span className="badge badge-secondary">
                  {validPredictedOppositionFormation.formation}
                </span>
              </div>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
                  <thead>
                    <tr>
                      <th className="p-2 text-left" style={{ color: 'var(--color-neutral-700)', borderBottom: '1px solid var(--color-neutral-200)' }}>Pos</th>
                      <th className="p-2 text-left" style={{ color: 'var(--color-neutral-700)', borderBottom: '1px solid var(--color-neutral-200)' }}>Player</th>
                      <th className="p-2 text-left" style={{ color: 'var(--color-neutral-700)', borderBottom: '1px solid var(--color-neutral-200)' }}>Threat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validPredictedOppositionFormation.likelyStarters.map((player, index) => (
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : 'var(--color-neutral-50)' }}>
                        <td className="p-2" style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>{player.position}</td>
                        <td className="p-2" style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>{player.player}</td>
                        <td className="p-2" style={{ borderBottom: '1px solid var(--color-neutral-200)', ...getThreatColor(player.threatLevel) }}>
                          {player.threatLevel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-primary-600)' }}>Key Opposition Tactics</p>
                <ul className="space-y-2">
                  {validPredictedOppositionFormation.keyTactics.map((tactic, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block mr-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-secondary-500)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                      <span className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>{tactic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticalRecommendations;
