<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
    <template #right>
      <a @click="index=0" href="javascript:;" :class='{disabled: index===0}' class="iconfont icon-angle-left prev"></a>
      <a @click="index=1" href="javascript:;" :class='{disabled: index===1}' class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="box">
      <transition name="fade">
        <!-- 正常的数据 -->
        <ul v-if='result && result.length' class="list" :style='{transform: `translateX(${-index*1240}px)` }'>
          <li v-for="item in result" :key="item.id">
            <RouterLink to="/">
              <img v-lazyload="item.picture" alt="">
            </RouterLink>
          </li>
        </ul>
        <!-- 每有数据的时候临时显示骨架屏效果 -->
        <div class='skeleton' v-else>
          <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px" />
        </div>
      </transition>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-pannel.vue'
import { useLazyData } from '@/hook'
import { getBrandAPI } from '@/api'
import { ref } from 'vue'
// import { ref, computed } from 'vue'

export default {
  name: 'HomeBrand',
  components: {
    HomePanel
  },
  setup () {
    // 首页-热门品牌
    const { result, target } = useLazyData(() => getBrandAPI(10))
    // 当前的页的索引
    const index = ref(0)
    // 通过计算属性计算每页的数据
    // const list = computed(() => {
    //   return result.value.slice(index.value * 5, index.value * 5 + 5)
    // })

    return { target, index, result }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
