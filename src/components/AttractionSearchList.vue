<script setup>
import axios from "axios";
import { watch, ref } from 'vue';

const props = defineProps({
  sido: String,
  gugun: String,
  attractionType: String
})

const propsWatch = watch(
  props, ((updated) => {
    console.log(updated)

  axios.post("http://localhost/filterlist", {
  sido: props.sido,
  gugun: props.gugun,
  attractionType: props.attractionType
})
  .then(({data}) => {
  console.log(data)
  })
  .catch((error) => {
  console.log(error)
})
})
  
)

axios.post("http://localhost/filterlist", {
  sidoCode: props.sido,
  gugunCode: props.gugun,
  attractionType: props.attractionType
})
  .then((response) => {
  console.log("성공")
  })
  .catch((error) => {
  console.log("실패")
})


</script>

<template>
  <div>
    
  </div>
</template>

<style scoped>


</style>