'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';
import { BrandLogo } from '@/components/icons/BrandLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { appConfig } from '@/lib/config';

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: `/${locale}/products`, label: dict.nav.products },
    { href: `/${locale}/about`, label: locale === 'hi' ? 'उत्पत्ति एवं स्रोत' : 'Origins' },
    { href: `/${locale}/wholesale`, label: dict.nav.wholesale },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const quickWhatsAppUrl = appConfig.whatsapp.isConfigured
    ? `https://wa.me/${appConfig.whatsapp.number}?text=${encodeURIComponent(
        locale === 'hi'
          ? 'नमस्ते कामरू घाटी हनी, मैं आपके शहद उत्पादों के बारे में जानकारी चाहता/चाहती हूँ।'
          : 'Hello Kamru Ghati Honey, I would like to enquire about your honey varieties.'
      )}`
    : null;

  return (
    <header className="sticky top-0 z-40 bg-cream-100/95 backdrop-blur-xs border-b border-cream-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center focus:outline-none focus:ring-1 focus:ring-honey-500 rounded-md py-1"
            aria-label={dict.common.brandName}
          >
            <BrandLogo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10" aria-label="Main Navigation">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={`${link.href}-${idx}`}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors hover:text-earth-900 focus:outline-none focus:underline ${
                    isActive ? 'text-earth-900 font-semibold' : 'text-earth-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Language Switcher & WhatsApp Pill */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />

            {quickWhatsAppUrl ? (
              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-earth-900 hover:bg-earth-800 text-cream-100 text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-honey-500 shadow-2xs"
                aria-label={dict.nav.quickWhatsApp}
              >
                <MessageCircle className="w-3.5 h-3.5 text-honey-400" />
                <span>{locale === 'hi' ? 'व्हाट्सएप' : 'Enquire'}</span>
              </a>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-earth-800 hover:text-earth-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[113px] bg-cream-100 z-50 border-t border-cream-300 p-6 flex flex-col justify-between overflow-y-auto">
          <nav className="flex flex-col gap-5 pt-4">
            {navLinks.map((link, idx) => (
              <Link
                key={`${link.href}-${idx}`}
                href={link.href}
                className="text-base font-serif font-semibold text-earth-900 py-2 border-b border-cream-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-8 space-y-4">
            {quickWhatsAppUrl && (
              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-earth-900 text-cream-100 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-honey-400" />
                <span>{dict.nav.quickWhatsApp}</span>
              </a>
            )}
            <p className="text-center text-[11px] text-earth-400 uppercase tracking-widest">
              EST. 2020 • MANDI, HIMACHAL PRADESH
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
