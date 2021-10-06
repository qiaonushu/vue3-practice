import { createRouter, createWebHashHistory } from 'vue-router'
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const FirstCate = () => import('@/views/category/first-category.vue')
const SecondCate = () => import('@/views/category/second-category.vue')
const Goods = () => import('@/views/goods')
const LoginCallback = () => import('@/views/login/callback.vue')
const Cart = () => import('@/views/cart/index.vue')
const PayCheckout = () => import('@/views/member/checkout.vue')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: FirstCate },
      { path: '/category/sub/:id', component: SecondCate },
      { path: '/product/:id', component: Goods }
    ]
  },
  { path: '/login', component: Login },
  { path: '/login/callback', component: LoginCallback },
  { path: '/cart', component: Cart },
  { path: '/member/checkout', component: PayCheckout }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
