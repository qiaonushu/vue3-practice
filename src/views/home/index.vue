<template>
  <div class="page-home">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeLeft />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
    <!-- 新鲜好物 -->
    <HomeNew />
    <!-- 人气推荐 -->
    <HomeHot />
    <!-- 热门品牌 -->
    <HomeBrand />
    <!-- 商品区域 -->
    <HomeProduct />
    <!-- 最新专题 -->
    <HomeSpecial />
  </div>
</template>

<script>
import HomeLeft from './components/home-cate.vue'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'
import HomeProduct from './components/home-product.vue'
import HomeSpecial from './components/home-special.vue'

export default {
  name: 'Home',
  components: {
    HomeLeft,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
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
