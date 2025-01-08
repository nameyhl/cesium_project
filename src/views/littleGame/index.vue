<template>
    <div class="gameBox">
        <div class="box one">1</div>
        <div class="box two">2</div>
        <div class="box three">3</div>
        <div class="box four">4</div>
        <div class="box five">5</div>
        <div class="box six">6</div>
        <div class="box seven">7</div>
        <div class="box eight">8</div>
        <div class="box nine">9</div>
    </div>
</template>
<script setup>
// 新增盒子的数字的数组
const arr = [1, 2, 4]
let num = (Math.random() * 2).toFixed(0)
// 从arr中随机拿出一个数
console.log(arr[num]);

// 获取gameBox元素
const gameBox = document.querySelector('.gameBox')
// 需要在gameBox中添加盒子
let box = document.createElement('div')
box.className = 'box'
box.innerText = arr[num] + 1
gameBox.appendChild(box)

</script>
<style lang="scss">
.gameBox {
    display: flex;
    width: 615px;
    flex-wrap: wrap;
    height: 620px;
    background-color: #fff;
    margin: 10px auto;

    .box {
        width: 200px;
        height: 200px;
        text-align: center;
        line-height: 200px;
        font-size: 50px;
        font-weight: 900;
        margin: 5px 0 0 5px;
    }

    .one {
        background: #ADD8E6;
    }

    .two {
        background: #87CEEB;
    }

    .three {
        background-color: #4682B4;
    }

    .four {
        background-color: #1E90FF;
    }

    .five {
        background-color: #4B00ff;
    }

    .six {
        background: #000080;
    }

    .seven {
        background-color: #00008B;
    }

    .eight {
        background-color: #8E44AD;
    }

    .nine {
        background-color: #4B0082;
    }

}
</style>