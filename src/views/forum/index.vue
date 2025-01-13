<template>
    <div class="forumBody">
        <el-button type="primary" @click="addArticle">新建文章</el-button>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const addArticle = () => {
    router.push('/addArticle')
}
</script>
<style lang="scss" scoped>
.forumBody{
    width: 66vw;
    height: 92vh;
    background-color: #fff;
    margin: 0 auto;
}
</style>