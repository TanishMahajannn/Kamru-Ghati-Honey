'use client';

import React from 'react';
import { Dictionary } from '@/i18n/getDictionary';
import { MessageSquare, CheckCircle, Package, Send, Info } from 'lucide-react';

interface HowToOrderProps {
  dict: Dictionary;
}

export function HowToOrder({ dict }: HowToOrderProps) {
  const steps = [
    {
      num: '01',
      icon: MessageSquare,
      title: dict.howItWorks.step1Title,
      desc: dict.howItWorks.step1Desc,
    },
    {
      num: '02',
      icon: Send,
      title: dict.howItWorks.step2Title,
      desc: dict.howItWorks.step2Desc,
    },
    {
      num: '03',
      icon: CheckCircle,
      title: dict.howItWorks.step3Title,
      desc: dict.howItWorks.step3Desc,
    },
    {
      num: '04',
      icon: Package,
      title: dict.howItWorks.step4Title,
      desc: dict.howItWorks.step4Desc,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-cream-100/60 border-b border-cream-300/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-earth-500">
            WHATSAPP CONVERSATIONAL ORDERING
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-earth-900 leading-tight">
            {dict.howItWorks.title}
          </h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-sans">
            {dict.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-cream-50 rounded-2xl p-6 border border-cream-200/90 shadow-warm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-earth-400 font-semibold tracking-widest">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-cream-200 text-earth-800 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-honey-700" />
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-earth-900 text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-earth-600 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear limitation disclaimer */}
        <div className="mt-10 max-w-2xl mx-auto bg-cream-50 border border-cream-300 rounded-xl p-4 flex items-start gap-3 text-xs text-earth-700 shadow-2xs">
          <Info className="w-4 h-4 text-honey-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {dict.howItWorks.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
