'use client';

import React from 'react';

interface BankerPhoneProps {
  isOpen: boolean;
  offer: number;
  onDeal: () => void;
  onNoDeal: () => void;
}

const BankerPhone: React.FC<BankerPhoneProps> = ({ isOpen, offer, onDeal, onNoDeal }) => {
  return (
    <div 
      className={`
        fixed bottom-0 left-0 right-0 
        transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        bg-paper-dark border-t-4 border-bloomberg-orange
        shadow-[0_-5px_20px_rgba(0,0,0,0.2)]
        z-50 p-6 md:p-8
        flex flex-col items-center justify-center
      `}
    >
      <div className="w-full max-w-2xl text-center">
        <h2 className="text-2xl font-header text-ink-black mb-2 animate-pulse">
          INCOMING OFFER - BANKER
        </h2>
        
        <div className="text-4xl md:text-6xl font-mono text-bloomberg-orange font-bold my-4">
          ${offer.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </div>

        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={onDeal}
            className="
              px-8 py-4 
              bg-ink-black text-paper-bg 
              hover:bg-bloomberg-orange hover:text-ink-black
              border-2 border-ink-black
              font-header text-2xl uppercase tracking-wider
              transition-all duration-200
            "
          >
            Deal
          </button>
          
          <button
            onClick={onNoDeal}
            className="
              px-8 py-4 
              bg-paper-bg text-ink-black 
              hover:bg-paper-dark
              border-2 border-ink-black
              font-header text-2xl uppercase tracking-wider
              transition-all duration-200
            "
          >
            No Deal
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankerPhone;
