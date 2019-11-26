import * as types from './mutation-type'
// import { getLocalStore } from '@/config/global'

export default {
  // 1. 选中商品的数量
  [types.SELECTED_GOODS_COUNT](state) {
    let count = 0
    let shopCart = state.shopCart
    Object.values(shopCart).forEach((goods) => {
      if (goods.checked) {
        count++
      }
    })
    return count
  },
  // 2.选中的商品
  [types.SELECTED_GOODS](state) {
    let goodsArray = []
    let shopCart = state.shopCart
    // let shopCart = JSON.parse(getLocalStore('shopCart'))
    Object.values(shopCart).forEach((good) => {
      if (good.checked) {
        goodsArray.push(shopCart[good.id])
      }
    })
    return goodsArray
  },
  // 3.选中商品的价格
  [types.SELECTED_GOODS_PRICE](state) {
    let totalPrice = 0
    Object.values(state.shopCart).forEach((goods) => {
      if (goods.checked) {
        totalPrice += (goods.price * goods.num * 100)
      }
    })
    return totalPrice
  },
  // 性别
  [types.USER_SEX](state) {
    if (state.userInfo.sex == '1') {
      return '美女'
    } else if (state.userInfo.sex == '2') {
      return '帅哥';
    } else {
      return '未填写'
    }
  }
}
