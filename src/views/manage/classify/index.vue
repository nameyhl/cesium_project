<template>
    <div class="addbtn">
        <el-button type="primary" @click="operate({}, 'addnew')">
            添加分类
        </el-button>
    </div>

    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
        <el-table-column prop="id" label="分类id"></el-table-column>
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="parentId" label="父类id" />
        <el-table-column prop="parentName" label="父类名称" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" link @click="operate(scope.row, 'delete')">
                    删除
                </el-button>
                <el-button type="primary" link @click="operate(scope.row, 'update')">
                    修改
                </el-button>
                <el-button type="primary" link @click="operate(scope.row, 'chack')">
                    查看
                </el-button>
                <el-button type="primary" link @click="operate(scope.row, 'add')" v-if="!scope.row.parentId">
                    添加
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500" :before-close="handleClose">
        <el-form :model="classify" label-width="80px">
            <el-form-item label="分类名称">
                <el-input v-model="classify.name" :disabled="operateType == 'chack'" />
            </el-form-item>
            <el-form-item label="父类名称">
                <el-select v-model="selectValue" placeholder=""
                    :disabled="operateType != 'addnew' && (operateType == 'chack' || !classify.parentId)">
                    <el-option v-for="item in selectInfo" :key="item.value" :label="item.name" :value="item.id" />
                </el-select>
                <!-- <el-input v-model="classify.parentName" :disabled="operateType != 'update'" /> -->
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
                <el-button type="primary" @click="submitForm">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue'

let tableData = ref([
    {
        id: 1,
        date: '2016-05-02',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 2,
        date: '2016-05-04',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 3,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
        children: [
            {
                id: 31,
                date: '2016-05-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                id: 32,
                date: '2016-05-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ],
    },
    {
        id: 4,
        date: '2016-05-03',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
])

// 获取分类接口
import { getClassify, getClassifyWithoutParent, updateClassify, addClassify, deleteClassify } from '@/api/classify/index'
import { ElMessage } from 'element-plus'
const getClassifyList = () => {
    getClassify().then(res => {
        res.data.forEach(element => {
            let parentName = element.name
            element.children.forEach(el => {
                el.parentName = parentName
            });
        });
        tableData.value = res.data

    })
}
getClassifyList()

let operateType = ref('delete')
let dialogTitle = ref('')
// 操作分类
const operate = (row, operate) => {
    operateType.value = operate
    switch (operate) {
        case 'delete':
            deleteClassify(row.id).then(res => {
                ElMessage.success(res.msg)
                getClassifyList()
            });
            break
        case 'update':
            dialogVisible.value = true
            getClassifyWithoutParentList()
            classify.value = row
            dialogTitle.value = '修改分类'
            selectValue.value = row.parentId
            break
        case 'chack':
            dialogVisible.value = true
            getClassifyWithoutParentList()
            classify.value = row
            dialogTitle.value = '查看分类'
            selectValue.value = row.parentId
            break
        case 'add':
            dialogVisible.value = true
            getClassifyWithoutParentList()
            dialogTitle.value = '添加分类'
            classify.value = {}
            selectValue.value = row.id
            break
        case 'addnew':
            dialogVisible.value = true
            getClassifyWithoutParentList()
            dialogTitle.value = '添加分类'
            classify.value = {}
            selectValue.value = row.id
        default:
            break
    }
}

// 查看分类Dialog
let classify = ref({})
let dialogVisible = ref(false)
const handleClose = () => {
    dialogVisible.value = false
}

const selectInfo = ref([])
let selectValue = ref(0)
// 查询没有父类的分类 
const getClassifyWithoutParentList = () => {
    getClassifyWithoutParent().then(res => {
        selectInfo.value = res.data
    })
}
// 提交修改
const submitForm = () => {
    if (operateType.value == 'update') {
        let data = {
            id: classify.value.id,
            name: classify.value.name,
            parentId: selectValue.value,
        }
        updateClassify(data).then(res => {
            dialogVisible.value = false
            getClassifyList()
        })
        return
    }
    if (operateType.value == 'add' || operateType.value == 'addnew') {
        if(!selectValue.value) {
            selectValue.value = null
        }
        let data = {
            name: classify.value.name,
            parentId: selectValue.value,
        }
        addClassify(data).then(res => {
            dialogVisible.value = false
            getClassifyList()
        })
        return
    }

}

</script>
<style scoped lang="scss">
.addbtn {
    margin-bottom: 20px;
    float: right;
}
</style>