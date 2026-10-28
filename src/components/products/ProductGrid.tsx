'use client';

import React, { useState } from 'react';
import { HoneyProduct } from '@/types/product';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';
import { ProductCard } from './ProductCard';
import { Filter } from 'lucide-react';

interface ProductGridProps {
  products: HoneyProduct[];
  locale: Locale;
  dict: Dictionary;
}

export function ProductGrid({ products, locale, dict }: ProductGridProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredProducts =
    selectedFilter === 'all'
      ? products
      : products.filter((p) => p.slug === selectedFilter);

  return (
    <div className="space-y-8">
      {/* Variety Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-cream-200">
        <div className="flex items-center gap-1.5 text-xs text-earth-700/80 mr-2">
          <Filter className="w-3.5 h-3.5 text-forest-600" />
          <span className="font-semibold uppercase tracking-wider">
            {locale === 'hi' ? 'फ़िल्टर:' : 'Filter:'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSelectedFilter('all')}
          className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-full font-medium transition-all ${
            selectedFilter === 'all'
              ? 'bg-forest-600 text-white font-semibold shadow-xs'
              : 'bg-cream-100 text-earth-800 hover:bg-cream-200'
          }`}
          aria-pressed={selectedFilter === 'all'}
        >
          {dict.catalogue.filterAll} ({products.length})
        </button>

        {products.map((p) => {
          const isSelected = selectedFilter === p.slug;
          const name = locale === 'hi' ? p.name.hi : p.name.en;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setSelectedFilter(p.slug)}
              className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-full font-medium transition-all ${
                isSelected
                  ? 'bg-forest-600 text-white font-semibold shadow-xs'
                  : 'bg-cream-100 text-earth-800 hover:bg-cream-200'
              }`}
              aria-pressed={isSelected}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Results grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-cream-50 rounded-2xl border border-cream-200 p-8">
          <p className="text-earth-700 font-medium">
            {dict.catalogue.emptyState}
          </p>
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className="mt-4 text-xs font-semibold text-forest-600 hover:underline"
          >
            {locale === 'hi' ? 'सभी उत्पाद देखें' : 'View all products'}
          </button>
        </div>
      )}
    </div>
  );
}
