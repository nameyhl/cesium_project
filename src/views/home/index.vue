<script setup>
import { ref } from 'vue'
import { getData, getImg } from '@/api/freeApi1/index.js';
import { showWeChat } from '@/api/freeAPI2';

const freeAPI2Key = 'f922bcb04085'

let titleText = ref('');
let fontFrom = ref('');
let fontCreater = ref('');
let imgUrl = ref('');

// getData().then(res => {
//     console.log(res);
//     titleText.value = res.data.content;
//     fontFrom.value = res.data.form;
//     fontCreater.value = res.data.creator;
// })

// getImg().then(res => {
//     console.log(res);
//     imgUrl.value = res.url;
// })

showWeChat({
    key:freeAPI2Key,
}).then(res => {
    console.log(res);
    
})

</script>
<template>
    <div class="common-layout">
        <div class="title">
            <div class="tag"></div>
            <div class="font">{{ titleText }}</div>
            <div class="fromAndCreater">--{{ fontCreater }} 《{{ fontFrom }}》</div>
        </div>
        <img :src="imgUrl" width="300" alt="">
    </div>
</template>


<style lang="scss" scoped>
.common-layout {
    width: 1200px;
    margin: 0 auto;
    .title {
        background-color: #ecf5ff;
        .tag{
            width: 100%;
            height: 5px;
            background-color: #409eff;
        }
        .font {
            font-size: 20px;
            font-weight: 500;
            text-align: center;
            margin-top: 5px;
        }
        .fromAndCreater{
            text-align: right;
            font-size: 12px;
            font-style: italic;
        }
    }

    ;
}
</style>