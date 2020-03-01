<!--
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-11-30 00:25:06
 * @LastEditTime: 2020-02-29 12:02:01
 * @Description: 
 -->
<template>
  <div id="vipPage"
        @click="goToMyVip">
    <svg-icon iconClass="vip" class="icon" />
    <span class="title">{{$t('home.vipDesc')}}</span>
    <span class="subTitle">{{$t('home.vipSubDesc')}}></span>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    goToMyVip() {
      if (this.userInfo.token) {
        this.$router.push({
          name: 'vipTip'
        })
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
#vipPage {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem auto;
  height: 2rem;
  background-color: #3bba63;
  width: 95%;
  border-radius: 0.2rem;
  opacity: 0.9;
  .icon {
    padding-left: 0.5rem;
    height: 2rem;
    line-height: 2rem;
  }
  .title {
    margin-left: 0.3rem;
    font-size: 0.6rem;
    color: white;
  }
  .subTitle {
    margin-left: auto;
    margin-right: 0.5rem;
    font-size: 0.6rem;
    color: white;
  }
} 
</style>
