<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
    <div style="position: relative;height: 426px;">
      <Transition name="fade">
        <ul v-if="goods.length" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img v-lazyload="item.picture" alt="">
              <p class="name">{{item.title}}</p>
              <p class="desc">{{item.alt}}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-pannel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hook'
import { getHotAPI } from '@/api'

export default {
  name: 'HomeHot',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    // 首页-人气推荐
    const { result: goods, target } = useLazyData(getHotAPI)

    return { goods, target }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
