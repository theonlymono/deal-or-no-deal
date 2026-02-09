'use client';

import React from 'react';
import { MONEY_VALUES } from '../lib/gameConstants';

interface BoardProps {
  eliminatedValues: number[];
  side?: 'left' | 'right' | 'both';
}

const formatValue = (val: number) => {
  return val.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

const ValueRow = ({ value, isEliminated }: { value: number, isEliminated: boolean }) => {
  return (
    <div
      className={`
        flex items-end justify-between 
        px-3 py-1 my-1
        border-b border-grid-line
        font-mono text-sm md:text-base lg:text-lg text-right
        tracking-tighter
        transition-colors duration-300
        ${isEliminated ? 'bg-transparent text-gray-400 line-through opacity-40' : 'bg-paper-bg text-bloomberg-orange font-bold'}
      `}
    >
      <span className="w-full">{formatValue(value)}</span>
    </div>
  );
};

const Board: React.FC<BoardProps> = ({ eliminatedValues, side = 'both' }) => {
  const lowValues = MONEY_VALUES.slice(0, 13); // 0.01 - 750
  const highValues = MONEY_VALUES.slice(13);   // 1000 - 1,000,000

  return (
    <div className={`flex w-full ${side === 'both' ? 'justify-between gap-4' : 'justify-center'} items-start h-full`}>
      {/* Left Column (Low Values) */}
      {(side === 'left' || side === 'both') && (
        <div className="flex flex-col w-32 md:w-40 bg-paper-bg border border-ink-black shadow-retro p-2">
            <h3 className="font-header text-center text-ink-black underline decoration-bloomberg-orange mb-2">LOW</h3>
          {lowValues.map((val) => (
            <ValueRow
              key={val}
              value={val}
              isEliminated={eliminatedValues.includes(val)}
            />
          ))}
        </div>
      )}

      {/* Right Column (High Values) */}
      {(side === 'right' || side === 'both') && (
        <div className="flex flex-col w-32 md:w-40 bg-paper-bg border border-ink-black shadow-retro p-2">
            <h3 className="font-header text-center text-ink-black underline decoration-bloomberg-orange mb-2">HIGH</h3>
          {highValues.map((val) => (
            <ValueRow
              key={val}
              value={val}
              isEliminated={eliminatedValues.includes(val)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Board;
