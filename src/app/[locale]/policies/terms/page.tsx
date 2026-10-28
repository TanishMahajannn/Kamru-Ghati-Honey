import React from 'react';
import { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AlertCircle, Scale } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  return {
    title: `${dict.policies.termsTitle} | Kamru Ghati Honey`,
    description: 'Terms and conditions for Kamru Ghati Honey website and customer transactions.',
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  const breadcrumbs = [
    { label: dict.common.policies },
    { label: dict.policies.termsTitle },
  ];

  return (
    <div className="py-8 md:py-16 bg-cream-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        <div className="border-b border-cream-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-forest-700 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-honey-600" />
            <span>Kamru Ghati Honey • Mandi, HP</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest-900">
            {dict.policies.termsTitle}
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
                <h2 className="font-serif font-bold text-lg text-forest-900">1. व्यापारिक स्वरूप एवं पूछताछ</h2>
                <p>
                  कामरू घाटी हनी 2020 से मंडी, हिमाचल प्रदेश में स्थापित एक उद्यम है। इस वेबसाइट पर दी गई जानकारी हमारे शहद की किस्मों, आकार और सामान्य मूल्य को दर्शाती है। वेबसाइट पर पूछताछ शुरू करने से कोई बाध्यकारी वित्तीय दायित्व उत्पन्न नहीं होता जब तक कि दोनों पक्ष अंतिम स्टॉक, मूल्य और कूरियर विवरण पर सहमत न हों।
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">2. प्राकृतिक उत्पाद की विशेषताएं</h2>
                <p>
                  शुद्ध प्राकृतिक शहद का रंग, घनत्व और स्वाद मौसमी फूलों, मौसम और संकलन समय के आधार पर बैच-दर-बैच थोड़ा भिन्न हो सकता है। प्राकृतिक शहद में क्रिस्टलीकरण (जमना) एक स्वाभाविक भौतिक गुण है और यह अशुद्धता का संकेत नहीं है।
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">3. स्वास्थ्य एवं उपयोग सम्बन्धी परामर्श</h2>
                <p>
                  हमारा शहद भोजन/आहार उत्पाद के रूप में बेचा जाता है। यह किसी चिकित्सा या रोग-निवारण के विकल्प के रूप में अभिप्रेत नहीं है। 12 महीने से कम उम्र के शिशुओं को शहद का सेवन नहीं कराना चाहिए।
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">4. क्षेत्राधिकार</h2>
                <p>
                  किसी भी विवाद की स्थिति में न्यायिक क्षेत्राधिकार मंडी, हिमाचल प्रदेश, भारत की सक्षम अदालतों के अधीन होगा।
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">1. Platform Nature & Orders</h2>
                <p>
                  Kamru Ghati Honey is an enterprise established in 2020 in Mandi, Himachal Pradesh. The website presents our floral honey varieties, packaging options, and indicative pricing. A WhatsApp enquiry is an invitation to discuss an order and does not constitute a completed commercial contract until availability, shipping, and payment are verified and confirmed by both parties.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">2. Natural Product Variability</h2>
                <p>
                  Because our honey is harvested from authentic seasonal floral blooms, natural variations in color, viscosity, and floral aroma are expected between batches. Natural crystallization is an inherent property of pure bee honey and does not denote spoilage or adulteration.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">3. Dietary Precautions</h2>
                <p>
                  Honey is sold strictly as a natural food product. It is not formulated to diagnose, treat, or cure any medical disease. Honey should not be consumed by infants under 12 months of age.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">4. Jurisdiction</h2>
                <p>
                  All commercial agreements and transactions are governed under Indian laws, with exclusive jurisdiction in the competent courts of Mandi, Himachal Pradesh.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
