<script setup>
import axios from "axios";

const props = defineProps({
  sido: String,
  gugun: String,
  attractionType: String
})

axios.post("http://localhost//filterlist", props)
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