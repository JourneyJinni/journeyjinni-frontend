<script setup>
import axios from "axios";
import {watch, ref, onMounted, defineProps} from "vue"
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import {getAttractionListByFilter} from "@/api/attraction.js";

const props = defineProps({
  sido: String,
  gugun: String,
  attractionType: String
});

const searchedList = ref([]);
const coordinate = ref({
  lat: 33.450701,
  lng: 126.570667
});

const filterList = () => {
  getAttractionListByFilter(
      props,
      (response) => {
        searchedList.value = response;
        console.log(searchedList.value);
      },
      (error) => {
        console.error(error);
      }
  );
};

onMounted(() => {
  filterList();
});

watch(props, () => {
  filterList();
});

const setMap = (latitude, longitude) => {
  console.log(latitude, longitude);
  coordinate.value = {
    lat: latitude,
    lng: longitude
  };
};
</script>

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
            <!-- 오른쪽: 버튼 -->
            <div class="col-md-4">
              <button type="button" class="btn btn-primary btn-sm float-right" id="rootSearch">경로 검색</button>
            </div>
          </div>
          <ul>
            <li class="row" v-for="(result, index) in searchedList.data" :key="index">
              <div class="col-7">
                <h4>{{ result.title }}</h4>
                <p>{{ result.addr1 }}</p>
                <p></p>
              </div>
              <div class="col-5">
                <button class="btn btn-primary" @click="setMap(result.latitude, result.longitude)">위치</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
          <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
        </KakaoMap>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
