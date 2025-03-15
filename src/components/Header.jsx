import React from 'react';

const Header = () => {
  return (
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
  );
};

export default Header;
