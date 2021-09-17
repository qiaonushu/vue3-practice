<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱" ref="target">
    <template #right>
      <XtxMore :path="'/'" />
    </template>
    <div style="position: relative;height: 406px;">
      <Transition name="fade">
        <!-- 面板内容 -->
        <ul v-if="goods.length" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink :to="'/'">
              <img v-lazyload="item.picture" alt="">
              <p class="name ellipsis">{{item.name}}</p>
              <p class="price">&yen;{{item.price}}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton bg="#f0f9f4" v-else />
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-pannel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hook'
import { getNewAPI } from '@/api'

export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    // 首页-新鲜好物
    const { result: goods, target } = useLazyData(getNewAPI)

    return { goods, target }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
