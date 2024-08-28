<script setup>
import { KakaoMap,KakaoMapMarker } from "vue3-kakao-maps";
import MyMapImageSettingModal from '@/components/MyMapImageSettingModal.vue';
import { ref,onMounted } from 'vue';
import axios from 'axios';
import MyMapSideBar from '@/components/MyMapSideBar.vue';
import { useMemberStore } from "@/stores/member"
import { Modal } from 'bootstrap';
const { VITE_VUE_API_URL } = import.meta.env;

const images = ref([]);
const memberStore = useMemberStore()
const userId = memberStore.userInfo.user_id;
const lat = ref(33.450701);
const lng = ref(126.570667);
const map = ref();
const currentImage = ref({});
const markerList = ref([]);


const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
};


const marker = ref();

const onLoadKakaoMapMarker = (newMarker) => {
  marker.value = newMarker;
};
``
const fetchImage = async () => {
  try {
    axios.get(VITE_VUE_API_URL + "/get-mymap-imgs/" + userId)
      .then(({ data }) => {
        images.value = data;
        images.value.forEach((image) => {
          markerList.value.push({
            lat: image.latitude,
            lng: image.longitude
          })
        })
        console.log(data);
        console.log(markerList.value);
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
      if (map.value) {
      map.value.setCenter(new kakao.maps.LatLng(images.value[i].latitude, images.value[i].longitude));
      }
      break
    }
  }
}
const onClickKakaoMapMarker = (image) => {
  currentImage.value = image;
  if (currentImage.value !== null) {
    const modalElement = document.querySelector('#imageModal');
    const modalInstance = ref();
    if (!modalInstance.value) {
      modalInstance.value = new Modal(modalElement);
    }
    modalInstance.value.show();
  }
}

const refreshImages = () => {
  fetchImage();
}

</script>


<template>
  <div>

  <MyMapSideBar @move-to-marker="onMoveToMarker" @refresh-attractions="fetchImage"/>

  <div class="container">
    <div class="col-md-12">
      <div class="container mt-3">
        <div class="card text-center shadow-sm p-2 mb-5 bg-body-tertiary rounded">
          <div class="card-body">
            <h5 class="card-title fw-bold">나의 여행 기록</h5>
            <p class="card-text text-muted">이제까지 여행했던 추억을 등록하고 공유해보세요!</p>
          </div>
        </div>
      </div>
    </div>
    <KakaoMap
    :lat="lat" :lng="lng" @onLoadKakaoMap="onLoadKakaoMap"
    :level='13'
    :width="'100%'"
    :height='600'
    :markerCluster='{ markers: markerList }'
    >
        <span v-for="image in images" :key='image.image_id'>
          <KakaoMapMarker :lat="image.latitude" :lng="image.longitude" @onLoadKakaoMapMarker="onLoadKakaoMapMarker" :clickable='true'
            @onClickKakaoMapMarker="onClickKakaoMapMarker(image)"
            
          >
          <template v-slot:infoWindow >
            <div style="padding:5px;">
              <img :src="'data:image/jpeg;base64,' +image.image" alt="Sample Image" style="width:150px;height:100px;object-fit:cover;">
            </div>
          </template>
          </KakaoMapMarker> 
        </span>
    </KakaoMap>
  </div>
  

  <MyMapImageSettingModal :image="currentImage" @refresh-images="refreshImages"/>
  </div>

</template>


