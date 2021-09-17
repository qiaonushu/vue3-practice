<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :to="`/category/${firstCategory.id}`">{{firstCategory.name}}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :imgList="sliders" :autoPlay="true" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in firstCategory.children" :key="item.id">
            <a href="javascript:;">
              <img v-lazyload="item.picture">
              <p> {{item.name}} </p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="item in firstCategory.children" :key="item.id">
        <div class="head">
          <h3>- {{item.name}} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="i in item.goods" :key="i.id" :picture="i.picture" :name="i.name" :desc="i.desc" :price="i.price" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { getGoodsAPI } from '@/api'
import GoodsItem from './components/goods-item.vue'

export default {
  name: 'TopCategory',
  components: {
    GoodsItem
  },
  setup () {
    // 轮播图
    const sliders = ref([])
    const store = useStore()
    store.dispatch('cate/getBanner').then(res => {
      sliders.value = res
    })
    // 获取动态传入的Id实现一级分类的跳转，并找到一级分类的name
    const route = useRoute()
    const firstCategory = ref('')
    // 侦听url的变化获取到最新Id并赋值
    watch(() => route.params.id, (newval) => {
      if (route.path === `/category/${newval}` && newval.length > 1) {
        getGoodsAPI({ id: route.params.id }).then(({ result }) => {
          firstCategory.value = result
        })
      } else {
        firstCategory.value = store.state.cate.classify.find(item => item.id === newval)
      }
    }, {
      immediate: true
    })

    return { sliders, firstCategory }
  }
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
