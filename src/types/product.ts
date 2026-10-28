export type ProductSize = {
  grams: number;
  label: string; // e.g. "250 g", "500 g", "1 kg"
  pricePaise: number | null; // integer paise, or null if to be confirmed/enquired
  available: boolean | null; // null if unconfirmed
};

export type HoneyProduct = {
  id: string;
  slug: string;
  name: {
    en: string;
    hi: string;
  };
  shortDescription: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  image: string; // URL or static asset path
  imageAlt: {
    en: string;
    hi: string;
  };
  sizes: ProductSize[];
  active: boolean;
  featured?: boolean;
  characteristics?: {
    tasteNotes?: { en: string; hi: string };
    color?: { en: string; hi: string };
    origin?: { en: string; hi: string };
    season?: { en: string; hi: string };
  };
  wholesaleAvailable?: boolean;
};

export type RetailEnquiryData = {
  product: HoneyProduct;
  selectedSize: ProductSize;
  quantity: number;
  customerNote?: string;
};

export type WholesaleEnquiryData = {
  name: string;
  businessName?: string;
  phone: string;
  email?: string;
  selectedProducts: string[];
  preferredSizes: string[];
  estimatedQuantity: string;
  deliveryLocation: string;
  message?: string;
};
