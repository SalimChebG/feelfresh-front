
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

// Détecter la langue par défaut (manuelle si RNLocalize ne fonctionne pas)
const defaultLanguage = 'en'; // Changez selon vos besoins

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage, // Définissez la langue par défaut ici
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;


/*
import DeviceInfo from 'react-native-device-info';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

const getDeviceLanguage = async () => {
  const deviceLanguage = await DeviceInfo.getDeviceLocale(); // Récupère la langue du système
  return deviceLanguage.split('-')[0]; // Extrait le code de langue, comme 'en', 'fr', etc.
};

const initializeI18n = async () => {
  const language = await getDeviceLanguage(); // Récupère la langue du système
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language, // Définit la langue à partir du système
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

initializeI18n();

*/



