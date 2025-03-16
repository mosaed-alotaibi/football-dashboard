import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const TacticalAnalysisDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Sample data
  const teamComparison = [
    { name: 'Possession', team: 58, opponent: 42 },
    { name: 'Shots', team: 14, opponent: 8 },
    { name: 'Shots on Target', team: 7, opponent: 3 },
    { name: 'Corners', team: 6, opponent: 4 },
    { name: 'Fouls', team: 12, opponent: 16 },
  ];
  
  const pressureData = [
    { minute: '0-15', intensity: 65, recoveries: 4 },
    { minute: '16-30', intensity: 72, recoveries: 6 },
    { minute: '31-45', intensity: 68, recoveries: 5 },
    { minute: '46-60', intensity: 58, recoveries: 3 },
    { minute: '61-75', intensity: 75, recoveries: 7 },
    { minute: '76-90', intensity: 62, recoveries: 4 },
  ];
  
  const passingNetworkData = [
    { name: 'GK', passes: 25, accuracy: 92 },
    { name: 'RB', passes: 58, accuracy: 86 },
    { name: 'CB1', passes: 62, accuracy: 94 },
    { name: 'CB2', passes: 57, accuracy: 91 },
    { name: 'LB', passes: 64, accuracy: 89 },
    { name: 'CDM', passes: 72, accuracy: 87 },
    { name: 'CM1', passes: 85, accuracy: 92 },
    { name: 'CM2', passes: 76, accuracy: 90 },
    { name: 'RW', passes: 42, accuracy: 82 },
    { name: 'ST', passes: 38, accuracy: 78 },
    { name: 'LW', passes: 46, accuracy: 84 },
  ];
  
  const opponentWeaknesses = [
    { name: 'High Press', value: 80 },
    { name: 'Counter Attacks', value: 75 },
    { name: 'Set Pieces', value: 60 },
    { name: 'Wing Play', value: 55 },
    { name: 'Through Balls', value: 85 },
  ];

  const predictedFormations = [
    { name: '4-3-3', probability: 65 },
    { name: '4-2-3-1', probability: 25 },
    { name: '3-5-2', probability: 10 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const radarData = [
    { subject: 'Attack', A: 85, B: 70, fullMark: 100 },
    { subject: 'Defense', A: 75, B: 80, fullMark: 100 },
    { subject: 'Possession', A: 90, B: 65, fullMark: 100 },
    { subject: 'Physical', A: 70, B: 85, fullMark: 100 },
    { subject: 'Set Pieces', A: 65, B: 75, fullMark: 100 },
    { subject: 'Counter', A: 80, B: 60, fullMark: 100 },
  ];
  
  const scenarioAnalysis = [
    { scenario: 'High Press', winProb: 65, drawProb: 25, lossProb: 10 },
    { scenario: 'Low Block', winProb: 45, drawProb: 35, lossProb: 20 },
    { scenario: 'Possession', winProb: 70, drawProb: 20, lossProb: 10 },
    { scenario: 'Counter Attack', winProb: 55, drawProb: 30, lossProb: 15 },
  ];

  // Determine chart heights based on screen size
  const getChartHeight = (size) => {
    if (windowWidth < 480) return size === 'small' ? 140 : 160;
    if (windowWidth < 640) return size === 'small' ? 160 : 180;
    if (windowWidth < 768) return size === 'small' ? 180 : 200;
    return size === 'small' ? 200 : 250;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Enhanced Header with Logo */}
      <div className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            {/* Logo Placeholder - Replace with your actual logo */}
            <div className="w-10 h-10 bg-white rounded-full mr-3 flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.png" 
                alt="AI Sky League" 
                className="w-8 h-8"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32'%3E%3Cpath fill='%232563eb' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/%3E%3Cpath fill='%232563eb' d='M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold">AI Sky League</h1>
              <p className="text-xs md:text-sm opacity-80">Tactical Analysis Platform</p>
            </div>
          </div>
          <div className="flex items-center text-right">
            <div className="text-right">
              <p className="text-xs md:text-sm font-medium">Next Match:</p>
              <p className="text-xs md:text-sm font-bold">Al-Hilal vs Al-Nassr</p>
              <p className="text-xs opacity-80">March 14, 2025</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto p-3 md:p-4">
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
        
        <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Tactical Analysis</h2>
          
          {/* Simplified tab navigation that works across all screen sizes */}
          <div className="flex flex-wrap border-b mb-4">
            <button 
              className={`text-xs md:text-sm px-2 md:px-4 py-2 mr-2 mb-2 ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              Team Comparison
            </button>
            <button 
              className={`text-xs md:text-sm px-2 md:px-4 py-2 mr-2 mb-2 ${activeTab === 'pressure' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('pressure')}
            >
              Pressure Analysis
            </button>
            <button 
              className={`text-xs md:text-sm px-2 md:px-4 py-2 mr-2 mb-2 ${activeTab === 'passing' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('passing')}
            >
              Passing Network
            </button>
            <button 
              className={`text-xs md:text-sm px-2 md:px-4 py-2 mr-2 mb-2 ${activeTab === 'weaknesses' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('weaknesses')}
            >
              Opponent Weaknesses
            </button>
          </div>
          
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
                  <Line type="monotone" dataKey="intensity" name="Pressure Intensity" stroke="#8884d8" />
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
            
            {activeTab === 'weaknesses' && (
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
          </div>
        </div>
        
        <div className="flex flex-wrap -mx-2">
          <div className="w-full lg:w-1/2 px-2 mb-4">
            <div className="bg-white rounded-lg shadow-md p-3 md:p-4 h-full">
              <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Exploit Analysis</h2>
              <ResponsiveContainer width="100%" height={getChartHeight('small')}>
                <BarChart
                  data={opponentWeaknesses}
                  margin={{ 
                    top: 5, 
                    right: windowWidth < 480 ? 10 : (windowWidth < 640 ? 15 : 30), 
                    left: windowWidth < 480 ? 5 : (windowWidth < 640 ? 10 : 20), 
                    bottom: 5 
                  }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} 
                    width={windowWidth < 480 ? 70 : (windowWidth < 640 ? 80 : 120)} 
                  />
                  <Tooltip />
                  <Legend wrapperStyle={{fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12)}} />
                  <Bar dataKey="value" name="Exploitation Potential %" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 px-2 mb-4">
            <div className="bg-white rounded-lg shadow-md p-3 md:p-4 h-full">
              <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">What-If Analysis</h2>
              <div className="mb-2 md:mb-4">
                <h3 className="text-xs md:text-sm font-medium mb-1 md:mb-2">Match Outcome Probability by Strategy</h3>
                <ResponsiveContainer width="100%" height={getChartHeight('small')}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticalAnalysisDashboard;