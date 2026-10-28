import { MetadataRoute } from 'next';
import { appConfig } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${appConfig.siteUrl}/sitemap.xml`,
  };
}
