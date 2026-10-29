/**
 * Application environment configuration & validation
 */

export function getWhatsAppConfig() {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919817273374';
  const clean = raw.replace(/[^0-9]/g, '');
  const isConfigured =
    clean.length >= 10 &&
    clean.length <= 15 &&
    !clean.includes('XXXXXXXXXX');

  // Format e.g. 919817273374 -> +91 98172 73374
  const formatted = isConfigured
    ? clean.startsWith('91') && clean.length === 12
      ? `+91 ${clean.slice(2, 7)} ${clean.slice(7)}`
      : `+${clean}`
    : null;

  return {
    raw,
    number: isConfigured ? clean : null,
    formatted,
    isConfigured,
  };
}

export const appConfig = {
  appName: 'Kamru Ghati Honey',
  establishedYear: 2020,
  location: {
    district: 'Mandi',
    state: 'Himachal Pradesh',
    country: 'India',
    address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Mandi, Himachal Pradesh, India',
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kamrughatihoney.com',
  get whatsapp() {
    return getWhatsAppConfig();
  },
  contact: {
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() || null,
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE?.trim() || '+91 98172 73374',
  },
  compliance: {
    fssai: process.env.NEXT_PUBLIC_FSSAI_NUMBER?.trim() || null,
    gst: process.env.NEXT_PUBLIC_GST_NUMBER?.trim() || null,
  },
};
