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
import { appConfig } from '@/lib/config';

interface ProductCardProps {
  product: HoneyProduct;
  locale: Locale;
  dict: Dictionary;
}

export function ProductCard({ product, locale, dict }: ProductCardProps) {
  // Default to the first available size or the 500g option
  const defaultSize =
    product.sizes.find((s) => s.grams === 500 && s.available) ||
    product.sizes.find((s) => s.available) ||
    product.sizes[0];

  const [selectedSize, setSelectedSize] = useState<ProductSize>(defaultSize);

  const productName = locale === 'hi' ? product.name.hi : product.name.en;
  const productDesc = locale === 'hi' ? product.shortDescription.hi : product.shortDescription.en;
  const imageAlt = locale === 'hi' ? product.imageAlt.hi : product.imageAlt.en;

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
    <div className="group bg-white rounded-2xl border border-cream-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Header */}
      <div className="relative aspect-4/3 w-full bg-cream-50 overflow-hidden p-6 flex items-center justify-center border-b border-cream-100">
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
            <Badge variant="honey" size="sm">
              {locale === 'hi' ? 'विशेष संकलन' : 'Featured Harvest'}
            </Badge>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <Badge variant="forest" size="sm">
            {dict.common.available}
          </Badge>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/${locale}/products/${product.slug}`}
            className="focus:outline-none focus:underline"
          >
            <h3 className="font-serif font-bold text-forest-900 text-lg sm:text-xl group-hover:text-forest-700 transition-colors">
              {productName}
            </h3>
          </Link>
          <p className="mt-2 text-xs sm:text-sm text-earth-700/80 line-clamp-2 leading-relaxed">
            {productDesc}
          </p>

          {/* Size Selector Pills */}
          <div className="mt-4 pt-3 border-t border-cream-100">
            <span className="block text-xs font-semibold text-earth-800 mb-1.5">
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
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                      isSelected
                        ? 'bg-forest-600 text-white font-semibold shadow-xs'
                        : 'bg-cream-100 text-earth-800 hover:bg-cream-200 border border-cream-200'
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
        <div className="mt-5 pt-4 border-t border-cream-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <PriceDisplay pricePaise={selectedSize.pricePaise} locale={locale} size="md" />
              {selectedSize.pricePaise !== null && (
                <span className="text-xs text-earth-700/80">/{dict.common.perJar}</span>
              )}
            </div>
            <span className="text-[11px] text-earth-700/70">{selectedSize.label}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link href={`/${locale}/products/${product.slug}`} className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                <span>{dict.common.viewDetails}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
                <Button variant="whatsapp" size="sm" className="w-full">
                  <MessageCircle className="w-3.5 h-3.5 mr-1" />
                  <span>{dict.common.enquireWhatsApp}</span>
                </Button>
              </a>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled
                className="w-full opacity-60 cursor-not-allowed text-xs"
                title={dict.common.pendingSetup}
              >
                <span>{locale === 'hi' ? 'पूछताछ लंबित' : 'Setup Pending'}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
