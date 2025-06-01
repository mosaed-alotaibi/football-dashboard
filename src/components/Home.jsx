// Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTeams, fetchRecentMatches, uploadFilesAndGetAnalysis } from './services/apiService';
import { downloadSampleFile } from './services/FileProcessingUtil';
import Header from './Header';

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
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: 'var(--color-neutral-100)' }}>
        <div className="text-center animate-fade-in">
          <div className="loader loader-lg mx-auto mb-4"></div>
          <p style={{ color: 'var(--color-neutral-600)' }}>Loading SCAI League data...</p>
        </div>
      </div>
    );
  }

  // Create a mock metadata object for the Header component
  const headerMetadata = {
    match: {
      competition: 'Football Analysis Platform',
      homeTeam: 'Create New',
      awayTeam: 'Analysis',
      date: new Date().toLocaleDateString(),
      venue: 'AI-Powered Insights'
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-neutral-100)' }}>
      {/* Use the Header component */}
      <Header metadata={headerMetadata} />

      <div className="container mx-auto p-4 md:p-6 animate-slide-up">
        {/* Error message */}
        {error && (
          <div className="alert alert-error mb-6 animate-fade-in">
            <p>{error}</p>
          </div>
        )}

        {/* Team Selection Form */}
        <div className="card mb-6 hover:shadow-xl transition-all">
          <div className="card-header bg-gradient-to-r from-primary-600 to-primary-700 text-white">
            <h2 className="text-lg md:text-xl font-semibold">Create New Match Analysis</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleAnalyzeMatch}>
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                  <label htmlFor="homeTeam" className="form-label">Home Team</label>
                  <select 
                    id="homeTeam"
                    className="form-select focus-ring"
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
                <div className="w-full md:w-1/2 px-2">
                  <label htmlFor="awayTeam" className="form-label">Away Team</label>
                  <select 
                    id="awayTeam"
                    className="form-select focus-ring"
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
              <div className="mb-4">
                <div className="flex flex-wrap justify-between items-center mb-3">
                  <h3 className="text-base font-medium" style={{ color: 'var(--color-neutral-700)' }}>Upload Match Data Files</h3>
                  <button
                    type="button"
                    onClick={handleDownloadSample}
                    className="btn btn-sm btn-outline flex items-center transition-colors hover:bg-primary-50"
                    style={{ color: 'var(--color-primary-600)', borderColor: 'var(--color-primary-300)' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    Download Sample File
                  </button>
                </div>
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="teamStatsFile" className="form-label">Team Statistics File</label>
                    <div className="file-upload hover:border-primary-400 hover:bg-primary-50 transition-colors">
                      <input
                        type="file"
                        id="teamStatsFile"
                        className="file-upload-input"
                        onChange={(e) => handleFileChange(e, 'teamStatsFile')}
                        accept=".json,.txt,.csv"
                        required
                      />
                      <div className="file-upload-icon" style={{ color: selectedFiles.teamStatsFile ? 'var(--color-primary-500)' : 'var(--color-neutral-400)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="file-upload-text font-medium" style={{ color: selectedFiles.teamStatsFile ? 'var(--color-primary-600)' : 'var(--color-neutral-600)' }}>
                        {selectedFiles.teamStatsFile ? selectedFiles.teamStatsFile.name : 'Click to upload team statistics file'}
                      </div>
                      <div className="file-upload-hint">
                        Accepts .json, .txt, .csv
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="matchAnalysisFile" className="form-label">Match Analysis File</label>
                    <div className="file-upload hover:border-primary-400 hover:bg-primary-50 transition-colors">
                      <input
                        type="file"
                        id="matchAnalysisFile"
                        className="file-upload-input"
                        onChange={(e) => handleFileChange(e, 'matchAnalysisFile')}
                        accept=".json,.txt,.csv"
                        required
                      />
                      <div className="file-upload-icon" style={{ color: selectedFiles.matchAnalysisFile ? 'var(--color-primary-500)' : 'var(--color-neutral-400)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="file-upload-text font-medium" style={{ color: selectedFiles.matchAnalysisFile ? 'var(--color-primary-600)' : 'var(--color-neutral-600)' }}>
                        {selectedFiles.matchAnalysisFile ? selectedFiles.matchAnalysisFile.name : 'Click to upload match analysis file'}
                      </div>
                      <div className="file-upload-hint">
                        Accepts .json, .txt, .csv
                      </div>
                    </div>
                  </div>
                </div>
                <div className="alert alert-info bg-blue-50 border-blue-200 text-blue-800">
                  <p className="font-medium mb-1">File Format Information</p>
                  <p>The analysis requires two JSON files:</p>
                  <ol className="list-decimal ml-4 mt-1 space-y-1">
                    <li>Team Statistics: Contains player and team performance data</li>
                    <li>Match Analysis: Contains tactical and strategic information</li>
                  </ol>
                  <p className="mt-1">Use the "Download Sample File" button above to get a template of the expected format.</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button 
                  type="submit" 
                  className={`btn ${uploading ? 'opacity-70' : ''} btn-primary shadow-md hover:shadow-lg transition-all`}
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <div className="loader loader-sm mr-2"></div>
                      Processing Files...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Generate Match Analysis
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Recent Matches */}
        <div className="card hover:shadow-xl transition-all">
          <div className="card-header bg-gradient-to-r from-secondary-600 to-secondary-700 text-white">
            <h2 className="text-lg md:text-xl font-semibold">Recent Matches</h2>
          </div>
          <div className="card-body">
            {recentMatches.length === 0 ? (
              <p className="text-center py-4" style={{ color: 'var(--color-neutral-500)' }}>No recent matches available</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentMatches.map((match) => (
                  <div 
                    key={match.id} 
                    className="match-card cursor-pointer transition-all hover:transform hover:scale-105"
                    onClick={() => handleRecentMatchClick(match)}
                  >
                    <div className="match-card-header bg-neutral-100 text-neutral-600 font-medium">
                      {match.date} | {match.competition}
                    </div>
                    <div className="match-card-body">
                      <div className="match-card-team">
                        <div className="team-logo shadow-md bg-primary-50">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-primary-600)' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <span className="team-name">{match.homeTeam}</span>
                      </div>
                      <div className="match-card-vs">
                        <span className="badge badge-primary shadow-sm">vs</span>
                      </div>
                      <div className="match-card-team">
                        <div className="team-logo shadow-md bg-secondary-50">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-secondary-600)' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <span className="team-name">{match.awayTeam}</span>
                      </div>
                    </div>
                    <div className="match-card-footer text-primary-600 font-medium">
                      View Analysis →
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
