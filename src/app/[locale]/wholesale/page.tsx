import React from 'react';
import { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { WholesaleForm } from '@/components/wholesale/WholesaleForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Building2, CheckCircle2, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  return {
    title: dict.wholesale.title,
    description: dict.wholesale.subtitle,
  };
}

export default async function WholesalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  const breadcrumbs = [
    {
      label: dict.common.wholesale,
    },
  ];

  const benefits = [
    {
      icon: Truck,
      text: dict.wholesale.benefit1,
    },
    {
      icon: ShieldCheck,
      text: dict.wholesale.benefit2,
    },
    {
      icon: Sparkles,
      text: dict.wholesale.benefit3,
    },
    {
      icon: CheckCircle2,
      text: dict.wholesale.benefit4,
    },
  ];

  return (
    <div className="py-8 md:py-16 bg-cream-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <Badge variant="forest" size="md">
            <Building2 className="w-3.5 h-3.5 mr-1" />
            <span>{dict.wholesale.badge}</span>
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-forest-900 tracking-tight">
            {dict.wholesale.title}
          </h1>
          <p className="text-base sm:text-lg text-earth-700/90 leading-relaxed">
            {dict.wholesale.subtitle}
          </p>
        </div>

        {/* 2-Column Layout: Benefits on left/top, Form on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Benefits Column */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 sm:p-8 bg-forest-900 text-cream-100 border-none shadow-md">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mb-6">
                {dict.wholesale.benefitsTitle}
              </h2>
              <div className="space-y-4">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-forest-800 text-honey-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="text-xs sm:text-sm text-cream-100/90 leading-relaxed">
                        {b.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Packaging disclaimer */}
            <div className="p-5 rounded-2xl bg-white border border-cream-200 text-xs text-earth-700 space-y-2">
              <p className="font-semibold text-forest-800">
                {locale === 'hi' ? 'थोक पैकेजिंग विकल्प:' : 'Wholesale Packaging Note:'}
              </p>
              <p className="leading-relaxed">
                {locale === 'hi'
                  ? 'हम खुदरा बिक्री के लिए कांच और टिकाऊ फूड-ग्रेड जार (250 ग्राम, 500 ग्राम, 1 किग्रा) के साथ-साथ संस्थागत उपयोग हेतु बड़े डिब्बे भी उपलब्ध कराते हैं।'
                  : 'We supply both consumer-ready shelf jars (250g, 500g, 1kg) and bulk food-grade buckets for institutional kitchens and repacking.'}
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <WholesaleForm locale={locale} dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
