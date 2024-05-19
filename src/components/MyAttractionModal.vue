<script setup>
const props = defineProps(['tripId']);
import { ref } from 'vue';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import exifr from 'exifr';


const images = ref([]);
const metadataList = ref([]);
const attractionName = ref("");
const attractionDes = ref("");
const options = {
    maxSizeMB: 1, // 허용하는 최대 사이즈 지정
    maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
    useWebWorker: true // webworker 사용 여부
};

// 메타데이터를 추출하는 함수
const getMetadata = async (file) => {
  try {
    const metadata = await exifr.parse(file);
    return {
      date: metadata.DateTimeOriginal,
      latitude: metadata.latitude,
      longitude: metadata.longitude
    };
  } catch (error) {
    console.error('Failed to extract metadata', error);
    return {};
  }
};


// 이미지 파일 압축
const handleImageUpload = async (event) => {
    const files = event.target.files;
    for (const file of files) {
    // 메타데이터 추출
    const metadata = await getMetadata(file);
    metadataList.value.push(metadata);



    // 이미지 압축
    const compressedFile = await imageCompression(file, options);
    
    images.value.push(compressedFile);

    }
};


const submitForm = async () => {
    const formData = new FormData();
    images.value.forEach((image, index) => {
        // 이미지 파일과 메타데이터 추가
    
    formData.append('images', image, `image${index + 1}.jpg`);
    formData.append('metadata', JSON.stringify(metadataList.value[index]));
    
    });
    formData.append('tripId', props.tripId.value);
    formData.append('attractionName', props.tripId.value);
    try {
    const response = await axios.post('http://localhost/register-attraction', formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    });
    console.log(response.data);
    } catch (error) {
    console.log(error);
}
}
</script>

<template>
<!-- 여행지 추가 모달 -->
<div class="modal fade" :id="props.tripId" tabindex="-1" aria-labelledby="travelModalLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="travelModalLabel">여행지 등록</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <form id="travelForm">
        <div class="mb-3">
            <label for="destinationName" class="form-label">여행지 이름</label>
            <input type="text" class="form-control" id="destinationName" placeholder="여행지 이름을 입력하세요" v-model="attractionName">
        </div>
        <div class="mb-3">
            <label for="destinationDescription" class="form-label">여행지 설명</label>
            <textarea class="form-control" id="destinationDescription" rows="3" placeholder="여행지 설명을 입력하세요" v-model="attractionDes"></textarea>
        </div>
        <div class="mb-3">
            <label for="destinationImages" class="form-label">이미지 업로드</label>
            <input class="form-control" type="file" id="destinationImages" accept="image/*" @change="handleImageUpload" multiple>
        </div>
        </form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
        <button type="button" class="btn btn-primary" @click="submitForm">확인</button>
    </div>
    </div>
</div>
</div>

</template>
    

<style>
    
</style>
    