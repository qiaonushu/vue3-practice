<template>
  <div class="goods-tabs">
    <nav>
      <a :class="{active:index===1}" href="javascript:;" @click="index=1">商品详情</a>
      <a :class="{active:index===0}" href="javascript:;" @click="index=0">商品评价<span>(500+)</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <GoodsComment v-show="index===0" />
    <GoodsDetail v-show="index===1" />
  </div>
</template>

<script>
import GoodsComment from './goods-comment.vue'
import GoodsDetail from './goods-detail.vue'
import { ref } from 'vue'

export default {
  name: 'GoodsTabs',
  components: {
    GoodsComment,
    GoodsDetail
  },
  setup () {
    // 声明变量控制tab栏显示
    const index = ref(1)

    return { index }
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
