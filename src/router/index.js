//配置路由
import { ElMessage } from 'element-plus';
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
      {
        name: 'tools',
        path: '/tools',
        component: () => import('@/views/tools/index.vue'),
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
  {
    name: 'userInfo',
    path: '/userInfo',
    component: () => import('@/views/userInfo/index.vue'),
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 配置全局路由守卫

router.beforeEach((to, from, next) => {
  if(to.path === '/login' || to.path === '/registry') {
    next()
  } else {
    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''
    if(token) {
      next()
    } else {
      ElMessage.error('请先登录')
      next('/login')
    }
  }
})

export default router;
