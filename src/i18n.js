import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageResources from './assets/language.json';

const savedLanguage = localStorage.getItem('language') || 'uz';

i18n
  .use(initReactI18next)
  .init({
    resources: languageResources,
    lng: savedLanguage,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;