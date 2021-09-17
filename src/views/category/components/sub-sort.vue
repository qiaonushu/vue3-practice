<template>
  <div class='sub-sort'>
    <div class="sort">
      <a href="javascript:;" @click="classShow" :class="{active:state==='默认排序'}">默认排序</a>
      <a href="javascript:;" @click="classShow" :class="{active:state==='最新商品'}">最新商品</a>
      <a href="javascript:;" @click="classShow" :class="{active:state==='最高人气'}">最高人气</a>
      <a href="javascript:;" @click="classShow" :class="{active:state==='评论最多'}">评论最多</a>
      <a href="javascript:;" @click="classShow">
        价格排序
        <i class="arrow up" :class="{active:state===1}" />
        <i class="arrow down" :class="{active:state===0}" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SubSort',
  setup () {
    const state = ref('默认排序')
    const classShow = (e) => {
      // if (e.target.innerText === '价格排序') {
      //   state.value === 0 ? state.value = 1 : state.value = 0
      // } else {
      //   state.value = e.target.innerText
      // }
      e.target.innerText === '价格排序'
        ? (state.value === 0 ? state.value = 1
          : state.value = 0) : state.value = e.target.innerText
    }
    // 是否有货
    const inventory = ref(false)
    // 是否打折
    const onlyDiscount = ref(false)

    return { classShow, state, inventory, onlyDiscount }
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
