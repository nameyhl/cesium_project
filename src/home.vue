<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 引入userInfoStore
import { useUserInfoStore } from './store/userStore/index'
const userStore = useUserInfoStore();

const username = userStore.username;

const menuTag = reactive([
    { name: '首页', index: '/home' },
    // { name: '地图', index: '/earth' },
    { name: '论坛', index: '/forum' },
    { name: '聊天', index: '/about' },
    { name: 'AI聊天工具', index: '/tools' },
    { name: '添加书友', index: '/applyFriend' },
    { name: '沉淀', index: '/littleGame' },
])
const activeIndex = ref('1')
menuTag.forEach(item => {
    if (item.index === route.path) {
        activeIndex.value = item.index;
    }
})
const goTo = (key) => {
    router.push(key);
}

const logOut = () => {
    localStorage.removeItem('userInfo');
    router.push('/login');
}
const toUserINfo = () => {
    router.push('/userInfo');
}

const addArticle = () => {
    router.push('/addArticle')
}
</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
                    <el-menu-item v-for="item in menuTag" :index="item.index" :key="item.index" @click="goTo(item.index)">{{ item.name
                        }}</el-menu-item>
                    <el-sub-menu style="float: right;">
                        <template #title>
                            <el-avatar style="margin-right: 10px;" v-if="!userStore.imgUrl"> {{ username }}
                            </el-avatar>
                            <el-avatar v-else :src="userStore.imgUrl" style="margin-right: 10px;" />
                            {{ username }}
                        </template>
                        <el-menu-item @click="toUserINfo">个人中心</el-menu-item>
                        <el-menu-item @click="addArticle">发布文章</el-menu-item>
                        <el-menu-item @click="logOut">退出登录</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-header>
            <el-main style="background-color: #f0f0f0;">
                <routerView></routerView>
            </el-main>
        </el-container>
    </div>

</template>
<style lang="scss" scoped>
.el-header {
    padding: 0px;
    height: 50px;
    border-bottom: 1px solid black;
}

.el-main {
    margin: 10px 0 0 0;
    padding: 0;
    width: 100%;
}

.el-menu--horizontal>.el-menu-item:nth-child(6) {
    margin-right: auto;
}
</style>