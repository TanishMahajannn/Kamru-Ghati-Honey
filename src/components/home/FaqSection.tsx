import React from 'react';
import { Dictionary } from '@/i18n/getDictionary';
import { HelpCircle } from 'lucide-react';

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
    <section className="py-16 md:py-20 bg-cream-50/50 border-b border-cream-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-forest-50 text-forest-700 mb-3">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-forest-900">
            {dict.faq.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-earth-700/80">
            {dict.faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-xl border border-cream-200 p-5 shadow-2xs open:shadow-card transition-all"
            >
              <summary className="flex items-center justify-between font-serif font-bold text-forest-900 text-base cursor-pointer list-none select-none focus:outline-none focus:text-forest-600">
                <span>{faq.q}</span>
                <span className="ml-4 flex-shrink-0 text-honey-600 font-normal text-xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-3 text-sm text-earth-700/90 leading-relaxed pt-2 border-t border-cream-100">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
