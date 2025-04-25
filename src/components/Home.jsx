// Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTeams, fetchRecentMatches, uploadFilesAndGetAnalysis } from './services/apiService';
import { downloadSampleFile } from './services/FileProcessingUtil';

const Home = () => {
  // State for teams and recent matches
  const [teams, setTeams] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  
  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for form data
  const [selectedTeams, setSelectedTeams] = useState({ homeTeam: '', awayTeam: '' });
  const [selectedFiles, setSelectedFiles] = useState({ teamStatsFile: null, matchAnalysisFile: null });
  
  // State for upload progress
  const [uploading, setUploading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        // Fetch teams and recent matches in parallel
        const [teamsData, matchesData] = await Promise.all([
          fetchTeams(),
          fetchRecentMatches()
        ]);
        
        setTeams(teamsData);
        setRecentMatches(matchesData);
        setError(null);
      } catch (err) {
        console.error('Failed to load initial data:', err);
        setError('Failed to load teams and matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleTeamChange = (event, teamType) => {
    setSelectedTeams({
      ...selectedTeams,
      [teamType]: event.target.value
    });
  };

  const handleFileChange = (event, fileType) => {
    setSelectedFiles({
      ...selectedFiles,
      [fileType]: event.target.files[0]
    });
  };

  const handleAnalyzeMatch = async (e) => {
    e.preventDefault();
    
    // Validate team selection
    if (!selectedTeams.homeTeam || !selectedTeams.awayTeam) {
      setError('Please select both teams for analysis');
      return;
    }
    
    if (selectedTeams.homeTeam === selectedTeams.awayTeam) {
      setError('Please select different teams for home and away');
      return;
    }
    
    // Validate file uploads
    if (!selectedFiles.teamStatsFile || !selectedFiles.matchAnalysisFile) {
      setError('Please upload both required files for analysis');
      return;
    }
    
    try {
      setUploading(true);
      setError(null);
      
      // Upload files and get analysis data
      await uploadFilesAndGetAnalysis(
        selectedTeams.homeTeam,
        selectedTeams.awayTeam,
        selectedFiles.teamStatsFile,
        selectedFiles.matchAnalysisFile
      );
      
      // Navigate to dashboard with the selected teams as query parameters
      navigate(`/dashboard?homeTeam=${encodeURIComponent(selectedTeams.homeTeam)}&awayTeam=${encodeURIComponent(selectedTeams.awayTeam)}`);
    } catch (err) {
      console.error('Failed to upload files and get analysis:', err);
      setError('Failed to process files. Please check file format and try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRecentMatchClick = (match) => {
    navigate(`/dashboard?homeTeam=${encodeURIComponent(match.homeTeam)}&awayTeam=${encodeURIComponent(match.awayTeam)}`);
  };

  const handleDownloadSample = () => {
    downloadSampleFile();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SCAI League data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="w-10 h-10 bg-white rounded-full mr-3 flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.png" 
                alt="SCAI League" 
                className="w-8 h-8"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32'%3E%3Cpath fill='%232563eb' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/%3E%3Cpath fill='%232563eb' d='M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold">SCAI League</h1>
              <p className="text-xs md:text-sm opacity-80">Tactical Analysis AI Assistant</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-3 md:p-4">
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Team Selection Form */}
        <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4">
          <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Create New Match Analysis</h2>
          <form onSubmit={handleAnalyzeMatch}>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-3">
                <label htmlFor="homeTeam" className="block text-sm font-medium mb-1">Home Team</label>
                <select 
                  id="homeTeam"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedTeams.homeTeam}
                  onChange={(e) => handleTeamChange(e, 'homeTeam')}
                  required
                >
                  <option value="">Select Home Team</option>
                  {teams.map(team => (
                    <option key={`home-${team.id}`} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/2 px-2 mb-3">
                <label htmlFor="awayTeam" className="block text-sm font-medium mb-1">Away Team</label>
                <select 
                  id="awayTeam"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedTeams.awayTeam}
                  onChange={(e) => handleTeamChange(e, 'awayTeam')}
                  required
                >
                  <option value="">Select Away Team</option>
                  {teams.map(team => (
                    <option key={`away-${team.id}`} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* File upload section */}
            <div className="mb-3">
              <div className="flex flex-wrap justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Upload Match Data Files</h3>
                <button
                  type="button"
                  onClick={handleDownloadSample}
                  className="text-blue-600 hover:text-blue-800 text-xs flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  Download Sample File
                </button>
              </div>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-3">
                  <label htmlFor="teamStatsFile" className="block text-sm font-medium mb-1">Team Statistics File</label>
                  <input
                    type="file"
                    id="teamStatsFile"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) => handleFileChange(e, 'teamStatsFile')}
                    accept=".json,.txt,.csv"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Upload team statistics file (.json, .txt, .csv)
                  </p>
                </div>
                <div className="w-full md:w-1/2 px-2 mb-3">
                  <label htmlFor="matchAnalysisFile" className="block text-sm font-medium mb-1">Match Analysis File</label>
                  <input
                    type="file"
                    id="matchAnalysisFile"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) => handleFileChange(e, 'matchAnalysisFile')}
                    accept=".json,.txt,.csv"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Upload match analysis file (.json, .txt, .csv)
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-800 mb-3">
                <p className="font-medium mb-1">File Format Information</p>
                <p>The analysis requires two JSON files:</p>
                <ol className="list-decimal ml-4 mt-1 space-y-1">
                  <li>Team Statistics: Contains player and team performance data</li>
                  <li>Match Analysis: Contains tactical and strategic information</li>
                </ol>
                <p className="mt-1">Use the "Download Sample File" button above to get a template of the expected format.</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-2">
              <button 
                type="submit" 
                className={`${uploading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-2 px-4 rounded transition duration-200 flex items-center`}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing Files...
                  </>
                ) : 'Generate Match Analysis'}
              </button>
            </div>
          </form>
        </div>

        {/* Recent Matches */}
        <div className="bg-white rounded-lg shadow-md p-3 md:p-4">
          <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Recent Matches</h2>
          {recentMatches.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No recent matches available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentMatches.map((match) => (
                <div 
                  key={match.id} 
                  className="border rounded p-3 cursor-pointer hover:bg-gray-50 transition duration-200"
                  onClick={() => handleRecentMatchClick(match)}
                >
                  <div className="text-sm text-gray-500 mb-1">{match.date} | {match.competition}</div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{match.homeTeam}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">vs</span>
                    <span className="font-medium">{match.awayTeam}</span>
                  </div>
                  <div className="text-xs text-right mt-2 text-blue-600">
                    View Analysis →
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;