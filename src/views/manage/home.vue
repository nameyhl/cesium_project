<script setup>
/**
 * 管理界面主界面
 */
import { ref } from 'vue'
import { RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter()

let menu = ref([
  {
    name: '分类管理',
    icon: 'Menu',
    index: '/manage/classify'
  },
  {
    name: '文章管理',
    icon: 'article',
    index: '/article'
  }
])

let menuName = ref('分类管理')

const handleSelect = (index) => {
  menuName.value = menu.value.find(el => el.index === index).name
  router.push(index)
}

const logOut = () => {
  localStorage.removeItem('userInfo');
  router.push('/login')
}
</script>
<template>
  <el-container>
    <el-aside>
      <div class="menu">
        <div class="menuTitle">菜单栏</div>
        <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect">
          <el-menu-item v-for="item in menu" :index="item.index" :key="item">
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="menuNage">{{ menuName }}</div>
        <div class="logOut">
          <el-button type="primary" @click="logOut()">退出登录</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="main">
          <RouterView />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped lang="scss">
.el-aside {
  padding: 10px
}

.menu {
  height: 96vh;
  background: #fff;
  padding: 10px 10px;

  .menuTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #409EFF;
    color: #fff;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
}

.el-main {
  padding: 10px 0;
}

.main {
  height: 88vh;
  overflow: auto;
  padding: 10px;
  background: #fff;
}

.el-menu {
  border: none;
}

.el-menu-item {
  margin-top: 10px;
  border-right: 2px solid #f0f0f0;
}

.is-active {
  border-right: 2px solid #409EFF;
}

.el-header {
  margin-top: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background: #fff;
  align-items: center;

  .menuNage {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
  }

}
</style>