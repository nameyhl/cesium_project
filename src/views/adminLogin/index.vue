<script setup>
/**
 * 管理员用户登录页面
 */
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
import { useUserInfoStore } from '@/store/userStore/index'
import { useRouter } from 'vue-router';
const router = useRouter()
const userStore = useUserInfoStore()
let ruleForm = ref({
  userName: '',
  password: ''
})
let rules = ref({
  userName: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
})
const routerTo = (path) => {
  router.push(path);
};

//登录接口
import { adminLogin } from '@/api/user';

const ruleFormRef = ref(null)
let login = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let data = {
        userName: ruleForm.value.userName,
        password: ruleForm.value.password
      }
      adminLogin(data).then(res => {
        if (res.code === 200) {
          let user = res.data;
          console.log(user);
          // user.role = user.role == "admin" ? '管理员' : '普通用户';
          // pinia存储用户信息
          userStore.setToken(user.token);
          userStore.setUsername(user.userName);
          userStore.setName(user.name);
          userStore.setImgUrl(user.imgUrl);
          userStore.setId(user.id);
          userStore.setRole(user.role);
          userStore.setPhone(user.phone);
          userStore.setMsg(user.msg);
          userStore.setPassword(user.password);
          ElMessage.success('登录成功');
          router.push("/manage/classify")
        } else {
          ElMessage.error(res.msg);
        }

      })
    } else {
      ElMessage.error('请账号或者密码')
      return false
    }
  })
}
</script>
<template>
  <div class="body">
    <div class="formBody">
      <div class="title">欢迎登录</div>
      <el-form ref="ruleFormRef" style="width: 300px; margin: 0 auto;" :model="ruleForm" :rules="rules"
        label-width="auto" class="demo-ruleForm">
        <el-form-item label="账号:" prop="userName">
          <el-input v-model="ruleForm.userName" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="ruleForm.password" />
        </el-form-item>
      </el-form>
      <div class="submit">
        <el-button type="primary" @click="login(ruleFormRef)">登录</el-button>
      </div>
      <div style="text-align: center; margin: 20px 0">
        <span>返回</span>
        <el-button link @click="routerTo('/login')">用户登录</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.body {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets//adminLogin.jpg');
  background-size: 100% 100%;
  align-items: center;

  .formBody {
    width: 400px;
    height: 300px;
    margin: auto auto;
    background-color: white;

    .title {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: 800;
      text-align: center;
      color: #409eff;
      margin-bottom: 50px;
    }

    .submit {
      width: 50px;
      margin: 0 auto;
    }
  }
}
</style>
