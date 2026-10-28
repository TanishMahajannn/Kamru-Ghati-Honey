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
    <section className="py-16 md:py-20 bg-white border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-forest-900">
            {dict.howItWorks.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-earth-700/90">
            {dict.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-cream-50/80 rounded-2xl p-6 border border-cream-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif font-black text-2xl text-honey-500/80">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-forest-600 text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-forest-800 text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-earth-700/80 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear limitation disclaimer */}
        <div className="mt-10 max-w-3xl mx-auto bg-honey-50 border border-honey-200 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-earth-800">
          <Info className="w-5 h-5 text-honey-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            {dict.howItWorks.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
