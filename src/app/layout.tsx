import type { Metadata } from 'next';
import './globals.css';
import { appConfig } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.siteUrl),
  title: {
    default: 'Kamru Ghati Honey | Natural Himalayan Honey from Mandi, Himachal Pradesh',
    template: '%s | Kamru Ghati Honey',
  },
  description:
    'Established in 2020 in Mandi, Himachal Pradesh. Authentic Himalayan floral honey varieties including Multi Flora, Lahul Spiti, Ajwain, and Jamun. Enquire on WhatsApp for retail and wholesale.',
  keywords: [
    'Kamru Ghati Honey',
    'Himachal Pradesh honey',
    'Mandi honey',
    'Lahul Spiti honey',
    'Multi Flora honey',
    'Ajwain honey',
    'Jamun honey',
    'Wholesale honey India',
    'Natural raw honey',
  ],
  authors: [{ name: 'Kamru Ghati Honey' }],
  creator: 'Kamru Ghati Honey',
  publisher: 'Kamru Ghati Honey',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/brand/logo.png',
    shortcut: '/images/brand/logo.png',
    apple: '/images/brand/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    alternateLocale: ['hi_IN'],
    url: appConfig.siteUrl,
    siteName: 'Kamru Ghati Honey',
    title: 'Kamru Ghati Honey | Pure Himalayan Honey from Mandi, HP',
    description:
      'Natural single-origin floral honey harvested from Himachal Pradesh. Direct WhatsApp ordering for retail and wholesale.',
    images: [
      {
        url: '/images/brand/logo.png',
        width: 1200,
        height: 1200,
        alt: 'Kamru Ghati Honey Brand Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Kamru Ghati Honey | Pure Himalayan Honey',
    description:
      'Natural honey varieties from Mandi, Himachal Pradesh. Established 2020. WhatsApp ordering across India.',
    images: ['/images/brand/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans antialiased text-earth-900 bg-[#FDFCF8]">
        {children}
      </body>
    </html>
  );
}
