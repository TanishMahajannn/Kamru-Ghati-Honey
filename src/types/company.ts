export interface CompanyInfo {
  name: string;
  establishedYear: number;
  location: {
    district: string;
    state: string;
    country: string;
    fullAddress: string;
  };
  contact: {
    whatsappNumber: string | null;
    phone: string | null;
    email: string | null;
  };
  compliance: {
    fssaiRegistrationNumber: string | null; // Configurable placeholder
    gstNumber: string | null; // Configurable placeholder
  };
  shipping: {
    servesPanIndia: boolean;
    dispatchOrigin: string;
    note: {
      en: string;
      hi: string;
    };
  };
}
