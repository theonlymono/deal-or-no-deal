'use client';

import React from 'react';

const GameRules = () => {
  const steps = [
    {
      id: 1,
      num: "၁", 
      title: "သေတ္တာရွေးချယ်ခြင်း", 
      desc: "ငွေပမာဏအမျိုးမျိုးပါဝင်သော သေတ္တာ (၂၆) လုံးအနက်မှ မိမိနှစ်သက်ရာ တစ်လုံးကို ရွေးချယ်သိမ်းဆည်းထားပါ။"
    },
    {
      id: 2,
      num: "၂", 
      title: "သေတ္တာဖွင့်လှစ်ခြင်း", 
      desc: "ကျန်ရှိသော သေတ္တာများကို တစ်လုံးစီဖွင့်ပါ။ ဖွင့်လိုက်သော တန်ဖိုးသည် ဇယားမှ ပယ်ဖျက်သွားမည်။" 
    },
    {
      id: 3,
      num: "၃", 
      title: "ဘဏ်၏ကမ်းလှမ်းမှု", 
      desc: "အလှည့်ပြီးတိုင်း ဘဏ်မှ သင့်သေတ္တာကို ဝယ်ယူရန် (Risk ပေါ်မူတည်၍) ငွေကြေးကမ်းလှမ်းပါလိမ့်မည်။"
    },
    {
      id: 4,
      num: "၄", 
      title: "ဆုံးဖြတ်ချက်ချခြင်း", 
      desc: "ဘဏ်ပေးသောငွေကို ယူမည် (Deal) သို့မဟုတ် ဆက်လက်ကစားမည် (No Deal) ကို ရဲရဲဝံ့ဝံ့ ဆုံးဖြတ်ရမည်။"
    }
  ];

  return (
    <section className="w-full max-w-5xl mx-auto mt-16 px-6 pb-12 relative z-10">
      
      {/* Decorative "Cut Here" Line */}
      <div className="w-full flex items-center gap-4 mb-8 opacity-50">
        <div className="h-px bg-ink-black flex-1 border-t-2 border-dashed border-ink-black"></div>
        <span className="font-mono text-xs text-ink-black uppercase tracking-widest">System Manual / မန်နူရယ်</span>
        <div className="h-px bg-ink-black flex-1 border-t-2 border-dashed border-ink-black"></div>
      </div>

      <div className="bg-paper-bg border-l-4 border-ink-black pl-6 md:pl-10 py-2 relative">
         {/* Main English Header */}
         <h2 className="font-header text-3xl md:text-4xl text-ink-black mb-2 uppercase tracking-wide">
           Game Rules
         </h2>
         
         {/* Sub Header (Burmese) */}
         <p className="font-header-title text-lg text-grid-line font-bold mb-8">
           ကစားနည်း စည်းမျဉ်းများ
         </p>

         {/* The Grid of Steps */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-12">
            {steps.map((step) => (
              <div key={step.id} className="relative group min-h-[100px] cursor-default">
                
                {/* Watermark Number 
                    - Default: text-ink-black/15
                    - Hover: text-bloomberg-orange/25 (Orange tint)
                */}
                <div className="absolute left-0 -top-2 text-7xl font-myanmar-num text-ink-black/15 select-none z-0 transition-colors duration-300 group-hover:text-bloomberg-orange/25">
                  {step.num}
                </div>

                {/* Content */}
                <div className="relative z-10 pl-20 pt-1">
                  {/* Title 
                      - Default: text-ink-black
                      - Hover: text-bloomberg-orange
                  */}
                  <h3 className="font-header-title text-xl font-bold text-ink-black mb-2 flex items-center gap-2 transition-colors duration-300 group-hover:text-bloomberg-orange">
                    {step.title}
                  </h3>
                  
                  <p className="font-header-title text-ink-black/80 leading-relaxed text-sm md:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
         </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-12 text-center font-mono text-[10px] text-grid-line uppercase tracking-[0.2em]">
        © 2005 ENDEMOL INTERNATIONAL // SYSTEM VER. 2.1 // YANGON SERVER
      </div>

    </section>
  );
};

export default GameRules;