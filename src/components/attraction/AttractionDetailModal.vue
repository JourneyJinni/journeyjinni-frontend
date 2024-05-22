<script setup>
import { ref,onMounted, watch } from "vue";
import axios from 'axios';
import { Modal } from "bootstrap";
const props = defineProps({
  attraction: {
    type: Object,
    default: null
  }
});

const attractionName = ref("");
const attractionDes = ref("");
const attractionImg = ref("");

watch(props, (newValue) => {
    attractionName.value = props.attraction.title;
    attractionDes.value = props.attraction.overview;
    attractionImg.value = props.attraction.firstImage;
})
</script>

<template>
    <div class="modal fade" id="attractionDetailModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">{{attractionName}}</h4>
                </div>
                <!-- Modal Body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img :src="attractionImg" class="img-fluid" alt=""
                            onerror="this.onerror=null; this.src='src/assets/noimg.jpg'">
                        </div>
                        <div class="col-md-6">
                                <h4>상세 설명:</h4>
                                <div class="description">
                                    <p>{{ attractionDes }}</p>
                                </div>
                        </div>
                    </div>
                </div>
                <!-- Modal Footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="rollback">확인</button>
                </div>
            </div>
        </div>
    </div>
  
</template>

<style scoped>
.description {
    font-weight: bold;
}
</style>