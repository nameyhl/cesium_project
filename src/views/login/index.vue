<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { login } from '../../api/user';

// 引入userStore
import { useUserInfoStore } from '../../store/userStore/index'
const userStore = useUserInfoStore();

const router = useRouter();

const routerTo = () => {
  router.push('/registry');
};

let form = reactive({
  username: '',
  password: '',
});
const loginWeb = async () => {
  await login(form).then((res) => {
    if (res.code == 200) {
      ElMessage.success('登录成功');
      let user = res.data;
      
      // pinia存储用户信息
      userStore.setToken(user.token);
      userStore.setUsername(user.userName);
      userStore.setName(user.name);
      userStore.setImgUrl(user.imgUrl);
      userStore.setId(user.id);
      // 跳转首页
      router.push('/home');
    } else {
      ElMessage.error(res.msg);
    }
  });
}

</script>
<template>
  <div class="body">
    <div class="formBody">
      <div class="formTitle">欢迎登录</div>
      <div class="form">
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名：">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <div style="">
              <el-button type="primary" @click="loginWeb" style="width: 100px; margin: 10px 0">登录</el-button>
            </div>
          </el-form-item>
          <div style="text-align: center; margin: 20px 0">
            <span>没有账号？</span>
            <el-button link @click="routerTo('/registry')">点击注册</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.body {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  background-image: url('@/assets/bg.png');
  background-size: 100% 100%;

  .formBody {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    background-color: white;

    .formTitle {
      text-align: center;
      font-size: 30px;
      font-weight: 900;
      margin: 10px 0 30px 0;
    }

    .form {
      width: 250px;
      margin: 0 auto;
    }
  }

  .el-form-item {
    display: flex;
  }
}
</style>
