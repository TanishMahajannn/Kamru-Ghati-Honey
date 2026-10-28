'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';
import { PRODUCTS } from '@/data/products';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const heroSlides = [
    {
      title: locale === 'hi' ? 'मल्टी फ्लोरा हनी' : 'Wildflower Honey',
      variety: 'Multi Flora',
      origin: locale === 'hi' ? 'मध्य-हिमालयी घाटियां, मंडी' : 'Mountain Valleys, Mandi',
      image: '/images/hero-honey-jar.jpg',
      fallbackImage: '/images/products/multi-flora.svg',
      slug: 'multi-flora',
      price: '₹420',
    },
    {
      title: locale === 'hi' ? 'लाहौल स्पीति हनी' : 'Lahul Spiti Honey',
      variety: 'Lahul Spiti',
      origin: locale === 'hi' ? 'लाहौल एवं स्पीति' : 'Cold Desert Valley, Spiti',
      image: '/images/products/lahul-spiti.jpg',
      fallbackImage: '/images/products/lahul-spiti.svg',
      slug: 'lahul-spiti',
      price: '₹650',
    },
    {
      title: locale === 'hi' ? 'अजवायन हनी' : 'Ajwain Honey',
      variety: 'Ajwain',
      origin: locale === 'hi' ? 'कैरम पुष्पीय क्षेत्र' : 'Carom Blossom Apiaries',
      image: '/images/products/ajwain.jpg',
      fallbackImage: '/images/products/ajwain.svg',
      slug: 'ajwain',
      price: '₹490',
    },
    {
      title: locale === 'hi' ? 'जामुन हनी' : 'Jamun Honey',
      variety: 'Jamun',
      origin: locale === 'hi' ? 'मौसमी जामुन बागान' : 'Seasonal Blackberry Orchards',
      image: '/images/products/jamun.jpg',
      fallbackImage: '/images/products/jamun.svg',
      slug: 'jamun',
      price: '₹520',
    },
  ];

  const currentSlide = heroSlides[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-cream-100 pt-8 pb-16 md:pt-14 md:pb-20 border-b border-cream-300/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-earth-500">
                  {locale === 'hi' ? 'प्राकृतिक रूप से संकलित शहद • स्थापना 2020' : 'NATURALLY HARVESTED HONEY'}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4.2rem] font-normal text-earth-900 tracking-tight leading-[1.08]">
                {locale === 'hi' ? (
                  <>
                    शुद्ध, सीधे<br />छत्ते से।
                  </>
                ) : (
                  <>
                    Pure, from<br />the hive.
                  </>
                )}
              </h1>
            </div>

            <p className="text-sm sm:text-base text-earth-600 leading-relaxed max-w-md font-sans">
              {locale === 'hi'
                ? 'प्रकृति के वास्तविक रूप में असली शहद। मंडी, हिमाचल प्रदेश की घाटियों से सावधानीपूर्वक संकलित, शुद्ध स्वाद एवं पोषण से परिपूर्ण।'
                : 'Real honey, the way nature intended. Naturally harvested, carefully sourced from Himachal Pradesh, rich in flavour and goodness.'}
            </p>

            {/* CTAs matching reference pill */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 bg-[#D59B3E] hover:bg-[#C58C32] active:bg-[#B57C26] text-earth-950 text-xs sm:text-sm font-semibold tracking-wide px-7 py-3 rounded-full transition-all duration-200 shadow-2xs hover:shadow-xs group"
              >
                <span>{locale === 'hi' ? 'शहद उत्पाद देखें' : 'Shop honey'}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href={`/${locale}/wholesale`}
                className="inline-flex items-center gap-2 text-earth-800 hover:text-earth-950 text-xs sm:text-sm font-semibold tracking-wide px-5 py-3 rounded-full border border-earth-300 hover:border-earth-500 transition-colors"
              >
                <span>{locale === 'hi' ? 'थोक खरीद' : 'Wholesale enquiry'}</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual on Stone Slab with Carousel Controls */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-end">
            <div className="relative w-full max-w-xl aspect-4/3 rounded-2xl overflow-hidden bg-cream-200/60 shadow-warm border border-cream-300/80 p-2 sm:p-4 flex items-center justify-center">
              {/* Image */}
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  priority
                  className="object-cover object-center transition-all duration-500 hover:scale-102"
                  onError={(e) => {
                    // Fallback to SVG illustration if photo is still caching
                    const target = e.target as HTMLImageElement;
                    if (target.src !== currentSlide.fallbackImage) {
                      target.src = currentSlide.fallbackImage;
                    }
                  }}
                />
              </div>

              {/* Subtle floating jar badge */}
              <div className="absolute bottom-6 left-6 bg-cream-100/90 backdrop-blur-md px-4 py-2 rounded-xl border border-cream-300/70 shadow-sm text-left">
                <p className="font-serif font-bold text-xs sm:text-sm text-earth-900 leading-tight">
                  {currentSlide.title}
                </p>
                <p className="text-[10px] text-earth-500 font-sans tracking-wide">
                  {currentSlide.origin}
                </p>
              </div>
            </div>

            {/* Carousel navigation matching reference (01 — 04 < >) */}
            <div className="w-full max-w-xl flex items-center justify-between pt-4 px-2 text-xs text-earth-600">
              <div className="flex items-center gap-2 font-mono font-medium tracking-widest text-[11px]">
                <span className="text-earth-900 font-bold">0{activeIndex + 1}</span>
                <span className="text-earth-400">—</span>
                <span className="text-earth-400">0{heroSlides.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-earth-300 flex items-center justify-center text-earth-700 hover:bg-cream-200 hover:text-earth-900 transition-colors focus:outline-none"
                  aria-label="Previous honey variety"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-earth-300 flex items-center justify-center text-earth-700 hover:bg-cream-200 hover:text-earth-900 transition-colors focus:outline-none"
                  aria-label="Next honey variety"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
