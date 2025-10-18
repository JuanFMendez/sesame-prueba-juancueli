import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

export const messages = { es, en }

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('app-locale') || 'es',
  fallbackLocale: 'en',
  messages
})

// Lista de idiomas disponibles con emoji de bandera
export const availableLanguages = [
  { code: 'es', name: 'Español', flagCountry: 'ES' },
  { code: 'en', name: 'English', flagCountry: 'GB' }
]
