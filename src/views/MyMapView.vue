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

const images = ref([]);
const options = {
    maxSizeMB: 1, // 허용하는 최대 사이즈 지정
    maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
    useWebWorker: true // webworker 사용 여부
  }
const handleImageUpload = async (event) => {
  const files = event.target.files;
  for (const file of files) {
    const compressedFile = await imageCompression(file, options);
   
    images.value.push(compressedFile);
  }
};

const uploadImages = async () => {
  const formData = new FormData();
  images.value.forEach((image, index) => {
    formData.append(`image${index + 1}`, image, `image${index + 1}.jpg`);
  });

  axios.post('http://localhost/map-img-upload', formData)
    .then((response) => {
    console.log(response)
  })
};
</script>
