'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Locale } from '@/types/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Replace the current locale segment with the target locale
    // e.g. /en/products -> /hi/products
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
      className="inline-flex items-center rounded-lg border border-cream-300 bg-cream-100 p-0.5 text-xs shadow-sm"
    >
      <span className="sr-only">Switch language</span>
      <div className="flex items-center px-1.5 text-earth-700/80" aria-hidden="true">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`px-2.5 py-1 rounded-md font-medium transition-all ${
          currentLocale === 'en'
            ? 'bg-forest-600 text-white font-semibold shadow-xs'
            : 'text-earth-800 hover:text-forest-700 hover:bg-cream-200'
        }`}
        aria-pressed={currentLocale === 'en'}
      >
        English
      </button>

      <button
        type="button"
        onClick={() => handleLanguageChange('hi')}
        className={`px-2.5 py-1 rounded-md font-medium transition-all font-sans ${
          currentLocale === 'hi'
            ? 'bg-forest-600 text-white font-semibold shadow-xs'
            : 'text-earth-800 hover:text-forest-700 hover:bg-cream-200'
        }`}
        aria-pressed={currentLocale === 'hi'}
      >
        हिन्दी
      </button>
    </div>
  );
}
