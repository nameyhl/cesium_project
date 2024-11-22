<script setup>
import indexDB from '@/indexDb/index.js'
console.log(indexDB);

const stratDB = async () => {
    const dbName = 'myDB', storeName = 'userDB'
    const db = await indexDB.openDB(dbName, storeName, 1)
    let data = await indexDB.addData(db, storeName, {
        id : 111,
        name : '张三',
        userName : 'zhangsan',
        psw : '123456',
        desc: '张三的账号' 
    })
    console.log(data);
    // let data = await indexDB.getDataById(db, storeName, 111)
    // console.log(data);
    // let data = await indexDB.updateDB(db, storeName, {
    //     id : 111,
    //     desc: "修改了desc"
    // })
    // console.log(data);

    // let data = await indexDB.deleteData(db, storeName, 111)
    // console.log(data);
}

</script>
<template>
</template>
<style scoped>
</style>