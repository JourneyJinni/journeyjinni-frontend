<script setup>

import {onMounted, ref} from "vue";
import {getTrip, getTripImages} from "@/api/Trip.js";
import CardTrip from "@/components/tripboards/CardTrip.vue";

onMounted(() => {
  trips();
});

const posts = ref([]);
const images = ref([]);
const trips = async () => {
  console.log("trip 정보를 가지러 감")
  getTrip(
      (success) => {
        posts.value = success.data; // 값에 직접 접근
        posts.value.forEach(post => {
          getTripImages(
              post.tripId,
              (response) => {
                post.images = response.data;
              }, (error) => {
              }
          )
        });

        console.log(posts.value)
      },(error) => {
        console.log("여행 코스들을 가져오는데 실패했습니다.")
      }
  );
};


</script>

<template>
  <div class="container">
    <div class="container-fluid" id="main1_div">
      <div class="row row align-items-center position-relative text-center">
      <h2 class="text-secondary fw-bolder mt-1">다른 사람들은 이런 여행지를 갔어요.</h2>
      <br><br>
      <div class="card-footer">
        <router-link :to="{name : 'my-map'}" class="btn btn-primary stretched-link">나의 여행지도 만들러가기</router-link>
      </div>
      <br><br><br>
      </div>
<!--      <div class="row">-->
<!--        <div class="col-md-12">-->
          <div class="card-deck d-flex flex-nowrap overflow-auto">
            <div v-for="(post, tripId) in posts.slice(0, 5)" :key="tripId" style="width: 18rem;">
              <CardTrip :trip="post" />
            </div>
          </div>
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>




</template>


<style scoped>

</style>