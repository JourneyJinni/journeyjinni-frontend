<script setup>
import { ref,onMounted, watch } from "vue";
import axios from 'axios';
import { Modal } from "bootstrap";
import Swal from 'sweetalert2';
const props = defineProps({
  image: {
    type: Object,
    default: null
  }
});
const imageId = ref();
const imageDescription = ref();
const imageDate = ref();
const { VITE_VUE_API_URL } = import.meta.env;
watch(props, (newValue) => {
  imageId.value = newValue.image.image_id;
  imageDescription.value = newValue.image.image_description;
  imageDate.value = newValue.image.date;
})

const saveImageInfo = async () => {
  const formData = new FormData();

    formData.append('imageId', props.image.image_id);
    formData.append('imageDes', imageDescription.value);
    try {
    const response = await axios.put(VITE_VUE_API_URL + '/update-mapimagebyid/' + props.image.image_id, formData, {
      headers: {
      'Content-Type': 'multipart/form-data'
      }
    });
      console.log(response.data);
      refreshImages();
    } catch (error) {
        console.log(error);
    }
    
}

const deleteImage = () => {
    Swal.fire({
  title: "여행 기록을 지우시겠습니까?",
  text: "되돌릴 수 없어요!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "yes"
}).then((result) => {
  if (result.isConfirmed) {
    axios.delete("http://localhost/delete-mapimagebyid/" + props.image.image_id)
    .then(({ data }) => {
    refreshImages();
      Swal.fire({
      title: "삭제 성공",
      text: "여행기록이 삭제되었습니다.",
      icon: "success"
      });
    }).catch((error) => {
      Swal.fire({
      icon: "error",
      title: "삭제 실패",
      text: error +"에러가 발생되었습니다.",
      });
    })
  }
});
}
const emit = defineEmits(['refreshimages']);
const refreshImages = () => {
    emit('refreshImages');
}

const rollback = () => {
  imageDescription.value = props.image.image_description;
}
</script>

<template>
      <div class="modal fade" id="imageModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">사진 상세</h4>
                </div>
                <!-- Modal Body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img :src="'data:image/jpeg;base64,' + props.image.image" class="img-fluid" alt="Sample Image">
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <h4>{{ imageDate }}</h4>
                            </div>
                            <div class="form-group">
                                <label for="imageDescription">사진 설명:</label>
                                <textarea class="form-control" id="imageDescription" rows="3" placeholder="사진 설명" v-model='imageDescription'></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal Footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click='saveImageInfo'>저장</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click='deleteImage'>삭제</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="rollback">취소</button>
                </div>
            </div>
        </div>
    </div>
  
</template>

<style scoped>

</style>