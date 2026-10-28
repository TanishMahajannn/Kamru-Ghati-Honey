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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/products`, label: dict.nav.products },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/wholesale`, label: dict.nav.wholesale },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const quickWhatsAppUrl = appConfig.whatsapp.isConfigured
    ? `https://wa.me/${appConfig.whatsapp.number}?text=${encodeURIComponent(
        locale === 'hi'
          ? 'नमस्ते कामरू घाटी हनी, मैं आपके शहद उत्पादों के संबंध में जानकारी चाहता/चाहती हूँ।'
          : 'Hello Kamru Ghati Honey, I would like to enquire about your honey products.'
      )}`
    : null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-forest-500 rounded-lg p-1"
            aria-label={dict.common.brandName}
          >
            <BrandLogo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === `/${locale}`
                  ? pathname === `/${locale}`
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-500 rounded-md px-1 py-1 ${
                    isActive
                      ? 'text-forest-700 font-bold border-b-2 border-honey-500 -mb-0.5'
                      : 'text-earth-800'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Language Switcher & WhatsApp Button */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />

            {quickWhatsAppUrl ? (
              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs lg:text-sm font-semibold px-3.5 py-2 rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                aria-label={dict.nav.quickWhatsApp}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{dict.nav.quickWhatsApp}</span>
              </a>
            ) : (
              <span className="text-xs text-earth-700/60 border border-cream-300 rounded px-2 py-1 bg-cream-50">
                {locale === 'hi' ? 'व्हाट्सएप: सेटअप लंबित' : 'WhatsApp pending'}
              </span>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-earth-800 hover:text-forest-700 hover:bg-cream-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden fixed inset-0 top-[113px] bg-white z-50 overflow-y-auto border-t border-cream-200 px-6 py-8 flex flex-col justify-between"
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === `/${locale}`
                  ? pathname === `/${locale}`
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium py-2.5 border-b border-cream-100 transition-colors ${
                    isActive ? 'text-forest-700 font-bold' : 'text-earth-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 flex flex-col gap-4">
            {quickWhatsAppUrl && (
              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] active:bg-[#20BD5A] text-white text-base font-semibold py-3.5 rounded-xl shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{dict.nav.quickWhatsApp}</span>
              </a>
            )}

            <div className="text-center text-xs text-earth-700/80">
              <p className="font-semibold text-forest-700">Kamru Ghati Honey</p>
              <p>Mandi, Himachal Pradesh, India</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
