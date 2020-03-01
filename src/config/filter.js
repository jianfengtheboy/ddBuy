/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-11-26 22:19:08
 * @LastEditTime: 2020-02-18 12:25:31
 * @Description: 自定义过滤器
 */
import Vue from 'vue'

// 金钱过滤 ¥xx.xx
Vue.filter('moneyFormat', (value) => {
  return '¥' + Number(value).toFixed(2)
})
