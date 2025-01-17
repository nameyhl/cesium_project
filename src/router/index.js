//配置路由
import { ElMessage } from "element-plus";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "",
    path: "/",
    redirect: "/home",
    component: () => import("../home.vue"),
    children: [
      {
        name: "earth",
        path: "/earth",
        component: () => import("@/components/cesiumView.vue"),
      },
      {
        name: "home",
        path: "/home",
        component: () => import("@/views/home/index.vue"),
      },
      {
        name: "threeJS",
        path: "/threeJS",
        component: () => import("@/views/threeJS/index.vue"),
      },
      {
        name: "about",
        path: "/about",
        component: () => import("@/views/about/index.vue"),
      },
      {
        name: "tools",
        path: "/tools",
        component: () => import("@/views/tools/index.vue"),
      },
      {
        name: "applyFriend",
        path: "/applyFriend",
        component: () => import("@/views/applyFriend/index.vue"),
      },
      {
        name: "littleGame",
        path: "/littleGame",
        component: () => import("@/views/littleGame/index.vue"),
      },
      {
        name: "forum",
        path: "/forum",
        component: () => import("@/views/forum/index.vue"),
      },
      {
        name: "articel",
        path: "/articel",
        component: () => import("@/views/articel/index.vue"),
      },
      {
        name: "author",
        path: "/author",
        component: () => import("@/views/author/index.vue"),
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    name: "adminLogin",
    path: "/adminLogin",
    component: () => import("@/views/adminLogin/index.vue"),
  },
  {
    name: "registry",
    path: "/registry",
    component: () => import("@/views/registry/index.vue"),
  },
  {
    name: "userInfo",
    path: "/userInfo",
    component: () => import("@/views/userInfo/index.vue"),
  },
  {
    name: "addArticle",
    path: "/addArticle",
    component: () => import("@/views/addArticle/index.vue"),
  },
  {
    name: "manage",
    path: "/manage",
    component: () => import("@/views/manage/home.vue"),
    children: [
      {
        name: "classify",
        path: "/manage/classify",
        component: () => import("@/views/manage/classify/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 配置全局路由守卫

router.beforeEach((to, from, next) => {
  if (
    to.path === "/login" ||
    to.path === "/registry" ||
    to.path === "/adminLogin"
  ) {
    next();
  } else {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    if (token) {
      next();
    } else {
      ElMessage.error("请先登录");
      next("/login");
    }
  }
});

export default router;
