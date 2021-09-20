<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @updateFilter="setFilter" />
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @updateSort="setSort" />
        <!-- 列表 -->
        <ul>
          <li v-for="item in list" :key="item.id">
            <GoodsItem :picture="item.picture" :name="item.name" :desc="item.desc" :price="item.price" />
          </li>
        </ul>
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getGoods" />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { postCategorystGoodsAPI } from '@/api'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    const route = useRoute()
    // 加载更多，为true停止触发自定义事件
    const loading = ref(false)
    // 没有更多，为true停止触发自定义事件
    const finished = ref(false)
    // 声明变量，接收数据
    const list = ref([])
    // 总数据条数，判断条件，二选一
    const count = ref(0)
    // 总页数，判断条件，二选一
    const pages = ref(0)
    // 当前页码值，每页获取条数,id:id是响应式的，因为值会变化要重新赋值
    const reqParams = ref({
      id: route.params.id,
      pageSize: 10,
      page: 1
    })
    // 调用接口
    const getGoods = () => {
      // 发送请求时为true
      loading.value = true
      postCategorystGoodsAPI(reqParams.value).then(({ result }) => {
        // 两个判断条件二选一，当前页===总页数，因为page++所以要写在最开始
        // 加载完全数据，为true
        if (reqParams.value.page === pages.value) finished.value = true
        // 请求完成后为false
        loading.value = false
        // 拼接数组，组成最新数据
        list.value = [...list.value, ...result.items]
        count.value = result.counts
        // 当前页码值
        reqParams.value.page = result.page
        // 每页显示条数
        reqParams.value.pageSize = result.pageSize
        // 总页码值
        pages.value = result.pages
        // 页码值自增1
        reqParams.value.page++
        // 两个判断条件二选一，获取到的数据数组长度===总数据条数
        if (list.value.length === count.value) finished.value = true
      })
    }
    // 侦听id的变化，重新发送请求
    watch(() => route.params.id, newval => {
      if (route.path === `/category/sub/${newval}`) {
        // 给id赋值
        reqParams.value.id = newval
        // 清空数据数组
        list.value = []
        // 没有更多，重置为false
        finished.value = false
        // 重新发送请求
        getGoods()
      }
    })
    // 筛选条件自定义事件
    const setSort = value => {
      // Object.values(value)生成value值的数组，循环是否有值，有值就添加，没值就删除
      // Object.values(value)，Object.keys(value)是对应的相同的index对应value的一组键值对
      Object.values(value).forEach((item, index) => {
        if (item) {
          reqParams.value[Object.keys(value)[index]] = item
        } else {
          delete reqParams.value[Object.keys(value)[index]]
        }
      })
      // 重置page页码值
      reqParams.value.page = 1
      // 清空数据数组
      list.value = []
      // 没有更多，重置为false
      finished.value = false
      // 调用接口
      getGoods()
    }
    const setFilter = value => {
      // 判断value的keys数组是否只有arttrs，并且arttrs是空数组证明没有筛选条件reqParams.value不变否则复制value
      Object.keys(value).length === 1 && Object.keys(value)[0] === 'arttrs' && value.arttrs.length === 0
        ? reqParams.value = {
          id: route.params.id,
          pageSize: 10,
          page: 1
        }
        : Object.assign(reqParams.value, value) // Object.assign方法的作用：（复制对象的第一层属性和值）
      // 重置page页码值
      reqParams.value.page = 1
      // 清空数据数组
      list.value = []
      // 没有更多，重置为false
      finished.value = false
      // 调用接口
      getGoods()
    }

    return { loading, finished, getGoods, list, setSort, setFilter }
  }
}
</script>

<style lang="less" scope>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
