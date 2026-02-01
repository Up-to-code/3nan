import { create } from 'zustand';
import { Alert, I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from '../locales';
import type { SupportedLanguage } from '../locales';

const STORAGE_KEY = '@app.language';

let hasLoggedRTLMismatch = false;

async function getStoredLanguage(): Promise<SupportedLanguage | null> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') return stored;
    return null;
  } catch (error) {
    console.error('[Language] Error reading stored language:', error);
    return null;
  }
}

function getSystemLanguage(): SupportedLanguage {
  try {
    const locales = Localization.getLocales();
    const langCode = locales[0]?.languageCode ?? 'en';
    console.log('[Language] System language detected:', langCode);
    return langCode.startsWith('ar') ? 'ar' : 'en';
  } catch (error) {
    console.error('[Language] Error getting system language:', error);
    return 'en';
  }
}

function showRestartAlert(isRTL: boolean): void {
  console.log('[Language] Showing restart alert, isRTL:', isRTL);
  const title = isRTL ? 'تم تغيير اللغة' : 'Language Changed';
  const message = isRTL
    ? 'يرجى إغلاق التطبيق وإعادة فتحه'
    : 'Please close and reopen the app';
  Alert.alert(title, message);
}

interface LanguageState {
  language: SupportedLanguage;
  /** Layout direction from app language only (ar = RTL), not device locale. */
  isRTL: boolean;
  isChangingLanguage: boolean;
  setLanguage: (lang: SupportedLanguage) => void;
  initializeLanguage: () => Promise<void>;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  isRTL: false,
  isChangingLanguage: false,

  setLanguage: (lang: SupportedLanguage) => {
    try {
      console.log('[Language] Setting language:', lang);
      set({ isChangingLanguage: true });

      const isRTL = lang === 'ar';

      // Save to storage
      AsyncStorage.setItem(STORAGE_KEY, lang).catch((e) =>
        console.error('[Language] Failed to save language:', e)
      );

      // Update i18n
      i18n.changeLanguage(lang);

      // Set RTL for next app start
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(isRTL);

      // Update state
      set({ language: lang, isRTL, isChangingLanguage: false });

      // Check if direction actually changed - if so, need restart
      if (I18nManager.isRTL !== isRTL) {
        console.log('[Language] RTL mismatch, need restart:', {
          expected: isRTL,
          actual: I18nManager.isRTL,
        });
        showRestartAlert(isRTL);
      } else {
        console.log('[Language] Language changed, no restart needed');
      }
    } catch (error) {
      console.error('[Language] Error setting language:', error);
      set({ isChangingLanguage: false });
    }
  },

  initializeLanguage: async () => {
    try {
      console.log('[Language] Initializing...');
      const stored = await getStoredLanguage();
      const lang: SupportedLanguage = stored ?? getSystemLanguage();
      console.log('[Language] Using language:', lang, '| stored:', stored);

      if (!stored) {
        await AsyncStorage.setItem(STORAGE_KEY, lang);
        console.log('[Language] Saved initial language:', lang);
      }

      // Update i18n
      i18n.changeLanguage(lang);

      // Configure RTL
      const isRTL = lang === 'ar';
      I18nManager.allowRTL(true);

      // Check if native RTL matches expected
      if (I18nManager.isRTL !== isRTL) {
        if (!hasLoggedRTLMismatch) {
          console.log('[Language] RTL mismatch on init:', {
            expected: isRTL,
            actual: I18nManager.isRTL,
          });
          hasLoggedRTLMismatch = true;
        }
        I18nManager.forceRTL(isRTL);
      }

      // Set isRTL based on language choice (not native state)
      // This ensures UI reflects user's selection immediately
      const finalIsRTL = lang === 'ar';
      set({ language: lang, isRTL: finalIsRTL });
      console.log('[Language] Initialized:', {
        lang,
        isRTL: finalIsRTL,
        nativeIsRTL: I18nManager.isRTL,
      });
    } catch (error) {
      console.error('[Language] Initialization error:', error);
      set({ language: 'en', isRTL: false });
    }
  },
}));
