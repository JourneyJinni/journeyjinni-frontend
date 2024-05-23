<template>
  <div class="container">
    <div class="col-md-12">
      <div class="container mt-3">
        <div class="card text-center shadow-sm p-2 mb-5 bg-body-tertiary rounded">
          <div class="card-body">
            <h5 class="card-title fw-bold">여행 기록</h5>
            <p class="card-text text-muted">다양한 사람들이 자신의 기록을 남기고 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="(post, tripId) in posts" :key="tripId">
        <CardTrip :trip="post" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {getTrip, getTripImages} from "@/api/Trip.js";
import CardTrip from "@/components/tripboards/CardTrip.vue";

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

onMounted(() => {
  trips();
});
</script>

<style>
.card {
  margin-bottom: 20px;
}
</style>
