<template>
  <div id="produceItem">
    <div class="item"
         v-for="(product, index) in product_lists"
         :key="index"
         @click.stop="goToGoodsDetail(product)">
      <img v-lazy="product.small_image">
      <p class="itemTitle">{{product.name}}</p>
      <p class="itemSubTitle">{{product.spec}}</p>
      <span class="tagEat"
            v-if="isShowEatTag">{{$t('home.foodie')}}</span>
      <span class="price">{{product.price | moneyFormat}}</span>
      <span class="originPrice">{{product.origin_price | moneyFormat}}</span>
      <div class="buyCar"
           @click.stop="addToCart(product)">
        <svg-icon iconClass="car" style="width:1.5rem;height:1.5rem" />
      </div>
    </div>
    <transition appear
                @after-appear="afterEnter"
                @before-appear="beforeEnter"
                v-for="(item, index) in showMoveDot"
                :key="index">
      <div class="move_dot"
            ref="ball"
            v-if="item">
        <!-- 小球图片 -->
        <img :src="dropImage" alt="">
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
import { mapMutations, mapState } from 'vuex'
import { ADD_TO_CART } from '@/config/pubsub_type.js'

export default {
  props: {
    product_lists: Array
  },
  data() {
    return {
      isShowEatTag: false,
      // 控制下落的小圆点显示隐藏
      showMoveDot: [],
      // 当前点击购物车按钮在网页中的绝对top值
      elLeft: 0,
      // 当前点击购物车按钮在网页中的绝对left值
      elTop: 0,
      dropImage: ''
    }
  },
  created() {
    this.dropBalls = []
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['ADD_TO_CART']),
    // 添加到购物车
    addToCart(product, num) {
      this.ADD_TO_CART(product)
      if (this.userInfo.token) {
        // 取出商品的图片
        this.dropImage = product.small_image
        // 增加到购物车
        this.elLeft = event.target.getBoundingClientRect().left
        this.elTop = event.target.getBoundingClientRect().top
        this.showMoveDot = [...this.showMoveDot, true]
      }
    },
    beforeEnter(el) {
      // 设置transform值
      el.style.transform = `translate3d(${this.elLeft - 30}px,${this.elTop - 100}px , 0)`
      // 设置透明度
      el.style.opacity = 0
    },
    afterEnter(el) {
      // 获取底部购物车徽标的位置
      const badgePosition = document.getElementById('buycar').getBoundingClientRect()
      // 设置位移
      el.style.transform = `translate3d(${badgePosition.left + 30}px,${badgePosition.top - 30}px,0)`
      // 增加贝塞尔曲线  
      el.style.transition = 'transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)'
      el.style.transition = 'transform .88s linear'
      this.showMoveDot = this.showMoveDot.map(item => false)
      // 设置透明度
      el.style.opacity = 1
      // 监听小球动画结束方法
      el.addEventListener('transitionend', () => {
        el.style.display = 'none'
        this.listenInCart()
      })
      el.addEventListener('webkitAnimationEnd', () => {
        el.style.display = 'none'
        this.listenInCart()
      })
    },
    listenInCart() {
      // 拿到购物车的DOM添加class
      document.getElementById('buycar').classList.add('moveToCart')
      setTimeout(() => {
        // 500毫秒后移除class
        document.getElementById('buycar').classList.remove('moveToCart')
      }, 500)
    },
    // 商品详情页面
    goToGoodsDetail (goods) {
      if (this.userInfo.token) {
        this.$router.push({
          name: 'goodsDetail',
          query: {
            id: goods.id,
            name: goods.name,
            small_image: goods.small_image,
            price: goods.price,
            spec: goods.spec,
            total_sales: goods.total_sales,
            origin_price: goods.origin_price,
          }
        })
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
#produceItem {
  background-color: #f5f5f5;
  height: auto;
  padding-left: 2%;
  padding-top: 0.5rem;
}
.move_dot {
  position: fixed;
  z-index: 100;
  top: 1rem;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  img {
    animation: 0.88s mymove ease-in-out;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
}
.item {
  position: relative;
  display: inline-block;
  width: 48%;
  margin-right: 2%;
  margin-bottom: 0.5rem;
  background-color: white;
  border-radius: 0.3rem;
  padding-bottom: 0.6rem;
}
.item img {
  width: 100%;
  height: 100%;
  // 等比缩小图片来适应元素的尺寸
  background-size: contain;
  background-image: url("../../../../images/placeholderImg/product-img-load.png");
}
.item .itemTitle {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  line-height: 1rem;
  height: 2rem;
  font-size: 0.625rem;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item .itemSubTitle {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: gray;
  padding-top: 0.2rem;
  font-size: 0.45rem;
  line-height: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 1.5rem;
}
.item .price {
  padding-left: 0.5rem;
  color: #f37078;
  font-size: 0.928rem;
}
.tagEat {
  margin-left: 0.5rem;
  padding: 0.09rem;
  color: orangered;
  width: 2.5rem;
  height: 0.1rem;
  border-radius: 0.2rem;
  font-size: 0.3rem;
  border: 0.05rem solid red;
}
.originPrice {
  padding-left: 0.3rem;
  font-size: 0.6875rem;
  color: #999;
  text-decoration: line-through;
}
.buyCar {
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;
  right: 1rem;
  bottom: 0.5rem;
}
@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(0.2);
  }
}
@-moz-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(0.2);
  }
}
@-webkit-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(0.2);
  }
}
@-o-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(0.2);
  }
}
</style>
