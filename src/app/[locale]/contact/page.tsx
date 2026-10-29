import React from 'react';
import { Metadata } from 'next';
import { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n/getDictionary';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { appConfig } from '@/lib/config';
import { MapPin, MessageCircle, Phone, Mail, Clock, Truck } from 'lucide-react';

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
    <div className="py-8 md:py-16 bg-cream-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-ultra text-earth-500">
            CONNECT WITH US
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-earth-900 tracking-tight leading-tight">
            {dict.contact.title}
          </h1>
          <p className="text-sm sm:text-base text-earth-600 leading-relaxed font-sans max-w-2xl">
            {dict.contact.subtitle}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Location */}
          <div className="p-6 sm:p-8 bg-cream-50 rounded-2xl border border-cream-200/90 shadow-warm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-cream-200 text-earth-900 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-honey-700" />
              </div>
              <h2 className="font-serif font-bold text-earth-900 text-lg mb-2">
                {dict.contact.locationTitle}
              </h2>
              <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-sans">
                {dict.contact.locationDesc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-cream-200 flex items-center gap-2 text-xs text-earth-500 font-sans">
              <Clock className="w-4 h-4 text-honey-600 flex-shrink-0" />
              <span>{locale === 'hi' ? 'कार्य समय: 10:00 - 18:00 (सोम-शनि)' : 'Business Hours: 10:00 - 18:00 IST (Mon-Sat)'}</span>
            </div>
          </div>

          {/* 2. WhatsApp Orders */}
          <div className="p-6 sm:p-8 bg-cream-50 rounded-2xl border border-cream-200/90 shadow-warm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-cream-200 text-earth-900 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5 text-honey-700" />
              </div>
              <h2 className="font-serif font-bold text-earth-900 text-lg mb-2">
                {dict.contact.whatsappTitle}
              </h2>
              <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-sans mb-3">
                {dict.contact.whatsappDesc}
              </p>
              {appConfig.whatsapp.formatted && (
                <a
                  href={quickWhatsAppUrl || `https://wa.me/${appConfig.whatsapp.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-base font-bold text-earth-900 hover:text-honey-600 transition-colors"
                >
                  {appConfig.whatsapp.formatted}
                </a>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-cream-200">
              {quickWhatsAppUrl ? (
                <a
                  href={quickWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full focus:outline-none"
                >
                  <Button variant="pill" size="md" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span>{dict.contact.whatsappAction}</span>
                  </Button>
                </a>
              ) : (
                <div className="p-2.5 rounded-lg bg-cream-200 text-xs text-earth-700 text-center">
                  {dict.common.pendingSetup}
                </div>
              )}
            </div>
          </div>

          {/* 3. Phone (if configured) */}
          {appConfig.contact.phone && (
            <div className="p-6 sm:p-8 bg-cream-50 rounded-2xl border border-cream-200/90 shadow-warm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-cream-200 text-earth-900 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-honey-700" />
                </div>
                <h2 className="font-serif font-bold text-earth-900 text-lg mb-2">
                  {dict.contact.phoneTitle}
                </h2>
                <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-sans mb-4">
                  {dict.contact.phoneDesc}
                </p>
                <a
                  href={`tel:${appConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-base font-bold text-earth-900 hover:text-honey-600"
                >
                  {appConfig.contact.phone}
                </a>
              </div>
            </div>
          )}

          {/* 4. Email (if configured) */}
          {appConfig.contact.email && (
            <div className="p-6 sm:p-8 bg-cream-50 rounded-2xl border border-cream-200/90 shadow-warm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-cream-200 text-earth-900 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-honey-700" />
                </div>
                <h2 className="font-serif font-bold text-earth-900 text-lg mb-2">
                  {dict.contact.emailTitle}
                </h2>
                <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-sans mb-4">
                  {dict.contact.emailDesc}
                </p>
                <a
                  href={`mailto:${appConfig.contact.email}`}
                  className="text-base font-bold text-earth-900 hover:text-honey-600"
                >
                  {appConfig.contact.email}
                </a>
              </div>
            </div>
          )}

          {/* 5. Serviceability */}
          <div className="p-6 sm:p-8 bg-cream-50/70 rounded-2xl border border-cream-200/90 shadow-warm md:col-span-2">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cream-200 text-earth-900 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-honey-700" />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-earth-900 text-base sm:text-lg">
                  {dict.contact.serviceAreaTitle}
                </h2>
                <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-sans">
                  {dict.contact.serviceAreaDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
