<script setup>

import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import exifr from 'exifr';
import { Modal } from 'bootstrap';

// props 정의
const props = defineProps({
    attraction: {
        type: Object,
        default: null
    }
});
const images = ref([]);
const attractionName = ref("");
const attractionDes = ref("");
const fileInput = ref(null);
const isLoading = ref(false); // 로딩 상태
const thisTripId = ref();
const metadataList = ref([]);

watch(props, (newValue) => {
    attractionName.value = props.attraction.attraction_name;
    attractionDes.value = props.attraction.attraction_description;
})


const emit = defineEmits(['refreshAttractions']);
const refreshAttractions = () => {
    emit('refreshAttractions');
}




const options = {
  maxSizeMB: 0.8, // 허용하는 최대 사이즈 지정
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


// 이미지 파일 압축 및 처리
const handleImageUpload = async (event) => {
  isLoading.value = true;
  images.value = [];
  const files = Array.from(event.target.files);

  // 모든 파일의 압축과 메타데이터 추출을 병렬로 처리
  const compressPromises = files.map(async (file) => {
    const metadata = await getMetadata(file);
    const compressedFile = await imageCompression(file, options);
    return { compressedFile, metadata };
  });

  // 모든 압축 및 메타데이터 추출이 완료될 때까지 대기
  const results = await Promise.all(compressPromises);
  
  results.forEach(({ compressedFile, metadata }) => {
    images.value.push(compressedFile);
    metadataList.value.push(metadata);
  });
  isLoading.value = false;
};

const submitForm = async () => {
    isLoading.value = true;
    const formData = new FormData();
    // images.value.forEach((image, index) => {
    //     // 이미지 파일과 메타데이터 추가

    // formData.append('images', image, `image${index + 1}.jpg`);
    // formData.append('metadata', JSON.stringify(metadataList.value[index]));

    // });
    formData.append('attractionId', props.attraction.attraction_id);
    formData.append('attractionName', attractionName.value);
    formData.append('attractionDes', attractionDes.value);
    try {
    const response = await axios.put('http://localhost/update-attractionbyid/' + props.attraction.attraction_id, formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    });
    console.log(response.data);
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
        refreshAttractions();
    }

}

const deleteAttraction = () => {

    axios.delete("http://localhost/delete-attractionbyid/" + props.attraction.attraction_id)
    .then(({ data }) => {
    alert("삭제했습니다.")
    refreshAttractions();
    })
}
const rollback = () => {
    attractionName.value = props.attraction.attraction_name;
    attractionDes.value = props.attraction.attraction_description;
}


</script>

<template>


<div class="modal fade" tabindex="-1" id="myAttractionSettingModal" aria-labelledby="travelModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
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
          <!-- 이미지 업로드 -->
          <div class="mb-3">
            <label for="destinationImages" class="form-label">이미지 업로드</label>
            <input ref="fileInput" class="form-control" type="file" id="destinationImages" accept="image/*" @change="handleImageUpload" multiple>
          </div>
        </form>
        <!-- 로딩 스피너 -->
        <div v-if="isLoading" class="d-flex justify-content-center mt-3">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="submitForm">저장</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteAttraction">삭제</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="rollback">취소</button>
    </div>
    </div>
  </div>
</div>



</template>
    

<style scoped>

</style>