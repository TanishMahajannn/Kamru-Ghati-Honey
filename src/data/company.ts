import { CompanyInfo } from '@/types/company';
import { appConfig } from '@/lib/config';

export const COMPANY_INFO: CompanyInfo = {
  name: 'Kamru Ghati Honey',
  establishedYear: 2020,
  location: {
    district: 'Mandi',
    state: 'Himachal Pradesh',
    country: 'India',
    fullAddress: appConfig.location.address,
  },
  contact: {
    whatsappNumber: appConfig.whatsapp.number,
    phone: appConfig.contact.phone,
    email: appConfig.contact.email,
  },
  compliance: {
    fssaiRegistrationNumber: appConfig.compliance.fssai,
    gstNumber: appConfig.compliance.gst,
  },
  shipping: {
    servesPanIndia: true,
    dispatchOrigin: 'Mandi, Himachal Pradesh',
    note: {
      en: 'Orders are securely packaged and dispatched from Mandi across India via standard courier services, subject to courier PIN-code serviceability.',
      hi: 'ऑर्डर मंडी (हिमाचल प्रदेश) से सुरक्षित पैक करके कूरियर पिन-कोड सेवाक्षमता के अनुसार पूरे भारत में भेजे जाते हैं।',
    },
  },
};
