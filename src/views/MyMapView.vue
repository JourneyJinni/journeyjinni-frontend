<template>
  <div>

    <MyMapSideBar @move-to-marker="onMoveToMarker" @refresh-attractions="fetchImage"/>
  <div class="container">
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
        <span v-for="image in images" :key='image.image_id'>
          <KakaoMapMarker :lat="image.latitude" :lng="image.longitude"></KakaoMapMarker> 
        </span>
    </KakaoMap>

  </div>
  <!-- <div v-for="image in images" :key='image.image_id'>
    <img :src="'data:image/jpeg;base64,' +image.image" alt="Image" style='height: 100px; width: 100px;'>
  </div> -->

  </div>

</template>

<script setup>
import {KakaoMap, KakaoMapMarker} from "vue3-kakao-maps";
import { ref,onMounted } from 'vue';
import axios from 'axios';
import MyMapSideBar from '@/components/MyMapSideBar.vue';
import { useMemberStore } from "@/stores/member"

const images = ref([]);
const memberStore = useMemberStore()
const userId = memberStore.userInfo.user_id;
const coordinate = ref({
  lat: 33.250701,
  lng: 126.570667
});

const fetchImage = async () => {
  try {
    axios.get("http://localhost/get-mymap-imgs/" + userId)
      .then(({ data }) => {
        images.value = data;
        
      console.log(data);
    })
    
    
    
  } catch (error) {
    console.error("Error fetching the image:", error);
  }
};

onMounted(() => {
  fetchImage();
})

const onMoveToMarker = (attractionId) => {
  for (let i = 0; i < images.value.length; i++){
    if (images.value[i].attraction_id == attractionId) {
      coordinate.value.lat = images.value[i].latitude;
      coordinate.value.lng = images.value[i].longitude;
      break
    }
  }
}
</script>
