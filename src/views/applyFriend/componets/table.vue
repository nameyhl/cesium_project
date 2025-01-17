<template>
    <el-table :data="props.tableData" :height="props.height">
        <el-table-column v-for="column in columns" :label="column.label" :key="column" :prop="column.prop" show-overflow-tooltip
            :width="column.width"></el-table-column>
        <el-table-column fixed="right" label="操作">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="openDialog(scope.row)">
                    查看
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="isShowDialog" title="申请信息" width="800">
        <el-row>
            <el-col :span="12">
                <div class="text dailogTitle">姓名</div>
                <div class="text dialogInfo">{{ dialogInfo.name }}</div>
            </el-col>
            <el-col :span="12">
                <div class="text dailogTitle">角色</div>
                <div class="text dialogInfo">{{ dialogInfo.role }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="text dailogTitle">电话</div>
                <div class="text dialogInfo">{{ dialogInfo.phone }}</div>
            </el-col>
            <el-col :span="12">
                <div class="text dailogTitle">状态</div>
                <div class="text dialogInfo">{{ dialogInfo.state }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="text dailogTitle">原因</div>
                <div class="text dialogInfo">{{ dialogInfo.reason }}</div>
            </el-col>
        </el-row>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="updateState(dialogInfo, 'fail')" type="danger" v-if="dialogInfo.state == '未处理' && isHave">拒绝</el-button>
                <el-button type="primary" @click="updateState(dialogInfo, 'pass')" v-if="dialogInfo.state == '未处理' && isHave">
                    同意
                </el-button>
                <el-button @click="isShowDialog = false">
                    关闭
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { defineProps, ref } from 'vue'

let columns = [
    {
        label: '姓名',
        prop: 'name',
        width: 70,
    },
    {
        label: '角色',
        width: 100,
        prop: 'role'
    },
    {
        label: '状态',
        width: 120,
        prop: 'state'
    },
    {
        label: '理由',
        width: 200,
        prop: 'reason'
    },
    {
        label: '电话',
        width: 150,
        prop: 'phone'
    },
]

const props = defineProps({
    tableData: {
        type: Array,
        default: () => []
    },
    height:{
        type: String,
        default: "400"
    },
    isHave:{
        type: Boolean,
        default: false
    },
    changeState: {
        type: Function,
        default: () => {}
    }
})

const openDialog = (row) => {
    isShowDialog.value = true;
    dialogInfo.value = row
}
let dialogInfo = ref({})
let isShowDialog = ref(false);
const updateState = (row, state) => {
    console.log(row, state);
    let obj = {
        userId: row.userId,
        applyId: row.applyId,
        state: state
    }
    props.changeState(obj)
    isShowDialog.value = false;
    
}

</script>
<style></style>