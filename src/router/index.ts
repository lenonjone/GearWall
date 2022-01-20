import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { autoRouters,dynamicRouters } from '../services/global'

//路由信息
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/_main/frame.vue')
  },


  ...autoRouters(),
]

// 导出路由
const router = createRouter({
  history: createWebHistory(),
  routes
});

dynamicRouters(router)

export default router
