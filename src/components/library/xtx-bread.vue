<template>
  <div class='xtx-bread'>
    <div class="xtx-bread-item">
      <RouterLink to="/">首页</RouterLink>
    </div>
    <i class="iconfont icon-angle-right"></i>
    <div class="xtx-bread-item" v-if="parentName">
      <RouterLink v-if="parentPath" :to="parentPath">{{parentName}}</RouterLink>
      <span v-else>{{parentName}}</span>
    </div>
    <i v-if="parentName" class="iconfont icon-angle-right"></i>
    <div class="xtx-bread-item">
      <span>
        <slot />
      </span>
    </div>
  </div>
</template>

<script>
// import { h } from 'vue'

export default {
  name: 'XtxBread',
  props: {
    parentName: {
      type: String,
      default: ''
    },
    parentPath: {
      type: String,
      default: ''
    }
  },
  render () {
    // 用法
    // 1. template 标签去除，单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2.0 的h函数传参进来的，vue3.0 的h函数导入进来
    // 4. h 第一个参数 标签名字  第二个参数 标签属性对象  第三个参数 子节点
    // 需求
    // 1. 创建xtx-bread父容器
    // 2. 获取默认插槽内容
    // 3. 去除xtx-bread-item组件的i标签，因该由render函数来组织
    // 4. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 5. 把动态创建的节点渲染再xtx-bread标签中
    // const items = this.$slots.default()
    // const dymanicItems = []
    // items.forEach((item, i) => {
    //   dymanicItems.push(item)
    //   if (i < (items.length - 1)) {
    //     dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
    //   }
    // })
    // return h('div', { class: 'xtx-bread' }, dymanicItems)
    // vue2的render函数的形参是 h 函数
    // vue3中h函数是导入的
    // createElement(标签名称, 标签的属性, 标签的子元素)
    // console.dir(this.$slots.default())
    // 获取XtxBread组件的所有的插槽里面填充组件实例
    const items = this.$slots.default()
    const results = []
    items.forEach((item, index) => {
      results.push(item)
      // 手动生成一个i图标，添加到面包屑项目的后面
      // const iTag = h('i', { class: 'iconfont icon-angle-right' })
      if (index < items.length - 1) {
        // results.push(iTag)
        results.push(<i class='iconfont icon-angle-right'></i>)
      }
    })
    // div的子节点应该动态生成：更加插槽的内容动态生成
    // return h('div', { class: 'xtx-bread' }, results)
    return <div class='xtx-bread'>{results}</div>
  }
}
</script>

<style lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
