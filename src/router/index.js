/*
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-11-29 23:24:41
 * @LastEditTime: 2020-02-23 17:26:18
 * @Description: 路由
 */
import Vue from 'vue'
import Router from 'vue-router'

// 引入一级组件
import Dashboard from '@/views/Dashboard/Dashboard'
import state from '@/store/state'

// 懒加载二级组件 Tarbar
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home/Home')
const Category = () => import(/* webpackChunkName: "Category" */ '@/views/Category/Category')
const Eat = () => import(/* webpackChunkName: "Eat" */ '@/views/Eat/Eat')
const Cart = () => import(/* webpackChunkName: "Cart" */ '@/views/Cart/Cart')
const Mine = () => import(/* webpackChunkName: "Mine" */ '@/views/Mine/Mine')

// 地图
const Map = () => import(/* webpackChunkName: "Map" */ '@/views/Home/components/Map/Map')

// 解决多次点击重复路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// Mine的子组件
// 用户中心
const UserCenter = () => import(/* webpackChunkName: "UserCenter" */ '@/views/Mine/Children/UserCenter')
// 修改用户昵称
const ChangeNickName = () => import(/* webpackChunkName: "ChangeNickName" */ '@/views/Mine/Children/ChangeNickName')
// 优惠券
const CouponList = () => import(/* webpackChunkName: "CouponList" */ '@/views/Mine/Children/CouponList')
// 绿卡会员
const MyVip = () => import(/* webpackChunkName: "MyVip" */ '@/views/Mine/Children/MyVip')
// 会员支付
const VipPay = () => import(/* webpackChunkName: "VipPay" */ '@/views/Mine/Children/MyVipChildren/VipPay')
// 我的订单
const MyOrder = () => import(/* webpackChunkName: "MyOrder" */ '@/views/Mine/Children/MyOrder')
// 订单商品详情页
const OrderGoodsList = () => import(/* webpackChunkName: "OrderGoodsList" */ '@/views/Order/Children/OrderGoodsList')
// 商品详情页
const GoodsDetail = () => import(/* webpackChunkName: "GoodsDetail" */ '@/components/GoodsDetail/GoodsDetai')
// 语言切换
const SwitchLanguage = () => import(/* webpackChunkName: "SwitchLanguage" */ '@/views/Mine/Children/SwitchLanguage')

// 加载订单相关的组件
const Order = () => import(/* webpackChunkName: "Order" */ '@/views/Order/Order')
// 我的地址
const MyAddress = () => import(/* webpackChunkName: "MyAddress" */ '@/views/Order/Children/MyAddress')
// 添加地址
const AddAddress = () => import(/* webpackChunkName: "AddAddress" */ '@/views/Order/Children/Children/AddAddress')
// 编辑地址
const EditAddress = () => import(/* webpackChunkName: "EditAddress" */ '@/views/Order/Children/Children/EditAddress')

// 注册登录
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login/Login.vue')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    // 是否数据缓存
    meta: {
      keepAlive: true
    }
  },
  { // 根页面 
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '/dashboard',
        redirect: '/dashboard/home',
        // 是否数据缓存
        meta: {
          keepAlive: true
        }
      },
      { // 主页
        path: 'home',
        name: 'home',
        component: Home,
        // 是否数据缓存
        meta: {
          keepAlive: true
        }
      },
      { // 分类
        path: 'category',
        name: 'category',
        component: Category,
        // 是否数据缓存
        meta: {
          keepAlive: true
        }
      },
      { // 吃什么
        path: 'eat',
        name: 'eat',
        component: Eat,
        // 是否数据缓存
        meta: {
          keepAlive: true
        }
      },
      { // 购物车
        path: 'cart',
        name: 'cart',
        component: Cart,
        // 是否数据缓存
        meta: {
          keepAlive: true
        }
      },
      { // 我的
        path: 'mine',
        name: 'mine',
        component: Mine,
        children: [
          { // 用户中心
            path: 'userCenter',
            name: 'userCenter',
            component: UserCenter,
            children: [
              { // 修改昵称
                path: 'changeNickName',
                name: 'ChangeNickName',
                component: ChangeNickName
              }
            ]
          },
          { // 优惠券
            path: 'couponList',
            name: 'couponList',
            component: CouponList,
            meta: {
              requireAuth: true
            }
          },
          { // 我的订单
            path: 'myOrder',
            name: 'myOrder',
            component: MyOrder,
            meta: {
              requireAuth: true
            }
          },
          { // 绿卡会员
            path: 'myVip',
            name: 'myVip',
            component: MyVip,
            // 是否数据缓存
            meta: {
              keepAlive: true,
              requireAuth: true
            }
          },
          {
            path: '/vipPay',
            name: 'vipPay',
            component: VipPay
          },
          {
            path: 'switchLanguage',
            name: 'switchLanguage',
            component: SwitchLanguage
          }
        ]
      },
      { // 商品详情
        path: '/goodsDetail',
        name: 'goodsDetail',
        component: GoodsDetail
      },
      {
        path: 'map',
        name: 'map',
        component: Map
      }
    ]
  },
  { // 订单
    path: '/order',
    name: 'order',
    component: Order,
    children: [
      { // 我的地址
        path: 'myAddress',
        name: 'myAddress',
        component: MyAddress,
        meta: {
          requireAuth: true
        },
        children: [
          { // 添加地址
            path: 'addAddress',
            name: 'addAddress',
            component: AddAddress
          },
          { // 编辑地址
            path: 'editAddress',
            name: 'editAddress',
            component: EditAddress
          }
        ]
      },
      {
        path: 'orderGoodsList',
        name: 'orderGoodsList',
        component: OrderGoodsList
      }
    ]
  },
  { // 登录
    path: '/Login',
    name: 'login',
    component: Login
  }
]

const router = new Router({
  // 解决路由跳转页面没有置顶
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (state.userInfo.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
