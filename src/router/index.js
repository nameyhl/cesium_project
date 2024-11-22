//配置路由
import { createRouter, createWebHashHistory } from "vue-router";


const routes = [

    {
        name: 'home',
        path: '/',
        component: () => import('@/views/home/index.vue'),
        children: [{
            name: 'earth',
            path: '/earth',
            component: () => import('@/views/earth/index.vue')
        }
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router