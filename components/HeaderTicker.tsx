// components/HeaderTicker.tsx
import React from 'react';

const HeaderTicker = () => {
  return (
    // CHANGED: mb-8 -> mb-0 (Removes the gap below)
    <header className="w-full mb-0 relative z-30 bg-ink-black border-b-4 border-bloomberg-orange shadow-lg">
      {/* Top thin line */}
      <div className="w-full h-1 bg-grid-line opacity-20"></div>

      <div className="max-w-6xl mx-auto py-3 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left: The Title */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-bloomberg-orange animate-pulse rounded-full"></div>
          <h1 className="font-header text-3xl md:text-4xl text-paper-bg tracking-wider pt-1">
            DEAL <span className="text-bloomberg-orange">OR</span> NO DEAL
          </h1>
        </div>

        {/* Right: Live Status Ticker */}
        <div className="flex items-center gap-6 font-mono text-xs text-paper-dark border-l border-paper-dark/30 pl-6">
          
          
          <div className="hidden md:flex flex-col">
            <span className="text-grid-line uppercase text-[10px]">System Date</span>
            <span>2005-12-19</span>
          </div>

          <div className="flex flex-col text-right">
             <span className="text-grid-line uppercase text-[10px]">Banker Conn.</span>
             <span className="text-bloomberg-orange animate-pulse">WAITING...</span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default HeaderTicker;