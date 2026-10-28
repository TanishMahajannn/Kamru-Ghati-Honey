'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HoneyProduct } from '@/types/product';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';
import { ArrowRight } from 'lucide-react';
import { formatPaiseToINR } from '@/lib/pricing';

interface CollectionSectionProps {
  products: HoneyProduct[];
  locale: Locale;
  dict: Dictionary;
}

export function CollectionSection({ products, locale, dict }: CollectionSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-cream-100 border-b border-cream-300/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Title Column */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-earth-500">
                {locale === 'hi' ? 'हमारा संग्रह' : 'OUR COLLECTION'}
              </span>
              <div className="w-12 h-px bg-earth-300" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-earth-900 leading-tight">
              {locale === 'hi' ? 'प्रकृति की सर्वश्रेष्ठ किस्में।' : "Nature's finest varieties."}
            </h2>

            <p className="text-xs sm:text-sm text-earth-600 leading-relaxed pt-2">
              {locale === 'hi'
                ? 'प्रत्येक किस्म अपने विशिष्ट पुष्पीय पराग और प्राकृतिक मौसम का अद्वितीय स्वाद दर्शाती है।'
                : 'Each seasonal variety reflects the pure botanical nectar and distinct terroir of its Himalayan harvest.'}
            </p>

            <div className="pt-2">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-earth-900 hover:text-honey-600 transition-colors"
              >
                <span>{locale === 'hi' ? 'सभी किस्में देखें' : 'View all collection'}</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Product Showcase Grid */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {products.slice(0, 3).map((product) => {
              const name = locale === 'hi' ? product.name.hi : product.name.en;
              const desc = locale === 'hi' ? product.shortDescription.hi : product.shortDescription.en;
              const origin = product.characteristics?.origin
                ? (locale === 'hi' ? product.characteristics.origin.hi : product.characteristics.origin.en)
                : 'Mandi, Himachal Pradesh';
              
              // Get 500g price or first confirmed price
              const size500 = product.sizes.find((s) => s.grams === 500) || product.sizes[0];
              const priceDisplay = size500?.pricePaise
                ? formatPaiseToINR(size500.pricePaise, locale)
                : (locale === 'hi' ? 'पूछताछ' : 'On Enquiry');

              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between bg-cream-50/70 rounded-2xl p-6 border border-cream-200/90 hover:border-cream-300 hover:shadow-warm transition-all duration-300"
                >
                  {/* Jar Image */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-6 flex items-center justify-center p-4 bg-cream-100/50">
                    <Link
                      href={`/${locale}/products/${product.slug}`}
                      className="relative w-full h-full block group-hover:scale-104 transition-transform duration-300"
                    >
                      <Image
                        src={`/images/products/${product.slug}.jpg`}
                        alt={name}
                        fill
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== product.image) {
                            target.src = product.image;
                          }
                        }}
                      />
                    </Link>
                  </div>

                  {/* Information */}
                  <div className="space-y-3">
                    <Link href={`/${locale}/products/${product.slug}`}>
                      <h3 className="font-serif font-bold text-lg text-earth-900 group-hover:text-honey-700 transition-colors">
                        {name}
                      </h3>
                    </Link>

                    <p className="text-xs text-earth-600 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>

                    <p className="text-[11px] text-earth-400 font-sans tracking-wide">
                      <span className="font-medium text-earth-500">
                        {locale === 'hi' ? 'स्रोत: ' : 'Origin: '}
                      </span>
                      {origin}
                    </p>

                    {/* Price and Action Button */}
                    <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif font-bold text-base text-earth-900">
                          {priceDisplay}
                        </span>
                        {size500?.pricePaise && (
                          <span className="text-[10px] text-earth-500">/ 500g</span>
                        )}
                      </div>

                      <Link
                        href={`/${locale}/products/${product.slug}`}
                        className="w-7 h-7 rounded-full border border-earth-300 flex items-center justify-center text-earth-800 hover:bg-earth-900 hover:text-white hover:border-earth-900 transition-all focus:outline-none"
                        aria-label={`View details for ${name}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
