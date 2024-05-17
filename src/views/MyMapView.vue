<template>
  <div>
    <input type="file" accept="image/*" @change="handleImageUpload" multiple>
    <button @click="uploadImages">Upload Images</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import exifr from 'exifr';

const images = ref([]);
const metadataList = ref([]);
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

// Blob에서 base64 데이터 URL을 얻는 함수
const blobToDataURL = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// base64 데이터 URL을 Blob으로 변환하는 함수
const dataURLToBlob = (dataURL) => {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
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

const uploadImages = async () => {
  const formData = new FormData();
  images.value.forEach((image, index) => {
    // 이미지 파일과 메타데이터 추가
    formData.append('images', image, `image${index + 1}.jpg`);
    formData.append('metadata', JSON.stringify(metadataList.value[index]));
  });

  try {
    const response = await axios.post('http://localhost/map-img-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

</script>
