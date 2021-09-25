<template>
  <div class="goods-hot">
    <h3> {{title}} </h3>
    <div v-if="list.length">
      <GoodsItem v-for="item in list" :key="item.id" :desc="item.desc" :price="item.price" :url="`/product/${item.id}`" :picture="item.picture" :name="item.name" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { getGoodsHotAPI } from '@/api'
import GoodsItem from '@/views/category/components/goods-item.vue'

export default {
  name: 'GoodsHot',
  props: {
    timeSlot: {
      type: Number,
      required: true
    },
    goodsId: {
      type: String,
      required: true
    }
  },
  components: { GoodsItem },
  setup (props) {
    // 热销榜类型
    const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    // 获取标题
    const title = computed(() => {
      return titleObj[props.timeSlot]
    })
    // 榜单
    const list = ref([])
    // 调用接口
    getGoodsHotAPI({ id: props.goodsId, limit: 3, type: props.timeSlot }).then(({ result }) => {
      list.value = result
    })

    return { list, title }
  }
}
</script>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
