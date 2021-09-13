<template>
  <div>
    <!-- 左侧分类 -->
    <HomeLeft />
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
