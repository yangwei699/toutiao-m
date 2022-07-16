import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    /* 如果加载的是index 可以删略 下面的就是懒加载 */
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
