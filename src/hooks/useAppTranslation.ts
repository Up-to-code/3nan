import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useLanguageStore } from '../store/useLanguageStore';
import type { SupportedLanguage } from '../locales';

export function useAppTranslation() {
  const { t, i18n } = useI18nTranslation();
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  const changeLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
  };

  return {
    t,
    changeLanguage,
    currentLanguage: (i18n.language ?? 'en') as SupportedLanguage,
  };
}
