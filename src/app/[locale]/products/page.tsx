import React from 'react';
import { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { getActiveProducts } from '@/data/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Building2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  return {
    title: dict.catalogue.title,
    description: dict.catalogue.subtitle,
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);
  const products = getActiveProducts();

  const breadcrumbs = [
    {
      label: dict.common.catalogue,
    },
  ];

  return (
    <div className="py-8 md:py-16 bg-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-earth-500">
            {locale === 'hi' ? 'प्राकृतिक पुष्पीय संकलन' : 'HIMALAYAN BOTANICAL HARVESTS'}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-earth-900 tracking-tight leading-tight">
            {dict.catalogue.title}
          </h1>
          <p className="text-sm sm:text-base text-earth-600 leading-relaxed font-sans max-w-2xl">
            {dict.catalogue.subtitle}
          </p>
        </div>

        {/* Filterable Grid */}
        <ProductGrid products={products} locale={locale} dict={dict} />

        {/* Wholesale Callout */}
        <div className="mt-16 bg-cream-50 rounded-2xl p-8 sm:p-10 border border-cream-200/90 shadow-warm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-earth-500 text-[10px] sm:text-xs font-semibold uppercase tracking-ultra">
              <Building2 className="w-4 h-4 text-honey-600" />
              <span>{dict.wholesale.badge}</span>
            </div>
            <h2 className="font-serif text-2xl font-normal text-earth-900">
              {locale === 'hi'
                ? 'क्या आप थोक या व्यावसायिक मात्रा में ऑर्डर करना चाहते हैं?'
                : 'Looking to purchase in bulk or wholesale cases?'}
            </h2>
            <p className="text-xs sm:text-sm text-earth-600 max-w-xl font-sans">
              {locale === 'hi'
                ? 'दुकानों, वितरकों और व्यावसायिक ग्राहकों के लिए विशेष थोक दरें एवं कस्टम पैकेजिंग उपलब्ध हैं।'
                : 'Special bulk trade rates, direct dispatch from Mandi, and multi-size packaging available for retailers and practitioners.'}
            </p>
          </div>

          <Link href={`/${locale}/wholesale`} className="flex-shrink-0">
            <Button variant="pill" size="md">
              <span>{dict.common.enquireWholesale}</span>
              <span className="ml-1">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
