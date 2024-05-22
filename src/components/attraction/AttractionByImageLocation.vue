<template>

  <div class="col-md-12">
    <div class="container mt-3">
      <div class="card text-center shadow-sm p-2 mb-5 bg-body-tertiary rounded">
        <div class="card-body">
          <h5 class="card-title fw-bold">사진 기반으로 관광지 찾기</h5>
          <p class="card-text text-muted">사진을 업로드 하시면 사진의 데이터를 활용해 근처 관광지를 찾아줍니다.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-3">
    <label for="destinationImages" class="form-label fs-5 fw-bold">이미지 업로드</label>
    <input class="form-control" type="file" id="destinationImages" accept="image/*" @change="handleImageUpload" multiple>
  </div>

  <div v-if="findImage" class="mt-3">
    <img :src= "'data:image/jpeg;base64,' + viewImage.image" alt="Uploaded Image" class="img-fluid">
  </div>

  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="submitForm">확인</button>
  </div>
</template>

<script setup>
import exifr from 'exifr';
import {ref} from "vue";
import {useAttractionStore} from "@/stores/Attraction.js";
import {getLocationList} from "@/api/attraction.js";
import imageCompression from "browser-image-compression";
import axios from "axios";

const attractionStore = useAttractionStore();

const coordinate = ref({
  latitude: "23",
  longitude: "32"
});

const options = {
  maxSizeMB: 1, // 허용하는 최대 사이즈 지정
  maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
  useWebWorker: true // webworker 사용 여부
};

const image = ref();
const findImage = ref(null);
let viewImage;
const handleImageUpload = async (event) => {
  const files = event.target.files;
  for (const file of files) {
      let metadata = await exifr.parse(file);
      coordinate.value.latitude = metadata.latitude;
      coordinate.value.longitude = metadata.longitude;
    // 메타데이터 추출
      getLocationList(
        coordinate.value,
        (response) => {
          attractionStore.searchedList = [];
          attractionStore.searchedList = response.data;
        }
    )

    console.log("file : ", file);
    // 이미지 압축
    const compressedFile = await imageCompression(file, options);

    image.value = compressedFile;
    //console.log(++count);
  }
};

const submitForm = async () => {
  const formData = new FormData();
  console.log("image : " , image.value);
  formData.append('file', image.value, `image1.jpg`);
  try {
    const response = await axios.post('http://localhost/compare', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    findImage.value = response.data;
    viewImage = response.data;
    console.log("결과" , viewImage);
  } catch (error) {
    console.log(error);
  }
}

</script>

<style scoped>

</style>
