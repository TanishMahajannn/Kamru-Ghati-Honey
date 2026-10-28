import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Calendar, HeartHandshake, FileText, CheckCircle2 } from 'lucide-react';

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
    <div className="py-8 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        {/* Header */}
        <div className="space-y-4 text-center sm:text-left">
          <Badge variant="honey" size="md">
            <Calendar className="w-3.5 h-3.5 text-honey-600 mr-1" />
            <span>{dict.about.badge}</span>
          </Badge>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-forest-900 tracking-tight leading-tight">
            {dict.about.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-earth-700/90 leading-relaxed">
            {dict.about.subtitle}
          </p>
        </div>

        {/* Milestone Visual / Map Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-cream-100 to-cream-50 border border-cream-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-forest-700 font-bold text-sm">
              <MapPin className="w-4 h-4 text-honey-600" />
              <span>Mandi, Himachal Pradesh, India</span>
            </div>
            <p className="text-xs sm:text-sm text-earth-700/80 max-w-md">
              {locale === 'hi'
                ? 'व्यास नदी के तट पर स्थित मंडी के प्राकृतिक परिवेश में 2020 से संचालित।'
                : 'Operating since 2020 amidst the pristine valleys and seasonal floral belts of Himachal Pradesh.'}
            </p>
          </div>

          <div className="flex-shrink-0">
            <div className="w-24 h-24 relative bg-white rounded-2xl border border-cream-300 p-2 shadow-xs flex items-center justify-center">
              <Image
                src="/images/brand/logo.svg"
                alt="Kamru Ghati Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Narrative Sections */}
        <div className="space-y-10 text-earth-900">
          {/* Section 1: Rooted in Mandi */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest-900">
              {dict.about.section1Title}
            </h2>
            <p className="text-sm sm:text-base text-earth-700/90 leading-relaxed">
              {dict.about.section1Text}
            </p>
          </section>

          {/* Section 2: Seasonality */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest-900">
              {dict.about.section2Title}
            </h2>
            <p className="text-sm sm:text-base text-earth-700/90 leading-relaxed">
              {dict.about.section2Text}
            </p>
          </section>

          {/* Section 3: Honest Commitment */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest-900">
              {dict.about.section3Title}
            </h2>
            <p className="text-sm sm:text-base text-earth-700/90 leading-relaxed">
              {dict.about.section3Text}
            </p>
          </section>
        </div>

        {/* Factual Transparency & Compliance Notice */}
        <Card className="p-6 sm:p-8 bg-cream-50/70 border-cream-300">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl border border-cream-200 text-forest-700 flex-shrink-0 shadow-2xs">
              <FileText className="w-6 h-6 text-honey-600" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-forest-900 text-base sm:text-lg">
                {dict.about.transparencyBoxTitle}
              </h3>
              <p className="text-xs sm:text-sm text-earth-700/90 leading-relaxed">
                {dict.about.transparencyBoxText}
              </p>
              <div className="pt-2 flex flex-wrap gap-3 text-xs text-forest-800 font-medium">
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
        </Card>
      </div>
    </div>
  );
}
