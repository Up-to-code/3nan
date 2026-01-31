import { useLanguageStore } from '../store/useLanguageStore';

interface UseIsRTLReturn {
  isRTL: boolean;
  language: 'ar' | 'en';
}

export function useIsRTL(): UseIsRTLReturn {
  // Use store's isRTL which is derived from language (reactive)
  // This ensures UI updates immediately when language changes
  const { isRTL, language } = useLanguageStore();
  return { isRTL, language };
}
