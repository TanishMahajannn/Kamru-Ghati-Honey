import React from 'react';
import { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RefreshCw, AlertCircle } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  return {
    title: `${dict.policies.cancellationTitle} | Kamru Ghati Honey`,
    description: 'Cancellation and refund policies for Kamru Ghati Honey customers.',
  };
}

export default async function CancellationPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  const breadcrumbs = [
    { label: dict.common.policies },
    { label: dict.policies.cancellationTitle },
  ];

  return (
    <div className="py-8 md:py-16 bg-cream-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        <div className="border-b border-cream-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-forest-700 text-xs font-bold uppercase tracking-wider">
            <RefreshCw className="w-4 h-4 text-honey-600" />
            <span>Kamru Ghati Honey • Mandi, HP</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest-900">
            {dict.policies.cancellationTitle}
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
                <h2 className="font-serif font-bold text-lg text-forest-900">1. प्रेषण पूर्व रद्दीकरण (Cancellation)</h2>
                <p>
                  यदि आपने ऑर्डर का भुगतान कर दिया है किन्तु पार्सल अभी तक मंडी से प्रेषित (dispatch) नहीं हुआ है, तो आप व्हाट्सएप पर तुरंत संदेश भेजकर ऑर्डर रद्द करने का अनुरोध कर सकते हैं। प्रेषण पूर्व अनुरोध पर पूरा भुगतान वापस कर दिया जाएगा।
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">2. खाद्य सुरक्षा एवं वापसी (Returns)</h2>
                <p>
                  खाद्य सुरक्षा नियमों और स्वच्छता मानकों के कारण, एक बार सील टूटने या उपयोग किए जाने के बाद शहद की वापसी (return) स्वीकार नहीं की जा सकती।
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">3. पारगमन में क्षति या टूटन (Damaged in Transit)</h2>
                <p>
                  यदि पार्सल आपको टूटी हुई या क्षतिग्रस्त अवस्था में प्राप्त होता है, तो कृपया डिलीवरी के 48 घंटों के भीतर क्षतिग्रस्त पार्सल और जार की स्पष्ट तस्वीरें/वीडियो हमारे व्हाट्सएप नंबर पर भेजें। सत्यापन के उपरांत हम बिना किसी अतिरिक्त शुल्क के पुनः जार प्रेषित करेंगे अथवा रिफंड प्रक्रिया शुरू करेंगे।
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">1. Cancellations Before Dispatch</h2>
                <p>
                  Orders may be cancelled free of charge if the request is communicated via our official WhatsApp channel prior to parcel dispatch from Mandi. In such instances, a 100% refund will be credited back via the original payment mode.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">2. Food Safety & Return Exclusions</h2>
                <p>
                  Under standard food safety regulations and hygiene protocols, consumable honey products cannot be returned once the package seal has been opened or tampered with.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">3. Transit Damage & Replacement Process</h2>
                <p>
                  If a jar arrives damaged or leaking due to mishandling by courier transit, notify us on WhatsApp within 48 hours of delivery with photos of the outer carton and damaged jar. Upon prompt verification, we will dispatch an immediate replacement at our expense or issue a full refund.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
