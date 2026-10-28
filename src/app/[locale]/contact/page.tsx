import React from 'react';
import { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { appConfig } from '@/lib/config';
import { MapPin, MessageCircle, Phone, Mail, Clock, Truck, ShieldAlert } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'hi' ? 'hi' : 'en') as Locale;
  const dict = getDictionary(locale);

  const breadcrumbs = [
    {
      label: dict.common.contactUs,
    },
  ];

  const quickWhatsAppUrl = appConfig.whatsapp.isConfigured
    ? `https://wa.me/${appConfig.whatsapp.number}?text=${encodeURIComponent(
        locale === 'hi'
          ? 'नमस्ते कामरू घाटी हनी, मैं आपके उत्पादों के बारे में सामान्य जानकारी चाहता/चाहती हूँ।'
          : 'Hello Kamru Ghati Honey, I would like to make an enquiry.'
      )}`
    : null;

  return (
    <div className="py-8 md:py-16 bg-cream-50/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-forest-900 tracking-tight">
            {dict.contact.title}
          </h1>
          <p className="text-base sm:text-lg text-earth-700/90 leading-relaxed max-w-3xl">
            {dict.contact.subtitle}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Location & Dispatch Hub */}
          <Card className="p-6 sm:p-8 bg-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="font-serif font-bold text-forest-900 text-lg mb-2">
                {dict.contact.locationTitle}
              </h2>
              <p className="text-sm text-earth-700 leading-relaxed">
                {dict.contact.locationDesc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-cream-100 flex items-center gap-2 text-xs text-earth-700/80">
              <Clock className="w-4 h-4 text-forest-600 flex-shrink-0" />
              <span>{locale === 'hi' ? 'कार्य समय: 10:00 - 18:00 (सोम-शनि)' : 'Business Hours: 10:00 - 18:00 IST (Mon-Sat)'}</span>
            </div>
          </Card>

          {/* 2. WhatsApp Orders */}
          <Card className="p-6 sm:p-8 bg-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h2 className="font-serif font-bold text-forest-900 text-lg mb-2">
                {dict.contact.whatsappTitle}
              </h2>
              <p className="text-sm text-earth-700 leading-relaxed">
                {dict.contact.whatsappDesc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-cream-100">
              {quickWhatsAppUrl ? (
                <a
                  href={quickWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full focus:outline-none"
                >
                  <Button variant="whatsapp" size="md" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span>{dict.contact.whatsappAction}</span>
                  </Button>
                </a>
              ) : (
                <div className="p-2.5 rounded-lg bg-cream-100 text-xs text-earth-700 text-center">
                  {dict.common.pendingSetup}
                </div>
              )}
            </div>
          </Card>

          {/* 3. Phone (renders only if configured) */}
          {appConfig.contact.phone && (
            <Card className="p-6 sm:p-8 bg-white flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h2 className="font-serif font-bold text-forest-900 text-lg mb-2">
                  {dict.contact.phoneTitle}
                </h2>
                <p className="text-sm text-earth-700 leading-relaxed mb-4">
                  {dict.contact.phoneDesc}
                </p>
                <a
                  href={`tel:${appConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-base font-bold text-forest-700 hover:underline"
                >
                  {appConfig.contact.phone}
                </a>
              </div>
            </Card>
          )}

          {/* 4. Email (renders only if configured) */}
          {appConfig.contact.email && (
            <Card className="p-6 sm:p-8 bg-white flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="font-serif font-bold text-forest-900 text-lg mb-2">
                  {dict.contact.emailTitle}
                </h2>
                <p className="text-sm text-earth-700 leading-relaxed mb-4">
                  {dict.contact.emailDesc}
                </p>
                <a
                  href={`mailto:${appConfig.contact.email}`}
                  className="text-base font-bold text-forest-700 hover:underline"
                >
                  {appConfig.contact.email}
                </a>
              </div>
            </Card>
          )}

          {/* 5. Serviceability & Logistics Note */}
          <Card className="p-6 sm:p-8 bg-cream-100/70 border-cream-300 md:col-span-2">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white text-forest-700 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Truck className="w-5 h-5 text-forest-600" />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-forest-900 text-base sm:text-lg">
                  {dict.contact.serviceAreaTitle}
                </h2>
                <p className="text-xs sm:text-sm text-earth-700 leading-relaxed">
                  {dict.contact.serviceAreaDesc}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
