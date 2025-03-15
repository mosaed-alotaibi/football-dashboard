import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { predictedFormations, COLORS } from './Data';

const MatchPrediction = ({ windowWidth }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4">
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-base md:text-lg font-semibold">AI Match Prediction: 65% Win Probability</h2>
      </div>
      
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 lg:w-1/2 px-2 mb-4">
          <div className="bg-gray-50 p-2 md:p-3 rounded-lg h-full">
            <h3 className="font-semibold mb-2">Key Tactical Insights</h3>
            <ul className="text-xs md:text-sm">
              <li className="mb-1 flex items-start">
                <span className="text-red-500 mr-1">•</span> 
                Opponent uses high pressing in first 15 minutes
              </li>
              <li className="mb-1 flex items-start">
                <span className="text-red-500 mr-1">•</span> 
                Center-backs vulnerable to through balls behind defense
              </li>
              <li className="mb-1 flex items-start">
                <span className="text-red-500 mr-1">•</span> 
                76% of attacks come from right flank
              </li>
              <li className="mb-1 flex items-start">
                <span className="text-green-500 mr-1">•</span> 
                Recommended: Quick transitions to exploit high defensive line
              </li>
            </ul>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 lg:w-1/2 px-2 mb-4">
          <div className="bg-gray-50 p-2 md:p-3 rounded-lg h-full">
            <h3 className="font-semibold mb-2">Predicted Opposition Formation</h3>
            <ResponsiveContainer width="100%" height={windowWidth < 480 ? 120 : (windowWidth < 768 ? 150 : 180)}>
              <PieChart>
                <Pie
                  data={predictedFormations}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={windowWidth < 480 ? 40 : (windowWidth < 768 ? 50 : 60)}
                  fill="#8884d8"
                  dataKey="probability"
                  label={({name, percent}) => windowWidth < 480 ? `${name}` : `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {predictedFormations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPrediction;
