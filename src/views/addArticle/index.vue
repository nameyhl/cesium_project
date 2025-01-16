<template>
    <div class="articleBody">
        <el-button type="primary" @click="goBack" style="float: left;">返回论坛</el-button>
        <div class="title">
            发布一篇属于你的文章吧
        </div>
        <div class="form">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm"
                status-icon>
                <el-form-item label="文章名称:" prop="title">
                    <el-input v-model="ruleForm.title" />
                </el-form-item>
                <el-form-item label="文章摘要:" prop="msg">
                    <el-input type="textarea" v-model="ruleForm.msg" :autosize="{ minRows: 4, maxRows: 6 }" />
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
        <div class="msg">文章内容中不能有双引号哟</div>
        <div class="editorBody">
            <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"
                style="border-bottom: 1px solid #ccc" />
            <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" style="height: 500px;"
                @onCreated="handleCreated" />
        </div>
        <div class="submit">
            <el-button type="primary" @click="submit(ruleFormRef)">提交</el-button>
        </div>
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// 引入userStore
import { useUserInfoStore } from '@/store/userStore/index'
const userStore = useUserInfoStore();


// 验证表单
let ruleForm = ref({
    title: '',
    msg: '',
    visible: 'all'
})
// 验证规则
const rules = ref({
    title: [{ required: true, message: '请输入文章名称', trigger: 'blur' }],
    msg: [{ required: true, message: '请输入文章摘要', trigger: 'blur' }],
    visible: [{ required: true, message: '请选择可见选择', trigger: 'blur' }]
})

// 引入添加接口
import { addArticle } from '@/api/articel/index.js'
import { ElMessage } from 'element-plus';

const ruleFormRef = ref(null)
const submit = async (formEl) => {
    if (valueHtml.value.indexOf('"') != -1) { 
        ElMessage.error('文章内容中有英文双引号')
        return
    }
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            let data = {
                name: userStore.name,
                userId: userStore.id,
                msg: ruleForm.value.msg,
                visible: ruleForm.value.visible,
                body: valueHtml.value,
                title: ruleForm.value.title
            }
            ruleForm.value = {
                title: '',
                msg: '',
                visible: 'all'
            }
            valueHtml.value = ''
            console.log(data)
            addArticle(data).then(res => {

            })
        } else {
            ElMessage.error('请将表单补充完整')
            return false
        }
    })
}

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

// 返回上级
const goBack = () => {
    router.push('/forum');
}

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
    margin: 0px auto;
    background-color: #fff;
    padding: 20px;

    .title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-bottom: 20px;
        color: #409eff;
        font-size: 25px;
        font-weight: bold;
    }

    .msg {
        color: #faa9a9;
        font-size: 14px;
        text-align: center;
    }

    .editorBody {
        border: 1px solid #ccc;
    }

    .submit {
        width: 100px;
        margin: 10px auto;
    }
}
</style>