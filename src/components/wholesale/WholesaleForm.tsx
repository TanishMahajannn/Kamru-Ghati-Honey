'use client';

import React, { useState } from 'react';
import { Locale } from '@/types/i18n';
import { Dictionary } from '@/i18n/getDictionary';
import { PRODUCTS } from '@/data/products';
import { wholesaleFormSchema, WholesaleFormValues } from '@/lib/validation';
import { buildWholesaleEnquiryText, createWhatsAppUrl } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MessageCircle, CheckSquare, Square, AlertCircle, Building2, User, Phone, Mail, MapPin, Package } from 'lucide-react';
import { appConfig } from '@/lib/config';

interface WholesaleFormProps {
  locale: Locale;
  dict: Dictionary;
}

export function WholesaleForm({ locale, dict }: WholesaleFormProps) {
  const [formData, setFormData] = useState<Partial<WholesaleFormValues>>({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    selectedProducts: [PRODUCTS[0].slug], // default to first
    preferredSizes: ['500 g', '1 kg'],
    estimatedQuantity: '',
    deliveryLocation: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSizes = ['250 g', '500 g', '1 kg'];

  const toggleProduct = (slug: string) => {
    const current = formData.selectedProducts || [];
    if (current.includes(slug)) {
      setFormData({
        ...formData,
        selectedProducts: current.filter((s) => s !== slug),
      });
    } else {
      setFormData({
        ...formData,
        selectedProducts: [...current, slug],
      });
    }
  };

  const toggleSize = (size: string) => {
    const current = formData.preferredSizes || [];
    if (current.includes(size)) {
      setFormData({
        ...formData,
        preferredSizes: current.filter((s) => s !== size),
      });
    } else {
      setFormData({
        ...formData,
        preferredSizes: [...current, size],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = wholesaleFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);

      // Scroll to first error
      const firstErrorField = Object.keys(fieldErrors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) {
        el.focus();
      }
      return;
    }

    // Map selected product slugs to human-readable names
    const resolvedProductNames = result.data.selectedProducts.map((slug) => {
      const prod = PRODUCTS.find((p) => p.slug === slug);
      return prod ? (locale === 'hi' ? prod.name.hi : prod.name.en) : slug;
    });

    const messageText = buildWholesaleEnquiryText(
      {
        ...result.data,
        selectedProducts: resolvedProductNames,
      },
      locale
    );

    const whatsAppUrl = createWhatsAppUrl(messageText);

    if (whatsAppUrl) {
      window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="p-6 sm:p-10 bg-white border border-cream-300 shadow-card">
      <div className="mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
          {dict.wholesale.cardTitle}
        </h2>
        <p className="mt-2 text-sm text-earth-700/80">
          {dict.wholesale.cardSubtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="flex items-center gap-1.5 text-xs font-bold text-forest-900">
              <User className="w-3.5 h-3.5 text-forest-600" />
              <span>{dict.wholesale.form.nameLabel}</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={dict.wholesale.form.namePlaceholder}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-white text-earth-900 focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                  : 'border-cream-300 focus:ring-forest-500'
              }`}
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-red-600 font-medium">
                {errors.name}
              </p>
            )}
          </div>

          {/* Business Name */}
          <div className="space-y-1.5">
            <label htmlFor="businessName" className="flex items-center gap-1.5 text-xs font-bold text-forest-900">
              <Building2 className="w-3.5 h-3.5 text-forest-600" />
              <span>{dict.wholesale.form.businessLabel}</span>
            </label>
            <input
              id="businessName"
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder={dict.wholesale.form.businessPlaceholder}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-earth-900 focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="flex items-center gap-1.5 text-xs font-bold text-forest-900">
              <Phone className="w-3.5 h-3.5 text-forest-600" />
              <span>{dict.wholesale.form.phoneLabel}</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder={dict.wholesale.form.phonePlaceholder}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-white text-earth-900 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                  : 'border-cream-300 focus:ring-forest-500'
              }`}
            />
            {errors.phone && (
              <p id="phone-error" className="text-xs text-red-600 font-medium">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="flex items-center gap-1.5 text-xs font-bold text-forest-900">
              <Mail className="w-3.5 h-3.5 text-forest-600" />
              <span>{dict.wholesale.form.emailLabel}</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={dict.wholesale.form.emailPlaceholder}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-white text-earth-900 focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                  : 'border-cream-300 focus:ring-forest-500'
              }`}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-600 font-medium">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Product Varieties Checkboxes */}
        <fieldset className="space-y-2 pt-2">
          <legend className="text-xs font-bold text-forest-900 block mb-1">
            {dict.wholesale.form.productsLabel}
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRODUCTS.map((prod) => {
              const isChecked = formData.selectedProducts?.includes(prod.slug);
              const label = locale === 'hi' ? prod.name.hi : prod.name.en;
              return (
                <button
                  type="button"
                  key={prod.slug}
                  onClick={() => toggleProduct(prod.slug)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-forest-500 ${
                    isChecked
                      ? 'border-forest-600 bg-forest-50/80 text-forest-950 font-medium'
                      : 'border-cream-300 bg-cream-50/40 text-earth-800 hover:bg-cream-100'
                  }`}
                  aria-pressed={isChecked}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-forest-600 flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-cream-400 flex-shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm">{label}</span>
                </button>
              );
            })}
          </div>
          {errors.selectedProducts && (
            <p className="text-xs text-red-600 font-medium">
              {errors.selectedProducts}
            </p>
          )}
        </fieldset>

        {/* Jar Packaging Sizes Checkboxes */}
        <fieldset className="space-y-2 pt-2">
          <legend className="text-xs font-bold text-forest-900 block mb-1">
            {dict.wholesale.form.sizesLabel}
          </legend>
          <div className="grid grid-cols-3 gap-3">
            {availableSizes.map((size) => {
              const isChecked = formData.preferredSizes?.includes(size);
              return (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-forest-500 ${
                    isChecked
                      ? 'border-forest-600 bg-forest-50/80 text-forest-950 font-bold'
                      : 'border-cream-300 bg-cream-50/40 text-earth-800 hover:bg-cream-100'
                  }`}
                  aria-pressed={isChecked}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-forest-600 flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-cream-400 flex-shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm">{size}</span>
                </button>
              );
            })}
          </div>
          {errors.preferredSizes && (
            <p className="text-xs text-red-600 font-medium">
              {errors.preferredSizes}
            </p>
          )}
        </fieldset>

        {/* Quantity & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          {/* Estimated Quantity */}
          <div className="space-y-1.5">
            <label htmlFor="estimatedQuantity" className="flex items-center gap-1.5 text-xs font-bold text-forest-900">
              <Package className="w-3.5 h-3.5 text-forest-600" />
              <span>{dict.wholesale.form.quantityLabel}</span>
            </label>
            <input
              id="estimatedQuantity"
              type="text"
              required
              value={formData.estimatedQuantity}
              onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
              placeholder={dict.wholesale.form.quantityPlaceholder}
              aria-invalid={!!errors.estimatedQuantity}
              aria-describedby={errors.estimatedQuantity ? 'quantity-error' : undefined}
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-white text-earth-900 focus:outline-none focus:ring-2 ${
                errors.estimatedQuantity
                  ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                  : 'border-cream-300 focus:ring-forest-500'
              }`}
            />
            {errors.estimatedQuantity && (
              <p id="quantity-error" className="text-xs text-red-600 font-medium">
                {errors.estimatedQuantity}
              </p>
            )}
          </div>

          {/* Delivery Location / PIN */}
          <div className="space-y-1.5">
            <label htmlFor="deliveryLocation" className="flex items-center gap-1.5 text-xs font-bold text-forest-900">
              <MapPin className="w-3.5 h-3.5 text-forest-600" />
              <span>{dict.wholesale.form.locationLabel}</span>
            </label>
            <input
              id="deliveryLocation"
              type="text"
              required
              value={formData.deliveryLocation}
              onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
              placeholder={dict.wholesale.form.locationPlaceholder}
              aria-invalid={!!errors.deliveryLocation}
              aria-describedby={errors.deliveryLocation ? 'location-error' : undefined}
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-white text-earth-900 focus:outline-none focus:ring-2 ${
                errors.deliveryLocation
                  ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                  : 'border-cream-300 focus:ring-forest-500'
              }`}
            />
            {errors.deliveryLocation && (
              <p id="location-error" className="text-xs text-red-600 font-medium">
                {errors.deliveryLocation}
              </p>
            )}
          </div>
        </div>

        {/* Message / Details */}
        <div className="space-y-1.5 pt-2">
          <label htmlFor="message" className="block text-xs font-bold text-forest-900">
            {dict.wholesale.form.messageLabel}
          </label>
          <textarea
            id="message"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder={dict.wholesale.form.messagePlaceholder}
            className="w-full text-sm p-3.5 rounded-xl border border-cream-300 bg-white text-earth-900 focus:outline-none focus:ring-2 focus:ring-forest-500 leading-relaxed"
          />
        </div>

        {/* Submit Action */}
        <div className="pt-4 space-y-4">
          {appConfig.whatsapp.isConfigured ? (
            <Button
              type="submit"
              variant="whatsapp"
              size="lg"
              isLoading={isSubmitting}
              className="w-full text-base sm:text-lg py-4 shadow-md"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>{dict.wholesale.form.submitButton}</span>
            </Button>
          ) : (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{dict.common.pendingSetup}</p>
                <p className="text-xs mt-1">
                  {locale === 'hi'
                    ? 'कृपया सीधे मंडी कार्यालय से संपर्क करें अथवा व्हाट्सएप नंबर कॉन्फ़िगरेशन की प्रतीक्षा करें।'
                    : 'Please contact the Mandi dispatch office directly or wait until the WhatsApp ordering number is configured.'}
                </p>
              </div>
            </div>
          )}

          <p className="text-xs text-earth-700/80 leading-relaxed text-center sm:text-left">
            {dict.wholesale.form.disclaimer}
          </p>
        </div>
      </form>
    </Card>
  );
}
