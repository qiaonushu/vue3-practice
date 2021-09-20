<template>
  <div class='sub-sort'>
    <div class="sort">
      <a href="javascript:;" @click="classShow(null)" :class="{active:sortParams.sortField===null}">默认排序</a>
      <a href="javascript:;" @click="classShow('publishTime')" :class="{active:sortParams.sortField==='publishTime'}">最新商品</a>
      <a href="javascript:;" @click="classShow('orderNum')" :class="{active:sortParams.sortField==='orderNum'}">最高人气</a>
      <a href="javascript:;" @click="classShow('evaluateNum')" :class="{active:sortParams.sortField==='evaluateNum'}">评论最多</a>
      <a href="javascript:;" @click="classShow('price')">
        价格排序
        <i class="arrow up" :class="{active:sortParams.sortMethod==='asc'}" />
        <i class="arrow down" :class="{active:sortParams.sortMethod==='desc'}" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'

export default {
  name: 'SubSort',
  setup (props, { emit }) {
    const sortParams = reactive({
      // 排序的选项（根据什么排序）
      sortField: null,
      // 价格排序的顺序（价格的正序asc和反序desc）
      sortMethod: null,
      // 是否有货
      inventory: false,
      // 是否打折
      onlyDiscount: false
    })
    // 点击事件，传入字符串（排序的选项）
    const classShow = (str) => {
      // // 排序的选项（根据什么排序）
      sortParams.sortField = str
      // 点击价格排序，更改 价格排序的顺序（价格的正序asc和反序desc）
      str === 'price'
        ? (!sortParams.sortMethod || sortParams.sortMethod === 'asc' ? sortParams.sortMethod = 'desc' : sortParams.sortMethod = 'asc')
        : sortParams.sortField = str
      // 默认是重置所有数据
      if (!str) sortParams.sortMethod = null
    }
    // 侦听数据变化
    watch(sortParams, () => {
      // 把最新的排序相关信息传递给父组件
      emit('updateSort', sortParams)
    })

    return { classShow, sortParams }
  }
}
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
