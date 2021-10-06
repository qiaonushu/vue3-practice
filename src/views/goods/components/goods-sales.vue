<template>
  <ul class="goods-sales">
    <li>
      <p>销量人气orderNum</p>
      <p>200+</p>
      <p><i class="iconfont icon-task-filling"></i><a href="javascript:;">销量人气</a></p>
    </li>
    <li>
      <p>商品评价 commentCount</p>
      <p>400+</p>
      <p><i class="iconfont icon-comment-filling"></i><a href="javascript:;">查看评价</a></p>
    </li>
    <li>
      <p>收藏人气collectCount</p>
      <p>600+</p>
      <p><i class="iconfont icon-favorite-filling"></i><a href="javascript:;">收藏商品</a></p>
    </li>
    <li>
      <p>品牌信息</p>
      <p> {{sales.name}} </p>
      <p><i class="iconfont icon-dynamic-filling"></i><a href="javascript:;">品牌主页</a></p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'GoodsSales',
  props: {
    sales: {
      type: Object,
      default: () => { }
    }
  }
}
</script>

<style scoped lang='less'>
.goods-sales {
  display: flex;
  width: 400px;
  align-items: center;
  text-align: center;
  height: 140px;
  li {
    flex: 1;
    position: relative;
    ~ li::after {
      position: absolute;
      top: 10px;
      left: 0;
      height: 60px;
      border-left: 1px solid #e4e4e4;
      content: "";
    }
    p {
      &:first-child {
        color: #999;
      }
      &:nth-child(2) {
        color: @priceColor;
        margin-top: 10px;
      }
      &:last-child {
        color: #666;
        margin-top: 10px;
        i {
          color: @xtxColor;
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
