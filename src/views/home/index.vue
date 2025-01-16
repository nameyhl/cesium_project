<script setup>
import { ref } from 'vue'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
let history = ref(6)
const classification = ref([])

// 获取分类信息
import { getClassify } from '@/api/classify'
const getClassifyList = () => {
    getClassify().then(res => {
        classification.value = res.data
    })
}
getClassifyList()

// 获取classfyTitle
const classTitle = ref(null)

// 控制分类目录展开还是收起
const showClassification = ref(false)
const showClassify = ref(true)
const isShowClassification = () => {
    showClassification.value = !showClassification.value
    showClassify.value = !showClassify.value
}
</script>
<template>
    <div class="homeBox">
        <div class="head">
            <div class="search">
                <el-input style="width: 500px; height: 30px; margin-right: 10px;"></el-input>
                <el-button type="primary">搜索</el-button>
            </div>
            <div class="serchHistory">
                <div class="tagBox">
                    <div v-for="index in history" class="historyTag">
                        456451654613213461234654651321345
                    </div>
                </div>
            </div>
            <div class="classification">
                <div class="title" ref="classTitle">
                    <div>书籍分类</div>
                    <div class="classifyList" v-if="showClassify">
                        <div class="classify" v-for="item in classification">{{ item.name }}</div>
                    </div>
                    <el-button type="primary" size="small" @click="isShowClassification">
                        <el-icon v-if="showClassification">
                            <ArrowUp />
                        </el-icon>
                        <el-icon v-else>
                            <ArrowDown />
                        </el-icon>
                        <div style="margin-left: 5px;">展开</div>
                    </el-button>
                </div>
                <div v-if="showClassification">
                    <div class="classBody" v-for="item in classification">
                        <div class="classBox">
                            <div class="fatherClass">{{ item.name }}</div>
                            <div class="childClass" v-for="el in item.children">
                                <el-tooltip class="box-item" effect="light" :content="el.name" placement="top">
                                    {{ el.name }}
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else></div>
            </div>
        </div>
        <div class="body"></div>
        <div class="foot"></div>
    </div>
</template>
<style scoped lang="scss">
.homeBox {
    width: 1024px;
    height: 92vh;
    background-color: #fff;
    margin: 0 auto;
    padding: 10px 0;

    .head {
        width: 1000px;
        margin: 10px auto;

        .search {
            display: flex;
            height: 50px;
            width: 100%;
            align-items: center;
            justify-content: center;
        }

        .serchHistory {
            display: flex;
            height: 30px;
            width: 1000px;
            margin: 0px auto 10px auto;
            align-items: center;
            justify-content: center;

            .tagBox {
                display: flex;
                justify-content: space-between;
                width: 700px;

                .historyTag {
                    width: 100px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 12px;

                    &:hover {
                        color: #409EFF;
                        cursor: pointer;
                        border-bottom: 1px solid #409EFF;
                    }
                }
            }

        }

        .classification {
            width: 1000px;

            .classifyList {
                display: flex;

                .classify {
                    width: 100px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-right: 10px;

                    &:hover {
                        color: #409EFF;
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }
            }

            .title {
                height: 30px;
                line-height: 20px;
                margin: 0 auto;
                padding: 0 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .classBody {
                width: 1000px;
                margin: 0 auto;

                &:last-child {
                    margin-bottom: 5px;
                }

                .classBox {
                    display: flex;
                    width: 900px;
                    height: 30px;
                    line-height: 30px;
                    margin: 0 auto;

                    .fatherClass {
                        width: 100px;
                        color: #000;

                        &:hover {
                            color: #409EFF;
                            cursor: pointer;
                            text-decoration: underline;
                        }
                    }

                    .childClass {
                        width: 80px;
                        color: #7a7a7a;
                        white-space: nowrap;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-left: 10px;

                        &:hover {
                            color: #409EFF;
                            cursor: pointer;
                            border-bottom: 1px solid #409EFF;
                        }
                    }
                }
            }
        }
    }
}
</style>