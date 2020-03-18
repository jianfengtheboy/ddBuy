<template>
  <div id="category">
    <!--头部-->
    <Header></Header>
    <!--内容-->
    <div class="listWrapper" v-if="!isShowLoading">
      <!--左边-->
      <div class="leftWrapper" ref="leftWrapper">
        <ul class="wrapper">
          <li class="categoryItem"
              v-for="(cate, index) in categoriesData"
              :class="{selected : currentIndex === index}"
              @click="clickLeftLi(index)"
              :key="cate.id"
              ref="menuList">
            <span class="textWrapper">{{cate.name}}</span>
          </li>
        </ul>
      </div>
      <!--右边-->
      <ContentView :categoriesDetailData="categoriesDetailData" />
    </div>
    <!-- 骨架屏 -->
    <Skeleton v-if="isShowLoading" />
    <!-- 点击左边按钮加载数据时候显示动画 -->
    <LoadingGif v-show="isShowLoadingGif" />
  </div>
</template>

<script type="text/javascript">
import Header from './components/SearchHead/SearchHead'
import ContentView from './components/ContentView/ContentView'
import LoadingGif from '@/components/Loading/Loading'
import { getCategoryData, getCategoryDetailData } from '@/serve/api/index'
import BScroll from 'better-scroll'
import Skeleton from './Skeleton'

export default {
  name: 'Category',
  components: {
    Header,
    ContentView,
    LoadingGif,
    Skeleton
  },
  data () {
    return {
      // 是否显示加载图标
      isShowLoading: true,
      // 左边列表数据
      categoriesData: [],
      // 右边列表数据
      categoriesDetailData: [],
      // 左边item选中与否
      currentIndex: 0,
      isShowLoadingGif: false
    }
  },
  mounted () {
    this._initData()
  },
  activated () {
    this.$nextTick(() => {
      if (this.$route.params.currentIndex > -1) {
        this.clickLeftLi(this.$route.params.currentIndex + 1)
      }
    })
  },
  methods: {
    // 初始化操作(数据和界面)
    async _initData() {
      // 获取左边的数据
      let leftRes = await getCategoryData()
      if (leftRes.success) {
        this.categoriesData = leftRes.data.cate
      }
      // 获取右边的数据
      let rightRes = await getCategoryDetailData('/lk001')
      if (rightRes.success) {
        this.categoriesDetailData = rightRes.data.cate
      }
      // 隐藏loading框
      this.isShowLoading = false
      // 初始化滚动视图
      this.$nextTick(() => {
        if (!this.leftScroll) {
          this.leftScroll = new BScroll(this.$refs.leftWrapper, {
            probeType: 3,
            click: true,
            scrollY: true,
            tap: true,
            mouseWheel: true
          })
        } else {
          this.leftScroll.refresh()
        }
      })
    },
    // 处理左边的点击
    async clickLeftLi(index) {
      this.isShowLoadingGif = true
      this.currentIndex = index
      setTimeout(() => {
        let menuLists = this.$refs.menuList
        let el = menuLists[index]
        this.leftScroll.scrollToElement(el, 300)
      }, 900)
      // 获取右边的数据
      let param
      if (index >= 9) {
        param = `/lk0${index + 1}`
      } else {
        param = `/lk00${index + 1}`
      }
      let rightRes = await getCategoryDetailData(param)
      if (rightRes.success) {
        this.categoriesDetailData = rightRes.data.cate
      }
      this.isShowLoadingGif = false
    }
  }
}
</script>

<style lang="less" scoped>
#category {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}
.listWrapper {
  display: flex;
  position: absolute;
  top: 2.75rem;
  bottom: 50px;
  width: 100%;
  overflow: hidden;
}
.leftWrapper {
  background-color: #f4f4f4;
  width: 5.3125rem;
  flex: 0 0 5.3125rem;
}
.categoryItem {
  padding: 0.75rem 0;
  border-bottom: solid 0.01rem #e8e9e8;
  position: relative;
  &:last-child {
    border-bottom: none;
  }
}
.categoryItem .textWrapper {
  line-height: 1.25rem;
  border-left: solid 0.1875rem transparent;
  padding: 0.3125rem 0.6875rem;
  font-size: 0.8125rem;
  color: #666666;
}
.categoryItem.selected {
  background: #fff;
}
.categoryItem.selected .textWrapper {
  border-left-color: #3cb963;
  font-weight: bold;
  font-size: 0.875rem;
  color: #333333;
}
@media (min-width: 960px) {
  .wrapper {
    border-right: 0.01rem solid #e8e9e8;
  }
  .wrapper .categoryItem {
    background: #fff;
  }
}
</style>
