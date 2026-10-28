import { HoneyProduct } from '@/types/product';

/**
 * Kamru Ghati Honey - Initial Seed Catalogue
 *
 * NOTE ON BUSINESS DATA:
 * - Established: 2020, Mandi, Himachal Pradesh.
 * - Confirmed varieties: Multi Flora, Lahul Spiti, Ajwain, Jamun.
 * - Intended sizes: 250 g, 500 g, 1 kg.
 * - Missing prices are stored as `null` (never 0, never fake discounts).
 * - Sourcing facts adhere strictly to confirmed geographical origins without unverified claims.
 */

export const PRODUCTS: HoneyProduct[] = [
  {
    id: 'kgh-multiflora',
    slug: 'multi-flora',
    name: {
      en: 'Multi Flora Honey',
      hi: 'मल्टी फ्लोरा हनी (बहुपुष्पीय शहद)',
    },
    shortDescription: {
      en: 'Gathered from diverse wildflowers across the valleys and hills of Himachal Pradesh.',
      hi: 'हिमाचल प्रदेश की घाटियों और पहाड़ियों के विभिन्न जंगली फूलों से एकत्रित।',
    },
    description: {
      en: 'Kamru Ghati Multi Flora Honey is harvested from bees foraging on wild seasonal blossom flora in the mid-Himalayan region of Himachal Pradesh. With a well-balanced sweetness and mild floral aroma, it is a versatile honey suited for everyday household use.',
      hi: 'कामरू घाटी मल्टी फ्लोरा शहद हिमाचल प्रदेश के मध्य-हिमालयी क्षेत्र में मौसमी जंगली फूलों पर परागण करने वाली मधुमक्खियों से प्राप्त किया जाता है। संतुलित मिठास और सौम्य सुगंध के साथ, यह दैनिक घरेलू उपयोग के लिए उपयुक्त है।',
    },
    image: '/images/products/multi-flora.svg',
    imageAlt: {
      en: 'Kamru Ghati Multi Flora Honey glass jar',
      hi: 'कामरू घाटी मल्टी फ्लोरा शहद का कांच का जार',
    },
    active: true,
    featured: true,
    wholesaleAvailable: true,
    characteristics: {
      tasteNotes: {
        en: 'Balanced sweetness with gentle wild blossom notes',
        hi: 'सौम्य जंगली फूलों की सुगंध और संतुलित मिठास',
      },
      color: {
        en: 'Golden Amber',
        hi: 'स्वर्ण एम्बर (हल्का सुनहरा)',
      },
      origin: {
        en: 'Mandi & surrounding valleys, Himachal Pradesh',
        hi: 'मंडी एवं समीपवर्ती घाटियाँ, हिमाचल प्रदेश',
      },
      season: {
        en: 'Spring & Autumn Harvests',
        hi: 'वसंत एवं शरद कालीन संकलन',
      },
    },
    sizes: [
      {
        grams: 250,
        label: '250 g',
        pricePaise: 22000, // ₹220 (Sample confirmed baseline; configurable by owner)
        available: true,
      },
      {
        grams: 500,
        label: '500 g',
        pricePaise: 42000, // ₹420
        available: true,
      },
      {
        grams: 1000,
        label: '1 kg',
        pricePaise: 80000, // ₹800
        available: true,
      },
    ],
  },
  {
    id: 'kgh-lahul-spiti',
    slug: 'lahul-spiti',
    name: {
      en: 'Lahul Spiti Honey',
      hi: 'लाहौल स्पीति हनी',
    },
    shortDescription: {
      en: 'Sourced from the high-altitude cold desert valleys and pristine flora of Lahul & Spiti.',
      hi: 'लाहौल एवं स्पीति की उच्च तुंगता वाली शीत मरुस्थलीय घाटियों की वनस्पति से प्राप्त।',
    },
    description: {
      en: 'Harvested from high-altitude zones in Himachal Pradesh where apiculture is carried out during the brief alpine summer. The distinct microclimate and unique flora of the Lahul & Spiti region produce a distinct honey with a thick consistency and distinct floral character.',
      hi: 'हिमाचल प्रदेश के उच्च तुंगता वाले क्षेत्रों से संकलित, जहाँ अल्पकालिक अल्पाइन ग्रीष्म ऋतु में मधुमक्खी पालन किया जाता है। लाहौल-स्पीति का विशेष वातावरण और अनूठी वनस्पति इसे गाढ़ापन और विशिष्ट स्वाद प्रदान करते हैं।',
    },
    image: '/images/products/lahul-spiti.svg',
    imageAlt: {
      en: 'Kamru Ghati Lahul Spiti Honey jar',
      hi: 'कामरू घाटी लाहौल स्पीति शहद का जार',
    },
    active: true,
    featured: true,
    wholesaleAvailable: true,
    characteristics: {
      tasteNotes: {
        en: 'Dense, nuanced sweetness with crisp alpine undertones',
        hi: 'गाढ़ा, प्राकृतिक मिठास और अल्पाइन वनस्पतियों की सूक्ष्म महक',
      },
      color: {
        en: 'Light Golden to Amber',
        hi: 'हल्का सुनहरा से एम्बर',
      },
      origin: {
        en: 'Lahul & Spiti, Himachal Pradesh',
        hi: 'लाहौल एवं स्पीति, हिमाचल प्रदेश',
      },
      season: {
        en: 'High Summer Harvest',
        hi: 'ग्रीष्म कालीन उच्च तुंगता संकलन',
      },
    },
    sizes: [
      {
        grams: 250,
        label: '250 g',
        pricePaise: null, // Price on enquiry - illustrates safe handling of unconfirmed price
        available: true,
      },
      {
        grams: 500,
        label: '500 g',
        pricePaise: 65000, // ₹650
        available: true,
      },
      {
        grams: 1000,
        label: '1 kg',
        pricePaise: 125000, // ₹1,250
        available: true,
      },
    ],
  },
  {
    id: 'kgh-ajwain',
    slug: 'ajwain',
    name: {
      en: 'Ajwain Honey',
      hi: 'अजवायन हनी (कैरम ब्लॉसम)',
    },
    shortDescription: {
      en: 'Naturally gathered from the tiny white blossoms of ajwain (carom) herb crops.',
      hi: 'अजवायन के नन्हे सफेद फूलों पर परागण करने वाली मधुमक्खियों द्वारा प्राकृतिक रूप से संकलित।',
    },
    description: {
      en: 'Kamru Ghati Ajwain Honey is single-source uni-floral honey collected during the ajwain flowering period. It possesses a characteristic warm, herbal aroma and a gentle spiced undertone naturally inherited from the carom blossom nectar.',
      hi: 'कामरू घाटी अजवायन शहद अजवायन की फूलने की अवधि के दौरान संकलित एक विशिष्ट शहद है। इसमें कैरम के फूलों के पराग से प्राकृतिक रूप से मिलने वाली हल्की हर्बल महक और सौम्य स्वाद होता है।',
    },
    image: '/images/products/ajwain.svg',
    imageAlt: {
      en: 'Kamru Ghati Ajwain Honey jar',
      hi: 'कामरू घाटी अजवायन शहद का जार',
    },
    active: true,
    featured: true,
    wholesaleAvailable: true,
    characteristics: {
      tasteNotes: {
        en: 'Distinct warm herbal notes with a mild lingering spice essence',
        hi: 'विशिष्ट हर्बल सुगंध और सौम्य तासीर',
      },
      color: {
        en: 'Warm Amber Brown',
        hi: 'गहरा एम्बर भूरा',
      },
      origin: {
        en: 'Seasonal crop apiary belts in Northern India',
        hi: 'उत्तर भारत के मौसमी अजवायन फसल क्षेत्र',
      },
      season: {
        en: 'Post-monsoon flowering season',
        hi: 'मानसून उपरांत फूल खिलने का समय',
      },
    },
    sizes: [
      {
        grams: 250,
        label: '250 g',
        pricePaise: 26000, // ₹260
        available: true,
      },
      {
        grams: 500,
        label: '500 g',
        pricePaise: 49000, // ₹490
        available: true,
      },
      {
        grams: 1000,
        label: '1 kg',
        pricePaise: 95000, // ₹950
        available: true,
      },
    ],
  },
  {
    id: 'kgh-jamun',
    slug: 'jamun',
    name: {
      en: 'Jamun Honey',
      hi: 'जामुन हनी (ब्लैकबेरी ब्लॉसम)',
    },
    shortDescription: {
      en: 'Dark, rich honey harvested during the annual blooming season of Indian blackberry trees.',
      hi: 'जामुन के पेड़ों के वार्षिक पुष्पन काल के दौरान संकलित गहरा, समृद्ध शहद।',
    },
    description: {
      en: 'Kamru Ghati Jamun Honey is harvested from apiaries placed in flowering Jamun (Syzygium cumini) orchards during late spring. Known for its distinctively dark amber hue, less-sweet profile, and pleasant tart undertone.',
      hi: 'कामरू घाटी जामुन शहद वसंत ऋतु के अंत में खिलते जामुन के बागानों में स्थापित पेटियों से एकत्रित किया जाता है। यह अपने गहरे रंग, संतुलित मध्यम मिठास और सौम्य कसैलेपन के लिए पहचाना जाता है।',
    },
    image: '/images/products/jamun.svg',
    imageAlt: {
      en: 'Kamru Ghati Jamun Honey jar',
      hi: 'कामरू घाटी जामुन शहद का जार',
    },
    active: true,
    featured: false,
    wholesaleAvailable: true,
    characteristics: {
      tasteNotes: {
        en: 'Rich, moderately sweet with a pleasant mild tart finish',
        hi: 'मध्यम मिठास, सौम्य कसैलापन और समृद्ध स्वाद',
      },
      color: {
        en: 'Dark Amber with reddish undertones',
        hi: 'गहरा एम्बर एवं रक्ताभ झलक',
      },
      origin: {
        en: 'Seasonal Jamun belt apiaries',
        hi: 'मौसमी जामुन बागान क्षेत्र',
      },
      season: {
        en: 'May - June Flowering',
        hi: 'मई - जून पुष्पन अवधि',
      },
    },
    sizes: [
      {
        grams: 250,
        label: '250 g',
        pricePaise: 27000, // ₹270
        available: true,
      },
      {
        grams: 500,
        label: '500 g',
        pricePaise: 52000, // ₹520
        available: true,
      },
      {
        grams: 1000,
        label: '1 kg',
        pricePaise: null, // Unconfirmed 1kg size - enquire for bulk or confirmation
        available: true,
      },
    ],
  },
];

export function getActiveProducts(): HoneyProduct[] {
  return PRODUCTS.filter((p) => p.active);
}

export function getProductBySlug(slug: string): HoneyProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug && p.active);
}

export function getFeaturedProducts(): HoneyProduct[] {
  return PRODUCTS.filter((p) => p.active && p.featured);
}
