<script setup>
import { ref, watch } from 'vue';
// 引入接口
import { getAllArticel, updateArticelState, deleteArticel } from '@/api/articel';
// table数据
const articelTable = ref([])
const getArticelTable = () => {
    getAllArticel().then(res => {
    res.data.forEach(item => {
        if (item.state === 'pass') {
            item.state = '审核通过'
        }
        if (item.state === 'failed') {
            item.state = '审核未通过'
        }
        if (item.state === 'pedding') {
            item.state = '审核中'
        }
        if (item.visible === 'all') {
            item.visible = '所有人可见'
        }
        if (item.visible === 'onlySelf') {
            item.visible = '仅自己可见'
        }
        if (item.visible === 'nofriend') {
            item.visible = '好友不可见'
        }
        if (item.visible === 'friend') {
            item.visible = '仅好友可见'
        }
    })
    articelTable.value = res.data
})
}

getArticelTable()
// 表格列
const columns = ref([
    { label: '标题', prop: 'title' },
    { label: '作者', prop: 'userName' },
    { label: '发布时间', prop: 'createTime' },
    { label: '状态', prop: 'state' },
    { label: '可见性', prop: 'visible' },
])

// 表格列操作
const editeDialog = ref(false)
const articleState = ref(true)

// 弹窗数据
const dialogInfo = ref({
    id: '1',
    title: '标题',
    content: '正文',
    state: '审核中',
})
const handleClick = (scoped, type) => {
    if (type === 'about') {
        editeDialog.value = true
        dialogInfo.value.id = scoped.row.id
        dialogInfo.value.title = scoped.row.title
        dialogInfo.value.content = scoped.row.body
        dialogInfo.value.state = scoped.row.state
        articleState.value = scoped.row.state === '审核通过' ? true : false
    }
    if (type === 'delete') {
        deleteArticel({ id : scoped.row.id})
        getArticelTable()
    }
}

// 监听articleState的变化  发生变化ischange变为true
watch(articleState, (newVal) => {
    isChange.value = true
})
const isChange = ref(false)
const submitDialog = () => {
    if(isChange.value){
        let data = {
            id: dialogInfo.value.id,
            state: articleState.value ? 'pass' : 'failed'
        }
        updateArticelState(data).then(res => {
            console.log(res);
        })

    }
    editeDialog.value = false
    getArticelTable()
}

</script>
<template>
    <el-table :data="articelTable" style="width: 100%">
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label" />
        <el-table-column label="操作">
            <template #default="scoped">
                <el-button link type="primary" size="small" @click="handleClick(scoped, 'about')">
                    查看
                </el-button>
                <el-button link type="primary" size="small" @click="handleClick(scoped, 'delete')">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="editeDialog" :title="dialogInfo.title">
        <div v-html="dialogInfo.content"></div>
        <template #footer>
            <div class="dialog-footer">
                <div style="display: inline-block; padding-right: 10px;">
                <el-switch v-model="articleState" active-text="通过" inactive-text="不通过" />
                </div>
                <el-button @click="editeDialog = false">关闭</el-button>
                <el-button type="primary" @click="submitDialog">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style lang="scss" scoped></style>