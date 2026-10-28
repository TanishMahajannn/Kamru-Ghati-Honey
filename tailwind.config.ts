import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FCF9F4',
          100: '#F8F3EA', // Main warm stone background from reference
          200: '#F2EBDF',
          300: '#E6DCCF', // Hairline borders
          400: '#D6C8B7',
        },
        honey: {
          50: '#FDF8EC',
          100: '#FAF0D7',
          200: '#F4DEAC',
          300: '#ECC87C',
          400: '#DFAC4B',
          500: '#D49B3E', // Signature warm ochre button color
          600: '#BA822C',
          700: '#956420',
          800: '#754B1A',
          900: '#5A3814',
        },
        forest: {
          50: '#F1F6F3',
          100: '#DEEBE2',
          200: '#BFDAC9',
          500: '#254D38',
          600: '#1D3E2D',
          700: '#173224',
          800: '#11251B',
          900: '#0C1A13',
        },
        earth: {
          50: '#F7F5F2',
          100: '#ECE7E1',
          200: '#DCD4CA',
          300: '#C2B5A5',
          400: '#9B8C7D', // Subtle labels
          500: '#706254',
          600: '#574B40',
          700: '#42372F', // Body copy
          800: '#2C241E',
          900: '#1C1713', // Deep headline espresso
        },
      },
      fontFamily: {
        serif: [
          'var(--font-serif)',
          '"Cormorant Garamond"',
          '"Playfair Display"',
          'Georgia',
          'serif',
        ],
        sans: [
          'var(--font-sans)',
          '"Plus Jakarta Sans"',
          '"Inter"',
          '"Noto Sans Devanagari"',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.28em',
      },
      boxShadow: {
        warm: '0 4px 20px -2px rgba(44, 36, 30, 0.05), 0 2px 6px -1px rgba(44, 36, 30, 0.03)',
        'warm-hover': '0 12px 30px -4px rgba(44, 36, 30, 0.08), 0 4px 12px -2px rgba(44, 36, 30, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
