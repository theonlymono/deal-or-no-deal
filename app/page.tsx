'use client';

import React, { useState, useEffect } from 'react';
import { MONEY_VALUES, ROUND_STRUCTURE, RISK_FACTORS, GameState } from '../lib/gameConstants';
import Board from '../components/Board';
import Case from '../components/Case';
import BankerPhone from '../components/BankerPhone';
import GameRules from '@/components/GameRules';
import GameTheoryTerminal from '@/components/GameTheoryTerminal';
import HeaderTicker from '@/components/HeaderTicker';
import TickerMarquee from '@/components/TickerMarquee';
import HostDialogue from '@/components/HostDialogue';
import StartScreen from '@/components/StartScreen';

interface CaseData {
  id: number;
  value: number;
  isOpen: boolean;
}

export default function Home() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [cases, setCases] = useState<CaseData[]>([]);
  const [myCaseId, setMyCaseId] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>('PICK_CASE');
  const [round, setRound] = useState(1);
  const [casesToOpenInRound, setCasesToOpenInRound] = useState(6);
  const [eliminatedValues, setEliminatedValues] = useState<number[]>([]);
  const [bankerOffer, setBankerOffer] = useState(0);
  const [message, setMessage] = useState("Select your case to keep.");
  const [dialogueQueue, setDialogueQueue] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<{ winAmount: number; source: 'DEAL' | 'CASE' } | null>(null);

  useEffect(() => {
    if ((gameState === 'GAME_OVER' || gameState === 'DEAL_ACCEPTED') && finalResult) {
      try {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([120, 60, 120, 60, 300]);
        }
      } catch {}
    }
  }, [gameState, finalResult]);

  // Initialize Game
  useEffect(() => {
    // Helper to shuffle array (client-side only)
    const shuffleArray = <T,>(array: T[]): T[] => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    
    initGame(shuffleArray);
  }, []);

  const initGame = (shuffleArray: <T>(array: T[]) => T[]) => {
    const shuffledValues = shuffleArray(MONEY_VALUES);
    const initialCases = shuffledValues.map((value, index) => ({
      id: index + 1,
      value: value,
      isOpen: false,
    }));
    setCases(initialCases);
    setMyCaseId(null);
    setGameState('PICK_CASE');
    setRound(1);
    setCasesToOpenInRound(ROUND_STRUCTURE[0].casesToOpen);
    setEliminatedValues([]);
    setBankerOffer(0);
    setMessage("Select your case to keep.");
    setFinalResult(null);
    // Trigger game start dialogue
    setTimeout(() => {
      triggerDialogue([
        "ကြိုဆိုပါတယ်။ သင့်ရဲ့ ကံကြမ္မာကို ပြောင်းလဲပေးမယ့် ကစားပွဲကနေ စတင်လိုက်ရအောင်။",
        "သေတ္တာ (၂၆) လုံးထဲက သင့်အတွက် အရေးအကြီးဆုံး တစ်လုံးကို အရင်ရွေးချယ်ပါ။"
      ]);
    }, 500);
  };

  const GOOD_OPEN_DIALOGUES = [
  [
    "အရမ်းကောင်းတယ်။ ဂဏန်းအသေးလေး ပယ်နိုင်ခဲ့ပြီ။",
    "ဒီအတိုင်း ဆက်သွားရအောင်!"
  ],
  [
    "အမိုက်စားပဲ! ဒေါ်လာအသေးတွေ ဖယ်နိုင်တာ Banker ကို ဖိအားပေးနိုင်တယ်။",
    "နောက်တစ်လုံးလည်း ဒီလိုပဲ ဖြစ်ပါစေ!"
  ],
  [
    "လှလိုက်တဲ့ ရွေးချယ်မှု! ကံတရားက သင့်ဘက်မှာ ရှိနေပုံရတယ်။",
    "Game Theory အရဆိုရင် ဒါဟာ အကောင်းဆုံး အခြေအနေပဲ။"
  ],
  [
    "ရှယ်ပဲဗျာ! အကြီးတွေ အကုန်ကျန်သေးတယ်။",
    "Banker တော့ ချွေးပြန်နေလောက်ပြီ။ ဆက်ရွေးပါ။"
  ]
];

const BAD_OPEN_DIALOGUES = [
  [
    "ဟာ... ဒေါ်လာအကြီးကြီး ပါသွားပြီဗျာ။",
    "စိတ်လျှော့ပါ၊ ရှေ့ဆက်ပြီး သတိထားရွေးကြရအောင်။"
  ],
  [
    "နှမြောစရာပဲ... ဒါပေမယ့် ပွဲက မပြီးသေးဘူးနော်။",
    "မျှော်လင့်ချက် မဖြတ်ပါနဲ့ဦး၊ ကျန်တဲ့ သေတ္တာတွေကို အာရုံစိုက်မယ်။"
  ],
  [
    "အိုကေ... နည်းနည်းတော့ နာသွားတယ်။",
    "Expected Value ကျသွားပေမယ့် သင့်သေတ္တာထဲမှာ အကြီးကြီး ပါနိုင်သေးတယ်။"
  ],
  [
    "Banker ကတော့ ပြုံးနေလောက်ပြီ။",
    "ဒါပေမယ့် သင့်ဆီမှာ အခွင့်အရေး ရှိပါသေးတယ်။ နောက်တစ်လုံး ရွေးလိုက်ပါ။"
  ]
];

  const triggerDialogue = (lines: string[]) => {
    setDialogueQueue(lines);
  };

  const handleDialogueComplete = () => {
    setDialogueQueue([]);
  };

  const resetGame = () => {
    const shuffleArray = <T,>(array: T[]): T[] => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    
    initGame(shuffleArray);
  };

  const calculateOffer = (currentEliminated: number[], currentRound: number) => {
    const remainingValues = MONEY_VALUES.filter(v => !currentEliminated.includes(v));
    const total = remainingValues.reduce((sum, val) => sum + val, 0);
    const expectedValue = total / remainingValues.length;
    const riskFactor = RISK_FACTORS[currentRound] || 0.95;
    return Math.floor(expectedValue * riskFactor);
  };

  const handleCaseClick = (id: number) => {
    if (gameState === 'PICK_CASE') {
      setMyCaseId(id);
      setGameState('OPEN_CASES');
      setMessage(`Open ${casesToOpenInRound} case${casesToOpenInRound > 1 ? 's' : ''} to reveal values.`);
    } else if (gameState === 'OPEN_CASES') {
      if (id === myCaseId || cases.find(c => c.id === id)?.isOpen) return;

      const selectedCase = cases.find(c => c.id === id);
      if (!selectedCase) return;

      // Open the case
      const updatedCases = cases.map(c => 
        c.id === id ? { ...c, isOpen: true } : c
      );
      setCases(updatedCases);

      // Add to eliminated values
      const newEliminated = [...eliminatedValues, selectedCase.value];
      setEliminatedValues(newEliminated);

      // Decrement remaining cases to open
      const remaining = casesToOpenInRound - 1;
      setCasesToOpenInRound(remaining);

      if (remaining === 0) {
        // Round Over, Banker Calls
        const offer = calculateOffer(newEliminated, round);
        setBankerOffer(offer);
        setGameState('BANKER_OFFER');
        setMessage("The Banker is calling...");
        // Trigger banker offer dialogue
        triggerDialogue([
          "ခဏလေး... ဖုန်းဝင်လာတယ်။",
          "Banker ဆီကပါ။ သူက သင့်ရဲ့ ရပ်တည်ချက်ကို စမ်းသပ်နေပြီ။",
          "Game Theory Terminal ကို သေချာကြည့်ပြီး ဆုံးဖြတ်ပါ။"
        ]);
      } else {
        // Check if good or bad case opened (under $10,000 = good, $100,000+ = bad)
        if (selectedCase.value < 10000) {
          const randomIndex = Math.floor(Math.random() * GOOD_OPEN_DIALOGUES.length);
          triggerDialogue(GOOD_OPEN_DIALOGUES[randomIndex]);
        } else if (selectedCase.value >= 100000) {
          const randomIndex = Math.floor(Math.random() * BAD_OPEN_DIALOGUES.length);
          triggerDialogue(BAD_OPEN_DIALOGUES[randomIndex]);
        }
        setMessage(`Open ${remaining} case${remaining > 1 ? 's' : ''} to reveal values.`);
      }
    }
  };

  const handleDeal = () => {
    setFinalResult({ winAmount: bankerOffer, source: 'DEAL' });
    setGameState('DEAL_ACCEPTED');
    setMessage(`DEAL ACCEPTED! You won $${bankerOffer.toLocaleString()}`);
    // Trigger deal accepted dialogue
    triggerDialogue([
      "ကွန်ဂရက်ကျူလေးရှင်း!",
      "Banker ဆီကနေ အမြတ်ထုတ်နိုင်ခဲ့ပြီ။",
      "ဒါပေမယ့် သင်ရွေးခဲ့တဲ့ သေတ္တာထဲမှာ ဘာပါလဲ ကြည့်လိုက်ရအောင်..."
    ]);
  };

  const handleNoDeal = () => {
    // Check if it was the last round (2 cases left: 26 total - 24 eliminated = 2 remaining)
    const totalEliminated = eliminatedValues.length;
    const remainingCases = 26 - totalEliminated;
    // myCase is NOT opened.
    
    if (remainingCases <= 2) {
       // Game Over, Reveal My Case
       const myCase = cases.find(c => c.id === myCaseId);
       if (myCase) {
         setFinalResult({ winAmount: myCase.value, source: 'CASE' });
         setGameState('GAME_OVER');
         setMessage(`GAME OVER! Your case contained $${myCase.value.toLocaleString()}`);
         // Reveal my case
         setCases(prev => prev.map(c => c.id === myCaseId ? { ...c, isOpen: true } : c));
         // Trigger game over dialogue
         triggerDialogue([
           "ကစားပွဲ ပြီးဆုံးသွားပါပြီ။",
           "သင့်ရဲ့ ကိုယ်ပိုင်သေတ္တာထဲက ငွေကတော့..."
         ]);
       }
    } else {
      // Next Round
      const nextRound = round + 1;
      const nextRoundStructure = ROUND_STRUCTURE.find(r => r.round === nextRound);
      
      if (nextRoundStructure) {
        setRound(nextRound);
        setCasesToOpenInRound(nextRoundStructure.casesToOpen);
        setGameState('OPEN_CASES');
        setMessage(`Round ${nextRound}: Open ${nextRoundStructure.casesToOpen} cases.`);
        // Trigger no deal dialogue
        triggerDialogue([
          "သတ္တိရှိတဲ့ ဆုံးဖြတ်ချက်ပဲ။",
          "Banker ရဲ့ ငွေကို ငြင်းလိုက်ပြီ။ နောက်တစ်ဆင့် ဆက်သွားမယ်!"
        ]);
      } else {
         // Fallback if structure ends (shouldn't happen with correct constants)
         setGameState('GAME_OVER');
      }
    }
  };

  return (
    <main className="min-h-screen bg-paper-bg grid-bg relative overflow-hidden flex flex-col items-center pb-6">
      {showStartScreen && <StartScreen onStart={() => setShowStartScreen(false)} />}
      
      {/* Visual Effects */}
      <div className="crt-flicker pointer-events-none fixed inset-0 z-50 opacity-[0.02]"></div>
      
      {/* Header */}
      <HeaderTicker />
      
      {/* Marquee Ticker - Added Here */}
      {/* <TickerMarquee /> */}

      {/* Main Game Area */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl items-start justify-center gap-4 lg:gap-6 z-10 mb-20 md:mb-0 px-2 sm:px-4 mt-8 lg:mt-14">
        
        {/* Left Board (Low Values) - Hidden on Mobile Portrait, Shown on LG+ */}
        <div className="hidden lg:block w-48 sticky top-4">
           <Board eliminatedValues={eliminatedValues} side="left" />
        </div>

        {/* Center: Message & Cases */}
        <div className="flex-1 w-full max-w-4xl flex flex-col items-center">
            {/* Status Bar - Style: "Clean Instruction" */}
            <div className="w-full max-w-2xl mx-auto mb-4 lg:mb-8 relative">
               {/* Background box with Retro Shadow */}
               <div className="bg-paper-bg border-2 border-ink-black px-4 py-3 md:px-6 md:py-4 text-center shadow-[4px_4px_0px_rgba(26,26,26,0.15)]">
                 
                 {/* Decorative Corner Accents */}
                 <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-ink-black opacity-50"></div>
                 <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-ink-black opacity-50"></div>
                 <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-ink-black opacity-50"></div>
                 <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-ink-black opacity-50"></div>

                 {/* The Message */}
                 <p className="font-mono text-ink-black text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 md:gap-3">
                   {/* Blinking cursor effect to keep the terminal vibe but subtle */}
                   <span className="text-bloomberg-orange animate-pulse">►</span>
                   {message}
                 </p>
               </div>
            </div>

            {/* My Case Area */}
            {myCaseId && (
              <div className="mb-6 lg:mb-8 flex flex-col items-center animate-bounce-slow">
                <span className="font-header text-ink-black text-sm mb-1 tracking-widest bg-paper-dark px-2">YOUR CASE</span>
                <Case 
                  id={myCaseId} 
                  isOpen={cases.find(c => c.id === myCaseId)?.isOpen || false}
                  value={cases.find(c => c.id === myCaseId)?.value}
                  onClick={() => {}} // Can't click my case until end
                  disabled={true}
                  isMyCase={true}
                />
              </div>
            )}

            {/* Cases Grid */}
            {/* UPDATED: Better columns for mobile portrait and forced centering */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3 justify-center justify-items-center w-full max-w-3xl mx-auto px-2">
              {cases.filter(c => c.id !== myCaseId).map((c) => (
                <Case 
                  key={c.id} 
                  id={c.id} 
                  isOpen={c.isOpen}
                  value={c.value}
                  onClick={() => handleCaseClick(c.id)}
                  disabled={dialogueQueue.length > 0 || (gameState !== 'PICK_CASE' && gameState !== 'OPEN_CASES')}
                  isMyCase={false}
                />
              ))}
            </div>

            {/* Mobile Board (Both Columns) - Shown AFTER Cases on Portrait */}
            <div className="w-full lg:hidden mt-8 mb-6 px-2">
                 <Board eliminatedValues={eliminatedValues} side="both" />
            </div>
        </div>

        {/* Right Board (High Values) - Hidden on Mobile Portrait, Shown on LG+ */}
        <div className="hidden lg:block w-48 sticky top-4">
             <Board eliminatedValues={eliminatedValues} side="right" />
        </div>
      </div>

      <BankerPhone 
        isOpen={gameState === 'BANKER_OFFER'} 
        offer={bankerOffer} 
        onDeal={handleDeal} 
        onNoDeal={handleNoDeal} 
      />

      {/* Game Theory Analysis - Live Terminal */}
      {/* ဤနေရာတွင် ပြင်ဆင်ထားသည်: Banker ဖုန်းဆက်ချိန်တွင် Terminal ကို Modal ၏ အပေါ်သို့ ဆွဲတင်ရန် z-[70] ကို အသုံးပြုထားသည် */}
      {gameState !== 'PICK_CASE' && (
        <div className={`w-full transition-all duration-500 ${gameState === 'BANKER_OFFER' ? 'relative z-[70]' : 'relative z-10'}`}>
          <GameTheoryTerminal 
            remainingValues={MONEY_VALUES.filter(v => !eliminatedValues.includes(v))}
            bankerOffer={gameState === 'BANKER_OFFER' ? bankerOffer : null}
          />
        </div>
      )}

      <GameRules />
      
      {/* Game Over Modal / Result Display */}
      {(gameState === 'GAME_OVER' || gameState === 'DEAL_ACCEPTED') && finalResult && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4">
          <div className="bg-paper-bg p-8 border-4 border-bloomberg-orange max-w-lg w-full text-center shadow-2xl relative animate-in fade-in zoom-in duration-300">
             <h2 className="text-4xl font-header text-ink-black mb-4 underline decoration-wavy decoration-bloomberg-orange">
               {gameState === 'DEAL_ACCEPTED' ? 'DEAL MADE' : 'ROUND COMPLETE'}
             </h2>
             
             <div className="my-8 bg-ink-black p-4 rotate-1 shadow-lg">
                <p className="font-mono text-paper-bg text-lg mb-1">FINAL AMOUNT</p>
                <div className="text-bloomberg-orange font-bold text-4xl md:text-5xl font-mono">
                  ${finalResult.winAmount.toLocaleString()}
                </div>
             </div>
             
             {gameState === 'DEAL_ACCEPTED' && myCaseId && (
               <div className="mb-6 p-4 border-2 border-dashed border-ink-black/20">
                 <p className="text-sm text-ink-black mb-2 font-bold uppercase tracking-widest">Your Case Contained</p>
                 <div className="text-2xl font-mono text-ink-black font-bold">
                   ${cases.find(c => c.id === myCaseId)?.value.toLocaleString()}
                 </div>
               </div>
             )}

             <button 
               onClick={resetGame}
               className="w-full bg-ink-black text-paper-bg px-6 py-4 font-header text-2xl hover:bg-bloomberg-orange hover:text-ink-black transition-colors border-2 border-transparent hover:border-ink-black uppercase tracking-widest"
             >
               PLAY AGAIN
             </button>
          </div>
        </div>
      )}

      <HostDialogue 
        scriptLines={dialogueQueue}
        onComplete={handleDialogueComplete}
      />

    </main>
  );
}
