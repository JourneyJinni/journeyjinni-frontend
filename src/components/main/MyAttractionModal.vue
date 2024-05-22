<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import exifr from 'exifr';

// props 정의
const props = defineProps({
  tripId: {
    type: String,
    default: null
  }
});
const emit = defineEmits(['refreshAttractions']);

const images = ref([]);
const metadataList = ref([]);
const attractionName = ref("");
const attractionDes = ref("");
const fileInput = ref(null);
const isLoading = ref(false); // 로딩 상태
const notification = ref({ show: false, message: '', type: '' }); // 알림 상태

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
  if (images.value.length === 0) {
    showNotification('업로드할 이미지를 선택하세요.', 'warning');
    return;
  }

  isLoading.value = true;
  const formData = new FormData();
  for (let i = 0; i < images.value.length; i++) {
    formData.append('images', images.value[i], `image${i + 1}.jpg`);
    formData.append('metadata', JSON.stringify(metadataList.value[i]));
  }
  formData.append('tripId', props.tripId);
  formData.append('attractionName', attractionName.value);
  formData.append('attractionDes', attractionDes.value);

  try {
    const response = await axios.post('http://localhost/register-attraction', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Failed to submit form', error);
  }finally {
    isLoading.value = false;
    emit('refreshAttractions');
  }

}

// 모달 초기화
onMounted(() => {
  const modalElement = document.getElementById('myAttractionModal');
  if (modalElement) {
    // 모달이 열릴 때마다 실행되는 이벤트 리스너
    modalElement.addEventListener('show.bs.modal', () => {
      attractionName.value = '';
      attractionDes.value = '';
      images.value = [];
      metadataList.value = [];
      if (fileInput.value) {
        fileInput.value.value = null; // 파일 입력 필드 초기화
      }
    });
  } else {
    console.error('Modal element with ID myAttractionModal not found.');
  }
});
const showNotification = (message, type) => {
  notification.value = { show: true, message, type };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
}
</script>

<template>
<!-- 여행지 추가 모달 -->
<div class="modal fade" tabindex="-1" id="myAttractionModal" aria-labelledby="travelModalLabel" aria-hidden="true">
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
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="submitForm">확인</button>
      </div>
    </div>
  </div>
</div>

<!-- 알림 메시지 -->
<div v-if="notification.show" :class="['alert', `alert-${notification.type}`, 'position-fixed', 'bottom-0', 'end-0', 'm-3']" role="alert">
  {{ notification.message }}
</div>
</template>

<style scoped>
</style>
