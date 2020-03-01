<!--
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-12-03 21:46:07
 * @LastEditTime: 2020-02-23 16:15:25
 * @Description: 吃什么
 -->
<template>
  <div class="eatWrapper">
    <!-- 搜索栏 -->
    <Search></Search>
    <!-- 今日菜单 -->
    <TodayMenu></TodayMenu>
  </div>
</template>

<script type="text/javascript">
import Search from './components/Search/Search'
import TodayMenu from './components/TodayMenu/TodayMenu'

export default {
  components: {
    Search,
    TodayMenu
  }
}
</script>

<style lang="less" scoped>
#eatWrapper {
  background-color: "#f5f5f5";
}
</style>
