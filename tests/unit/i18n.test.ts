import { describe, it, expect } from 'vitest';
import { getDictionary } from '@/i18n/getDictionary';
import { LOCALES } from '@/types/i18n';

describe('i18n Translation Dictionary System', () => {
  it('returns valid dictionaries for both supported locales', () => {
    LOCALES.forEach((locale) => {
      const dict = getDictionary(locale);
      expect(dict).toBeDefined();
      expect(dict.common.brandName).toBeDefined();
      expect(dict.nav.products).toBeDefined();
      expect(dict.wholesale.title).toBeDefined();
      expect(dict.faq.title).toBeDefined();
      expect(dict.policies.privacyTitle).toBeDefined();
    });
  });

  it('contains accurate brand established year 2020 in both locales', () => {
    const enDict = getDictionary('en');
    const hiDict = getDictionary('hi');

    expect(enDict.common.established).toContain('2020');
    expect(hiDict.common.established).toContain('2020');
    expect(enDict.hero.badge).toContain('2020');
    expect(hiDict.hero.badge).toContain('2020');
  });

  it('accurately identifies Mandi, Himachal Pradesh in both locales', () => {
    const enDict = getDictionary('en');
    const hiDict = getDictionary('hi');

    expect(enDict.common.locationText).toContain('Mandi, Himachal Pradesh');
    expect(hiDict.common.locationText).toContain('मंडी, हिमाचल प्रदेश');
  });

  it('falls back safely to English when an unsupported locale is requested', () => {
    // @ts-expect-error Testing invalid locale fallback
    const dict = getDictionary('fr');
    expect(dict.common.brandName).toBe('Kamru Ghati Honey');
  });
});
