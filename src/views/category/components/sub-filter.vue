<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterParams.length">
    <div class="item" v-for="t in filterParams" :key="t">
      <div class="head"> {{t.name}} </div>
      <div class="body">
        <a href="javascript:;" @click="state='all'" :class="{active:state==='all'}">全部</a>
        <a href="javascript:;" v-for="i in t.properties" :key="i.id" @click="state=i.id" :class="{active:state===i.id}"> {{i.name}} </a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>

<script>
import { getSubFilterAPI } from '@/api'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'SubFilter',
  setup () {
    const route = useRoute()
    const filterParams = ref([])
    const state = ref('all')
    watch(() => route.params.id, newval => {
      if (route.path === `/category/sub/${newval}`) {
        getSubFilterAPI({ id: newval }).then(({ result }) => {
          filterParams.value = [
            { name: '品牌', properties: result.brands },
            { ...result.saleProperties[0] }
          ]
        })
      }
    }, {
      immediate: true
    })

    return { filterParams, state }
  }
}
</script>

<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
.xtx-skeleton {
  padding: 10px 0;
}
</style>
