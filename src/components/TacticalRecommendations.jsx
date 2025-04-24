import React from 'react';
import { tacticalRecommendations, predictedOppositionFormation } from './Data';

const TacticalRecommendations = ({ windowWidth }) => {
  // Function to get color based on threat level
  const getThreatColor = (threatLevel) => {
    switch(threatLevel) {
      case 'Very High': return 'text-red-500 font-bold';
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4">
      <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Tactical Recommendations</h2>
      
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <div className="bg-gray-50 p-2 md:p-3 rounded-lg h-full">
            <h3 className="font-semibold text-sm mb-2">Our Recommended Approach</h3>
            
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-xs md:text-sm font-medium">Suggested Formation</span>
                <span className="text-xs md:text-sm font-bold bg-blue-100 text-blue-800 py-1 px-2 rounded-full">{tacticalRecommendations.formationSuggestion}</span>
              </div>
              <p className="text-xs mb-2">{tacticalRecommendations.pressingStrategy}</p>
            </div>
            
            <div className="mb-2">
              <p className="text-xs md:text-sm font-medium mb-1">Attacking Approach</p>
              <ul className="text-xs list-disc pl-4">
                {tacticalRecommendations.attackingApproach.map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-2">
              <p className="text-xs md:text-sm font-medium mb-1">Defensive Approach</p>
              <ul className="text-xs list-disc pl-4">
                {tacticalRecommendations.defensiveApproach.map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="text-xs md:text-sm font-medium mb-1">Set Play Strategies</p>
              <ul className="text-xs list-disc pl-4">
                {tacticalRecommendations.setPlayStrategies.map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 px-2 mb-4">
          <div className="bg-gray-50 p-2 md:p-3 rounded-lg h-full">
            <h3 className="font-semibold text-sm mb-2">
              Opponent Analysis: 
              <span className="ml-1 bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full text-xs">
                {predictedOppositionFormation.formation}
              </span>
            </h3>
            
            <div className="overflow-x-auto mb-2">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-1 text-left border-b">Pos</th>
                    <th className="p-1 text-left border-b">Player</th>
                    <th className="p-1 text-left border-b">Threat</th>
                  </tr>
                </thead>
                <tbody>
                  {predictedOppositionFormation.likelyStarters.map((player, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-1 border-b">{player.position}</td>
                      <td className="p-1 border-b">{player.player}</td>
                      <td className="p-1 border-b">
                        <span className={getThreatColor(player.threatLevel)}>
                          {player.threatLevel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div>
              <p className="text-xs md:text-sm font-medium mb-1">Key Opposition Tactics</p>
              <ul className="text-xs list-disc pl-4">
                {predictedOppositionFormation.keyTactics.map((tactic, index) => (
                  <li key={index} className="mb-1">{tactic}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticalRecommendations;