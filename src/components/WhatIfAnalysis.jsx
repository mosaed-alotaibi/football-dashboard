import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WhatIfAnalysis = ({ windowWidth, scenarioAnalysis, getChartHeight }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 h-full">
      <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-3">What-If Scenario Analysis</h2>
      <p className="text-xs mb-2">Match outcome probabilities by tactical approach</p>
      <ResponsiveContainer width="100%" height={getChartHeight(windowWidth, 'small')}>
        <BarChart
          data={scenarioAnalysis}
          margin={{ 
            top: 5, 
            right: windowWidth < 480 ? 10 : (windowWidth < 640 ? 15 : 30), 
            left: windowWidth < 480 ? 5 : (windowWidth < 640 ? 10 : 20), 
            bottom: 5 
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="scenario" 
            tick={{fontSize: windowWidth < 480 ? 7 : (windowWidth < 640 ? 9 : 12)}}
            interval={0}
            angle={windowWidth < 480 ? -45 : 0}
            textAnchor={windowWidth < 480 ? "end" : "middle"}
            height={windowWidth < 480 ? 60 : 30}
          />
          <YAxis 
            tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}}
            domain={[0, 100]}
            label={{ 
              value: 'Probability %', 
              angle: -90, 
              position: 'insideLeft',
              style: { fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12) } 
            }}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend wrapperStyle={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
          <Bar dataKey="winProb" name="Win %" fill="#4CAF50" />
          <Bar dataKey="drawProb" name="Draw %" fill="#FFC107" />
          <Bar dataKey="lossProb" name="Loss %" fill="#F44336" />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-2 text-xs bg-gray-50 p-2 rounded">
        <div className="font-semibold">Recommendation:</div>
        <p>{(() => {
          // Find the best scenario based on win probability
          const bestScenario = scenarioAnalysis.reduce((best, current) => 
            current.winProb > best.winProb ? current : best, scenarioAnalysis[0]);
          return `The ${bestScenario.scenario} approach offers the highest win probability at ${bestScenario.winProb}%, with a loss risk of only ${bestScenario.lossProb}%.`;
        })()}</p>
      </div>
    </div>
  );
};

export default WhatIfAnalysis;