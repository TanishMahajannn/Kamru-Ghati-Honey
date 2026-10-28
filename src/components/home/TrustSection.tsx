import React from 'react';
import { Dictionary } from '@/i18n/getDictionary';
import { Card } from '@/components/ui/Card';
import { Compass, Flower2, HeartHandshake, ShieldAlert } from 'lucide-react';

interface TrustSectionProps {
  dict: Dictionary;
}

export function TrustSection({ dict }: TrustSectionProps) {
  const trustItems = [
    {
      icon: Compass,
      title: dict.trust.item1Title,
      desc: dict.trust.item1Desc,
    },
    {
      icon: Flower2,
      title: dict.trust.item2Title,
      desc: dict.trust.item2Desc,
    },
    {
      icon: ShieldAlert,
      title: dict.trust.item3Title,
      desc: dict.trust.item3Desc,
    },
    {
      icon: HeartHandshake,
      title: dict.trust.item4Title,
      desc: dict.trust.item4Desc,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-cream-50/60 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-forest-900">
            {dict.trust.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-earth-700/90">
            {dict.trust.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="p-6 flex flex-col items-start bg-white" hoverEffect>
                <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-600 mb-4 flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-forest-800 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-earth-700/80 leading-relaxed">
                  {item.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
