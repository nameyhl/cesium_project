<template>
    <div class="body">
        <div class="userInfoBox">
        <el-button type="primary" @click="goBack" style="float: left;">返回首页</el-button>
            <div class="form">
                <el-form :model="form" label-width="auto">
                    <div class="avatarBox">
                        <el-upload class="avatar-uploader" action="http://127.0.0.1:3000/files/fileUpload"
                            :show-file-list="false" :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </div>
                    <el-form-item label="用户名">
                        <el-input v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-input v-model="form.role"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="form.msg"></el-input>
                    </el-form-item>
                </el-form>
                <div style=" width: 100px; margin: 0 auto;">
                    <el-button style="width: 100px;" type="primary" @click="submit()">修改信息</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue'
// 引入userStore
import { useUserInfoStore } from '../../store/userStore/index';
const userStore = useUserInfoStore();

import { useRouter } from 'vue-router';
const router = useRouter();

let form = ref({
    id: userStore.id,
    name: userStore.name,
    avatar: userStore.imgUrl,
    userName: userStore.username,
    role: userStore.role,
    password: userStore.password,
    phone: userStore.phone,
    msg: userStore.msg,
});

// 图片上传成功
const handleAvatarSuccess = (res, file) => {
    form.value.avatar = res.imgUrl;
};


// 引入修改用户信息接口
import { updateUser } from '../../api/user/index'

// 提交修改
const submit = () => {
    updateUser(form.value);
    arterRemove()
}

// 返回上级
const goBack = () => {
    router.push('/home');
}

// 修改信息后
const arterRemove = async () => {
    // 清空pinia中的数据
    userStore.removeName();
    userStore.removeImgUrl();
    userStore.removeMsg();
    userStore.setName(form.value.name);
    userStore.setImgUrl(form.value.avatar);
    userStore.setMsg(form.value.msg);
}
</script>

<style scoped lang="scss">
.body {
    width: 100vw;
    height: 100vh;
    background: #f0f2f5;

    .userInfoBox {
        width: 60vw;
        height: 95vh;
        margin: 0px auto;
        padding-top: 20px;
        background: #fff;

        .form {
            width: 80%;
            margin: 0 auto;

            .avatarBox {
                width: 100px;
                height: 100px;
                margin: 20px auto 50px auto;
            }
        }
    }
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50%;
}
</style>