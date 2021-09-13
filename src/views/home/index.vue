<template>
  <div class="page-home">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeLeft />
    </div>
  </div>
</template>

<script>
import HomeLeft from './components/home-cate.vue'

export default {
  name: 'Home',
  components: {
    HomeLeft
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
