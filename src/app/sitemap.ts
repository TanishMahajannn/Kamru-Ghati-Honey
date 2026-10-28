import { MetadataRoute } from 'next';
import { appConfig } from '@/lib/config';
import { LOCALES } from '@/types/i18n';
import { PRODUCTS } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appConfig.siteUrl;
  const lastModified = new Date();

  const routes: MetadataRoute.Sitemap = [];

  LOCALES.forEach((locale) => {
    // Top-level pages
    routes.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/${locale}/products`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/about`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${locale}/wholesale`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${locale}/contact`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${locale}/policies/privacy`,
        lastModified,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/${locale}/policies/terms`,
        lastModified,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/${locale}/policies/shipping`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.4,
      },
      {
        url: `${baseUrl}/${locale}/policies/cancellation`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.4,
      }
    );

    // Product detail pages
    PRODUCTS.forEach((product) => {
      routes.push({
        url: `${baseUrl}/${locale}/products/${product.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  return routes;
}
