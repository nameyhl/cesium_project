<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const id = route.query.id
import { getArticelDetail } from '../../api/articel/index.js'
// 查询文章内容
const articelDetail = ref({})
const articel = ref(null)

getArticelDetail(id).then(res => {
    articelDetail.value = res.data
    articel.value.innerHTML = articelDetail.value.body
})
</script>
<template>
    <div class="articleBody">
        <div class="title">{{ articelDetail.title }}</div>
        <div class="body" ref="articel"></div>
    </div>
</template>
<style lang="scss" scoped>
.articleBody{
    width: 66vw;
    height: 92vh; 
    background-color: #fff;
    margin: 0 auto;
    .title{
        padding: 20px;
        text-align: center;
        font-size: 30px;
        font-weight: 900;
    }
    
}
</style>