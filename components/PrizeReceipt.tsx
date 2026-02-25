import React, { forwardRef } from 'react';

interface PrizeReceiptProps {
  amount: number;
  date: string;
  transactionId: string;
}

const PrizeReceipt = forwardRef<HTMLDivElement, PrizeReceiptProps>(
  ({ amount, date, transactionId }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[600px] h-fit bg-paper-bg p-8 relative box-border flex flex-col items-center justify-center font-mono overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(#A8A295 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          backgroundColor: '#EAE5D9' // explicit paper-bg for html2canvas/html-to-image
        }}
      >
        {/* Decorative Side Borders to mimic perforated retro continuous paper */}
        <div className="absolute top-0 left-2 bottom-0 w-2 border-l-[3px] border-r-[3px] border-ink-black border-dashed opacity-40 mix-blend-multiply"></div>
        <div className="absolute top-0 right-2 bottom-0 w-2 border-l-[3px] border-r-[3px] border-ink-black border-dashed opacity-40 mix-blend-multiply"></div>
        
        <div className="bg-paper-bg border-4 border-ink-black p-6 md:p-8 relative z-10 w-full max-w-lg shadow-[8px_8px_0px_#1A1A1A]">
          {/* Header */}
          <div className="text-center mb-6 border-b-4 border-ink-black pb-4">
            <h1 className="text-3xl font-header font-extrabold text-ink-black tracking-widest uppercase mb-2">
              Wire Transfer Receipt
            </h1>
            <p className="font-mono text-xs md:text-sm font-bold tracking-[0.2em] bg-ink-black text-paper-bg py-1 inline-block px-4 shadow-[4px_4px_0px_#FF5500]">
              HAK DYNAMIC FINANCIAL SYSTEMS
            </p>
          </div>

          {/* Transaction Metadata */}
          <div className="flex flex-col gap-4 mb-8 font-mono text-ink-black font-semibold text-sm md:text-base">
            <div className="flex justify-between border-b-2 border-ink-black/20 border-dotted pb-1">
              <span className="opacity-70 tracking-widest">DATE/TIME:</span>
              <span>{date}</span>
            </div>
            <div className="flex justify-between border-b-2 border-ink-black/20 border-dotted pb-1">
              <span className="opacity-70 tracking-widest">TXN_ID:</span>
              <span className="text-bloomberg-orange">{transactionId}</span>
            </div>
            <div className="flex justify-between border-b-2 border-ink-black/20 border-dotted pb-1 items-center">
              <span className="opacity-70 tracking-widest">STATUS:</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-bloomberg-orange"></span>
                <span className="underline decoration-wavy decoration-ink-black/40">CLEARED</span>
              </span>
            </div>
          </div>

          {/* Final Amount Display */}
          <div className="bg-ink-black p-6 text-center transform -rotate-2 mb-8 border-2 border-bloomberg-orange shadow-[6px_6px_0px_#FF5500] relative">
            <div className="absolute top-2 left-2 w-2 h-2 bg-paper-bg opacity-50"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-paper-bg opacity-50"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-paper-bg opacity-50"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-paper-bg opacity-50"></div>

            <p className="font-mono text-paper-dark text-xs mb-3 font-bold tracking-widest opacity-80 uppercase">
              // Final Amount Disbursed //
            </p>
            <p className="font-header text-5xl md:text-6xl text-bloomberg-orange tracking-tight" style={{ textShadow: '2px 2px 0px #1A1A1A' }}>
              ${amount.toLocaleString()}
            </p>
          </div>

          {/* Authorized Stamp */}
          <div className="border-t-4 border-ink-black pt-6 flex flex-col items-center relative">
            <div className="text-center font-mono opacity-80 w-full mb-4">
              <p className="text-sm font-bold tracking-widest uppercase text-ink-black mb-1">
                Authorized By: The Banker
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-ink-black mt-2 bg-ink-black/10 py-1">
                System Developed By HAK DYNAMIC
              </p>
            </div>
            
            {/* Stamp Overlay */}
            <div className="absolute bottom-4 right-2 border-4 border-bloomberg-orange text-bloomberg-orange px-3 py-1 font-header text-xl transform -rotate-12 opacity-90 mix-blend-multiply flex flex-col items-center justify-center">
              <span className="tracking-widest font-bold">OFFICIAL</span>
              <span className="text-xs tracking-widest">SEAL</span>
            </div>

            <div className="absolute bottom-8 left-2 opacity-50 font-mono text-xs font-bold transform -rotate-90 origin-left">
              * CONFIDENTIAL *
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PrizeReceipt.displayName = 'PrizeReceipt';

export default PrizeReceipt;
