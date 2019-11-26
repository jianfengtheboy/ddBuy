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
  }
}
