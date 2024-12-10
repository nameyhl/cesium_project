<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import indexedDB from '@/indexDb/userTable/index.js';
import { ElMessage } from 'element-plus';

//数据库名字，表名，查询条件
let DBName = 'myDB',
  storeName = 'userDB',
  indexName = 'userName',
  key;

const router = useRouter();
let form = reactive({
  name: '',
  userName: '',
  psw: '',
  phone: '',
});

//注册用户函数
const registry = async () => {
  let openData = await indexedDB.openDB(DBName, storeName);
  console.log(openData);
  let data = {
    name: form.name,
    userName: form.userName,
    psw: form.psw,
    phone: form.phone,
  };
  await indexedDB.addData(openData, storeName, data).then(() => {
    ElMessage({
      message: '注册成功',
      type: 'success',
    });
    router.push('/login');
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
        <el-form :model="form" label-width="80px">
          <el-form-item label="姓名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="form.psw"></el-input>
          </el-form-item>
          <el-form-item label="电话：">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <div class="submit">
            <el-button type="primary" @click="registry" style="width: 100px"
              >注册</el-button
            >
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
