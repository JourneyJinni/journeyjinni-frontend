<template>
  <div class="container">
    <h1 class="text-center my-5">여행 코스</h1>
    <div class="row">
      <div class="col-md-4" v-for="(post, index) in posts" :key="index">
        <TripDetail :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TripDetail from "@/components/tripboards/TripDetail.vue";

const posts = ref([
  {
    id: 1,
    title: '첫 번째 게시물',
    content: '이것은 첫 번째 게시물입니다.',
    image: 'https://via.placeholder.com/300'
  },
  {
    id: 2,
    title: '두 번째 게시물',
    content: '이것은 두 번째 게시물입니다.',
    image: 'https://via.placeholder.com/300'
  },
  {
    id: 3,
    title: '세 번째 게시물',
    content: '이것은 세 번째 게시물입니다.',
    image: 'https://via.placeholder.com/300'
  }
]);
</script>

<style>
.card {
  margin-bottom: 20px;
}
</style>
