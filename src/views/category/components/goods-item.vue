<template>
  <RouterLink :to="url" class='goods-item'>
    <img v-lazyload="picture" alt="">
    <p class="name ellipsis"> {{name}} </p>
    <p class="desc ellipsis"> {{desc}} </p>
    <p class="price">&yen; {{price}} </p>
  </RouterLink>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    url: {
      type: String,
      default: '/'
    },
    picture: {
      type: String,
      default: 'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/fresh_goods_2.jpg'
    },
    name: {
      type: String,
      default: '红功夫 麻辣小龙虾 19.99/500g 实惠到家'
    },
    desc: {
      type: String,
      default: '火锅食材'
    },
    price: {
      type: String,
      default: '19.99'
    }
  }
}
</script>

<style scoped lang='less'>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>
