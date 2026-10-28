import React from 'react';
import { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { getActiveProducts } from '@/data/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Sparkles, Building2, ArrowRight } from 'lucide-react';
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
    <div className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-honey-600">
            <Sparkles className="w-4 h-4" />
            <span>{locale === 'hi' ? 'प्राकृतिक पुष्पीय संकलन' : 'Himalayan Floral Harvests'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-forest-900 tracking-tight">
            {dict.catalogue.title}
          </h1>
          <p className="text-base sm:text-lg text-earth-700/90 leading-relaxed">
            {dict.catalogue.subtitle}
          </p>
        </div>

        {/* Filterable Product Grid */}
        <ProductGrid products={products} locale={locale} dict={dict} />

        {/* Wholesale Callout */}
        <div className="mt-16 bg-cream-50 rounded-3xl p-8 sm:p-10 border border-cream-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-forest-700 text-xs font-bold uppercase">
              <Building2 className="w-4 h-4 text-honey-600" />
              <span>{dict.wholesale.badge}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest-900">
              {locale === 'hi'
                ? 'क्या आप थोक या व्यावसायिक मात्रा में ऑर्डर करना चाहते हैं?'
                : 'Looking to purchase in bulk or retail cases?'}
            </h2>
            <p className="text-xs sm:text-sm text-earth-700/80 max-w-xl">
              {locale === 'hi'
                ? 'दुकानों, वितरकों और व्यावसायिक ग्राहकों के लिए विशेष थोक दरें एवं कस्टम पैकेजिंग उपलब्ध हैं।'
                : 'Special bulk rates, direct dispatch from Mandi, and flexible packaging sizes available for business clients.'}
            </p>
          </div>

          <Link href={`/${locale}/wholesale`} className="flex-shrink-0">
            <Button variant="secondary" size="md">
              <span>{dict.common.enquireWholesale}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
