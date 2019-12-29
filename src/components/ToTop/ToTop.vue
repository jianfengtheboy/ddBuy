<template>
  <div class="scrollTop"
        v-show="showTop"
        @click="toTop">
    <svg-icon iconClass="backtotop"
              style="width:2.5rem;height:2.5rem"/>
  </div>
</template>

<script type="text/javascript">
import SvgIcon from '@/components/SvgIcon/index'

export default {
  name: 'scroll-top',
  components: { SvgIcon },
  data () {
    return {
      scrollTop: 0,
      time: 0,
      dParams: 20,
      scrollState: 0
    }
  },
  computed: {
    showTop() {
      let value = this.scrollTop > 200 ? true : false
      return value
    }
  },
  mounted () {
    window.addEventListener('scroll', this.getScrollTop)
  },
  methods: {
    toTop(e) {
      if (!!this.scrollState) return
      this.scrollState = 1
      e.preventDefault()
      let distance = document.documentElement.scrollTop || document.body.scrollTop
      let that = this
      this.time = setInterval(() => {
        that.gotoTop(that.scrollTop - that.dParams)
      }, 10)
    },
    gotoTop(distance) {
      this.dParams += 20
      distance = distance > 0 ? distance : 0
      document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance
      if (this.scrollTop < 10) {
        clearInterval(this.time)
        this.dParams = 20
        this.scrollState = 0
      }
    },
    getScrollTop () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    }
  }
}
</script>

<style lang="less" scoped>
.scrollTop {
  right: 0;
  position: fixed;
  bottom: 5rem;
  cursor: pointer;
  z-index: 100;
}
</style>
