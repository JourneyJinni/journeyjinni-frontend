<script setup>

import {onMounted, ref} from "vue";
import {getTrip} from "@/api/Trip.js";

onMounted(() => {
  trips();
});

const posts = ref([]);

const trips = async () => {
  console.log("trip 정보를 가지러 감")
  getTrip(
      (success) => {
        posts.value = success.data; // 값에 직접 접근
        console.log(posts.value)
      },(error) => {
        console.log("여행 코스들을 가져오는데 실패했습니다.")
      }
  );
};

</script>

<template>
  <div class="container">
    <div class="row row align-items-center position-relative text-center">
    <h2 class="text-secondary fw-bolder mt-2">다른 사람들은 이런 여행지를 갔어요.</h2>
      <div class="card-footer">
        <router-link :to="{name : 'my-map'}" class="btn btn-primary stretched-link">나의 여행지도 만들러가기</router-link>
      </div>
      <br><br><br>
    <div class="row">
      <div class="col-md-12">
        <div class="card-deck d-flex flex-nowrap overflow-auto">
          <div class="card mb-3 me-3" v-for="(post, tripId) in posts.slice(0, 5)" :key="tripId">
            <img :src="post.image || 'resources\\images.jpg'" class="card-img-top" alt="Trip Image">
            <div class="card-body">
              <h5 class="card-title">{{ post.tripName }}</h5>
              <p class="card-text">{{ post.description }}</p>
            </div>
            <div class="card-footer">
              <router-link :to="{ name: 'tripdetail', params: { tripId: post.tripId }}" class="btn btn-primary stretched-link">자세히 보기</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>




</template>


<style scoped>

</style>