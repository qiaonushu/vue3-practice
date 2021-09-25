<template>
  <div class="xtx-numbox">
    <div class="label">
      <slot>数量</slot>
    </div>
    <div class="numbox">
      <a href="javascript:;" @click='handleSub'>-</a>
      <input type="text" readonly :value="modelValue">
      <a href="javascript:;" @click='handleAdd'>+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'

export default {
  name: 'XtxNumbox',
  props: {
    modelValue: {
      type: Number,
      default: 1
    },
    inventory: {
      type: Number,
      required: true
    }
  },
  setup (props, { emit }) {
    // 基于第三方方法实现父子组件的通信
    const num = useVModel(props, 'modelValue', emit)
    // 控制数量的减少
    const handleSub = () => {
      if (props.inventory === 0 || props.modelValue === 1) return
      // 更新父组件商品的数量
      // emit('update:modelValue', props.modelValue - 1)
      num.value -= 1
    }
    // 控制数量的增加
    const handleAdd = () => {
      if (props.inventory === 0 || props.modelValue >= props.inventory) return
      // 更新父组件商品的数量
      // emit('update:modelValue', props.modelValue + 1)
      num.value += 1
    }
    return { handleSub, handleAdd }
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
