<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="brand.length&&saleProperties.length">
    <!-- 品牌 -->
    <div class="item" v-for="item in brand" :key="item.id">
      <div class="head">品牌</div>
      <div class="body">
        <a href="javascript:;" @click="delete filterParams.brandId,delete state[item.id]" :class="{active:(state[item.id]||state.all)===0}">全部</a>
        <a href="javascript:;" @click="filterParams.brandId=item.id,state[item.id]=item.id" :class="{active:state[item.id]===item.id}"> {{item.name}} </a>
      </div>
    </div>
    <!-- 规格 -->
    <div class="item" v-for="item in saleProperties" :key="item.id">
      <div class="head"> {{item.name}} </div>
      <div class="body">
        <a href="javascript:;" @click="delete state[item.id]" :class="{active:(state[item.id]||state.all)===0}">全部</a>
        <a href="javascript:;" v-for="i in item.properties" :key="i.id" @click="filterParams.arttrs.push({groupName:item.name,propertyName:i.name}),state[item.id]=i.name" :class="{active:state[item.id]===i.name}"> {{i.name}} </a>
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
import { watch, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    // 控制类名显示
    const state = reactive({
      all: 0
    })
    // 选择的筛选条件
    const filterParams = reactive({
      // 规格数据
      arttrs: []
    })
    // 接收品牌数据
    const brand = ref([])
    // 接收规格数据
    const saleProperties = ref([])
    // 侦听id的变化发送请求
    watch(() => route.params.id, newval => {
      // 判断是不是二级分类
      if (route.path === `/category/sub/${newval}`) {
        // 发送请求并赋值
        getSubFilterAPI({ id: newval }).then(({ result }) => {
          brand.value = result.brands
          saleProperties.value = result.saleProperties
        })
      }
    }, {
      // 首次触发
      immediate: true
    })
    // 侦听state的变化收集数据传给父组件
    watch([filterParams, state], () => {
      // 循环规格数据，规格数据的信息在state中有一份，并且是最新的
      filterParams.arttrs.some((item, index, o) => {
        // 在state中找不到就证明不要这个规格了，就在规格数组中删除
        if (!(Object.values(state).find(i => i === item.propertyName))) {
          o.splice(index, 1)
        }
        return true
      })
      // 当数据发生变化向父组件传值
      emit('updateFilter', filterParams)
    })

    return { brand, saleProperties, state, filterParams }
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
