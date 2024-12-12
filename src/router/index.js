//配置路由
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    name: '',
    path: '/',
    component: () => import('../home.vue'),
    children: [
      {
        name: 'earth',
        path: '/earth',
        component: () => import('@/components/cesiumView.vue'),
      },
      {
        name: 'home',
        path: '/home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        name: 'test',
        path: '/test',
        component: () => import('@/views/test/index.vue'),
      }, 
      {
        name: 'threeJS',
        path: '/threeJS',
        component: () => import('@/views/threeJS/index.vue'),
      },
      {
        name: 'about',
        path: '/about',
        component: () => import('@/views/about/index.vue'),
      }, 
    ],  
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    name: 'registry',
    path: '/registry',
    component: () => import('@/views/registry/index.vue'),
  },
 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
