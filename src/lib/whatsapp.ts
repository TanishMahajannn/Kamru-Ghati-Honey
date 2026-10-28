import { appConfig } from './config';
import { HoneyProduct, ProductSize, RetailEnquiryData, WholesaleEnquiryData } from '@/types/product';
import { formatPaiseToINR } from './pricing';
import { Locale } from '@/types/i18n';

/**
 * Build retail enquiry message text
 */
export function buildRetailEnquiryText(
  data: RetailEnquiryData,
  locale: Locale = 'en',
  siteUrl = appConfig.siteUrl
): string {
  const { product, selectedSize, quantity, customerNote } = data;
  const productName = locale === 'hi' ? product.name.hi : product.name.en;
  const productUrl = `${siteUrl}/${locale}/products/${product.slug}`;
  const priceDisplay = selectedSize.pricePaise !== null
    ? `${formatPaiseToINR(selectedSize.pricePaise, locale)} per jar`
    : (locale === 'hi' ? 'मूल्य: पुष्टि हेतु' : 'Price: Pending confirmation');

  if (locale === 'hi') {
    return [
      `नमस्ते कामरू घाटी हनी,`,
      ``,
      `मैं निम्नलिखित उत्पाद के बारे में पूछताछ करना चाहता/चाहती हूँ:`,
      `• उत्पाद: ${productName}`,
      `• आकार (वज़न): ${selectedSize.label}`,
      `• मात्रा: ${quantity} ज़ार`,
      `• सूचीबद्ध मूल्य: ${priceDisplay}`,
      `• उत्पाद लिंक: ${productUrl}`,
      customerNote ? `• ग्राहक टिप्पणी: ${customerNote}` : null,
      ``,
      `कृपया स्टॉक उपलब्धता, अंतिम मूल्य और डिलीवरी शुल्क की पुष्टि करें। धन्यवाद!`,
    ]
      .filter((line) => line !== null)
      .join('\n');
  }

  return [
    `Hello Kamru Ghati Honey,`,
    ``,
    `I would like to enquire about purchasing:`,
    `• Product: ${productName}`,
    `• Size: ${selectedSize.label}`,
    `• Quantity: ${quantity} jar(s)`,
    `• Listed Price: ${priceDisplay}`,
    `• Product Link: ${productUrl}`,
    customerNote ? `• Note: ${customerNote}` : null,
    ``,
    `Please confirm product availability, final price, and delivery charges. Thank you!`,
  ]
    .filter((line) => line !== null)
    .join('\n');
}

/**
 * Build wholesale enquiry message text
 */
export function buildWholesaleEnquiryText(
  data: WholesaleEnquiryData,
  locale: Locale = 'en'
): string {
  const {
    name,
    businessName,
    phone,
    email,
    selectedProducts,
    preferredSizes,
    estimatedQuantity,
    deliveryLocation,
    message,
  } = data;

  if (locale === 'hi') {
    return [
      `नमस्ते कामरू घाटी हनी,`,
      ``,
      `मैं थोक / व्यावसायिक खरीद (Wholesale) के बारे में पूछताछ करना चाहता/चाहती हूँ:`,
      `• संपर्क नाम: ${name}`,
      businessName ? `• व्यापार/दुकान का नाम: ${businessName}` : null,
      `• फ़ोन: ${phone}`,
      email ? `• ईमेल: ${email}` : null,
      `• चयनित उत्पाद: ${selectedProducts.join(', ')}`,
      `• पसंदीदा आकार: ${preferredSizes.join(', ')}`,
      `• अनुमानित मात्रा: ${estimatedQuantity}`,
      `• डिलीवरी स्थान/पिन: ${deliveryLocation}`,
      message ? `• अतिरिक्त विवरण: ${message}` : null,
      ``,
      `कृपया थोक मूल्य सूची, न्यूनतम ऑर्डर मात्रा (MOQ) और डिलीवरी की शर्तें साझा करें। धन्यवाद!`,
    ]
      .filter((line) => line !== null)
      .join('\n');
  }

  return [
    `Hello Kamru Ghati Honey,`,
    ``,
    `I would like to enquire regarding a Wholesale / Bulk purchase:`,
    `• Contact Name: ${name}`,
    businessName ? `• Business / Store Name: ${businessName}` : null,
    `• Phone: ${phone}`,
    email ? `• Email: ${email}` : null,
    `• Interested Varieties: ${selectedProducts.join(', ')}`,
    `• Preferred Jar Sizes: ${preferredSizes.join(', ')}`,
    `• Estimated Order Quantity: ${estimatedQuantity}`,
    `• Delivery Location / PIN: ${deliveryLocation}`,
    message ? `• Requirements / Notes: ${message}` : null,
    ``,
    `Please share your wholesale catalog, MOQ, bulk pricing, and dispatch schedule. Thank you!`,
  ]
    .filter((line) => line !== null)
    .join('\n');
}

/**
 * Generate official wa.me URL
 * Returns null if WhatsApp is not properly configured.
 */
export function createWhatsAppUrl(messageText: string): string | null {
  if (!appConfig.whatsapp.isConfigured || !appConfig.whatsapp.number) {
    return null;
  }

  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${appConfig.whatsapp.number}?text=${encodedText}`;
}
