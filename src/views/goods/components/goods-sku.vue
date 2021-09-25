<template>
  <div class="goods-sku">
    <dl v-for="item,d in specs" :key="d">
      <dt> {{item.name}} </dt>
      <dd>
        <template v-for="i,n in item.values" :key="n">
          <img v-if="i.picture" :class="{selected:i.selected,disabled:i.disabled}" :src="i.picture" @click="toggle(i,item.values)">
          <span v-else :class="{selected:i.selected,disabled:i.disabled}" @click="toggle(i,item.values)">
            {{i.name}}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script>
import powerSet from '@/vendor/power-set.js'
import { ref } from 'vue'

// 声明一个分隔符
const sp = '/'
// // 生成路径字典
const usePathMap = skus => {
  // 声明一个返回值
  // 根据特定条件（选定规格名称valueName）查询，规格一/规格二
  const result = {}
  // 循环所有可选项
  skus.forEach(sku => {
    // 过滤掉无效sku数据
    if (sku.inventory === 0) return
    // 获取选项中的规格，例：[规格一，规格二]
    const spec = sku.specs.map(item => item.valueName)
    // 过滤空数组
    // powerSet(spec)返回值[规格一],[规格一，规格二],[规格二]
    const specSet = powerSet(spec).filter(item => item.length > 0)
    // 遍历拼接数组，形成规格条件{规格一:value,规格二:value,规格一/规格二:value}
    specSet.forEach(item => {
      // 规格条件
      const key = item.join(sp)
      // 路径字典对象中是否有当前拼接好的key
      result[key]
        ? result[key].push(sku.id)// 有，在数组中添加当前sku对象的id
        : result[key] = [sku.id]// 没有，key值是一个数组，里边放当前sku对象的id
    })
  })
  // 返回路径字典对象
  return result
}
// 获取选中的所有规格的值,拼接数组，形成规格条件
const getSelectedValues = specs => {
  // 使用map方法返回一个与当前索引一致的数组
  const result = specs.map(item => {
    // 获取selected：true的values中的对象
    const data = item.values.find(i => i.selected)
    // 返回{}/undefined，判断返回值，将name返回
    if (data) {
      return data.name
    }
  })
  // 返回选中的所有规格数组
  return result
}
// 禁用效果给specs.values的每一项加disabled：true/false
// 控制规格标签是否被禁用
const updateDisabledStatus = (pm, ps) => {
  // 循环所有规格分类数组
  ps.forEach((item, index) => {
    // 获取选中的规格数组
    const condition = getSelectedValues(ps)
    // 循环所有规格分类
    item.values.forEach(i => {
      // 因为会有相同规格名称下不属于当前分类的情况出现
      // 如果选中当前i就return，禁用的i会解除禁用
      if (i.selected) {
        // ["黄色", undefined, undefined, undefined] "黄色"
        return
      } else {
        // 当前规格下的分类不会被禁用
        condition[index] = i.name
        // condition[index] = i.name
        // ["粉色", undefined, undefined, undefined] "粉色"
        // ["深灰", undefined, undefined, undefined] "深灰"
        // ["黄色", "100cm", undefined, undefined] "100cm"
        // ["黄色", "110cm", undefined, undefined] "110cm"
        // ["黄色", "120cm", undefined, undefined] "120cm"
        // ["黄色", "80cm", undefined, undefined] "80cm"
        // ["黄色", "90cm", undefined, undefined] "90cm"
        // ["黄色", undefined, "黄色", undefined] "黄色"
        // ["黄色", undefined, "粉色", undefined] "粉色"
        // ["黄色", undefined, "深灰", undefined] "深灰"
        // ["黄色", undefined, undefined, "100cm"] "100cm"
        // ["黄色", undefined, undefined, "110cm"] "110cm"
        // ["黄色", undefined, undefined, "120cm"] "120cm"
        // ["黄色", undefined, undefined, "80cm"] "80cm"
        // ["黄色", undefined, undefined, "90cm"] "90cm"
        const path = condition.filter(item => item).join(sp)
        i.disabled = !pm[path]
      }
    })
  })
}

export default {
  name: 'GoodsSku',
  props: {
    skus: {
      type: Array,
      default: () => []
    },
    specs: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    // pathMap <---> 路径字典对象
    const pathMap = usePathMap(props.skus)
    // 组件初始化的时候更新禁用状态
    updateDisabledStatus(pathMap, props.specs)
    // 点击事件
    const toggle = (i, value) => {
      // 如果是禁用状态不作为
      if (i.disabled) return
      // 控制当前选中类名
      i.selected = !i.selected
      // 循环数组把没有被选中的类名去掉
      value.forEach(item => {
        if (item !== i) {
          item.selected = false
        }
      })
      // 需要禁用的按钮
      updateDisabledStatus(pathMap, props.specs)
      // 声明一个常量接收点击后获得的skuId
      const skuId = ref([])
      // 获取skuId
      skuId.value = pathMap[getSelectedValues(props.specs).join(sp)]
      // 传给父组件，当点击规格时传给父组件
      emit('skuinventory', skuId.value)
    }
    return { toggle, pathMap }
  }
}
</script>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      display: flex;
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
