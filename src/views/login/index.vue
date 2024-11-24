<script setup>
import indexDB from '@/indexDb/userTable/index.js';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const router = useRouter();

//数据库名字，表名，查询条件
let DBName = 'myDB',
  storeName = 'userDB',
  indexName,
  key;

let form = reactive({
  userName: '',
  psw: '',
});

const routerTo = (path) => {
  router.push(path);
};

const login = async () => {
  let db = await indexDB.openDB(DBName, storeName, 1);

  indexName = 'userNameIndex';
  key = form.userName;

  let data = await indexDB
    .getDataByIndex(db, storeName, indexName, key)
    .then((res) => {
      if (res) {
        if (res.psw === form.psw) {
          router.push('/');
        } else {
          ElMessage({
            message: '密码错误',
            type: 'error',
          });
        }
      } else {
        ElMessage({
          message: '用户名不存在',
          type: 'error',
        });
      }
    });
};
</script>
<template>
  <div class="body">
    <div class="formBody">
      <div class="formTitle">欢迎登录</div>
      <div class="form">
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名：">
            <el-input v-model="form.userName" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input
              v-model="form.psw"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div style="">
              <el-button
                type="primary"
                @click="login"
                style="width: 100px; margin: 10px 0"
                >登录</el-button
              >
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
