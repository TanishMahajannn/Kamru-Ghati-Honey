import { Locale } from '@/types/i18n';

/**
 * Format price stored in integer paise to INR string
 * e.g., 45000 paise -> ₹450
 */
export function formatPaiseToINR(
  paise: number | null | undefined,
  locale: Locale = 'en',
  options?: { showDecimalsIfZero?: boolean }
): string | null {
  if (paise === null || paise === undefined || isNaN(paise)) {
    return null;
  }

  const rupees = paise / 100;
  const intlLocale = locale === 'hi' ? 'hi-IN' : 'en-IN';

  const hasDecimals = rupees % 1 !== 0;
  const formatter = new Intl.NumberFormat(intlLocale, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: options?.showDecimalsIfZero || hasDecimals ? 2 : 0,
    minimumFractionDigits: options?.showDecimalsIfZero || hasDecimals ? 2 : 0,
  });

  return formatter.format(rupees);
}

/**
 * Get readable fallback string when price is unconfirmed
 */
export function getPriceDisplay(
  paise: number | null | undefined,
  locale: Locale = 'en'
): { formatted: string; isConfirmed: boolean } {
  const formatted = formatPaiseToINR(paise, locale);
  if (formatted) {
    return { formatted, isConfirmed: true };
  }

  return {
    formatted: locale === 'hi' ? 'मूल्य पुष्टि हेतु पूछताछ करें' : 'Price on Enquiry',
    isConfirmed: false,
  };
}
