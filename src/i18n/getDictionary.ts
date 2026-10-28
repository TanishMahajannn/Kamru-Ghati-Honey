import { Locale } from '@/types/i18n';
import enMessages from './messages/en.json';
import hiMessages from './messages/hi.json';

const dictionaries = {
  en: enMessages,
  hi: hiMessages,
};

export type Dictionary = typeof enMessages;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}
