/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-11-25 23:06:42
 * @LastEditTime : 2020-01-07 10:21:19
 * @Description: main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import ToTop from '@/components/ToTop/ToTop'
import i18n from './i18n/index'
import VueI18n from 'vue-i18n'
import LangENUS from './i18n/en'
import LangZHCN from './i18n/zh'
import './icons'

// 解决移动端点击延迟200ms的问题
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

//图片懒加载
Vue.use(VueLazyLoad, {
  preLoad : 1,
  loading : require('@/assets/images/default.png')
})

// 多语言
Vue.use(VueI18n, {
  i18n: (key, value) => i18n.t(key, value)
})

// 注册为全局组件
Vue.component('ToTop', ToTop)

// 瀑布流
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

Vue.config.productionTip = false

// 全局引入UI库 vant
import '@/plugins/vant'
// 全局引入rem
import '@/config/rem'
// 全局引入 Reset-css
import 'reset-css'
//  全局引入 过滤器
import '@/config/filter'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
