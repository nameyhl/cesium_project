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
    // requestWaterMask: true,//水面特效
    timeline: false,//时间轴
    animation: false,//动画
    geocoder: false,//搜索
    homeButton: false,//返回初始位置
    sceneModePicker: false,//场景模式
    baseLayerPicker: false,//图层选择器
    navigationHelpButton: false,//帮助按钮
    fullscreenButton: false,//全屏按钮
    // imageryProvider: esri,
    // terrainProvider: Cesium.createWorldTerrain({
    // }),//地形图层
  })


  //经纬度转笛卡尔坐标
  //返回一个笛卡尔坐标系(z != 高度)
  const cartesian1 = Cesium.Cartesian3.fromDegrees(110, 20, 20)
  const cartesian2 = Cesium.Cartesian3.fromDegrees(130, 20, 20)

  // console.log(cartesian1);//经纬度高度
  // console.log(cartesian2);
  //笛卡尔坐标转经纬度
  //1.笛卡尔坐转弧度坐标
  let cartographic = Cesium.Cartographic.fromCartesian(cartesian1)
  //2.弧度转角度坐标
  let lon = Cesium.Math.toDegrees(cartographic.longitude)
  let lat = Cesium.Math.toDegrees(cartographic.latitude)
  // console.log("lon:",lon,"lat:",lat);

  // let lon = 180 / Math.PI * cartographic.longitude
  // let lat = 180 / Math.PI * cartographic.latitude
  // console.log("cartographic:",cartographic);
  // console.log("long:",lon,"lat:",lat);

  //相机  默认位置是在（0，-90，0）
  const position = new Cesium.Cartesian3.fromDegrees(110, 20, 20000)

  // //setView通过定义相机的目的地（方向），直接跳转到目的地
  // viewer.camera.setView({
  //   destination: position,
  //   orientation: {
  //     heading: Cesium.Math.toRadians(0),
  //     pitch: Cesium.Math.toRadians(0),
  //     roll: Cesium.Math.toRadians(0),
  //   }
  // })

  // //相机快速移动到目的地
  // viewer.camera.flyTo({
  //   destination: position,
  //   orientation: {
  //     heading: Cesium.Math.toRadians(0),
  //     pitch: Cesium.Math.toRadians(0),
  //     roll: Cesium.Math.toRadians(0),
  //   },
  //   duration: 1
  // })

  // //lookAt 将相机视角始终固定在一个地方
  // const position2 = new Cesium.Cartesian3.fromDegrees(110, 20)
  // viewer.camera.lookAt(
  //   position2,
  //   new Cesium.HeadingPitchRange(
  //     Cesium.Math.toRadians(0),
  //     Cesium.Math.toRadians(0),
  //     20000
  //   )
  // )

  // // 实体  entity
  // // 写法一
  // const point = new Cesium.Entity({
  //   position: Cesium.Cartesian3.fromDegrees(120, 30),
  //   point:{
  //     pixelSize: 10,// 点像素大小
  //     color: Cesium.Color.BLUE
  //   }
  // })
  // viewer.entities.add(point)
  // viewer.zoomTo(point)
  // 写法二
  // viewer.entities.add({
  //   id: "point",
  //   position: Cesium.Cartesian3.fromDegrees(120, 30),
  //   point: {
  //     pixelSize: 10,
  //     color: Cesium.Color.BLUE
  //   }
  // })

// 广告牌
// const billboard = viewer.entities.add({
//   position: Cesium.Cartesian3.fromDegrees(116, 40, 0),
//   billboard: {
//     image: "https://zouyaoji.top/vue-cesium/favicon.png",
//     scale: 0.1,
//     color: Cesium.Color.YELLOW
//   }
// })
// const label = viewer.entities.add({
//   position: Cesium.Cartesian3.fromDegrees(130, 40, 0),
//   label: {
//     text: 'hello cesium',
//     fillColor: Cesium.Color.YELLOW,
//     showBackground: true,
//     backgroundColor: new Cesium.Color(255,255,0)
//   }
// })
// // viewer.zoomTo(label)

const polyline = viewer.entities.add({
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      116.391061, 39.91,
      116.3906, 39.92,
      116.39007, 39.93,
    ]),//返回笛卡尔坐标数组
    width: 5,
    material: Cesium.Color.RED
  }
})

viewer.zoomTo(polyline)


})
</script>

<template>
  <div id="cesiumView"></div>
</template>

<style></style>
