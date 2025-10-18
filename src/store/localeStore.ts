import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore('locale', () => {
  const { locale } = useI18n()

  const setLocale = (code: string) => {
    locale.value = code
    localStorage.setItem('app-locale', code) 
  }

  const getLocale = () => localStorage.getItem('app-locale') || locale.value

  return { locale, setLocale, getLocale }
})
