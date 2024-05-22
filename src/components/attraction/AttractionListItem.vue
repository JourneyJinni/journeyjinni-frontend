<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <div class="rounded p-4 bg-light shadow">
          <div class="row">
            <!-- 왼쪽: 검색 결과 -->
            <div class="col-md-8">
              <h4 class="mb-4">Search Result</h4>
            </div>
          </div>
          <!-- 여기에 스크롤을 추가 -->
          <ul style="max-height: 500px; overflow-y: auto;">
            <li class="row" v-for="(result, index) in  attractionStore.searchedList" :key="index">
              <div class="col-7">
                <h4>{{ result.title }}</h4>
                <p>{{ result.addr1 }}</p>
                <p></p>
              </div>
              <div class="col-2">
                <button class="btn btn-primary" @click="setMap(result.latitude, result.longitude)">위치</button>
              </div>
              <div class="col-3">
                <button class="btn btn-primary" @click="openDetailModal(result)">더보기</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <attractionDetailModal :attraction="currentAttraction"/>

      <div class="col-md-6">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
          <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
        </KakaoMap>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';
import {KakaoMap, KakaoMapMarker} from "vue3-kakao-maps";
import { useAttractionStore } from "@/stores/Attraction.js";
import attractionDetailModal from "@/components/attraction/AttractionDetailModal.vue";
import { Modal } from 'bootstrap';
const attractionStore = useAttractionStore();
const coordinate = ref({
  lat: 33.450701,
  lng: 126.570667
});
const currentAttraction = ref();

const openDetailModal = (attraction) => {
  currentAttraction.value = attraction;
  if (currentAttraction.value !== null) {
    const modalElement = document.querySelector(`#attractionDetailModal`);
    const modalInstance = ref();
    if (!modalInstance.value) {
      modalInstance.value = new Modal(modalElement);
    }
    modalInstance.value.show();
  }
};

const setMap = (latitude, longitude) => {
  console.log(latitude, longitude);
  coordinate.value = {
    lat: latitude,
    lng: longitude
  };
};

watch(() => attractionStore.searchedList, () => {
  console.log("list", attractionStore.searchedList)
});

</script>

<style scoped>
</style>
