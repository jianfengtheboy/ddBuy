<template>
  <div id="home">
    <div v-if="!isShowLoading">
      <!-- 头部地理位置和搜索框 -->
      <div class="head">
        <Header></Header>
        <!-- 轮播图 -->
        <div class="swiper-warpper">
          <Sowing :sowing_list="sowing_list" />
        </div>
        <!-- tip -->
        <Tip :home_ad="home_ad" />
      </div>
      <!-- Nav -->
      <Nav :nav_list="nav_list" />
      <!-- 跳转到会员界面 -->
      <VipTip></VipTip>
      <!-- 限时抢购 -->
      <FlashBuy :flash_sale_product_list="flash_sale_product_list" />
      <!-- 特色专区 -->
      <SpecialZone :specialZone="specialZone" />
      <!--TabbarItem 商品 -->
      <TabbarGoodsItem :tabbar_all_product_list="tabbar_all_product_list"
                       :flash_sale_product_list="flash_sale_product_list" />
      <!-- 最底部 -->
      <van-divider>{{$t('home.bottomTip')}}</van-divider>
    </div>
    <!-- 数据加载提示gif -->
    <Loading :show="isShowLoading" />
    <!-- 回到顶部按钮 -->
    <ToTop />
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script type="text/javascript">
import { getHomeData } from '@/serve/api/index.js'
// 引入Vuex
import { mapMutations, mapState } from 'vuex'
import { ADD_TO_CART } from '@/config/pubsub_type.js'
// 引入页面组件
import Header from './components/Header/Header'
import Sowing from './components/Sowing/Sowing'
import Tip from './components/Tip/Tip'
import Nav from './components/Nav/Nav'
import VipTip from './components/VipTip/VipTip'
import FlashBuy from './components/Flash/FlashBuy'
import SpecialZone from './components/Special/SpecialZone'
import TabbarGoodsItem from './components/Tabbar/TabbarGoodsItem'
import Loading from '@/components/Loading/LoadingGif'

export default {
  name: 'home',
  data() {
    return {
      // 是否加载动画
      isShowLoading: true,
      // 首页轮播图数据
      sowing_list: [],
      nav_list: [],
      // 限时抢购
      flash_sale_product_list: [],
      tabbar_all_product_list: [],
      // 特色专区数据
      specialZone: {},
      // 首页广告
      home_ad: ''
    }
  },
  components: {
    Header,
    Sowing,
    Tip,
    Nav,
    VipTip,
    FlashBuy,
    SpecialZone,
    TabbarGoodsItem,
    Loading,
  },
  created() {
    this._initData()
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    ...mapMutations(['ADD_GOODS', 'ADD_TO_CART']),
    // 数据初始化
    async _initData() {
      const response = await getHomeData()
      if (response.success) {
        const data = response.data
        // 给轮播组件 sowing_list赋值
        this.sowing_list = data.list[0].icon_list
        // navList 赋值
        this.nav_list = data.list[2].icon_list
        // 给限时抢购赋值
        this.flash_sale_product_list = data.list[3].product_list
        // 给Tabbar 商品列表赋值
        this.tabbar_all_product_list = data.list[12].product_list
        this.isShowLoading = false
        // 给特色专区赋值
        this.specialZone = data.special_zone
        // 获取首页广告图
        this.home_ad = data.home_ad.image_url
      }
    }
  }
}
</script>

<style lang="less" scoped>
#home {
  background-color: #f5f5f5;
  padding-bottom: 3rem;
  .head {
    margin-top: -3rem;
    width: 100%;
    background-image: url("http://518taole.7-orange.cn/backImage.png");
    .swiper-warpper {
      padding-top: 6rem;
    }
  }
}
.van-divider {
  background-color: #f5f5f5;
  margin: 0;
}
</style>
