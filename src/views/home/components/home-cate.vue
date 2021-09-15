<template>
  <div class='home-category'>
    <ul class="menu">
      <li v-for="item in store.getters['cate/cateClassify']" :key="item.id" @mouseenter="categoryGoods=item.goods">
        <RouterLink to="/">{{item.name}}</RouterLink>
        <template v-if="item.children">
          <RouterLink to="/" v-for="i in item.children" :key="i.id">{{i.name}}</RouterLink>
        </template>
        <span v-else>
          <XtxSkeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </span>
      </li>
      <li v-if="store.getters['cate/cateClassify']" @mouseenter="brandstate=true" @mouseleave="brandstate=false">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">品牌推荐</RouterLink>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4> 分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul>
        <li v-for="item in categoryGoods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="desc ellipsis">{{item.desc}}</p>
              <p class="price"><i>¥</i>{{item.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="layer" v-if="brandstate">
      <h4>品牌推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <!-- 品牌数据 -->
      <ul>
        <li class="brand" v-for="item in brand" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{item.place}}</p>
              <p class="name ellipsis">{{item.name}}</p>
              <p class="desc ellipsis-2">{{item.desc}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'HomeCategory',
  setup () {
    // 实例store，vuex
    const store = useStore()
    // 当前鼠标悬停的分类的goods
    const categoryGoods = ref('')
    // 获取品牌弹窗内容
    const brand = ref(null)
    store.dispatch('cate/getBrand').then(res => {
      brand.value = res
    })
    // 进入品牌选项的状态
    const brandstate = ref(0)

    return { store, categoryGoods, brand, brandstate }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      .xtx-skeleton {
        animation: fade 1s linear infinite alternate;
      }
      @keyframes fade {
        from {
          opacity: 0.2;
        }
        to {
          opacity: 1;
        }
      }
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    li.brand {
      height: 180px;
      a {
        align-items: flex-start;
        img {
          width: 120px;
          height: 160px;
        }
        .info {
          p {
            margin-top: 8px;
          }
          .place {
            color: #999;
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
