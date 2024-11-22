<script setup>
import * as Cesium from "cesium";
// console.log(Cesium);
import { onMounted } from "vue"
onMounted(() => {
  Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NzFiMDc5Ni05YjE2LTQ2YWYtYmJlMi1mNzRhYWM5ZGY2ZGUiLCJpZCI6MjU2NzIxLCJpYXQiOjE3MzIxNTI4OTZ9.WTGHaY16gaELJeBQbjcL7fSbd21wUWvzZkTbG9D-uqw"
  //谷歌图层
  const esri = new Cesium.ArcGisMapServerImageryProvider({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    enablePickFeatures: false,
  })
  const viewer = new Cesium.Viewer('cesiumView', {
    requestWaterMask: true,//水面特效
    timeline: false,//时间轴
    animation: false,//动画
    geocoder: false,//搜索
    homeButton: false,//返回初始位置
    sceneModePicker: false,//场景模式
    baseLayerPicker: false,//图层选择器
    navigationHelpButton: false,//帮助按钮
    fullscreenButton: false,//全屏按钮
    imageryProvider: esri,
    terrainProvider: Cesium.createWorldTerrain({
    }),//地形图层
  })
})
</script>

<template>
  <div id="cesiumView" style="width: 800px;"></div>
</template>

<style>

</style>
