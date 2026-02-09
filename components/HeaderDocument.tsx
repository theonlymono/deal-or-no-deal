// components/HeaderDocument.tsx
import React from 'react';

const HeaderDocument = () => {
  return (
    // REMOVED: mb-10 or large margins
    // ADDED: pb-2 to give just a tiny breathing room inside the paper before the marquee
    <header className="w-full max-w-4xl flex flex-col items-center relative z-10 px-4 pb-2">
      {/* Decorative Top Lines (Receipt/Form style) */}
      <div className="w-full border-b-4 border-ink-black mb-1"></div>
      <div className="w-full border-b border-ink-black mb-6 flex justify-between pt-1">
        <span className="font-mono text-xs text-grid-line">REF: GAME_SHOW_2005</span>
        <span className="font-mono text-xs text-grid-line">FORM: D-ND-01</span>
      </div>

      {/* Main Title */}
      <div className="text-center relative">
        <h1 className="font-header text-5xl md:text-7xl text-ink-black tracking-widest uppercase leading-tight">
          Deal <span className="text-bloomberg-orange inline-block transform -rotate-3 decoration-4 underline decoration-ink-black">Or</span> No Deal
        </h1>
        
        {/* Sub-label */}
        <div className="mt-2 flex items-center justify-center gap-2">
           <span className="h-[1px] w-12 bg-grid-line"></span>
           <p className="font-mono text-xs md:text-sm tracking-[0.3em] text-grid-line uppercase">
             // High Stakes Probability //
           </p>
           <span className="h-[1px] w-12 bg-grid-line"></span>
        </div>
      </div>

      {/* Decorative Bottom Section */}
      {/* CHANGED: mt-8 to mt-4 to reduce the gap */}
      <div className="w-full max-w-md border-b-2 border-dashed border-grid-line mt-4 relative">
        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-paper-bg px-2 font-mono text-[10px] text-grid-line">
          DO NOT FOLD OR SPINDLE
        </span>
      </div>
    </header>
  );
};

export default HeaderDocument;