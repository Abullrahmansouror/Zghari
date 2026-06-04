import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import ar from './locales/ar.json'

const STORAGE_KEY = 'zghari-lang'

export const LANGS = {
  en: { code: 'en', label: 'EN', dir: 'ltr' },
  ar: { code: 'ar', label: 'عربي', dir: 'rtl' },
}

const stored =
  typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
const initialLang = stored && LANGS[stored] ? stored : 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true,
})

/** Apply <html lang>, <html dir> + persist. Call on load + every change. */
export const applyLanguage = (lng) => {
  const meta = LANGS[lng] || LANGS.en
  if (typeof document !== 'undefined') {
    document.documentElement.lang = meta.code
    document.documentElement.dir = meta.dir
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, meta.code)
  }
}

// Sync document on first load + whenever the language changes.
applyLanguage(initialLang)
i18n.on('languageChanged', applyLanguage)

export default i18n
