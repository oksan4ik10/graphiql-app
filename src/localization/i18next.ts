import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './en.json';
import russian from './ru.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: english,
    },
    ru: {
      translation: russian,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
