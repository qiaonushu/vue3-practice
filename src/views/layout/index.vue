<template>
  <!-- 头部区域 -->
  <!-- 顶部通栏 -->
  <TopNav />
  <!-- 顶部分类 -->
  <TopHeader />
  <!-- 二级路由 -->
  <router-view></router-view>
  <!-- 底部区域 -->
  <BottomNav />
</template>

<script>
import TopNav from '../components/top-nav.vue'
import TopHeader from '../../components/top-heater.vue'
import BottomNav from '../components/bottom-nav.vue'

export default {
  name: 'Layout',
  components: {
    TopNav,
    TopHeader,
    BottomNav
  }
}
</script>

<style>
</style>
