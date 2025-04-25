import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Radar, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const TacticalAnalysis = ({ 
  windowWidth, 
  teamComparison, 
  pressureData, 
  passingNetworkData, 
  radarData, 
  tacticalInsights 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get team names from the first comparison item
  const getTeamNames = () => {
    if (!teamComparison || teamComparison.length === 0) return { homeTeam: 'Team', awayTeam: 'Opponent' };
    
    const firstItem = teamComparison[0];
    // Filter out the 'name' key and get the remaining keys (should be team names)
    const teamKeys = Object.keys(firstItem).filter(key => key !== 'name');
    
    return {
      homeTeam: teamKeys[0] || 'Team',
      awayTeam: teamKeys[1] || 'Opponent'
    };
  };
  
  const { homeTeam, awayTeam } = getTeamNames();
  
  // Transform data for bar chart to work with the dynamic team names
  const transformTeamComparison = () => {
    if (!teamComparison) return [];
    
    return teamComparison.map(item => ({
      name: item.name,
      team: item[homeTeam],
      opponent: item[awayTeam]
    }));
  };
  
  const transformedComparison = transformTeamComparison();

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
              data={transformedComparison}
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
              <Bar dataKey="team" name={homeTeam} fill="#8884d8" />
              <Bar dataKey="opponent" name={awayTeam} fill="#82ca9d" />
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
              <Radar name={homeTeam} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name={awayTeam} dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
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