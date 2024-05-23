<script setup>
import axios from 'axios';
import { ref } from 'vue'
import {getAttractionListByFilter} from "@/api/attraction.js";
import { useAttractionStore } from "@/stores/Attraction.js";

const cityList = ref([]);
const gugunList = ref([]);
const categoryList = ref([]);

const sido = ref("0");
const gugun = ref("0");
const attractionType = ref("0");
const attractionStore = useAttractionStore();
const keyWord = ref("");

const searchOptions = ref({
  sido: "0",
  gugun: "0",
  attractionType: "0",
  keyWord: ""
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
  searchOptions.value.keyWord = keyWord.value;
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
      <div class="container mt-3">
        <div class="card text-center shadow-sm p-2 mb-5 bg-body-tertiary rounded">
          <div class="card-body">
            <h5 class="card-title fw-bold">도시와 유형으로 관광지 찾기</h5>
            <p class="card-text text-muted">시/도/군별 검색과 관광지 유형에 대해 검색이 가능합니다.</p>
          </div>
        </div>
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
                aria-label="검색어" v-model='keyWord'/>
                <button id="btn-search" class="btn btn-outline-success" type="button" @click='searchStart'>검색</button>

          </form>
        <!-- kakao map end -->
        <!-- 관광지 검색 end -->
    </div>
</template>

<style scoped>

</style>