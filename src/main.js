import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入并配置UI组件库
import XtxUI from '@/components/library'
// 导入重置样式包
import 'normalize.css'
// 导入公共样式
import '@/styles/common.less'

// 插件的使用，在main.js使用app.use(插件)
createApp(App)
  .use(XtxUI)
  .use(store)
  .use(router)
  .mount('#app')
