import Vue from 'vue'
import Router from 'vue-router'

// 解决多次点击重复路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 引入一级组件
import Dashboard from '@/views/Dashboard/Dashboard'

// 懒加载二级组件 Tarbar
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home/Home')

// 地图
const Map = () => import(/* webpackChunkName: "Map" */ '@/views/Home/components/Map/Map')

// 注册登录
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login/Login.vue')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '/dashboard',
        redirect: '/dashboard/home'
      },
      {
        path: 'home',
        name: 'home',
        component: Home,
        // 是否数据缓存
        meta: {
          keepAlive: true
        },
        children: [
          {
            path: 'map',
            name: 'map',
            component: Map
          }
        ]
      }
    ]
  },
  {
    // 登录
    path: '/Login',
    name: 'login',
    component: Login
  }
]

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
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

export default router
