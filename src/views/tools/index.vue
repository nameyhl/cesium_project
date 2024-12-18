<script setup>
import { reactive, ref } from 'vue'

// 引入xfAPI方法
import { getReply } from '../../api/XFAI';
import { ElMessage } from 'element-plus';


let titleText = ref('无人扶我青云志，我自踏雪至山巅');
let fontFrom = ref('青云志');
let fontCreater = ref('徐霞客');
// 禁用buttom的点击
let disabled = ref(false);
// buttom的加载状态
let loading = ref(false);
let imgUrl = ref('');
let question = ref('');

// question和answer的数组
let questionAndAnswer = reactive([])

// 发送问题
const sendQuestion = () => {
    disabled.value = true
    loading.value = true
    let content = question.value
    if (content) {
        let data = {
            content: content
        }
        // 将content放进questionAndAnswer数组中 数组放入 以便区分问题与答案的对应
        let obj = {
            level: 1,
            content: content
        }
        questionAndAnswer.push(obj)
        getReply(data).then(res => {
            showAnwser(res.data)
            let obj = {
                level: 2,
                content: res.data
            }
            questionAndAnswer.push(obj)
            console.log(questionAndAnswer);
            
        })
    } else {
        ElMessage.error('请输入问题');
        disabled.value = false
        loading.value = false
    }

}


// 将获取到的answer回显到页面
// 让anwser一个字一个字显示
const showAnwser = (val) => {
    let anwserArr = val.split('')
    let anwserStr = ''
    let timer = setInterval(() => {
        anwserStr += anwserArr.shift()
        // 获取answer盒子
        let answerBox = document.getElementById('anwser')
        answerBox.innerHTML = anwserStr
        if (anwserArr.length == 0) {
            clearInterval(timer)
        }
    }, 100)
    disabled.value = false
    loading.value = false
    question.value = ''
}

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
                        <div class="answerHistry" v-for="item in questionAndAnswer">
                            <div class="questionBox" v-if="item.level == 1">{{  item.content }}</div>
                            <div class="answerBox" v-if="item.level == 2">{{  item.content }}</div>
                        </div>
                        <div class="anwser" id="anwser" :ref="anwserBox"></div>
                        <div class="question">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容"
                                v-model="question">
                            </el-input>
                            <div class="submit">
                                <el-button type="primary" @click="sendQuestion" :disabled="disabled"
                                    :loading="loading">发送</el-button>
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
    height: 92vh;

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