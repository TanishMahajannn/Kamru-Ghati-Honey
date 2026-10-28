'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HoneyProduct, ProductSize } from '@/types/product';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';
import { PriceDisplay } from './PriceDisplay';
import { Button } from '@/components/ui/Button';
import {
  MessageCircle,
  Plus,
  Minus,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Package,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { buildRetailEnquiryText, createWhatsAppUrl } from '@/lib/whatsapp';
import { appConfig } from '@/lib/config';

interface ProductDetailViewProps {
  product: HoneyProduct;
  relatedProducts: HoneyProduct[];
  locale: Locale;
  dict: Dictionary;
}

export function ProductDetailView({
  product,
  relatedProducts,
  locale,
  dict,
}: ProductDetailViewProps) {
  const defaultSize =
    product.sizes.find((s) => s.grams === 500 && s.available) ||
    product.sizes.find((s) => s.available) ||
    product.sizes[0];

  const [selectedSize, setSelectedSize] = useState<ProductSize>(defaultSize);
  const [quantity, setQuantity] = useState<number>(1);
  const [customerNote, setCustomerNote] = useState<string>('');

  const productName = locale === 'hi' ? product.name.hi : product.name.en;
  const productDesc = locale === 'hi' ? product.description.hi : product.description.en;
  const imageAlt = locale === 'hi' ? product.imageAlt.hi : product.imageAlt.en;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const updated = prev + delta;
      if (updated < 1) return 1;
      if (updated > 50) return 50;
      return updated;
    });
  };

  const enquiryText = buildRetailEnquiryText(
    {
      product,
      selectedSize,
      quantity,
      customerNote: customerNote.trim() || undefined,
    },
    locale
  );

  const whatsAppUrl = createWhatsAppUrl(enquiryText);

  return (
    <div className="space-y-16">
      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Product Image on Warm Stone Tile */}
        <div className="lg:col-span-6 sticky top-28">
          <div className="relative aspect-square w-full bg-cream-50 rounded-2xl border border-cream-200 p-8 shadow-warm flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>

            {product.featured && (
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-cream-100 text-earth-800 px-3 py-1 rounded-full border border-cream-300">
                  {locale === 'hi' ? 'विशेष संकलन' : 'Featured Harvest'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Details & Ordering */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-earth-500">
              KAMRU GHATI HONEY • MANDI, HP
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-earth-900 mt-1 leading-tight">
              {productName}
            </h1>
          </div>

          {/* Pricing Box */}
          <div className="bg-cream-50 rounded-2xl p-5 border border-cream-200/90 flex items-baseline justify-between shadow-2xs">
            <div>
              <span className="text-[11px] text-earth-500 block mb-1">
                {locale === 'hi' ? 'चयनित आकार का मूल्य:' : 'Price for selected jar size:'}
              </span>
              <div className="flex items-baseline gap-2">
                <PriceDisplay pricePaise={selectedSize.pricePaise} locale={locale} size="lg" />
                {selectedSize.pricePaise !== null && (
                  <span className="text-xs text-earth-500">/{dict.common.perJar}</span>
                )}
              </div>
            </div>
            <span className="text-xs font-medium text-earth-700 bg-cream-100 px-3 py-1 rounded-full border border-cream-300">
              {selectedSize.label}
            </span>
          </div>

          {/* Description */}
          <div className="text-sm sm:text-base text-earth-600 leading-relaxed font-sans">
            <p>{productDesc}</p>
          </div>

          {/* Size Selector */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-earth-700">
              {dict.productDetail.selectSizePrompt}
            </label>
            <div className="grid grid-cols-3 gap-3" role="radiogroup">
              {product.sizes.map((size) => {
                const isSelected = selectedSize.grams === size.grams;
                return (
                  <button
                    key={size.grams}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-3 rounded-xl border text-center transition-all focus:outline-none focus:ring-1 focus:ring-honey-500 ${
                      isSelected
                        ? 'border-earth-900 bg-cream-100 text-earth-900 font-bold shadow-2xs'
                        : 'border-cream-300 bg-cream-50/70 hover:bg-cream-100 text-earth-700'
                    }`}
                    aria-checked={isSelected}
                    role="radio"
                  >
                    <span className="block text-sm font-semibold">{size.label}</span>
                    <span className="block text-[11px] text-earth-500 mt-0.5">
                      {size.pricePaise !== null
                        ? `₹${size.pricePaise / 100}`
                        : (locale === 'hi' ? 'पूछताछ' : 'Enquire')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-earth-700">
              {dict.productDetail.quantityPrompt}
            </label>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center border border-cream-300 rounded-full bg-cream-50 p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-1.5 rounded-full text-earth-700 hover:bg-cream-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-earth-900 text-sm" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 50}
                  className="p-1.5 rounded-full text-earth-700 hover:bg-cream-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] text-earth-500">
                {locale === 'hi'
                  ? '(अधिकतम खुदरा मात्रा: 50 जार)'
                  : '(Retail limit: 50 jars)'}
              </span>
            </div>
          </div>

          {/* Optional Note */}
          <div className="space-y-1.5">
            <label htmlFor="customerNote" className="block text-[11px] font-semibold text-earth-600 uppercase tracking-wider">
              {locale === 'hi' ? 'विशेष अनुरोध या पता टिप्पणी (वैकल्पिक):' : 'Special Note / Question (Optional):'}
            </label>
            <input
              id="customerNote"
              type="text"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              placeholder={locale === 'hi' ? 'उदा. डिलीवरी समय या पिन कोड...' : 'e.g., Delivery PIN code or queries...'}
              maxLength={120}
              className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-earth-900 placeholder:text-earth-400 focus:outline-none focus:ring-1 focus:ring-honey-500"
            />
          </div>

          {/* WhatsApp Primary Order CTA */}
          <div className="pt-2 space-y-3">
            {whatsAppUrl ? (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full focus:outline-none"
              >
                <Button variant="pill" size="lg" className="w-full text-sm sm:text-base py-3.5 shadow-2xs">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>{dict.productDetail.orderViaWhatsApp}</span>
                </Button>
              </a>
            ) : (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{dict.common.pendingSetup}</p>
                </div>
              </div>
            )}

            <p className="text-xs text-earth-500 leading-relaxed">
              {dict.productDetail.orderNotice}
            </p>
          </div>

          {/* Packaging & Origin Badges */}
          <div className="pt-4 border-t border-cream-200 grid grid-cols-2 gap-3 text-xs text-earth-700">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-cream-50 border border-cream-200">
              <Package className="w-4 h-4 text-honey-600 flex-shrink-0" />
              <span>{dict.productDetail.glassJarNotice}</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-cream-50 border border-cream-200">
              <ShieldCheck className="w-4 h-4 text-honey-600 flex-shrink-0" />
              <span>{locale === 'hi' ? 'प्रामाणिक स्रोत गारंटी' : 'Verified Provenance'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Harvest Characteristics */}
      {product.characteristics && (
        <div className="bg-cream-50 rounded-2xl p-6 sm:p-8 border border-cream-200">
          <h2 className="font-serif text-2xl font-normal text-earth-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-honey-600" />
            <span>{dict.productDetail.characteristics}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.characteristics.tasteNotes && (
              <div className="p-4 bg-cream-100/60 rounded-xl border border-cream-200/80">
                <div className="text-[10px] font-bold uppercase tracking-wider text-earth-500 mb-1">
                  {dict.productDetail.tasteProfile}
                </div>
                <p className="text-xs sm:text-sm text-earth-800 font-medium">
                  {locale === 'hi'
                    ? product.characteristics.tasteNotes.hi
                    : product.characteristics.tasteNotes.en}
                </p>
              </div>
            )}

            {product.characteristics.color && (
              <div className="p-4 bg-cream-100/60 rounded-xl border border-cream-200/80">
                <div className="text-[10px] font-bold uppercase tracking-wider text-earth-500 mb-1">
                  {dict.productDetail.color}
                </div>
                <p className="text-xs sm:text-sm text-earth-800 font-medium">
                  {locale === 'hi'
                    ? product.characteristics.color.hi
                    : product.characteristics.color.en}
                </p>
              </div>
            )}

            {product.characteristics.origin && (
              <div className="p-4 bg-cream-100/60 rounded-xl border border-cream-200/80">
                <div className="text-[10px] font-bold uppercase tracking-wider text-earth-500 mb-1">
                  {dict.productDetail.origin}
                </div>
                <p className="text-xs sm:text-sm text-earth-800 font-medium">
                  {locale === 'hi'
                    ? product.characteristics.origin.hi
                    : product.characteristics.origin.en}
                </p>
              </div>
            )}

            {product.characteristics.season && (
              <div className="p-4 bg-cream-100/60 rounded-xl border border-cream-200/80">
                <div className="text-[10px] font-bold uppercase tracking-wider text-earth-500 mb-1">
                  {dict.productDetail.harvestSeason}
                </div>
                <p className="text-xs sm:text-sm text-earth-800 font-medium">
                  {locale === 'hi'
                    ? product.characteristics.season.hi
                    : product.characteristics.season.en}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-cream-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-earth-900">
              {dict.productDetail.relatedTitle}
            </h2>
            <Link
              href={`/${locale}/products`}
              className="text-xs uppercase tracking-wider font-semibold text-earth-800 hover:text-honey-600 transition-colors"
            >
              {dict.common.viewDetails} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => {
              const relName = locale === 'hi' ? rel.name.hi : rel.name.en;
              return (
                <Link
                  key={rel.id}
                  href={`/${locale}/products/${rel.slug}`}
                  className="group bg-cream-50 rounded-2xl p-4 border border-cream-200 shadow-warm hover:shadow-warm-hover hover:border-cream-300 transition-all flex items-center gap-4"
                >
                  <div className="relative w-16 h-16 bg-cream-100 rounded-xl overflow-hidden flex-shrink-0 p-1">
                    <Image
                      src={rel.image}
                      alt={relName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-earth-900 group-hover:text-honey-700 text-sm sm:text-base">
                      {relName}
                    </h3>
                    <span className="text-xs text-honey-600 font-semibold block mt-0.5">
                      {locale === 'hi' ? 'विवरण देखें →' : 'View Details →'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
