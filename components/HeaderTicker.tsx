'use client';

import React from 'react';

const HeaderTicker = () => {
  return (
    <header className="w-full mb-0 relative z-30 bg-ink-black border-b-4 border-bloomberg-orange shadow-xl overflow-hidden">
      
      {/* Background Texture (Kept for vibe, but subtle) */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]"></div>

      {/* TOP META STRIP: Extremely compact now */}
      <div className="relative w-full border-b border-paper-dark/20 flex justify-between px-4 text-[9px] font-mono text-paper-dark/50 tracking-widest uppercase py-0.5">
         <span>SYS.VER.2005.12.19</span>
         <span className="hidden md:inline">/// SECURE CONNECTION ///</span>
         <span>UID: AG-3</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center relative">
        
        {/* LEFT: Branding & Serial */}
        <div className="flex items-center gap-4">
          
          {/* Mini Barcode (Scaled down) */}
          <div className="hidden md:flex h-6 gap-[2px] items-center opacity-60">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`h-full bg-paper-bg ${Math.random() > 0.5 ? 'w-0.5' : 'w-1'}`}></div>
            ))}
          </div>

          {/* Main Title - Reduced Size */}
          <div className="flex flex-col">
             <div className="flex items-center gap-2">
                <h1 className="font-header text-2xl md:text-4xl text-paper-bg tracking-wide leading-none">
                  DEAL <span className="text-transparent bg-clip-text bg-gradient-to-t from-bloomberg-orange to-red-500 font-normal">OR</span> NO DEAL
                </h1>
                {/* Live Dot */}
                <span className="w-1.5 h-1.5 bg-bloomberg-orange rounded-full animate-pulse mt-1"></span>
             </div>
          </div>
        </div>

        {/* RIGHT: Compact Dashboard */}
        <div className="flex items-center gap-4 border-l border-paper-dark/20 pl-4">
          
          {/* Data Block: Banker Status (Condensed) */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
               <span className="hidden sm:inline text-[9px] text-grid-line font-mono uppercase tracking-widest">Banker Line</span>
               {/* Tiny Signal Bars */}
               <div className="flex gap-[1px] items-end h-3">
                  <div className="w-0.5 h-1.5 bg-bloomberg-orange animate-pulse"></div>
                  <div className="w-0.5 h-2 bg-bloomberg-orange animate-pulse delay-75"></div>
                  <div className="w-0.5 h-3 bg-bloomberg-orange animate-pulse delay-150"></div>
               </div>
            </div>
            
            <span className="font-mono text-bloomberg-orange font-bold tracking-widest text-xs md:text-sm animate-pulse">
               WAITING...
            </span>
          </div>

        </div>

      </div>
    </header>
  );
};

export default HeaderTicker;