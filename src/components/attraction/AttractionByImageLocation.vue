<template>
  <div class="mb-3">
    <label for="destinationImages" class="form-label">이미지 업로드</label>
    <input class="form-control" type="file" id="destinationImages" accept="image/*" @change="getMetadata">
  </div>

</template>

<script setup>
import exifr from 'exifr';
import {ref} from "vue";
import {useAttractionStore} from "@/stores/Attraction.js";
import {getLocationList} from "@/api/attraction.js";

const attractionStore = useAttractionStore();

const coordinate = ref({
  latitude: "23",
  longitude: "32"
});


// 메타데이터를 추출하는 함수
const getMetadata = async (event) => {
  const files = event.target.files;
  try {
    console.log("file", files);
    let metadata =''
    for (const file of files) {
      metadata = await exifr.parse(file);
    }
    console.log("metadata", metadata);
    coordinate.value.latitude = metadata.latitude;
    coordinate.value.longitude = metadata.longitude;

    getLocationList(
        coordinate.value,
        (response) => {
          attractionStore.searchedList = [];
          attractionStore.searchedList = response.data;
        }
    )
  } catch (error) {
    console.error('메타데이터가 없습니다...', error);
    return {};
  }
};


</script>

<style scoped>

</style>
