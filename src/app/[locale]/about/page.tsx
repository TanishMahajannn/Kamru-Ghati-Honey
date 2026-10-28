import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { MapPin, Calendar, FileText, CheckCircle2 } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  return {
    title: dict.about.title,
    description: dict.about.subtitle,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  const breadcrumbs = [
    {
      label: dict.common.about,
    },
  ];

  return (
    <div className="py-8 md:py-16 bg-cream-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-earth-500">
            {dict.about.badge}
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-earth-900 tracking-tight leading-tight">
            {dict.about.title}
          </h1>

          <p className="text-base sm:text-lg text-earth-600 leading-relaxed font-sans">
            {dict.about.subtitle}
          </p>
        </div>

        {/* Beekeeper Hero Photography */}
        <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden shadow-warm border border-cream-300/80 bg-cream-200">
          <Image
            src="/images/story-beekeeper.jpg"
            alt="Beekeeper in Himachal Pradesh inspecting hive frames"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute bottom-4 left-4 bg-cream-100/90 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-cream-300 text-[11px] text-earth-700 font-sans">
            Mandi & High-Altitude Valleys, Himachal Pradesh
          </div>
        </div>

        {/* Narrative Sections */}
        <div className="space-y-10 text-earth-800">
          {/* Section 1: Rooted in Mandi */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-earth-900">
              {dict.about.section1Title}
            </h2>
            <p className="text-sm sm:text-base text-earth-600 leading-relaxed font-sans">
              {dict.about.section1Text}
            </p>
          </section>

          {/* Section 2: Seasonality */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-earth-900">
              {dict.about.section2Title}
            </h2>
            <p className="text-sm sm:text-base text-earth-600 leading-relaxed font-sans">
              {dict.about.section2Text}
            </p>
          </section>

          {/* Section 3: Honest Commitment */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-earth-900">
              {dict.about.section3Title}
            </h2>
            <p className="text-sm sm:text-base text-earth-600 leading-relaxed font-sans">
              {dict.about.section3Text}
            </p>
          </section>
        </div>

        {/* Factual Transparency & Compliance Notice */}
        <div className="p-6 sm:p-8 bg-cream-50 rounded-2xl border border-cream-300 shadow-warm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cream-100 rounded-xl border border-cream-300 text-honey-700 flex-shrink-0">
              <FileText className="w-5 h-5 text-honey-600" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-earth-900 text-base sm:text-lg">
                {dict.about.transparencyBoxTitle}
              </h3>
              <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-sans">
                {dict.about.transparencyBoxText}
              </p>
              <div className="pt-2 flex flex-wrap gap-3 text-xs text-earth-700 font-medium font-sans">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
                  {locale === 'hi' ? 'स्थापना वर्ष: 2020' : 'Establishment: 2020'}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
                  {locale === 'hi' ? 'स्थान: मंडी (हि.प्र.)' : 'Base: Mandi (HP)'}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
                  {locale === 'hi' ? 'प्रत्यक्ष उत्पादक संपर्क' : 'Direct Producer Contact'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
