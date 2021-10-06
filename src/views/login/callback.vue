<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="path">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a href="javascript:;" @click="hasAccount=true" :class="{active:hasAccount}">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a href="javascript:;" @click="hasAccount=false" :class="{active:!hasAccount}">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :user="user" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
// 导入组件
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import CallbackPatch from './components/callback-patch.vue'
import CallbackBind from './components/callback-bind.vue'
// 按需导入vueAPI及生态系统API
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'PageCallback',
  components: {
    LoginHeader,
    LoginFooter,
    CallbackPatch,
    CallbackBind
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    // 点击切换页面内容
    const hasAccount = ref(true)
    const path = ref(true)
    // 个人信息
    const user = reactive({
      nickname: '',
      avatar: ''
    })
    // window.QC.Login.check()，登录返回true
    if (window.QC.Login.check()) {
      window.QC.api('get_user_info').success(res => {
        user.nickname = res.data.nickname
        user.avatar = res.data.figureurl_1
      })
      store.dispatch('user/postSocial').then(res => {
        if (res) router.push('/')
        path.value = res
      })
    } else {
      window.location.href('https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback')
    }

    return { hasAccount, user, path }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
