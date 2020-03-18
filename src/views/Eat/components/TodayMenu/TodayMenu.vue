<!--
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-02-23 12:49:33
 * @LastEditTime: 2020-03-18 23:27:33
 * @Description: 今日菜单组件
 -->
<template>
  <div>
    <div id="todayMenu" v-if="!isShowLoading">
      <div class="todayMenuWrapper">
        <div class="menuList" ref="menuList">
          <ul ref="menuUlContent">
            <li class="menuItem"
                v-for="(item, index) in todayMenuCategoryLists"
                :key="item.id"
                ref="menuTitle"
                :class="{ selected : currentSubTitle === index }"
                @click="menuItemClick(index)">
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="menuAll" @click="clickAll">{{msg}}
          <span class="downMenu" v-if="menuDown">
            <svg-icon iconClass="down" style="width:1rem;height:1rem" />
          </span>
          <span class="upMenu" v-else>
            <svg-icon iconClass="up" style="width:1rem;height:1rem" />
          </span>
        </div>
      </div>
      <MenuCategoryLists :todayMenuCategoryLists="todayMenuCategoryLists"
                          :isShowMenuList="isShowMenuList"
                          v-on:hiddenMenu="clickAll">
      </MenuCategoryLists>
    </div>
    <!-- 骨架屏 -->
    <Skeleton v-if="isShowLoading"></Skeleton>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import MenuCategoryLists from '../MenuCategoryLists/MenuCategoryLists'
import PubSub from 'pubsub-js'
import { EAT_MENUTITLE_CLICK } from '@/config/pubsub_type.js'
import { getTodayMenuCategoryList } from '@/serve/api/index.js'
import Skeleton from '../../Skeleton'

export default {
  data () {
    return {
      menuDown: true,
      isShowMenuList: false,
      todayMenuCategoryLists: [],
      msg: this.$t('eat.all'),
      currentSubTitle: 0,
      isShowLoading: true
    }
  },
  mounted () {
    let that = this
    this._initData()
    PubSub.subscribe(EAT_MENUTITLE_CLICK, function(msg, index) {
      that.menuItemClick(index)
    })
  },
  components: {
    MenuCategoryLists,
    Skeleton
  },
  watch: {
    menuDown () {
      let all = this.$t('eat.all')
      let close = this.$t('eat.close')
      this.msg = this.menuDown == true ? all : close
    }
  },
  methods: {
    async _initData () {
      let todayMenuCategory = await getTodayMenuCategoryList()
      if (todayMenuCategory.success) {
        this.todayMenuCategoryLists = todayMenuCategory.data.list
        this.$nextTick(() => {
          this._initMenuTitleScroll()
        })
      }
      this.isShowLoading = false
    },
    clickAll () {
      this.menuDown = !this.menuDown
      this.isShowMenuList = !this.isShowMenuList
    },
    menuItemClick (index) {
      this.currentSubTitle = index
      let el = this.$refs.menuTitle[index]
      this.menuTitleScroll.scrollToElement(el, 500)
      if (!this.menuDown) {
        this.clickAll()
      }
    },
    _initMenuTitleScroll () {
      this.$nextTick(() => {
        if (!this.menuTitleScroll) {
          let contentWrapperWidth = 100
          let el = this.$refs.menuTitle
          for (let i = 0; i < el.length; i++) {
            contentWrapperWidth += (el[i].clientWidth * 1.18)
          }
          this.$refs.menuUlContent.style.width = contentWrapperWidth + 'px'
          this.menuTitleScroll = new BScroll(this.$refs.menuList, {
            probeType: 3,
            startX: 0,
            click: true,
            scrollX: true,
          })
        } else {
          this.menuTitleScroll.refresh()
        }
      })
    }
  },
  beforeDestroy () {
    PubSub.unsubscribe(EAT_MENUTITLE_CLICK)
  }
}
</script>

<style lang="less" scoped>
#todayMenu {
  width: 100%;
  margin-top: 6.8rem;
  overflow: hidden;
  margin-bottom: 3rem;
  .todayMenuWrapper {
    width: 100%;
    height: 1.5rem;
    display: inline-block;
    white-space: nowrap;
    border-bottom: solid 0.01rem #e8e9e8;
    overflow: hidden;
    position: fixed;
    z-index: 999;
    top: 5.1rem;
    background-color: white;
    padding-bottom: 0.2rem;
    .menuList {
      width: 80%;
      overflow: hidden;
      .menuItem {
        margin-right: 0.5rem;
        display: inline-block;
        font-size: 0.73rem;
        padding: 0.4rem;
        border: 1px solid #dedede;
        border-radius: 0.6rem;
        padding: 0.3rem;
      }
      .selected {
        color: #3cb963;
        border: 1px solid #3cb963;
      }
    }
    .menuAll {
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 0.9rem;
      font-size: 0.6rem;
      color: gray;
      .downMenu {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>
