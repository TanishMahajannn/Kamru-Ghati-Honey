import { z } from 'zod';

export const retailQuantitySchema = z
  .number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a valid number',
  })
  .int('Quantity must be a whole number')
  .min(1, 'Minimum order quantity is 1 jar')
  .max(100, 'For orders over 100 jars, please use our Wholesale Enquiry');

export const wholesaleFormSchema = z.object({
  name: z
    .string({ required_error: 'Full name or contact person is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be under 80 characters'),
  businessName: z
    .string()
    .trim()
    .max(100, 'Business name must be under 100 characters')
    .optional()
    .or(z.literal('')),
  phone: z
    .string({ required_error: 'Valid phone number is required' })
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  selectedProducts: z
    .array(z.string())
    .min(1, 'Please select at least one honey variety of interest'),
  preferredSizes: z
    .array(z.string())
    .min(1, 'Please select at least one preferred packaging size'),
  estimatedQuantity: z
    .string({ required_error: 'Estimated quantity is required' })
    .trim()
    .min(2, 'Please specify approximate quantity (e.g., 20 kg, 50 jars, or 2 cartons)'),
  deliveryLocation: z
    .string({ required_error: 'Delivery location or PIN code is required' })
    .trim()
    .min(2, 'Please provide delivery city, state or PIN code')
    .max(120, 'Location must be under 120 characters'),
  message: z
    .string()
    .trim()
    .max(1000, 'Message cannot exceed 1000 characters')
    .optional()
    .or(z.literal('')),
});

export type WholesaleFormValues = z.infer<typeof wholesaleFormSchema>;
