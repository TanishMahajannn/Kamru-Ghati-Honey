import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  test: {
    root: path.resolve(__dirname),
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}', 'tests/integration/**/*.{test,spec}.{ts,tsx}'],
    env: {
      NEXT_PUBLIC_WHATSAPP_NUMBER: '919876543210',
      NEXT_PUBLIC_SITE_URL: 'https://kamrughatihoney.com',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'jsdom': path.resolve(__dirname, './node_modules/jsdom'),
    },
  },
});
