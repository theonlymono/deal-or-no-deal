'use client';

import React, { useLayoutEffect, useRef } from 'react';

interface BankerPhoneProps {
  isOpen: boolean;
  offer: number;
  onDeal: () => void;
  onNoDeal: () => void;
}

const BankerPhone: React.FC<BankerPhoneProps> = ({ isOpen, offer, onDeal, onNoDeal }) => {
  if (!isOpen) return null;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useLayoutEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.volume = 0.7;
    el.play().catch(() => {});
    return () => {
      try {
        el.pause();
        el.currentTime = 0;
      } catch {}
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <audio
        ref={audioRef}
        src="/Old Phone Ringtone.mp3"
        loop
        preload="auto"
        autoPlay
        playsInline
        className="hidden"
      />
      
      {/* 1. Backdrop (Clean Blur) */}
      <div className="absolute inset-0 bg-ink-black/60 backdrop-blur-sm animate-in fade-in duration-300"></div>

      {/* 2. The "Bank Draft" Modal */}
      <div className="relative w-full max-w-lg bg-paper-bg border-4 border-ink-black shadow-[10px_10px_0px_rgba(0,0,0,0.2)] animate-in zoom-in-95 duration-300">
        
        {/* Decorative 'Paper Clip' Visual (Top Center) */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 border-4 border-grid-line rounded-t-full bg-paper-dark z-0"></div>
        {/* Ringing Phone GIF (Top Center) */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <img src="/ringing_phone..gif" alt="Ringing Phone" className="w-24 h-24 md:w-28 md:h-28 object-contain" />
        </div>

        {/* Header Strip */}
        <div className="bg-ink-black py-3 px-6 relative z-10 flex justify-between items-center">
          <span className="font-mono text-paper-bg text-xs tracking-[0.2em] uppercase">
            Official Correspondence
          </span>
          <span className="w-2 h-2 bg-bloomberg-orange rounded-full animate-pulse"></span>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Background Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-header text-ink-black/5 pointer-events-none select-none rotate-[-10deg]">
            ?
          </div>

          <h2 className="font-header text-3xl md:text-4xl text-ink-black mb-1 uppercase tracking-wide">
            Banker's Offer
          </h2>
          <div className="w-24 h-1 bg-bloomberg-orange mb-8"></div>

          {/* The Offer Amount - Styled like a typed check */}
          <div className="relative w-full bg-white border-2 border-dashed border-ink-black/30 p-6 mb-8">
            <span className="absolute -top-3 left-4 bg-paper-bg px-2 text-xs font-mono text-grid-line uppercase">
              Net Amount
            </span>
            
            <div className="font-mono text-5xl md:text-6xl font-bold text-ink-black tracking-tighter">
              ${offer.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 w-full font-header">
            
            {/* DEAL: Solid Black */}
            <button
              onClick={onDeal}
              className="flex-1 bg-ink-black text-bloomberg-orange py-4 text-2xl uppercase tracking-widest border-2 border-ink-black hover:bg-bloomberg-orange hover:text-ink-black transition-colors"
            >
              Deal
            </button>

            {/* NO DEAL: Outline */}
            <button
              onClick={onNoDeal}
              className="flex-1 bg-transparent text-ink-black py-4 text-2xl uppercase tracking-widest border-2 border-ink-black hover:bg-ink-black hover:text-paper-bg transition-colors"
            >
              No Deal
            </button>
            
          </div>

          {/* Footer Code */}
          <div className="mt-6 flex gap-4 text-[10px] font-mono text-grid-line uppercase tracking-widest">
            <span>Ref: B-2468</span>
            <span>//</span>
            <span>Auth: BANKER</span>
          </div>

          {/* Scroll Down Indicator */}
          <div className="mt-6 flex flex-col items-center animate-bounce">
            <span className="text-xs font-mono text-bloomberg-orange uppercase tracking-widest mb-1">
              Scroll down for Analysis
            </span>
            <svg 
              className="w-5 h-5 text-bloomberg-orange" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BankerPhone;
