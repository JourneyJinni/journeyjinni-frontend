<template>
  <div>
    <MainHeader></MainHeader>
    <router-view></router-view>
  </div>
</template>


<script setup>
import MainHeader from "@/components/MainHeader.vue";
</script>

<style scoped>
*{
  box-sizing: border-box;
}
body,
html {
  padding: 0;
  margin: 0;
}

body {
  overflow-x: hidden;
}

@font-face {
  font-family: "KBO-Dia-Gothic_bold";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_bold.woff")
    format("woff");
  font-weight: 700;
  font-style: normal;
}
</style>

