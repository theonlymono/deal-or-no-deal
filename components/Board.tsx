'use client';

import React from 'react';
import { MONEY_VALUES } from '../lib/gameConstants';

interface BoardProps {
  eliminatedValues: number[];
  side?: 'left' | 'right' | 'both';
}

const formatValue = (val: number) => {
  // Remove cents for cleaner look on board, unless it's < $1
  const digits = val < 1 ? 2 : 0;
  return val.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: digits, maximumFractionDigits: digits });
};

const MoneyRow = ({ value, isEliminated }: { value: number, isEliminated: boolean }) => {
  
  // Unified Styles: Both sides now use the "Paper Ledger" look
  let containerClass = "border-b border-r border-ink-black/20"; // Default eliminated style
  let textClass = "text-grid-line opacity-30 font-normal scale-95 blur-[0.5px]";
  let bgClass = "bg-transparent";

  if (!isEliminated) {
    // Active State (Applied to BOTH Low and High now)
    containerClass = "border-2 border-ink-black shadow-[2px_2px_0px_rgba(0,0,0,0.1)] translate-x-[-2px]";
    bgClass = "bg-[#D4CDC0]"; // The 'paper-dark' shade you liked
    textClass = "text-ink-black font-bold";
  }

  return (
    <div
      className={`
        relative flex items-center justify-between 
        px-2 py-0.5 md:px-3 md:py-1 mb-1 md:mb-1.5
        font-mono text-[10px] sm:text-xs md:text-base lg:text-lg text-right
        transition-all duration-500 ease-out
        ${containerClass} ${bgClass}
      `}
    >
      {/* The Value */}
      <span className={`w-full ${textClass}`}>
        {formatValue(value)}
      </span>

      {/* Eliminated "X" Marker */}
      {isEliminated && (
        <span className="absolute left-1 md:left-2 text-ink-black/20 text-[8px] md:text-xs font-bold">---</span>
      )}
    </div>
  );
};

const Board: React.FC<BoardProps> = ({ eliminatedValues, side = 'both' }) => {
  const lowValues = MONEY_VALUES.slice(0, 13); 
  const highValues = MONEY_VALUES.slice(13);

  // Wrapper for columns
  const ColumnWrapper = ({ title, children, align }: { title: string, children: React.ReactNode, align: 'left' | 'right' }) => (
    <div className={`flex flex-col w-[110px] sm:w-36 md:w-44 lg:w-48 ${align === 'right' ? 'items-end' : 'items-start'}`}>
      
      {/* Header Badge */}
      <div className={`
        mb-1 md:mb-2 px-2 py-0.5 text-[8px] md:text-xs font-mono uppercase tracking-[0.1em] md:tracking-[0.2em] border border-ink-black
        ${title === 'HIGH' ? 'bg-bloomberg-orange text-ink-black font-bold' : 'bg-transparent text-ink-black'}
      `}>
        {title}
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  );

  return (
    <div className={`flex w-full ${side === 'both' ? 'justify-between gap-2 md:gap-8' : 'justify-center'} items-start`}>
      
      {/* Left Column (Low) */}
      {(side === 'left' || side === 'both') && (
        <ColumnWrapper title="LOW" align="left">
          {lowValues.map((val) => (
            <MoneyRow
              key={val}
              value={val}
              isEliminated={eliminatedValues.includes(val)}
            />
          ))}
        </ColumnWrapper>
      )}

      {/* Right Column (High) */}
      {(side === 'right' || side === 'both') && (
        <ColumnWrapper title="HIGH" align="right">
          {highValues.map((val) => (
            <MoneyRow
              key={val}
              value={val}
              isEliminated={eliminatedValues.includes(val)}
            />
          ))}
        </ColumnWrapper>
      )}
    </div>
  );
};

export default Board;