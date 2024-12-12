<script setup>
import { ref } from 'vue'

let titleText = ref('');
let fontFrom = ref('');
let fontCreater = ref('');
let imgUrl = ref('');
let question = ref('');

</script>
<template>
    <div class="common-layout">
        <div class="title">
            <div class="tag"></div>
            <div class="font">{{ titleText }}</div>
            <div class="fromAndCreater">--{{ fontCreater }} 《{{ fontFrom }}》</div>
        </div>
        <el-row style="margin: 0 10px;" :gutter="12">
            <el-col :span="6">
                <div class="imgBox">
                    <img :src="imgUrl" width="100%" height="460px" alt="">
                </div>

            </el-col>
            <el-col :span="18">
                <div class="AIBox">
                    <div class="AITitle">You can try saying a sentence</div>
                    <div class="AIBody">
                        <div class="anwser"></div>
                        <div class="question">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容"
                                v-model="question">
                            </el-input>
                            <div class="submit">
                                <el-button type="primary" @click="getAnswer">发送</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

    </div>
</template>


<style lang="scss" scoped>
.common-layout {
    width: 1200px;
    margin: 0 auto;
    background-color: #ffffff;

    .title {
        background-color: #ecf5ff;
        margin: 0 10px;

        .tag {
            width: 100%;
            height: 5px;
            background-color: #409eff;
        }

        .font {
            font-size: 20px;
            font-weight: 500;
            text-align: center;
            // margin-top: 5px;
        }

        .fromAndCreater {
            text-align: right;
            font-size: 12px;
            font-style: italic;
        }
    }

    .imgBox {
        width: 100%;
        height: 460px;
        border: #409eff solid 1px;
    }

    .AIBox {
        width: 100%;
        height: 470px;

        .AITitle {
            background-color: #409eff;
            // padding: 10px;
            width: 100%;
            height: 50px;
            line-height: 50px;
            color: #fff;
            font-size: 20px;
            font-weight: 500;
            text-align: center;
            font-style: italic;
        }

        .AIBody {
            position: relative;
            width: 100%;
            height: 400px;
            background-color: #fff;
            margin: 10px 0;

            .question {
                position: absolute;
                bottom: 10px;
                left: 125px;
                width: 600px;
            }

            .submit {
                position: absolute;
                top: 10px;
                right: 5px
            }
        }

    }

}
</style>