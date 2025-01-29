<template>

  

  <div class="container-fluid" id="main1_div">
    <div class="row align-items-center position-relative text-center">
      <h2 class="text-secondary fw-bolder mt-1">여기는 어떠세요?</h2>
      <h4>우리나라 곳곳의 명소입니다.</h4>
      <div class="card-footer">
        <router-link :to="{name : 'attraction'}" class="btn btn-primary stretched-link">더 많은 관광지 검색</router-link>
      </div>
    </div>
  </div>
  <!-- 각 카드 실행 -->
  <div class="container-fluid">
    <div class="col-md-12 mt-3">
      <div class="row fw-bold text-center">
      </div>
      <div class="row mt-3">
        <div class="card col-lg-3 col-md-6" v-for="attraction in mainAttractionList" :key="attraction.id">
          <div class="card-img-wrapper mt-2">
            <img :src="attraction.firstImage" class="card-img-top img-fluid" alt=""
                 onerror="this.onerror=null; this.src='src/assets/noimg.jpg'"
                 style='width: 100%; height: 300px;'>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ attraction.title }}</h5>
            <p class="card-text">{{ attraction.addr1 + attraction.addr2 }}</p>

            <!-- 고유한 모달 ID를 data-target에 설정 -->
            <button type="button" class="btn btn-primary btn-sm" @click="openDetailModal(attraction)">
              더보기
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
  </div>
  <attractionDetailModal :attraction="currentAttraction"/>
</template>

<script setup>
import attractionDetailModal from "@/components/attraction/AttractionDetailModal.vue";
import axios from "axios";
import { ref } from "vue";
import { Modal } from 'bootstrap';
const mainAttractionList = ref([]);
const currentAttraction = ref();
const { VITE_VUE_API_URL } = import.meta.env;
const openDetailModal = (attraction) => {
  currentAttraction.value = attraction;
  if (currentAttraction.value !== null) {
    const modalElement = document.querySelector(`#attractionDetailModal`);
    const modalInstance = ref();
    if (!modalInstance.value) {
      modalInstance.value = new Modal(modalElement);
    }
    modalInstance.value.show();
  }
};



axios.get(VITE_VUE_API_URL)
    .then(({data}) => {
      mainAttractionList.value = data;
      console.log(mainAttractionList)
    })
    .catch((error) => {
      alert("불러오지못함! : " + error)
    })
</script>
<style scope>
.box {
  width: 100vw;
  height: 100vh;
}

</style>