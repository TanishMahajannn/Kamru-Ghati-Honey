export type Locale = 'en' | 'hi';

export const LOCALES: Locale[] = ['en', 'hi'];
export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleParam {
  params: Promise<{
    locale: Locale;
  }>;
}

export interface ProductDetailLocaleParam {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}
