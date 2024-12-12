<style lang="scss" scoped>
.chatBox {
    margin: 10px auto;
    width: 1200px;
    height: 600px;
    background: #409eff;

    .leftBox {
        position: relative;
        height: 600px;
        background-color: #fff;
        margin: 0 10px;
        .yourMessage{
            width: 50%;
            margin-left: 50% ;
            overflow: auto;
            // float: right;
            .userName{
                margin: 10px 0;
                color: #409eff;
                font-style: italic;
            }
        }
        .outherMessage{
            width: 50%;
            margin-right: 50% ;
            // float: right;
            background-color: red;
        }
        .send {
           
            position: absolute;
            bottom: 20px;
            left: 110px;
            width: 500px;
            .submit {
                position: absolute;
                bottom: 10px;
                right: 10px;
            }
        }
    }

    .rightBox {
        height: 600px;
        background-color: #fff;
        margin: 0 10px;
    }
}
</style>

<template>
    <div class="chatBox">
        <el-row>
            <el-col :span="15">
                <div class="leftBox">
                    <div class="massage" ref="messageBox" v-for="item in msgArr" :key = item.userName>
                        <div class="yourMessage" v-if="item.userName == user.userName">
                            <div class="userName">{{ item.userName }}/ {{ item.time }} : </div>
                            <div class="meg">{{ item.text }}</div>
                        </div>
                        <div class="outherMessage" v-else>
                            <div class="userName"></div>
                            <div class="meg"></div>
                        </div>
                    </div>
                    <div class="send">
                        <el-input v-model="meg" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"
                            placeholder="请输入内容"></el-input>
                        <div class="submit">
                            <el-button type="primary" @click="sendMeg">发送</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="9">
                <div class="rightBox"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// 向客户端发送的消息（号主发送的消息）
let meg = ref('');
// 用户信息
const user = {
    userName : 'xiaoming',
    age : 15
}
// 客户端发送的消息
let msgArr = reactive([]);
// 消息盒子
const messageBox = ref('');
//建立websocket连接
let ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    console.log('连接成功');
}
// 连接成功
const sendMeg = () => {
    let sendData = {
        userName: 'xiaoming',
        text: meg.value
    }
    meg.value = ''
    ws.send(JSON.stringify(sendData)); 
}


ws.onmessage = (e) => {
    let data = JSON.parse(e.data)
    msgArr.push(data)
    console.log(msgArr);
    
}

// 连接关闭时
ws.onclose = () => {
    console.log('连接关闭');
}

// 出现错误
ws.onerror = (e) => {
    console.log('连接错误', e);
}


</script>