<!--
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-02-23 12:48:35
 * @LastEditTime: 2020-06-22 23:52:49
 * @Description: 瀑布流组件
 -->
<template>
  <div class="container-water-fall">
    <waterfall :col='col'
               :data="data"
               @loadmore="loadmore">
      <div class="cell-item"
           v-for="item in data"
           :key="item.id">
        <img v-lazy="item.image" alt="">
        <div class="item-body">
          <div class="item-desc">{{item.name}}</div>
          <div class="item-footer">
            <img class="avatar" v-lazy="item.author_avatar" alt="">
            <div class="name">{{item.author_name}}</div>
          </div>
        </div>
      </div>
    </waterfall>
  </div>
</template>

<script type="text/javascript">
import { getTodayMenuDetail } from '@/serve/api/index.js'
import { Toast } from 'vant'

export default {
  data () {
    return {
      data: [],
      col: 2,
      menulistDetail: [],
      page: 1
    }
  },
  mounted () {
    this._initData()
  },
  methods: {
    async _initData() {
      let ref = await getTodayMenuDetail('/lk01')
      if (ref.success) {
        this.menulistDetail = ref.data.big_recommend.list
        this.data = ref.data.big_recommend.list
      }
    },
    loadmore(num) {
      let index = ++this.page
      let param
      if (index > 31) {
        Toast({
          message: $t('eat.tip_bottom'),
          duration: 800
        })
        return
      } else {
        param = index >= 10 ? `/lk${index}` : `/lk0${index}`
      }
      getTodayMenuDetail(param).then(response => {
        if (response.success) {
          let newArray = response.data.big_recommend.list
          this.data = this.data.concat(newArray)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container-water-fall {
  width: 100vw;
  box-sizing: border-box;
  background-color: #f5f5f5f5;
  .vue-waterfall {
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 2rem;
  }
  h4 {
    padding-top: 56px;
    padding-bottom: 1rem;
    font-family: PingFangSC-Medium;
    font-size: 2rem;
    color: #000000;
    letter-spacing: 1px;
    text-align: justify;
  }
  .cell-item {
    width: 100%;
    background: #ffffff;
    overflow: hidden;
    box-sizing: border-box;
    margin-bottom: 1px;
    padding: 0.3rem;
    img {
      border-radius: 12px;
      width: 100%;
      display: block;
      // 等比缩小图片来适应元素的尺寸
      background-size: contain;
      background-image: url("../../../../images/placeholderImg/product-img-load.png");
    }
    .item-body {
      padding: 0.6rem;
      .item-desc {
        font-size: 0.8rem;
        color: #333333;
        line-height: 1rem;
        font-weight: bold;
      }
      .item-footer {
        margin-top: 1rem;
        position: relative;
        display: flex;
        align-items: center;
        .avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
        .name {
          max-width: 150px;
          margin-left: 10px;
          font-size: 0.75rem;
          color: #999999;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
