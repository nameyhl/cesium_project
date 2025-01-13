<template>
    <div class="articleBody">
        <div class="form">
            <el-form :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" :size="formSize"
                status-icon>
                <el-form-item label="文章名称:" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="文章摘要:" prop="msg">
                    <el-input type="textarea" v-model="ruleForm.msg "  :autosize="{ minRows: 2, maxRows: 4 }" />
                </el-form-item>
                <el-form-item label="可见选择:" prop="visible">
                    <!--
                       all : 全部
                       onlySelf : 仅自己可见
                       friend : 好友可见
                       nofriend : 好友不可见
                    -->
                    <el-radio-group v-model="ruleForm.visible">
                        <el-radio value="all">所有人可见</el-radio>
                        <el-radio value="onlySelf">仅自己可见</el-radio>
                        <el-radio value="friend">好友可见</el-radio>
                        <el-radio value="nofriend">好友不可见</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>
        <div class="editorBody">
            <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"
                style="border-bottom: 1px solid #ccc" />
            <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" style="height: 500px;" @onCreated="handleCreated" />
        </div>
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

// 验证表单
let ruleForm = ref({
    name: '',
    msg: '',
    visible: []
})
// 验证规则
const rules = ref({
})
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('');

const mode = ref('default');

const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;

    editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
};

/**
 *  @onChange="handleChange"
 *  @onDestroyed="handleDestroyed" @onFocus="handleFocus" @onBlur="handleBlur" @customAlert="customAlert"
 *  @customPaste="customPaste"
 */
// const handleChange = (editor) => {
//     console.log('change:', editor.getHtml());
// };
// const handleDestroyed = (editor) => {
//     console.log('destroyed', editor);
// };
// const handleFocus = (editor) => {
//     console.log('focus', editor);
// };
// const handleBlur = (editor) => {
//     console.log('blur', editor);
// };
// const customAlert = (info, type) => {
//     alert(`【自定义提示】${type} - ${info}`);
// };
// const customPaste = (editor, event, callback) => {
//     console.log('ClipboardEvent 粘贴事件对象', event);

//     // 自定义插入内容
//     editor.insertText('xxx');

//     // 返回值（注意，vue 事件的返回值，不能用 return）
//     callback(false); // 返回 false ，阻止默认粘贴行为
//     // callback(true) // 返回 true ，继续默认的粘贴行为
// };


</script>

<style scoped lang="scss">
.articleBody {
    width: 55vw;
    margin: 0 auto;
    background-color: #fff;
    padding: 10px;
}
</style>