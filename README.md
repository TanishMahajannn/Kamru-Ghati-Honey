# Kamru Ghati Honey — Production Digital Storefront

> **Pure Himalayan Apiculture Since 2020 • Mandi, Himachal Pradesh, India**

A production-ready, accessible, bilingual (English & Hindi) business website and WhatsApp-first product catalogue built for **Kamru Ghati Honey**.

---

## 1. Project Overview & Business Context

Kamru Ghati Honey is an established honey enterprise operating since **2020** in **Mandi, Himachal Pradesh, India**. This storefront expands the brand's digital visibility, enables retail and wholesale discovery across India, and routes high-intent customer inquiries directly through verified WhatsApp conversations.

### Confirmed Business Facts
- **Business Name:** Kamru Ghati Honey
- **Established Year:** 2020
- **Base of Operations & Dispatch:** Mandi, Himachal Pradesh, India
- **Market Coverage:** Pan-India delivery via domestic courier services
- **Launch Floral Varieties:**
  1. *Multi Flora Honey* (Himalayan Wild Flora)
  2. *Lahul Spiti Honey* (High-Altitude Cold Desert Valley Flora)
  3. *Ajwain Honey* (Carom Blossom Flora)
  4. *Jamun Honey* (Blackberry Blossom Flora)
- **Standard Packaging Sizes:** 250 g, 500 g, 1 kg
- **Conversion Channels:**
  - Retail customer prefilled WhatsApp orders
  - Dedicated wholesale & bulk buyer procurement form
- **Languages Supported:** English (`/en`) & Hindi (`/hi`) with full locale-prefixed routing

### Strict Data Integrity & Compliance Rule
Missing or unverified business information (such as unconfirmed size prices, unverified laboratory badges, or private credentials) is **never invented**. Unconfirmed prices are safely displayed as *"Price on Enquiry"* / *"मूल्य पुष्टि हेतु पूछताछ करें"*, and WhatsApp links degrade safely if configuration is missing.

---

## 2. Technology Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) with React 19
- **Type Safety:** TypeScript 5 (Strict Mode enabled throughout)
- **Styling:** Tailwind CSS with custom brand design tokens:
  - *Warm Cream:* `#F8F3E8`
  - *Honey Gold:* `#D9A441`
  - *Forest Green:* `#254D38`
  - *Earth Brown:* `#573A2B`
- **Icons:** [Lucide React](https://lucide.dev/)
- **Validation:** [Zod](https://zod.dev/) for enquiry schema validation
- **Testing:**
  - [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/) (Unit and integration tests)
  - [Playwright](https://playwright.dev/) (End-to-end tests)
- **Internationalization (i18n):** Locale-prefixed routing (`/[locale]/...`) with structured JSON dictionary architecture.

---

## 3. Architecture & Directory Structure

```text
kamru-ghati-honey/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI pipeline
├── public/
│   └── images/
│       ├── brand/
│       │   └── logo.png         # Official brand seal & mark (Logo.png)
│       └── products/            # Individual variety illustrations
│           ├── multi-flora.svg
│           ├── lahul-spiti.svg
│           ├── ajwain.svg
│           └── jamun.svg
├── src/
│   ├── app/
│   │   ├── [locale]/            # Dynamic locale routing (en & hi)
│   │   │   ├── layout.tsx       # Locale layout with Header & Footer
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── products/        # Catalogue & Product Details
│   │   │   ├── about/           # Brand story & Mandi history
│   │   │   ├── wholesale/       # Retailer & bulk enquiry portal
│   │   │   ├── contact/         # Location & contact details
│   │   │   └── policies/        # Privacy, Terms, Shipping & Cancellation
│   │   ├── globals.css          # CSS styles & accessibility rules
│   │   ├── layout.tsx           # Global Root layout & metadata
│   │   ├── page.tsx             # Root redirect to /en
│   │   ├── robots.ts            # Dynamic robots.txt
│   │   └── sitemap.ts           # Dynamic XML sitemap
│   ├── components/
│   │   ├── home/                # Hero, Trust, HowToOrder, FAQ
│   │   ├── layout/              # Header, Footer, LanguageSwitcher, Announcement
│   │   ├── products/            # ProductCard, ProductGrid, ProductDetailView
│   │   ├── ui/                  # Button, Badge, Card, Breadcrumbs
│   │   └── wholesale/           # WholesaleForm with validation
│   ├── data/
│   │   ├── company.ts           # Confirmed business details
│   │   └── products.ts          # Typed catalogue source of truth
│   ├── i18n/
│   │   ├── config.ts            # Supported locales configuration
│   │   ├── getDictionary.ts     # Dictionary resolver
│   │   └── messages/
│   │       ├── en.json          # English translation dictionary
│   │       └── hi.json          # Hindi translation dictionary
│   ├── lib/
│   │   ├── config.ts            # Environment variables & WhatsApp validator
│   │   ├── pricing.ts           # Paise-to-INR formatter & safe fallbacks
│   │   ├── utils.ts             # Tailwind class merging
│   │   ├── validation.ts        # Zod validation schemas
│   │   └── whatsapp.ts          # Official wa.me enquiry builders
│   └── types/                   # TypeScript interfaces
├── tests/
│   ├── setup.ts                 # Test environment setup
│   ├── unit/                    # Unit test suites
│   ├── integration/             # Integration test suites
│   └── e2e/                     # Playwright end-to-end tests
├── .env.example                 # Configurable environment template
├── .gitignore
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

---

## 4. Local Development Setup

### Prerequisites
- Node.js `v20+` or `v22+`
- `pnpm` (version 10 recommended)

### 1. Clone & Install
```bash
git clone <repository-url>
cd kamru-ghati-honey
pnpm install
```

### 2. Configure Environment Variables
Copy the template and provide local or verified test numbers:
```bash
cp .env.example .env.local
```

Example configuration (`.env.local`):
```ini
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BUSINESS_ADDRESS="Mandi, Himachal Pradesh, India"
```

### 3. Start Development Server
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The root URL automatically redirects to `/en`.

---

## 5. Verification & Quality Checks

Run the complete verification pipeline locally:

```bash
# 1. TypeScript Strict Typecheck
pnpm run typecheck

# 2. ESLint Code Quality
pnpm run lint

# 3. Unit & Integration Tests (Vitest)
pnpm run test

# 4. Playwright End-to-End Tests
pnpm run test:e2e

# 5. Production Build (Next.js SSG)
pnpm run build
```

---

## 6. How WhatsApp Ordering Operates

1. **Retail Flow (`/products/[slug]`):**
   - Customer selects variety and jar size (`250g`, `500g`, `1kg`).
   - Customer adjusts quantity (validated between 1 and 50 jars).
   - Clicking *"Enquire on WhatsApp"* opens `https://wa.me/{number}` with an encoded prefilled message containing variety, size, quantity, listed price, product URL, and optional customer note.
   - The business verifies stock date, calculates courier fee to the customer's PIN code, and shares direct UPI payment details.

2. **Wholesale Flow (`/wholesale`):**
   - Business client enters contact person, store name, mobile number, email, and destination PIN code.
   - Selects multiple varieties of interest and preferred packaging formats.
   - Submitting the form validates all fields using Zod and opens a prefilled wholesale requisition in WhatsApp.

3. **Safe Missing-Number Handling:**
   - If `NEXT_PUBLIC_WHATSAPP_NUMBER` is missing or invalid, WhatsApp actions are safely disabled with a clear message: *"WhatsApp enquiry configuration is currently pending setup"*. No broken or fake links are generated.

---

## 7. Pre-Launch Owner Checklist

Before publicly binding a custom domain and announcing the launch, verify the following with the business owner:

- [ ] **Official WhatsApp Business Number:** Confirm dedicated business SIM number with India country code `91`.
- [ ] **Confirmed Prices:** Review prices in `src/data/products.ts` for each variety and size option.
- [ ] **Actual Product Photographs:** Replace SVG illustrations in `public/images/products/` with high-resolution photography.
- [ ] **FSSAI Licence / Registration:** Add verified registration number to `.env.local` and review packaging declarations.
- [ ] **GST Number:** Provide GSTIN in `.env.local` if registered for inter-state commercial supplies.
- [ ] **Courier Partners:** Finalize dispatch agreements with domestic couriers (e.g. India Post, DTDC) from Mandi.
- [ ] **Payment Methods:** Confirm official business UPI ID / QR code for sharing in WhatsApp replies.
- [ ] **Domain & DNS:** Purchase selected domain (e.g., `kamrughatihoney.com`) under business ownership and connect to Vercel/hosting.

---

## 8. Multi-Phase Roadmap

- **Version 1 (Current):** WhatsApp-first bilingual storefront, verified catalogue, retail & wholesale lead generation, technical SEO, and accessibility.
- **Version 2:** Secure owner authentication and lightweight CMS/database for non-technical price and stock updates.
- **Version 3:** Full e-commerce with cart, automated courier API integration, online payment gateway (UPI/Cards/Netbanking), and GST-compliant invoice generation.
- **Version 4:** Business intelligence, batch provenance verification, and customer retention insights.

---

## 9. Licence & Rights

© 2020 - 2026 Kamru Ghati Honey. All rights reserved. Mandi, Himachal Pradesh, India.
