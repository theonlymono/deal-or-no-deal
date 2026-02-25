'use client';

import React from 'react';

interface CaseProps {
  id: number;
  isOpen: boolean;
  value?: number;
  onClick: () => void;
  disabled?: boolean;
  isMyCase?: boolean;
}

const Case: React.FC<CaseProps> = ({ id, isOpen, value, onClick, disabled, isMyCase }) => {
  const handlePress = () => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(40);
      }
    } catch {}
    onClick();
  };
  return (
    <button
      onClick={handlePress}
      disabled={disabled || isOpen}
      className={`
        relative 
        /* UPDATED SIZES: Compact grid look */
        w-[90px] h-14 sm:w-20 sm:h-14 md:w-24 md:h-16 lg:w-28 lg:h-20
        flex items-center justify-center 
        border-2 
        transition-all duration-200 ease-in-out
        ${isMyCase ? 'border-bloomberg-orange shadow-[0_0_15px_rgba(255,85,0,0.6)] scale-105 z-10' : 'border-ink-black'}
        ${isOpen ? 'bg-paper-dark' : 'bg-paper-bg hover:bg-paper-dark hover:-translate-y-1 cursor-pointer'}
        ${disabled && !isOpen ? 'opacity-50 cursor-not-allowed' : ''}
        font-myanmar-num font-bold
      `}
    >
      {/* Folder Tab Effect - Scaled Down */}
      <div className={`
        absolute top-[-6px] left-[-2px] 
        w-8 h-3 sm:w-8 sm:h-3 md:w-10 md:h-4
        border-t-2 border-l-2 border-r-2 border-ink-black 
        ${isOpen ? 'bg-paper-dark' : 'bg-paper-bg'}
        rounded-t-sm
      `}></div>

      {/* Content */}
      <div className="z-10 text-ink-black leading-none mt-1">
        {isOpen ? (
          <span className="font-mono text-[10px] sm:text-sm md:text-base font-bold">
             {/* Shorten large numbers visually if needed, but flex usually handles it */}
            ${value?.toLocaleString('en-US', { notation: "compact", maximumFractionDigits: 1 })}
          </span>
        ) : (
          <span className="text-lg sm:text-2xl md:text-3xl">{id}</span>
        )}
      </div>

      {/* Decorative Lines for Folder Look */}
      {!isOpen && (
        <div className="absolute bottom-1 right-1 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 border-ink-black opacity-30"></div>
      )}
    </button>
  );
};

export default Case;
