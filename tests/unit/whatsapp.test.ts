import { describe, it, expect, vi } from 'vitest';
import {
  buildRetailEnquiryText,
  buildWholesaleEnquiryText,
  createWhatsAppUrl,
} from '@/lib/whatsapp';
import { PRODUCTS } from '@/data/products';

describe('WhatsApp Enquiry Message & Link Generator', () => {
  const sampleProduct = PRODUCTS[0]; // Multi Flora
  const sampleSize = sampleProduct.sizes[1]; // 500g

  it('builds clear English retail message containing product, size, and quantity', () => {
    const text = buildRetailEnquiryText(
      {
        product: sampleProduct,
        selectedSize: sampleSize,
        quantity: 2,
        customerNote: 'Please confirm courier to Shimla',
      },
      'en',
      'https://kamrughatihoney.com'
    );

    expect(text).toContain('Hello Kamru Ghati Honey');
    expect(text).toContain('Multi Flora Honey');
    expect(text).toContain('500 g');
    expect(text).toContain('2 jar(s)');
    expect(text).toContain('₹420');
    expect(text).toContain('Please confirm courier to Shimla');
    expect(text).toContain('https://kamrughatihoney.com/en/products/multi-flora');
  });

  it('builds respectful Hindi retail message with Devanagari text', () => {
    const text = buildRetailEnquiryText(
      {
        product: sampleProduct,
        selectedSize: sampleSize,
        quantity: 1,
      },
      'hi',
      'https://kamrughatihoney.com'
    );

    expect(text).toContain('नमस्ते कामरू घाटी हनी');
    expect(text).toContain('मल्टी फ्लोरा');
    expect(text).toContain('500 g');
    expect(text).toContain('1 ज़ार');
  });

  it('safely handles unconfirmed product price without showing fake prices', () => {
    const unconfirmedSize = {
      grams: 250,
      label: '250 g',
      pricePaise: null,
      available: true,
    };

    const text = buildRetailEnquiryText(
      {
        product: sampleProduct,
        selectedSize: unconfirmedSize,
        quantity: 1,
      },
      'en',
      'https://kamrughatihoney.com'
    );

    expect(text).toContain('Price: Pending confirmation');
  });

  it('builds comprehensive wholesale message with business details and requirements', () => {
    const text = buildWholesaleEnquiryText(
      {
        name: 'Ramesh Verma',
        businessName: 'Verma Organics & Provisions',
        phone: '9816012345',
        email: 'ramesh@example.com',
        selectedProducts: ['Multi Flora Honey', 'Lahul Spiti Honey'],
        preferredSizes: ['500 g', '1 kg'],
        estimatedQuantity: '100 jars',
        deliveryLocation: 'Solan, Himachal Pradesh - 173212',
        message: 'Looking for bi-monthly regular delivery.',
      },
      'en'
    );

    expect(text).toContain('Wholesale / Bulk purchase');
    expect(text).toContain('Ramesh Verma');
    expect(text).toContain('Verma Organics & Provisions');
    expect(text).toContain('9816012345');
    expect(text).toContain('Multi Flora Honey, Lahul Spiti Honey');
    expect(text).toContain('500 g, 1 kg');
    expect(text).toContain('100 jars');
    expect(text).toContain('Solan, Himachal Pradesh - 173212');
  });

  it('creates valid URL-encoded wa.me link when configured', () => {
    const message = 'Hello Kamru Ghati Honey!';
    const url = createWhatsAppUrl(message);

    if (url) {
      expect(url).toMatch(/^https:\/\/wa\.me\/[0-9]+\?text=/);
      expect(url).toContain(encodeURIComponent(message));
    }
  });
});
