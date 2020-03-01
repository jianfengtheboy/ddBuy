/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-12-30 00:28:00
 * @LastEditTime: 2020-02-23 11:10:20
 * @Description: 多语言
 */
import Vue from 'vue'
import VueI18n from "vue-i18n"
import Cookies from "js-cookie"
import enLocale from "./en"
import zhLocale from "./zh"

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}

export function getLanguage() {
  // 从cookis 里面取语言
  const chooseLanguage = Cookies.get('language')
  if (!chooseLanguage) {
    // 设置默认语言为中文
    Cookies.set('language', 'zh')
  }
  if (chooseLanguage) return chooseLanguage
  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}
const i18n = new VueI18n({
  locale: getLanguage(),
  messages
})

export default i18n
