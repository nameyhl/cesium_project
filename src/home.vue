<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const menuTag = reactive([
    { name: '首页', index: '/home' },
    { name: '地图', index: '/earth' },
    { name: '数据', index: '/info' },
    { name: '聊天', index: '/about' },
    { name: '工具', index: '/test' },
    { name: '帮助', index: '/help' },
])
const activeIndex = ref('1')
// const handleSelect = (key) => {
//     router.push(key);
// }
const goTo = (key) => {
    router.push(key);
}
</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                    >
                    <el-menu-item v-for="item in menuTag" :index="item.index" @click="goTo(item.index)">{{ item.name }}</el-menu-item>
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
    margin: 10px 0 0 0 ;
    padding: 0;
    width: 100%;
}
</style>