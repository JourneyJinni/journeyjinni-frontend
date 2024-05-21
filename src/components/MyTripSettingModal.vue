<script setup>
import { ref,onMounted } from "vue";
import axios from 'axios';
const props = defineProps({
  tripId: {
    type: String,
    default: null
  }
});
const tripName = ref();


onMounted(() => {
  const modalElement = document.getElementById('myAttractionModal');
  if (modalElement) {

    // 모달이 열릴 때마다 실행되는 이벤트 리스너
    modalElement.addEventListener('show.bs.modal', () => {
      axios.get("http://localhost/get-tripbyid/" + props.tripId)
        .then(({ data }) => {
          tripName.value = data.trip_name;
      })
      
      
    });
    

  } else {
    console.error('Modal element with ID myAttractionModal not found.');
  }
});
</script>

<template>
    <div class="modal fade" id="settingTripModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">여행 등록</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label>여행 이름: </label>
          <input type="text" v-model="tripName">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">삭제</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="registerTrip">수정</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>