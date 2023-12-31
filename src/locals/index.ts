import { createI18n } from 'vue-i18n'
import useCache from '@/utils/cache'
import zh from './zh'
import en from './en'

const messages = {
  en,
  zh,
}
const language = (navigator.language || 'zh').toLocaleLowerCase() // 这是获取浏览器的语言
const i18n = createI18n({
  legacy: false,
  locale: useCache.getItem('cmsLang') || language.split('-')[0] || 'zh', // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'zh', // 设置备用语言
  messages
})

export default i18n
