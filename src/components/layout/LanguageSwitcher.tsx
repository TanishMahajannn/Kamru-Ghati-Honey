'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/types/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'hi') {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/') || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="inline-flex items-center rounded-full border border-cream-300 bg-cream-50/80 p-0.5 text-xs text-earth-700"
    >
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
          currentLocale === 'en'
            ? 'bg-earth-900 text-cream-100 font-semibold'
            : 'text-earth-600 hover:text-earth-900'
        }`}
        aria-pressed={currentLocale === 'en'}
      >
        EN
      </button>

      <span className="text-cream-400 text-[10px] select-none">|</span>

      <button
        type="button"
        onClick={() => handleLanguageChange('hi')}
        className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all font-sans ${
          currentLocale === 'hi'
            ? 'bg-earth-900 text-cream-100 font-semibold'
            : 'text-earth-600 hover:text-earth-900'
        }`}
        aria-pressed={currentLocale === 'hi'}
      >
        हिन्दी
      </button>
    </div>
  );
}
