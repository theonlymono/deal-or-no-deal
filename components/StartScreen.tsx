'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [fading, setFading] = useState(false);
  const handleStart = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => onStart(), 700);
  };
  return (
    <div 
      onClick={handleStart}
      className={`fixed inset-0 z-[100] bg-paper-bg flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-opacity duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Retro Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_4px,3px_100%]"></div>
      <div className="absolute inset-0 z-[15] pointer-events-none flex justify-center">
        <img src="/money_rain.gif" alt="" className="h-screen w-auto max-h-full mix-blend-screen opacity-80" />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-6">
        
        <div className="tv-glitch relative w-full max-w-2xl aspect-video drop-shadow-[0_0_30px_rgba(255,85,0,0.2)] animate-in fade-in zoom-in duration-700">
          <Image
            src="/Deal or No Deal2.png"
            alt="Deal or No Deal Intro"
            fill
            priority
            className="object-contain"
          />
          <Image
            src="/Deal or No Deal2.png"
            alt=""
            fill
            priority
            aria-hidden
            className="object-contain glitch-layer glitch-red"
          />
          <Image
            src="/Deal or No Deal2.png"
            alt=""
            fill
            priority
            aria-hidden
            className="object-contain glitch-layer glitch-purple"
          />
          <Image
            src="/Deal or No Deal2.png"
            alt=""
            fill
            priority
            aria-hidden
            className="object-contain glitch-layer glitch-green"
          />
          <Image src="/Deal or No Deal2.png" alt="" fill priority aria-hidden className="object-contain glitch-stripe stripe-1" />
          <Image src="/Deal or No Deal2.png" alt="" fill priority aria-hidden className="object-contain glitch-stripe stripe-2" />
          <Image src="/Deal or No Deal2.png" alt="" fill priority aria-hidden className="object-contain glitch-stripe stripe-3" />
          <div className="tv-noise"></div>
        </div>

        <div className="absolute bottom-12 md:bottom-20 flex flex-col items-center gap-2 animate-pulse">
          {/* <div className="h-1 w-16 bg-bloomberg-orange opacity-50"></div> */}
          
          <p className="font-header text-lg md:text-xl text-ink-black tracking-[0.3em] uppercase">
            Tap to Start
          </p>
          
          <div className="h-1 w-16 bg-bloomberg-orange opacity-50"></div>
        </div>
      </div>

      {/* CRT Flicker Overlay */}
      <div className="crt-flicker pointer-events-none fixed inset-0 z-50 opacity-[0.03]"></div>
    </div>
  );
};

export default StartScreen;
