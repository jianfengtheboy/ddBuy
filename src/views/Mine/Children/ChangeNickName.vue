<!--
 * @Author: SunJianFeng
 * @LastEditors: SunJianFeng
 * @Email: jianfengtheboy@163.com
 * @Date: 2020-02-23 16:50:45
 * @LastEditTime: 2020-02-29 11:53:50
 * @Description: 修改昵称
 -->
<template>
  <div id="changeNickName">
    <van-nav-bar :title="$t('mine.changeNickName')"
                 :fixed=true
                 :border=false
                 @click-left="onClickLeft"
                 left-arrow
                 @click-right="onClickSave"
                 :right-text="$t('mine.confirm')"
                 style="height:2.5rem" />
    <div style="margin-top:3rem">
      <van-cell-group :title="$t('mine.nickName')">
        <van-field v-model="nickName"
                   clearable
                   ref="field"
                   :placeholder="nickName" />
      </van-cell-group>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Toast } from 'vant'
import { phoneCaptchaLogin } from '@/serve/api/index.js'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      nickName: this.$route.params.nickName,
    }
  },
  mounted () {
    this.$refs.field.focus()
  },
  methods: {
    ...mapMutations(['CHANGE_USER_NICK_NAME']),
    // 返回按钮
    onClickLeft () {
      this.$router.back()
    },
    // 修改昵称
    onClickSave () {
      if (this.nickName.length > 0) {
        let nickName = this.nickName
        this.CHANGE_USER_NICK_NAME({ nickName })
        Toast({
          message: this.$t('mine.personal'),
          duration: 800
        })
        setTimeout(() => {
          this.$router.back()
        }, 1000)
      } else {
        Toast({
          message: this.$t('mine.message'),
          duration: 800
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#changeNickName {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 999;
  .van-nav-bar__text {
    color: #45c763;
  }
}
</style>
