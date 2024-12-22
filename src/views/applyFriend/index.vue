<template>
    <div class="applyFriendBody">
        <el-row>
            <el-col :span="12">
                <div class="applyFriend">
                    <div class="title">查找书友</div>
                    <div class="form">
                        <el-form :model="form" label-width="80px">
                            <el-row :gutter=10>
                                <el-col :span="10"><el-form-item label="用户名">
                                        <el-input v-model="form.userName" placeholder="请输入你想查找的用户名" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10"><el-form-item label="相关信息">
                                        <el-input v-model="form.msg" placeholder="请输入你希望查找的相关信息" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-button type="primary" width="70px" @click="searchUser">查找</el-button>
                                </el-col>
                            </el-row>


                        </el-form>
                    </div>
                    <div class="body">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="userName" label="用户名" width="100">
                            </el-table-column>
                            <el-table-column prop="name" label="名称" width="80">
                            </el-table-column>
                            <el-table-column prop="phone" label="手机号">
                            </el-table-column>
                            <el-table-column prop="role" label="角色">
                            </el-table-column>
                            <el-table-column prop="msg" label="相关信息">
                            </el-table-column>
                            <el-table-column fixed="right" label="Operations" min-width="120">
                                <template #default="scope">
                                    <el-button link type="primary" size="small" @click="handleClick(scope.row)">
                                        添加
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="friendList">
                    <div class="myApply">
                        <div class="title">我的申请</div>
                        <Table :tableData="myApplyData" :height="'80%'" :changeState="updateApplyFriendState"
                            :ishave="false" :userId="userId"></Table>
                    </div>
                    <div class="applyMe">
                        <div class="title">好友申请列表</div>
                        <Table :tableData="applyMeData" :height="'80%'" :changeState="updateApplyFriendState"
                            :isHave="true">
                        </Table>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- 申请好友弹窗 -->
        <el-dialog v-model="dialogVisible" title="申请理由" width="500">
            <el-input v-model="reason" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入理由" />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitApply">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// 引入userStore
import { useUserInfoStore } from '@/store/userStore/index'
const userStore = useUserInfoStore();
let userId = userStore.id;

// api接口
import { getApplyFriendList, getMyApplyList, updateApplyFriend, addApplyFriend } from '@/api/applyFriend';
// 查找用户接口
import { getUerByInfo } from '@/api/user'

// table组件
import Table from './componets/table.vue'
import { ElMessage } from 'element-plus';

// 搜索用户
let form = ref({})
let tableData = ref([]);
const searchUser = () => {
    let data = form.value
    getUerByInfo(data).then(res => {
        console.log(res.data);
        tableData.value = res.data;
        tableData.value.forEach(item => {
            item.role = item.role == "admin" ? '管理员' : '普通用户';
            item.phone ? item.phone = item.phone.substr(0, 3) + '****' + item.phone.substr(7) : '';
        })
    })
}

// 添加好友
// 申请添加好友弹窗
let dialogVisible = ref(false);
let submitData = ref({})
const handleClick = (row) => {
    console.log(row)
    const data = {
        userId: userId,
        applyId: row.id
    }
    submitData.value = row;
    dialogVisible.value = true;
    console.log(data);
}
let reason = ref('')
// 提交申请
const submitApply = async () => {
    let obj = {
        userId: userId,
        applyId: submitData.value.id,
        reason: reason.value
    }
    await addApplyFriend(obj).then(res => {
        console.log(res.data);
        if (res.data == "success") {
            ElMessage.success('提交申请成功，等待用户添加');
        }
    })
    dialogVisible.value = false;
    myApplyData.value = [];
    await getMyApplyList({ userId: userId }).then(res => {
        console.log(res.data);
        myApplyData.value = res.data;
        for (let i = 0; i < applyMeData.value.length; i++) {
            applyMeData.value[i].role = applyMeData.value[i].role == "admin" ? '管理员' : '普通用户';
            applyMeData.value[i].phone ? applyMeData.value[i].phone = applyMeData.value[i].phone.substr(0, 3) + '****' + applyMeData.value[i].phone.substr(7) : '';
            applyMeData.value[i].state = applyMeData.value[i].state == "pass" ? '已通过' : applyMeData.value[i].state == "fail" ? '已拒绝' : '未处理';
        }
    })
}

// 获取该账号申请好友列表
let applyMeData = ref([]);

getApplyFriendList({ userId: userId }).then(res => {
    applyMeData.value = res.data;
    for (let i = 0; i < applyMeData.value.length; i++) {
        applyMeData.value[i].role = applyMeData.value[i].role == "admin" ? '管理员' : '普通用户';
        applyMeData.value[i].phone ? applyMeData.value[i].phone = applyMeData.value[i].phone.substr(0, 3) + '****' + applyMeData.value[i].phone.substr(7) : '';
        applyMeData.value[i].state = applyMeData.value[i].state == "pass" ? '已通过' : applyMeData.value[i].state == "fail" ? '已拒绝' : '未处理';
    }
})

// 获取该账号申请列表
let myApplyData = ref([]);
getMyApplyList({ userId: userId }).then(res => {
    myApplyData.value = res.data;
    for (let i = 0; i < applyMeData.value.length; i++) {
        myApplyData.value[i].role = myApplyData.value[i].role == "admin" ? '管理员' : '普通用户';
        myApplyData.value[i].phone ? myApplyData.value[i].phone = myApplyData.value[i].phone.substr(0, 3) + '****' + myApplyData.value[i].phone.substr(7) : '';
        myApplyData.value[i].state = myApplyData.value[i].state == "pass" ? '已通过' : myApplyData.value[i].state == "fail" ? '已拒绝' : '未处理';
    }
})

// 修改申请状态
const updateApplyFriendState = (data) => {
    updateApplyFriend(data).then(res => {
        if (res.data == "success") {
            myApplyData.value = [];
            getMyApplyList({ userId: userId }).then(res => {
                console.log(res.data);
                myApplyData.value = res.data;
                for (let i = 0; i < applyMeData.value.length; i++) {
                    applyMeData.value[i].role = applyMeData.value[i].role == "admin" ? '管理员' : '普通用户';
                    applyMeData.value[i].phone ? applyMeData.value[i].phone = applyMeData.value[i].phone.substr(0, 3) + '****' + applyMeData.value[i].phone.substr(7) : '';
                    applyMeData.value[i].state = applyMeData.value[i].state == "pass" ? '已通过' : applyMeData.value[i].state == "fail" ? '已拒绝' : '未处理';
                }
            })
        }
    })
    location.reload();
}
</script>

<style scoped lang="scss">
.applyFriendBody {
    width: 1200px;
    height: 90vh;
    background-color: #fff;
    margin: 10px auto;

    .applyFriend {
        margin: 10px;

        .title {
            height: 50px;
            line-height: 50px;
            background-color: #409eff;
            color: #fff;
            font-size: 20px;
            font-weight: 900;
            text-align: center;
        }

        .form {
            width: 100%;
            margin-top: 10px
        }
    }

    .friendList {
        margin: 10px;

        .myApply {
            height: 42vh;

            .title {
                height: 50px;
                line-height: 50px;
                background-color: #409eff;
                color: #fff;
                font-size: 20px;
                font-weight: 900;
                text-align: center;
            }
        }

        .applyMe {
            height: 42vh;

            .title {
                height: 50px;
                line-height: 50px;
                background-color: #409eff;
                color: #fff;
                font-size: 20px;
                font-weight: 900;
                text-align: center;
            }
        }
    }
}

.text {
    padding: 10px;
}

.dailogTitle {
    font-size: 16px;
    font-weight: 900;
}
</style>