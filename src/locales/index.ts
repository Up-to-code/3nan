import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './ar.json';
import en from './en.json';

export type SupportedLanguage = 'ar' | 'en';

export const resources = {
  ar: { translation: ar },
  en: { translation: en },
} as const;

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v4',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
