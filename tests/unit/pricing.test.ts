import { describe, it, expect } from 'vitest';
import { formatPaiseToINR, getPriceDisplay } from '@/lib/pricing';

describe('Pricing utility (formatPaiseToINR & getPriceDisplay)', () => {
  it('correctly formats integer paise to INR currency in English', () => {
    // 42000 paise = ₹420
    const formatted = formatPaiseToINR(42000, 'en');
    expect(formatted).toBe('₹420');
  });

  it('correctly formats fractional rupee paise in English', () => {
    // 27550 paise = ₹275.50
    const formatted = formatPaiseToINR(27550, 'en');
    expect(formatted).toBe('₹275.50');
  });

  it('returns null for missing, null, or undefined paise', () => {
    expect(formatPaiseToINR(null)).toBeNull();
    expect(formatPaiseToINR(undefined)).toBeNull();
    expect(formatPaiseToINR(NaN)).toBeNull();
  });

  it('never formats 0 as a free or valid product price unless confirmed', () => {
    const formatted = formatPaiseToINR(0);
    expect(formatted).toBe('₹0');
  });

  it('getPriceDisplay returns "Price on Enquiry" for null prices in English', () => {
    const result = getPriceDisplay(null, 'en');
    expect(result.isConfirmed).toBe(false);
    expect(result.formatted).toBe('Price on Enquiry');
  });

  it('getPriceDisplay returns Hindi equivalent for null prices in Hindi', () => {
    const result = getPriceDisplay(null, 'hi');
    expect(result.isConfirmed).toBe(false);
    expect(result.formatted).toBe('मूल्य पुष्टि हेतु पूछताछ करें');
  });

  it('getPriceDisplay marks confirmed prices accurately', () => {
    const result = getPriceDisplay(65000, 'en');
    expect(result.isConfirmed).toBe(true);
    expect(result.formatted).toBe('₹650');
  });
});
