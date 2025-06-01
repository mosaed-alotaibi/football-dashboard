import React from 'react';

const Header = ({ metadata }) => {
  // Add null check for metadata
  const matchInfo = metadata && metadata.match ? metadata.match : {
    competition: 'Football League',
    homeTeam: 'Home Team',
    awayTeam: 'Away Team',
    date: 'Match Date',
    venue: 'Venue'
  };

  return (
    <header className="app-header">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            {/* Logo */}
            <div className="app-logo mr-3 shadow-lg">
              <img 
                src="/logo.png" 
                alt="SCAI League" 
                className="w-8 h-8"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32'%3E%3Cpath fill='%234f46e5' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/%3E%3Cpath fill='%234f46e5' d='M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">SCAI League</h1>
              <p className="text-xs md:text-sm opacity-90 font-medium">Tactical Analysis AI Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center text-right">
            <div className="text-right">
              <div className="badge badge-primary mb-1 shadow-sm">{matchInfo.competition}</div>
              <p className="text-sm md:text-base font-bold mb-1 tracking-tight">{matchInfo.homeTeam} vs {matchInfo.awayTeam}</p>
              <p className="text-xs opacity-90 font-medium">{matchInfo.date} | {matchInfo.venue}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
