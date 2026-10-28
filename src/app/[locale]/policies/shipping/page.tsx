import React from 'react';
import { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Truck, AlertCircle, Package } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  return {
    title: `${dict.policies.shippingTitle} | Kamru Ghati Honey`,
    description: 'Shipping and delivery guidelines for Kamru Ghati Honey across India.',
  };
}

export default async function ShippingPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  const breadcrumbs = [
    { label: dict.common.policies },
    { label: dict.policies.shippingTitle },
  ];

  return (
    <div className="py-8 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        <div className="border-b border-cream-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-forest-700 text-xs font-bold uppercase tracking-wider">
            <Truck className="w-4 h-4 text-honey-600" />
            <span>Kamru Ghati Honey • Mandi, HP</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest-900">
            {dict.policies.shippingTitle}
          </h1>
          <p className="text-xs text-earth-700/80">{dict.policies.lastUpdated}</p>
        </div>

        <div className="p-4 rounded-xl bg-cream-50 border border-cream-300 text-xs text-earth-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-honey-600 flex-shrink-0 mt-0.5" />
          <p>{dict.policies.notice}</p>
        </div>

        <div className="prose prose-stone max-w-none text-earth-800 space-y-6 text-sm sm:text-base leading-relaxed">
          {locale === 'hi' ? (
            <>
              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">1. प्रेषण केंद्र एवं सेवा क्षेत्र</h2>
                <p>
                  सभी ऑर्डर हमारे मुख्य केंद्र मंडी, हिमाचल प्रदेश से सीधे तैयार एवं प्रेषित किए जाते हैं। हम मानक भारतीय कूरियर सेवाओं (जैसे India Post Speed Post, DTDC, Delhivery अथवा समकक्ष सेवा) के माध्यम से देश के अधिकांश सेवायोग्य पिन कोड्स पर डिलीवरी उपलब्ध कराते हैं।
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">2. सुरक्षित पैकेजिंग</h2>
                <p>
                  शहद के जार परिवहन के दौरान टूटने या रिसाव से बचाने के लिए बहुस्तरीय बबल रैप, शॉक-एब्जॉर्बिंग पैकिंग और मजबूत कार्टन में पैक किए जाते हैं।
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">3. डिलीवरी समय एवं कूरियर शुल्क</h2>
                <p>
                  ऑर्डर और भुगतान की पुष्टि के उपरांत, सामान्यतः 24 से 48 व्यावसायिक घंटों के भीतर पैकेज प्रेषित किया जाता है। डिलीवरी स्थान के अनुसार सामान्यतः 3 से 7 कार्यदिवस का समय लगता है। कूरियर शुल्क पार्सल के कुल वजन और गंतव्य पिन कोड के आधार पर व्हाट्सएप बातचीत के दौरान स्पष्ट रूप से बताया जाता है।
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">1. Origin & Delivery Coverage</h2>
                <p>
                  All shipments originate directly from our packaging facility in Mandi, Himachal Pradesh. We service serviceable postal PIN codes across India through established domestic courier services (including India Post, Delhivery, DTDC, and regional cargo networks for bulk freight).
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">2. Protective Packaging</h2>
                <p>
                  Every jar is cushioned with multi-layer bubble wrapping, sealed with tamper-evident caps, and packed inside durable outer cartons engineered to withstand postal transit.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">3. Transit Timeline & Shipping Charges</h2>
                <p>
                  Confirmed orders are normally dispatched within 24–48 business hours. Deliveries typically arrive within 3 to 7 business days depending on distance and local logistics accessibility. Exact courier charges are calculated by shipment weight and PIN code, and are confirmed upfront during the WhatsApp enquiry before payment.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
