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
import TopNav from '../components/top-nav.vue'
import TopHeader from './components/top-heater.vue'
import BottomNav from '../components/bottom-nav.vue'
import HeaderSticky from './components/headder-sticky.vue'

export default {
  name: 'Layout',
  components: {
    TopNav,
    TopHeader,
    BottomNav,
    HeaderSticky
  }
}
</script>

<style>
</style>
