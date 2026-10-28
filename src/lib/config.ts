/**
 * Application environment configuration & validation
 */

export function getWhatsAppConfig() {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const clean = raw.replace(/[^0-9]/g, '');
  const isConfigured =
    clean.length >= 10 &&
    clean.length <= 15 &&
    !clean.includes('XXXXXXXXXX');

  return {
    raw,
    number: isConfigured ? clean : null,
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
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE?.trim() || null,
  },
  compliance: {
    fssai: process.env.NEXT_PUBLIC_FSSAI_NUMBER?.trim() || null,
    gst: process.env.NEXT_PUBLIC_GST_NUMBER?.trim() || null,
  },
};
