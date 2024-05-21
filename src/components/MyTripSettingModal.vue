<script setup>
import { ref,onMounted, watch } from "vue";
import axios from 'axios';
import { Modal } from "bootstrap";
const props = defineProps({
  trip: {
    type: Object,
    default: null
  }
});
const tripName = ref();
const tripId = ref();
watch(props, (newValue) => {
  tripId.value = newValue.trip.trip_id
  tripName.value= newValue.trip.trip_name
})

const emit = defineEmits(['refreshAttractions']);
const refreshAttractions = () => {
  emit('refreshAttractions');
}

const updateTrip = () => {
  const formData = new FormData();
  formData.append("tripName", tripName.value);

  axios.put('http://localhost/update-tripbyid/' + props.trip.trip_id, formData) 
    .then(({ data }) => {
      console.log(data);
      refreshAttractions();
    })
    .catch((error) => {
      console.log(error);
    })
}
const deleteTrip = () => {
  axios.delete("http://localhost/delete-tripbyid/" + props.trip.trip_id)
    .then(({ data }) => {
      alert("삭제했습니다.")
      refreshAttractions();
  })
}
</script>

<template>
    <div class="modal fade" id="settingTripModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">여행 상세 및 설정</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label>여행 이름: </label>
          <input type="text" v-model="tripName">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateTrip">수정</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="deleteTrip">삭제</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>