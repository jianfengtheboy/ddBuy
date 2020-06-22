<!--
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2019-11-25 23:06:42
 * @LastEditTime: 2020-06-22 22:39:42
 * @Description: App.vue
 -->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// 禁止手机端扩大和缩小手势
window.onload = function() {
  document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault()
  })
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
/** 解决 [Intervention] Unable to preventDefault 
inside passive event listener due to target being treated as
**/
* {
  touch-action: pan-y;
}
</style>
