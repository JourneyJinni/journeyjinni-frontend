<template>
  <div class="container">
    <h1 class="text-center my-5">여행 코스</h1>
    <div class="row">
      <div class="col-md-4" v-for="(post, tripId) in posts" :key="tripId">
        <CardTrip :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getTrip } from "@/api/Trip.js";
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
