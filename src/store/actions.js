/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-11-26 22:58:26
 * @LastEditTime: 2020-02-18 12:50:18
 * @Description: actions
 */
import * as types from './mutation-type'
import { getLocalStore } from '@/config/global'

export default {
  // 1.同步用户信息
  syncuserInfo({ commit, }, userInfo) {
    commit(types.USER_INFO, { userInfo })
  },
  // 2.如果本地存在Token 那么就自动登录
  autoLogin({ commit }) {
    let userInfo = getLocalStore('userInfo')
    if (userInfo) {
      commit(types.USER_INFO, { userInfo })
    }
  },
  setLanguage({ commit }, language) {
    commit("SET_LANGUAGE", language)
  }
}
