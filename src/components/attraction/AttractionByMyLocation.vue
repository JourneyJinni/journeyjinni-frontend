<template>
  <div>
    내 위치 기반
    <!-- "내 위치" 버튼 -->
    <button @click="sendLocation">내 위치</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getLocationList } from "@/api/attraction.js";
import { useAttractionStore } from "@/stores/Attraction.js";

const attractionStore = useAttractionStore();

const coordinate = ref({
  latitude: "23",
  longitude: "32"
});

function sendLocation() {

  console.log("현재 위치를 찾는중")
  if (navigator.geolocation) {  // 브라우저가 geolocation 기능을 지원하는지 확인
    const options = {
      enableHighAccuracy: true,
      timeout: 5000, // 최대 시간 (밀리초)
      maximumAge: 0  // 캐시된 위치 정보 최대 유지 시간 (밀리초)
    };
    navigator.geolocation.getCurrentPosition((position) => {  // 현재 위치를 가져오는 함수 호출
      coordinate.value.latitude = position.coords.latitude;  // 위도 가져오기
      coordinate.value.longitude = position.coords.longitude;  // 경도 가져오기

      console.log("위치 좌표 : ", coordinate.value);
      // 서버에 위치 정보를 전송하는 함수 호출
      getLocationList(
          coordinate.value,
          (response) => {
            attractionStore.searchedList = [];
            attractionStore.searchedList = response.data;
          },
          (error) => {
            console.log(error);
          }
      );
    }, (error) => {
      // 에러 처리
      console.error("Error getting geolocation:", error);
    }, options);
  } else {
    alert("위치 기능을 사용할 수 없습니다.");
  }
}
</script>

<style scoped>
/* 필요한 스타일을 여기에 추가할 수 있습니다 */
</style>
