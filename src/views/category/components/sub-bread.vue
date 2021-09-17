<template>
  <XtxBread v-if="cateInfo.id">
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <Transition name='fade-right' mode='out-in'>
      <XtxBreadItem :to="`/category/sub/${cateInfo.id}`"> {{cateInfo.name}} </XtxBreadItem>
    </Transition>
    <Transition name='fade-right' mode='out-in'>
      <XtxBreadItem> {{cateInfo.children.name}} </XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'SubBread',
  setup () {
    const store = useStore()
    const route = useRoute()
    const cateInfo = computed(() => {
      const info = {}
      store.state.cate.classify.filter(item => {
        if (item.children && item.children.some(i => i.id === route.params.id)) {
          info.name = item.name
          info.id = item.id
          info.children = item.children.find(i => i.id === route.params.id)
        }
      })
      return info
    })

    return { cateInfo }
  }
}
</script>
