<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to">
      <!-- 可以点击跳转 -->
      <slot />
    </RouterLink>
    <span v-else>
      <!-- 不可以跳转 -->
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      // to的值可以是字符串，也可以是对象
      type: [String, Object]
    }
  }
}
</script>
