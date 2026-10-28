import React from 'react';
import { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { WholesaleForm } from '@/components/wholesale/WholesaleForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
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
    <div className="py-8 md:py-16 bg-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-earth-500">
            {dict.wholesale.badge}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-earth-900 tracking-tight leading-tight">
            {dict.wholesale.title}
          </h1>
          <p className="text-sm sm:text-base text-earth-600 leading-relaxed font-sans">
            {dict.wholesale.subtitle}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Benefits Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-earth-900 text-cream-100 shadow-warm">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-white mb-6">
                {dict.wholesale.benefitsTitle}
              </h2>
              <div className="space-y-4">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-earth-800 text-honey-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-cream-200 leading-relaxed font-sans">
                        {b.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 text-xs text-earth-600 space-y-2 shadow-2xs font-sans">
              <p className="font-semibold text-earth-900">
                {locale === 'hi' ? 'थोक पैकेजिंग विकल्प:' : 'Wholesale Packaging Formats:'}
              </p>
              <p className="leading-relaxed">
                {locale === 'hi'
                  ? 'हम खुदरा बिक्री के लिए कांच और टिकाऊ फूड-ग्रेड जार (250 ग्राम, 500 ग्राम, 1 किग्रा) के साथ-साथ संस्थागत उपयोग हेतु बड़े डिब्बे भी उपलब्ध कराते हैं।'
                  : 'We supply retail-ready glass jars (250g, 500g, 1kg) and bulk food-grade containers for organic grocers, wellness practitioners, and commercial kitchens.'}
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
