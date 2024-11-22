<script setup>
import indexDB from '@/indexDb/index.js'
import { reactive } from 'vue';
let uesrInfo ={
    id: 112,
    name: '张三',
    userName: 'zhangsan',
    psw: '123456',
    desc: '张三的账号'
}


// console.log(indexDB);

const stratDB = async () => {
    const dbName = 'myDB', storeName = 'userDB'
    const db = await indexDB.openDB(dbName, storeName, 1)
    let selectData = await indexDB.getDataById(db, storeName, uesrInfo.id)
    console.log(selectData);
    if (!selectData) {
        let addData = await indexDB.addData(db, storeName, uesrInfo)
        console.log(addData);
    }
    let updateData = await indexDB.updateData(db, storeName, {
        id : 112,
        desc: "修改了desc"
    })
    console.log(updateData);

    let deleteData = await indexDB.deleteData(db, storeName, 112)
    console.log(deleteData);
}
stratDB()

</script>
<template>
</template>
<style scoped></style>