<template>
  <div class="page-home">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeLeft />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
  </div>
</template>

<script>
import HomeLeft from './components/home-cate.vue'
import HomeBanner from './components/home-banner.vue'

export default {
  name: 'Home',
  components: {
    HomeLeft,
    HomeBanner
  },
  setup () {
    return {}
  }
}
</script>

<style scoped lang='less'>
.xtx-home-page {
  .container {
    width: 1240px;
    margin: 0 auto;
    position: relative;
  }
}
</style>
