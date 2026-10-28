'use client';

import React from 'react';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';

interface ProcessSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function ProcessSection({ locale, dict }: ProcessSectionProps) {
  const steps = [
    {
      num: '01',
      title: locale === 'hi' ? 'स्रोत चयन' : 'Sourcing',
      desc:
        locale === 'hi'
          ? 'हम मंडी और आसपास के स्वच्छ, उच्च तुंगता वाले हिमालयी क्षेत्रों में स्थापित मधुमक्खी फार्मों के साथ काम करते हैं।'
          : 'We work with trusted beekeepers in pristine, natural mountain environments around Himachal Pradesh.',
    },
    {
      num: '02',
      title: locale === 'hi' ? 'प्राकृतिक निष्कर्षण' : 'Harvesting',
      desc:
        locale === 'hi'
          ? 'शहद को सही पुष्पन काल के दौरान सावधानीपूर्वक निकाला जाता है, जब पराग अपने सबसे शुद्ध रूप में होता है।'
          : "Honey is carefully extracted at the right seasonal bloom, when nectar is at its freshest and purest.",
    },
    {
      num: '03',
      title: locale === 'hi' ? 'बोतलबंदी एवं प्रेषण' : 'Bottling',
      desc:
        locale === 'hi'
          ? 'इसके प्राकृतिक गुणों को सुरक्षित रखने के लिए इसे कांच के जार में पैक करके सीधे मंडी से प्रेषित किया जाता है।'
          : "It's then gravity-strained and packed in durable jars to preserve its natural goodness and aroma.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-cream-100/90 border-b border-cream-300/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Title */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-earth-500">
              {locale === 'hi' ? 'छत्ते से जार तक' : 'FROM HIVE TO JAR'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-earth-900 leading-tight">
              {locale === 'hi' ? 'एक विचारशील एवं संवेदनशील प्रक्रिया।' : 'A thoughtful process.'}
            </h2>
          </div>

          {/* Right Process Steps */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={step.num} className="flex flex-col space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full border border-earth-300 flex items-center justify-center font-mono text-xs text-earth-600 font-semibold">
                    {step.num}
                  </div>
                  {idx < steps.length - 1 && (
                    <span className="hidden md:inline-block text-earth-400 text-sm font-light select-none">
                      →
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-lg text-earth-900 pt-2">
                  {step.title}
                </h3>

                <p className="text-xs text-earth-600 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
