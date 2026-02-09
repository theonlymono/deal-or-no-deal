// components/TickerMarquee.tsx
import React from 'react';

const TickerMarquee = () => {
  // We repeat the items to ensure the scroll is seamless
  const items = [
    "/// BANKER ALGORITHM: ONLINE ///",
    "MARKET STATUS: VOLATILE",
    "USD/MMK: 3,250",
    "RISK LEVEL: HIGH",
    "ACCEPT OR REJECT",
    "DEAL OR NO DEAL",
    "PROBABILITY: CALC...",
    "/// BANKER ALGORITHM: ONLINE ///",
    "MARKET STATUS: VOLATILE",
    "USD/MMK: 3,250",
    "RISK LEVEL: HIGH",
    "ACCEPT OR REJECT",
    "DEAL OR NO DEAL",
    "PROBABILITY: CALC..."
  ];

  return (
    <div className="w-full bg-paper-dark border-b-2 border-ink-black overflow-hidden flex relative z-20 h-8 items-center group">
      {/* UPDATED: 
         1. Changed duration to 45s (slower)
         2. Added hover:[animation-play-state:paused] so it stops when hovered 
      */}
      <div className="animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap flex gap-8 w-max">
        {items.map((item, index) => (
          <span 
            key={index} 
            className={`font-mono text-xs md:text-sm tracking-widest ${
              index % 2 === 0 ? 'text-ink-black' : 'text-bloomberg-orange font-bold'
            }`}
          >
            {item}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, index) => (
          <span 
            key={`dup-${index}`} 
            className={`font-mono text-xs md:text-sm tracking-widest ${
              index % 2 === 0 ? 'text-ink-black' : 'text-bloomberg-orange font-bold'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TickerMarquee;