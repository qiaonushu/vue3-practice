<template>
  <div class="xtx-pagination">
    <a href="javascript:;" :class="{disabled:num===1}" @click="previousPage">上一页</a>
    <span v-if="pages>5&&num>=4">...</span>
    <a href="javascript:;" v-for="i in PageCount" :key="i" @click="num=i" :class="{active:num===i}"> {{i}} </a>
    <span v-if="pages>5&&num<=pages-3">...</span>
    <a href="javascript:;" :class="{disabled:num===pages}" @click="nextPage">下一页</a>
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue'

export default {
  name: 'XtxPagination',
  props: {
    pages: {
      type: [Number, String],
      default: 5
    },
    page: {
      type: [Number, String],
      default: 1
    }
  },
  setup (props, { emit }) {
    // 声明一个常量接收当前点击按钮的数值，并操控类名
    const num = ref(+props.page)
    watch(num, () => {
      emit('page-change', num.value)
    })
    // 获取的总页码值转换
    const PageCount = computed(() => {
      // 转为数字数据类型
      const pages = +props.pages
      // 只显示五个按钮，判断总按钮数是否>5
      if (pages > 5) {
        // 声明一个总数组，从中截取返回需要显示的按钮数组
        const arr = []
        for (let i = 1; i <= pages; i++) {
          arr.push(i)
        }
        // 需要显示的页码值：[num-1,num-1,num,num+1,num+1]
        // 需要显示的页码值的索引[num-3,num-2,num-1,num,num+1]
        if (num.value <= 3) {
          // num < 3时截取开头五个数据
          return arr.slice(0, 5)
        } else if (num.value >= pages - 2) {
          // num >= pages-2时截取最后五个数据
          return arr.slice(pages - 5, pages)
        } else {
          // 中间的数据
          return arr.slice(num.value - 3, num.value + 2)
        }
      } else {
        // pages < 5 直接渲染
        return pages
      }
    })
    // 点击上一页按钮
    const previousPage = () => {
      if (num.value === 1) return
      num.value--
    }
    // 点击下一页按钮
    const nextPage = () => {
      if (num.value === PageCount.value) return
      num.value++
    }

    return { previousPage, nextPage, num, PageCount }
  }
}
</script>

<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
