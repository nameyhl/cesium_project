<template>
    <div class="userBox">
        <div class="infoBox">
            <el-button @click="goBack">返回</el-button>
            <div class="userImg"></div>
        </div>
    </div>
</template>
<script setup>
// 引入userStore
import { useUserInfoStore } from '@/store/userStore/index'

import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserInfoStore()
// 引入接口函数
import { getUserInfo } from '@/api/user'
import { reactive } from 'vue';

const userId = userStore.id
const userInfo = reactive({})
getUserInfo({ userid: userId }).then(res =>
    console.log(res.data)
)
console.log(userInfo);

const goBack = () => {
    router.back()
}

</script>
<style scoped></style>