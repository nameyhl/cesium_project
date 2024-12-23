<template>
    <div class="body">
        <div class="userInfoBox">
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
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-input v-model="form.role"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="form.msg"></el-input>
                    </el-form-item>
                </el-form>
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

let form = ref({
    name: userStore.name,
    avatar: userStore.imgUrl,
    userName: userStore.username,
    role: userStore.role,
    msg: userStore.msg,
});

// 图片上传成功
const handleAvatarSuccess = (res, file) => {
    console.log(res, file);
    form.value.avatar = URL.createObjectURL(file.raw)
    console.log(form.value.avatar);
};


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