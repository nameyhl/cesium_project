<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { register } from '../../api/user'

//数据库名字，表名，查询条件

const router = useRouter();
let form = reactive({
  name: '',
  userName: '',
  psw: '',
  surepsw: '',
  phone: '',
});
// 表单验证
const rules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' },],
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
  psw: [{ required: true, message: '请输入密码', trigger: 'blur' },
  {
    validator: (rule, value, callback) => {
      if (value !== form.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    },
    trigger: 'blur'
  }
  ],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' },],
})

//注册用户函数
const registryUser = async () => {
  let data = {
    name: form.name,
    username: form.userName,
    password: form.psw,
    phone: form.phone,
  };
  await register(data).then((res) => {
    if (res.code == 200) {
      ElMessage.success('注册成功');
      router.push('/login');
    } else {
      ElMessage.error(res.msg);
    }
  });
};



const routerTo = (path) => {
  router.push(path);
};
</script>
<template>
  <div class="body">
    <div class="redistryForm">
      <div class="formTitle">注册您的账号，一定要记住密码哟</div>
      <div class="formBody">
        <el-form :model="form" label-width="80px" :rule="rules" ref="formRef">
          <el-form-item label="姓名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="form.psw"></el-input>
          </el-form-item>
          <el-form-item label="电话：">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <div class="submit">
            <el-button type="primary" @click="registryUser" style="width: 100px">注册</el-button>
          </div>
          <div style="text-align: center; margin: 20px 0">
            <span>已有账号？</span>
            <el-button link @click="routerTo('/login')">点击返回登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.body {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/regbg.jpg');
  background-size: 100% 100%;

  .redistryForm {
    width: 350px;
    height: 400px;
    margin: 0 auto;
    background-color: white;

    .formTitle {
      text-align: center;
      font-size: 20px;
      margin: 10px 0;
    }

    .formBody {
      width: 250px;
      margin: 50px auto;

      .submit {
        margin: 0 auto;
        width: 100px;
      }
    }
  }
}
</style>
