<script setup>
import { reactive, ref } from 'vue'

// 引入xfAPI方法
import { getReply } from '@/api/XFAI';
// 引入存放记录的方法
import { setChat, getChat, getChatPage } from '@/api/chat'
import { ElMessage, ElMessageBox } from 'element-plus';
// 引入userStore
import { useUserInfoStore } from '@/store/userStore';
const userStore = useUserInfoStore()

const userId = userStore.id

let titleText = ref('无人扶我青云志，我自踏雪至山巅');
let fontFrom = ref('青云志');
let fontCreater = ref('徐霞客');
// 禁用buttom的点击
let disabled = ref(false);
// buttom的加载状态
let loading = ref(false);
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
            let request = {
                sendUserId: userId,
                question: content,
                answer: res.data
            }
            // 清空历史数据
            historyData.splice(0, historyData.length)
            getHistroy()
            setChat(request)
            showAnwser(res.data)
        })
    } else {
        ElMessage.error('请输入问题');
        disabled.value = false
        loading.value = false
    }

}

let historyData = reactive([])
// 获取最近两天的记录
const getHistroy = async () => {
    await getChat({ sendUserId: userId }).then(res => {
        res.data.forEach(item => {
            item.createTime = item.createTime.substring(0, 10)
        })
        historyData.push(...res.data)
    })
}

getHistroy()
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
    }, 10)
    disabled.value = false
    loading.value = false
    question.value = ''
}

// 展示问答效果
const showThis = (item) => {
    ElMessageBox.alert(item.answer, item.question, {
        confirmButtonText: '确定',
        callback: action => {
        }
    })
}

// 控制查看更多的Dailog
let msgBox = ref(false)

// 控制分页
let page = ref(1)
let pageSize = ref(5)
let tableData = reactive([])
let total = ref(0)
// 引入table组件
import myTable from '@/components/myTable.vue';
const findMore = () => {
    msgBox.value = true
    getChatByPage()
}

const getChatByPage = () => {
    let data = {
        sendUserId: userId,
        page: page.value,
        num: pageSize.value
    }
    getChatPage(data).then(res => {
        tableData.splice(0, tableData.length)
        res.data.forEach(item => {
            item.createTime = item.createTime.substring(0, 10)
        })
        tableData.push(...res.data)
        console.log(tableData);
        total.value = res.total
    })
}

const handleSizeChange = (val) => {
    pageSize.value = val
    getChatByPage()
}
const handleCurrentChange = (val) => {
    page.value = val
    getChatByPage()
}


// 表格行点击后
const rowClick = (row) => {
    console.log(row)
}
const handleClose = () => {
    msgBox.value = false
}


const columns = [
    { label: '问题', prop: 'question' },
    { label: '回答', prop: 'answer' },
    { label: '时间', prop: 'createTime' }
]
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
                <div class="histroyTile">历史记录</div>
                <div class="histroyBox">
                    <div class="questionAndAnswer" v-for="item in historyData" @click="showThis(item)" :key="item">
                        <div class="question">{{ item.question }}</div>
                        <div class="anwserAndTime">
                            <el-row>
                                <el-col :span="14">
                                    <div class="anwser">{{ item.answer }}</div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="time">{{ item.createTime }}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="findMore">
                        <el-button type="" @click="findMore" link>点击查看更多</el-button>
                    </div>
                </div>

            </el-col>
            <el-col :span="18">
                <div class="AIBox">
                    <div class="AITitle">You can try saying a sentence</div>
                    <div class="AIBody">
                        <div class="answerHistry">
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
        <el-dialog v-model="msgBox" title="历史记录" width="1000" :before-close="handleClose">
            <myTable :columns="columns" :tableData="tableData" :rowClick="rowClick" :isOperate="true" :isDetail="true"
                :isUpdate="false" :isDelete="false" :operateWidth="80"  />
            <el-pagination v-model:current-page="page" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
                :size="'small'" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="msgBox = false">Cancel</el-button>
                    <el-button type="primary" @click="msgBox = false">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
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

    .histroyTile {
        background-color: #409eff;
        padding: 0 1px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        font-style: italic;
    }

    .histroyBox {
        width: 100%;
        height: 75vh;
        border: #409eff solid 1px;
        overflow: overlay;

        .questionAndAnswer {
            .question {
                padding: 0 10px;
                height: 40px;
                font-size: 18px;
                font-weight: 900;
                line-height: 40px;
                text-align: left;
                color: #409eff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .anwserAndTime {
                justify-content: space-between;
                padding: 0 10px;
                font-size: 12px;
                font-weight: 500;
                text-align: left;
                border-bottom: #409eff solid 1px;

                .anwser {
                    white-space: nowrap;
                    height: 30px;
                    line-height: 30px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .time {
                    height: 30px;
                    line-height: 30px;
                    text-align: right;
                }
            }
        }

        .findMore {
            width: 100px;
            margin: 0 auto;
        }
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
            height: 75vh;
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

.questionAndAnswer:hover {
    background-color: #e6eaf6;
    cursor: pointer;

}
</style>