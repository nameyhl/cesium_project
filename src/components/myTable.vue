<style scoped lang="scss"></style>
<template>
    <el-table :data="tableData" :height="props.height" :border="props.border" :size="props.size"
        :show-overflow-tooltip="props.showOverflowTooltip" :tooltip-effect="props.tooltipeffect" style="width: 1200px;"
        :row-click="props.rowClick">
        <el-table-column v-for="column in columns" :label="column.label" :prop="column.prop"
            :width="column.width"></el-table-column>
        <el-table-column label="操作" :width="operateWidth" v-if="isOperate">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="openDialog(scope.row, 'detail')" v-if="isDetail">
                    查看
                </el-button>
                <el-button link type="primary" size="small" @click="openDialog(row, 'delete')" v-if="isDelete">删除</el-button>
                <el-button link type="primary" size="small" @click="openDialog(row, 'update')" v-if="isUpdate">修改</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="50%">
        <div>{{ dialogBody }}</div>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue';


/**
 * 父组件向子组件传递的值
 * colunm值为列的配置项
 * tableData值为表格数据
 * height值为表格的高度
 * border值为是否有纵向边框
 * size值为label的尺寸
 * show-overflow-tooltip当文本溢出时是否显示tooltip
 * tooltip-effect提示标签的主题  light亮， dark黑
 * isOperate 是否有操作列
 * isDetail 是否有查看详情
 * isDelete 是否有删除
 * isUpdate 是否有修改
 * operateWidth 操作列的宽度
 */
const props = defineProps({
    columns: {
        type: Array,
        default: () => []
    },
    tableData: {
        type: Array,
        default: () => []
    },
    height: {
        type: Number,

    },
    border: {
        type: Boolean,
        default: true
    },
    size: {
        type: String,
        default: 'medium'
    },
    showOverflowTooltip: {
        type: Boolean,
        default: true
    },
    tooltipeffect: {
        type: String,
        default: 'light'
    },
    rowClick: {
        type: Function,
        default: () => { }
    },
    isOperate: {
        type: Boolean,
        default: true
    },
    isDetail:{
        type:Boolean,
        default:true
    },
    isDelete:{
        type:Boolean,
        default:true
    },
    isUpdate:{
        type:Boolean,
        default:true
    },
    operateWidth:{
        type:Number,
        default:150
    }
})

const columns = props.columns;
console.log(columns);

const tableData = props.tableData;
console.log(tableData);

let dialogVisible = ref(false);
let dialogTitle = ref('');
let dialogBody = ref('');
const openDialog = (row, about) => {
    if (about == 'detail') {
        dialogVisible.value = true;
        dialogTitle.value = row.question;
        dialogBody.value = row.answer;
    } else if (about == 'delete') {
        console.log(row);
        return;
    } else if (about == 'update') {
        console.log(row);
        return;
    }
}

</script>
