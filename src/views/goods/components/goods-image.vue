<template>
  <div class="goods-image">
    <div class="large" v-show="show" :style="[{backgroundImage:`url(${imgURL})`},{backgroundPosition:`-${divPosition.left*2}px -${divPosition.top*2}px`}]"></div>
    <div class="middle" ref="target">
      <img :src="imgURL">
      <!-- <div class="layer" v-show="show" :style="`top:${divPosition.top+'px'};left:${divPosition.left+'px'}`"></div> -->
      <div class="layer" v-show="show" :style="[{top:`${divPosition.top}px`},{left:`${divPosition.left}px`}]"></div>
    </div>
    <ul class="small">
      <li v-for="(item,index) in images" :key="index" @mouseenter="imgURL=item" :class="{active:imgURL===item}">
        <img :src="item" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch, reactive } from 'vue'
import { useMouseInElement } from '@vueuse/core'

export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    // 声明给一个变量，接收当前鼠标进入小图片的url
    const imgURL = ref(props.images[0])
    // 声明变量控制盒子的显示与隐藏
    const show = ref(false)
    // 要监听的元素范围
    const target = ref(null)
    // 遮罩层的定位
    const divPosition = reactive({
      top: 0,
      left: 0
    })
    // vueuse提供的监听进入指定范围方法的基本使用
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    // 鼠标移动事件
    watch([isOutside, elementY, elementX], () => {
      show.value = !isOutside.value
      if (!isOutside.value) {
        if (elementX.value < 100) {
          // 左侧
          divPosition.left = 0
        } else if (elementX.value > 300) {
          // 右侧
          divPosition.left = 200
        } else {
          // 中间
          divPosition.left = elementX.value - 100
        }
        // Y方向坐标范围控制
        if (elementY.value < 100) {
          // 左侧
          divPosition.top = 0
        } else if (elementY.value > 300) {
          // 右侧
          divPosition.top = 200
        } else {
          // 中间
          divPosition.top = elementY.value - 100
        }
      }
    }, {
      deep: true
    })

    return { imgURL, show, target, divPosition }
  }
}
</script>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
