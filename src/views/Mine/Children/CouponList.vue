<!--
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-02-23 16:50:30
 * @LastEditTime: 2020-03-01 12:16:22
 * @Description: 我的优惠券
 -->
<template>
  <div id="couponList">
    <van-nav-bar :title="$t('mine.myBills')"
                 :fixed=true
                 :border=false
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
    <!--优惠券列表-->
    <van-coupon-list :coupons="coupons"
                     style="margin-top:3rem"
                     :input-placeholder="$t('mine.persent')"
                     @exchange="onExchange" />
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      coupons: [
        {
          available: 1,
          condition: this.$t('mine.condition'),
          reason: '',
          value: 150,
          name: this.$t('mine.bill'),
          startAt: 1549104000,
          endAt: 1614592000,
          valueDesc: '1.5',
          unitDesc: this.$t('mine.rmb')
        },
        {
          available: 1,
          condition: this.$t('mine.condition'),
          reason: '',
          value: 200,
          name: this.$t('mine.bill'),
          startAt: 1549104000,
          endAt: 1614592000,
          valueDesc: '1.5',
          unitDesc: this.$t('mine.rmb')
        },
          {
          available: 1,
          condition: this.$t('mine.condition'),
          reason: '',
          value: 200,
          name: this.$t('mine.bill'),
          startAt: 1549104000,
          endAt: 1614592000,
          valueDesc: '1.5',
          unitDesc: this.$t('mine.rmb')
        }
      ]
    }
  },
  methods: {
    // 返回到上个界面
    onClickLeft () {
      this.$router.go(-1)
    },
    onExchange (code) {
      if (code == '520it') {
        this.coupons.push(this.coupons[0])
      }
    }
  }
}
</script>

<style lang="less" scoped>
#couponList {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 999;
  .van-nav-bar__title {
    color: black;
  }
  .van-icon {
    color: #dedede;
  }
}
</style>
