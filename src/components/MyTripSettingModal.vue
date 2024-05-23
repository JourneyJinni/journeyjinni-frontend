<script setup>
import { ref,onMounted, watch } from "vue";
import axios from 'axios';
import { Modal } from "bootstrap";
import Swal from 'sweetalert2'

const props = defineProps({
  trip: {
    type: Object,
    default: null
  }
});
const tripName = ref();
const tripId = ref();
const tripShared = ref();
watch(props, (newValue) => {
  tripId.value = props.trip.trip_id
  tripName.value = props.trip.trip_name
  if (props.trip.is_shared == 0) {
    tripShared.value = false;
  } else {
    tripShared.value = true;
  }
})

const emit = defineEmits(['refreshAttractions']);
const refreshAttractions = () => {
  emit('refreshAttractions');
}

const updateTrip = () => {
  const formData = new FormData();
  formData.append("tripName", tripName.value);
  if (!tripShared.value) {
    formData.append("isShared", 0); 
  } else {
    formData.append("isShared", 1); 
  }
  
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
const rollback = () => {
  tripName.value= props.trip.trip_name
}
const toggleSharing = () => {
  if (!tripShared.value) {
    Swal.fire({
    title: "여행 공유 시작",
    text: "이제 이 여행을 다른 사람과 공유합니다!",
    icon: "success",
    })
    tripShared.value = true;
  } else {
    tripShared.value = false;
    Swal.fire({
    title: "여행 공유 시작",
    text: "이제 이 여행을 다른 사람과 공유합니다!",
    icon: "success",
    })
  }


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
          
          <div style="margin-top: 20px;">
            <button type="button" class="btn btn-primary"  v-if="!tripShared" @click="toggleSharing">공유 시작</button>
            <button type="button" class="btn btn-danger"  v-if="tripShared" @click="toggleSharing">공유 중</button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateTrip">저장</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="deleteTrip">삭제</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="rollback">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>