<template>
  <div class='xtx-carousel' @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li class="carousel-item" v-for="item,i in imgList" :key="i" :class="{fade:index===i}">
        <RouterLink v-if="item.hrefUrl" :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
        <div v-else class="slider">
          <RouterLink v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt="">
            <p class="name ellipsis">{{goods.name}}</p>
            <p class="price">&yen;{{goods.price}}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(true)"><i class="iconfont icon-angle-left"></i></a>
    <a href="javascript:;" class="carousel-btn next" @click="toggle(false)"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span v-for="item,i in imgList" :key="i" :class="{active:index===i}"></span>
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'

export default {
  name: 'XtxCarousel',
  props: {
    // 图片的数组
    imgList: {
      type: Array,
      default: () => [
        { imgUrl: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/1ba86bcc-ae71-42a3-bc3e-37b662f7f07e.jpg' }
      ]
    },
    // 轮播时间设置
    duration: {
      type: Number,
      default: 3000
    },
    // 是否开启轮播
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    // index控制显示的图片
    const index = ref(0)
    // 声明变量接收定时器
    let timer = null
    const autoPlayFn = () => {
      // 提前清除一次定时器，防止定时器过多
      clearInterval(timer)
      // 创建定时器，使用传入的变量设置定时器时间
      timer = setInterval(() => {
        index.value += 1
        if (index.value >= props.imgList.length) index.value = 0
      }, props.duration)
    }
    // 鼠标进入事件
    const stop = () => {
      // 定时器是否开启，鼠标进入，停止轮播，清除定时器
      if (props.autoPlay) clearInterval(timer)
    }
    // 鼠标离开事件
    const start = () => {
      // 定时器是否开启，鼠标离开，开始轮播，调用函数
      if (props.autoPlay) autoPlayFn()
    }
    // 点击上一张下一张
    const toggle = (state) => {
      // 判断并设置index的值
      state ? index.value -= 1 : index.value += 1
      if (index.value >= props.imgList.length) index.value = 0
      if (index.value < 0) index.value = props.imgList.length - 1
    }
    // 判断是否要调用函数开启定时器
    if (props.autoPlay) autoPlayFn()
    // 组件消耗，清理定时器
    onUnmounted(() => {
      // 清除定时器
      clearInterval(timer)
    })

    return { index, stop, start, toggle }
  }
}
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
      // 轮播商品
      .slider {
        display: flex;
        justify-content: space-around;
        padding: 0 40px;
        > a {
          width: 240px;
          text-align: center;
          img {
            padding: 20px;
            width: 230px !important;
            height: 230px !important;
          }
          .name {
            font-size: 16px;
            color: #666;
            padding: 0 40px;
          }
          .price {
            font-size: 16px;
            color: @priceColor;
            margin-top: 15px;
          }
        }
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
