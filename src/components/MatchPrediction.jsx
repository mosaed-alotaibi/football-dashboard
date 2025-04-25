import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const MatchPrediction = ({ 
  windowWidth, 
  metadata, 
  predictedFormations, 
  COLORS, 
  tacticalInsights,
  pressureData 
}) => {
  // Convert win/draw/loss probabilities to pie chart data
  const matchProbabilityData = [
    { name: 'Win', value: metadata.analysis.winProbability, color: '#4CAF50' },
    { name: 'Draw', value: metadata.analysis.drawProbability, color: '#FFC107' },
    { name: 'Loss', value: metadata.analysis.lossProbability, color: '#F44336' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4">
      <div className="flex items-center mb-2 md:mb-3">
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-base md:text-lg font-semibold">
          AI Match Prediction: {metadata.analysis.winProbability}% Win Probability
        </h2>
      </div>
      
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="bg-gray-50 p-2 md:p-3 rounded-lg h-full">
            <h3 className="font-semibold mb-2 text-sm">Match Outcome</h3>
            <ResponsiveContainer width="100%" height={windowWidth < 480 ? 120 : (windowWidth < 768 ? 150 : 180)}>
              <PieChart>
                <Pie
                  data={matchProbabilityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={windowWidth < 480 ? 30 : 40}
                  outerRadius={windowWidth < 480 ? 50 : 60}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {matchProbabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="bg-gray-50 p-2 md:p-3 rounded-lg h-full">
            <h3 className="font-semibold mb-2 text-sm">Predicted Opposition Formation</h3>
            <ResponsiveContainer width="100%" height={windowWidth < 480 ? 120 : (windowWidth < 768 ? 150 : 180)}>
              <PieChart>
                <Pie
                  data={predictedFormations}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={windowWidth < 480 ? 50 : 60}
                  fill="#8884d8"
                  dataKey="probability"
                  label={({name, probability}) => `${name}: ${probability}%`}
                >
                  {predictedFormations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="bg-gray-50 p-2 md:p-3 rounded-lg h-full">
            <h3 className="font-semibold mb-2 text-sm">Key Tactical Insights</h3>
            <ul className="text-xs md:text-sm">
              <li className="mb-1 flex items-start">
                <span className="text-green-500 mr-1">•</span> 
                <span className="text-xs">{tacticalInsights.strengths[0]}</span>
              </li>
              <li className="mb-1 flex items-start">
                <span className="text-red-500 mr-1">•</span> 
                <span className="text-xs">{tacticalInsights.weaknesses[0]}</span>
              </li>
              <li className="mb-1 flex items-start">
                <span className="text-blue-600 mr-1">•</span> 
                <span className="text-xs">{tacticalInsights.keyPlayerImpact[0]}</span>
              </li>
              <li className="mb-1 flex items-start">
                <span className="text-green-500 mr-1">•</span> 
                <span className="text-xs">Peak pressure: {Math.max(...pressureData.map(d => d.intensity))}% intensity during minutes {pressureData.reduce((acc, curr) => curr.intensity > (acc.intensity || 0) ? curr : acc, {}).minute}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPrediction;