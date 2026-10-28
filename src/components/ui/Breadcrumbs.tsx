import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Locale } from '@/types/i18n';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: Locale;
}

export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs md:text-sm text-earth-700/80">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1 hover:text-forest-600 transition-colors focus:outline-none focus:underline"
            title={locale === 'hi' ? 'होम' : 'Home'}
          >
            <Home className="w-3.5 h-3.5 text-forest-500" />
            <span className="sr-only">{locale === 'hi' ? 'होम' : 'Home'}</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-cream-400" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-forest-600 transition-colors focus:outline-none focus:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-earth-900" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
