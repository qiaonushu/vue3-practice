<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{active:isShow}">
      <span v-if='!fullLocation' class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <!-- 下拉弹层 -->
    <div class="option" v-show='isShow'>
      <!-- 数据的加载过程进行提示 -->
      <div class="loading" v-if='loading'></div>
      <template v-else>
        <span @click='changeCity(item)' class="ellipsis" v-for="item in cityList" :key="item.code">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
import { cityURL } from '@/utils/config.js'
// 获取省市区列表数据
// 添加缓存功能：存储到window对象中
const getCityList = async () => {
  if (window.cityList) {
    // 如果缓存中有数据，就直接从缓存获取即可，此时不需要再次调用接口
    return window.cityList
  }
  const ret = await axios.get(cityURL)
  if (ret.data) {
    // 把城市列表数据存储在缓存中（全局属性）
    window.cityList = ret.data
  }
  return ret.data
}

export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const isShow = ref(false)
    const loading = ref(false)
    // 城市列表原始数据
    const list = ref([])

    // 选中的省市区
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })

    // 选择城市操作
    const changeCity = (city) => {
      if (city.level === 0) {
        // 点击的省级单位
        changeResult.provinceCode = city.code
        changeResult.provinceName = city.name
      } else if (city.level === 1) {
        // 点击的市级单位
        changeResult.cityCode = city.code
        changeResult.cityName = city.name
      } else if (city.level === 2) {
        // 点击的县级单位:选中最终的省市区数据，并且传递给父组件
        changeResult.countyCode = city.code
        changeResult.countyName = city.name
        // 组合完整的省市区名称
        changeResult.fullLocation = `${changeResult.provinceName}${changeResult.cityName}${changeResult.countyName}`
        // 关闭碳层
        isShow.value = false
        // 把选中的数据最终传递给父组件
        emit('change-city', changeResult)
      }
    }

    // 通过计算属性计算当前显示的列表数据：省级；市级；县级
    const cityList = computed(() => {
      let result = list.value
      // 当前点击的是省，那么就计算市级列表
      if (changeResult.provinceCode && changeResult.provinceName) {
        result = result.find(item => item.code === changeResult.provinceCode).areaList
      }
      if (changeResult.cityCode && changeResult.cityName) {
        result = result.find(item => item.code === changeResult.cityCode).areaList
      }
      // 当前点击的是市，那么就计算县级列表
      return result
    })

    // 点击显示和隐藏弹层
    const toggle = () => {
      isShow.value = !isShow.value
      if (isShow.value) {
        loading.value = true
        // 调用接口之前，把之前选中的数据置空
        for (const key in changeResult) {
          changeResult[key] = ''
        }
        // 弹层显示了，调用接口
        getCityList().then(ret => {
          list.value = ret
          loading.value = false
        })
      }
    }
    // 控制点击区域外，隐藏弹层
    const target = ref(null)
    onClickOutside(target, () => {
      isShow.value = false
    })
    return { isShow, toggle, target, cityList, loading, changeCity }
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
