import React from 'react';
import { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  return {
    title: `${dict.policies.privacyTitle} | Kamru Ghati Honey`,
    description: 'Privacy policy for Kamru Ghati Honey website visitors and customer enquiries.',
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  const breadcrumbs = [
    { label: dict.common.policies },
    { label: dict.policies.privacyTitle },
  ];

  return (
    <div className="py-8 md:py-16 bg-cream-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        <div className="border-b border-cream-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-forest-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-honey-600" />
            <span>Kamru Ghati Honey • Mandi, HP</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest-900">
            {dict.policies.privacyTitle}
          </h1>
          <p className="text-xs text-earth-700/80">{dict.policies.lastUpdated}</p>
        </div>

        {/* Legal Advisory Notice */}
        <div className="p-4 rounded-xl bg-cream-50 border border-cream-300 text-xs text-earth-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-honey-600 flex-shrink-0 mt-0.5" />
          <p>{dict.policies.notice}</p>
        </div>

        <div className="prose prose-stone max-w-none text-earth-800 space-y-6 text-sm sm:text-base leading-relaxed">
          {locale === 'hi' ? (
            <>
              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">1. हम कौन सी जानकारी एकत्र करते हैं</h2>
                <p>
                  कामरू घाटी हनी वेबसाइट मुख्य रूप से एक उत्पाद सूची (कैटलॉग) और व्हाट्सएप-आधारित पूछताछ मंच के रूप में कार्य करती है। जब आप हमें व्हाट्सएप या थोक प्रपत्र के माध्यम से संपर्क करते हैं, तो हम केवल वही जानकारी प्राप्त करते हैं जो आप स्वेच्छा से साझा करते हैं—जैसे आपका नाम, संपर्क नंबर, डिलीवरी शहर/पिन कोड, और उत्पाद संबंधी आवश्यकताएं।
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">2. जानकारी का उपयोग</h2>
                <p>
                  आपकी संपर्क जानकारी का उपयोग केवल आपके ऑर्डर की पुष्टि करने, कूरियर डिलीवरी का समन्वय करने तथा आपके प्रश्नों के उत्तर देने के लिए किया जाता है। हम आपकी व्यक्तिगत जानकारी किसी तीसरे पक्ष के विपणक या विज्ञापन नेटवर्क को नहीं बेचते हैं।
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">3. भुगतान एवं सुरक्षा</h2>
                <p>
                  वर्तमान संस्करण में हमारी वेबसाइट पर सीधे क्रेडिट/डेबिट कार्ड या नेट बैंकिंग क्रेडेंशियल संग्रहीत नहीं किए जाते हैं। सभी भुगतान लेन-देन अधिकृत यूपीआई (UPI) या बैंक ट्रांसफर के माध्यम से सीधे ग्राहक और व्यवसाय के बीच पूरे किए जाते हैं।
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">4. संपर्क एवं शिकायत निवारण</h2>
                <p>
                  गोपनीयता या डेटा के संबंध में किसी भी स्पष्टीकरण हेतु आप सीधे हमारे आधिकारिक पते: मंडी, हिमाचल प्रदेश, भारत 175001 पर अथवा व्हाट्सएप के माध्यम से संपर्क कर सकते हैं।
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">1. Information We Collect</h2>
                <p>
                  Kamru Ghati Honey operates as a product catalogue and WhatsApp-first enquiry platform. We do not require visitors to register user accounts. When you initiate a WhatsApp enquiry or submit our wholesale enquiry form, we only receive the information you intentionally share—such as your name, phone number, delivery location/PIN code, and product quantities.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">2. Use of Information</h2>
                <p>
                  The information provided is used exclusively to answer your enquiries, provide accurate delivery quotes, coordinate shipping, and complete your requested orders. We never sell, rent, or lease your personal information to third-party data brokers or marketing agencies.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">3. Payments & Financial Data</h2>
                <p>
                  The website does not capture or store banking passwords, debit card numbers, or credit card details. All transactions are settled via customer-verified direct UPI or bank transfer accounts provided directly in our WhatsApp correspondence.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-forest-900">4. Grievance & Inquiries</h2>
                <p>
                  For any privacy questions or requests regarding your communication records, contact Kamru Ghati Honey, Mandi, Himachal Pradesh, India - 175001.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
