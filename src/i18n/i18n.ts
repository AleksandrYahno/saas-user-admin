import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '@locales/en/common.json';
import enHome from '@locales/en/home.json';

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon as Record<string, unknown>,
      home: enHome as Record<string, unknown>,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'home'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
