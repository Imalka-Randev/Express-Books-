import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import siTranslation from './locales/si.json';
import taTranslation from './locales/ta.json';

// 1. Define our translation dictionaries
const resources = {
  en: { translation: enTranslation },
  si: { translation: siTranslation },
  ta: { translation: taTranslation }
};

// 2. Initialize the i18n engine
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already protects us from XSS hacking
    }
  });

export default i18n;