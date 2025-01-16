<template>
    <div class="forumBody">
        <div class="header">
            <div class="search">
                <el-input style="width: 500px; height: 30px; margin-right: 10px;"></el-input>
                <el-button type="primary">搜索</el-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
import { getArticel } from '../../api/articel/index.js'
getArticel()
</script>
<style lang="scss" scoped>
.forumBody {
    width: 66vw;
    height: 92vh;
    background-color: #fff;
    margin: 0 auto;

    .header {
        padding-top: 20px;

        .search {
            display: flex;
            height: 50px;
            width: 100%;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>