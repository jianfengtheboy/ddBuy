/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-11-26 23:01:36
 * @LastEditTime: 2020-02-18 14:30:42
 * @Description: state
 */
import { getLanguage } from '@/i18n/index'

export default {
  // 购物车数据
  shopCart: {},
  // 用户信息
  userInfo: {},
  // 收货地址
  shippingAddress: [],
  language: getLanguage()
}
