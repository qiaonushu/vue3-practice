<template>
  <div class="goods-comment-image">
    <div class="list">
      <a href="javascript:;" :class="{active:index===item}" v-for="item in pictures" :key="item" @click="index=item">
        <img :src="item" alt="">
      </a>
    </div>
    <div class="preview" v-if="index">
      <img :src="index" alt="">
      <i class="iconfont icon-close-new" @click="index=''"></i>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'GoodsCommentImage',
  props: {
    pictures: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const index = ref(null)
    watch(index, () => {
      console.log(index.value)
    })

    return { index }
  }
}
</script>

<style scoped lang="less">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        border-color: @xtxColor;
      }
    }
  }
  .preview {
    width: 480px;
    height: 480px;
    border: 1px solid #e4e4e4;
    background: #f8f8f8;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    i {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
