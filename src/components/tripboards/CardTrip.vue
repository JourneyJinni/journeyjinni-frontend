<template>
  <router-link :to="{ name: 'tripdetail', params: { tripName: trip.tripName, tripId: trip.tripId }}" class="text-decoration-none text-dark">
    <div class="card">
      <img :src="imgSrc" class="card-img-top" alt="대체이미지 설명">
      <div class="card-body">
        <h5 class="card-title text-center">{{ trip.tripName }}</h5>
        <p class="card-title text-center">{{trip.userId}}</p>
      </div>
    </div>
  </router-link>
</template>


<script setup>
import {defineProps, onMounted, ref, computed} from 'vue';
import {getTripImages} from "@/api/Trip.js";

// Props 정의
const props = defineProps({
  trip: {
    type: Object,
    required: true
  }
});

// 이미지 데이터를 저장할 ref 변수
const img = ref(null);
// API 호출 후 이미지 데이터를 img에 저장
const getFirstImage = async () => {
  console.log("Fetching trip image...");
   getTripImages(
      props.trip.tripId,
      (success) => {
        if (success.data) {
          img.value = success.data.image; // 첫 번째 이미지 데이터 할당
        } else {
          console.log("No images found for trip ");
        }
      },
      (error) => {
        console.error("Error fetching images: ");
      }
  );
};

// imgSrc 계산된 속성 정의
const imgSrc = computed(() => {
  return img.value ? 'data:image/jpeg;base64,' + img.value : 'resources/images.jpg';
});

// 컴포넌트가 마운트될 때 API 호출
onMounted(() => {
  getFirstImage();
});

</script>

<style scoped>
.card {
  cursor: pointer;
}

.card:hover {
  background-color: #f8f9fa;
}
</style>
