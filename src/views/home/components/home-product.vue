<template>
  <div class="home-product" ref="target">
    <HomePanel v-for="item in result" :key="item.id" :title="item.name">
      <template #right>
        <div class="sub">
          <RouterLink to="/" v-for="i in item.children" :key="i.id"> {{i.name}} </RouterLink>
        </div>
        <XtxMore />
      </template>
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-lazyload="item.picture" alt="">
          <strong class="label">
            <span> {{item.name+'馆'}} </span>
            <span> {{item.saleInfo}} </span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="t in item.goods" :key="t.id">
            <HomeGoods :picture="t.picture" :desc="t.desc" :name="t.name" :price="t.price" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-pannel'
import HomeGoods from './home-goods'
import { useLazyData } from '@/hook'
import { getHomeGoodsAPI } from '@/api'

export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
  setup () {
    // 首页-产品区块
    const { result, target } = useLazyData(getHomeGoodsAPI)

    return { result, target }
  }
}
</script>

<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
