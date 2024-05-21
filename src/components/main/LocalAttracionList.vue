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
        <div class="card col-lg-3 col-md-6" v-for="(attraction,index) in mainAttractionList" :key="attraction.id">
          <div class="card-img-wrapper mt-2">
            <img :src="attraction.firstImage" class="card-img-top img-fluid" alt=""
                 onerror="this.onerror=null; this.src='src/assets/noimg.jpg'">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ attraction.title }}</h5>
            <p class="card-text">{{ attraction.addr1 + attraction.addr2 }}</p>

            <!-- 고유한 모달 ID를 data-target에 설정 -->
            <button type="button" class="btn btn-primary btn-sm" @click="showModal[index] = true">
              더보기
            </button>
            <!-- <AttractionModal :attraction="attraction" :show-modal="showModal[index]" @close-modal="closeModal(index)" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <!-- <button type="button" class="btn btn-primary btn-sm" @click='showModalMthod'> 모달열기</button>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
    
    <AttractionModal :show-modal='showModal'/> -->

  </div>
</template>

<script setup>
import AttractionModal from '@/components/AttractionModal.vue';
import axios from "axios";
import {ref} from "vue";

const showModal = ref(false);
const showModalMthod = () => {
  showModal.value = true;
  console.log("click", showModal.value);
}

const closeModal = () => {
  showModal.value = false;
};
const mainAttractionList = ref([]);

axios.get("http://localhost/")
    .then(({data}) => {
      mainAttractionList.value = data;
      console.log(mainAttractionList)
    })
    .catch((error) => {
      alert(error)
    })
</script>
<style scope>
.box {
  width: 100vw;
  height: 100vh;
}
</style>