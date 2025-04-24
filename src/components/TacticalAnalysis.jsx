import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Radar, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { 
  teamComparison, pressureData, passingNetworkData, radarData, tacticalInsights
} from './Data';

const TacticalAnalysis = ({ windowWidth }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4">
      <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Tactical Analysis</h2>
      
      {/* Tab navigation */}
      <div className="flex flex-wrap border-b mb-4 overflow-x-auto">
        <button 
          className={`text-xs md:text-sm px-2 md:px-4 py-2 mr-2 mb-1 ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
          onClick={() => setActiveTab('overview')}
        >
          Team Comparison
        </button>
        <button 
          className={`text-xs md:text-sm px-2 md:px-4 py-2 mr-2 mb-1 ${activeTab === 'pressure' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
          onClick={() => setActiveTab('pressure')}
        >
          Pressure Analysis
        </button>
        <button 
          className={`text-xs md:text-sm px-2 md:px-4 py-2 mr-2 mb-1 ${activeTab === 'passing' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
          onClick={() => setActiveTab('passing')}
        >
          Passing Network
        </button>
        <button 
          className={`text-xs md:text-sm px-2 md:px-4 py-2 mr-2 mb-1 ${activeTab === 'radar' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
          onClick={() => setActiveTab('radar')}
        >
          Team Strengths
        </button>
        <button 
          className={`text-xs md:text-sm px-2 md:px-4 py-2 mr-2 mb-1 ${activeTab === 'insights' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
          onClick={() => setActiveTab('insights')}
        >
          Detailed Insights
        </button>
      </div>
      
      {/* Chart content based on active tab */}
      <div className="h-48 sm:h-56 md:h-64 lg:h-72">
        {activeTab === 'overview' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={teamComparison}
              margin={{ 
                top: windowWidth < 480 ? 5 : (windowWidth < 640 ? 10 : 20), 
                right: windowWidth < 480 ? 10 : (windowWidth < 640 ? 15 : 30), 
                left: windowWidth < 480 ? 5 : (windowWidth < 640 ? 10 : 20), 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <YAxis tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <Tooltip />
              <Legend wrapperStyle={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <Bar dataKey="team" name="Our Team" fill="#8884d8" />
              <Bar dataKey="opponent" name="Opponent" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
        
        {activeTab === 'pressure' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={pressureData}
              margin={{ 
                top: windowWidth < 480 ? 5 : (windowWidth < 640 ? 10 : 20), 
                right: windowWidth < 480 ? 10 : (windowWidth < 640 ? 15 : 30), 
                left: windowWidth < 480 ? 5 : (windowWidth < 640 ? 10 : 20), 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="minute" tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <YAxis tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <Tooltip />
              <Legend wrapperStyle={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <Line type="monotone" dataKey="intensity" name="Pressure Intensity %" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="recoveries" name="Ball Recoveries" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        )}
        
        {activeTab === 'passing' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={passingNetworkData}
              margin={{ 
                top: windowWidth < 480 ? 5 : (windowWidth < 640 ? 10 : 20), 
                right: windowWidth < 480 ? 10 : (windowWidth < 640 ? 15 : 30), 
                left: windowWidth < 480 ? 5 : (windowWidth < 640 ? 10 : 20), 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <YAxis tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <Tooltip />
              <Legend wrapperStyle={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <Bar dataKey="passes" name="Total Passes" fill="#8884d8" />
              <Bar dataKey="accuracy" name="Pass Accuracy %" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
        
        {activeTab === 'radar' && (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              outerRadius={windowWidth < 480 ? 60 : (windowWidth < 640 ? 70 : 90)} 
              data={radarData}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <Radar name="Our Team" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Opponent" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend wrapperStyle={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        )}
        
        {activeTab === 'insights' && (
          <div className="overflow-y-auto h-full p-2">
            <div className="mb-3">
              <h3 className="text-sm font-semibold mb-1">Team Strengths</h3>
              <ul className="text-xs list-disc pl-4">
                {tacticalInsights.strengths.map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-3">
              <h3 className="text-sm font-semibold mb-1">Team Weaknesses</h3>
              <ul className="text-xs list-disc pl-4">
                {tacticalInsights.weaknesses.map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-3">
              <h3 className="text-sm font-semibold mb-1">Key Player Impact</h3>
              <ul className="text-xs list-disc pl-4">
                {tacticalInsights.keyPlayerImpact.map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TacticalAnalysis;