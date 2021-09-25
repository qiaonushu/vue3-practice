<template>
  <p class="g-name"> {{goods.name}} </p>
  <p class="g-desc"> {{goods.desc}} </p>
  <p class="g-price">
    <span> {{goods.price}} </span>
    <span> {{goods.oldPrice}} </span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至 &nbsp;</dd>
      <dd>
        <XtxCity @change-city='changeCity' :fullLocation='fullLocation' />
      </dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'GoodName',
  props: {
    goods: {
      type: Object,
      default: () => {
        return {
          name: '2件装 粉釉花瓣心意点缀 点心盘*2 碟子盘子',
          desc: '花瓣造型干净简约 多功能使用堆叠方便',
          price: '108.00',
          oldPrice: '199.00'
        }
      }
    }
  },
  setup () {
    // 传给城市组件的选择的最终值
    const fullLocation = ref('')
    // 城市组件自定义事件
    const changeCity = value => {
      fullLocation.value = value.fullLocation
    }

    return { changeCity, fullLocation }
  }
}
</script>

<style lang="less" scoped>
.g-name {
  font-size: 22px;
}
.g-desc {
  color: #999;
  margin-top: 10px;
}
.g-price {
  margin-top: 10px;
  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: "•";
            color: @xtxColor;
            margin-right: 2px;
          }
        }
        a {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
