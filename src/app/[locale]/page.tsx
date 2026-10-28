import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { getActiveProducts } from '@/data/products';
import { Hero } from '@/components/home/Hero';
import { CollectionSection } from '@/components/home/CollectionSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { StorySection } from '@/components/home/StorySection';
import { HowToOrder } from '@/components/home/HowToOrder';
import { FaqSection } from '@/components/home/FaqSection';
import { Button } from '@/components/ui/Button';
import { Building2, ArrowRight } from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);
  const products = getActiveProducts();

  return (
    <div className="bg-cream-100 min-h-screen">
      {/* 1. Hero: Pure, from the hive. */}
      <Hero locale={locale} dict={dict} />

      {/* 2. Collection: Nature's finest varieties. */}
      <CollectionSection products={products} locale={locale} dict={dict} />

      {/* 3. Process: A thoughtful process. (01 Sourcing -> 02 Harvesting -> 03 Bottling) */}
      <ProcessSection locale={locale} dict={dict} />

      {/* 4. Story: Better for bees. Brighter for tomorrow. */}
      <StorySection locale={locale} dict={dict} />

      {/* 5. WhatsApp-First Ordering Walkthrough */}
      <HowToOrder dict={dict} />

      {/* 6. Wholesale & Bulk Enquiries Banner */}
      <section className="py-16 md:py-20 bg-cream-100 border-b border-cream-300/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream-50 rounded-2xl p-8 sm:p-12 border border-cream-200/90 shadow-warm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 text-earth-500 text-[10px] sm:text-xs font-semibold uppercase tracking-ultra">
                <Building2 className="w-4 h-4 text-honey-600" />
                <span>{dict.wholesale.badge}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-earth-900">
                {dict.wholesale.title}
              </h2>
              <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-sans">
                {dict.wholesale.subtitle}
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
      </section>

      {/* 7. FAQs */}
      <FaqSection dict={dict} />
    </div>
  );
}
