<template>
  <!-- 顶部通栏 -->
  <TopNav />
  <!-- 顶部分类 -->
  <TopHeader />
  <!-- 吸顶组件 -->
  <HeaderSticky />
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <!-- 底部区域 -->
  <BottomNav />
</template>

<script>
// 导入组件
import TopNav from './components/top-nav.vue'
import TopHeader from './components/top-heater.vue'
import BottomNav from './components/bottom-nav.vue'
import HeaderSticky from './components/headder-sticky.vue'
// 按需导入
import { useStore } from 'vuex'

export default {
  name: 'Layout',
  components: {
    TopNav,
    TopHeader,
    BottomNav,
    HeaderSticky
  },
  setup () {
    const store = useStore()
    // 获取购物车数据
    store.dispatch('cart/getMemberCart')
  }
}
</script>

<style>
</style>
