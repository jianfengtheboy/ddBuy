/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-11-26 22:25:04
 * @LastEditTime: 2020-03-01 14:22:56
 * @Description: 全局方法
 */
// 本地化存储
export const setLocalStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

// 本地化获取
export const getLocalStore = (name) => {
  if (!name) return
  return window.localStorage.getItem(name)
}

// 本地化删除
export const removeLocalStore = (name) => {
  if (!name) return
  return window.localStorage.removeItem(name)
}

// 版本信息
export const _VERSION_ = "1.0.0"
