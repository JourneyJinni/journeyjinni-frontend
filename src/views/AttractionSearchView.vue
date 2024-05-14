<script setup>
import axios from 'axios';
import { ref } from 'vue'
import AttractionSearchList from '@/components/AttractionSearchList.vue';

const cityList = ref([]);
const gugunList = ref([]);
const categoryList = ref([]);
const isSearch = ref(false);

const selectedSido = ref();
const selectedGugun = ref();
const selectedAttractionType = ref();

const searchStart = () => {
  isSearch.value = true;
}

axios.get("http://localhost/getcity")
  .then(({ data }) => {
    cityList.value = data;

  })
  .catch((error) => {
    alert(error)
  })
const getGugun = (event) => {

  axios.get("http://localhost/getgugun/" + event.target.value)
  .then(({ data }) => {
    gugunList.value = data;
  })
  .catch((error) => {
    alert(error)
  })
}
axios.get("http://localhost/getcategory")
.then(({ data }) => {
  categoryList.value = data;
})
.catch((error) => {
  alert(error)
})



</script>


<template>
    <div class="col-md-12">
        <div class="alert alert-primary mt-3 text-center fw-bold" role="alert">
            전국 관광지 정보
        </div>
        <!-- 관광지 검색 start -->
        <form class="d-flex my-3" onsubmit="return false;" role="search">
            <select id="search-area" class="form-select w-25 me-2" @change="getGugun" v-model="selectedSido">
                <option value="0" selected>지역</option>
                <option v-for="city in cityList" :key="city.code" :value="city.code">{{ city.name }}</option>
            </select>
            <select id="search-area-detail" class="form-select w-25 me-2" v-model="selectedGugun">
                <option value="0" selected>시/군/구</option>
                <option v-for="gugun in gugunList" :key="gugun.gugunCode" :value="gugun.gugunCode">{{ gugun.name }}</option>
            </select>
            <select id="search-content-id" class="form-select w-25 me-2" v-model="selectedAttractionType">
                <option value="0" selected>관광지 유형</option>
                <option v-for="category in categoryList" :key="category.code" :value="category.code">{{ category.name }}</option>
            </select>
            <input id="search-keyword" class="form-control form-control-lg me-5" type="search" placeholder="검색어"
                aria-label="검색어" />
                <button id="btn-search" class="btn btn-outline-success" type="button" @click='searchStart'>검색</button>
            <AttractionSearchList v-if="isSearch" :sido="selectedSido" :gugun="selectedGugun" :attraction-type='selectedAttractionType'/>
          </form>
            
        
        <!-- kakao map end -->
        
        <!-- 관광지 검색 end -->
    </div>
    
</template>

<style scoped>

</style>