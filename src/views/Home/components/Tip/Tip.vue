<template>
  <div id="tip">
    <div class="tipBox">
      <img src="@/images/icon/transport.png" alt="">
      <span class="tipText">{{$t('goodsDetail.quickTime')}}</span>
    </div>
    <div class="tipBox">
      <img src="@/images/icon/money.png" alt="">
      <span class="tipText">{{$t('common.distributionTip')}}</span>
    </div>
    <div class="tipBox">
      <img src="@/images/icon/seal.png" alt="">
      <span class="tipText">{{$t('common.easeBack')}}</span>
    </div>
    <div @click="goToVip">
      <img class="adImg" :src="home_ad">
      <div class="adTitle">加入<br>
        会员
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'

export default {
  props: {
    // 父组件传递过来的数据
    home_ad: [String]
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    goToVip () {
      if (this.userInfo.token) {
        this.$router.push({ name: 'myVip' })
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
#tip {
  margin-top: 0.3rem;
  position: relative;
}
.tipBox {
  float: left;
  width: 33%;
  text-align: center;
}
.tipBox img {
  vertical-align: middle;
  height: 1rem;
  width: 1rem;
  margin-right: 0.2rem;
}
.tipText {
  font-size: 0.6rem;
  color: #45c763;
}
.adImg {
  margin-top: 0.8rem;
  width: 100%;
  height: 6rem;
  margin-bottom: -0.2rem;
}
.adTitle {
  position: absolute;
  top: 3.4rem;
  left: 14%;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 1.2rem;
  border-radius: 50%;
  font-size: 0.65rem;
  text-align: center;
  color: gold;
  background-image: linear-gradient(to right, #ff9569 0%, #e92758 100%);
  -webkit-animation-name: scaleDraw; /*关键帧名称*/
  -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
  -webkit-animation-iteration-count: infinite; /*动画播放的次数*/
  -webkit-animation-duration: 3s; /*动画所花费的时间*/
  @keyframes scaleDraw {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.1);
    }
  }
}
</style>
