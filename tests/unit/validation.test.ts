import { describe, it, expect } from 'vitest';
import { retailQuantitySchema, wholesaleFormSchema } from '@/lib/validation';

describe('Validation Schemas (Zod)', () => {
  describe('retailQuantitySchema', () => {
    it('accepts valid quantities between 1 and 100', () => {
      expect(retailQuantitySchema.safeParse(1).success).toBe(true);
      expect(retailQuantitySchema.safeParse(5).success).toBe(true);
      expect(retailQuantitySchema.safeParse(50).success).toBe(true);
    });

    it('rejects 0 or negative numbers', () => {
      expect(retailQuantitySchema.safeParse(0).success).toBe(false);
      expect(retailQuantitySchema.safeParse(-2).success).toBe(false);
    });

    it('rejects floating point decimals', () => {
      expect(retailQuantitySchema.safeParse(2.5).success).toBe(false);
    });

    it('rejects quantities above 100 with guidance to use wholesale', () => {
      const result = retailQuantitySchema.safeParse(101);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Wholesale Enquiry');
      }
    });
  });

  describe('wholesaleFormSchema', () => {
    const validPayload = {
      name: 'Anil Sharma',
      businessName: 'Sharma General Store',
      phone: '9876543210',
      email: 'anil@store.com',
      selectedProducts: ['multi-flora', 'lahul-spiti'],
      preferredSizes: ['500 g'],
      estimatedQuantity: '50 jars',
      deliveryLocation: 'Mandi Town, HP',
      message: 'Need sample batch first.',
    };

    it('passes for fully valid input', () => {
      const result = wholesaleFormSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it('passes without optional email and businessName', () => {
      const { email, businessName, ...requiredOnly } = validPayload;
      const result = wholesaleFormSchema.safeParse(requiredOnly);
      expect(result.success).toBe(true);
    });

    it('rejects invalid Indian phone numbers', () => {
      const invalidPhonePayload = { ...validPayload, phone: '12345' };
      const result = wholesaleFormSchema.safeParse(invalidPhonePayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path[0] === 'phone')).toBe(true);
      }
    });

    it('rejects empty selectedProducts array', () => {
      const noProducts = { ...validPayload, selectedProducts: [] };
      const result = wholesaleFormSchema.safeParse(noProducts);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path[0] === 'selectedProducts')).toBe(true);
      }
    });

    it('rejects empty preferredSizes array', () => {
      const noSizes = { ...validPayload, preferredSizes: [] };
      const result = wholesaleFormSchema.safeParse(noSizes);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path[0] === 'preferredSizes')).toBe(true);
      }
    });
  });
});
