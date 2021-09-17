<template>
  <div class="xtx-checkbox" @click="checked = !checked">
    <!-- 选中的图标 -->
    <i v-if="checked" class="iconfont icon-checked"></i>
    <!-- 没有选中的图标 -->
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 复选框后面的文字 -->
    <span v-if="$slots.default">
      <slot />
    </span>
  </div>
</template>
<script>
// import { toRef } from 'vue'
import { useVModel } from '@vueuse/core'

export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 获取父组件传递过来的modelValue的值
    const checked = useVModel(props, 'modelValue', emit)

    return { checked }
  }
  // setup (props, { emit }) {
  //   // 父组件将原始的状态值传递给子组件并且保证响应式能力
  //   const checked = toRef(props, 'modelValue')
  //   const toggleSelect = () => {
  //     // checked.value = !checked.value
  //     // 修改父组件中的modelValue的值
  //     emit('update:modelValue', !checked.value)
  //   }
  //   return { checked, toggleSelect }
  // }
}
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
