import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, PackageCheck } from 'lucide-react';

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-cream-200">
      {/* Decorative mountain / subtle glow background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 85% 20%, rgba(217, 164, 65, 0.15) 0%, transparent 40%), radial-gradient(circle at 15% 80%, rgba(37, 77, 56, 0.08) 0%, transparent 45%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div>
              <Badge variant="honey" size="md" className="mb-4 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-honey-600" />
                <span>{dict.hero.badge}</span>
              </Badge>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-forest-900 tracking-tight leading-tight">
                {dict.hero.title}
              </h1>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-earth-700/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {dict.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href={`/${locale}/products`}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base group">
                  <span>{dict.hero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href={`/${locale}/wholesale`}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                  <span>{dict.hero.ctaSecondary}</span>
                </Button>
              </Link>
            </div>

            {/* Factual Milestone Badges */}
            <div className="pt-8 border-t border-cream-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-forest-700">
                  <MapPin className="w-4 h-4 text-honey-600" />
                  <span className="font-serif font-bold text-xl sm:text-2xl text-forest-800">
                    {dict.hero.stat1Value}
                  </span>
                </div>
                <p className="text-xs text-earth-700/80 mt-1 font-medium">
                  {dict.hero.stat1Label}
                </p>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-forest-700">
                  <ShieldCheck className="w-4 h-4 text-honey-600" />
                  <span className="font-serif font-bold text-xl sm:text-2xl text-forest-800">
                    {dict.hero.stat2Value}
                  </span>
                </div>
                <p className="text-xs text-earth-700/80 mt-1 font-medium">
                  {dict.hero.stat2Label}
                </p>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-forest-700">
                  <PackageCheck className="w-4 h-4 text-honey-600" />
                  <span className="font-serif font-bold text-xl sm:text-2xl text-forest-800">
                    {dict.hero.stat3Value}
                  </span>
                </div>
                <p className="text-xs text-earth-700/80 mt-1 font-medium">
                  {dict.hero.stat3Label}
                </p>
              </div>
            </div>
          </div>

          {/* Right Product Illustration Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-cream-200/60 to-white rounded-3xl p-6 shadow-card border border-cream-300/80 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/images/products/multi-flora.svg"
                  alt={dict.common.brandName}
                  fill
                  priority
                  className="object-contain p-2 hover:scale-102 transition-transform duration-300"
                />
              </div>

              {/* Floating verified badge */}
              <div className="absolute -bottom-4 right-4 bg-white/95 backdrop-blur-xs py-2.5 px-4 rounded-xl shadow-md border border-cream-200 text-xs text-earth-800 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-forest-500 animate-pulse" />
                <span className="font-semibold text-forest-800">
                  {locale === 'hi' ? 'सीधा स्रोत • मंडी, हि.प्र.' : 'Direct Source • Mandi, HP'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
