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
    if (!teamComparison || !Array.isArray(teamComparison) || teamComparison.length === 0) return [];
    
    return teamComparison.map(item => ({
      name: item.name,
      team: item[homeTeam],
      opponent: item[awayTeam]
    }));
  };
  
  const transformedComparison = transformTeamComparison();

  // Check if data is available for the active tab
  const isDataAvailable = (tab) => {
    switch(tab) {
      case 'overview':
        return teamComparison && Array.isArray(teamComparison) && teamComparison.length > 0;
      case 'pressure':
        return pressureData && Array.isArray(pressureData) && pressureData.length > 0;
      case 'passing':
        return passingNetworkData && Array.isArray(passingNetworkData) && passingNetworkData.length > 0;
      case 'radar':
        return radarData && Array.isArray(radarData) && radarData.length > 0;
      case 'insights':
        return tacticalInsights && 
               tacticalInsights.strengths && Array.isArray(tacticalInsights.strengths) && 
               tacticalInsights.weaknesses && Array.isArray(tacticalInsights.weaknesses) && 
               tacticalInsights.keyPlayerImpact && Array.isArray(tacticalInsights.keyPlayerImpact);
      default:
        return false;
    }
  };

  return (
    <div className="card mb-6 animate-fade-in">
      <div className="card-header">
        <h2 className="text-lg md:text-xl font-semibold">Tactical Analysis</h2>
      </div>
      
      <div className="card-body">
        {/* Tab navigation */}
        <div className="tab-container">
          <div className="tab-list">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Team Comparison
            </button>
            <button 
              className={`tab ${activeTab === 'pressure' ? 'active' : ''}`}
              onClick={() => setActiveTab('pressure')}
            >
              Pressure Analysis
            </button>
            <button 
              className={`tab ${activeTab === 'passing' ? 'active' : ''}`}
              onClick={() => setActiveTab('passing')}
            >
              Passing Network
            </button>
            <button 
              className={`tab ${activeTab === 'radar' ? 'active' : ''}`}
              onClick={() => setActiveTab('radar')}
            >
              Team Strengths
            </button>
            <button 
              className={`tab ${activeTab === 'insights' ? 'active' : ''}`}
              onClick={() => setActiveTab('insights')}
            >
              Detailed Insights
            </button>
          </div>
          
          {/* Chart content based on active tab */}
          <div className="tab-content">
            <div className="h-48 sm:h-56 md:h-64 lg:h-72 relative">
              {/* Show no data message if data is not available */}
              {!isDataAvailable(activeTab) && (
                <div className="flex justify-center items-center h-full">
                  <p className="text-sm" style={{ color: 'var(--color-neutral-600)' }}>
                    No data available for this analysis.
                  </p>
                </div>
              )}
              
              {activeTab === 'overview' && isDataAvailable('overview') && (
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
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-200)" />
                    <XAxis 
                      dataKey="name" 
                      tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}}
                      stroke="var(--color-neutral-600)"
                    />
                    <YAxis 
                      tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}}
                      stroke="var(--color-neutral-600)"
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-neutral-800)',
                        border: 'none',
                        borderRadius: 'var(--radius)',
                        color: 'white'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{
                        fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12),
                        color: 'var(--color-neutral-700)'
                      }} 
                    />
                    <Bar dataKey="team" name={homeTeam} fill="var(--color-primary-500)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="opponent" name={awayTeam} fill="var(--color-secondary-500)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
              
              {activeTab === 'pressure' && isDataAvailable('pressure') && (
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
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-200)" />
                    <XAxis 
                      dataKey="minute" 
                      tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}}
                      stroke="var(--color-neutral-600)"
                    />
                    <YAxis 
                      tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}}
                      stroke="var(--color-neutral-600)"
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-neutral-800)',
                        border: 'none',
                        borderRadius: 'var(--radius)',
                        color: 'white'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{
                        fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12),
                        color: 'var(--color-neutral-700)'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="intensity" 
                      name="Pressure Intensity %" 
                      stroke="var(--color-primary-500)" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: 'var(--color-primary-500)' }}
                      activeDot={{ r: 8, fill: 'var(--color-primary-600)' }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="recoveries" 
                      name="Ball Recoveries" 
                      stroke="var(--color-secondary-500)" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: 'var(--color-secondary-500)' }}
                      activeDot={{ r: 8, fill: 'var(--color-secondary-600)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
              
              {activeTab === 'passing' && isDataAvailable('passing') && (
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
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-200)" />
                    <XAxis 
                      dataKey="name" 
                      tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}}
                      stroke="var(--color-neutral-600)"
                    />
                    <YAxis 
                      tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}}
                      stroke="var(--color-neutral-600)"
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-neutral-800)',
                        border: 'none',
                        borderRadius: 'var(--radius)',
                        color: 'white'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{
                        fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12),
                        color: 'var(--color-neutral-700)'
                      }} 
                    />
                    <Bar dataKey="passes" name="Total Passes" fill="var(--color-primary-500)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="accuracy" name="Pass Accuracy %" fill="var(--color-secondary-500)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
              
              {activeTab === 'radar' && isDataAvailable('radar') && (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    outerRadius={windowWidth < 480 ? 60 : (windowWidth < 640 ? 70 : 90)} 
                    data={radarData}
                  >
                    <PolarGrid stroke="var(--color-neutral-300)" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{
                        fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12),
                        fill: 'var(--color-neutral-700)'
                      }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      tick={{
                        fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12),
                        fill: 'var(--color-neutral-600)'
                      }}
                    />
                    <Radar 
                      name={homeTeam} 
                      dataKey="A" 
                      stroke="var(--color-primary-600)" 
                      fill="var(--color-primary-500)" 
                      fillOpacity={0.6} 
                    />
                    <Radar 
                      name={awayTeam} 
                      dataKey="B" 
                      stroke="var(--color-secondary-600)" 
                      fill="var(--color-secondary-500)" 
                      fillOpacity={0.6} 
                    />
                    <Legend 
                      wrapperStyle={{
                        fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12),
                        color: 'var(--color-neutral-700)'
                      }} 
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-neutral-800)',
                        border: 'none',
                        borderRadius: 'var(--radius)',
                        color: 'white'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              )}
              
              {activeTab === 'insights' && isDataAvailable('insights') && (
                <div className="h-48 sm:h-56 md:h-64 lg:h-72 overflow-y-auto p-2">
                  <div className="space-y-4 pb-4">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold mb-2" style={{ color: 'var(--color-primary-700)' }}>Team Strengths</h3>
                      <ul className="space-y-2">
                        {tacticalInsights.strengths.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block mr-2 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-success)' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </span>
                            <span className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm md:text-base font-semibold mb-2" style={{ color: 'var(--color-primary-700)' }}>Team Weaknesses</h3>
                      <ul className="space-y-2">
                        {tacticalInsights.weaknesses.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block mr-2 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-error)' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            </span>
                            <span className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm md:text-base font-semibold mb-2" style={{ color: 'var(--color-primary-700)' }}>Key Player Impact</h3>
                      <ul className="space-y-2">
                        {tacticalInsights.keyPlayerImpact.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block mr-2 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-primary-600)' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </span>
                            <span className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticalAnalysis;
