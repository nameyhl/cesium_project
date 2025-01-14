<template>
    <div class="body">
        <div class="scoreAndCountdown">
            <div class="countdown">
                倒计时：<span>{{ secound }}</span>
            </div>
            <div class="title">游戏里的强才是真的强</div>

            <div class="score">
                得分: <span>{{ count }}</span>
            </div>
        </div>
        <div ref="gameBox" class="ballBox">
            <div class="gameOver" v-if="gameOver">
                <div class="endBox">
                    <h1>{{ isFirst ? "欢迎来到射击小天才" : "游戏结束" }}</h1>
                    <el-button type="success" @click="startGame">{{ isFirst ? "开始游戏" : "重新开始" }}</el-button>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

let gameBox = ref(null)

// 决定游戏结束蒙层
let gameOver = ref(true)

// 是否是第一次进入游戏
let isFirst = ref(true)

// 游戏结束倒计时
let secound = ref(10.00)

const startGame = () => {
    isFirst.value = false
    addBox(gameBox.value)
    let timer = setInterval(() => {
        secound.value = (secound.value - 0.01).toFixed(2)
        if (secound.value < 0) {
            gameOver.value = true
            secound.value = 10
            // 删除最后一个盒子
            let balls = document.querySelectorAll('.ball')
            balls.forEach(element => {
                element.remove()
            });
            clearInterval(timer)
        }
    }, 10)
}

// 在盒子中添加一个盒子
const addBox = (doc) => {
    if (gameOver.value) {
        gameOver.value = false
    }
    let div = document.createElement('div')
    div.className = 'ball'
    doc.appendChild(div)
    let rec = doc.getBoundingClientRect()

    //随机生成一个横纵坐标
    let x = Math.random() * (rec.width - 100)
    let y = Math.random() * (rec.height - 100)


    div.style.left = x + 'px'
    div.style.top = y + 'px'

    div.addEventListener('click', (e) => {
        addCount()
        // 删除点击的盒子
        div.remove()
        addBox(gameBox.value)
    })
}

// 分数计算
// 分数
let count = ref(0)
const addCount = () => {
    count.value += 10
    console.log(count.value);
}
onMounted(() => {

})
</script>
<style lang="scss" scoped>
.body {
    width: 1024px;
    height: 92vh;
    margin: 0 auto;
    background: #fff;

    .scoreAndCountdown {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        font-weight: 900;
        background: #409eff;
        color: white;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;

        span {
            color: red;
            font-weight: 500;
        }
    }

    .ballBox {
        position: relative;
        width: 1024px;
        height: 576px;
        overflow: hidden;


        .gameOver {
            width: 1024px;
            height: 576px;
            position: absolute;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0.5);
            background: url('@/assets/gameOver.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;

            .endBox {
                h1 {
                    margin: 50px 0;
                }
                .button{
                    width: 100%;
                }
            }
        }

        .ball {
            width: 30px;
            height: 30px;
            border-radius: 15px;
            background: blue;
            position: absolute;
        }
    }

}
</style>