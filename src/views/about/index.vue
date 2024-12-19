<style lang="scss" scoped>
.chatBox {
    margin: 10px auto;
    width: 1200px;
    height: 91vh;
    background: #409eff;

    .frendTitle {
        width: 100%;
        height: 50px;
        background-color: #409eff;
        color: #fff;
        line-height: 50px;
        margin-left: 50px;
    }

    .leftBox {
        position: relative;
        height: 85vh;
        background-color: #fff;
        margin: 0 10px 10px 10px;


        .yourMessage {
            width: 50%;
            margin-left: 50%;
            overflow: auto;

            // float: right;
            .userName {
                margin: 10px 0;
                color: #409eff;
                font-style: italic;
            }
        }

        .outherMessage {
            width: 50%;
            margin-right: 50%;
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

    .listTile {
        width: auto;
        height: 50px;
        background-color: #409eff;
        color: #fff;
        line-height: 50px;
        padding-left: 50px;
    }

    .rightBox {
        height: 85vh;
        background-color: #fff;
        margin: 0 10px 10px 10px;


        .frend {
            display: inline-block;
            overflow: overlay;
            height: 80vh;

            .frendBox {
                width: 370px;
                margin: 10px 20px;

                .frendName {
                    margin: 10px;
                }

                .msg {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    font-style: italic;

                    .lastMsg {
                        color: #409eff;
                        margin-left: 10px;
                    }

                    .sendTime {
                        color: #409eff;
                        padding-right: 10px;
                    }
                }
            }
        }

    }
}

.frendBox:hover {
    background-color: #d3dce6;
    cursor: pointer;
}
</style>

<template>
    <div class="chatBox">
        <el-row>
            <el-col :span="15">
                <div class="frendTitle">{{ frend.name }}</div>
                <div class="leftBox">
                    <div class="allMsg">
                        <div class="massage" ref="messageBox" v-for="item in msgArr" :key=item.userName>
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
                </div>
            </el-col>
            <el-col :span="9">
                <!-- 好友列表 -->
                <div class="listTile">
                    好友列表
                </div>
                <div class="rightBox">
                    <div class="frend">
                        <div class="frendBox" v-for="item in frendList" @click="chosseFrend(item)">
                            <div class="frendName">{{ item.name }}</div>
                            <div class="msg">
                                <div class="lastMsg">{{ item.text }}</div>
                                <div class="sendTime">{{ item.time }}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div style="clear: both;"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { reactive, ref, onBeforeMount } from 'vue';

import { getFriendList } from '@/api/user';

// 引入userStore
import { useUserInfoStore } from '@/store/userStore/index'
const userStore = useUserInfoStore();

let frendList = ref([])
let frend = ref('');

const getFriend = async () => {
    let userId = userStore.id;
    console.log(userId);
    await getFriendList({ userId: userId }).then(res => {
        frendList.value = res.data;

    })

}
getFriend();

const chosseFrend = (row) => {
    frend.value = row;
    // ElMessage.success('点击了好友');
}



</script>