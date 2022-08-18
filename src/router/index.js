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
  },
  {
    path: '/',
    // name: 'layout',
    /* 如果加载的是index 可以删略 下面的就是懒加载 */
    component: () => import('@/views/layout'),
    redirect: '/home', // 设置默认打开的页面
    children: [
      {
        path: '/home', // 默认子路由自能有一个不能有多个
        name: 'home',
        /* 如果加载的是index 可以删略 下面的就是懒加载 */
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        /* 如果加载的是index 可以删略 下面的就是懒加载 */
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        /* 如果加载的是index 可以删略 下面的就是懒加载 */
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        /* 如果加载的是index 可以删略 下面的就是懒加载 */
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    /* 如果加载的是index 可以删略 下面的就是懒加载 */
    component: () => import('@/views/search')
  },
  {
    path: '/article/:aticleId', // 动态路由随意
    name: 'article',
    /* 如果加载的是index 可以删略 下面的就是懒加载 */
    component: () => import('@/views/article'),
    props: true // 开启 Prop传参,说白了就是把路由参数映射到组件的porps的数据中 这样更加灵活
  }
]

const router = new VueRouter({
  routes
})

export default router
