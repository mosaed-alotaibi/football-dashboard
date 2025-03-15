import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { scenarioAnalysis, getChartHeight } from './Data';

const WhatIfAnalysis = ({ windowWidth }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 h-full">
      <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">What-If Analysis</h2>
      <div className="mb-2 md:mb-4">
        <h3 className="text-xs md:text-sm font-medium mb-1 md:mb-2">Match Outcome Probability by Strategy</h3>
        <ResponsiveContainer width="100%" height={getChartHeight(windowWidth, 'small')}>
          <BarChart
            data={scenarioAnalysis}
            margin={{ 
              top: windowWidth < 480 ? 5 : (windowWidth < 640 ? 10 : 20), 
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
            <YAxis tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
            <Tooltip />
            <Legend wrapperStyle={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
            <Bar dataKey="winProb" name="Win %" fill="#4CAF50" />
            <Bar dataKey="drawProb" name="Draw %" fill="#FFC107" />
            <Bar dataKey="lossProb" name="Loss %" fill="#F44336" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WhatIfAnalysis;
