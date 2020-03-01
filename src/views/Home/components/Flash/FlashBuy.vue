<!--
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-11-30 00:29:04
 * @LastEditTime: 2020-02-18 16:24:40
 * @Description: FlashBuy
 -->
<template>
  <div id="wrapper">
    <div class="titleWrapper">
      <div class="title">{{$t('home.limitBuy')}}</div>
      <van-count-down :time="time"
                      class="countStyle"
                      format="HH mm ss">
        <template v-slot="timeData">
          <span class="item">{{ formatTime(timeData.hours) }}</span>
          <span class="item">{{ formatTime(timeData.minutes) }}</span>
          <span class="item">{{ formatTime(timeData.seconds) }}</span>
        </template>
      </van-count-down>
      <!-- 更多按钮 -->
      <div class="more"
           @click="moreClick">
        {{ $t('home.more') }}
      </div>
    </div>
    <!-- 限时抢购商品 遍历父组件传来的数据并传递给子组件-->
    <FlashFood :flash_sale_product_list="flash_sale_product_list" />
  </div>
</template>

<script type="text/javascript">
import FlashFood from './FlashFood'
import { Toast } from 'vant'
import { formatMixin } from '@/config/mixin'

export default {
  mixins: [formatMixin],
  props: {
    flash_sale_product_list: Array
  },
  data() {
    return {
      // 倒计时时间设置
      time: 30 * 60 * 1000 * 100
    }
  },
  components: {
    FlashFood
  },
  methods: {
    moreClick() {
      Toast({
        message: this.$t('home.more'),
        duration: 800
      })
    }
  }
}
</script>

<style lang="less" scoped>
#wrapper {
  margin-top: 0.625rem;
  padding: 1.25rem 0 0.9375rem 0;
  background-color: white;
}
.titleWrapper {
  margin: 0 0.625rem 0.625rem 0.625rem;
  height: 1.5625rem;
}
.title {
  display: inline-block;
  border-left: 4px #3cb963 solid;
  padding-left: 0.3125rem;
  height: 1.3125rem;
  line-height: 1.3125rem;
  vertical-align: middle;
  font-size: 1.1875rem;
  float: left;
}
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #000;
}
.countStyle {
  float: left;
  margin-left: 0.7rem;
}
.more {
  color: #3cb963;
  float: right;
  font-size: 0.8rem;
}
</style>
