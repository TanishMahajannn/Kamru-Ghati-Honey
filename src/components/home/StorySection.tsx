'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';

interface StorySectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function StorySection({ locale, dict }: StorySectionProps) {
  return (
    <section className="py-16 md:py-24 bg-cream-100 border-b border-cream-300/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Beekeeper Photography */}
          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-warm border border-cream-300/80 bg-cream-200">
              <Image
                src="/images/story-beekeeper.jpg"
                alt="Kamru Ghati Himalayan Beekeeper inspecting wooden hive frames in Himachal Pradesh"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Editorial Narrative matching reference */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-earth-500">
                {locale === 'hi' ? 'हमारी कहानी' : 'OUR STORY'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-earth-900 leading-[1.12]">
                {locale === 'hi' ? (
                  <>
                    मधुमक्खियों का सम्मान।<br />उज्ज्वल कल का संकल्प।
                  </>
                ) : (
                  <>
                    Better for bees.<br />Brighter for tomorrow.
                  </>
                )}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-earth-600 leading-relaxed font-sans max-w-lg">
              {locale === 'hi'
                ? 'कामरू घाटी हनी 2020 में मंडी, हिमाचल प्रदेश में स्थापित एक स्वतंत्र पारिवारिक उद्यम है। हम स्थानीय मधुमक्खी पालकों के साथ काम करते हैं जो प्रकृति और पहाड़ों का उतना ही ध्यान रखते हैं जितना मधुमक्खियों का। क्योंकि सच्चा शहद स्वस्थ हिमालय से ही शुरू होता है।'
                : "We're a small, independent brand founded in 2020 in Mandi, Himachal Pradesh, working with regional beekeepers who care about the Himalayan mountain ecology as much as the bees. Because genuine, pure honey starts with a healthy landscape."}
            </p>

            <div className="pt-1">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-earth-900 hover:text-honey-600 transition-colors"
              >
                <span>{locale === 'hi' ? 'हमारी मधुमक्खी पालन यात्रा पढ़ें' : 'Meet our beekeepers'}</span>
                <span>→</span>
              </Link>
            </div>

            {/* Bottom corner tagline matching reference (Real people. Real places. Better honey.) */}
            <div className="pt-8 border-t border-cream-200/80">
              <div className="flex flex-col space-y-1 text-xs text-earth-500 font-serif italic">
                <div className="w-8 h-px bg-earth-300 mb-2" />
                <span>{locale === 'hi' ? 'सच्चे लोग।' : 'Real people.'}</span>
                <span>{locale === 'hi' ? 'सच्चे स्थान।' : 'Real places.'}</span>
                <span>{locale === 'hi' ? 'सर्वश्रेष्ठ शहद।' : 'Better honey.'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
