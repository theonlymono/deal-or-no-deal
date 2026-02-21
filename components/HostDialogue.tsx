'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface HostDialogueProps {
  scriptLines: string[];
  onComplete: () => void;
}

const HostDialogue: React.FC<HostDialogueProps> = ({ scriptLines, onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const TYPEWRITER_SPEED = 30; // ms per character

  // Reset and start typing when scriptLines change
  useEffect(() => {
    if (scriptLines.length === 0) {
      setIsComplete(true);
      return;
    }

    setCurrentLineIndex(0);
    setDisplayedText('');
    setIsTyping(true);
    setIsComplete(false);
  }, [scriptLines]);

  // Typewriter effect for current line
  useEffect(() => {
    if (!isTyping || scriptLines.length === 0) return;

    const currentLine = scriptLines[currentLineIndex];
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex <= currentLine.length) {
        setDisplayedText(currentLine.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, TYPEWRITER_SPEED);

    return () => clearInterval(interval);
  }, [isTyping, currentLineIndex, scriptLines]);

  const handleClick = useCallback(() => {
    if (scriptLines.length === 0) return;

    const currentLine = scriptLines[currentLineIndex];

    if (isTyping) {
      // Instantly complete current line
      setDisplayedText(currentLine);
      setIsTyping(false);
    } else {
      // Move to next line or complete
      if (currentLineIndex < scriptLines.length - 1) {
        setCurrentLineIndex(prev => prev + 1);
        setDisplayedText('');
        setIsTyping(true);
      } else {
        // All lines completed
        setIsComplete(true);
        onComplete();
      }
    }
  }, [isTyping, currentLineIndex, scriptLines, onComplete]);

  // Hide component when complete and no more lines
  if (isComplete || scriptLines.length === 0) {
    return null;
  }

  const progressIndicator = `${currentLineIndex + 1}/${scriptLines.length}`;

  return (
    <div 
      onClick={handleClick}
      className="fixed bottom-0 left-0 right-0 z-[80] cursor-pointer animate-in slide-in-from-bottom duration-300"
    >
      {/* Retro Terminal Dialogue Box */}
      <div className="bg-ink-black border-t-4 border-bloomberg-orange shadow-[0_-8px_32px_rgba(26,26,26,0.6)]">
        {/* Top decorative line */}
        <div className="h-1 bg-gradient-to-r from-bloomberg-orange via-ink-black to-bloomberg-orange opacity-50"></div>
        
        <div className="max-w-5xl mx-auto px-4 py-6 flex gap-4">
          {/* Host Image - Left Side */}
          {/* Added negative top margin (-mt-12 and md:-mt-24) to let the larger image overlap the top of the box */}
          <div className="flex-shrink-0 flex items-end justify-center mr-24 -mt-12 md:-mt-24">
            <Image
              src="/mgmgaye.PNG"
              alt="SYS.BROKER Host"
              width={300} // Increased base resolution
              height={300}
              // Drastically increased Tailwind width/height classes
              className="w-40 h-40 md:w-72 md:h-72 object-contain drop-shadow-[0_0_15px_rgba(255,136,0,0.2)]" 
            />
          </div>

          {/* Content - Right Side */}
          <div className="flex-1">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Character Avatar/Icon */}
                <div className="w-10 h-10 bg-bloomberg-orange flex items-center justify-center border-2 border-paper-bg">
                  <span className="text-ink-black font-bold text-lg">M</span>
                </div>
                
                {/* Character Label */}
                <div className="flex flex-col">
                  <span className="text-bloomberg-orange font-mono text-sm font-bold tracking-widest">
                    MG MG AYE
                  </span>
                  <span className="text-grid-line font-mono text-xs">
                    STATUS: {isTyping ? 'TRANSMITTING...' : 'AWAITING INPUT...'}
                  </span>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center gap-2">
                <span className="text-grid-line font-mono text-xs">LINE</span>
                <span className="bg-paper-dark text-ink-black font-mono text-xs px-2 py-1 font-bold">
                  {progressIndicator}
                </span>
              </div>
            </div>

          {/* Main dialogue text area */}
          <div className="relative min-h-[80px] bg-paper-dark/10 border-2 border-paper-dark/30 p-4">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-bloomberg-orange"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-bloomberg-orange"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-bloomberg-orange"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-bloomberg-orange"></div>

            {/* Typewriter text */}
            <p className="font-myanmar text-paper-bg text-lg md:text-xl leading-relaxed tracking-wide">
              {displayedText}
              {/* Blinking cursor */}
              <span className={`inline-block w-2 h-5 bg-bloomberg-orange ml-1 ${isTyping ? 'animate-pulse' : 'opacity-50'}`}></span>
            </p>

            {/* Click hint */}
            <div className="absolute bottom-2 right-4 flex items-center gap-2">
              <span className="text-grid-line font-mono text-xs animate-pulse">
                {isTyping ? '[ CLICK TO SKIP ]' : '[ CLICK TO CONTINUE ]'}
              </span>
              <span className="text-bloomberg-orange">►</span>
            </div>
          </div>

            {/* Bottom decorative elements */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-bloomberg-orange animate-pulse rounded-full"></div>
                <span className="text-grid-line font-mono text-xs uppercase tracking-widest">
                  Secure Channel // Encrypted
                </span>
              </div>
              
              {/* Signal strength bars */}
              <div className="flex items-end gap-1 h-4">
                <div className="w-1 bg-bloomberg-orange h-1"></div>
                <div className="w-1 bg-bloomberg-orange h-2"></div>
                <div className="w-1 bg-bloomberg-orange h-3"></div>
                <div className="w-1 bg-bloomberg-orange h-4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDialogue;
