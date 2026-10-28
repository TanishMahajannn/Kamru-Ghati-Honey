import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, LOCALES } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { PRODUCTS, getProductBySlug } from '@/data/products';
import { ProductDetailView } from '@/components/products/ProductDetailView';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  LOCALES.forEach((locale) => {
    PRODUCTS.forEach((product) => {
      params.push({
        locale,
        slug: product.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const name = locale === 'hi' ? product.name.hi : product.name.en;
  const description =
    locale === 'hi' ? product.shortDescription.hi : product.shortDescription.en;

  return {
    title: `${name} | Kamru Ghati Honey`,
    description,
    openGraph: {
      title: `${name} | Kamru Ghati Honey`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.slug !== slug && p.active).slice(0, 3);
  const productName = locale === 'hi' ? product.name.hi : product.name.en;

  const breadcrumbs = [
    {
      label: dict.common.catalogue,
      href: `/${locale}/products`,
    },
    {
      label: productName,
    },
  ];

  return (
    <div className="py-8 md:py-16 bg-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumbs items={breadcrumbs} locale={locale} />
        <ProductDetailView
          product={product}
          relatedProducts={relatedProducts}
          locale={locale}
          dict={dict}
        />
      </div>
    </div>
  );
}
