'use client';

import React from 'react';
import { Dictionary } from '@/i18n/getDictionary';

interface FaqSectionProps {
  dict: Dictionary;
}

export function FaqSection({ dict }: FaqSectionProps) {
  const faqs = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
  ];

  return (
    <section className="py-16 md:py-24 bg-cream-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-earth-500">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-earth-900">
            {dict.faq.title}
          </h2>
          <p className="text-xs sm:text-sm text-earth-600 font-sans">
            {dict.faq.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-cream-50/80 rounded-xl border border-cream-200/90 p-5 shadow-2xs open:shadow-warm transition-all"
            >
              <summary className="flex items-center justify-between font-serif font-bold text-earth-900 text-sm sm:text-base cursor-pointer list-none select-none focus:outline-none">
                <span>{faq.q}</span>
                <span className="ml-4 flex-shrink-0 text-earth-400 font-light text-lg transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-earth-600 leading-relaxed pt-2 border-t border-cream-200 font-sans">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
