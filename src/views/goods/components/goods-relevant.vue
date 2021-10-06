<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{goodsId?'同类商品推荐':'猜你喜欢'}}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :imgList='list' :autoPlay="true" />
  </div>
</template>

<script>
import { getGoodsRelevantAPI } from '@/api'
import { ref } from 'vue'

export default {
  name: 'GoodsRelevant',
  props: {
    goodsId: {
      type: String
    }
  },
  setup (props) {
    // 声明常量接收数据
    const list = ref([])
    // 传参设定，要几条数据
    const limit = ref(1000)
    // 接收返回数组的长度
    const length = ref(0)
    // 声明一个函数，调用接口
    const getRelevant = () => {
      getGoodsRelevantAPI({ id: props.goodsId, limit: limit.value }).then(({ result }) => {
        length.value = result.length
        // 四条数据为一组展示
        for (let i = 0; i <= result.length; i += 4) {
          list.value.push(result.slice(i, i + 4))
        }
      })
    }
    getRelevant()
    // 如果返回数组的长度大于要获取的条数，修改条数重新调用接口
    if (length.value && limit.value < length.value) {
      limit.value += 1000
      getRelevant()
    }

    return { list }
  }
}
</script>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  :deep(.xtx-carousel) {
    height: 380px;
    .carousel {
      &-indicator {
        bottom: 30px;
        span {
          &.active {
            background: @xtxColor;
          }
        }
      }
      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;
        i {
          font-size: 30px;
        }
      }
    }
  }
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
</style>
