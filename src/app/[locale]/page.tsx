import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { getFeaturedProducts } from '@/data/products';
import { Hero } from '@/components/home/Hero';
import { TrustSection } from '@/components/home/TrustSection';
import { HowToOrder } from '@/components/home/HowToOrder';
import { FaqSection } from '@/components/home/FaqSection';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Building2 } from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* 1. Hero */}
      <Hero locale={locale} dict={dict} />

      {/* 2. Featured Varieties Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-honey-600 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>{locale === 'hi' ? 'प्रामाणिक संकलन' : 'Featured Varieties'}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900">
                {locale === 'hi' ? 'हमारे चुनिंदा हिमालयी शहद' : 'Our Seasonal Harvests'}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-earth-700/80 max-w-2xl">
                {locale === 'hi'
                  ? 'हिमाचल प्रदेश की घाटियों से सीधे संकलित ताज़ा शहद। बिना किसी मिलावट अथवा कृत्रिम सिरप के।'
                  : 'Pure honeys harvested across diverse floral seasons in Himachal Pradesh. No artificial blending or industrial syrup.'}
              </p>
            </div>

            <Link href={`/${locale}/products`}>
              <Button variant="outline" size="md" className="hidden sm:inline-flex">
                <span>{dict.common.exploreCatalogue}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
                dict={dict}
              />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link href={`/${locale}/products`} className="w-full block">
              <Button variant="outline" size="lg" className="w-full">
                <span>{dict.common.exploreCatalogue}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Brand Story Preview Banner */}
      <section className="py-16 bg-forest-900 text-cream-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-honey-400 font-serif tracking-widest text-xs uppercase font-bold">
                ESTABLISHED 2020 • MANDI, HIMACHAL PRADESH
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                {locale === 'hi'
                  ? 'सच्चा स्वाद, हिमाचल की पहाड़ियों की प्रामाणिकता'
                  : 'Real Himalayan Honey, Transparently Sourced from Mandi'}
              </h2>
              <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed max-w-2xl">
                {locale === 'hi'
                  ? 'कामरू घाटी हनी की नींव 2020 में रखी गई। हमारा उद्देश्य अतिशयोक्तिपूर्ण विपणन के बिना शुद्ध और विश्वसनीय शहद उपलब्ध कराना है।'
                  : 'Founded in 2020 in Mandi, Kamru Ghati Honey is built on genuine apiculture without misleading marketing claims or inflated laboratory promises.'}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link href={`/${locale}/about`}>
                <Button variant="secondary" size="lg" className="text-base">
                  <span>{dict.common.readMore}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Section */}
      <TrustSection dict={dict} />

      {/* 5. How To Order (WhatsApp explanation) */}
      <HowToOrder dict={dict} />

      {/* 6. Wholesale Callout Banner */}
      <section className="py-16 bg-cream-100/70 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-cream-300 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 text-forest-700 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-honey-600" />
                <span>{dict.wholesale.badge}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
                {dict.wholesale.title}
              </h2>
              <p className="text-sm sm:text-base text-earth-700/80 leading-relaxed">
                {dict.wholesale.subtitle}
              </p>
            </div>

            <Link href={`/${locale}/wholesale`} className="flex-shrink-0">
              <Button variant="primary" size="lg" className="text-base">
                <span>{dict.common.enquireWholesale}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
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
