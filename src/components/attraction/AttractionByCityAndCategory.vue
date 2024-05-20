<script setup>
import axios from 'axios';
import { ref } from 'vue'
import AttractionSearchList from '@/components/attraction/AttractionSearchList.vue';
import {getAttractionListByFilter} from "@/api/attraction.js";
import { useAttractionStore } from "@/stores/Attraction.js";

const cityList = ref([]);
const gugunList = ref([]);
const categoryList = ref([]);

const sido = ref("0");
const gugun = ref("0");
const attractionType = ref("0");
const attractionStore = useAttractionStore();


const searchOptions = ref({
  sido: "0",
  gugun: "0",
  attractionType: "0"
});


axios.get("http://localhost/getcity")
    .then(({ data }) => {
      cityList.value = data;
    })
    .catch((error) => {
      alert(error)
  })

axios.get("http://localhost/getcategory")
    .then(({ data }) => {
      categoryList.value = data;
    })
    .catch((error) => {
      alert(error)
    })

const searchStart = () => {
  searchOptions.value.sido = sido.value;
  searchOptions.value.gugun = gugun.value;
  searchOptions.value.attractionType = attractionType.value;
  console.log(searchOptions)
  filterList(searchOptions)
};


const filterList = (searchOptions) => {
  getAttractionListByFilter(
      searchOptions.value,
      (response) => {
        attractionStore.searchedList= []; // 리스트 초기화
        attractionStore.searchedList = response.data;
      },
      (error) => {
        console.error(error);
      })
};

const getGugun = (event) => {

  axios.get("http://localhost/getgugun/" + event.target.value)
  .then(({ data }) => {
    gugunList.value = data;
  })
  .catch((error) => {
    alert(error)
  })
}


</script>


<template>
    <div class="col-md-12">
        <div class="alert alert-primary mt-3 text-center fw-bold" role="alert">
            전국 관광지 정보
        </div>
        <!-- 관광지 검색 start -->
        <form class="d-flex my-3" onsubmit="return false;" role="search">
            <select id="search-area" class="form-select w-25 me-2" @change="getGugun" v-model="sido">
                <option value="0" selected>지역</option>
                <option v-for="city in cityList" :key="city.code" :value="city.code">{{ city.name }}</option>
            </select>
            <select id="search-area-detail" class="form-select w-25 me-2" v-model="gugun">
                <option value="0">시/군/구</option>
                <option v-for="gugun in gugunList" :key="gugun.gugunCode" :value="gugun.gugunCode">{{ gugun.name }}</option>
            </select>
            <select id="search-content-id" class="form-select w-25 me-2" v-model="attractionType">
                <option value="0" selected>관광지 유형</option>
                <option v-for="category in categoryList" :key="category.code" :value="category.code">{{ category.name }}</option>
            </select>
            <input id="search-keyword" class="form-control form-control-lg me-5" type="search" placeholder="검색어"
                aria-label="검색어" />
                <button id="btn-search" class="btn btn-outline-success" type="button" @click='searchStart'>검색</button>

          </form>
        <!-- kakao map end -->
        <!-- 관광지 검색 end -->
    </div>
    <AttractionSearchList v-if="isSearch" :sido="selectedSido" :gugun="selectedGugun" :attraction-type='selectedAttractionType'/>
</template>

<style scoped>

</style>