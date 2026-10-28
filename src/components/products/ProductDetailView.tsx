'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HoneyProduct, ProductSize } from '@/types/product';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';
import { PriceDisplay } from './PriceDisplay';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  MessageCircle,
  Plus,
  Minus,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  Package,
  AlertCircle,
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
  // Initial size: 500g if available, or first size
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
      if (updated > 50) return 50; // Max retail enquiry limit
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
        {/* Left Column: Product Image */}
        <div className="lg:col-span-6 sticky top-28">
          <div className="relative aspect-square w-full bg-cream-50 rounded-3xl border border-cream-200 p-8 shadow-card flex items-center justify-center overflow-hidden">
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
                <Badge variant="honey" size="md">
                  {locale === 'hi' ? 'विशेष मौसमी संकलन' : 'Featured Harvest'}
                </Badge>
              </div>
            )}

            <div className="absolute top-4 right-4">
              <Badge variant="forest" size="md">
                {dict.common.available}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Ordering Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-semibold text-honey-600 tracking-wider uppercase">
              Kamru Ghati Honey • Est. 2020
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest-900 mt-1 leading-tight">
              {productName}
            </h1>
          </div>

          {/* Pricing Box */}
          <div className="bg-cream-50/80 rounded-2xl p-5 border border-cream-200 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-earth-700/80 block mb-1">
                {locale === 'hi' ? 'चयनित आकार का मूल्य:' : 'Price for selected size:'}
              </span>
              <div className="flex items-baseline gap-2">
                <PriceDisplay pricePaise={selectedSize.pricePaise} locale={locale} size="lg" />
                {selectedSize.pricePaise !== null && (
                  <span className="text-xs text-earth-700/80">/{dict.common.perJar}</span>
                )}
              </div>
            </div>
            <Badge variant="earth" size="sm">
              {selectedSize.label}
            </Badge>
          </div>

          {/* Description */}
          <div className="prose prose-stone text-sm sm:text-base text-earth-800 leading-relaxed">
            <p>{productDesc}</p>
          </div>

          {/* Size Selector */}
          <div className="space-y-2 pt-2">
            <label className="block text-sm font-bold text-forest-900">
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
                    className={`py-3 px-3 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-forest-500 ${
                      isSelected
                        ? 'border-forest-600 bg-forest-50/80 text-forest-900 font-bold ring-1 ring-forest-600 shadow-xs'
                        : 'border-cream-300 bg-white hover:bg-cream-50 text-earth-800'
                    }`}
                    aria-checked={isSelected}
                    role="radio"
                  >
                    <span className="block text-sm sm:text-base font-semibold">{size.label}</span>
                    <span className="block text-xs text-earth-700/80 mt-0.5">
                      {size.pricePaise !== null
                        ? `₹${size.pricePaise / 100}`
                        : (locale === 'hi' ? 'मूल्य पुष्टि' : 'Enquire')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-forest-900">
              {dict.productDetail.quantityPrompt}
            </label>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center border border-cream-300 rounded-xl bg-white p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 rounded-lg text-earth-700 hover:bg-cream-100 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-forest-500"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-earth-900 text-base" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 50}
                  className="p-2 rounded-lg text-earth-700 hover:bg-cream-100 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-forest-500"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-earth-700/80">
                {locale === 'hi'
                  ? '(अधिकतम खुदरा पूछताछ: 50 जार; बड़ी मात्रा हेतु थोक संपर्क करें)'
                  : '(Retail limit: 50 jars; For bulk volumes use Wholesale)'}
              </span>
            </div>
          </div>

          {/* Optional Note to Seller */}
          <div className="space-y-1.5">
            <label htmlFor="customerNote" className="block text-xs font-semibold text-earth-700">
              {locale === 'hi' ? 'विशेष अनुरोध या पता टिप्पणी (वैकल्पिक):' : 'Special Note / Question (Optional):'}
            </label>
            <input
              id="customerNote"
              type="text"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              placeholder={locale === 'hi' ? 'उदा. डिलीवरी समय या पिन कोड...' : 'e.g., Delivery PIN code or queries...'}
              maxLength={120}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-earth-900 placeholder:text-earth-700/60 focus:outline-none focus:ring-2 focus:ring-forest-500"
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
                <Button variant="whatsapp" size="lg" className="w-full text-base sm:text-lg py-4 shadow-md">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>{dict.productDetail.orderViaWhatsApp}</span>
                </Button>
              </a>
            ) : (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{dict.common.pendingSetup}</p>
                  <p className="text-xs mt-1">
                    {locale === 'hi'
                      ? 'व्यवस्थापक द्वारा आधिकारिक व्हाट्सएप नंबर कॉन्फ़िगर किया जाना बाकी है।'
                      : 'The official business WhatsApp number is awaiting final deployment configuration.'}
                  </p>
                </div>
              </div>
            )}

            <p className="text-xs text-earth-700/80 leading-relaxed">
              {dict.productDetail.orderNotice}
            </p>
          </div>

          {/* Packaging & Origin Badges */}
          <div className="pt-4 border-t border-cream-200 grid grid-cols-2 gap-3 text-xs text-earth-800">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-cream-50 border border-cream-200">
              <Package className="w-4 h-4 text-forest-600 flex-shrink-0" />
              <span>{dict.productDetail.glassJarNotice}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-cream-50 border border-cream-200">
              <ShieldCheck className="w-4 h-4 text-forest-600 flex-shrink-0" />
              <span>{locale === 'hi' ? 'प्रामाणिक स्रोत गारंटी' : 'Verified Provenance'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Harvest Characteristics Table */}
      {product.characteristics && (
        <div className="bg-cream-50/60 rounded-3xl p-6 sm:p-8 border border-cream-200">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-honey-600" />
            <span>{dict.productDetail.characteristics}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.characteristics.tasteNotes && (
              <Card className="p-5 bg-white">
                <div className="text-xs font-bold uppercase tracking-wider text-honey-600 mb-1">
                  {dict.productDetail.tasteProfile}
                </div>
                <p className="text-sm text-earth-800 font-medium">
                  {locale === 'hi'
                    ? product.characteristics.tasteNotes.hi
                    : product.characteristics.tasteNotes.en}
                </p>
              </Card>
            )}

            {product.characteristics.color && (
              <Card className="p-5 bg-white">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-honey-600 mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{dict.productDetail.color}</span>
                </div>
                <p className="text-sm text-earth-800 font-medium">
                  {locale === 'hi'
                    ? product.characteristics.color.hi
                    : product.characteristics.color.en}
                </p>
              </Card>
            )}

            {product.characteristics.origin && (
              <Card className="p-5 bg-white">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-honey-600 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{dict.productDetail.origin}</span>
                </div>
                <p className="text-sm text-earth-800 font-medium">
                  {locale === 'hi'
                    ? product.characteristics.origin.hi
                    : product.characteristics.origin.en}
                </p>
              </Card>
            )}

            {product.characteristics.season && (
              <Card className="p-5 bg-white">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-honey-600 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{dict.productDetail.harvestSeason}</span>
                </div>
                <p className="text-sm text-earth-800 font-medium">
                  {locale === 'hi'
                    ? product.characteristics.season.hi
                    : product.characteristics.season.en}
                </p>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-cream-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-forest-900">
              {dict.productDetail.relatedTitle}
            </h2>
            <Link
              href={`/${locale}/products`}
              className="text-xs sm:text-sm font-semibold text-forest-600 hover:underline"
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
                  className="group bg-white rounded-2xl p-4 border border-cream-200 shadow-2xs hover:shadow-card hover:border-honey-300 transition-all flex items-center gap-4"
                >
                  <div className="relative w-16 h-16 bg-cream-50 rounded-xl overflow-hidden flex-shrink-0 p-1">
                    <Image
                      src={rel.image}
                      alt={relName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-forest-900 group-hover:text-forest-700 text-sm sm:text-base">
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
