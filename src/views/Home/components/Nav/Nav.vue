<!--
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-11-30 00:23:33
 * @LastEditTime: 2020-02-23 00:01:22
 * @Description: nav组件
 -->
<template>
  <div id="wrapper">
    <van-grid :column-num="5"
              :border="false">
      <van-grid-item v-for="(nav,index) in nav_list"
                     :key="nav.cid"
                     :icon="nav.icon_url"
                     :text="nav.name"
                     @click="gotoCategory(index)" />
    </van-grid>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    nav_list: Array
  },
  methods: {
    gotoCategory(index) {
      this.$router.push({
        name: 'category',
        params: {
          currentIndex: index
        }
      })
    }
  }
}
</script>

<style lang="less" scoped> 
</style>
