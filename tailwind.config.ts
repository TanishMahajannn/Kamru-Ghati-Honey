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
          50: '#FDFCF8',
          100: '#F8F3E8', // Warm cream
          200: '#F0E8D5',
          300: '#E6D7BD',
          400: '#D9C49F',
        },
        honey: {
          50: '#FDF9EE',
          100: '#FBF2DA',
          200: '#F5E3B0',
          300: '#ECCF81',
          400: '#E4BC57',
          500: '#D9A441', // Honey gold
          600: '#BA842E',
          700: '#946324',
          800: '#764D20',
          900: '#5F3D1C',
        },
        forest: {
          50: '#F2F7F4',
          100: '#DEEBE4',
          200: '#BFDACB',
          300: '#96C2AC',
          400: '#65A385',
          500: '#254D38', // Forest green
          600: '#1E402E',
          700: '#173224',
          800: '#11251B',
          900: '#0C1A13',
        },
        earth: {
          100: '#EFEAE6',
          200: '#DFD5CD',
          300: '#BFABA0',
          400: '#8E6E5D',
          500: '#573A2B', // Earth brown
          600: '#462E22',
          700: '#36231A',
          800: '#271913',
          900: '#1B110D',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-noto-sans-devanagari)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          'var(--font-playfair)',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'serif',
        ],
      },
      boxShadow: {
        card: '0 2px 12px -2px rgba(87, 58, 43, 0.08), 0 1px 4px -1px rgba(87, 58, 43, 0.04)',
        'card-hover': '0 8px 24px -4px rgba(87, 58, 43, 0.12), 0 2px 8px -2px rgba(87, 58, 43, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
