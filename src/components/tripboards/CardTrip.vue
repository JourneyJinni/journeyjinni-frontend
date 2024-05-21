<template>
  <div class="card">
    <img :src="'data:image/jpeg;base64,' + post.image || 'resources\\images.jpg'" class="card-img-top" alt="대체이미지 설명">

    <div class="card-body">
      <h5 class="card-title">{{ post.tripName }}</h5>
      <router-link :to="{ name: 'tripdetail', params: { tripId: post.tripId }}" class="btn btn-primary">자세히 보기</router-link>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>
