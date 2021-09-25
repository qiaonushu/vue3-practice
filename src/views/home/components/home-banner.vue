<template>
  <div class="home-banner">
    <XtxCarousel :imgList='sliders' :autoPlay="true" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'HomeBanner',
  setup () {
    const store = useStore()
    const sliders = ref([])
    // 获取轮播图url
    store.dispatch('cate/getBanner').then(res => {
      sliders.value = res
    })

    return { sliders }
  }
}
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>
