<template>
  <div class="card">
    <img :src="post.image" class="card-img-top" alt="Post Image">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">{{ post.content }}</p>
      <router-link :to="{ name: 'TripDetail', params: { id: post.id }}" class="btn btn-primary">자세히 보기</router-link>
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
