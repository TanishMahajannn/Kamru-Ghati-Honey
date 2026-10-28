import React from 'react';
import { Locale } from '@/types/i18n';
import { getPriceDisplay } from '@/lib/pricing';

interface PriceDisplayProps {
  pricePaise: number | null | undefined;
  locale: Locale;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({
  pricePaise,
  locale,
  className = '',
  size = 'md',
}: PriceDisplayProps) {
  const { formatted, isConfirmed } = getPriceDisplay(pricePaise, locale);

  const sizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-base sm:text-lg font-bold',
    lg: 'text-xl sm:text-2xl font-extrabold',
  };

  if (!isConfirmed) {
    return (
      <span
        className={`inline-block text-xs font-medium text-earth-600 bg-cream-100 px-2 py-0.5 rounded border border-cream-200 ${className}`}
      >
        {formatted}
      </span>
    );
  }

  return (
    <span
      className={`font-serif text-forest-900 tracking-tight ${sizeClasses[size]} ${className}`}
    >
      {formatted}
    </span>
  );
}
