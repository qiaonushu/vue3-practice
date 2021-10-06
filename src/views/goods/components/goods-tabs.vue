<template>
  <div class="goods-tabs">
    <nav>
      <a :class="{active:componentName==='GoodsDetail'}" href="javascript:;" @click="componentName='GoodsDetail'">商品详情</a>
      <a :class="{active:componentName==='GoodsComment'}" href="javascript:;" @click="componentName='GoodsComment'">商品评价<span>{{commentList. evaluateCount}}</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <!-- <GoodsComment v-show="index===0" /> -->
    <!-- <GoodsDetail v-show="index===1" /> -->
    <!-- 基于动态组件控制组件的切换 -->
    <component :is='componentName'></component>
  </div>
</template>

<script>
import GoodsComment from './goods-comment.vue'
import GoodsDetail from './goods-detail.vue'
import { ref, watch, provide } from 'vue'
import { getGoodsEvaluateAPI } from '@/api'

export default {
  name: 'GoodsTabs',
  props: {
    Id: {
      type: String,
      required: true
    }
  },
  components: {
    GoodsComment,
    GoodsDetail
  },
  setup (props) {
    // 声明变量控制tab栏显示
    const componentName = ref('GoodsDetail')
    const commentList = ref([])
    // 商品的评价信息,修改返回数据
    const getEvaluate = (id) => {
      getGoodsEvaluateAPI(id).then(({ result }) => {
        if (result.hasPictureCount > 0) result.tags.unshift({ type: 'img', title: '有图', tagCount: result.hasPictureCount })
        // console.log(result)
        commentList.value = result
        commentList.value.id = id
      })
    }
    getEvaluate(props.Id)
    // 依赖注入 provide传出数值名，inject接收数值名
    watch(() => props.Id, () => {
      componentName.value = 'GoodsDetail'
      // 商品的评价信息,修改返回数据
      getEvaluate(props.Id)
    })
    // 依赖输入  传出
    provide('commentList', commentList)

    return { componentName, commentList }
  }
}
</script>

<style lang="less" scope>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
