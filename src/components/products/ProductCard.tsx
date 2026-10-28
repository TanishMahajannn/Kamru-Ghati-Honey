'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HoneyProduct, ProductSize } from '@/types/product';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';
import { PriceDisplay } from './PriceDisplay';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { buildRetailEnquiryText, createWhatsAppUrl } from '@/lib/whatsapp';

interface ProductCardProps {
  product: HoneyProduct;
  locale: Locale;
  dict: Dictionary;
}

export function ProductCard({ product, locale, dict }: ProductCardProps) {
  const defaultSize =
    product.sizes.find((s) => s.grams === 500 && s.available) ||
    product.sizes.find((s) => s.available) ||
    product.sizes[0];

  const [selectedSize, setSelectedSize] = useState<ProductSize>(defaultSize);

  const productName = locale === 'hi' ? product.name.hi : product.name.en;
  const productDesc = locale === 'hi' ? product.shortDescription.hi : product.shortDescription.en;
  const imageAlt = locale === 'hi' ? product.imageAlt.hi : product.imageAlt.en;
  const origin = product.characteristics?.origin
    ? (locale === 'hi' ? product.characteristics.origin.hi : product.characteristics.origin.en)
    : 'Mandi, Himachal Pradesh';

  const enquiryText = buildRetailEnquiryText(
    {
      product,
      selectedSize,
      quantity: 1,
    },
    locale
  );

  const whatsAppUrl = createWhatsAppUrl(enquiryText);

  return (
    <div className="group bg-cream-50/80 rounded-2xl border border-cream-200/90 shadow-warm hover:shadow-warm-hover hover:border-cream-300 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-cream-100/60 overflow-hidden p-6 flex items-center justify-center border-b border-cream-200/80">
        <Link
          href={`/${locale}/products/${product.slug}`}
          className="relative w-full h-full block group-hover:scale-103 transition-transform duration-300"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={product.image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </Link>

        {product.featured && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-cream-100 text-earth-800 px-2.5 py-1 rounded-full border border-cream-300 shadow-2xs">
              {locale === 'hi' ? 'विशेष संकलन' : 'Featured'}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <Link
            href={`/${locale}/products/${product.slug}`}
            className="focus:outline-none focus:underline block"
          >
            <h3 className="font-serif font-bold text-earth-900 text-lg group-hover:text-honey-700 transition-colors">
              {productName}
            </h3>
          </Link>
          <p className="text-xs text-earth-600 line-clamp-2 leading-relaxed">
            {productDesc}
          </p>
          <p className="text-[11px] text-earth-400 font-sans tracking-wide">
            <span className="font-medium text-earth-500">{locale === 'hi' ? 'स्रोत: ' : 'Origin: '}</span>
            {origin}
          </p>

          {/* Size Pills */}
          <div className="pt-3 border-t border-cream-200/80">
            <span className="block text-[11px] font-semibold text-earth-700 mb-1.5 uppercase tracking-wider">
              {dict.catalogue.sizesAvailable}
            </span>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Available jar sizes">
              {product.sizes.map((size) => {
                const isSelected = selectedSize.grams === size.grams;
                return (
                  <button
                    key={size.grams}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                      isSelected
                        ? 'bg-earth-900 text-cream-100 font-semibold'
                        : 'bg-cream-100 text-earth-700 hover:bg-cream-200 border border-cream-200'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {size.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-5 pt-4 border-t border-cream-200/80 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <PriceDisplay pricePaise={selectedSize.pricePaise} locale={locale} size="md" />
              {selectedSize.pricePaise !== null && (
                <span className="text-[11px] text-earth-500">/{dict.common.perJar}</span>
              )}
            </div>
            <span className="text-[11px] text-earth-500">{selectedSize.label}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link href={`/${locale}/products/${product.slug}`} className="w-full">
              <Button variant="outline" size="sm" className="w-full rounded-full text-xs">
                <span>{dict.common.viewDetails}</span>
                <span className="ml-1">→</span>
              </Button>
            </Link>

            {whatsAppUrl ? (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
                aria-label={`${dict.common.enquireWhatsApp} for ${productName}`}
              >
                <Button variant="pill" size="sm" className="w-full rounded-full text-xs px-2">
                  <MessageCircle className="w-3.5 h-3.5 mr-1" />
                  <span>{locale === 'hi' ? 'व्हाट्सएप' : 'Enquire'}</span>
                </Button>
              </a>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled
                className="w-full opacity-60 cursor-not-allowed text-xs rounded-full"
                title={dict.common.pendingSetup}
              >
                <span>{locale === 'hi' ? 'लंबित' : 'Pending'}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
