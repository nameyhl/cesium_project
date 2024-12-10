<template>
    <div id="threeJSBody" style="width: 1210px;height: 1210px;margin: 0 auto;"></div>
</template>

<script setup>
import * as THREE from "three";
import { onMounted } from "vue";

//THREEJS渲染函数
const randerTHREEBox = () => {
    //获取画布的上一层dom
    const threeBody = document.getElementById("threeJSBody")

    //创建threeJS场景
    const scene = new THREE.Scene();
    //创建相机
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )
    camera.position.set(-30,30,80)//设置相机位置
    camera.lookAt(0,0,0)//设置相机看向原点

    //创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(1200, window.innerHeight)
    threeBody.appendChild(renderer.domElement)
    renderer.setClearColor("#F0F0F0",1)

    //添加辅助坐标
    const axesHelper = new THREE.AxisHelper(1111110);
    scene.add(axesHelper)

    //创建几何体
    const geometry = new THREE.BoxGeometry(10,20,30);
    const material = new THREE.MeshBasicMaterial({color: "#FF80F0"})
    const cube = new THREE.Mesh(geometry,material)
    // cube.position.set(10,20,30)
    scene.add(cube)

    //给立方体添加边框
    //1.提取立方体边框
    const edges = new THREE.EdgesGeometry(geometry)

    //2.创建一个线框材质
    const lineMaterial = new THREE.LineBasicMaterial({
        color: "green"
    })
    //3.使用边缘集合体和线框材质创建线框网络
    const wireframe = new THREE.LineSegments(edges,lineMaterial)
    // scene.add(wireframe)


    //声明渲染函数
    const animate = function () {
        requestAnimationFrame(animate)
        renderer.render(scene,camera)
    } 

    animate()
}

onMounted(() => {
    randerTHREEBox()
})
</script>