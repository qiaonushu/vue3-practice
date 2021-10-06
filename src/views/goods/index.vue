<template>
  <div class='xtx-goods-page'>
    <div class="container" v-if="JSON.stringify(detail)!=='{}'">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${detail.categories[1].id}`"> {{detail.categories[1].name}} </XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${detail.categories[0].id}`"> {{detail.categories[0].name}} </XtxBreadItem>
        <XtxBreadItem> {{detail.name}} </XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="detail.mainPictures" />
          <GoodsSales :sales="detail.brand" />
        </div>
        <div class="spec">
          <!-- 名字区组件 -->
          <GoodsName :goods="detail" />
          <!-- 规格组件 -->
          <GoodsSku @skuinventory="sku" :skus="detail.skus" :specs="detail.specs" />
          <XtxNumbox v-model="num" :inventory="detail.inventory"></XtxNumbox>
          <XtxButton type="primary" style="margin-top:20px;" @click="addCart(detail)">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="detail.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsTabs :Id="detail.id" />
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :timeSlot="1" :goodsId="detail.id" />
          <GoodsHot :timeSlot="2" :goodsId="detail.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 组件
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot.vue'
import GoodsWarn from './components/goods-warn.vue'
// api
import { getGoodsAPI } from '@/api'
// 按需导入
import { watch, ref, provide, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'GoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
    GoodsWarn
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const instance = getCurrentInstance()
    // 声明变量获取数据
    const detail = ref({})
    // skuId
    const skuval = ref('')
    // 数量
    const num = ref(1)
    // 侦听id的变化，判断是否详情页的URL，是就发送请求
    watch(() => route.params.id, newval => {
      if (route.path === `/product/${newval}`) {
        getGoodsAPI({ id: newval }).then(({ result }) => {
          detail.value = result
        })
      }
    }, {
      immediate: true
    })
    // 自定义事件，传入的val是否有值，没有数量组件无法使用
    const sku = val => {
      if (val) {
        skuval.value = detail.value.skus.find(item => item.id === val[0])
        console.log(skuval.value)
        detail.value.oldPrice = skuval.value.oldPrice
        detail.value.price = skuval.value.price
        detail.value.inventory = skuval.value.inventory
      } else {
        detail.value.inventory = 0
        skuval.value = ''
      }
    }
    // 直接把数据传递出去:评价
    provide('detail', detail)
    // 点击购物车按钮事件
    const addCart = (val) => {
      if (!skuval.value) {
        instance.proxy.$message({ text: '请选择规格', type: 'error' })
      } else {
        instance.proxy.$message({ text: '添加至购物车', type: 'success' })
        store.commit('cart/addList', {
          // 属性文字
          attrsText: skuval.value.specs.reduce((sum, item) => {
            sum += `${item.name}: ${item.valueName} `
            return sum
          }, ''),
          count: num.value,
          // 折扣信息
          discount: null,
          id: val.id,
          // 是否收藏
          isCollect: false,
          // 有效商品
          isEffective: true,
          name: val.name,
          nowOriginalprice: skuval.value.price,
          // 当前价格
          nowPrice: skuval.value.price,
          picture: val.mainPictures[0],
          postFee: '',
          // 加入时价格
          price: skuval.value.oldPrice,
          // 是否选中
          selected: true,
          skuId: skuval.value.id,
          // 库存
          stock: skuval.value.inventory
        })
      }
    }

    return { detail, num, sku, addCart }
  }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
