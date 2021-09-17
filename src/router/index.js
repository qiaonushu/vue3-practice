import { createRouter, createWebHashHistory } from 'vue-router'
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const FirstCate = () => import('@/views/category/first-category.vue')
const SecondCate = () => import('@/views/category/second-category.vue')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: FirstCate },
      { path: '/category/sub/:id', component: SecondCate }
    ]
  },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
