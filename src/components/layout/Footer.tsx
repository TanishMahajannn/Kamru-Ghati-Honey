import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';
import { BrandLogo } from '@/components/icons/BrandLogo';
import { PRODUCTS } from '@/data/products';
import { MapPin, Phone, Mail, ShieldAlert } from 'lucide-react';
import { appConfig } from '@/lib/config';

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="bg-cream-200/60 text-earth-800 border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-start">
              <BrandLogo showSubtitle={true} className="items-start text-left" />
            </div>
            <p className="text-xs sm:text-sm text-earth-600 leading-relaxed max-w-sm pt-2">
              {dict.footer.about}
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs text-earth-500">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-honey-600 flex-shrink-0 mt-0.5" />
                <span>{appConfig.location.address}</span>
              </div>
              {appConfig.contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-honey-600 flex-shrink-0" />
                  <span>{appConfig.contact.phone}</span>
                </div>
              )}
              {appConfig.contact.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-honey-600 flex-shrink-0" />
                  <span>{appConfig.contact.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-earth-900">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-earth-600">
              <li>
                <Link href={`/${locale}`} className="hover:text-earth-950 transition-colors">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products`} className="hover:text-earth-950 transition-colors">
                  {dict.nav.products}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-earth-950 transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/wholesale`} className="hover:text-earth-950 transition-colors">
                  {dict.nav.wholesale}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-earth-950 transition-colors">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Varieties */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-earth-900">
              {dict.footer.varieties}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-earth-600">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/${locale}/products/${prod.slug}`}
                    className="hover:text-earth-950 transition-colors"
                  >
                    {locale === 'hi' ? prod.name.hi : prod.name.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Policies */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-earth-900">
              {dict.footer.legal}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-earth-600">
              <li>
                <Link href={`/${locale}/policies/privacy`} className="hover:text-earth-950 transition-colors">
                  {dict.policies.privacyTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/policies/terms`} className="hover:text-earth-950 transition-colors">
                  {dict.policies.termsTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/policies/shipping`} className="hover:text-earth-950 transition-colors">
                  {dict.policies.shippingTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/policies/cancellation`} className="hover:text-earth-950 transition-colors">
                  {dict.policies.cancellationTitle}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Advisory / Disclaimer Strip */}
        <div className="mt-12 pt-8 border-t border-cream-300">
          <div className="flex items-start gap-3 bg-cream-50/90 p-4 rounded-xl border border-cream-300/80 text-xs text-earth-600">
            <ShieldAlert className="w-4 h-4 text-honey-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {dict.footer.disclaimer}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-earth-500 gap-2 font-sans">
            <p>{dict.footer.copyright}</p>
            <p className="text-[11px] tracking-wide">
              {locale === 'hi'
                ? 'कामरू घाटी हनी • मंडी, हिमाचल प्रदेश 175001'
                : 'Kamru Ghati Honey • Mandi, Himachal Pradesh 175001'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
