<template>
  <button @click="getDataTest">点击</button>
</template>
  
<script setup>
import { getData } from '../../api';
const getDataTest = async() => {
 await getData().then(res => {
  console.log(res);
 })
}
   
</script>