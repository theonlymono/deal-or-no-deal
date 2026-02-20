'use client';

import React, { useEffect, useState } from 'react';

interface GameTheoryTerminalProps {
  remainingValues: number[];
  bankerOffer: number | null;
}

interface GameTheoryMetrics {
  laplaceValue: number;      // Expected Value (Average)
  waldValue: number;         // Maximin (Lowest value - worst case)
  maximaxValue: number;      // Maximax (Highest value - best case)
  expectedUtility: number;   // Average utility from logarithmic function
  certaintyEquivalent: number; // Risk-adjusted fair value
}

const GameTheoryTerminal: React.FC<GameTheoryTerminalProps> = ({
  remainingValues,
  bankerOffer,
}) => {
  const [displayedMetrics, setDisplayedMetrics] = useState<Partial<GameTheoryMetrics>>({});
  const [typedRecommendation, setTypedRecommendation] = useState('');
  const [calculationStep, setCalculationStep] = useState(0);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  const toggleInfo = (key: string) => {
    setActiveInfo(activeInfo === key ? null : key);
  };

  const calculateMetrics = (): GameTheoryMetrics | null => {
    if (!remainingValues || remainingValues.length === 0) return null;

    const n = remainingValues.length;
    const total = remainingValues.reduce((sum, val) => sum + val, 0);
    
    const laplaceValue = total / n;
    const waldValue = Math.min(...remainingValues);
    const maximaxValue = Math.max(...remainingValues);
    
    const utilities = remainingValues.map(val => Math.log(val + 1));
    const expectedUtility = utilities.reduce((sum, u) => sum + u, 0) / n;
    const certaintyEquivalent = Math.exp(expectedUtility) - 1;

    return {
      laplaceValue,
      waldValue,
      maximaxValue,
      expectedUtility,
      certaintyEquivalent,
    };
  };

  const generateRecommendation = (metrics: GameTheoryMetrics): string => {
    if (bankerOffer === null) {
      return 'AWAITING BANKER PROPOSAL...';
    }

    const { certaintyEquivalent: ce, laplaceValue: ev } = metrics;

    if (bankerOffer >= ev) {
      return 'DEAL HIGHLY RECOMMENDED [MATHEMATICALLY DOMINANT]';
    } else if (bankerOffer >= ce) {
      return 'DEAL RECOMMENDED [RATIONAL RISK AVERSION]';
    } else {
      return 'NO DEAL RECOMMENDED [INSUFFICIENT UTILITY]';
    }
  };

  useEffect(() => {
    const metrics = calculateMetrics();
    if (!metrics) return;

    const recommendation = generateRecommendation(metrics);
    setTypedRecommendation('');
    
    let i = 0;
    const interval = setInterval(() => {
      if (i <= recommendation.length) {
        setTypedRecommendation(recommendation.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [remainingValues, bankerOffer]);

  useEffect(() => {
    const metrics = calculateMetrics();
    if (!metrics) {
      setDisplayedMetrics({});
      setCalculationStep(0);
      return;
    }

    setCalculationStep(0);
    const steps = [
      { key: 'waldValue', value: metrics.waldValue },
      { key: 'maximaxValue', value: metrics.maximaxValue },
      { key: 'laplaceValue', value: metrics.laplaceValue },
      { key: 'expectedUtility', value: metrics.expectedUtility },
      { key: 'certaintyEquivalent', value: metrics.certaintyEquivalent },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setDisplayedMetrics(prev => ({ ...prev, [step.key]: step.value }));
        setCalculationStep(index + 1);
      }, index * 150);
    });
  }, [remainingValues]);

  const metrics = calculateMetrics();
  if (!metrics) return null;

  const formatCurrency = (value: number): string => {
    return `$${Math.round(value).toLocaleString()}`;
  };

  const formatUtility = (value: number): string => {
    return value.toFixed(4);
  };

  const getRecommendationStyle = (): string => {
    if (!bankerOffer) return 'text-[#A8A295]';
    
    if (bankerOffer >= metrics.laplaceValue) {
      return 'bg-[#1A1A1A] text-[#EAE5D9] animate-pulse px-2 py-1';
    } else if (bankerOffer >= metrics.certaintyEquivalent) {
      return 'text-[#1A1A1A] font-extrabold';
    } else {
      return 'text-[#dc2626] font-extrabold';
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto mt-20 px-6 relative z-10 font-mono">

      {/* Decorative "Cut Here" Line */}
      <div className="w-full flex items-center gap-4 mb-8 opacity-50">
        <div className="h-px bg-[#1A1A1A] flex-1 border-t-2 border-dashed border-[#1A1A1A]"></div>
        <span className="font-mono text-xs text-[#1A1A1A] uppercase tracking-widest">Game Theory Terminal </span>
        <div className="h-px bg-[#1A1A1A] flex-1 border-t-2 border-dashed border-[#1A1A1A]"></div>
      </div>

      {/* Light Mode / Ledger Container */}
      <div className="relative bg-[#fafaf7] border-2 border-[#1A1A1A] shadow-[6px_6px_0px_rgba(26,26,26,1)] p-1 text-[#1A1A1A]">
        
        {/* Graph Paper / Dot Matrix Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="w-full h-full bg-[linear-gradient(to_right,rgba(26,26,26,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,26,26,0.03)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
        </div>

        {/* Header */}
        <div className="bg-[#D4CDC0] border-b-2 border-[#1A1A1A] px-4 py-2 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#1A1A1A] rounded-full animate-pulse"></div>
            <span className="text-[#1A1A1A] font-bold uppercase tracking-widest text-sm">
              THEORY MODULE // SYS V1.0
            </span>
          </div>
          <div className="text-xs text-[#A8A295] uppercase font-bold tracking-widest bg-[#EAE5D9] px-2 py-0.5 border border-[#A8A295]">
            STRAFFIN: ON
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          
          {/* Status Bar */}
          <div className="mb-6 border-b-2 border-[#1A1A1A] pb-2 flex justify-between">
            <span className="text-[#A8A295] text-xs uppercase tracking-widest font-bold">
              &gt; SYSTEM ACTIVE
            </span>
            <span className="text-[#A8A295] text-xs uppercase tracking-widest font-bold bg-[#EAE5D9] px-2 rounded-sm">
              REMAINING: [{remainingValues.length}]
            </span>
          </div>

          {/* Games Against Nature Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Wald Method */}
            <div className={`border-l-4 border-[#1A1A1A] pl-3 transition-opacity duration-150 ${calculationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center mb-1">
                <div className="text-[10px] text-[#A8A295] uppercase tracking-widest font-bold">
                  [ WALD / MAXIMIN ]
                </div>
                <button onClick={() => toggleInfo('wald')} className="ml-2 text-[#FF5500] hover:text-[#1A1A1A] transition-colors">[ ? ]</button>
              </div>
              <div className="text-[#1A1A1A] font-extrabold text-2xl tracking-tight">
                {displayedMetrics.waldValue !== undefined ? formatCurrency(displayedMetrics.waldValue) : '---'}
              </div>
              <div className="text-[9px] text-[#A8A295] mt-1 uppercase font-bold">Absolute Floor</div>
              {activeInfo === 'wald' && (
                <div className="bg-[#D4CDC0] border border-dashed border-[#1A1A1A]/50 p-2 mt-2 text-[10px] md:text-xs text-[#1A1A1A] leading-relaxed font-sans">
                  ကံအဆိုးဆုံး အခြေအနေအတွက် တွက်ထားတဲ့ ဂဏန်းပါ။ ရှေ့ဆက်ကစားလို့ အဆိုးဆုံးဖြစ်သွားရင်တောင် အနည်းဆုံး ဒီလောက်တော့ သေချာပေါက် ရမယ်ဆိုတဲ့ အောက်ထစ်ပမာဏ (Absolute Floor) ပါ။
                </div>
              )}
            </div>

            {/* Laplace Method */}
            <div className={`border-l-4 border-[#FF5500] pl-3 transition-opacity duration-150 ${calculationStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center mb-1">
                <div className="text-[10px] text-[#FF5500] uppercase tracking-widest font-bold">
                  [ LAPLACE / EV ]
                </div>
                <button onClick={() => toggleInfo('laplace')} className="ml-2 text-[#FF5500] hover:text-[#1A1A1A] transition-colors">[ ? ]</button>
              </div>
              <div className="text-[#FF5500] font-extrabold text-2xl tracking-tight">
                {displayedMetrics.laplaceValue !== undefined ? formatCurrency(displayedMetrics.laplaceValue) : '---'}
              </div>
              <div className="text-[9px] text-[#A8A295] mt-1 uppercase font-bold">Statistical Average</div>
              {activeInfo === 'laplace' && (
                <div className="bg-[#D4CDC0] border border-dashed border-[#1A1A1A]/50 p-2 mt-2 text-[10px] md:text-xs text-[#1A1A1A] leading-relaxed font-sans">
                  သင်္ချာသဘောအရ မျှော်မှန်းလို့ရတဲ့ ပျမ်းမျှပမာဏပါ။ ကျန်နေသေးတဲ့ သေတ္တာတွေထဲက ငွေတွေအကုန်ပေါင်းပြီး သေတ္တာအရေအတွက်နဲ့ စားထားတာဖြစ်လို့ ဂိမ်းရဲ့ လက်ရှိ 'အကြမ်းဖျင်းတန်ကြေး' လို့ မှတ်ယူနိုင်ပါတယ်။
                </div>
              )}
            </div>

            {/* Maximax Method */}
            <div className={`border-l-4 border-[#1A1A1A] pl-3 transition-opacity duration-150 ${calculationStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center mb-1">
                <div className="text-[10px] text-[#A8A295] uppercase tracking-widest font-bold">
                  [ MAXIMAX ]
                </div>
                <button onClick={() => toggleInfo('maximax')} className="ml-2 text-[#FF5500] hover:text-[#1A1A1A] transition-colors">[ ? ]</button>
              </div>
              <div className="text-[#1A1A1A] font-extrabold text-2xl tracking-tight">
                {displayedMetrics.maximaxValue !== undefined ? formatCurrency(displayedMetrics.maximaxValue) : '---'}
              </div>
              <div className="text-[9px] text-[#A8A295] mt-1 uppercase font-bold">Theoretical Ceiling</div>
              {activeInfo === 'maximax' && (
                <div className="bg-[#D4CDC0] border border-dashed border-[#1A1A1A]/50 p-2 mt-2 text-[10px] md:text-xs text-[#1A1A1A] leading-relaxed font-sans">
                  အကောင်းဆုံး အခြေအနေကို မျှော်မှန်းထားတဲ့ ဂဏန်းပါ။ သင်သာ ကံအကောင်းဆုံးဖြစ်ပြီး အကြီးဆုံးသေတ္တာကို ရခဲ့မယ်ဆိုရင် ရနိုင်မယ့် အမြင့်ဆုံးပမာဏပါ။
                </div>
              )}
            </div>
          </div>

          {/* Utility Theory Section */}
          <div className={`bg-[#EAE5D9] border-2 border-[#1A1A1A] p-4 mb-8 shadow-[4px_4px_0px_rgba(26,26,26,0.1)] transition-opacity duration-150 ${calculationStep >= 4 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-[10px] text-[#1A1A1A] font-bold uppercase tracking-widest mb-4 border-b-2 border-[#A8A295] pb-2 flex items-center gap-2">
              <span className="bg-[#1A1A1A] text-[#EAE5D9] px-1">LOG</span> UTILITY ANALYSIS [ U(X) = LN(X+1) ]
            </div>
            
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex justify-between items-center border-b border-dashed border-[#A8A295] pb-1">
                  <div className="flex items-center">
                    <span className="text-xs text-[#A8A295] uppercase font-bold">Exp. Utility (EU)</span>
                    <button onClick={() => toggleInfo('eu')} className="ml-2 text-[#FF5500] hover:text-[#1A1A1A] transition-colors text-[10px]">[ ? ]</button>
                  </div>
                  <span className="text-[#1A1A1A] text-lg font-bold">
                    {displayedMetrics.expectedUtility !== undefined ? formatUtility(displayedMetrics.expectedUtility) : '---'}
                  </span>
                </div>
                {activeInfo === 'eu' && (
                  <div className="bg-[#D4CDC0] border border-dashed border-[#1A1A1A]/50 p-2 mt-2 text-[10px] md:text-xs text-[#1A1A1A] leading-relaxed font-sans">
                    လူတွေက ငွေပမာဏ နည်းနည်းကနေ များလာရင် ပိုဝမ်းသာတတ်ပေမယ့်၊ အရမ်းများသွားရင်တော့ ထပ်တိုးလာတဲ့ငွေအပေါ် စိတ်လှုပ်ရှားမှု လျော့သွားတတ်ပါတယ်။ အဲ့ဒီလို 'အရှုံးမခံချင်တဲ့ စိတ်' (Risk Aversion) ကို သင်္ချာနည်း (Logarithm) နဲ့ တွက်ထားတဲ့ စိတ်ကျေနပ်မှု မျှော်မှန်းတန်ဖိုးပါ။
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center border-b border-dashed border-[#A8A295] pb-1">
                  <div className="flex items-center">
                    <span className="text-xs text-[#1A1A1A] uppercase font-bold bg-[#D4CDC0] px-1">Certainty Eq. (CE)</span>
                    <button onClick={() => toggleInfo('ce')} className="ml-2 text-[#FF5500] hover:text-[#1A1A1A] transition-colors text-[10px]">[ ? ]</button>
                  </div>
                  <span className="text-[#1A1A1A] text-xl font-extrabold">
                    {displayedMetrics.certaintyEquivalent !== undefined ? formatCurrency(displayedMetrics.certaintyEquivalent) : '---'}
                  </span>
                </div>
                {activeInfo === 'ce' && (
                  <div className="bg-[#D4CDC0] border border-dashed border-[#1A1A1A]/50 p-2 mt-2 text-[10px] md:text-xs text-[#1A1A1A] leading-relaxed font-sans">
                    ရှေ့ဆက်ပြီး ရင်တမမနဲ့ စွန့်စားကစားမယ့်အစား 'ဒီလောက်ငွေကို သေချာပေါက် လက်ငင်းရရင်တော့ တန်တယ်၊ ကျေနပ်ပြီ' လို့ ဆိုနိုင်တဲ့ မျှတတဲ့ ငွေပမာဏပါ။ Banker ပေးတဲ့ငွေက ဒီထက်များနေရင် ယူ (Deal) လိုက်တာက ပိုတန်ပါတယ်။
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Banker Offer Comparison */}
          {bankerOffer !== null && bankerOffer > 0 && (
            <div className="mb-6">
              <div className="text-[10px] text-[#1A1A1A]/60 font-bold uppercase tracking-widest mb-2">
                &gt; LIVE SPREAD ANALYSIS
              </div>
              <div className="flex flex-col md:flex-row gap-4 bg-[#EAE5D9] border-2 border-[#1A1A1A] p-4">
                <div className="flex-1">
                  <div className="text-[10px] text-[#1A1A1A]/50 font-bold uppercase bg-[#D4CDC0] inline-block px-1 border border-[#A8A295] mb-1">Banker Bid</div>
                  <div className="text-[#1A1A1A] text-2xl font-extrabold tracking-tighter">
                    {formatCurrency(bankerOffer)}
                  </div>
                </div>
                
                <div className="hidden md:flex flex-col justify-center items-center px-4">
                  <div className="h-full w-0.5 bg-[#1A1A1A]"></div>
                </div>

                <div className="flex-1">
                  <div className="text-[10px] text-[#1A1A1A]/50 font-bold uppercase mb-1">Delta vs CE</div>
                  <div className={`text-xl font-extrabold tracking-tighter ${bankerOffer >= metrics.certaintyEquivalent ? 'text-[#00873E]' : 'text-[#dc2626]'}`}>
                    {bankerOffer >= metrics.certaintyEquivalent ? '+' : ''}
                    {formatCurrency(bankerOffer - metrics.certaintyEquivalent)}
                  </div>
                </div>

                <div className="hidden md:flex flex-col justify-center items-center px-4">
                  <div className="h-full w-0.5 bg-[#1A1A1A]"></div>
                </div>

                <div className="flex-1">
                  <div className="text-[10px] text-[#1A1A1A]/50 font-bold uppercase mb-1">Delta vs EV</div>
                  <div className={`text-xl font-extrabold tracking-tighter ${bankerOffer >= metrics.laplaceValue ? 'text-[#00873E]' : 'text-[#dc2626]'}`}>
                    {bankerOffer >= metrics.laplaceValue ? '+' : ''}
                    {formatCurrency(bankerOffer - metrics.laplaceValue)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Savage Regret Matrix */}
          {bankerOffer !== null && bankerOffer > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="text-[10px] text-[#1A1A1A]/60 font-bold uppercase tracking-widest">
                  &gt; SAVAGE REGRET MATRIX [MINIMAX REGRET]
                </div>
                <button onClick={() => toggleInfo('savage')} className="ml-2 text-[#FF5500] hover:text-[#1A1A1A] transition-colors">[ ? ]</button>
              </div>
              {activeInfo === 'savage' && (
                <div className="bg-[#D4CDC0] border border-dashed border-[#1A1A1A]/50 p-2 mb-4 text-[10px] md:text-xs text-[#1A1A1A] leading-relaxed font-sans">
                  ယူလိုက်တာပဲဖြစ်ဖြစ်၊ မယူဘဲ ဆက်ကစားတာပဲဖြစ်ဖြစ် နောက်မှ မှားသွားပြီဆိုပြီး အကြီးအကျယ် ရနိုင်တဲ့ 'နောင်တ (Regret)' တန်ဖိုးကို တွက်ပြထားတာပါ။ နောင်တ အရနည်းမယ့် ရွေးချယ်မှုကို [OPTIMAL] (အကောင်းဆုံး) လို့ ပြပေးထားပါတယ်။
                </div>
              )}
              {(() => {
                const regretIfDeal = Math.max(0, metrics.maximaxValue - bankerOffer);
                const regretIfNoDeal = Math.max(0, bankerOffer - metrics.waldValue);
                const dealIsOptimal = regretIfDeal <= regretIfNoDeal;

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* DEAL Box */}
                    <div className={`bg-[#EAE5D9] p-4 ${dealIsOptimal ? 'border-2 border-[#00873E] bg-[#00873E]/10' : 'border border-[#1A1A1A]/20'}`}>
                      <div className="text-[10px] text-[#1A1A1A]/50 font-bold uppercase mb-2 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${dealIsOptimal ? 'bg-[#00873E]' : 'bg-[#A8A295]'}`}></span>
                        ACTION: ACCEPT DEAL
                        {dealIsOptimal && <span className="text-[#00873E] font-extrabold">[OPTIMAL]</span>}
                      </div>
                      <div className="text-[#1A1A1A]/70 text-xs uppercase font-bold mb-1">Regret If Deal</div>
                      <div className={`text-2xl font-extrabold tracking-tighter ${dealIsOptimal ? 'text-[#00873E]' : 'text-[#1A1A1A]'}`}>
                        {formatCurrency(regretIfDeal)}
                      </div>
                      <div className="text-[9px] text-[#1A1A1A]/40 mt-1 uppercase">Max(0, Maximax - Offer)</div>
                    </div>

                    {/* NO DEAL Box */}
                    <div className={`bg-[#EAE5D9] p-4 ${!dealIsOptimal ? 'border-2 border-[#00873E] bg-[#00873E]/10' : 'border border-[#1A1A1A]/20'}`}>
                      <div className="text-[10px] text-[#1A1A1A]/50 font-bold uppercase mb-2 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${!dealIsOptimal ? 'bg-[#00873E]' : 'bg-[#A8A295]'}`}></span>
                        ACTION: NO DEAL
                        {!dealIsOptimal && <span className="text-[#00873E] font-extrabold">[OPTIMAL]</span>}
                      </div>
                      <div className="text-[#1A1A1A]/70 text-xs uppercase font-bold mb-1">Regret If No Deal</div>
                      <div className={`text-2xl font-extrabold tracking-tighter ${!dealIsOptimal ? 'text-[#00873E]' : 'text-[#1A1A1A]'}`}>
                        {formatCurrency(regretIfNoDeal)}
                      </div>
                      <div className="text-[9px] text-[#1A1A1A]/40 mt-1 uppercase">Max(0, Offer - Wald)</div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Hurwicz Optimism Index */}
          {bankerOffer !== null && bankerOffer > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="text-[10px] text-[#1A1A1A]/60 font-bold uppercase tracking-widest">
                  &gt; HURWICZ OPTIMISM INDEX (α) [CRITERION OF OPTIMISM]
                </div>
                <button onClick={() => toggleInfo('hurwicz')} className="ml-2 text-[#FF5500] hover:text-[#1A1A1A] transition-colors">[ ? ]</button>
              </div>
              {activeInfo === 'hurwicz' && (
                <div className="bg-[#D4CDC0] border border-dashed border-[#1A1A1A]/50 p-2 mb-4 text-[10px] md:text-xs text-[#1A1A1A] leading-relaxed font-sans">
                  Banker ပေးတဲ့ငွေဟာ လက်ကျန်သေတ္တာတွေရဲ့ အနည်းဆုံးနဲ့ အများဆုံးကြား ဘယ်လောက် ရာခိုင်နှုန်းလောက်မှာ ရှိနေလဲဆိုတာကို တွက်ပြထားတာပါ။ မယူဘဲ (NO DEAL) ဆက်ကစားမယ်ဆိုရင်တော့ သင့်ရဲ့ ကံကောင်းနိုင်မယ်လို့ ယုံကြည်တဲ့ ကိုယ်ပိုင်အကောင်းမြင်စိတ် (Optimism) က ဒီရာခိုင်နှုန်းထက် ပိုများနေဖို့ လိုပါမယ်။
                </div>
              )}
              {(() => {
                const spreadRange = metrics.maximaxValue - metrics.waldValue;
                let alpha = 0;
                if (spreadRange > 0) {
                  alpha = (bankerOffer - metrics.waldValue) / spreadRange;
                }
                // Bound alpha between 0 and 1
                alpha = Math.max(0, Math.min(1, alpha));
                const alphaPercent = (alpha * 100).toFixed(1);

                return (
                  <div className="bg-[#EAE5D9] border-2 border-[#1A1A1A] p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-[10px] text-[#1A1A1A]/50 font-bold uppercase bg-[#D4CDC0] px-2 py-1 border border-[#A8A295]">
                          IMPLIED ALPHA
                        </div>
                        <div className="text-[#FF5500] text-3xl font-extrabold tracking-tighter">
                          {alphaPercent}%
                        </div>
                      </div>
                      <div className="text-[9px] text-[#1A1A1A]/40 text-right">
                        FORMULA: α = (Offer - Wald) / (Maximax - Wald)
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="relative">
                      {/* Bar Background */}
                      <div className="w-full h-6 bg-[#D4CDC0] border border-[#1A1A1A]">
                        {/* Fill Bar */}
                        <div 
                          className="h-full bg-[#FF5500] transition-all duration-500 ease-out"
                          style={{ width: `${alphaPercent}%` }}
                        ></div>
                      </div>

                      {/* Labels */}
                      <div className="flex justify-between mt-2">
                        <span className="text-[10px] text-[#1A1A1A]/60 font-bold uppercase">
                          0% (Pessimist)
                        </span>
                        <span className="text-[10px] text-[#1A1A1A]/60 font-bold uppercase">
                          100% (Optimist)
                        </span>
                      </div>
                    </div>

                    {/* Formula Details */}
                    <div className="mt-4 pt-3 border-t border-[#A8A295]/50 grid grid-cols-3 gap-4 text-[9px] text-[#1A1A1A]/50 uppercase">
                      <div>
                        <span className="font-bold">Spread Range:</span> {formatCurrency(spreadRange)}
                      </div>
                      <div>
                        <span className="font-bold">Offer - Wald:</span> {formatCurrency(bankerOffer - metrics.waldValue)}
                      </div>
                      <div>
                        <span className="font-bold">Interpretation:</span> {alpha < 0.3 ? 'Pessimistic Bias' : alpha > 0.7 ? 'Optimistic Bias' : 'Neutral'}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Theoretical Action */}
          <div className="mt-8 pt-4 border-t-4 border-[#1A1A1A]">
            <div className="text-[10px] text-[#A8A295] font-bold uppercase tracking-widest mb-2">
              SYSTEM DIRECTIVE // ACTION
            </div>
            <div className="text-lg md:text-xl font-bold uppercase tracking-widest flex items-center">
              <span className="text-[#1A1A1A] mr-3 font-extrabold">CMD&gt;</span>
              <span className={getRecommendationStyle()}>
                {typedRecommendation}
              </span>
              <span className="w-3 h-5 bg-[#1A1A1A] ml-1 animate-[ping_1s_steps(2,start)_infinite] inline-block"></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GameTheoryTerminal;