<template>
    <div class="forumBody">
        <div class="header">
            <div class="search">
                <el-input style="width: 500px; height: 30px; margin-right: 10px;"></el-input>
                <el-button type="primary">搜索</el-button>
            </div>
        </div>
        <div class="body">
            <div class="articelCard" v-for="item in articelList" :key="item.id" @click="toDetail(item.id, 'articel')">
                <div class="articelTitle">{{ item.title }}</div>
                <div class="authorAndTime">
                    <div class="articelAuthor" @click="toDetail(item.id, 'author')"> 作者 : {{ item.userName }}</div>
                    <div class="createTime"> 发布时间 : {{ item.createTime }}</div>
                </div>
                <div class="abstract">{{ item.msg }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
import { getArticel } from '../../api/articel/index.js'
let articelList = ref([])
const getArticelList = async () => {
    let res = await getArticel()
    articelList.value = res.data
}
getArticelList()
const toDetail = (id, type) => {
    switch (type) {
        case 'articel':
            router.push({ path: '/articel', query: { id: id } })
            
            break;
        case 'author':
            // 阻止事件冒泡
            event.stopImmediatePropagation();
            console.log('author');

            break;
    }
}
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

    .body {
        padding: 10px;

        .articelCard {
            &:hover {
                cursor: pointer;
                background-color: #f0f0f0
            }

            .articelTitle {
                height: 50px;
                width: 50%;
                line-height: 50px;
                font-size: 20px;
                font-weight: bold;
                &:hover {
                        text-decoration: underline;
                    }
            }

            .authorAndTime {
                height: 30px;
                display: flex;
                justify-content: space-between;
                line-height: 30px;
                font-size: 14px;
                color: #7a7a7a;


                .articelAuthor {
                    width: 200px;
                    height: 25px;

                    &:hover {
                        text-decoration: underline;
                    }

                }

                .createTime {
                    width: 200px;
                    height: 25px;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .abstract {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>