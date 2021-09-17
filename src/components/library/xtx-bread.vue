<script>
// import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    // Vue2中h函数是render的形参
    // Vue3的h函数是按需导入的
    const slotContent = this.$slots.default().filter(item => typeof item.type !== 'symbol')
    // const slotContent = this.$slots.default().filter(item => item.type.name === 'XtxBreadItem')
    const children = []
    slotContent.forEach((item, i) => {
      // 添加单个面包屑组件
      children.push(item)
      if (i < slotContent.length - 1) {
        // 添加一个小箭头（最后一个不添加）
        // const iTag = h('i', { class: 'iconfont icon-angle-right' }, null)
        // children.push(iTag)
        children.push(<i className="iconfont icon-angle-right"></i>)
      }
    })
    // return h('div', { class: 'xtx-bread' }, children)
    return <div className='xtx-bread'>{children}</div>
  }
}
// JSX js的一种扩展（React）：就是在js中写HTML标签
// const info = <div>hello</div>
// const msg = 'abc'
// const info = (
//   <div>
//     <div className='active'>hello</div>
//     <div>{msg}</div>
//   </div>
// )
// function foo (tag) {
//   return (
//     <div>
//       <div>{tag}</div>
//       <div>tom</div>
//     </div>
//   )
// }
// const tag = foo(<div>hi</div>)
/**
 * <div>
      <div><div>hi</div></div>
      <div>tom</div>
    </div>
 */
</script>

<style scoped lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  :deep(&-item) {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  :deep(i) {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
